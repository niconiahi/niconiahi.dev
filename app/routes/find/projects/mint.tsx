import { ReactElement } from "react"
import invariant from "tiny-invariant"
import {
  Form,
  json,
  redirect,
  useNavigate,
  useActionData,
  useLoaderData,
  ActionFunction,
} from "remix"
import type { LoaderFunction } from "remix"

import { big, replace, request, getGasPrice } from "~/helpers"
import {
  ChainId,
  Project,
  Mint as MintContract,
  TransactionStateType,
} from "~/types"
import { AddressDisplay } from "~/components"
import {
  useXyz,
  useTransaction,
  useMintContract,
  useConnectMetamask,
} from "~/hooks"

type Token = {
  id: number
  owner: string
}

type Transfer = {
  id: string
  to: string
  from: string
  timestamp: string
}

type TransfersResponse = {
  transfers: Transfer[]
}

enum MintErrorType {
  Positive = "positive",
  Minted = "minted",
}

type ActionData = {
  error?: MintErrorType
}

const invalid = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const tokenId = formData.get("tokenId")

  invariant(
    typeof tokenId === "string",
    'Expected "tokenId" to be of type string',
  )

  const tokens = await getTokens()
  const canMint = tokens.every(({ id }) => id !== Number(tokenId))

  if (!canMint) {
    return invalid({ error: MintErrorType.Minted })
  }

  if (Number(tokenId) <= 0) {
    return invalid({ error: MintErrorType.Positive })
  }

  return redirect(`/find/projects/mint?tokenId=${tokenId}`)
}

type LoaderData = {
  tokens: Token[]
  tokenId?: number
  gasPrice: number
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const tokenId = url.searchParams.get("tokenId")

  const [tokens, gasPrice] = await Promise.all([getTokens(), getGasPrice()])

  return json<LoaderData>({
    tokens,
    tokenId: tokenId ? Number(tokenId) : undefined,
    gasPrice,
  })
}

export default function MintProject(): ReactElement {
  const { gasPrice, tokens, tokenId } = useLoaderData<LoaderData>()

  const mintContract = useMintContract()
  const connectMetamask = useConnectMetamask()
  const { chainId, blockNumber, account } = useXyz()

  const isRinkeby = chainId === ChainId.Rinkeby

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  if (!account || !blockNumber || !mintContract) {
    return (
      <div className="flex flex-col w-full items-center justify-center space-y-2 h-full">
        <p className="text-gray-500">You need to connect your Metamask</p>
        <button className="btn-primary" onClick={handleConnectMetamaskClick}>
          Connect wallet
        </button>
      </div>
    )
  }

  if (!isRinkeby) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>This section works on Rinkeby. Try changing to it from Metamask</p>
      </div>
    )
  }

  return (
    <>
      <AddressDisplay account={account} />
      <Mint
        account={account}
        gasPrice={gasPrice}
        mintContract={mintContract}
        tokenId={tokenId}
        tokens={tokens}
      />
    </>
  )
}

function Mint({
  tokens,
  tokenId,
  account,
  gasPrice,
  mintContract,
}: {
  tokens: Token[]
  tokenId?: number
  account: string
  gasPrice: number
  mintContract: MintContract
}) {
  const navigate = useNavigate()
  const actionData = useActionData<ActionData>()

  const onMined = () => {
    navigate("/find/projects/mint", { replace: true })
  }
  const { send } = useTransaction({
    on: {
      [TransactionStateType.Mined]: onMined,
    },
  })

  const error = actionData?.error
  const isMintDisabled = typeof tokenId !== "number"

  async function mint(tokenId: number) {
    const value = big(tokenId).mul(1e12)
    const gasLimit = await mintContract.estimateGas.mint(account, tokenId, {
      value,
      gasPrice,
    })

    send(() =>
      mintContract.mint(account, tokenId, {
        value,
        gasLimit,
        gasPrice,
      }),
    )
  }

  function handleMintClick() {
    invariant(typeof tokenId === "number", 'Expected "tokenId" to have a value')

    mint(tokenId)
  }

  function getErrorMessage(type: MintErrorType) {
    switch (type) {
      case MintErrorType.Minted: {
        return "Your number was already minted"
      }
      case MintErrorType.Positive: {
        return "Your number needs to be positive"
      }
    }
  }

  return (
    <>
      <section className="flex flex-col self-end items-center space-y-4 p-4 bg-gray-200 rounded-md border-2 border-gray-900">
        <Form className="flex flex-col items-center space-y-4" method="post">
          <p className="flex flex-col">
            <label className="text-gray-500" htmlFor="number">
              Pick a number:
            </label>
            <input
              aria-errormessage="tokenId_error"
              aria-invalid="false"
              aria-required="true"
              className="h-10 w-80 border-2 border-gray-900 p-2 bg-gray-50"
              id="tokenId"
              name="tokenId"
              type="tokenId"
            />
            {error ? (
              <span className="text-red-400" id="tokenId_error">
                {getErrorMessage(error)}
              </span>
            ) : null}
          </p>
          <button className="btn-primary w-full" type="submit">
            Check availability
          </button>
        </Form>
        <button
          className="btn-secondary w-full"
          disabled={isMintDisabled}
          onClick={handleMintClick}
        >
          Mint NFT
        </button>
      </section>
      <section className="w-full">
        <h3 className="text-gray-500">NFTs</h3>
        <ol className="w-full">
          {tokens.map(({ id, owner }, index) => (
            <li key={`token_id_${id}_${index}`} className="">
              Token {id}, owned by: {owner}
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}

async function getTokens(): Promise<Token[]> {
  async function getTransfers(): Promise<Transfer[]> {
    const query = `
    query Transfers {
      transfers {
        id
        to
        from
        timestamp
      }
    }
    `

    return request<TransfersResponse>(query, Project.Mint).then(
      ({ transfers }) => transfers,
    )
  }

  const transfers = await getTransfers()

  return transfers.reduce((prevTokens, { to, id }) => {
    const prevTokenIndex = prevTokens.findIndex(
      ({ id: prevId }) => prevId === Number(id),
    )
    const nextToken = { id: Number(id), owner: to }

    if (prevTokenIndex === -1) {
      return [...prevTokens, nextToken]
    } else {
      const nextTokens = replace(prevTokens, nextToken, prevTokenIndex)

      return nextTokens
    }
  }, [] as Token[])
}

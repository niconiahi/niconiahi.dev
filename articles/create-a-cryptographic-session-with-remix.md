---
title: Create a cryptographic session using Remix
description: Using the Sign in with Ethereum library, it's possible to create and validate a user sesion, using cryptography
---

# Create a cryptographic session using Remix

## Table of contents
- [Thoughts](#thoughts)
- [Demo](#demo)
- [Hands-on](#hands-on)

## Thoughts

I'm a big fan of the decentralization capabilities that Ethereum brings to the world. Having the option of being transparent vs not being, I think speaks for itself about what's the better choice. How long will it take to get there, it's another topic. We might get there eventually, which would make sense to me. I would leave the speculative part of it all, I do not consider that as important

I'm a big fan of being secured so I probably have 2FA enabled for all SSO around the internet that I consume, along with a password manager, for better security, why not?

There is a different option which makes use of cryptography, a foundational concept of Ethereum. This option is an EIP (Ethereum Improvement Proposal) which basically is a formal proposition of abstraction in the Ethereum ecosystem. When (if) it gets approved, developers start using them. [This EIP](https://docs.login.xyz/general-information/siwe-overview/eip-4361) ships with a Javascript library called [SIWE](https://docs.login.xyz/) (Sign in with Ethereum) that has the required API to provide cryptographical session validation

## Demo

I've created an [example repository](https://github.com/niconiahi/remix-siwe-demo) and also there is a [running demo](https://remix-siwe-demo.netlify.app/) in you'd like to jump right to the code or just see how it works

## Hands-on

First, we are going to work on the `/join` route. On this page, we are going to create a user using the user's connected wallet. With this wallet, the user will be able to sign (cryptographically) a message. Because of how cryptography works, with these values: the signed message (`signature`) and the `message` itself, we'll be able to check if the user is in fact how he says he is. 

Firstly, we are going to add the code to connect to user's wallet. We'll check the implementation of `useProvider` next in the article

```tsx
export default function JoinPage() {
  const { provider, connectMetamask }= useProvider()

  return (
    <main>
      <button
        aria-label="Connect your wallet"
        onClick={() => connectMetamask()}
      >
        <span>1</span>
        <h3>
          Connect your wallet
        </h3>
      </button>
      <button>
        ...
      </button>
      <Form>
        ...
      </Form>
    </main>
  )
}
```

Secondly, with the wallet connected, we can programmatically ask the user to sign a message. Let's add the second step. We'll check the implementation of `getAccount` and `getSigner` next in the article. Same thing with `nonce`'s value

```tsx
import { SiweMessage } from "siwe"

export default function JoinPage() {
  const { nonce } = useLoaderData<typeof loader>()
  const { provider }= useProvider()
  const [account, setAccount] = useState<string | undefined>(undefined)
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [signature, setSignature] = useState<string | undefined>(undefined)

  return (
    <main>
      <button>
        ...
      </button>
      <button
        aria-label="Generate personal signature"
        onClick={async () => {
          if (!provider) {
            alert('You need to have Metamask connected to create your signature')

            return
          }

          const account = await getAccount(provider)
          const signer = getSigner(provider)

          const siweMessage = new SiweMessage({
            uri: window.location.origin,
            domain: window.location.host,
            nonce,
            address: account,
            version: "0.1",
            chainId: 1,
            statement: "Sign in with Ethereum to this application",
          })

          const message = siweMessage.prepareMessage()
          setMessage(message)
          setSignature(await signer.signMessage(message))
          setAccount(account)
        }}
      >
        <span>2</span>
        <h3>
          Generate personal signature
        </h3>
      </button>
      <Form>
        ...
      </Form>
    </main>
  )
}
```

Here is the code for the utility functions used to manage user's wallet. This could be easily done with a library like [wagmi](https://wagmi.sh/) or [useDapp](https://usedapp.io/). I prefer not using them for such a simple thing

First, the code for `useProvider`:

```tsx
function useProvider(): {
  provider: Web3Provider | undefined
  connectProvider: () => void
} {
  const [provider, setProvider] = useState<Web3Provider | undefined>(undefined)

  async function getProvider() {
    if ((window as any)?.ethereum) {
      const provider = new Web3Provider((window as any).ethereum)
      const account = await getAccount(provider)

      if (!account) return setProvider(undefined)

      setProvider(provider)
    } else {
      setProvider(undefined)
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    getProvider()
  }, [])

  function connectProvider() {
    new Web3Provider((window as any).ethereum)
      .send("eth_requestAccounts", [])
      .then(() => {
        if (provider) return

        getProvider()
      })
      .catch((error) => {
        if (error.code === -32002) {
          alert(
            "You have already connected Metamask to the application. Click on the Metamask extension and type your password",
          )
        }
      })
  }

  return { provider, connectProvider }
}
```

This is the code for `getAccount`:

```tsx
async function getAccount(provider: Web3Provider): Promise<string> {
  return provider.send("eth_accounts", []).then((accounts) => accounts[0])
}
```

and this for `getSigner`:

```tsx
function getSigner(provider: Web3Provider): JsonRpcSigner {
  return provider.getSigner()
}
```

As promised, we also need to know the `nonce` value. What's the nonce? it's just a random string that SIWE requires to prevent re-entry attacks

```tsx
import { createCookie } from "@remix-run/node"
import { generateNonce } from "siwe"

const nonce = createCookie("nonce", {
  maxAge: 604_800,
})

export async function loader({ request }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie")
  const cookie = (await nonce.parse(cookieHeader)) || {}

  if (!cookie.nonce) {
    const nextNonce = generateNonce()
    cookie.nonce = nextNonce

    return json(
      {
        nonce: nextNonce,
      },
      {
        headers: {
          "Set-Cookie": await nonce.serialize(cookie),
        },
      },
    )
  }

  return json({
    nonce: cookie.nonce,
  })
}
```

Great, so with this code we create a `nonce` cookie. When the `loader` runs, we check if there is already a value set for the cookie, otherwise, we generate one and store it. This cookie will be sent back and forth between the client and the server, which fits perfectly for us

Now we have both `message` and `signature` in place. The next step is to send these values to the server to validate them using SIWE library's API. To do this, the user has to click on the `Login` button. This is the code to do that:

```tsx
export default function JoinPage() {
  return (
    <main>
      <button>
        ...
      </button>
      <button>
        ...
      </button>
      <Form method="post">
        <input type="hidden" name="message" value={message} />
        <input type="hidden" name="account" value={account} />
        <input type="hidden" name="signature" value={signature} />
        <button
          type="submit"
          name="_action"
          aria-label="Connect your wallet"
          disabled={Boolean(!message) || Boolean(!signature)}
        >
          <span>3</span>
          <h3>Login</h3>
        </button>
      </Form>
    </main>
  )
}
```

Now let's continue with the flow. We are now receiving `message` and `signature` on the `action` function from Remix, after having clicked on the `Generate personal signature` button. We need to do some basic form validation just to make sure we can safely work with the values provided. Let's go ahead and do that first:

```tsx
export async function action({ request }: ActionArgs) {
  const formData = await request.formData()

  const message = formData.get("message")
  const account = formData.get("account")
  const signature = formData.get("signature")

  if (typeof message !== "string") {
    return json(
      {
        errors: {
          nonce: null,
          account: null,
          message: "Message is required",
          signature: null,
        },
      },
      { status: 400 },
    )
  }

  if (typeof account !== "string") {
    return json(
      {
        errors: {
          nonce: null,
          account: "A connected account is required",
          message: null,
          signature: null,
        },
      },
      { status: 400 },
    )
  }

  if (typeof signature !== "string") {
    return json(
      {
        errors: {
          nonce: null,
          account: null,
          message: null,
          signature: "Signature is required",
        },
      },
      { status: 400 },
    )
  }
}
```

So if our code goes after these validations, it means we have everything we need, the way we need it. Next, we'll do the validation using the SIWE library. The validation can be seen in [this line](https://github.com/spruceid/siwe-quickstart/blob/main/03_complete_app/backend/src/index.js#L35) in an example shared by the SIWE team

```tsx
import { SiweMessage } from "siwe"

export async function action({ request }: ActionArgs) {
  // basic validations come before this point
  try {
    const siweMessage = new SiweMessage(message)
    // next line does the trick
    await siweMessage.validate(signature) // this will throw if it's invalid

    const cookieHeader = request.headers.get("Cookie")
    const cookie = (await nonce.parse(cookieHeader)) || {}

    if (siweMessage.nonce !== cookie.nonce) {
      return json(
        {
          errors: {
            nonce: "Invalid nonce",
            account: null,
            message: null,
            signature: null,
          },
        },
        { status: 422 },
      )
    }
  } catch (error) {
    // we are handling the error next
    // ...
  }
}
```

Great, so if the execution gets past the try-catch block, then it means that the values sent by the user are valid. If we do, then we finish up the user creation flow

```tsx
import { createUser, getUserByAddress } from "~/models/user.server"
import { createUserSession } from "~/utils/session.server"

export async function action({ request }: ActionArgs) {
  try {
    // ...
  } catch (error) {
    // ...
  }

  const user = await getUserByAddress(account)

  if (!user) {
    const nextUser = await createUser(account)

    return createUserSession({
      request,
      userAddress: nextUser.address,
      remember: true,
      redirectTo
    })
  } else {
    return createUserSession({
      request,
      userAddress: user.address,
      remember: true,
      redirectTo
    })
  }
}
```

The `createUser` comes from any Remix Stack, like the one in Blues Stack. Here is [it's implementation](https://github.com/remix-run/blues-stack/blob/main/app/models/user.server.ts#L16). It also shows on Remix's [guided tutorial](https://remix.run/docs/en/v1/tutorials/jokes). The same thing goes for `createUserSession` but with a little tweak because I'm using the `address` as the user's identifier. You can check [it's implementation](https://github.com/remix-run/blues-stack/blob/main/app/session.server.ts#L66) here 

We are missing one more thing: handling expected errors for the SIWE library. Let's add that to our `action`

```tsx
import { ErrorTypes } from "siwe"

export async function action({ request }: ActionArgs) {
  try {
    // ...
  } catch (error) {
    switch (error) {
      case ErrorTypes.EXPIRED_MESSAGE: {
        return json(
          {
            errors: {
              valid: null,
              signature: null,
              expired: "Your sesion has expired",
              message: null,
              nonce: null,
            },
          },
          { status: 400 },
        )
      }
      case ErrorTypes.INVALID_SIGNATURE: {
        return json(
          {
            errors: {
              valid: "Your signature is invalid",
              signature: null,
              expired: null,
              message: null,
              nonce: null,
            },
          },
          { status: 400 },
        )
      }
      default: {
        break
      }
    }
  }
}
```

That's it for creating a new user! For the `/login` route the whole code is the very same, but we don't use `createUser`, we just create a session and that's it. The code would look like this:

```tsx
// /routes/login
import { createUser } from "~/models/user.server"
import { createUserSession } from "~/utils/session.server"

export async function action({ request }: ActionArgs) {
  try {
    // ...
  } catch (error) {
    // ...
  }
  // note the removal of "createUser"

  return createUserSession({
    request,
    userAddress: user.address,
    remember: true,
  })
}
```
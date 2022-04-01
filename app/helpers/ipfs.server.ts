import { create } from "ipfs-core"
import type { CID, IPFS } from "ipfs-core"

// TODO: IPNS functionality
// import type { AddResult, PublishResult } from "~/types"
import type { AddResult } from "~/types"

export function getUrl(addResult: AddResult): string {
  const IPFS_GATEWAY = "https://cloudflare-ipfs.com/ipfs/"
  const hash = addResult.cid.toV1()
  const url = IPFS_GATEWAY + hash

  return url
}

// 1. setFile
export async function setFile(ipfs: IPFS, file: File): Promise<AddResult> {
  const buffer = await file.arrayBuffer()

  const addResult = await ipfs.add({
    path: file.name,
    content: buffer,
  })

  return addResult
}

// 2. getFile
// export async function getFile(ipfs: IPFS, cid: CID): Promise<File> {}

// 3. setString
export async function setString(
  ipfs: IPFS,
  string: string,
  path?: string,
): Promise<AddResult> {
  const textEncoder = new TextEncoder()
  const content = textEncoder.encode(string)

  const addResult = await ipfs.add({
    path,
    content,
  })

  return addResult
}

// 4. getString
export async function getString(ipfs: IPFS, cid: CID): Promise<string> {
  const decoder = new TextDecoder()
  const uint8Array = ipfs.cat(cid)

  let string = ""
  for await (const chunk of uint8Array) {
    string += decoder.decode(chunk)
  }

  return string
}

// TODO: IPNS functionality
// export async function addToIpns(ipfs: IPFS, cid: CID): Promise<PublishResult> {
//   const address = `/ipfs/${cid.toV1()}`

//   const publishResult = await ipfs.name.publish(address)

//   return publishResult
// }

// 5. setJson
// TODO: IPNS functionality
// export async function setJson(ipfs: IPFS, json: JSON): Promise<AddResult> {
//   const string = JSON.stringify(json)
//   const addResult = await setString(ipfs, string)
//   const { cid } = addResult

//   await addToIpns(ipfs, cid)

//   return addResult
// }

// 6. getJson
export async function getJson<T>(ipfs: IPFS, cid: CID): Promise<T> {
  const string = await getString(ipfs, cid)
  const json = JSON.parse(string)

  return json
}

//////////////////////////////////////
//// Setting IPFS in global object
//////////////////////////////////////

declare global {
  // eslint-disable-next-line no-var
  var __ipfs: IPFS | undefined
}

export async function getIpfs(): Promise<IPFS> {
  if (global.__ipfs) {
    return global.__ipfs
  }

  const ipfs = await create()

  global.__ipfs = ipfs

  return global.__ipfs
}

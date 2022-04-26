/* eslint-disable prefer-const */
import { Transfer } from "../generated/schema"
import { Transfer as TransferEvent } from "../generated/Mint/Mint"

export function handleTransfer(event: TransferEvent): void {
  let transfer = new Transfer(event.params.tokenId.toString())

  transfer.to = event.params.to
  transfer.from = event.params.from
  transfer.timestamp = event.block.timestamp

  transfer.save()
}

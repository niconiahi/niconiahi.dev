/* eslint-disable prefer-const */
import { Increased } from "../generated/Counter/Counter"
import { Increment } from "../generated/schema"

export function handleIncreased(event: Increased): void {
  let increment = new Increment(event.params.newValue.toString())

  increment.count = event.params.newValue

  increment.save()
}

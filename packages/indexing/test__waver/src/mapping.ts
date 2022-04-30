import { NewWave } from "../generated/Waver/Waver"
import { Wave } from "../generated/schema"

export function handleNewWave(event: NewWave): void {
  const wave = new Wave(event.params.from.toString() + event.params.message)

  wave.from = event.params.from
  wave.message = event.params.message
  wave.timestamp = event.params.timestamp

  wave.save()
}

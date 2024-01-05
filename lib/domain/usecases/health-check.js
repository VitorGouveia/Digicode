import { Machine } from "../models/machine.js"

export const machineInfo = () => {
  const machine = new Machine({
    timestamp: new Date().getTime(),
  })

  return machine.serialize()
}

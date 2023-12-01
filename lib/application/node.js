import * as healthCheck from "../domain/usecases/health-check.js"

export const start = () => {
  console.log(healthCheck.machineInfo())
}
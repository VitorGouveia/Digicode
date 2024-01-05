import * as healthCheck from "../domain/usecases/health-check.js"

const isDomainError = (error) =>
  error.hasOwnProperty("message") && error.hasOwnProperty("status")

export const start = () => {
  try {
    console.log(healthCheck.machineInfo())
  } catch (obj) {
    if (isDomainError(obj)) {
      console.log(`[APPLICATION] ${obj.message}`)
      return
    }

    console.log("[CONTROLLER] Failed to get machine data.")
  }
}

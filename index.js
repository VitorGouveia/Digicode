import "dotenv/config.js"

import { start } from "./lib/application/node.js"

const shutdown = async () => {
  console.log("Starting graceful shutdown")
}

process
  .on("SIGTERM", shutdown)
  .on("SIGINT", shutdown)
  .on("uncaughtException", (error) => {
    console.log("uncaughtException")
    console.log("Name: ", error.name)
    console.log(error.message)
    throw error
  })
  .on("unhandledRejection", (error) => {
    console.log("unhandledRejection")
    console.log("Name: ", error.name)
    console.log(error.message)
    throw error
  })
  .on("exit", (code) => {
    console.log(`exiting with code ${code}`)
  })

try {
  start()
  console.log("APP Started successfully!")
} catch (error) {
  console.log("APP Initialization failed!", error.name)
  throw error
}

import { DomainError } from "../error.js"

export class Machine {
  constructor({ timestamp }) {
    if (typeof timestamp !== "number") {
      throw DomainError("Timestamp must be a number", 500)
    }

    this.timestamp = timestamp
  }

  serialize() {
    return JSON.stringify({
      timestamp: this.timestamp,
    })
  }
}

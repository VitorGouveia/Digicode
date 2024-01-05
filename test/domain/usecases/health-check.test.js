import { describe, it } from "node:test"
import assert from "node:assert"

import { machineInfo } from "../../../lib/domain/usecases/health-check.js"

describe("Health-check", () => {
  it("should return machine info", () => {
    const sut = machineInfo()
    assert.equal(typeof sut, "string")

    const parsedSut = JSON.parse(sut)
    assert.equal(
      Object.prototype.hasOwnProperty.call(parsedSut, "timestamp"),
      true
    )
  })
})

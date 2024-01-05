import { describe, it } from "node:test"
import assert from "node:assert"

import { Machine } from "../../../lib/domain/models/machine.js"

describe("Machine", () => {
  describe("constructor()", () => {
    it("should not be able to create machine when timestamp is not number", () => {
      try {
        const sut = new Machine({
          timestamp: "123",
        })
      } catch (error) {
        assert.deepStrictEqual(error, {
          message: "Timestamp must be a number",
          status: 500,
        })
      }
    })

    it("should create machine successfully", () => {
      const machine = new Machine({
        timestamp: 123,
      })

      assert.equal(machine.timestamp, 123)
    })
  })

  describe("serialize()", () => {
    it("should create machine successfully", () => {
      const sut = new Machine({
        timestamp: 123,
      }).serialize()

      assert.equal(typeof sut, "string")
    })
  })
})

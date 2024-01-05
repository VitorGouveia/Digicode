import { describe, it } from "node:test"
import assert from "node:assert"

import { DomainError } from "../../lib/domain/error.js"

describe("Error", () => {
  const errorMock = {
    message: "test-error",
    status: 400,
    options: {
      test: true,
    },
  }

  it("should create error object successfully", () => {
    const sut = DomainError(
      errorMock.message,
      errorMock.status,
      errorMock.options
    )

    assert.equal(sut.message, errorMock.message)
    assert.equal(sut.status, errorMock.status)
    assert.equal(sut.test, errorMock.options.test)
  })
})

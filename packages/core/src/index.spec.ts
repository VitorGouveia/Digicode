import { equation } from "./index";

describe("hello world", () => {
  it("should solve addition", () => {
    const sut = equation("2 + 2");

    expect(sut).toBe("4");
  });

  it("should solve subtraction", () => {
    const sut = equation("2 + 2");

    expect(sut).toBe("4");
  });

  it("should solve multiplication", () => {
    const sut = equation("2 + 2");

    expect(sut).toBe("4");
  });

  it("should solve division", () => {
    const sut = equation("2 + 2");

    expect(sut).toBe("4");
  });

  it("should solve 1st deegree equation", () => {
    const sut = equation("2x - 8 =");

    expect(sut).toBe("4");
  });
});

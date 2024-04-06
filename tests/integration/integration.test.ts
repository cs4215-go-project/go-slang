import { describe, expect, test } from "@jest/globals";
import parseCompileAndRun from "../../src/vm/machine";

const setOutputStub = (output: any) => {};

describe("end to end", () => {
  test("addition", () => {
    const input = `
package main

func main() {
    1+5*10
}
        `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(51);
  });

  test("-10", () => {
    const input = `
package main

func main() {
    -10
}
        `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(-10);
  });

  test("const", () => {
    const input = `
package main

const x, y = 10, 20

func main() {
    x + y
}
        `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(30);
  });

  test("var", () => {
    const input = `
package main

const x, y = 10, 20

func main() {
    var z int = 1
    x + y + z
}
        `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(31);
  });

  test("identifier", () => {
    const input = `
package main

const x = 10

func main() {
    x
}
        `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(10);
  });

  test("conditional false", () => {
    const input = `
package main

func main() {
    // TODO: support 'var x int'
    var x int = 0
    if false {
        x = 20
    } else {
        x = 10
    }
}
        `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(10);
  });

  test("conditional true", () => {
    const input = `
package main

func main() {
    var x int = 0
    if x == 0 {
        x = 20
    } else {
        x = 10
    }
}
        `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(20);
  });

  test("conditional else if", () => {
    const input = `
package main

func main() {
    var x int = 0
    if x < 0 {
        x = 20
    } else if x > 0 {
        x = 10
    } else {
        x = 5
    }
}
        `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(5);
  });

  test("func", () => {
    const input = `
package main

func main() {
    f := func(x, y int) int { return x + y }
    f(4, 3)
}
        `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    console.log(result);
    expect(result).toBe(7);
  });

  test("func decl", () => {
    const input = `
package main

func add(x, y int) int {
    return x + y
}

func main() {
    return add(4, 3)
}
        `;

    const result = parseCompileAndRun(2048, input, setOutputStub);
    console.log(result);
    expect(result).toBe(7);
  });

  test("func multiple", () => {
    const input = `
package main

const x = 10

func add(x, y int) int {
    return x + y
}

func main() {
    sub := func(x, y int) int { return x - y }
    return add(4, sub(x, 3))
}
        `;

    const result = parseCompileAndRun(2048, input, setOutputStub);
    console.log(result);
    expect(result).toBe(11);
  });

  test("loop", () => {
    const input = `
    package main

    func main() {
        var i int = 0
        for i < 3 {
            i++
        }
        i
    }
            `;

    const result = parseCompileAndRun(2048, input, setOutputStub);
    expect(result).toBe(3);
  });

  test("go func", () => {
    const input = `
    package main

    func main() {
        ch := make(chan int, 2)
        go func() {
            ch <- 1
        }()
        <-ch
    }
            `;

    const result = parseCompileAndRun(2048, input, setOutputStub);
    console.log(result);
    expect(result).toBe(1);
  });

  test("builtin max", () => {
    const input = `
    package main

    func main() {
        max(2, 3)
    }
            `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(3);
  });

  test("builtin min", () => {
    const input = `
    package main

    func main() {
        min(2, 3)
        10
    }
            `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(10);
  });
});

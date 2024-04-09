import { describe, expect, test } from "@jest/globals";
import parseCompileAndRun from "../../src/vm/machine";

const setOutputStub = (output: any) => {
    console.log(output.join("\n"));
};

describe("end to end", () => {
  test("addition", () => {
    const input = `
package main

func main() {
    return 1+5*10
}
        `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    console.log(result)
    expect(result).toBe(51);
  });

  test("-10", () => {
    const input = `
package main

func main() {
    return -10
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
    return x + y
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
    return x + y + z
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
    return x
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
    return x
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
    return x
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
    return x
}
        `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(5);
  });

  test("func basic", () => {
    const input = `
package main

func main() {
    f := func(x, y int) int { return x + y }
    return f(4, 3)
}
        `;

    const result = parseCompileAndRun(2048, input, setOutputStub);
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
        return i
    }
            `;

    const result = parseCompileAndRun(2048, input, setOutputStub);
    expect(result).toBe(3);
  });

  test("go func basic", () => {
    const input = `
    package main

    func main() {
        ch := make(chan int, 2)
        {
            const z = 6
            const k = 9
        }
        var x = 10
        go func(y int) {
            ch <- y * 2
            ch <- y * 3
            ch <- y * 3
        }(x)
        <-ch
        y := <-ch
        return y + <-ch
    }
            `;

    const result = parseCompileAndRun(624, input, setOutputStub);
    console.log(result);
    expect(result).toBe(60);
  });

  test("go func closed channel", () => {
    const input = `
    package main

    func main() {
        ch := make(chan int)
        const x = 10
        go func(y int) {
            ch <- y * 2
            close(ch)
        }(x)
        <-ch
    }
            `;
    const result = parseCompileAndRun(2048, input, setOutputStub)
    console.log(result);
  });

  test("closeee", () => {
    const input = `
    package main

    func main() {
        ch := make(chan int)
        close(ch)
    }
            `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    console.log(result)
  });

  test("builtin max", () => {
    const input = `
    package main

    func main() {
        return max(2, 3)
    }
            `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(3);
  });

  test("builtin min", () => {
    const input = `
    package main

    func main() {
        return min(2, 3)
    }
            `;

    const result = parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(2);
  });
});

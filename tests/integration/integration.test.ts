import { describe, expect, test } from "@jest/globals";
import parseCompileAndRun from "../../src/vm/machine";

let arr = []
const setOutputStub = (output: any) => {
    arr = output(arr)
    console.log(arr.join('\n'))
};

describe("end to end", () => {
  test("addition", async () => {
    const input = `
package main

func main() {
    return 1+5*10
}
        `;

    const result = await parseCompileAndRun(512, input, setOutputStub);
    console.log(result)
    expect(result).toBe(51);
  });

  test("-10", async () => {
    const input = `
package main

func main() {
    return -10
}
        `;

    const result = await parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(-10);
  });

  test("empty return", async () => {
    const input = `
package main

func x() {
    println(10)
    return
}

func main() {
    x()
    return 1
}
        `;

    const result = await parseCompileAndRun(1024, input, setOutputStub);
    console.log(result)
    expect(result).toBe(1);
  });

  test("early return", async () => {
    const input = `
package main

func trueIfTwo(x int) int {
    if x == 2 {
        return 1
    } else {
        
    }
    println(101)
    return 0
}

func main() {
    println(trueIfTwo(3))
    return trueIfTwo(2)
}
        `;

    const result = await parseCompileAndRun(1024, input, setOutputStub);
    expect(result).toBe(1);
  });

  test("const", async () => {
    const input = `
package main

const x, y = 10, 20

func main() {
    return x + y
}
        `;

    const result = await parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(30);
  });

  test("var", async () => {
    const input = `
package main

const x, y = 10, 20

func main() {
    var z int = 1
    return x + y + z
}
        `;

    const result = await parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(31);
  });

  test("identifier", async () => {
    const input = `
package main

const x = 10

func main() {
    return x
}
        `;

    const result = await parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(10);
  });

  test("conditional false", async () => {
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

    const result = await parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(10);
  });

  test("conditional true", async () => {
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

    const result = await parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(20);
  });

  test("conditional else if", async () => {
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

    const result = await parseCompileAndRun(512, input, setOutputStub);
    expect(result).toBe(5);
  });

  test("func basic", async () => {
    const input = `
package main

func main() {
    f := func(x, y int) int { return x + y }
    return f(4, 3)
}
        `;

    const result = await parseCompileAndRun(2048, input, setOutputStub);
    console.log(result);
    expect(result).toBe(7);
  });

  test("func decl", async () => {
    const input = `
package main

func add(x, y int) int {
    return x + y
}

func main() {
    return add(4, 3)
}
        `;

    const result = await parseCompileAndRun(2048, input, setOutputStub);
    console.log(result);
    expect(result).toBe(7);
  });

  test("func multiple", async () => {
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

    const result = await parseCompileAndRun(2048, input, setOutputStub);
    console.log(result);
    expect(result).toBe(11);
  });

  test("loop", async () => {
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

    const result = await parseCompileAndRun(2048, input, setOutputStub);
    expect(result).toBe(3);
  });

  test("loop break", async () => {
    const input = `
    package main

    func main() {
        var i int = 0
        for i < 5 {
            i++
            if i == 2 {
                break
            } else {

            }
        }
        return i
    }
            `;
    const result = await parseCompileAndRun(2048, input, setOutputStub);
    expect(result).toBe(2);
  });

  test("loop continue", async () => {
    const input = `
    package main

    func main() {
        var i int = 0
        var j int = 0
        for i < 5 {
            i++
            if i % 2 == 1 {
                continue
            } else {

            }
            j++
        }
        return j
    }
            `;

    const result = await parseCompileAndRun(2048, input, setOutputStub);
    expect(result).toBe(2);
  });

  test("loop nested break", async () => {
    const input = `
    package main

    func main() {
        var i int = 0
        var j int = 0
        var k int = 0
        for i < 5 {
            i++
            for j < 5 {
                j++
                if j == 4 {
                    break
                } else {
                    k++
                }
            }
            if i == 2 {
                break
            }
        }
        return i + j + k
    }
            `;
    const result = await parseCompileAndRun(2048, input, setOutputStub);
    expect(result).toBe(11);
});

  test("go func basic", async () => {
    const input = `
    package main

    func main() {
        ch := make(chan int, 2)
        var x = 10
        go func(y int) {
            ch <- y * 2
            ch <- y * 3
            ch <- y * 3
        }(x)
        z := <-ch
        println(z)
        y := <-ch
        println(y)
        return y + z + <-ch
    }
            `;

    const result = await parseCompileAndRun(2048, input, setOutputStub);
    console.log(result);
    expect(result).toBe(80);
  });

  test("go func buffered full send", async () => {
    const input = `
    package main

    func main() {
        ch := make(chan int, 2)
        var x = 10
        go func(y int) {
            ch <- y * 2
            ch <- y * 3
            ch <- y * 4
        }(x)

        sleep(2000)
        
        z := <-ch // this wakes up the third send
        println(z)
        y := <-ch
        println(y)

        return y + <-ch
    }
            `;

    const result = await parseCompileAndRun(2048, input, setOutputStub);
    console.log(result);
    expect(result).toBe(70);
  }, 10000);

  test("go func func call", async () => {
    const input = `
    package main

    func send(ch chan int) {
        println(10)
        ch <- 10
    }

    func main() {
        ch := make(chan int)
        go send(ch)

        // sleep(1000)

        return <-ch
    }
            `;

    const result = await parseCompileAndRun(2048, input, setOutputStub);
    console.log(result);
    expect(result).toBe(10);
  }, 3000);

//   test("go func closed channel", async () => {
//     const input = `
//     package main

//     func main() {
//         ch := make(chan int)
//         const x = 10
//         go func(y int) {
//             ch <- y * 2
//             close(ch)
//         }(x)
//         <-ch
//     }
//             `;
//     const result = await parseCompileAndRun(2048, input, setOutputStub)
//     expect(result.message).toBe("panic: send on closed channel");
//   });

  test("waitgroup panic", async () => {
    const input = `
    package main

    func main() {
        var wg WaitGroup
        var x = 0
        wgDone(wg)
        return x
    }
            `;
    const result = await parseCompileAndRun(2048, input, setOutputStub);
    console.log(result)
    expect(result instanceof Error).toBe(true);
    expect(result.message).toBe("panic: negative WaitGroup counter");
  });

  test("waitgroup", async () => {
    const input = `
    package main

    func main() {
        var wg WaitGroup
        var x = 0
        wgAdd(wg, 1)
        go func() {
            x = 10
            wgDone(wg)
        }()
        wgWait(wg)
        return x
    }
            `;
    const result = await parseCompileAndRun(2048, input, setOutputStub);
    console.log(result)
    expect(result).toBe(10);
  });

  test("sleep", async () => {
    const input = `
    package main

    func main() {
        go func() {
            sleep(1000)
            println(100)
        }()
        sleep(5000)
        println(10)
    }
            `;
    const result = await parseCompileAndRun(2048, input, setOutputStub)
    // expect(result).toBe(10);
    console.log(result)
  }, 10000);

  test("closeee", async () => {
    const input = `
    package main

    func main() {
        ch := make(chan int)
        close(ch)
    }
            `;

    const result = await parseCompileAndRun(512, input, setOutputStub);
    console.log(result)
  });

  test("builtin max", async () => {
    const input = `
    package main

    func main() {
        return max(2, 3)
    }
            `;

    const result = await parseCompileAndRun(512, input, setOutputStub);
    console.log(result)
    expect(result).toBe(3);
  });

  test("builtin min", async () => {
    const input = `
    package main

    func main() {
        // x := min(2, 3)
        add := func(x, y int) int { return x + y }
        return add(0, 2)
    }
            `;

    const result = await parseCompileAndRun(2048, input, setOutputStub);
    expect(result).toBe(2);
  });

  test("bug", async () => {
    const input = `
    package main

    func main() {
    go func() {
        for i := 0; i < 10; i++ {
            println(i)
            sleep(500)
        }
    }()

    for i := 0; i < 7; i++ {
        println(i)
        sleep(1000)
    }

    return 1
}
    `

    const result = await parseCompileAndRun(2048, input, setOutputStub);
    console.log(result)
    expect(result).toBe(1);
  }, 15000);

  test("should fail", async () => {
    const input = `
package main

func main() {
    n := 10
    for i := 0; i < n; i = i + 2 {
        println(i)
        z := 2
        for j := 0; j < n; j = j + 2 {
            println(i + j + z)
        }
    }

    return i
}
    `
    const result = await parseCompileAndRun(2048, input, setOutputStub);
    console.log(result)
  });

  test("closure", async () => {
    const input = `
package main

func makef(ch chan int, x int) func (int) int {
    z := 100
    f := func(y int) {
        ch <- x + y + z
    }
    return f
}

func main() {
    ch := make(chan int)
    go makef(ch, 3)(2)
    return <-ch
}`
    const result = await parseCompileAndRun(2048, input, setOutputStub);
    console.log(result)
    expect(result).toBe(105);
  })

  test("triple nested closure", async () => {
    const input = `
package main

func makef(ch chan int, x int) func (int) int {
    z := 100
    f := func(y int) {
        g := func(a int) {
            ch <- x + y + z + a
        }
        return g
    }
    return f
}

func main() {
    ch := make(chan int)
    go makef(ch, 3)(2)(1)
    return <-ch
}`
    const result = await parseCompileAndRun(2048, input, setOutputStub);
    console.log(result)
    expect(result).toBe(106);
  })
});

import parse from "./src/parser/parser";

const input = `
package main

func main() {
    1+2
    2-1
    // square(2)
}

func square(x int) int {
    // return x*x
}
`;

const parsed = parse(input);
// const vm = VM()
// vm.compile(parsed)
// vm.run()
console.log(JSON.stringify(parsed));

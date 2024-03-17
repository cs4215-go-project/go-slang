import {CharStreams, CommonTokenStream, ParserRuleContext} from 'antlr4';
import GoLexer from './parser/gen/GoLexer';
import GoParser from './parser/gen/GoParser';
import GoParserVisitor from './parser/gen/GoParserVisitor';

class CustomVisitor extends GoParserVisitor<void> {

  visitChildren(ctx: ParserRuleContext) {
    if (!ctx) {
      return;
    }
    if (ctx.children) {
      return ctx.children.map(child => {
        console.log(child.getText())
          return child.getText();
      });
    }
  }
}

const input = `
// You can edit this code!
// Click here and start typing.
package main

import "fmt"

func main() {
	fmt.Println("Hello, 世界")
}
`
const chars = CharStreams.fromString(input);
const lexer = new GoLexer(chars);
const tokens = new CommonTokenStream(lexer);
const parser = new GoParser(tokens);
const tree = parser.sourceFile();

tree.accept(new CustomVisitor());

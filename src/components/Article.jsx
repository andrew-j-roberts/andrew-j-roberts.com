import React, { useEffect } from "react";
import Markdown from "react-markdown";
import Prism from "prismjs";
import CodeBlock from "./SyntaxHighlighter/CodeBlock";
import "./SyntaxHighlighter/prism.css";

function Article({ rawMarkdown }) {
  useEffect(() => {
    Prism.highlightAll();
  }); // need to listen to route changes

  return (
    <Markdown
      source={rawMarkdown}
      escapeHtml
      renderers={{
        Code: CodeBlock,
        CodeBlock: CodeBlock
      }}
    />
  );
}

export default Article;

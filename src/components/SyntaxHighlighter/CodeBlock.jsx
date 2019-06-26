import React, { useEffect } from "react";
import Prism from "prismjs";
import "./prism.css";

function CodeBlock({ value, language = "" }) {
  useEffect(() => {
    Prism.highlightAll();
  });
  return (
    <pre>
      <code className={`${language}`}>{value}</code>
    </pre>
  );
}

export default CodeBlock;

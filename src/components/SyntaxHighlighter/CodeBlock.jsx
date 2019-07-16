import React from "react";

function CodeBlock({ language = "", value }) {
  return (
    <pre>
      <code className={`${language}`}>{value}</code>
    </pre>
  );
}

export default CodeBlock;

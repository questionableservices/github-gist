import React from "react";

import { CodeBlock, SupportedLanguages } from "@atlaskit/code";

type Props = {
  language: SupportedLanguages | undefined;
  showLineNumbers: boolean;
  codeBlock: string;
};

export const SyntaxHighlighter = ({
  language,
  showLineNumbers,
  codeBlock,
}: Props) => {
  return (
    <CodeBlock
      language={language}
      showLineNumbers={showLineNumbers}
      text={codeBlock}
    />
  );
};

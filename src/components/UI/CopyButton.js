import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "reactstrap";

const CopyButton = (props) => {
  const [copied, setCopied] = useState(false);

  const copyHandler = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <>
      <CopyToClipboard text={props.textToCopy} onCopy={copyHandler}>
        <span role='button' id='buttonToCopy' className='ml-3 bx bx-copy-alt text-success' />
      </CopyToClipboard>
      <Tooltip placement='top' target='buttonToCopy' isOpen={copied}>
        !Copiado¡
      </Tooltip>
    </>
  );
};

export default CopyButton;

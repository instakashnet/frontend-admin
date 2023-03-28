import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyButton = ({ textToCopy }) => {
  return (
    <span className='cursor-pointer'>
      <CopyToClipboard text={textToCopy}>
        <ClipboardDocumentIcon className='w-5 h-5 text-success inline' />
      </CopyToClipboard>
    </span>
  );
};

export default CopyButton;

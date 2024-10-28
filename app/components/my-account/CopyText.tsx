'use client';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoIosCopy } from 'react-icons/io';

export default function CopyText({ text }: { text: string | undefined }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  return (
    <CopyToClipboard text={text ? text : 'text-to-copy'}>
      <div
        className="flex justify-between items-center w-full px-3 py-2 cursor-pointer"
        onClick={() => {
          if (!isCopied) {
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 2000);
          }
        }}
      >
        <div>{text}</div>
        <div>
          {isCopied ? <div className="text-sm">Copied</div> : <IoIosCopy />}
        </div>
      </div>
    </CopyToClipboard>
  );
}

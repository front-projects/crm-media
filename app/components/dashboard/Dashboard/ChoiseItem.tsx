import { MouseEventHandler } from 'react';

export default function ChoiseItem({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  active: boolean;
}) {
  return (
    <div
      className={`cursor-pointer p-2 bg-gray-600/20 rounded-md text-xl min-w-[200px] max-sm:text-sm max-sm:min-w-[100px] ${active ? 'text-purple-600' : 'hover:bg-gray-600/40'}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

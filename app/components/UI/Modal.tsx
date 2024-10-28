'use client';
import { useRouter } from 'next/navigation';
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div
      className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-10 bg-black/90"
      onClick={() => {
        router.back();
      }}
    >
      <div
        className={`bg-[#242424] rounded-[24px] p-4 px-10 custom-shadow`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center ">{children}</div>
      </div>
    </div>
  );
}

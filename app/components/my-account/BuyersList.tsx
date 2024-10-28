/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function BuyersList({ info }: { info: any }) {
  console.log(info);

  return (
    <ul className="w-full flex flex-col gap-4 items-center mt-4">
      {info?.buyers.length > 0 ? (
        info.buyers.map((el: any) => (
          <div
            key={el.id}
            className="border p-2 w-[340px] flex items-center gap-4 rounded-md justify-between bg-gray-600/20 shadow-xl max-sm:w-[95vw]"
          >
            <div>ID: {el.id}</div>
            <div>{el.nickname}</div>
          </div>
        ))
      ) : (
        <div className="w-full text-center text-xl">No buyers</div>
      )}
    </ul>
  );
}

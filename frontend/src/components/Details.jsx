export const Details = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center bg-base-100 gap-4 py-5 px-8 md:my-10">
        <ul className="flex flex-col md:flex-row gap-6">
          <li className="flex flex-col items-center">
            <p className="text-lg font-bold md:text-2xl">120k+</p>
            <p className="text-base md:text-xl font-normal">
              countries supported
            </p>
          </li>
          <li className="flex flex-col items-center">
            <p className="text-lg font-bold md:text-2xl">$12m+</p>
            <p className="text-base md:text-xl font-normal">
              Quarterly trading volume
            </p>
          </li>
          <li className="flex flex-col items-center">
            <p className="text-lg font-bold md:text-2xl">200k+</p>
            <p className="text-base md:text-xl font-normal">client</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export const JoinNews = () => {
  return (
    <>
      <form className="w-full flex flex-col items-center  gap-4 py-5 px-8 md:py-7 rounded-3xl md:rounded-[100px]">
        <fieldset className="form-control w-80">
          <div className="relative">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered rounded-full w-full pr-16"
            />
            <button className="btn btn-success text-neutral rounded-full absolute top-0 right-0 ">
              Subscribe
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

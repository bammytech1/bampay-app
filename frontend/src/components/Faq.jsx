export const Faq = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center bg-primary gap-4 py-5 px-8 md:py-20 rounded-3xl md:rounded-[100px]">
        <h2 className="text-center text-2xl md:text-5xl font-bold text-base-100 ">
          FAQs
        </h2>
        <p className="text-center text-neutral md:text-lg">
          Get Answers to Your Questions in Details
        </p>
        <div className="w-full justify-center container flex flex-col max-w-2xl gap-6 items-center  bg-primary rounded-3xl p-4">
          <div className="collapse  rounded-3xl collapse-plus bg-neutral">
            <input type="radio" name="my-accordion-3" checked="checked" />
            <div className="collapse-title text-base md:text-xl font-medium">
              01. What are the Trading Fees on Exchange?
            </div>
            <div className="collapse-content">
              <p className="text-success">No extra fee required</p>
            </div>
          </div>
          <div className="collapse rounded-3xl collapse-plus bg-neutral">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-base md:text-xl font-medium">
              02. What are the Trading Fees on Exchange?
            </div>
            <div className="collapse-content">
              <p className="text-success">hello</p>
            </div>
          </div>
          <div className="collapse rounded-3xl collapse-plus bg-neutral">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-base md:text-xl font-medium">
              03. What are the Trading Fees on Exchange?
            </div>
            <div className="collapse-content">
              <p className="text-success">hello</p>
            </div>
          </div>
          <div className="collapse rounded-3xl collapse-plus bg-neutral">
            <input type="radio" name="my-accordion-3" checked="checked" />
            <div className="collapse-title text-base md:text-xl font-medium">
              04. What are the Trading Fees on Exchange?
            </div>
            <div className="collapse-content">
              <p className="text-success">No extra fee required</p>
            </div>
          </div>
          <div className="collapse  rounded-3xl collapse-plus bg-neutral">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-base md:text-xl font-medium">
              05. What are the Trading Fees on Exchange?
            </div>
            <div className="collapse-content">
              <p className="text-success">hello</p>
            </div>
          </div>
          <div className="collapse rounded-3xl collapse-plus bg-neutral">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-base md:text-xl font-medium">
              06. What are the Trading Fees on Exchange?
            </div>
            <div className="collapse-content">
              <p className="text-success">hello</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

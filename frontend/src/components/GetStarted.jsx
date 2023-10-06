import trade1 from "../assets/img.svg";
import trade2 from "../assets/img-big.svg";
import { Link } from "react-router-dom";

export const GetStarted = () => {
  return (
    <>
      <section className="w-full">
        <div className=" relative w-full bg-primary rounded-tl-[93px] rounded-br-[93px] ">
          <div className="picture">
            <picture className="m-0 ">
              <source srcSet={trade1} media="(max-width: 1050px)" />
              <img
                src={trade2}
                className="w-full h-auto object-cover rounded-tl-[93px] md:rounded-tl-none"
                alt="..."
              />
            </picture>
          </div>
          <div className="flex flex-col items-center py-8 px-6 gap-5 text-base-100 md:absolute top-0 left-0 bg-primary h-full place-content-center rounded-br-[93px] md:rounded-tl-[250px] md:rounded-br-[250px] md:bg-opacity-50 md:px-6 md:w-1/2 ">
            <h2 className=" text-center text-4xl font-bold md:text-6xl">
              Buy & Sell <br /> Crypto <br /> with <br />{" "}
              <span className="text-4xl font-bold text-success">
                "Confidence"
              </span>
            </h2>
            <p className="text-center">Exchange anytime, Anywhere with ease</p>
            <Link
              to={"/"}
              className="btn btn-success rounded-3xl text-base-100 w-1/2"
            >
              GET STATED
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

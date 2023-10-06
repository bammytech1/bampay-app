import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { latestNews } from "../data/latestNews";

export const Latest = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center  gap-4 py-5 px-8 ">
        <h2 className="text-center text-2xl md:text-5xl font-bold ">
          Latest updates
        </h2>
        <Splide
          className="w-full container max-w-7xl "
          aria-label="Feedback"
          options={{
            fixedWidth: "300px",
            perPage: 3,
            gap: "3rem",
            breakpoints: {
              640: {
                perPage: 2,
                gap: "1rem",
                // height : '6rem',
              },
              480: {
                perPage: 1,
                gap: ".7rem",
                // height : '6rem',
              },
            },
            pagination: false,
            arrows: true,
            focus: "center",
            autoplay: true,
            rewind: true,
            type: "loop",
          }}
        >
          {latestNews.map((feed) => {
            return (
              <SplideSlide key={feed.id}>
                <Slides feed={feed} key={feed.id} />
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </>
  );
};

const Slides = (props) => {
  const { title, description, date } = props.feed;
  return (
    <div className=" mb-2 rounded-3xl flex flex-col group bg-success border-[1px] border-pry-color justify-center p-8 items-center ">
      <div className="flex flex-col items-start">
        <a
          href="#"
          className=" block text-dark font-bold text-left hover:text-primary transition-colors duration-150 text-lg md:text-xl mb-2"
        >
          {title}
        </a>
        <p className="mb-2 font-normal  text-sm md:text-sm text-left text-neutral">
          {description}
        </p>
        <p>{date}</p>
      </div>
    </div>
  );
};

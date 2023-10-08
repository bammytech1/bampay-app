import { latestNews } from "../data/latestNews";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
export const Testimonial = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center bg-primary gap-4 py-5 md:py-20 px-8 rounded-3xl md:rounded-[100px]">
        <h2 className="text-center text-2xl md:text-5xl font-bold text-base-100 ">
          Testimonials
        </h2>
        <p className="text-center text-neutral md:text-lg ">
          Millions have already successfully used Bamcoins and they have had a
          lot of nice things to say about us.
        </p>
        <div className="w-full justify-center container flex flex-col md:flex-row gap-6 items-center max-w-7xl bg-primary rounded-3xl p-4">
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
      </div>
    </>
  );
};

const Slides = (props) => {
  const { title, description, date } = props.feed;
  return (
    <div className=" mb-2 rounded-3xl flex flex-col group bg-neutral border-[1px] border-pry-color justify-center p-8 items-center ">
      <div className="flex flex-col items-start gap-2 md:gap-4">
        <p className=" block text-dark font-bold text-left hover:text-primary transition-colors duration-150 text-lg md:text-xl mb-2">
          {title}
        </p>
        <p className="mb-2 font-normal  text-sm md:text-sm text-left text-primary">
          {description}
        </p>
        <p>{date}</p>
      </div>
    </div>
  );
};

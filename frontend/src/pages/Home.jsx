import { Advantages } from "../components/Advantages";
import { Details } from "../components/Details";
import { Faq } from "../components/Faq";
import Footer from "../components/Footer";
import { GetStarted } from "../components/GetStarted";
import Hero from "../components/Hero";
import { JoinNews } from "../components/JoinNews";
import { Latest } from "../components/Latest";
import { Testimonial } from "../components/Testimonial";
import { WhyUs } from "../components/WhyUs";
function Home() {
  return (
    <>
      <main className="flex flex-col gap-4">
        <Hero />
        <WhyUs />
        <Advantages />
        <Details />
        <Testimonial />
        <GetStarted />
        <Latest />
        <Faq />
        <JoinNews />
        <Footer />
      </main>
    </>
  );
}

export default Home;

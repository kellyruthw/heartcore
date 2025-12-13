import HomeHero from "./components/HomeHero/HomeHero";
import ImageCopy from "./components/ImageCopy/ImageCopy";
import ImageCopyList from "./components/ImageCopyList/ImageCopyList";
import PageLoader from "./components/PageLoader/PageLoader";
import ProjectCarousel from "./components/ProjectCarousel/ProjectCarousel";
import TestimonialsCarousel from "./components/TestimonalsCarousel/TestimonialsCarousel";
import VideoCta from "./components/VideoCta/VideoCta";

export default function Home() {
  return (
    <div className="page">
      {/* <PageLoader /> */}
      <main className="main">
        <HomeHero id="home"/>
        <ProjectCarousel id="work"/>
        <ImageCopy id="services"/>
        <ImageCopyList />
        <TestimonialsCarousel id="testimonials"/>
        <VideoCta />
      </main>
    </div>
  );
}

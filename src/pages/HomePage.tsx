import "./homePage.css";
import Galaxy from "@/components/Galaxy";
import HomeButtons from "@/components/Home/HomeButtons";

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="absolute inset-0">
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={2.5}
          glowIntensity={0.5}
          saturation={0.2}
          hueShift={240}
        />
      </div>
      <div className="home-line" />
      <div className="home-button-container">
        <HomeButtons />
      </div>
      <h1 className="home-title">
        <em className="home-title-letter">H</em>
        <em className="home-title-letter home-planet left">O</em>
        <em className="home-title-letter">R</em>
        <em className="home-title-letter">Z</em>
        <em className="home-title-letter home-planet right">O</em>
        <em className="home-title-letter">N</em>
      </h1>
    </div>
  );
}

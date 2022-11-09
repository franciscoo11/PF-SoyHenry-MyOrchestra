import HeroImage from "../frontend/components/HeroImage";
import HomeMainContent from "../frontend/components/HomeMainContent";
import MainNavBar from "../frontend/components/MainNavBar";

export default function Home() {
  return (
    <div>
      <MainNavBar />
      <HeroImage />
      <HomeMainContent />
    </div>
  );
}

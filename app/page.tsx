import Menu from "@/Components/Manu/Menu";
import Footer from "@/Components/Footer/Footer";
import HomeLatestWritings from "@/Components/HomeLatestWritings/HomeLatestWritings";
import PageHero from "@/Components/PageHero/PageHero";
import HomeQuoteBox from "@/Components/HomeQuoteBox/HomeQuoteBox";

export default function Home() {
  return (
    <>
      <Menu />
      <PageHero />
      <HomeQuoteBox />
      <HomeLatestWritings />
      <Footer />
    </>
  );
}

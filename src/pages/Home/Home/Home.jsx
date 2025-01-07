import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Caring from "../../shared/Caring";
import ParallaxBanner from "../../shared/ParallaxBanner";
import TopRatedDoctors from "../../../components/TopRatedDoctors";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Easy Doc || Home</title>
      </Helmet>
      <Banner />
      <Caring />
      <TopRatedDoctors />
      <ParallaxBanner />
    </>
  );
};

export default Home;

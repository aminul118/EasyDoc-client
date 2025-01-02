import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Caring from "../../shared/Caring";
import ParallaxBanner from "../../shared/ParallaxBanner";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Easy Doc || Home</title>
      </Helmet>
      <Banner />
      <Caring/>
      <ParallaxBanner/>

    </>
  );
};

export default Home;

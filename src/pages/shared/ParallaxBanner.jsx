import image1 from "../../../src/assets/background/drtele.jpg";
import CareCard from "../../components/CareCard";
import img1 from "../../../src/assets/icons/heart-surgery.png";
import img2 from "../../../src/assets/icons/heart-transplant.png";
import img3 from "../../../src/assets/icons/cancer.png";
import Container from "../../components/Container";

const ParallaxBanner = () => {
  return (
    <div
      className=" bg-no-repeat bg-center bg-fixed"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <div className="min-h-[600px] flex items-center justify-center  text-white   bg-black/50 backdrop-blur-sm">
        <div className=" text-justify py-32">
          <Container>
            <div className="grid lg:grid-cols-3 gap-14">
              <CareCard
                image={img1}
                imageStyle="w-32 mx-auto bg-red-500 p-2 rounded-full "
                heading="Heart Surgery"
                paragraph="Interactively procrastinate high-payoff content without backward-compatible data. Quickly cultivate optimal processes ."
                tailwindStayle="text-center"
              />
              <CareCard
                image={img2}
                imageStyle="w-32 mx-auto border bg-base-200 p-2 rounded-full"
                heading="Heart Surgery"
                paragraph="Interactively procrastinate high-payoff content without backward-compatible data. Quickly cultivate optimal processes ."
                tailwindStayle="text-center"
              />
              <CareCard
                image={img3}
                imageStyle="w-32 mx-auto border bg-red-500 p-2 rounded-full"
                heading="Heart Surgery"
                paragraph="Interactively procrastinate high-payoff content without backward-compatible data. Quickly cultivate optimal processes ."
                tailwindStayle="text-center"
              />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ParallaxBanner;

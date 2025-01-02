import CareCard from "../../components/CareCard";
import img1 from "../../../src/assets/caring/img-box-01.jpg";
import img2 from "../../../src/assets/caring/img-box-02.jpg";
import img3 from "../../../src/assets/caring/img-box-03.jpg";
import img4 from "../../../src/assets/caring/img-box-04.jpg";

const Caring = () => {
  return (
    <div className="grid lg:grid-cols-4 max-w-7xl mx-auto">
      {/* Card 1 */}
      <CareCard
        image={img1}
        tailwindStayle="bg-slate-200 "
        heading="Heart surgery"
        paragraph="Monotonectally supply superior initiatives rather than economically sound outside the box thinking. Uniquely."
      />
      {/* Card 2 */}
      <CareCard
        image={img2}
        tailwindStayle="bg-base-200"
        heading="Heart surgery"
        paragraph="Monotonectally supply superior initiatives rather than economically sound outside the box thinking. Uniquely."
      />
      {/* Card 3 */}
      <CareCard
        image={img3}
        tailwindStayle="bg-slate-200 "
        heading="Heart surgery"
        paragraph="Monotonectally supply superior initiatives rather than economically sound outside the box thinking. Uniquely."
      />
      {/* Card 3 */}
      <CareCard
        image={img4}
        tailwindStayle="bg-base-200 "
        heading="Heart surgery"
        paragraph="Monotonectally supply superior initiatives rather than economically sound outside the box thinking. Uniquely."
      />
    </div>
  );
};

export default Caring;

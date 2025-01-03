import { Link } from "react-router-dom";

const HeroSlider = ({
  heading1,
  heading2,
  paragraph,
  link,
  linkText,
  backgroundImage,
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className=" lg:h-[600px] xl:h-[calc(100vh-64px)] bg-cover bg-center flex items-center "
    >
      <div className="w-full py-6">
        <div className="w-10/12 mx-auto space-y-4">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl lg:text-7xl   font-bold">
              {heading1} <span className="text-blue-600">{heading2}</span>
            </h1>
            <p className=" text-lg ">{paragraph}</p>
            {link && (
              <Link to={link} className="btn btn-primary">
                {linkText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;

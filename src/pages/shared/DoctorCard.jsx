import iconSpecilization from "../../assets/icons/specialization.png";
import iconExperience from "../../assets/icons/experience.png";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const { doctorName, specialization, image, experience, location, _id } =
    doctor;
  console.log(doctor);
  return (
    <Link to={`/doctor/${_id}`}>
      <div className="card bg-base-200   rounded-none">
        <figure className="bg-slate-400">
          <img src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{doctorName}</h2>
          <div className="flex items-center gap-2">
            <img className="w-6" src={iconSpecilization} alt="" />
            <p> {specialization}</p>
          </div>
          <div className="flex items-center gap-2">
            <img className="w-6" src={iconExperience} alt="" />
            <p> {experience}</p>
          </div>
          <p className="flex items-center gap-2">
            <FaLocationDot className="text-red-500  text-2xl" /> {location}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;

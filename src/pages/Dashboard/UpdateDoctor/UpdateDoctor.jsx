import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import { useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useDoctorId from "../../../hooks/useDoctorId";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const UpdateDoctor = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState("12:00");
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const { doctor, isLoading, error, refetch } = useDoctorId(id);
  const {
    doctorName,
    specialization,
    phone,
    email,
    location,
    details,
    date,
    time,
  } = doctor;

  const imgbb = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMG_BB_API
  }`;

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const imgData = await axiosPublic.post(imgbb, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const image = imgData.data.data.display_url;
    data.date = startDate;
    data.time = value;
    data.image = image;
    console.log(data);
    const res = await axiosSecure.put(`/doctors/${id}`, data);

    if (res.data.modifiedCount) {
      refetch();
      Swal.fire({
        title: "Good job!",
        text: `update ${doctorName}'s appoinment list successfully!`,
        icon: "success",
      });
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto">
      <Helmet>
        <title>Update Doctor || Easy Doc</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-center">Update appoinments </h2>
      <div className="divider"></div>
      {/* Form Start */}
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {/* Doctor Name */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Doctor name</span>
            </div>
            <input
              {...register("doctorName")}
              defaultValue={doctorName}
              type="text"
              placeholder="Doctor Name"
              className="input input-bordered w-full  focus:outline-none focus:border-blue-400"
            />
          </label>
          {/* Specialization */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Specialization</span>
            </div>
            <input
              {...register("specialization")}
              defaultValue={specialization}
              type="text"
              placeholder="Specialization"
              className="input input-bordered w-full  focus:outline-none focus:border-blue-400"
            />
          </label>
          {/* Experience */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Experience</span>
            </div>
            <select
              type="text"
              className="select input-bordered w-full  focus:outline-none focus:border-blue-400"
              {...register("experience")}
            >
              <option>1 Year</option>
              <option>2 years</option>
              <option>3 years</option>
              <option>4 years</option>
              <option>5 years</option>
              <option>6 years</option>
              <option>7 years</option>
              <option>8 years</option>
              <option>9 years</option>
              <option>10 years</option>
            </select>
          </label>
          {/* Rating */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Rating</span>
            </div>
            <select
              type="text"
              className="select input-bordered w-full  focus:outline-none focus:border-blue-400"
              {...register("rating")}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </label>

          {/* Phone Number */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Phone Number</span>
            </div>
            <input
              {...register("phone")}
              type="text"
              placeholder="Phone Number"
              defaultValue={phone}
              className="input input-bordered w-full  focus:outline-none focus:border-blue-400"
            />
          </label>
          {/* Email */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              {...register("email")}
              defaultValue={email}
              type="text"
              placeholder="Email"
              className="input input-bordered w-full  focus:outline-none focus:border-blue-400"
            />
          </label>
          {/* Date*/}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Date</span>
            </div>
            <DatePicker
              selected={date}
              onChange={(date) => setStartDate(date)}
              className="input input-bordered w-full  focus:outline-none focus:border-blue-400"
            />
          </label>
          {/* Time*/}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Time</span>
            </div>
            <TimePicker
              onChange={onChange}
              value={time}
              className="select input-bordered w-full  focus:outline-none focus:border-blue-400"
            />
          </label>

          {/* Location */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Location</span>
            </div>
            <input
              {...register("location")}
              type="text"
              defaultValue={location}
              placeholder="Location"
              className="input input-bordered w-full  focus:outline-none focus:border-blue-400"
            />
          </label>
          {/* Location */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Upload Image</span>
            </div>
            <input
              {...register("image")}
              type="file"
              className="file-input focus:outline-none file-input-bordered file-input-primary w-full "
            />
          </label>
          {/* Details about doctor */}
          <label className="form-control w-full col-span-2">
            <div className="label">
              <span className="label-text">Details about Doctor</span>
            </div>
            <textarea
              {...register("details")}
              type="text"
              defaultValue={details}
              placeholder="Details About Doctor"
              className="input input-bordered w-full  focus:outline-none focus:border-blue-400 h-48"
            />
          </label>

          {/* Submit Button */}
          <button className="btn col-span-2">Add Doctor</button>
        </form>
      </div>
    </section>
  );
};

export default UpdateDoctor;

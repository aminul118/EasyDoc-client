import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useBookedSlots from "../../../hooks/useBookedSlots";
import { format } from "date-fns";

const DoctorDetails = () => {
  // Hooks and Contexts
  const { id } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useBookedSlots();

  // Fetch Doctor Details
  const { data, isLoading, error } = useQuery({
    queryKey: [id, "doctorDetails"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/doctors/${id}`);
      return res.data;
    },
  });

  // Form Hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Loading and Error States
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading doctor details</p>;
  if (!data) return <p>No doctor details found</p>;

  // Destructure Data
  const {
    doctorName,
    specialization,
    image,
    experience,
    location,
    date,
    details,
    time,
  } = data;
  const dateFormat = format(new Date(date), "dd MMMM, yyyy");

  // Form Submission Handler
  const onSubmit = async (formData) => {
    formData.email = user.email;
    formData.doctorId = id;

    try {
      await axiosSecure.post("/appointments", formData);
      reset();
      refetch();
      Swal.fire({
        title: "Good job!",
        text: `Appointment booked for ${formData.patientName}`,
        icon: "success",
      });
    } 
  };

  // Component Render
  return (
    <section className="min-h-[calc(100vh-220px)] flex items-center justify-center mx-auto ">
      <Helmet>
        <title>{doctorName} Details</title>
      </Helmet>
      <div className="w-full rounded-lg overflow-hidden p-6 bg-base-200 container mx-auto my-24">
        <div className="flex flex-col gap-6 items-center">
          {/* Doctor Image */}
          <figure className="w-full ">
            <img
              className="w-64 2xl:w-96 bg-slate-500 object-cover rounded-lg"
              src={image}
              alt={doctorName}
            />
          </figure>

          {/* Doctor Details */}
          <div className="w-full ">
            <h2 className="text-2xl font-bold mb-2">{doctorName}</h2>
            <p className="text-gray-600 mb-1">
              Specialization: {specialization}
            </p>
            <p className="text-gray-600 mb-1">Experience: {experience} years</p>
            <p className="text-gray-600 mb-1">Location: {location}</p>
            <p className="container ">About: {details}</p>

            <div className="divider"></div>
            <h3 className="text-xl font-semibold mb-2">Book an Appointment</h3>

            {/* Appointment Info */}
            <div className="space-y-2">
              <p>Date: {dateFormat}</p>
              <p>Time: {time}</p>
            </div>

            {/* Booking Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 max-w-lg mt-2"
            >
              {/* Patient Name */}
              <div>
                <input
                  type="text"
                  {...register("patientName", {
                    required: "Patient name is required",
                  })}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.patientName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.patientName.message}
                  </p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <input
                  type="tel"
                  {...register("contactNumber", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Invalid contact number",
                    },
                  })}
                  placeholder="Contact Number"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;

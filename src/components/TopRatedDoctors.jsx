import { useQuery } from "react-query";
import LoadingSpinner from "./LoadingSpinner";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SectionTitle from "./SectionTitle";
import { Link } from "react-router-dom";

const TopRatedDoctors = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["topRatedDoctors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/top-rated-doctors");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="py-12 2xl:py-24">
      <SectionTitle
        heading="Our Top rated Doctors"
        text="Meet our top-rated doctors, highly skilled and dedicated to providing exceptional care. Book your appointment now for a healthier tomorrow with trusted medical professionals at your service!"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto">
        {data?.map((doc) => (
          <Link
            to={`/doctor/${doc._id}`}
            key={doc._id}
            className="relative overflow-hidden group cursor-pointer rounded-md shadow-md"
          >
            {/* Image */}
            <img
              src={doc.image}
              alt={doc.doctorName}
              className="h-64 2xl:h-96 w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-4">
              <h1 className="text-lg font-bold capitalize">{doc.doctorName}</h1>
              <p className="text-sm mt-1">{doc.specialization}</p>
            </div>

            {/* Bottom Shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopRatedDoctors;

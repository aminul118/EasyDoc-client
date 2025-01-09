import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "react-query";

const useDoctorId = (id) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: doctor = {}, // Default value to prevent errors if data is undefined
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["doctor", id], // Include id in the query key
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      try {
        const res = await axiosPublic.get(`/doctors/${id}`);
        return res.data;
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        throw error;
      }
    },
    enabled: !!id, // Ensures the query doesn't run if the ID is falsy
  });

  return { doctor, isLoading, error, refetch };
};

export default useDoctorId;

import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "react-query";

const useDoctorId = (id) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: doctor = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      const res = await axiosPublic.get(`/doctors/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  return { doctor, isLoading, error, refetch };
};

export default useDoctorId;

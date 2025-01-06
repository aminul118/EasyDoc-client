import { useQuery } from "react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDoctors = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: doctors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/doctors");
      return res.data;
    },
  });
  return [doctors, isLoading, refetch];
};

export default useDoctors;

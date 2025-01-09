import { useQuery } from "react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDoctors = (sort = "", search = "") => {
  const axiosPublic = useAxiosPublic();
  const {
    data: doctors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors", sort, search],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/doctors?sort=${sort}&search=${search}`
      );
      return res.data;
    },
  });
  return [doctors, isLoading, refetch];
};

export default useDoctors;

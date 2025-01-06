import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBookedSlots = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const { data: appointments = [],refetch,isLoading } = useQuery({
    queryKey: ["appointments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appointments/${user?.email}`);
      return res.data;
    },
  });
  return [appointments, refetch,isLoading];
};

export default useBookedSlots;

import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useBookedSlots from "../../../hooks/useBookedSlots";

const Appointments = () => {
  const [appointments, refetch, isLoading] = useBookedSlots();
  const axiosSecure = useAxiosSecure();

  if (isLoading) return <LoadingSpinner />;

  const handleDeleteAppointment = async (appointment) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axiosSecure.delete(
              `/appointments/${appointment._id}`
            );
            if (res.data.deletedCount > 0) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your appointment has been deleted.",
                icon: "success",
              });
              refetch();
            } else {
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: "Failed to delete the appointment. Please try again.",
                icon: "error",
              });
            }
          } catch (error) {
            console.error("Error deleting appointment:", error);
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: "Something went wrong while deleting the appointment.",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your appointment is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="p-4  rounded-md ">
      <h1 className="text-4xl text-center font-bold mb-4">My Appointments</h1>
      <div className="divider"></div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full border-collapse border border-gray-300">
          {/* Table Head */}
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border border-gray-300">SI</th>
              <th className="p-2 border border-gray-300">Doctor Name</th>
              <th className="p-2 border border-gray-300">Specialization</th>
              <th className="p-2 border border-gray-300">Preferred Time</th>
              <th className="p-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {appointments.map((appointment, i) => (
              <tr key={appointment._id || i} className="hover:bg-gray-100">
                <th className="p-2 border border-gray-300 text-center">
                  {i + 1}
                </th>
                <td className="p-2 border border-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          className="bg-slate-700"
                          src={
                            appointment.doctorDetails?.image ||
                            "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt={
                            appointment.doctorDetails?.doctorName ||
                            "Doctor Avatar"
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">
                        {appointment.doctorDetails?.doctorName ||
                          "Unknown Doctor"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-2 border border-gray-300">
                  {appointment.doctorDetails?.specialization || "N/A"}
                </td>
                <td className="p-2 border border-gray-300">
                  {appointment.selectedSlot || "N/A"}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  <button
                    onClick={() => handleDeleteAppointment(appointment)}
                    className="btn bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;

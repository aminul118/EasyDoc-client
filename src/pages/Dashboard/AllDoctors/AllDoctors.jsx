import { FaTrash } from "react-icons/fa6";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useDoctors from "../../../hooks/useDoctors";
import { FaEdit } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const AllDoctors = () => {
  const [doctors, isLoading, refetch] = useDoctors();
  const axiosSecure = useAxiosSecure();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // ! Delete a doctor by its own id

  const handleDelete = (doc) => {
    console.log(doc);
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
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/doctors/${doc._id}`).then((res) => {
            if (res.data.deletedCount === 1) {
              refetch();
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: `${doc.doctorName} has been deleted.`,
                icon: "success",
              });
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };
  return (
    <section>
      <SectionTitle heading="All Doctors" />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl bg-slate-100">
              <th>SI</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {doctors.map((doc, i) => (
              <tr key={doc._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={doc.image} alt={doc.doctorName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{doc.doctorName}</div>
                      <div className="text-sm opacity-50">{doc.location}</div>
                    </div>
                  </div>
                </td>
                <td>{doc.specialization}</td>
                <td>
                  <Link
                    to={`/dashboard/updateDoctor/${doc._id}`}
                    className="btn text-red-500"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(doc)}
                    className="btn bg-red-500 text-white ml-3"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllDoctors;

import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleDeleteUser = (user) => {
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
        text: "You won't be able to revert this action.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/users/${user._id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: `${user.name} has been deleted.`,
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
            text: "Your user is safe. ",
            icon: "error",
          });
        }
      });
  };

  const handleAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Good job!",
          text: `${user.name} is now admin`,
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold text-center">
          Total Users: {users.length}
        </h1>
        <div className="divider"></div>
      </div>

      <div className="overflow-x-auto max-w-7xl mx-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th>SI</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                  {user?.role === "admin" ? (
                    <p className="text-amber-500 ">Admin</p>
                  ) : (
                    <button
                      onClick={() => {
                        handleAdmin(user);
                      }}
                      className="btn bg-yellow-600 text-white"
                    >
                      <FaUsers />
                    </button>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => {
                      handleDeleteUser(user);
                    }}
                    className="btn bg-red-600 text-white"
                  >
                    <FaTrash />
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

export default ManageUsers;

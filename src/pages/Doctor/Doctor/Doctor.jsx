import { Helmet } from "react-helmet-async";
import useDoctors from "../../../hooks/useDoctors";
import Container from "../../../components/Container";
import DoctorCard from "../../shared/DoctorCard";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useState } from "react";

const Doctor = () => {
  const [sort, setSort] = useState("desc");
  const [search, setSearch] = useState("");
  const [doctors, isLoading] = useDoctors(sort, search);

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <Helmet>
        <title>Doctors || Easy Doc</title>
      </Helmet>

      <Container>
        <div className="py-12 flex gap-4 max-w-md mx-auto">
          {/* Sort Dropdown */}
          <select
            defaultValue={sort}
            onChange={handleSort}
            className="select w-full border border-blue-500 focus:outline-none focus:border-blue-400"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>

          {/* Search Input */}
          <div className="flex">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search"
              className="px-10 py-2 border border-blue-500 rounded-md outline-none focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="grid lg:grid-cols-3 gap-6 2xl:grid-cols-6 py-12">
          {doctors?.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Doctor;

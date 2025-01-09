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

  return (
    <section>
      <Helmet>
        <title>Doctors || Easy Doc</title>
      </Helmet>

      <Container>
        <div className="py-12 flex flex-col md:flex-row gap-4 items-center justify-center max-w-md mx-auto">
          {/* Sort Dropdown */}
          <select
            defaultValue={sort}
            onChange={handleSort}
            className="select w-full h-12 md:w-auto border border-blue-500 rounded-md focus:outline-none focus:border-blue-400"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>

          {/* Search Input */}
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search"
            className="px-4  w-full md:w-auto h-12 border border-blue-500 rounded-md outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Doctor Cards */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-6 md:py-12">
            {doctors?.map((doctor) => (
              <DoctorCard
                doctor={doctor}
                key={doctor._id}
                className="h-full flex flex-col"
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Doctor;

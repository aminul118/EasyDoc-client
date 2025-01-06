import { Helmet } from "react-helmet-async";
import useDoctors from "../../../hooks/useDoctors";
import Container from "../../../components/Container";
import DoctorCard from "../../shared/DoctorCard";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Doctor = () => {
  const [doctors, isLoading] = useDoctors();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <Helmet>
        <title>Doctors || Easy Doctor</title>
      </Helmet>

      <Container>
        <div className="grid lg:grid-cols-3 gap-6 2xl:grid-cols-5">
          {doctors?.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Doctor;

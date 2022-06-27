import { Link } from "react-router-dom";
import Error from "../../assets/images/error-img.png";

const Error500 = () => {
  return (
    <section className="min-h-screen grid items-center md:grid-cols-2">
      <div className="text-center self-end md:col-span-2">
        <h1 className="flex items-center justify-center text-7xl font-bold mb-4 xl:text-8xl">
          5<i className="bx bxs-buoy bx-spin text-primary"></i>0
        </h1>
        <p className="md:text-base">Ha ocurrido un error inesperado. Disculpa las molestias.</p>
        <p className="md:text-base">No te preocupes, lo solucionaremos lo antes posible.</p>
        <Link to="/dashboard" className="btn btn-primary mt-4">Regresar</Link>
      </div>
      <img
        src={Error}
        alt="Imagen de persona frustrada"
        className="max-w-full md:self-end md:col-start-2 md:col-end-2 lg:col-span-2 lg:max-w-md lg:justify-self-center lg:self-center xl:max-w-xl"
      />
    </section>
  );
}

export default Error500;
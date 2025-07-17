import InscripcionCard from "./InscripcionCard";

const InscripcionesList = ({ inscripciones }) => {
  if (inscripciones.length === 0) {
    return <p className="text-center text-gray-500">No hay inscripciones disponibles.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {inscripciones.map(insc => (
        <InscripcionCard key={insc.id} inscripcion={insc} />
      ))}
    </div>
  );
};

export default InscripcionesList;

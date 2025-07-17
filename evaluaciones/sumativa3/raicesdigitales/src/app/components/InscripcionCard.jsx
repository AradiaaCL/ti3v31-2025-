const InscripcionCard = ({ inscripcion }) => {
  const {
    nombre,
    apellido,
    correo,
    rut,
    fechaNacimiento,
    observaciones,
    tallerInfo
  } = inscripcion;

  return (
    <div className="bg-white p-4 rounded shadow border">
      <h2 className="text-lg font-bold">{nombre} {apellido}</h2>
      <p className="text-sm">Correo: {correo}</p>
      <p className="text-sm">RUT: {rut}</p>
      <p className="text-sm">Fecha de nacimiento: {fechaNacimiento}</p>
      <p className="text-sm mb-2">Observaciones: {observaciones}</p>

      {tallerInfo ? (
        <>
          <h3 className="text-blue-600 font-semibold">{tallerInfo.nombre}</h3>
          <p className="text-sm">{tallerInfo.descripcion}</p>
          <p className="text-sm text-gray-500">Profesor: {tallerInfo.profesor}</p>
        </>
      ) : (
        <p className="text-red-500">Taller no encontrado</p>
      )}
    </div>
  );
};

export default InscripcionCard;

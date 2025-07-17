const InscripcionCard = ({ inscripcion }) => {
  const { nombre, correo, tallerInfo } = inscripcion;

  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
      <h2 className="text-lg font-bold">{nombre}</h2>
      <p className="text-sm text-gray-500 mb-2">{correo}</p>

      {tallerInfo ? (
        <>
          <h3 className="text-blue-600 font-semibold">{tallerInfo.nombre}</h3>
          <p className="text-sm text-gray-600">{tallerInfo.descripcion}</p>
          <p className="text-sm text-gray-400 mt-1">Profesor: {tallerInfo.profesor}</p>
        </>
      ) : (
        <p className="text-red-500 text-sm">Taller no encontrado</p>
      )}
    </div>
  );
};

export default InscripcionCard;

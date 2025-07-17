"use client";

import { useEffect, useState } from "react";
import InscripcionesList from "./components/InscripcionesList";
import Loader from "./components/Loader";

export default function Home() {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resInsc = await fetch("https://raices-digitales-default-rtdb.firebaseio.com/inscripciones.json");
        const resTalleres = await fetch("https://raices-digitales-default-rtdb.firebaseio.com/talleres.json");

        const dataInsc = await resInsc.json();
        const dataTalleres = await resTalleres.json();

        const lista = Object.entries(dataInsc || {}).map(([id, insc]) => ({
          id,
          ...insc,
          tallerInfo: dataTalleres?.[insc.tallerId] || null,
        }));

        setInscripciones(lista);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Listado de Inscripciones</h1>
      {loading ? <Loader /> : <InscripcionesList inscripciones={inscripciones} />}
    </main>
  );
}


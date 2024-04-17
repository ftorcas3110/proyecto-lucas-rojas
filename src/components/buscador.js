"use client"
import { useState } from "react";
import { getLicitacionesBuscador } from "@/lib/actions";
import Button from "@/components/button-form";
import Licitacion from "@/components/Licitacion";
import Link from "next/link";

function Buscador() {
    const [query, setQuery] = useState("");
    const [campo, setCampo] = useState("LICITACION");
    const [licitaciones, setLicitaciones] = useState([]);
    const [searched, setSearched] = useState(false); // State to track whether search button is clicked

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = await getLicitacionesBuscador(formData);
        setLicitaciones(data || []); // Update state with fetched data or an empty array
        setSearched(true); // Set searched to true after search button is clicked
    };

    // Function to dynamically update input type based on selected campo value
    const inputType = () => {
        if (campo === "importe") {
            return "number";
        } else if (campo === "fechapresentacion" || campo === "fechaformalizacion") {
            return "datetime-local";
        } else {
            return "text";
        }
    };

    // Function to handle campo change
    const handleCampoChange = (e) => {
        setCampo(e.target.value);
        if (e.target.value === "importe") {
            setQuery(""); // Clear query state when campo is importe
        }
    };

    // Function to format date to ISO-8601 datetime format without milliseconds and with correct timezone format
    const formatDateToISO = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return ""; // Return empty string if the date is invalid
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`; // Return "yyyy-MM-ddTHH:mm" format
    };

    return (
        <>
            <div className="text-center rounded-lg text-black mx-auto">
                <div className="w-[100%]">
                    <form onSubmit={handleSubmit} className="credentials w-[50%] mx-auto">
                        <div className="flex flex-col space-y-4">
                            <label className="flex flex-col text-xl">Campo</label>
                            <select
                                name="campo"
                                className="border p-2 rounded text-center text-xl my-1"
                                value={campo}
                                onChange={handleCampoChange}
                            >
                                <option value="cliente">Cliente</option>
                                <option value="numexpediente">Número de expediente</option>
                                <option value="titulo">Título</option>
                                <option value="fechapresentacion">Fecha de presentación</option>
                                <option value="tipo">Tipo</option>
                                <option value="tipocontrato">Tipo de contrato</option>
                                <option value="importe">Importe</option>
                                <option value="fechaformalizacion">Fecha de Formalización</option>
                                <option value="captadapor">Captada por</option>
                                <option value="presupuestopor">Presupuesto por</option>
                                <option value="estudiopor">Estudio por</option>
                                <option value="presentadapor">Presentada por</option>
                                <option value="estadoini">Estado inicial</option>
                                <option value="estadofinal">Estado final</option>
                                <option value="duracioncontratoanyo">Duración de contrato</option>
                                <option value="observaciones">Observaciones</option>
                            </select>
                            <label className="flex flex-col">
                                <span className="mb-1 text-xl">Buscar</span>
                                <input
                                    type={inputType()}
                                    name="query"
                                    placeholder={campo === "importe" ? "Introduce importe" : "Introduce búsqueda"}
                                    className="mb-4 p-2 border border-gray-300 rounded text-black"
                                    value={campo === "fechapresentacion" || campo === "fechaformalizacion" ? formatDateToISO(query) : query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <Button title="Buscar" onClick={"Búsqueda realizada"}/>
                    </form>
                    <div className="w-[100%]">
                        {/* Conditional rendering of results */}
                        {searched && licitaciones.length === 0 && <p className="text-red-500 text-3xl mt-2">No hay resultados.</p>}
                        {searched && licitaciones.length !== 0 && <p className="text-green-500 text-3xl mt-2">Resultados de búsqueda:</p>}
                        {licitaciones.map((licitacion, index) => (
                            <Licitacion key={index} licitacion={licitacion}>
                                <div className="grid grid-cols-1 w-[200px] justify-center align-middle text-center px-[10px]">
                                    <Link
                                        className="enlace col-span-2 flex justify-center align-middle text-center items-center h-full pt-[15%] mb-2"
                                        href={{ pathname: "/dashboard/edit", query: { item: licitacion.item } }}
                                    >
                                        Editar licitación
                                    </Link>
                                    <Link
                                        className="enlace col-span-2 flex justify-center align-middle text-center items-center h-full pt-[15%] mt-2"
                                        href={{ pathname: "/dashboard/delete", query: { item: licitacion.item } }}
                                    >
                                        Eliminar licitación
                                    </Link>
                                </div>
                            </Licitacion>
                        ))}
                    </div>
                </div>
            </div>
            <hr className="border-2 border-black mt-4"/>
        </>
    );
}

export default Buscador;

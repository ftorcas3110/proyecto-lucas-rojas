"use client"
import { useState } from "react";
import { getLicitacionesAdjudicadasBuscador } from "@/lib/actions";
import Button from "@/components/button-form";
import LicitacionAsignadas from "@/components/LicitacionAsignadas";
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
        const data = await getLicitacionesAdjudicadasBuscador(formData);
        setLicitaciones(data || []); // Update state with fetched data or an empty array
        setSearched(true); // Set searched to true after search button is clicked
    };

    // Function to dynamically update input type based on selected campo value
    const inputType = () => {
        if (campo === "importe") {
            return "number";
        } else if (campo === "fechafinalizacion" || campo === "fechaformalizacion") {
            return "date";
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
        if (!dateString) return ""; // Handle empty or undefined dateString
        const dateParts = dateString.split('-');
        if (dateParts.length < 3) return ""; // Invalid format, return empty string
        // Ensure year, month, and day parts are padded with leading zeros if necessary
        const year = dateParts[0].padStart(4, '0');
        const month = dateParts[1].padStart(2, '0');
        const day = dateParts[2].padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    

    return (
        <>
            <div className="text-center rounded-lg text-black mx-auto">
                <div className="w-[100%]">
                    <form onSubmit={handleSubmit} className="credentials w-[50%] mx-auto">
                        <div className="flex flex-col space-y-4">
                            <label className="flex flex-col text-xl">Buscar por</label>
                            <select
                                name="campo"
                                className="border p-2 rounded text-center text-xl my-1"
                                value={campo}
                                onChange={handleCampoChange}
                            >
                                <option value="cliente">Cliente</option>
                                <option value="numexpediente">Número de expediente</option>
                                <option value="fechaformalizacion">Fecha de inicio</option>
                                <option value="fechafinalizacion">Fecha de fin</option>
                                <option value="responsable">Responsable</option>
                            </select>
                            <label className="flex flex-col">
                                <span className="mb-1 text-xl">Buscar</span>
                                <input
                                    type={inputType()}
                                    name="query"
                                    placeholder={campo === "importe" ? "Introduce importe" : "Introduce búsqueda"}
                                    className="mb-4 p-2 border border-gray-300 rounded text-black"
                                    value={campo === "fechafinalizacion" || campo === "fechaformalizacion" ? formatDateToISO(query) : query}
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
                            <LicitacionAsignadas key={licitacion.item} licitacion={licitacion}>
                            <div className="border border-black items-center text-center align-middle rounded bg-gray-300 cursor-pointer transition duration-500 hover:bg-green-500 w-[100px] h-[50px] flex">
                                <Link
                                    className='flex align-right items-right text-center justify-right w-full pl-[10px]'
                                    href={{ pathname: '/adjudicadas/ficha', query: { item: licitacion.item } }}>
                                    Abrir ficha
                                </Link>
                            </div>
                        </LicitacionAsignadas>
                        ))}
                    </div>
                </div>
            </div>
            <hr className="border-2 border-black mt-4"/>
        </>
    );
}

export default Buscador;

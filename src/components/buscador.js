"use client"
import { useState } from "react";
import { useRouter } from 'next/router'; // Import useRouter hook
import Button from "@/components/button-form";

function Buscador() {
    const [query, setQuery] = useState("");
    const [campo, setCampo] = useState("LICITACION");
    const router = useRouter(); // Initialize useRouter hook

    const handleSubmit = (e) => {
        e.preventDefault();
        // Redirect to '/busqueda' with query parameters
        router.push({
            pathname: '/busqueda',
            query: { query, campo },
        });
    };

    return (
        <div className="text-center container items-center p-8 rounded-lg text-black">
            <form onSubmit={handleSubmit} className="credentials">
                <div className="flex flex-col space-y-4">
                    <label className="flex flex-col">
                        <span className="mb-1">Buscar</span>
                        <input
                            type="text"
                            name="query"
                            placeholder="correo@lucasrojas.com"
                            className="p-2 border border-gray-300 rounded text-black"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            required
                        />
                    </label>
                    <label className="flex flex-col">Campo</label>
                    <select
                        name="campo"
                        className="border p-2 rounded text-center text-xl my-1"
                        value={campo}
                        onChange={(e) => setCampo(e.target.value)}
                    >
                        <option value="LICITACION">Licitación</option>
                        <option value="fechapresentacion">Fecha de presentación</option>
                        <option value="cliente">Cliente</option>
                            <option value="numexpediente">Número de expediente</option>
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
                </div>
                <Button title="Buscar" type="submit" />
            </form>
        </div>
    );
}

export default Buscador;

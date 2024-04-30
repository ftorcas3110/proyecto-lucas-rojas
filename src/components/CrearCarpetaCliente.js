// components/CrearCarpetaCliente.js
"use client"
import React, { useState } from 'react';

const CrearCarpetaCliente = () => {
  const [rutaCarpeta, setRutaCarpeta] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = (event) => {
    setRutaCarpeta(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/crearCarpeta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rutaCarpeta }),
      });
      const data = await response.json();
      setMensaje(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={rutaCarpeta} onChange={handleChange} />
        <button type="submit">Crear Carpeta</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CrearCarpetaCliente;

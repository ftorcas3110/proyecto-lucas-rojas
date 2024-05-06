"use client"
import React from 'react';

const Firefox = () => {
  // Función para abrir la carpeta en Firefox
  const openFolderInFirefox = () => {
    // URL de la carpeta a abrir
    const folderUrl = 'file:///Z:/Licitaciones%20PC/2024/03_Marzo/01_AytoSanRoque_Informatica%20y%20Consum/';

    // Verifica si el navegador actual es Firefox
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    // Si el navegador actual no es Firefox, abre la URL en Firefox
    if (!isFirefox) {
      window.open(folderUrl, '_blank');
    }
  };

  return (
    <div>
      <button onClick={openFolderInFirefox}>Abrir carpeta en Firefox</button>
    </div>
  );
};

export default Firefox;


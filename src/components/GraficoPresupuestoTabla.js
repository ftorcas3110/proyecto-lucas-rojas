"use client"
import React, { useState, useEffect } from 'react';

const Graficos = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [startMonth, setStartMonth] = useState(0);
  const [endMonth, setEndMonth] = useState(0);
  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1cAcgzxl_N0NG0S14astjJ7cWl-00nDBaWc4Zba6mAew/values/Sheet1!A:R?key=AIzaSyDGmjbYq0W7f60bCn8yjwMZzKCm8KBm420');
        const jsonData = await response.json();
        const sheetData = jsonData.values || [];
        setData(sheetData.slice(1));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const filteredData = data.filter(item => {
      const date = new Date(item[1]); // Corregir el índice a 10 para la columna K
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return (
        (selectedMonth === 0 || month === parseInt(selectedMonth)) &&
        (selectedYear === 0 || year === parseInt(selectedYear)) &&
        (startMonth === 0 || (year > parseInt(startYear) || (year === parseInt(startYear) && month >= parseInt(startMonth)))) &&
        (endMonth === 0 || (year < parseInt(endYear) || (year === parseInt(endYear) && month <= parseInt(endMonth))))
      );
    });

    setFilteredData(filteredData);
  }, [data, selectedMonth, selectedYear, startMonth, endMonth, startYear, endYear]);

  const handleStartMonthChange = (event) => {
    setStartMonth(event.target.value);
  };

  const handleEndMonthChange = (event) => {
    setEndMonth(event.target.value);
  };

  const handleStartYearChange = (event) => {
    setStartYear(event.target.value);
  };

  const handleEndYearChange = (event) => {
    setEndYear(event.target.value);
  };

  const handleResetFilters = () => {
    setSelectedMonth(0);
    setSelectedYear(0);
    setStartMonth(0);
    setEndMonth(0);
    setStartYear(0);
    setEndYear(0);
  };

  const countOccurrences = () => {
    const occurrences = {};
    filteredData.forEach(item => {
      const presupuestador = item[9]; // No necesita cambiar, ya que es la columna J
      const valueM = item[12]; // Corregir el índice a 12 para la columna M
      if (presupuestador && valueM) {
        if (!occurrences[presupuestador]) {
          occurrences[presupuestador] = {};
        }
        occurrences[presupuestador][valueM] = (occurrences[presupuestador][valueM] || 0) + 1;
      }
    });
    return occurrences;
  };

  const renderTableHeaders = (occurrences) => {
    const valuesM = new Set();
    Object.values(occurrences).forEach(presupuestadorOccurrences => {
      Object.keys(presupuestadorOccurrences).forEach(valueM => {
        valuesM.add(valueM);
      });
    });
    return (
      <tr>
        <th className="py-2 px-4">Presupuestador</th>
        {[...valuesM].map(valueM => (
          <th key={valueM} className="py-2 px-4">{valueM}</th>
        ))}
      </tr>
    );
  };

  const renderTableRows = (occurrences) => {
    const presupuestadores = Object.keys(occurrences);
    const allValuesM = new Set();
    presupuestadores.forEach(presupuestador => {
      Object.keys(occurrences[presupuestador]).forEach(valueM => {
        allValuesM.add(valueM);
      });
    });

    return presupuestadores.map(presupuestador => (
      <tr key={presupuestador}>
        <td className="py-2 px-4">{presupuestador}</td>
        {[...allValuesM].map(valueM => (
          <td key={valueM} className="py-2 px-4">{occurrences[presupuestador][valueM] || 0}</td>
        ))}
      </tr>
    ));
  };

  const occurrences = countOccurrences();

  return (
    <>
      <div className='justify-center'>
        <p className='text-center'>Presupuestos</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
          <div>
            <label htmlFor="startMonthSelect" className='text-center block'>Inicio Mes</label>
            <select
              id="startMonthSelect"
              onChange={handleStartMonthChange}
              value={startMonth}
              className="w-full p-2 border border-gray-300 rounded-md text-center"
            >
              <option value="0">Todos los meses</option>
              {Array.from({ length: 12 }, (_, index) => index + 1).map(month => (
                <option key={month} value={month}>
                  {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="endMonthSelect" className='text-center block'>Fin Mes</label>
            <select
              id="endMonthSelect"
              onChange={handleEndMonthChange}
              value={endMonth}
              className="w-full p-2 border border-gray-300 rounded-md text-center"
            >
              <option value="0">Todos los meses</option>
              {Array.from({ length: 12 }, (_, index) => index + 1).map(month => (
                <option key={month} value={month}>
                  {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="startYearSelect" className='text-center block'>Inicio Año</label>
            <select
              id="startYearSelect"
              onChange={handleStartYearChange}
              value={startYear}
              className="w-full p-2 border border-gray-300 rounded-md text-center"
            >
              <option value="0">Todos los años</option>
              {Array.from({ length: 8 }, (_, index) => 2023 + index).map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="endYearSelect" className='text-center block'>Fin Año</label>
            <select
              id="endYearSelect"
              onChange={handleEndYearChange}
              value={endYear}
              className="w-full p-2 border border-gray-300 rounded-md text-center"
            >
              <option value="0">Todos los años</option>
              {Array.from({ length: 8 }, (_, index) => 2023 + index).map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 mx-auto">
            <button
              onClick={handleResetFilters}
              className="w-[100%] p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Resetear Filtros
            </button>
          </div>
          <div className="col-span-2 overflow-auto">
            <table className="w-full border border-black">
              <thead>
                {renderTableHeaders(occurrences)}
              </thead>
              <tbody>
                {renderTableRows(occurrences)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style>
        {`
          table {
            border-collapse: collapse;
            width: 100%;
            border: 1px solid black;
            text-align: center;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          .py-2 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
          .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        `}
      </style>
    </>
  );
};

export default Graficos;

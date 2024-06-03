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
        const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1cAcgzxl_N0NG0S14astjJ7cWl-00nDBaWc4Zba6mAew/values/Sheet1!A:AA?key=AIzaSyDGmjbYq0W7f60bCn8yjwMZzKCm8KBm420');
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
    let totalSum = 0;
    filteredData.forEach(item => {
      const columnKData = item[9];
      const valueM = item[12];
      if (columnKData && valueM) {
        if (!occurrences[columnKData]) {
          occurrences[columnKData] = {};
        }
        occurrences[columnKData][valueM] = (occurrences[columnKData][valueM] || 0) + 1;
        totalSum++;
      }
    });
    return { occurrences, totalSum };
  };

  const renderTableHeaders = (occurrences, totalSum) => {
    const valuesM = new Set();
    Object.values(occurrences).forEach(columnKOccurrences => {
      Object.keys(columnKOccurrences).forEach(valueM => {
        valuesM.add(valueM);
      });
    });
    return (
      <tr>
        <th className="py-2 px-4">Presupuesto por</th>
        {[...valuesM].map(valueM => (
          <th key={valueM} className="py-2 px-4">{valueM}</th>
        ))}
        <th className="py-2 px-4">Total</th>
        <th className="py-2 px-4">Porcentaje</th> {/* Agregar el encabezado para la columna de porcentajes */}
      </tr>
    );
  };

  const renderTableRows = (filteredData) => {
    const { occurrences, totalSum } = countOccurrences(filteredData);
    const columnKData = Object.keys(occurrences);
    const allValuesM = new Set();
    columnKData.forEach(columnK => {
      Object.keys(occurrences[columnK]).forEach(valueM => {
        allValuesM.add(valueM);
      });
    });

    console.log("Total sum:", totalSum);

    return columnKData.map(columnK => {
      const total = Object.values(occurrences[columnK]).reduce((acc, curr) => acc + curr, 0);
      const percentage = totalSum !== 0 ? (total / totalSum * 100).toFixed(2) : 0;

      return (
        <tr key={columnK}>
          <td className="py-2 px-4">{columnK}</td>
          {[...allValuesM].map(valueM => (
            <td key={valueM} className="py-2 px-4">{occurrences[columnK][valueM] || 0}</td>
          ))}
          <td className="py-2 px-4">{total}</td>
          <td className="py-2 px-4">{isNaN(percentage) ? "0%" : percentage}%</td> {/* Asegúrate de manejar el caso en el que el porcentaje sea NaN */}
        </tr>
      );
    });
  };


  const { occurrences, totalSum } = countOccurrences(); // Obtiene tanto las ocurrencias como el total general
  // const totalSum = Object.values(occurrences).reduce((acc, columnKOccurrences) => {
  //   const columnKSum = Object.values(columnKOccurrences).reduce((sum, value) => sum + value, 0);
  //   return acc + columnKSum;
  // }, 0);

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
          <div className="col-span-2 mx-auto">
            <table className="w-full max-w-full border border-black">
              <thead>
                {renderTableHeaders(occurrences)}
              </thead>
              <tbody>
                {renderTableRows(filteredData)}
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

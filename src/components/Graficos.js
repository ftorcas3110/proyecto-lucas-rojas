"use client";
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Graficos = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [startMonth, setStartMonth] = useState(0);
  const [endMonth, setEndMonth] = useState(0);
  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const [selectedPresupuestador, setSelectedPresupuestador] = useState('');
  const [presupuestadores, setPresupuestadores] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1cAcgzxl_N0NG0S14astjJ7cWl-00nDBaWc4Zba6mAew/values/Sheet1!A:Q?key=AIzaSyDGmjbYq0W7f60bCn8yjwMZzKCm8KBm420');
        const jsonData = await response.json();
        const sheetData = jsonData.values || [];
        setData(sheetData.slice(1));
        updatePresupuestadores(sheetData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updatePresupuestadores = (sheetData) => {
    const presupuestadoresSet = new Set();
    for (let i = 1; i < sheetData.length; i++) {
      const item = sheetData[i];
      const presupuestador = item[10] || 'Sin presupuestador';
      presupuestadoresSet.add(presupuestador);
    }
    setPresupuestadores(Array.from(presupuestadoresSet));
  };

  useEffect(() => {
    if (data.length === 0) return;

    const filteredData = data.filter(item => {
      const date = new Date(item[1]);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const presupuestador = item[10] || 'Sin presupuestador';
      return (
        (selectedMonth === 0 || month === selectedMonth) &&
        (selectedYear === 0 || year === selectedYear) &&
        (startMonth === 0 || (year > startYear || (year === startYear && month >= startMonth))) &&
        (endMonth === 0 || (year < endYear || (year === endYear && month <= endMonth))) &&
        (selectedPresupuestador === '' || presupuestador === selectedPresupuestador)
      );
    });

    const filteredDataWithoutSinPresupuestador = filteredData.filter(item => {
      const presupuestador = item[10] || 'Sin presupuestador';
      return presupuestador !== 'Sin presupuestador';
    });

    const userCountsByState = filteredDataWithoutSinPresupuestador.reduce((countsByState, item) => {
      const presupuestador = item[10] || 'Sin presupuestador';
      const state = item[12] || 'Estado no disponible';
      countsByState[presupuestador] = countsByState[presupuestador] || {};
      countsByState[presupuestador][state] = (countsByState[presupuestador][state] || 0) + 1;
      return countsByState;
    }, {});

    const totalOccurrencesByUser = Object.keys(userCountsByState).reduce((totalCounts, user) => {
      totalCounts[user] = Object.values(userCountsByState[user]).reduce((sum, value) => sum + value, 0);
      return totalCounts;
    }, {});

    const labels = Object.keys(userCountsByState);
    const datasets = labels.length > 0 ? Object.keys(userCountsByState[labels[0]]).map((state, index) => {
      const values = labels.map(user => userCountsByState[user][state] || 0);
      return {
        label: state,
        data: values,
        backgroundColor: getBackgroundColor(state),
        borderColor: getBorderColor(state),
        borderWidth: 1,
      };
    }) : [];

    datasets.unshift({
      label: 'Total',
      data: labels.map(user => totalOccurrencesByUser[user] || 0),
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // Black
      borderColor: 'rgba(0, 0, 0, 1)', // Black
      borderWidth: 1,
    });

    const ctx = document.getElementById('myChart');
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, selectedMonth, selectedYear, startMonth, endMonth, startYear, endYear, selectedPresupuestador]);

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

  const handlePresupuestadorChange = (event) => {
    setSelectedPresupuestador(event.target.value);
  };

  const staticYears = Array.from({ length: 8 }, (_, index) => 2023 + index);

  const getBackgroundColor = (state) => {
    switch (state) {
      case 'ADJUDICADA':
        return 'rgba(0, 255, 0, 0.8)'; // Green
      case 'EN ESPERA RESOLUCIÓN':
        return 'rgba(0, 0, 255, 0.8)'; // Blue
      case 'NO ADJUDICADA':
        return 'rgba(255, 0, 0, 0.8)'; // Red
      case 'DESESTIMADA':
        return 'rgba(128, 0, 128, 0.8)'; // Purple
      default:
        return 'rgba(0, 0, 0, 0.8)'; // Black for 'Total'
    }
  };

  const getBorderColor = (state) => {
    switch (state) {
      case 'ADJUDICADA':
        return 'rgba(0, 255, 0, 1)'; // Green
      case 'EN ESPERA RESOLUCIÓN':
        return 'rgba(0, 0, 255, 1)'; // Blue
      case 'NO ADJUDICADA':
        return 'rgba(255, 0, 0, 1)'; // Red
      case 'DESESTIMADA':
        return 'rgba(128, 0, 128, 1)'; // Purple
      default:
        return 'rgba(0, 0, 0, 1)'; // Black for 'Total'
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="startMonthSelect">Inicio Mes:</label>
        <select id="startMonthSelect" onChange={handleStartMonthChange}>
          <option value="0">Todos los meses</option>
          {Array.from({ length: 12 }, (_, index) => index + 1).map(month => (
            <option key={month} value={month}>{new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>
        <label htmlFor="endMonthSelect">Fin Mes:</label>
        <select id="endMonthSelect" onChange={handleEndMonthChange}>
          <option value="0">Todos los meses</option>
          {Array.from({ length: 12 }, (_, index) => index + 1).map(month => (
            <option key={month} value={month}>{new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="startYearSelect">Inicio Año:</label>
        <select id="startYearSelect" onChange={handleStartYearChange}>
          <option value="0">Todos los años</option>
          {staticYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <label htmlFor="endYearSelect">Fin Año:</label>
        <select id="endYearSelect" onChange={handleEndYearChange}>
          <option value="0">Todos los años</option>
          {staticYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="presupuestadorSelect">Presupuestador:</label>
        <select id="presupuestadorSelect" onChange={handlePresupuestadorChange}>
          <option value="">Todos los presupuestadores</option>
          {presupuestadores.map(presupuestador => (
            <option key={presupuestador} value={presupuestador}>{presupuestador}</option>
          ))}
        </select>
      </div>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default Graficos;
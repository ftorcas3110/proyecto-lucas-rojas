"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Link from 'next/link';

// Configuración del idioma para FullCalendar
import esLocale from '@fullcalendar/core/locales/es';

const Calendar = ({ events: initialEvents, usuario }) => {
  const [events, setEvents] = useState(initialEvents);

  const eventContent = ({ event }) => {
    let backgroundColorClass = '';
    if (event.extendedProps?.categoria === 'ANEXOS') {
      backgroundColorClass = 'bg-blue-500 text-white';
    } else if (event.extendedProps?.categoria === 'DESESTIMADA') {
      backgroundColorClass = 'bg-red-400 text-white';
    } else if (event.extendedProps?.categoria === "EN ESTUDIO") {
      backgroundColorClass = 'bg-yellow-400 text-white';
    } else if (event.extendedProps?.categoria === "PRESENTACIÓN") {
      backgroundColorClass = 'bg-orange-400 text-white';
    } else if (event.extendedProps?.categoria === "PRESENTADA") {
      backgroundColorClass = 'bg-green-400 text-white';
    } else if (event.extendedProps?.categoria === "PRESUPUESTO") {
      backgroundColorClass = 'bg-orange-700 text-white';
    } else if (event.extendedProps?.categoria === "REQUERIMIENTOS") {
      backgroundColorClass = 'bg-purple-200 text-black';
    }
    return (
      <Link
      className='justify-left align-left text-left'
      href={{ pathname: '/calendario/edit', query: { id: event.id } }}>
      <div className= {`p-2 m-[-1px] rounded ${backgroundColorClass}`}>
        {usuario} - {event.title}       
      </div>
      </Link>
    );
  };

  return (
    <div className='w-[80%] mx-auto max-h-[calc(100vh - 100px)] overflow-y-auto'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locales={[esLocale]}
        events={events}
        eventContent={eventContent} // Usamos la función eventContent para personalizar la representación de cada evento
      />
    </div>
  );
};

export default Calendar;

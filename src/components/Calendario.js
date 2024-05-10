"use client"
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import Link from 'next/link';

const Calendar = ({ events: initialEvents }) => {
  const eventContent = ({ event }) => {
    const eventStart = event.start;
    const eventEnd = event.end;

    // Calcular la diferencia en días entre la fecha de inicio y fin del evento
    const eventDurationInDays = Math.round((eventEnd - eventStart) / (1000 * 60 * 60 * 24));

    // Determinar si el evento dura más de un día
    const isMultiDayEvent = eventDurationInDays > 1;

    // Clase de Tailwind CSS para eventos de más de un día
    const eventClass = isMultiDayEvent ? 'min-w-[100%]' : '';

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

    const title = `${event.extendedProps.creador} - ${event.title}`;

    return (  
      <Link
        className='justify-left align-left text-left w-[100%]'
        href={{ pathname: '/calendario/edit', query: { id: event.id } }}>
        <div className={`p-2 rounded ${backgroundColorClass} ${eventClass} max-w-[200px] min-w-[100%] flex justify-left items-center m-1`}>
          <p className="overflow-hidden whitespace-nowrap max-w-[100%] truncate" title={title}>
            {title}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <div className='w-[80%] mx-auto max-h-[calc(100vh - 100px)] overflow-y-auto overflow-x-auto'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locales={[esLocale]}
        events={initialEvents}
        eventContent={eventContent}
      />
    </div>
  );
};

export default Calendar;

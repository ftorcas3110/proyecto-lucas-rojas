"use client"
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// Configuración del idioma para FullCalendar
import esLocale from '@fullcalendar/core/locales/es';

const Calendar = ({ events: initialEvents, usuario }) => {
  const [events, setEvents] = useState(initialEvents);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({});
  const [eventToEdit, setEventToEdit] = useState(null);

  const handleAddEvent = () => {
    setShowForm(true);
    setEventToEdit(null); // Al agregar un nuevo evento, limpiamos el evento que estamos editando
    setNewEvent({}); // Limpiamos los datos del nuevo evento
  };

  const handleEditEvent = (eventId) => {
    const event = events.find(event => event.id === eventId);
    if (event) {
      setShowForm(true);
      setEventToEdit(event);
      setNewEvent(event); // Establecemos los datos del evento a editar en el estado newEvent
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setNewEvent({});
    setEventToEdit(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (eventToEdit) {
      // Si estamos editando un evento existente, actualizamos su información
      const updatedEvents = events.map(event =>
        event.id === eventToEdit.id ? { ...event, ...newEvent } : event
      );
      setEvents(updatedEvents);
    } else {
      // Si estamos creando un nuevo evento, lo agregamos a la lista de eventos
      const newEventWithUser = {
        ...newEvent,
        id: `event-${Date.now()}`, // Generamos un ID único para el nuevo evento
        title: `[${usuario}] - ${newEvent.title}` // Agregamos el nombre de usuario al título del evento
      };
      setEvents(prevEvents => [...prevEvents, newEventWithUser]);
    }
    setShowForm(false);
    setNewEvent({});
    setEventToEdit(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const eventContent = ({ event }) => {
    return (
      <div>
        <span>{event.title}</span>
        <button onClick={() => handleDeleteEvent(event.id)}>Eliminar</button>
        <button onClick={() => handleEditEvent(event.id)}>Editar</button>
      </div>
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        locales={[ esLocale ]}
        events={events}
        eventContent={eventContent} // Usamos la función eventContent para personalizar la representación de cada evento
      />
      <button onClick={handleAddEvent}>Añadir evento</button>
      {showForm && (
        <div>
          <h3>{eventToEdit ? 'Editar evento' : 'Crear nuevo evento'}</h3>
          <form onSubmit={handleFormSubmit}>
            <label>
              Título:
              <input type="text" name="title" value={newEvent.title || ''} onChange={handleInputChange} />
            </label>
            <label>
              Fecha de inicio:
              <input type="date" name="start" value={newEvent.start || ''} onChange={handleInputChange} />
            </label>
            <label>
              Fecha de fin:
              <input type="date" name="end" value={newEvent.end || ''} onChange={handleInputChange} />
            </label>
            <button type="button" onClick={handleCloseForm}>Cancelar</button>
            <button type="submit">{eventToEdit ? 'Guardar cambios' : 'Crear'}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Calendar;

// pages/index.js
import React from 'react';
import Calendario from '@/components/Calendario';
import { auth } from "@/auth";

export const dynamic = 'force-dynamic'

const sesion = await auth();
if (!sesion) redirect('/');

const events = [
  {
    title: 'Evento 1',
    start: '2024-04-25',
    end: '2024-04-27',
  },
  {
    title: 'Evento 2',
    start: '2024-04-28',
    end: '2024-04-30',
  },
  // Añade más eventos según sea necesario
];

const HomePage = () => {
  return (
    <div>
      <h1>Calendario</h1>
      <Calendario events={events} usuario={sesion?.user.name}/>
    </div>
  );
};

export default HomePage;
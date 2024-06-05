// pages/index.js
import React from 'react';
import Calendario from '@/components/Calendario';
import { auth } from "@/auth";
import { getEventos } from '@/lib/actions';

export const dynamic = 'force-dynamic'

export default async function HomePage(){
  const sesion = await auth();
  if (!sesion) redirect('/');
  const events = await getEventos();
  // console.log(events);
  return (
    <div className='mb-[4vh] mt-[150px]'>
      <Calendario events={events} usuario={sesion?.user?.name}/>
    </div>
  );
};
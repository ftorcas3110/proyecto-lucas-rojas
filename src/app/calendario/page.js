// pages/index.js
import React from 'react';
import Calendario from '@/components/Calendario';
import { auth } from "@/auth";
import { getEventos } from '@/lib/actions';
import Link from 'next/link';

export const dynamic = 'force-dynamic'

export default async function HomePage(){
  const sesion = await auth();
  if (!sesion) redirect('/');
  const events = await getEventos();
  console.log(events);
  return (
    <div>
      <h1>Calendario</h1>
      <Link href="/calendario/new" className='bg-black text-white rounded align-middle items-center text-center'> Nuevo evento </Link>
      <Calendario events={events} usuario={sesion?.user.name}/>
    </div>
  );
};
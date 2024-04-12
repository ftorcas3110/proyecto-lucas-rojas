"use server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { auth, signIn, signOut } from "@/auth";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const session = await auth();
// REGISTER
export async function register(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email);
  // Comprobamos si el usuario ya está registrado
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (user) {
    return { error: "El email ya está registrado" };
  }

  // Encriptamos password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Guardamos credenciales en base datos
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Registro correcto" };
}

// LOGIN credentials
export async function login(formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  // Comprobamos si el usuario está registrado
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    return { error: 'Usuario no registrado.' }
  }

  // Comparamos password 
  const matchPassword = await bcrypt.compare(password, user.password)

  if (user && matchPassword) {  // && user.emailVerified
    await signIn('credentials', { email, password, redirectTo: '/dashboard' })
    return { success: "Inicio de sesión correcto" }
  } else {
    return { error: 'Credenciales incorrectas.' }
  }
}


// LOGOUT
export async function logout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    throw error;
  }
}

// Acciones base de datos

export async function getLicitaciones() {
  try {
    const licitaciones = await prisma.licitacion.findMany({
      orderBy: [{ item: "desc" }]
    })
    return licitaciones;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}

export async function getLicitacionesAsignadas() {
  try {
    const licitaciones = await prisma.licitacion.findMany({
      orderBy: [{ item: "desc" }],
      where: {
        AND: [
          {
            presupuestopor: null,
            estudiopor: {
                contains: session.user.name, 
            },
          },
        ],
      },
    })
    console.log(licitaciones);
    return licitaciones;
  } catch (error) {
    console.log(error);  
    return null;
  }
}

export async function getLicitacionesEnPresupuesto() {
  try {
    const licitaciones = await prisma.licitacion.findMany({
      orderBy: [{ item: "desc" }],
      where: {
        presupuestopor: {
          endsWith: session.user.name,
        },
      },
    })
    return licitaciones;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}

export async function misLicitaciones(formData) {
  const item = Number(formData.get('item'))
  const presupuestopor = session.user.name

  try {
    const licitacion = await prisma.licitacion.update({
      where: { item },
      data: {
        presupuestopor
      },
    })
    console.log(licitacion);
    revalidatePath('/asignadas')
  } catch (error) {
    console.log(error);
  }
  redirect('/asignadas');
}

export async function deleteMiLicitacion(formData) {
  const item = Number(formData.get('item'))
  const presupuestopor = null

  try {
    const licitacion = await prisma.licitacion.update({
      where: { item },
      data: {
        presupuestopor
      },
    })
    console.log(licitacion);
    revalidatePath('/mislicitaciones')
  } catch (error) {
    console.log(error);
  }
  redirect('/mislicitaciones');
}

export async function newLicitacion(formData) {
  try {
    const fechapresentacion = formData.get('fechapresentacion')
    const cliente = formData.get('cliente')
    const importe = Number(formData.get('importe'))
    const numexpediente = formData.get('numexpediente')
    const tipo = formData.get('tipo')
    const tipocontrato = formData.get('tipocontrato')
    const duracioncontratoanyo = formData.get('duracioncontratoanyo')
    const estadoini = formData.get('estadoini')
    const estadofinal = formData.get('estadofinal')
    const fechaformalizacion = formData.get('fechaformalizacion')
    const observaciones = formData.get('observaciones')
    const presentadapor = formData.get('presentadapor')
    const presupuestopor = formData.get('presupuesto')
    const estudiopor = formData.get('estudiopor')
    const titulo = formData.get('titulo')
    const captadapor = formData.get('captadapor')

    const licitacion = await prisma.licitacion.create({
      data: {
        fechapresentacion,
        cliente,
        importe,
        numexpediente,
        tipo,
        tipocontrato,
        duracioncontratoanyo,
        estadoini,
        estadofinal,
        fechaformalizacion,
        observaciones,
        presentadapor,
        estudiopor,
        presupuestopor,
        titulo,
        captadapor
      },
    })

    console.log(licitacion);
    revalidatePath('/dashboard')
  } catch (error) {
    console.log(error);
  }
  redirect('/dashboard');
}

export async function editLicitacion(formData) {
  const item = Number(formData.get('item'))
  const fechapresentacion = formData.get('fechapresentacion')
  const cliente = formData.get('cliente')
  const importe = Number(formData.get('importe'))
  const numexpediente = formData.get('numexpediente')
  const tipo = formData.get('tipo')
  const tipocontrato = formData.get('tipocontrato')
  const duracioncontratoanyo = formData.get('duracioncontratoanyo')
  const estadoini = formData.get('estadoini')
  const estadofinal = formData.get('estadofinal')
  const fechaformalizacion = formData.get('fechaformalizacion')
  const observaciones = formData.get('observaciones')
  const presentadapor = formData.get('presentadapor')
  const presupuestopor = formData.get('presupuesto')
  const estudiopor = formData.get('estudiopor')
  const titulo = formData.get('titulo')
  const captadapor = formData.get('captadapor')

  try {
    const licitacion = await prisma.licitacion.update({
      where: { item },
      data: {
        fechapresentacion,
        cliente,
        importe,
        numexpediente,
        tipo,
        tipocontrato,
        duracioncontratoanyo,
        estadoini,
        estadofinal,
        fechaformalizacion,
        observaciones,
        presentadapor,
        estudiopor,
        presupuestopor,
        titulo,
        captadapor
      },
    })
    console.log(licitacion);
    revalidatePath('/dashboard')
  } catch (error) {
    console.log(error);
  }
  redirect('/dashboard');
}

export async function deleteLicitacion(formData) {
  try {
    const item = Number(formData.get('item'))

    const licitacion = await prisma.licitacion.delete({
      where: {
        item: item,
      },
    })
    console.log(licitacion);
    revalidatePath('/dashboard')
  } catch (error) {
    console.log(error);
  }

  redirect('/dashboard');
}
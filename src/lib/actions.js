"use server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
    const licitaciones = await prisma.licitacion.findMany()
    return licitaciones;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}


export async function newLicitacion(formData) {
  try {
    const fechapresentacion = formData.get('fechapresentacion')
    const cliente = formData.get('cliente')
    const importe = Number( formData.get('importe')) 
    const numexpediente = formData.get('numexpediente')
    const numlicitadores = formData.get('numlicitadores') 
    const tipo = formData.get('tipo') 
    const tipocontrato = formData.get('tipocontrato') 
    const duracioncontratoanyo = formData.get('duracioncontratoanyo')
    const estadoini = formData.get('estadoini')
    const estadofinal = formData.get('estadofinal') 
    const fechaformalizacion = formData.get('fechaformalizacion') 
    const observaciones = formData.get('observaciones') 
    const presentadapor = formData.get('presentadapor') 
    const presupuesto = formData.get('presupuesto') 
    const titulo = formData.get('titulo') 

    const licitacion = await prisma.licitacion.create({
      data: { fechapresentacion, 
        cliente, 
        importe, 
        numexpediente, 
        numlicitadores,
        tipo,
        tipocontrato,
        duracioncontratoanyo,
        estadoini,
        estadofinal,
        fechaformalizacion,
        observaciones,
        presentadapor,
        presupuesto,
        titulo  },
    })

    console.log(licitacion);
    revalidatePath('/dashboard')
  } catch (error) {
    console.log(error);
  }
  redirect('/dashboard');
}

export async function editArticulo(formData) {
  const id = Number( formData.get('id') )
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const precio = Number( formData.get('precio')) 

  try {
    const articulo = await prisma.articulo.update({
      where: { id },
      data: {  nombre, descripcion, precio },
    })
    console.log(articulo);
    revalidatePath('/proveedor')
  } catch (error) {
    console.log(error);
  }
  redirect('/proveedor');
}

export async function deleteArticulo(formData) {
  try {
    const id = Number( formData.get('id') )
  
    const articulo = await prisma.articulo.delete({
      where: {
        id: id,
      },
    })
    console.log(articulo);
    revalidatePath('/proveedor')
  } catch (error) {
    console.log(error);
  }

  redirect('/proveedor');
}
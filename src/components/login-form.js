"use client";
import { useState } from "react";
import { login } from "@/lib/actions";
import Button from "@/components/button-form";

export function LoginForm() {
  const [resultado, setResultado] = useState("");
  const [tipo, setTipo] = useState("");

  async function wrapper(data) {
    const message = await login(data); 
    if (message?.success) {
      //setTipo("success");
      //setResultado(message.success);
    }
    if (message?.error) {
      setTipo("error");
      setResultado(message.error);
    }
  }
  return (
    <form
      action={wrapper}
      className="auth"
    >
      <div className="flex flex-col items-center mb-4 text-black">
        <label className="mb-2">Correo</label>
        <input
          type="email"
          name="email"
          placeholder="correo@lucasrojas.com"
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col items-center mb-4 text-black">
        <label className="mb-2">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          className="border p-2 rounded"
        />
      </div>
      <p className={`info ${tipo} mb-4`}> {resultado} </p>      
        <Button title="Iniciar sesión" onClick={"Sesión iniciada con éxito"}/>
    </form>
  );
}

"use client";
import { useState, useRef, useEffect } from "react";
import { register } from "@/lib/actions";
import { redirect } from "next/navigation";
import Button from "@/components/button-form";

function RegisterForm() {
  const [resultado, setResultado] = useState("");
  const [tipo, setTipo] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.addEventListener("focus", funcionContrasenaFocus)
  }, []);

  useEffect(() => {
    inputRef.current.addEventListener("focusout", funcionContrasenaPierdeFocus)
  }, []);

  function funcionContrasenaFocus(){
    inputRef.current.previousSibling.innerHTML = "La contraseña debe contener 8 caracteres, entre ellos un número, una letra y un caracter especial";
  }

  function funcionContrasenaPierdeFocus(){
    inputRef.current.previousSibling.innerHTML = "Contraseña";
  }

  async function wrapper(data) {
    const message = await register(data);
    if (message.success) {
      setTipo("success");
      // setResultado(message.success);
      redirect("/");
    } else {
      setTipo("error");
      setResultado(message.error);
    }
  }
  return (
      <div className="text-center container  items-center p-8 rounded-lg text-black">
      <form action={wrapper} className="credentials">
        <div className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span className="mb-1">Nombre</span>
            <input
              type="text"
              name="name"
              placeholder="Tu Nombre"
              className="p-2 border border-gray-300 rounded text-black"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1">Email</span>
            <input
              type="email"
              name="email"
              placeholder="correo@lucasrojas.com"
              className="p-2 border border-gray-300 rounded text-black"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1">Contraseña</span>
            <input
              type="password"
              name="password"
              placeholder="******"
              className="p-2 border border-gray-300 rounded text-black contraseña"
              minLength={8}
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
              ref={inputRef}
              required
            />
          </label>

          <p className={`info ${tipo} text-center`}>{resultado}</p>
        </div>

        <Button title="Crear usuario" />
      </form>
      </div>
  );
}

export default RegisterForm;

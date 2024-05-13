/** @type {import('next').NextConfig} */
const nextConfig = {
    // Otras configuraciones...
  
    // Configuración para aumentar el tiempo límite de generación de páginas estáticas
    staticPageGenerationTimeout: 120000, // Tiempo en milisegundos (en este caso, 2 minutos)
  };
  
  export default nextConfig;
  
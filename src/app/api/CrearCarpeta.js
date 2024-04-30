// pages/api/crearCarpeta.js

import fs from 'fs';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { rutaCarpeta } = req.body;
    try {
      if (!fs.existsSync(rutaCarpeta)) {
        fs.mkdirSync(rutaCarpeta, { recursive: true });
        return res.status(200).json({ message: 'Carpeta creada' });
      } else {
        return res.status(200).json({ message: 'La carpeta ya existe' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear la carpeta' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}

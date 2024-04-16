// src/controllers/VisitaController.ts
import { Request, Response } from 'express';
import Visita from '../models/visita';
import path from 'path';
import fs from 'fs';
import Solicitante from '../models/solicitante';
import Domicilio from '../models/domicilio';

export const getVisitasPendientes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const visitas = await Visita.findAll({
      include: [
        { model: Solicitante },
        { model: Domicilio }
      ],
      where: {
        solicitante_idSolicitante: id,
        domicilio_idDomicilio: id,
        confirmacionSolicitante: false
      }
    });

    if(visitas.length === 0){
      res.status(400).json('Solicitante con id: ' +id+ ' visitado')
    }else{

      res.json(visitas);
    }



  } catch (error) {
    console.error('Error al obtener las visitas pendientes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const actualizarEstatus = async (req: Request, res: Response) => {
  try {
    const { id, estatus, Razon, latitud, longitud, fotoCasa } = req.body;
    await Visita.update(
      { estatus, Razon, latitudVisita: latitud, longitudVisita: longitud, fotoDomicilio: fotoCasa },
      { where: { idVisita: id } }
    );
    res.json({ message: 'Estatus actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el estatus de la visita:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const confirmarVisita = async (req: Request, res: Response) => {
  try {
    const { idSolicitante, idDomicilio, idUsuario, fecha, hora, latitud, longitud } = req.body;
    await Visita.create({
      idVisita: 0,
      confirmacionSolicitante: true,
      estatus: 'EN',
      Razon: 'encontrado', // Corregido a minúscula para que coincida con la definición del modelo
      fecha: new Date(fecha), // Asegúrate de convertir la fecha a un objeto Date si no lo es
      hora, // No es necesario convertir la hora si ya está en el formato correcto
      latitudVisita: latitud,
      longitudVisita: longitud,
      fotoDomicilio: '...', // Asegúrate de proporcionar una URL válida para la foto
      FotoIdentidicacion: '...', // Asegúrate de proporcionar una URL válida para la foto de identificación
      solicitante_idSolicitante: idSolicitante,
      domicilio_idDomicilio: idDomicilio,
      usuario_idUsuario: idUsuario,
    });
    res.json({ message: 'Visita confirmada correctamente' });
  } catch (error) {
    console.error('Error al confirmar la visita:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export const fotoSolicitante = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const solicitante = await Solicitante.findByPk(id);
    if (!solicitante) {
      res.status(404).send('Solicitante no encontrado');
      return;
    }

    // Get the photo filename from the solicitante
    let photoFilename: string | undefined;
    if (solicitante.foto instanceof Uint8Array) {
      const buffer = Buffer.from(solicitante.foto); // Convertir Uint8Array a Buffer
      photoFilename = buffer.toString(); // Convertir Buffer a string
    } else {
      photoFilename = solicitante.foto as string; // Tratar 'foto' como string si no es Uint8Array
    }

    if (!photoFilename) {
      res.status(404).send('Foto de solicitante no encontrada');
      return;
    }

    // Construct the photo path
    const photoPath = path.join(__dirname, '..', 'solicitante-photos', photoFilename);

    // Check if the photo file exists
    if (!fs.existsSync(photoPath)) {
      res.status(404).send('Foto de solicitante no encontrada');
      return;
    }

    // Send the photo file as a response
    res.sendFile(photoPath);

    
  } catch (error) {
    console.error('Error al obtener la foto del solicitante:', error);
    res.status(500).send('Error interno del servidor');
  }
};


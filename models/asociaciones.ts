import Usuario from './usuarioM';
import Solicitante from './solicitante';
import Visita from './visita';
import databaseConnection from '../database/connection'; // Importa la conexión a la base de datos

// Define las asociaciones
Usuario.hasOne(Solicitante);
Solicitante.belongsTo(Usuario);

Visita.belongsTo(Solicitante, { foreignKey: 'solicitante_idSolicitante' });
Visita.belongsTo(Usuario, { foreignKey: 'usuario_idUsuario' });

// Sincroniza las asociaciones con la base de datos
databaseConnection.sync(); // Esto sincronizará las asociaciones con la base de datos al iniciar la aplicación

// Exporta las asociaciones
export { Usuario, Solicitante, Visita };

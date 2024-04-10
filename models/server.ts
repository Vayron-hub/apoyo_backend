import express, {Application} from 'express';
import userRoutes from '../routes/usuarioR';
import cors from 'cors';

import db from '../database/connection';


class Server{

    private app:Application;
    private port: String;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8080';
        
        //* Metodos iniciales
        //Conexión a base de datos
        this.dbConnection();

        //Llamamos a los middlewares
        this.middlewares();

        // Definir mis rutas
        this.routes();
    }

    async dbConnection(){

        try{

            await db.authenticate();
            console.log('Databse online');

        }catch( error: any ){
            throw new Error( error );
        }

    }

    middlewares(){
        //CORS
        this.app.use( cors() );

        //Lectura del body
        this.app.use( express.json() );

        //Carpeta publica
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('Servidor corriendo en puerto ' + this.port )
        })
    }

}

export default Server;
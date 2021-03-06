import express, { Application } from 'express';
import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';
import morgan from 'morgan';
import cors from 'cors';

class Server {

    public app: Application;
    
    //cuando instanciamos la clase ejecuta los metodos.
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    //configuramos el servidor.
    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        // vemos las peticiones enviando el comando dev
        this.app.use(morgan('dev'));
        // conexion de datos con angular para ejecutar las peticiones
        this.app.use(cors());
        // express permite leer los archivos .json
        this.app.use(express.json());
        // permite enlazar formulario html
        this.app.use(express.urlencoded({extended: false})); 
    }
    //configuramos las rutas de la app
    routes(): void{
        this.app.use(indexRoutes); 
        this.app.use('/api/games', gamesRoutes);       
    }
    //configuramos la inicializacion del servicio por el puerto 3000
    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('server in port', this.app.get('port'));
        });        
    }
}
// guardamos en la constante server la nueva clase
const server = new Server();
server.start(); 

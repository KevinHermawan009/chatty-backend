import express, {Express} from 'express';
import { ChattyServer } from './setupServer';
import databaseConenction from './setupDatabase'
class Application{
    public initialize(): void{
        databaseConenction();
        const app: Express = express();
        const server: ChattyServer = new ChattyServer(app); //when call new keyword with the className u need constructor
        server.start();
  

    }
}
const application: Application = new Application();
application.initialize();
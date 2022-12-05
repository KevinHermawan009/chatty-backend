import express, {Express} from 'express';
import { ChattyServer } from './setupServer';
import databaseConenction from './setupDatabase';
import { config } from './config';
class Application{
    public initialize(): void{
        this.loadConfig();
        databaseConenction();
        const app: Express = express();
        const server: ChattyServer = new ChattyServer(app); //when call new keyword with the className u need constructor
        server.start();
    }
    private loadConfig(): void {
        config.validateConfig();
    }
}
const application: Application = new Application();
application.initialize();

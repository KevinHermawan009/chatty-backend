import express, { Express } from 'express';
import { ChattyServer } from '@root/setupServer';
import databaseConenction from '@root/setupDatabase';
import { config } from '@root/config';
class Application {
  public initialize(): void {
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

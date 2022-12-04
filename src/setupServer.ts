import {
  Application,
  json,
  urlencoded,
  Response,
  Request,
  NextFunction,
} from "express";
import http from "http";
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import HTTP_STATUS from 'http-status-codes';
import cookieSession from 'cookie-session';
import 'express-async-error'
import { config } from "./config";
import { Server } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';

const SERVER_PORT = 3001;

export class ChattyServer {
  //whenever instantiate the server it'll pass in the instance of the express application and set to 'private app' variable
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.startServer(this.app);
    this.globalErrorHandler(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: 'session',
        keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
        maxAge: 24 * 7 *3600000, //cookie valid time 
        secure: config.NODE_ENV !== 'development' //before deploy set to false
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(cors({
      origin: config.CLIENT_URL,
      credentials: true, //for cookies to work
      optionsSuccessStatus: 200,
      methods:  ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }));
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb'})) //catch error when request past the 50mb
    app.use(urlencoded({ extended: true, limit: '50mb'}))
  }

  private routesMiddleware(app: Application): void {}

  private globalErrorHandler(app: Application): void {}

  private async startServer(app: Application): Promise <void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      const socketIO: Server = await this.createSocketIO(httpServer)
      this.startHttpServer(httpServer);
      this.socketIOConnections(socketIO);
    } catch (error) {
      console.log('err', error)
      
    }
  }

  private async createSocketIO(httpServer: http.Server): Promise <Server> {
    const io: Server = new Server( httpServer, {
        cors: {
        origin: config.CLIENT_URL,
        methods:  ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }
  });
    const pubClient = createClient({url: config.REDIS_HOST});
    const subCLient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subCLient.connect()])
    io.adapter(createAdapter(pubClient, subCLient));
    return io;
  }

  private startHttpServer(httpServer: http.Server): void {
    console.log(`Server is runnin ${process.pid}`)
    httpServer.listen(SERVER_PORT, ()=>{
      console.log('server is up ',SERVER_PORT);
    });
  }

  private socketIOConnections(io: Server): void{
    //place to defined socket method
  }
}

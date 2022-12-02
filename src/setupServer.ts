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

  private startServer(app: Application): void {
    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      console.log('err')
      
    }
  }

  private cteateSocketIO(httpServer: http.Server): void {}

  private startHttpServer(httpServer: http.Server): void {
    httpServer.listen(SERVER_PORT, ()=>{
      console.log('server is up ',SERVER_PORT);
    });
  }
}

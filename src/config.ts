import dotenv from 'dotenv';
import bunyan from 'bunyan';
import cloudinary from 'cloudinary';
import path from 'path';

dotenv.config({path: path.resolve(__dirname, '../env/.env')});

class Config {

  public DATABASE_URL: string | undefined;
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public CLIENT_URL: string | undefined;
  public REDIS_HOST: string | undefined;
  public CLOUD_NAME: string | undefined;
  public CLOUD_API_KEY: string | undefined;
  public CLOUD_API_SECRET: string | undefined;

  private readonly DEFAULT_DATABASE_URL = 'mongodb+srv://kevin:kevin@chatty-backend.kikn1pw.mongodb.net/?retryWrites=true&w=majority'; //setDefaultValue

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
    this.CLOUD_NAME = process.env.CLOUD_NAME || '';
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY || '';
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || '';
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) { //-> this contain all Config properties
      if (value === undefined) {
        throw new Error(key);
      } else null;
    }
  }
  public cloudinaryConfig(): void{
  cloudinary.v2.config({
    cloud_name : this.CLOUD_NAME,
    api_key : this.CLOUD_API_KEY,
    api_secret : this.CLOUD_API_SECRET
    // cloud_name : 'dqn9uwp3c',
    // api_key : '649496521367673',
    // api_secret : 'anbmr4r5WCecXtlq2WZ59OrI0pM'
  });
  }
}


export const config: Config = new Config();

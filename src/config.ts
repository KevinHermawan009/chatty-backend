import dotenv from 'dotenv'

dotenv.config({})
class Config{
    public DATABASE_URL: string | undefined;
    public JWT_TOKEN: string | undefined;
    public NODE_ENV: string | undefined;
    public SECRET_KEY_ONE: string | undefined;
    public SECRET_KEY_TWO: string | undefined;
    public CLIENT_URL: string | undefined;

    private readonly DEFAULT_DATABASE_URL = 'mongodb+srv://chatty-backend.kikn1pw.mongodb.net/Chatty-Backend' //setDefaultValue
    constructor(){
      
        this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
        console.log(this.DATABASE_URL)
        this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
        this.NODE_ENV = process.env.NODE_ENV || '';
        this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
        this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
        this.CLIENT_URL = process.env.CLIENT_URL || '';
    }

    public validateConfig(): void{
        for(const [key, value] of Object.entries(this)) //-> this contain all Config properties
        {
            if(value === undefined) {
                throw new Error(key);
            } else null
        }
    }
};

export const config: Config = new Config();
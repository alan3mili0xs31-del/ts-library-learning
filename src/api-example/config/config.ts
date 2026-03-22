import env from 'dotenv';

env.config();

interface Config {
  port: number,
  envStr: string,
  mySecret: string
}

const config: Config = {
  port: Number(process.env.PORT),
  envStr: process.env.NODE_ENV as string,
  mySecret: process.env.SECRET_KEY as string
};

export default config;

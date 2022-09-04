import { DataSource } from "typeorm";
import { CockroachConnectionOptions } from "typeorm/driver/cockroachdb/CockroachConnectionOptions";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { URL } from "url";
import { config } from 'dotenv'; 
import User from './entities/User.entity'; 
import UserInformation from './entities/UserInformation.entity'; 

config(); 

const dbUrl = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dglade-hyena-4674`;
// const routingId = dbUrl.searchParams.get("options");
// dbUrl.searchParams.delete("options");

console.log(dbUrl); 

const connectionOptions = {
  type: "cockroachdb",
  url: dbUrl,
  entities: [User, UserInformation],
  synchronize: true,
  logging: 'all', 
  ssl: true,
  // extra: {
  //   options: routingId
  // },
} as CockroachConnectionOptions; 

const altConfig = {
    type: 'sqlite',
    database: `./database/data.sqlite`,
    // entities: [__dirname + "/entities/**/*.entity{.ts}"],
    entities: [User, UserInformation], 
    synchronize: true,
    logging: false,
    // cli: {
    //   entitiesDir: path.join(__dirname, `/entities/`),
    // },
  } as SqliteConnectionOptions;

export default altConfig; 
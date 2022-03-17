require('dotenv').config();
import { env } from 'process';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from './neo4j/neo4j.module';

import { ProduitFournisseursModule } from './produitsFournisseurs/produitFournisseurs.module';


function getMongoUrl(): string{
  return env.enviroment === "dev" ? 
    env.mongoDevUrl : env.mongoUrl;
}

// function getNeo4jConObj() : Neo4jConfig{
//   const jsonString:string = env.enviroment === "dev" ? 
//     env.neo4jDevConObj : env.neo4jConObj;
//   return JSON.parse(jsonString);
// }

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    MongooseModule.forRoot(getMongoUrl()),
    Neo4jModule,
    ProduitFournisseursModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
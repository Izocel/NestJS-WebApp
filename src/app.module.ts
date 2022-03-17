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
import { Neo4jConfig } from './Global/interfaces/neo4j-config.interface';


function getMongoUrl(): string{
  return env.enviroment === "dev" ? 
    env.mongoDevUrl : env.mongoUrl;
}

function getNeo4jConfig() : Neo4jConfig{
  const jsonString:string = env.enviroment === "dev" ? 
    env.neo4jDevConfObj : env.neo4jConfObj;
    const cnfObj:any = JSON.parse(jsonString);
    if(! cnfObj.database)
      cnfObj.database = "default";
    return cnfObj;
}

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    MongooseModule.forRoot(getMongoUrl()),
    Neo4jModule.forRoot(getNeo4jConfig()),
    ProduitFournisseursModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
import { Injectable } from '@nestjs/common';
import { Neo4jService } from './neo4j/neo4j.service';

@Injectable()
export class AppService {
  constructor(neo4J: Neo4jService) {
    console.log(neo4J);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
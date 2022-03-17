import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Module({
  imports: [],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}

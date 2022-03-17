import { Injectable } from '@nestjs/common';
import { Result, Transaction } from 'neo4j-driver';
import { Neo4jService } from './neo4j/neo4j.service';


const actorsBuffer = [];
@Injectable()
export class AppService {
  constructor(private readonly neo4jService: Neo4jService) { }


  // Create a movie node
  async addMovie(tx: Transaction, titre: string): Promise<Result> {
    return tx.run('CREATE (m:Movie {title: $titre})', { titre: titre })
  }

  // Create a Person node
  async addPerson(tx: Transaction, nom: string): Promise<Result> {
    return tx.run('CREATE (p:Person {name: $nom})', { nom: nom })
  }

  // Create a friendship between two people.
  async makeActor(tx, actorName, movieTitle) {
    return tx.run(
      'MATCH (p:Person {name: $actorName}) ' +
      'MATCH (m:Movie {title: $movieTitle}) ' +
      'MERGE (p)-[:ACTED_IN]->(m)',
      { actorName: actorName, movieTitle: movieTitle }
    )
  }



  // Match and display all actors in a transaction.
  async findActors(tx) {
    // To collect friend relationships

    const result = tx.run(
      `MATCH (a:Person)-[:ACTED_IN]->(m:Movie)
      RETURN a.name AS Actor, m.title AS Movie
      ORDER BY id(m) DESC
      LIMIT 5`
    );

    result.subscribe({
      onNext: record => {
        const actor = record.get(0)
        const movie = record.get(1)

        actorsBuffer.push({ actor: actor, movie: movie },)
      }
    })
  }

  async getHello(): Promise<any> {

    const savedBookmarks = []

    // const actor1: string = 'Joe du cap2';
    // const actor2: string = 'Jane de lamontage2';
    // const movieTitle: string = 'Les différents II';


    // const session1 = this.neo4jService.getWriteSession();
    // const actors = session1
    //   .writeTransaction(tx => this.addPerson(tx, actor1))
    //   .then(() => session1.writeTransaction(tx => this.addPerson(tx, actor2)))
    //   .finally(() => {
    //     savedBookmarks.push(session1.lastBookmark())
    //     return session1.close();
    //   });

    // const session2 = this.neo4jService.getWriteSession();
    // const movie = session2
    //   .writeTransaction(tx => this.addMovie(tx, movieTitle))
    //   .finally(() => {
    //     savedBookmarks.push(session2.lastBookmark())
    //     return session2.close();
    //   });

    // // Create a 
    // const finnal = await Promise.all([actors, movie]).then(ignore => {
    //   const session3 = this.neo4jService.getWriteSession(savedBookmarks);

    //   return session3
    //     .writeTransaction(tx => this.makeActor(tx, actor1, movieTitle))
    //     .then (() => session3.writeTransaction(tx => this.makeActor(tx, actor2, movieTitle)))
    //     .finally(() => session3.readTransaction(this.findActors).then(() => session3.close()))
    // });

    return actorsBuffer;
  }
}
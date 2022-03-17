import { Inject, Injectable } from '@nestjs/common';
import * as neo4j from 'neo4j-driver';
import { Driver, Result, Session } from 'neo4j-driver';
import { Neo4jConfig } from 'src/Global/interfaces/neo4j-config.interface';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';

const RX = neo4j.session.READ;
const WX = neo4j.session.WRITE;

@Injectable()
export class Neo4jService {
	constructor
		(
			@Inject(NEO4J_CONFIG) private readonly config: Neo4jConfig,
			@Inject(NEO4J_DRIVER) private readonly driver: Driver
		) {
			try {
				this.driver;
			} catch (error) {
				throw error;
			}
		}

	getConfig():Neo4jConfig {
		return this.config;
	}

	getDriver():Driver {
		return this.driver;
	}

	getReadSession(db:string = this.config.database):Session {
		return this.driver.session({
			database: db,
			defaultAccessMode: RX
		});
	}

	getWriteSession(db:string = this.config.database):Session {
		return this.driver.session({
			database: db,
			defaultAccessMode: WX
		});
	}

	async read(cypher: string, params: Record<string, any>,
		db:string = this.config.database): Promise<Result> {
			const session = this.getReadSession(db);
			return await session.run(cypher,params);
	}

	async readTransaction(cypher: string, params: Record<string, any>,
		db:string = this.config.database): Promise<Result> {
			const session = this.getReadSession(db);
			const transaction = await session.beginTransaction();
			return await session.readTransaction(() => transaction.run(cypher,params));
	}

	async write(cypher: string, params: Record<string, any>,
		db:string = this.config.database): Promise<Result> {
			const session = this.getWriteSession(db);
			return await session.run(cypher,params);
	}

	async writeTransaction(cypher: string, params: Record<string, any>,
		db:string = this.config.database): Promise<Result> {
			const session = this.getWriteSession(db);
			const transaction = await session.beginTransaction();
			return await session.writeTransaction(() => transaction.run(cypher,params));
	}


}

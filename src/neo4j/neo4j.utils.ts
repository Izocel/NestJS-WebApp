import neo4j, { Driver } from "neo4j-driver";
import { Neo4jConfig } from "src/Global/interfaces/neo4j-config.interface";


/**
 * @summary Will create a neo4J driver and test its connectivity.
 * @param config Neo4jConfig The connection configuraion inteface.
 * @returns Promise\<Driver>
 */
export const createDriver = async (config:Neo4jConfig):Promise<Driver> => {
    const driver = neo4j.driver(
        `${config.scheme}://${config.host}`,
        neo4j.auth.basic(config.username, config.password)
    );
    await driver.verifyConnectivity();    
    return driver;
}
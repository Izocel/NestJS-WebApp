
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            mongoUrl: string;
            mongoDevUrl: string;
            neo4jConfObj: string;
            neo4jDevConfObj: string;
            enviroment: "dev" | "prod";
        }
    }
}
export {};
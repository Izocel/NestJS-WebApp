
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            mongoUrl: string;
            mongoDevUrl: string;
            enviroment: "dev" | "prod";
        }
    }
}
export {};
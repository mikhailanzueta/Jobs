interface Configuration {
    database_url: string,
    session_secret: string,
    port: string | number,
}

function getEnv(): Configuration {
    const database_url = process.env.DATABASE_URL;
    if (database_url == undefined) {
        throw new Error("database url is undefined");
    }
    return {
        database_url,
        session_secret: process.env.SESSION_SECRET || "randomString",
        port: process.env.PORT || 8080, 
    }
} 
const env = getEnv()
export default env;
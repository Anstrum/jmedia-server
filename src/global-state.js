import { Worker } from "worker_threads";
import config from "../config.json" assert { type: "json" };
import mysql from "mysql2/promise";
import { fillDatabase } from "./services/database/fill-database.js";
import { resetDatabase } from "./services/database/reset-database.js";
import { initTables } from "./services/database/init-tables.js";
import { testDatabase } from "./services/database/test-database.js";
import { Mangas } from "./services/database/manga/manga.js";

class Server {
	constructor() {
		if (Server.instance) {
			return Server.instance;
		}
		this.worker = null;
		Server.instance = this;
	}

	static getInstance() {
		if (!Server.instance) {
			Server.instance = new Server();
		}
		return Server.instance;
	}

	static async start() {
		this.instance.worker = new Worker("./src/api/server.js");

		console.log("Server started")
		
	}

	static async shutdown() {
		this.instance.worker.terminate();

		console.log("\nServer stopped")
	}
}

class Database {
	constructor() {
		if (Database.instance) {
		return Database.instance;
		}
		this.dbConfig = config.database;
		this.mangas = new Mangas();
		Database.instance = this;
	}

	static getInstance() {
		if (!Database.instance) {
		Database.instance = new Database();
		}
		return Database.instance;
	}

	static async init() {
		await initTables(await this.getConnection());
	}

	static async fill() {
		await fillDatabase(await this.getConnection());
	}

	static async reset() {
		await resetDatabase(await this.getConnection());
		await this.init();
	}

	static async test() {
		await testDatabase(await this.getConnection());
	}

	static async getConnection() {
		const connection = await mysql.createConnection({
			host: this.instance.dbConfig.dbHost,
			user: this.instance.dbConfig.dbUser,
			password: this.instance.dbConfig.dbPassword,
			database: this.instance.dbConfig.dbName,
		});
		return connection;
	}
}

export { Server, Database };

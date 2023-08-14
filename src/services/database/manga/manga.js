import { getById } from "./getById.js";
import { getByName } from "./getByName.js";
import { getManyRandom } from "./getManyRandom.js";
import { getAll } from "./getAll.js";


class Mangas {
    constructor() {
		if (Mangas.instance) {
			return Mangas.instance;
		}
		Mangas.instance = this;
	}

	static getInstance() {
		if (!Mangas.instance) {
			Mangas.instance = new Mangas();
		}
		return Mangas.instance;
	}

    static async getById(connection, id) {
        return await getById(connection, id);
    }
    static async getByName(connection, name) {
        return await getByName(connection, name);
    }
    static async getManyRandom(connection, limit) {
        return await getManyRandom(connection, limit);
    }
    static async getAll(connection, page, limit) {
        return await getAll(connection, page, limit);
    }
}

export { Mangas }
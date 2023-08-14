import { Mangas } from "./manga/manga.js";

async function testDatabase(connection) {
    let result = null
    
    console.log("\nTesting database...")


    result = await Mangas.getById(connection, 2);
    if (result != undefined) {
        console.log("Mangas by id passed")
    } else {
        console.log("Mangas by id failed")
    }

    result = await Mangas.getByName(connection, "cupidatat fugiat cupidatat nulla");
    if (result != undefined) {
        console.log("Mangas by name passed")
    } else {
        console.log("Mangas by name failed")
    }

    result = await Mangas.getManyRandom(connection, 10);
    if (result != undefined) {
        console.log("Mangas many random passed")
    } else {
        console.log("Mangas many random failed")
    }

    result = await Mangas.getAll(connection, 0, 10);
    if (result != undefined) {
        console.log("Mangas all passed")
    } else {
        console.log("Mangas all failed")
    }
    result = await Mangas.getAll(connection, 1, 10);
    if (result != undefined) {
        console.log("Mangas all passed")
    } else {
        console.log("Mangas all failed")
    }




    console.log("\nDatabase: All tests passed.\n")
}

export { testDatabase }
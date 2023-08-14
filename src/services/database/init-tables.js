async function initTables(connection) {
    //table manga using id
    await connection.query(`
        CREATE TABLE IF NOT EXISTS mangas (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            coverImageUrl VARCHAR(255) NOT NULL,
            vfTomesCount INT UNSIGNED,
            voTomesCount INT UNSIGNED NOT NULL,
            vfState VARCHAR(255) NOT NULL,
            voState VARCHAR(255) NOT NULL,
            mangaType INT UNSIGNED NOT NULL,
            PRIMARY KEY (id)
            );`
    );
    console.log("manga table created");

    //table authors
    await connection.query(`
        CREATE TABLE IF NOT EXISTS authors (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
            );`
    );
    console.log("authors table created");
    
    //table mangas_authors
    await connection.query(`
        CREATE TABLE IF NOT EXISTS mangas_authors (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            authorId INT UNSIGNED NOT NULL,
            mangaId INT UNSIGNED NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (authorId) REFERENCES authors(id),
            FOREIGN KEY (mangaId) REFERENCES mangas(id)
            );`
    );
    console.log("mangas_authors table created");

    //table genres
    await connection.query(`
        CREATE TABLE IF NOT EXISTS genres (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
            );`
    );
    console.log("genres table created");


    //table mangas_genres
    await connection.query(`
        CREATE TABLE IF NOT EXISTS mangas_genres (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            genreId INT UNSIGNED NOT NULL,
            mangaId INT UNSIGNED NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (genreId) REFERENCES genres(id),
            FOREIGN KEY (mangaId) REFERENCES mangas(id)
            );`
    );
    console.log("mangas_genres table created");

    //table worktypes
    await connection.query(`
        CREATE TABLE IF NOT EXISTS worktypes (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
            );`
    );
    console.log("worktypes table created");

    console.log("\nSetup: database")
    console.log("no error\n")
}


export { initTables }
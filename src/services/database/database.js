import mysql from 'mysql2/promise';
import config from '../../../config.json' assert { type: 'json' };

const dbConfig = config.database;

async function init() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.dbHost,
            user: dbConfig.dbUser,
            password: dbConfig.dbPassword,
            database: dbConfig.dbName
        });
        await checkOrCreateTables(connection);
        console.log("Database ready: no error")
    } catch (error) {
        console.error('Erreur de connexion à la base de données :', error);
    }
}

async function checkOrCreateTables(connection) {
    //table manga using id
    await connection.query(`
        CREATE TABLE IF NOT EXISTS manga (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            coverImageUrl VARCHAR(255) NOT NULL,
            vfTomesCount INT UNSIGNED,
            voTomesCOunt INT UNSIGNED NOT NULL,
            vfState VARCHAR(255) NOT NULL,
            voState VARCHAR(255) NOT NULL,
            mangaType INT UNSIGNED NOT NULL,
            PRIMARY KEY (id)
            );`
    );

    //table authors
    await connection.query(`
        CREATE TABLE IF NOT EXISTS authors (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
            );`
    );
    
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

    //table genres
    await connection.query(`
        CREATE TABLE IF NOT EXISTS genres (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
            );`
    );

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

    //table worktypes
    await connection.query(`
        CREATE TABLE IF NOT EXISTS worktypes (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
            );`
    );
}

export {
    init,
};
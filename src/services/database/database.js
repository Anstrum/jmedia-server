import mysql from 'mysql2/promise';
import config from '../../../config.json' assert { type: 'json' };
import fs from 'fs/promises';

const dbConfig = config.database;
let database = null;

async function init(fillWithFakeData) {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.dbHost,
            user: dbConfig.dbUser,
            password: dbConfig.dbPassword,
            database: dbConfig.dbName
        });
        database = connection;
        await checkOrCreateTables(connection);
        if(fillWithFakeData) {
            await fillDatabase(connection)
            console.log("Database ready: fake data inserted")
        }
        console.log("Setup: database")
        console.log("no error\n")
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

async function fillDatabase(connection) {
    // table genres
    let genres;
    try {
        const jsonContent = await fs.readFile('src/data/genres.json', 'utf-8');
        genres = JSON.parse(jsonContent);
    } catch (error) {
        console.error('Erreur lors du chargement des genres :', error);
        return;
    }
    const genresValues = genres.map(genre => [genre.name]);
    await connection.query(`
        INSERT INTO genres (name)
        VALUES ?`, [genresValues]
    );

    // table authors
    let authors;
    try {
        const jsonContent = await fs.readFile('src/data/authors.json', 'utf-8');
        authors = JSON.parse(jsonContent);
    } catch (error) {
        console.error('Erreur lors du chargement des auteurs :', error);
        return;
    }
    const authorsValues = authors.map(author => [author.firstName, author.lastName]);
    await connection.query(`
        INSERT INTO authors (firstName, lastName)
        VALUES ?`, [authorsValues]
    );

    // table mangas
    let mangas;
    try {
        const jsonContent = await fs.readFile('src/data/mangas.json', 'utf-8');
        mangas = JSON.parse(jsonContent);
    } catch (error) {
        console.error('Erreur lors du chargement des mangas :', error);
        return;
    }
    const mangasValues = mangas.map(manga => [
        manga.name,
        manga.description,
        manga.coverImageUrl,
        manga.vfTomesCount,
        manga.voTomesCount,
        manga.vfState,
        manga.voState,
        manga.mangaType
    ]);
    await connection.query(`
        INSERT INTO manga (name, description, coverImageUrl, vfTomesCount, voTomesCount, vfState, voState, mangaType)
        VALUES ?`, [mangasValues]
    );

    // table mangas_authors
    let mangasAuthors;
    try {
        const jsonContent = await fs.readFile('src/data/mangas_authors.json', 'utf-8');
        mangasAuthors = JSON.parse(jsonContent);
    } catch (error) {
        console.error('Erreur lors du chargement des mangas_authors :', error);
        return;
    }
    const mangasAuthorsValues = mangasAuthors.map(mangaAuthor => [
        mangaAuthor.authorId,
        mangaAuthor.mangaId
    ]);
    await connection.query(`
        INSERT INTO mangas_authors (authorId, mangaId)
        VALUES ?`, [mangasAuthorsValues]
    );

    // table mangas_genres
    let mangasGenres;
    try {
        const jsonContent = await fs.readFile('src/data/mangas_genres.json', 'utf-8');
        mangasGenres = JSON.parse(jsonContent);
    } catch (error) {
        console.error('Erreur lors du chargement des mangas_genres :', error);
        return;
    }
    const mangasGenresValues = mangasGenres.map(mangaGenre => [
        mangaGenre.genreId,
        mangaGenre.mangaId
    ]);
    await connection.query(`
        INSERT INTO mangas_genres (genreId, mangaId)
        VALUES ?`, [mangasGenresValues]
    );

    // table worktypes
    let worktypes;
    try {
        const jsonContent = await fs.readFile('src/data/worktypes.json', 'utf-8');
        worktypes = JSON.parse(jsonContent);
    } catch (error) {
        console.error('Erreur lors du chargement des worktypes :', error);
        return;
    }
    const worktypesValues = worktypes.map(worktype => [worktype.name]);
    await connection.query(`
        INSERT INTO worktypes (name)
        VALUES ?`, [worktypesValues]
    );
}

export {
    init,
};
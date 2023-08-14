import fs from 'fs/promises';

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
        INSERT INTO mangas (name, description, coverImageUrl, vfTomesCount, voTomesCount, vfState, voState, mangaType)
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

    console.log("\nFill: database")
    console.log("no error\n")
}

export { 
    fillDatabase, 
}
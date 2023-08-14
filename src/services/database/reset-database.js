async function resetDatabase(connection) {
    await connection.query(`
        DROP TABLE IF EXISTS mangas_authors;
    `);
    await connection.query(`
        DROP TABLE IF EXISTS mangas_genres;
    `);
    await connection.query(`
        DROP TABLE IF EXISTS authors;
    `);
    await connection.query(`
        DROP TABLE IF EXISTS genres;
    `);
    await connection.query(`
        DROP TABLE IF EXISTS mangas;
    `);
    await connection.query(`
        DROP TABLE IF EXISTS worktypes;
    `);
    
    console.log("\nReset: database")
    console.log("no error\n")
}

export {
    resetDatabase,
};
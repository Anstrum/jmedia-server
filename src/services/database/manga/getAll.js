async function getAll(connection, page, limit) {
    // select random mangas (10)
    try {
        const query = `SELECT * FROM mangas LIMIT ${limit} OFFSET ${page * limit}`;
        const [rows, fields] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Erreur lors de la récupération des données :', err);
    }
}


export { getAll }
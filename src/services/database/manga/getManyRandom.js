async function getManyRandom(connection, limit) {
    if (limit == undefined) {
        limit = 10;
    }
    try {
        const query = `SELECT id FROM mangas ORDER BY RAND() LIMIT ${limit}`;
        const [rows, fields] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Erreur lors de la récupération des données :', err);
    }
}


export { getManyRandom }
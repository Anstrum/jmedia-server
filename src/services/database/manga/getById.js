async function getById(connection, id) {
    try {
        const [rows, fields] = await connection.execute("SELECT * FROM mangas WHERE id = ?", [id]);
        return rows;
    } catch (err) {
        console.error('Erreur lors de la récupération des données :', err);
    }
}


export { getById }
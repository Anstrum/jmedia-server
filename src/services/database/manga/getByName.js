async function getByName(connection, name) {
    try {
        const [rows, fields] = await connection.execute("SELECT * FROM mangas WHERE name = ?", [name]);
        return rows;
    } catch (err) {
        console.error('Erreur lors de la récupération des données :', err);
    }
}


export { getByName }
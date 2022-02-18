const oracledb = require('oracledb')

const cns = {
    user: "c##purchase_point",
    password: "purchase_point",
    connectString: "localhost/orcl"
}

async function queryDB(sql, params, autoCommit){
    let connection;
    try{
        connection = await oracledb.getConnection(cns);
        console.log("Successfully connected to the database")

        let result = await connection.execute(sql, params, {autoCommit: autoCommit})
        await connection.close()
        return result
    } catch (err){
        console.log(err)
    }
}

module.exports = queryDB

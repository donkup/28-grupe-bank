const Account = {};


Account.create = async (connection, userId) => {
    const sql = 'INSERT INTO `accounts`\
                    (`id`, `balance`, `owners_id`)\
                VALUES\
                (NULL, 0 , "' + userId + '")'
    const [rows] = await connection.execute(sql);

    return `Saskaita buvo sekmingai sukurta!`;
}

module.exports = Account;
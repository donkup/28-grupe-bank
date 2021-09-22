const Account = {};


Account.create = async (connection, userId) => {
    const sql = 'INSERT INTO `accounts`\
                    (`id`, `balance`, `owners_id`)\
                VALUES\
                (NULL, 0 , "' + userId + '")'
    const [rows] = await connection.execute(sql);

    return `Saskaita buvo sekmingai sukurta!`;
}

Account.AdditionByAccountId = async (connection, accountId, cash) => {
    let sql = 'UPDATE `accounts`\
                 SET `balance` = `balance` +"'+ cash + '"\
                  WHERE `accounts`.`id` ='+ accountId;

    [rows] = await connection.execute(sql);
    if (rows.affectedRows) {
        console.log(`${cash} pinigu buvo sekmingai prideti i saskaita`);
    } else {
        console.log(`pinigu prideti nepavyko!`);
    }

    return rows.affectedRows;
}


module.exports = Account;
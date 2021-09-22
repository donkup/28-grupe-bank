const Account = {};


Account.create = async (connection, userId) => {
    const sql = 'INSERT INTO `accounts`\
                    (`id`, `balance`, `owners_id`)\
                VALUES\
                (NULL, 0 , "' + userId + '")'
    const [rows] = await connection.execute(sql);

    return `Saskaita buvo sekmingai sukurta!`;
}

Account.AddMoneyByAccountId = async (connection, accountId, cash) => {
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

Account.TakeMoneyById = async (connection, accountId, cash) => {
    const sql2 = 'UPDATE `accounts`\
                  SET `balance` = `balance` -"'+ cash + '"\
                  WHERE `id` ='+ accountId;

    [rows] = await connection.execute(sql2);

    if (!!rows.affectedRows) {
        console.log(`${cash} pinigu buvo sekmingai nuskaityti is saskaitos`);
    } else {
        console.log(`pinigu nuskaityti nepavyko!`);
    }

    return !!rows.affectedRows;
}


module.exports = Account;
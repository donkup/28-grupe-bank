const mysql = require('mysql2/promise');

const db = {};

db.init = async ({ database, host, user }) => {
    const connection = await db.createDatabase({ database, host, user });

    await db.createTableUsers(connection);
    await db.createTableAccounts(connection);

    return connection;
}

db.createDatabase = async ({ database, host, user }) => {
    host = host ? host : 'localhost';
    user = user ? user : 'root';

    //pasalinima duomenu baze jei tokia yra:
    try {
        let db = await mysql.createConnection({ host, user });
        await db.execute(`DROP DATABASE IF EXISTS \`${database}\``);
        console.log('Buvusi duombaze istrinta');
    } catch (error) {
        console.log('Nera duombazes, kuria butu galima istrinti');
    }

    //sukuriam duomenu baze is naujo
    try {
        let db = await mysql.createConnection({ host, user });
        await db.execute(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
        await db.end();

        db = await mysql.createConnection({ host, user, database });
        console.log('Nauja duombaze sukurta');
        return db;
    } catch (error) {
        return error;
    }
}

//kuriam lenteles duomenu bazeje
db.createTableUsers = async (connection) => {
    try {
        const sql = 'CREATE TABLE IF NOT EXISTS `users` (\
                        `id` int(10) NOT NULL AUTO_INCREMENT,\
                        `firstname` char(20) COLLATE utf8_swedish_ci NOT NULL,\
                        `lastname` char(20) COLLATE utf8_swedish_ci NOT NULL,\
                        `active` char(5) COLLATE utf8_swedish_ci NOT NULL DEFAULT "TRUE",\
                        PRIMARY KEY(`id`)\
                    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_swedish_ci';
        await connection.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti vartotoju lenteles');
        console.log(error);
        return error;
    }
}

db.createTableAccounts = async (connection) => {
    try {
        const sql = 'CREATE TABLE IF NOT EXISTS `accounts` (\
                        `id` int(10) NOT NULL AUTO_INCREMENT,\
                        `user_id` int(10) NOT NULL,\
                        `balance` float(12,2) DEFAULT 0 NOT NULL,\`active` char(5) COLLATE utf8_swedish_ci NOT NULL DEFAULT "TRUE",\
                    PRIMARY KEY(`id`),\
                    KEY `user_id` (`user_id`)\
                    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_swedish_ci';
        await connection.execute(sql);
        // uzdedam apsauga nuo istrynimo
        const sql2 = 'ALTER TABLE `accounts` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;'
        await connection.execute(sql2);
    } catch (error) {
        console.log('Nepavyko sukurti saskaitu lenteles');
        console.log(error);
        return error;
    }

}

//exportuojam faila
module.exports = db;

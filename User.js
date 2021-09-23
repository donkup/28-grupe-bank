const Account = require('./Account');

const User = {};

/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} userFirstname Vartotojo Vardas
 * @param {string} userLastname Vartotojo Pavarde
 * @returns {Promise<string>} Pranesima apie sukurta vartotoja
 */
User.create = async (connection, userFirstname, userLastname) => {
    //pridedam vartotoja
    const sql = 'INSERT INTO `users`\
                    (`firstname`, `lastname`)\
                VALUES\
                    ("' + userFirstname + '", "' + userLastname + '")';

    const [rows] = await connection.execute(sql);
    console.log(rows)
    let createAccount = await Account.create(connection, rows.insertId)
    return `${userFirstname} ${userLastname} sekmingai sukurtas!`

}
module.exports = User;
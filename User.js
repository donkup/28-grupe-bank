const Account = require('./Account');

const User = {};

/**
 * Autoriaus itrukimas i duombaze.
 * @param {Object} connection   Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} userFirstname  saskaitos savininko vardas.
 * @param {string} userLastname  saskaitos savininko pavarde.
 * @param {number} userId saskaitos savininko ID.
 * @returns {Promise<string>} Tekstas nurodo saskaitos savininko duomenis.
 */
User.create = async (connection, userFirstname, userLastname) => {
    //console.log(authorFirstname, authorLastname);
    const sql = 'INSERT INTO `users`\
                (`id`, `firstname`, `lastname`)\
                VALUES \
                    (NULL, "' + userFirstname + '", "' + userLastname + '")';
    const [rows] = await connection.execute(sql);
    const vartotojoId = rows.insertId;

    await Account.create(connection, vartotojoId);
    return `Banko klientas ${userFirstname} ${userLastname} buvo sekmingai sukurtas!`;
}


module.exports = User;

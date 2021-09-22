const db = require('./db');
const User = require('./User');
const Account = require('./Account');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const conn = await db.init({
        host: 'localhost',
        user: 'root',
        database: 'bankas',
    });

    // LOGIC BELOW


    const user1 = await User.create(conn, 'Vardenis', 'Pavardenis');
    console.log(user1);

    let accountUser = await Account.create(conn, 1)
    console.log(accountUser);


    let addToAccount = await Account.AdditionByAccountId(conn, 1, 500)
    console.log(addToAccount);


}

app.init();

module.exports = app;

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
    const user2 = await User.create(conn, 'Banginis', 'Vandeninis');
    console.log(user2);
    const user3 = await User.create(conn, 'Mike', 'Pukuotas');
    console.log(user3);

    // let accountUser = await Account.create(conn, 1)
    // console.log(accountUser);


    let addToAccount1 = await Account.AdditionByAccountId(conn, 1, 500)
    console.log(addToAccount1);
    let addToAccount2 = await Account.AdditionByAccountId(conn, 2, 5500)
    console.log(addToAccount2);
    let addToAccount3 = await Account.AdditionByAccountId(conn, 3, 1500)
    console.log(addToAccount3);


}

app.init();

module.exports = app;

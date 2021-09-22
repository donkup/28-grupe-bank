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
    console.log('-----------------------');
    // let accountUser = await Account.create(conn, 1)
    // console.log(accountUser);


    await Account.AddMoneyByAccountId(conn, 1, 500)

    await Account.AddMoneyByAccountId(conn, 2, 5500)

    await Account.AddMoneyByAccountId(conn, 3, 1500)

    await Account.AddMoneyByAccountId(conn, 3, 500)

    console.log('-----------------------');

    await Account.TakeMoneyById(conn, 3, 2000)


}

app.init();

module.exports = app;

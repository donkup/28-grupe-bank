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


}

app.init();

module.exports = app;

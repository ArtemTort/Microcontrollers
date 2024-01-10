const fs = require('fs')

module.exports = function authLog(email, date) {
    fs.writeFile('logs.txt', `Email: ${email}, Дата и время: ${date} \n`, {flag:"a"}, (err) => {
        if(err) throw err;
        console.log('Сессия залогирована');
    })
}
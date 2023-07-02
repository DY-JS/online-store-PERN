const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next('')
    }
    //в headers в atorization обычно содержится token
    ////в atorization обычно строка: тип tokenа и токен(Bearer assdsfrgfbfb...)
    try {
        const token = req.headers.authorization.split(" ")[1] //выделили токен из строки
        if (req.method === "OPTIONS") {
            next('')
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY) //декодируем токен
        req.user = decoded //добавили поле user в req со значением decoded
        next() //передали управление другому middleware в цепочке
    } catch(e) {
        res.status(401).json({message: "User is not authorized"})
    }
}





// module.exports = function (req, res, next) {
//     if (req.method === "OPTIONS") {
//         next()
//     }
//     try {
//         const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
//         if (!token) {
//             return res.status(401).json({message: "Не авторизован"})
//         }
//         const decoded = jwt.verify(token, process.env.SECRET_KEY)
//         req.user = decoded
//         next()
//     } catch (e) {
//         res.status(401).json({message: "Не авторизован"})
//     }
// };

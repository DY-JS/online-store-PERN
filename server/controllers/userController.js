const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {  //ф-ция генерации jwt токена
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'} //срок действия токена
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        console.log(email, password, role)
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    //"email": "user1@gmail.com",   "password": "12345"
    //  "email": "admin@gmail.com", "password": "12345","role": "ADMIN"

    async login(req, res, next) {  //при login тоже формируем токен
        const {email, password} = req.body
        const user = await User.findOne({where: {email}}) //есть ли такой email в БД
        if (!user) {
            return next(ApiError.internal("Email not found"))
        }

        //сравниваем введённый пароль с паролем из БД
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal("Password is incorrect"))
        }

        const token = generateJwt(user.id, user.email, user.role)
        return  res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token}) //сгенерируется новый токен и отправится на сервер
    }
}

 module.exports = new UserController()

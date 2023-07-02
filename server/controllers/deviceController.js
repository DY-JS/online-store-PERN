const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files //получили имя
            let fileName = uuid.v4() + ".jpg" //записали случайное имя + jpg
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) //записали в папку статик
            const device = await Device.create({name, price, brandId, typeId, img: fileName}); //записали в БД

            if(info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    }))
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        // limit, page - для постраничного вывода
        page = page || 1 //стартовая стр
        limit = limit || 9 //лимит на страницу
        let offset = page * limit - limit //пропуск
        let devices
        // if(!brandId && ! typeId) {
        //     devices = await Device.findAll({limit, offset })
        // }
        //findAndCountAll - лучше исп-ть при пагинации(возвр на фронт сount - кол-во товаров)
        // if(!brandId && ! typeId) {
        //     devices = await Device.findAll({limit, offset })
        // }
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset })
        }

        if(!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset })
        }

        if(brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId }, limit, offset })
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
}

module.exports = new DeviceController()

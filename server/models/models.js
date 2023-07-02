const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo
}


// User.hasOne(Basket)  //*установили cвязь один к одному(один юзер - одна корзина)
// Basket.belongsTo(User)
//
// User.hasMany(Rating) //*установили cвязь один ко многим(один юзер - много рейтингов)
// Rating.belongsTo(User)
//
// Basket.hasMany(BasketDevice) //*cвязь один ко многим(одна корзина - много BasketDevice(девайс в корзине))
// BasketDevice.belongsTo(Basket)
//
// Type.hasMany(Device)  //*cвязь один ко многим(один тип - много Device)
// Device.belongsTo(Type) // в device появляется typeId
//
// Brand.hasMany(Device)
// Device.belongsTo(Brand) // *в device появляется brandId
//
// Device.hasMany(Rating)  //*cвязь один ко многим(один девайс - много Raiting)
// Rating.belongsTo(Device)
//
// Device.hasMany(BasketDevice)  //*cвязь один ко многим(один девайс - много BasketDevice(девайс в корзине))
// BasketDevice.belongsTo(Device)
//
// Device.hasMany(DeviceInfo)  //cвязь один ко многим(один девайс - много DeviceInfo(информация о девайсе))
// DeviceInfo.belongsTo(Device)
//
// Type.belongsToMany(Brand, {through: TypeBrand})//*many-to-many
// Brand.belongsToMany(Type, {through: TypeBrand})
//





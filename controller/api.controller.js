const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config')

const generateAccessToken = (user_id, role) => {
    const payload = {
        user_id,
        role
    };
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class ApiController{

    async getVisitorsData(req, res) {
        const visitorsData = [
            { date: '2023-11-01', count: 220 },
            { date: '2023-11-02', count: 150 },
            { date: '2023-11-03', count: 180 },
            { date: '2023-11-04', count: 200 },
            { date: '2023-11-05', count: 130 },
            { date: '2023-11-06', count: 250 },
            { date: '2023-11-07', count: 140 }
        ];

        res.json(visitorsData);
    }


    async getTeaSalesData(req, res) {
        const teaSalesData = [
            { month: 'Январь', sales: 120 },
            { month: 'Февраль', sales: 150 },
            { month: 'Март', sales: 180 },
            { month: 'Апрель', sales: 200 },
            { month: 'Май', sales: 230 },
            { month: 'Июнь', sales: 250 },
        ];

        res.json(teaSalesData);
    }


    async  getSalesByPackaging(req, res) {
        const salesData = [
            { packaging: 'Пакетики', sales: 1200 },
            { packaging: 'Банки', sales: 800 },
            { packaging: 'Пакеты', sales: 600 },
        ];

        res.json(salesData);
    }


    async getSalesByChannelsChart(req, res) {
        const salesData = [
            { channel: 'Социальные сети', sales: 1200 },
            { channel: 'Электронная почта', sales: 800 },
            { channel: 'Реклама', sales: 600 },
        ];

        res.json(salesData);
    }


    async getTeaPopularityRatings(req, res) {
        const popularityRatings = [
            { date: '2023-11-01', teaBlend1: 4.5, teaBlend2: 3.8, teaBlend3: 4.2 },
            { date: '2023-11-02', teaBlend1: 4.8, teaBlend2: 3.6, teaBlend3: 4.0 },
            { date: '2023-11-03', teaBlend1: 2.8, teaBlend2: 3.6, teaBlend3: 1.0 },
            { date: '2023-11-04', teaBlend1: 4.2, teaBlend2: 2.6, teaBlend3: 3.0 },
        ];

        res.json(popularityRatings);
    }


    async postLogin(req, res) {
        try {
            const {username, password} = req.body;
            if (!await userModel.checkLogin(username)) {
                return res.json({message: "Пользователь с таким username не существует"});
            }

            const hashPassword = await userModel.getPassword(username);
            const validPassword = bcrypt.compareSync(password, hashPassword);
            if (!validPassword) return res.json({message: 'Введён неверный пароль'});

            const {id, role} = await userModel.getIdAndRole(username);

            const token = generateAccessToken(id, role);
            return res.json({token, message: 'Пользователь успешно авторизирован'});

        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    }


    async postRegistration(req, res) {
        try {
            const { phone, email, password } = req.body;
            if (await userModel.checkLogin(email)) {
                return res.json({message: "Пользователь с таким email существует"})
            }
            const role = 1;
            const hashPassword = bcrypt.hashSync(password, 5);
            await userModel.createUser(phone, email, hashPassword, role);

            return res.json({message: "Пользователь успешно зарегистрирован"})

        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'})
        }
    }


    async postFeedback(req, res) {
        const { name, message } = req.body;
        console.log('Полученное пожелание:', { name, message });
        res.sendStatus(200);
    }


    async getOneUser(req, res) {
        const user = await userModel.getUser(req.user.user_id);

        res.status(200).json(user);
    }


}

module.exports = new ApiController();
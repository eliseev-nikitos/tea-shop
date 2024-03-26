const path = require('path');
const ejs = require('ejs');

const userModel = require('../model/user.model');
const teaModel = require('../model/tea.model');
const {basename} = require("path");

class AdminController{

    async getUsers(req, res) {
        const template = path.join(__dirname, '..', 'view', 'users', 'users.ejs');

        const users = await userModel.getAll();
        const role = req.user.role;

        let html = await ejs.renderFile(template, { role, users });

        res.send(html);
    }

    async updateUser(req, res) {
        const userId = req.params.id;
        let { phone, login, role } = req.body;

        if (role === 'Администратор') role = 2;
        else role = 1;

        try {

            await userModel.updateUser(userId, phone, login, role);

            return res.status(200).json({ message: 'Данные пользователя успешно обновлены' });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при обновлении данных пользователя', error: error.message });
        }
    }

    async deleteUser(req, res) {
        const userId = req.params.id;

        try {

            await userModel.deleteById(userId);

            return res.status(200).json({ message: 'Удалено' });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при удалении данных пользователя', error: error.message });
        }
    }

    async createTea(req, res) {

        const { name, info } = req.body;
        const photoFileName = basename(req.file.path);


        await teaModel.create(name, photoFileName, info);

        return res.status(200).json({ message: 'Добавлено' });

    }

    async updateTea(req, res) {
        const tea_id = req.params.id;
        const { name, info, fileChange } = req.body;
        if (fileChange === 'true') {
            const photoFileName = basename(req.file.path);
            await teaModel.updateImgById(tea_id, photoFileName);
        }

        await teaModel.updateById(tea_id, name, info);


        return res.status(200).json({ message: 'Изменено' });

    }

    async deleteTea(req, res) {
        const tea_id = req.params.id;
        await teaModel.deleteById(tea_id);
        return res.status(200).json({ message: 'Удалено' });
    }

    async getAddTea(req, res) {
        const template = path.join(__dirname, '..', 'view', 'addTea.ejs');

        const role = req.user.role;
        let html = await ejs.renderFile(template, { role });

        res.send(html);
    }

    async getUpdateTea(req, res) {
        const template = path.join(__dirname, '..', 'view', 'changeTea.ejs');
        const id = req.params.id;

        const tea = await teaModel.getOneById(id);

        const role = req.user.role;
        let html = await ejs.renderFile(template, { role, tea });

        res.send(html);
    }


}

module.exports = new AdminController();
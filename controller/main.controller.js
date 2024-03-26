const path = require('path');
const ejs = require('ejs');

const teaModel = require('../model/tea.model');

const { exec } = require('child_process');


class MainController{

    async getMain(req, res) {
        const template = path.join(__dirname, '..', 'view', 'main.ejs');

        const role = req.user.role;
        let html = await ejs.renderFile(template, { role });

        res.send(html);
    }

    async getAuth(req, res) {
        const template = path.join(__dirname, '..', 'view', 'auth.ejs');

        const role = req.user.role;
        let html = await ejs.renderFile(template, { role });

        res.send(html);
    }

    async getRegistration(req, res) {
        const template = path.join(__dirname, '..', 'view', 'registration.ejs');

        const role = req.user.role;
        let html = await ejs.renderFile(template, { role });

        res.send(html);
    }

    async getBlog(req, res) {
        const template = path.join(__dirname, '..', 'view', 'blog.ejs');

        const role = req.user.role;
        let html = await ejs.renderFile(template, { role });

        res.send(html);
    }

    async getCatalog(req, res) {
        const template = path.join(__dirname, '..', 'view', 'catalog.ejs');

        const role = req.user.role;

        const teas = await teaModel.getAll();

        let html = await ejs.renderFile(template, { role, teas });

        res.send(html);
    }

    async getInstruction(req, res) {
        const template = path.join(__dirname, '..', 'view', 'instruction.ejs');

        const role = req.user.role;
        let html = await ejs.renderFile(template, { role });

        res.send(html);
    }

    async getProduct(req, res) {
        const template = path.join(__dirname, '..', 'view', 'product.ejs');

        const id = req.params.id;

        const tea = await teaModel.getOneById(id);

        const role = req.user.role;
        let html = await ejs.renderFile(template, { role, tea });

        res.send(html);
    }

    async getStat(req, res) {
        const template = path.join(__dirname, '..', 'view', 'stat.ejs');

        const role = req.user.role;
        let html = await ejs.renderFile(template, { role });

        res.send(html);
    }

    async logout(req, res) {
        res.clearCookie('token');
        res.redirect('/');
    }

    async search(req, res) {
        const template = path.join(__dirname, '..', 'view', 'search.ejs');
        const script_path = path.join(__dirname, '..', 'ml', 'search.py');

        const role = req.user.role;

        const { query } = req.query;
        console.log(query)

        let ids = [];
        const command = `python ${script_path} "${query}"`;
        exec(command, async (error, stdout, stderr) => {
            if (error) {
                console.error(`Ошибка выполнения: ${error}`);
                return;
            }
            console.log('Работа ml - ', stdout)

            if (stdout.trim() === '[]') {
                res.send('<div class="no-search">Такого чая не найдено!</div>');
                return;
            }

            ids = stdout.trim().match(/\d+/g).map(Number);
            console.log(ids);

            const teas = await teaModel.getAllById(ids);

            let html = await ejs.renderFile(template, { role, teas });
            res.send(html);
        });
    }

}

module.exports = new MainController();
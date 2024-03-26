const form = document.querySelector('form');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('/api/login', {
            username: username,
            password: password
        });
        if (response.data.message === "Пользователь успешно авторизирован") {
            setCookie('token', response.data.token, 1);
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Ошибка отправки данных на сервер:', error);
    }
});


function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
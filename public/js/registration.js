const registrationForm = document.querySelector('form');

registrationForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirmation = document.getElementById('password-con').value;

    try {
        const response = await axios.post('/api/registration', {
            phone: phone,
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation
        });
        console.log('Данные успешно отправлены на сервер:', response.data);
        if (response.data.message === "Пользователь успешно зарегистрирован") {
            window.location.href = '/auth';
        }
    } catch (error) {
        console.error('Ошибка отправки данных на сервер:', error);
    }
});
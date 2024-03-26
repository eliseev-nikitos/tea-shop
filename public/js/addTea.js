const teaForm = document.getElementById('teaForm');

teaForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(teaForm);

    try {
        const response = await axios.post('/admin/tea', formData);
        console.log('Ответ от сервера:', response.data);
        window.location.href = '/catalog';
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
    }
});

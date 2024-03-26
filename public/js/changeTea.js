const teaForm = document.getElementById('teaForm');

let fileChange = false;
document.getElementById('img').addEventListener('change', () => {
    fileChange = true;
})

teaForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(teaForm);
    formData.append('fileChange', fileChange);

    try {
        const teaId = teaForm.getAttribute('data-id');
        const response = await axios.put(`/admin/tea/${teaId}`, formData);
        console.log('Ответ от сервера:', response.data);
        window.location.href = '/catalog'
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
    }
});

const feedbackForm = document.getElementById('feedbackForm');

feedbackForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    try {
        const response = await axios.post('/api/feedback', {
            name: name,
            message: message
        });
        console.log('Пожелание успешно отправлено:', response.data);
    } catch (error) {
        console.error('Ошибка отправки пожелания:', error);
    }
});
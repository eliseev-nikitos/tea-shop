const changeButton = document.querySelector('.change-btn');
const deleteButton = document.querySelector('.delete-btn');

changeButton.addEventListener('click', () => {
    window.location.href = `/admin/tea/${changeButton.getAttribute('data-id')}`
});


deleteButton.addEventListener('click', async () => {
    await axios.delete(`/admin/tea/${deleteButton.getAttribute('data-id')}`)
        .then(() => {
            window.location.href = '/catalog';
        })
        .catch(e => {
            console.log(e);
        })
});

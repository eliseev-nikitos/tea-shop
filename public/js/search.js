document.getElementById("searchButton").addEventListener("click", function() {
    let query = document.getElementById("searchInput").value;

    axios.get('/search', {params: {query: query}})
        .then(function (response) {
            updateContainer(response.data);
        })
        .catch(function (error) {
            console.error('Ошибка при отправке запроса:', error);
        });
});

const container = document.querySelector('.main-content');
function updateContainer(newHTML) {
    container.innerHTML = '';
    container.innerHTML = newHTML;
    const recipeNames = document.querySelectorAll(".cart-name");

    recipeNames.forEach(function(name) {
        if (name.textContent.length > 14) {
            name.textContent = name.textContent.slice(0, 11) + "...";
        }
    });
}


document.addEventListener("DOMContentLoaded", function() {
    const recipeNames = document.querySelectorAll(".cart-name");

    recipeNames.forEach(function(name) {
        if (name.textContent.length > 14) {
            name.textContent = name.textContent.slice(0, 11) + "...";
        }
    });
});
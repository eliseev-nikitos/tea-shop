const productWeights = document.querySelectorAll('.product-weight');
const changePriceElement = document.querySelector('.change-price');
const startPrice = changePriceElement.textContent;
const startWeight = parseInt(document.querySelector('.active').textContent);

function handleButtonClick(event) {
    productWeights.forEach(button => {
        button.classList.remove('active');
    });

    event.target.classList.add('active');

    const selectedWeight = parseInt(event.target.textContent);
    const newPrice = selectedWeight / 100 * startPrice;
    changePriceElement.textContent = newPrice;
}

productWeights.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});


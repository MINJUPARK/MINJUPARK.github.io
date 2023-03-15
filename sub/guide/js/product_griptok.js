
function productSeries() {
    const griptok = document.querySelector('.series__animal').clientHeight;
    document.querySelector('.series__matryo').children[0].style.height = `${griptok}px`;
}

['load', 'resize'].forEach(function (e) {
    window.addEventListener(e, productSeries);
});
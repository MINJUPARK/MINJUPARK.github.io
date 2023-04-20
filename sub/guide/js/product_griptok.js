
function productSeries() {
    const standard = document.querySelector('.series__standard').clientHeight;
    document.querySelector('.series__target').children[0].style.height = `${standard}px`;
}

['load', 'resize'].forEach(function (e) {
    window.addEventListener(e, productSeries);
});
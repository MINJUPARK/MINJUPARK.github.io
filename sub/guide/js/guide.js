window.onload = function() {
    AOS.init();

    const scrollDown = document.querySelector('.scroll');
    const overview = document.querySelector('.overview');

    const animateBox = function(entries, observer) {
        const [{isIntersecting, target}] = entries;
        if (isIntersecting) {
            scrollDown.classList.add('hide');
        } else {
            scrollDown.classList.remove('hide');
        }
    };

    const io = new IntersectionObserver(animateBox, {
        root: null,
        threshold: 0.1
    })
    io.observe(overview);
}

// function productSeries() {
//     // const standard = document.querySelector('.series__standard').clientHeight;
//     // document.querySelectorAll('.series__target').children[0].style.height = `${standard}px`;

//     var all = document.querySelectorAll('.series__target');
//     for (var i = 0; i < all.length; i++) {
//         all[i].children[0].style.height = `${standard}px`;
//     }
// }
// ['load', 'resize'].forEach(function (e) {
//     window.addEventListener(e, productSeries);
// });
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
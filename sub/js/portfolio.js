$(function() {
    $('#fullpage').fullpage({
        dragAndMove: true,
        navigation: true,
        navigationTooltips: ['web', 'program', 'design', 'end'],
        anchors: ['web', 'program', 'design', 'end'],
        sectionsColor: ['#fa9aba', '#9abefa', '#c59afa'],
        slidesNavigation: true,
        controlArrows: false,
        loopTop: true,
        loopBottom: true,
        scrollingSpeed: 1000
        //fa9aba
    });
});

function mobilePopUp(url) {
    const width = 390;
    const height = 844;
    
    const x = (window.screen.width / 2) - (width / 2);
    const y = (window.screen.height / 2) - (height / 2);
    
    var popup = `width=${width}, height=${height}, left=${x}, top=${y}, scrollbars=yes, status=yes, resizable=yes, titlebar=yes`;
    
    window.open(url, 'mobile web', popup);
}

function prepareImg() {
    const list = document.getElementsByClassName("prepare");
    for (let i = 0; i < list.length; ++i) {
        list[i].setAttribute('src', './image/prepare.png');
    }
}
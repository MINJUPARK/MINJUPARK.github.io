$(function() {

    const menuContainer = ["rgba(237, 103, 148, 0.5)", "rgba(83, 144, 246, 0.5)", "rgba(168, 103, 247, 0.5)"];
    const overlayMenuA = ["4px 4px 0px #ed6794", "4px 4px 0px #5390f6", "4px 4px 0px #a867f7"];
    const bubble_color = ["#ed6794", "#5390f6", "#a867f7"];
    const bubble_shadow = ["0px 3px 0px 4px #ed6794", "0px 3px 0px 4px #5390f6", "0px 3px 0px 4px #a867f7"];

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
        scrollingSpeed: 1000,

        onLeave: function(anchorLink, index) {
            $(".menu-container").css("background-color", menuContainer[index-1]);
            $(".overlay__menu a").css("text-shadow", overlayMenuA[index-1]);
            $(".bubble").css({"color" : bubble_color[index-1], "box-shadow" : bubble_shadow[index-1]});
        },

        afterSlideLoad: function(section, origin, destination, direction, trigger) {
            $(`.monitor__screen img, .phone__screen img`).removeClass('scroll');

            if(!destination || destination == 0) {
                $(".help__comment").fadeOut(function() {
                    $(this).text("카테고리 변경은 상/하, 작업물 상세는 좌/우로 이동하여 확인할 수 있습니다. (휠, 드래그, 방향키 지원)").fadeIn(300);
                });
            } else {
                if(section == 'web') {
                    $(`.slide.fp-slide.fp-table.active .monitor__screen img, .slide.fp-slide.fp-table.active .phone__screen img`).addClass('scroll');
                }
                if(section == 'design') {
                    $(".help__comment").text("이미지 클릭 시 상세 보기로 이동합니다.").fadeIn(300);
                } else {
                    $(".help__comment").text("모니터나 스마트폰 화면 클릭 시 상세 페이지로 이동합니다.").fadeIn(300);
                }
            }
        }
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


function originalImg() {
    const img = document.querySelectorAll('.origin');
    const currentURL = window.location.href;
    let setURL;

    for (let p = 0; p < img.length; p++) {
        img[p].onclick = function() {
            if(this.dataset.url) {
                setURL = currentURL.substring(0, currentURL.indexOf('portfolio')) + this.dataset.url;
            }
            else {
                setURL = this.src;
            }
            window.open(setURL);
        }
    }
}
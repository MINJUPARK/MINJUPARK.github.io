$(function() {

    const menuContainer = ['rgba(237, 103, 148, 0.5)', 'rgba(83, 144, 246, 0.5)', 'rgba(168, 103, 247, 0.5)'];
    const overlayMenuA = ['4px 4px 0px #ed6794', '4px 4px 0px #5390f6', '4px 4px 0px #a867f7'];
    const bubble_color = ['#ed6794', '#5390f6', '#a867f7'];
    const bubble_shadow = ['0px 3px 0px 4px #ed6794', '0px 3px 0px 4px #5390f6', '0px 3px 0px 4px #a867f7'];
    // $('.title__subject').addClass('jello-horizontal');
    
    $('#fullpage').fullpage({
        dragAndMove: true,
        navigation: true,
        navigationTooltips: ['web', 'program', 'design', 'end'],
        anchors: ['web', 'program', 'design', 'end'],
        sectionsColor: ['#fa9aba', '#9abefa', '#c59afa'],
        slidesNavigation: true,
        controlArrows: false,
        // scrollOverflow:true,
        loopTop: true,
        loopBottom: true,
        scrollingSpeed: 1000,
        // normalScrollElements: '.modal',
        
        afterLoad: function(origin, destination, direction, trigger){
            $(`section.${origin} .title__subject`).addClass('jelloHorizontal');
        },

        onLeave: function(anchorLink, index, section) {
            $('.menu-container').css('background-color', menuContainer[index-1]);
            $('.overlay__menu a').css('text-shadow', overlayMenuA[index-1]);
            $('.bubble').css({'color' : bubble_color[index-1], 'box-shadow' : bubble_shadow[index-1]});
            $('.title__subject').removeClass('jelloHorizontal');
        },
        
        afterSlideLoad: function(section, origin, destination, direction, trigger) {
            $('.monitor__screen img, .inner__content').removeClass('autoScroll');
            
            if(!destination || destination == 0) {
                $('.help__description').fadeOut(function() {
                    $(this).html("카테고리 변경은 상/하, 작업물 상세는 좌/우로 이동하여 <br>확인할 수 있습니다. (휠, 드래그, 방향키 지원)").fadeIn(300);
                });
            } else if (destination == 7) {
                appPreview("appSlide.III");
                appPreview("appSlide.IV");
                appPreview("appSlide.V");
            } else {
                if(section == 'web') {
                    $('.slide.fp-slide.fp-table.active .monitor__screen img, .slide.fp-slide.fp-table.active .inner__content').addClass('autoScroll');
                }
                if(section == 'design') {
                    $('.help__description').html("이미지 클릭 시 <br>상세 페이지로 이동합니다.").fadeIn(300);
                } else {
                    $('.help__description').html("디바이스 영역 클릭 시 <br>상세 페이지로 이동합니다.").fadeIn(300);
                }
            }
            
        }
    });

    $('.ratio').on({
        mouseenter: function() {
            $('.ratio').not(this).after().css('background-color', 'rgba(168, 103, 247, 0.5)');
            $(this).children().addClass('autoScroll');
        },
        mouseleave: function() {
            $('.ratio').after().css('background-color', 'unset');
            $(this).children().removeClass('autoScroll');
        }
    });
});


function appPreview(device) {
    setInterval(function(){  
        $(`.${device} li:first-child`).animate({'left': '-100%'}, 500, function(){
            $(this).css('left', 0).appendTo(`.${device}`);
        });  
    }, 3000);
}

function mobilePopUp(url) {
    const width = 390;
    const height = 844;
    const x = (window.screen.width / 2) - (width / 2);
    const y = (window.screen.height / 2) - (height / 2);
    
    var popup = `width=${width}, height=${height}, left=${x}, top=${y}, scrollbars=yes, status=yes, resizable=yes, titlebar=yes`;
    
    window.open(url, 'mobile web', popup);
}

function pdfViewer(location, fileName) {
    const adobeDCView = new AdobeDC.View({clientId: '24f9f79e8dac472689c3022c93638408', divId: 'adobe-dc-view', locale: 'ko-KR'});
    adobeDCView.previewFile(
    {
        content:  { location: { url: location } },
        metaData: { fileName: `${fileName}.pdf` }
    });
}

function prepareImg() {
    const list = document.getElementsByClassName('prepare');
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
            } else {
                setURL = this.src;
            }
            window.open(setURL);
        }
    }
}

window.addEventListener('load', function() {

    const origin = document.querySelectorAll('.origin');

    origin.forEach((target) => 
        target.addEventListener('click', function(e) {
            originalImg();
        })
    );

    const modalBtn = document.querySelectorAll('.modal__link');
    const closeBtn = document.getElementById('modal__close');
    const modal = document.querySelector('.modal');
    const modalHeader = document.querySelector('.modal__header');
    const modalIframe = document.querySelector('.modal__iframe');
    // const header = document.querySelector('header');
    
    modalBtn.forEach((target) => 
        target.addEventListener('click', function(e) {
            e.preventDefault();
            $.fn.fullpage.setMouseWheelScrolling(false);
            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);
            // header.classList.add('hidden');
            modal.classList.add('show');

            // document.querySelector('header, .fp-slidesNav.bottom').style.zIndex = -1;
            // document.getElementById('fp-nav').style.zIndex = -1;
            
            if(target.classList.contains('guide')) {
                modalHeader.classList.add('guide');
                modalIframe.style.display = 'block';
                modalIframe.src = target.href;
            } else {
                document.addEventListener('adobe_dc_view_sdk.ready', pdfViewer(target.href, target.dataset.title));
            }
        }
    ));

    closeBtn.addEventListener('click', function() {
        $.fn.fullpage.setMouseWheelScrolling(true);
        $.fn.fullpage.setAllowScrolling(true);
        $.fn.fullpage.setKeyboardScrolling(true);

        // header.classList.remove('hidden');
        modal.classList.remove('show');
        modalHeader.classList.remove('guide');
        modalIframe.style.display = 'none';
        // document.querySelector('header, .fp-slidesNav.bottom').style.zIndex = 1;
        // document.getElementById('fp-nav').style.zIndex = 1;
        document.removeEventListener("adobe_dc_view_sdk.ready", pdfViewer());
    });

    // 모바일 팝업
    const phone = document.querySelectorAll('.inner__content.mobile');

    phone.forEach((target) => 
        target.addEventListener('click', function() {
            mobilePopUp(this.dataset.url);
        })
    );

    // 포트폴리오 메인페이지 아이콘
    const categoryItem = document.querySelectorAll('.category__item');

    categoryItem.forEach((target) => 
        target.addEventListener('mouseover', function() {
            target.firstChild.nextSibling.classList.add('shakeBottom');
        })
    );

    categoryItem.forEach((target) => 
        target.addEventListener('mouseout', function() {
            target.firstChild.nextSibling.classList.remove('shakeBottom');
        })
    );
});
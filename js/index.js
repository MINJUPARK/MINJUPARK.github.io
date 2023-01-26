$(function($) {

    $(window).on('load scroll', function() {
        $('.career__bottom').height($('.monitor__table').outerHeight(true));
        $('.design__circle__wrap').height($('.design__circle').height());
        $('section.license').css('margin-top', $('.walked.training').height());
        $('.skill__comment').css('top', $('.main__design').outerHeight(true));
        
        // $('.skill__main').css('height', $('.skill__main').height() - 50);
        if($(this).width() > 1024) {
            $('.skill__comment').css('top', 'unset');
        }

    });

    
    // [index] scroll change background
    $(window).on('scroll', function() {
        let $window = $(window),
            $body = $('body'),
            $section = $('section');
        
        let scroll = $window.scrollTop() + ($window.height() / 3.75);
        
        $section.each(function () {
            let $this = $(this);
        
            if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
                $body.removeClass(function (index, css) {
                    return (css.match (/(^|\s)bg-\S+/g) || []).join(' ');
                });

                $body.addClass('bg-' + $(this).data('color'));
            }
        });
    });

    // [landing] star
    function addStar() {
        const section = document.querySelector('.star');
        const div = document.createElement('div');
    
        div.className = 'star__element';
        div.style.setProperty('--size', Math.random()*2 + 3 + 'vmin');
        div.style.left = Math.floor(Math.random()*100) + '%';
        div.style.top = Math.floor(Math.random()*100) + '%';
        div.onanimationend = function() { this.remove(); }
        section.appendChild(div);
    }
    setInterval(addStar, 20);

    // [skill] slider
    const swiper = new Swiper(".swiper-container", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        initialSlide: 1,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 750,
            modifier: 0.8,
            slideShadows: false
        }
    });
})
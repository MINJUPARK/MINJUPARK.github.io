window.onload = function() {
    const topLine = document.getElementById("top-line");
    const middleLine = document.getElementById("middle-line");
    const bottomLine = document.getElementById("bottom-line");
    const segmentDuration = 15;
    const menuDisappearDurationInFrames = segmentDuration;
    const arrowAppearDurationInFrames = segmentDuration;
    const arrowDisappearDurationInFrames = segmentDuration;
    const menuAppearDurationInFrames = segmentDuration;
    let state = "menu";
    let topLeftX, topRightX, bottomLeftX, bottomRightX;
    let topLineY, middleLineY, bottomLineY;
    let topLeftY, topRightY, bottomLeftY, bottomRightY;
    let menuDisappearComplete = false;
    let arrowAppearComplete = false;
    let arrowDisappearComplete = false;
    let menuAppearComplete = false;
    let currentFrame = 1;


    // 메뉴 닫기
    function closeMenuAnimation() {
        if ( !arrowDisappearComplete ) {
            arrowDisappearAnimation();
        } else if ( !menuAppearComplete ) {
            menuAppearAnimation();
        }
    }

    // 메뉴 열기
    function openMenuAnimation() {
        if ( !menuDisappearComplete ) { 
            menuDisappearAnimation();
        } else if ( !arrowAppearComplete ) {
            arrowAppearAnimation();
        }
    }

    // 메뉴 나타남
    function menuAppearAnimation() {
        currentFrame++;
        if ( currentFrame <= menuAppearDurationInFrames ) {
            window.requestAnimationFrame( () => {
                topLineY = AJS.easeOutBack( 50, 37, menuDisappearDurationInFrames, currentFrame );
                topLine.setAttribute( "d", "M30,"+topLineY + " L70," + topLineY );
                bottomLineY = AJS.easeOutBack( 50, 63, menuDisappearDurationInFrames, currentFrame );
                bottomLine.setAttribute( "d", "M30,"+bottomLineY + " L70," + bottomLineY );
                menuAppearAnimation();
            });
        } else {
            currentFrame = 1;
            menuAppearComplete = true;
            closeMenuAnimation();
        }
    }

    // 메뉴 사라짐
    function menuDisappearAnimation() {
        currentFrame++;
        if ( currentFrame <= menuDisappearDurationInFrames ) {
            window.requestAnimationFrame( () => { 
                topLineY = AJS.easeInBack( 37, 50, menuDisappearDurationInFrames, currentFrame );
                topLine.setAttribute( "d", "M30," + topLineY+  " L70," + topLineY );
                bottomLineY = AJS.easeInBack( 63, 50, menuDisappearDurationInFrames, currentFrame );
                bottomLine.setAttribute( "d", "M30," + bottomLineY + " L70," + bottomLineY );
                menuDisappearAnimation();
            });
        } else {
            middleLine.style.opacity = "0";
            currentFrame = 1;
            menuDisappearComplete = true;
            openMenuAnimation();
        }
    }

    // 메뉴 선 교차
    function arrowAppearAnimation() {
        currentFrame++;
        if ( currentFrame <= arrowAppearDurationInFrames ) {
            window.requestAnimationFrame( () => { 
                topLeftX = AJS.easeOutBack( 30, 35, arrowAppearDurationInFrames, currentFrame );
                topLeftY = AJS.easeOutBack( 50, 35, arrowAppearDurationInFrames, currentFrame );
                bottomRightX = AJS.easeOutBack( 70, 65, arrowAppearDurationInFrames, currentFrame );
                bottomRightY = AJS.easeOutBack( 50, 65, arrowAppearDurationInFrames, currentFrame );
                topLine.setAttribute( "d", "M" + topLeftX + "," + topLeftY + " L" + bottomRightX + "," + bottomRightY );
                bottomLeftX = AJS.easeOutBack( 30, 35, arrowAppearDurationInFrames, currentFrame );
                bottomLeftY = AJS.easeOutBack( 50, 65, arrowAppearDurationInFrames, currentFrame );
                topRightX = AJS.easeOutBack( 70, 65, arrowAppearDurationInFrames, currentFrame );
                topRightY = AJS.easeOutBack( 50, 35, arrowAppearDurationInFrames, currentFrame );
                bottomLine.setAttribute( "d", "M" + bottomLeftX + "," + bottomLeftY + " L" + topRightX + "," + topRightY );
                arrowAppearAnimation();
            });
        } else {
            currentFrame = 1;
            arrowAppearComplete = true;
            openMenuAnimation();
        }
    }

    // 메뉴 선 교차 사라짐
    function arrowDisappearAnimation() {
        currentFrame++;
        if ( currentFrame <= arrowDisappearDurationInFrames ) {
            window.requestAnimationFrame( () => {
                topLeftX = AJS.easeInBack( 35, 30, arrowDisappearDurationInFrames, currentFrame );
                topLeftY = AJS.easeInBack( 35, 50, arrowDisappearDurationInFrames, currentFrame );
                bottomRightX = AJS.easeInBack( 65, 70, arrowDisappearDurationInFrames, currentFrame );
                bottomRightY = AJS.easeInBack( 65, 50, arrowDisappearDurationInFrames, currentFrame );
                topLine.setAttribute( "d", "M" + topLeftX + "," + topLeftY + " L" + bottomRightX + "," + bottomRightY );
                bottomLeftX = AJS.easeInBack( 35, 30, arrowDisappearDurationInFrames, currentFrame );
                bottomLeftY = AJS.easeInBack( 65, 50, arrowDisappearDurationInFrames, currentFrame );
                topRightX = AJS.easeInBack( 65, 70, arrowDisappearDurationInFrames, currentFrame );
                topRightY = AJS.easeInBack( 35, 50, arrowDisappearDurationInFrames, currentFrame );
                bottomLine.setAttribute( "d", "M" + bottomLeftX + "," + bottomLeftY + " L" + topRightX + "," + topRightY );
                arrowDisappearAnimation();
            });
        } else {
            middleLine.style.opacity = "1";
            currentFrame = 1;
            arrowDisappearComplete = true;
            closeMenuAnimation();
        }
    }

    const menu = document.querySelector('#togglebtn');
    const menuItems = document.querySelector('#overlay');
    const menuItemsli = document.querySelectorAll('#overlay li');
    const menuContainer = document.querySelector('.menu-container');

    function toggleMenu(e) {
        e.preventDefault();
        menuItems.classList.toggle('open');
        menuContainer.classList.toggle('full-menu');
        
        if ( state === "menu" ) {
            openMenuAnimation();
            state = "arrow";
            arrowDisappearComplete = false;
            menuAppearComplete = false;
            for(let i = 0; i < menuItemsli.length; i++) {
                menuItemsli[i].classList.add("fadeInRight");
            }
        } else if ( state === "arrow" ) {
            closeMenuAnimation();
            state = "menu";
            menuDisappearComplete = false;
            arrowAppearComplete = false;
            for(let i = 0; i < menuItemsli.length; i++) {
                menuItemsli[i].classList.remove("fadeInRight");
            }
        }
    }

    menu.addEventListener('click', toggleMenu, false);

    $('.overlay__menu a').on({
        mouseenter: function() {
            $(this).next().css('opacity', '1');
        },
        mouseleave: function() {
            $(this).next().css('opacity', '0');
        }
    });

    $('.pcNav__list a').on({
        mouseenter: function() {
            $(this).next().addClass('on');
        },
        mouseleave: function() {
            $(this).next().removeClass('on');
        }
    });

    // 메뉴 부드러운 이동
}
$(function() {
    
    // 특정 위치 도달 시 SNS 그리드 영역 효과
    const snsOffset = $('.sns-grid').offset();
    $(window).on('scroll', function() {
        if ($(document).scrollTop() > snsOffset.top - 600) {
            $('.sns-grid').css({"opacity" : "1"});
            $('.sns-grid .pic.p1').css({"animation" : "show 0.25s"});
            $('.sns-grid .pic.p2').css({"animation" : "show 0.5s"});
            $('.sns-grid .pic.p3').css({"animation" : "show 0.75s"});
            $('.sns-grid .pic.p4').css({"animation" : "show 1s"});
            $('.sns-grid .pic.p5').css({"animation" : "show 1.25s"});
            $('.sns-grid .pic.p6').css({"animation" : "show 1.5s"});
            $('.sns-grid .pic.p7').css({"animation" : "show 1.75s"});
            $('.sns-grid .pic.p8').css({"animation" : "show 2s"});
        } 
    });

    // 특정 위치 도달 시 뉴스레터 영역 활성화
    const newsOffset = $('.news-letter').offset();
    $(window).on('scroll', function() {
        if ($(document).scrollTop() > newsOffset.top - 1200) {
            $('.news-letter').css({"top" : "0"});
            $('.news-letter .subscribe').css({"opacity" : "1"});
        } 
    });

    // 상단 팝업메뉴 닫기
    $('.banner-close').click(function() {
        $('.top-banner').addClass('hidden');
    });

    // 더보기 버튼 hover 시 배경색 및 화살표 색상 변경
    $('.move-page .btn').hover(function() {
        $(this).children().css({"filter" : "invert(100%) sepia(0%) saturate(7500%) hue-rotate(218deg) brightness(102%) contrast(105%)"});
    });
    $('.move-page .btn').mouseleave(function() {
        $(this).children().css({"filter" : "invert(49%) sepia(0%) saturate(1656%) hue-rotate(213deg) brightness(99%) contrast(92%)"});
    });
    
    // 플로팅 버튼
    $('.main-btn').click(function() {
        $('.top-btn').toggleClass('hidden');
        $('.talk-btn').toggleClass('hidden');
    });
    
    // 제품 색상 선택 시 이미지 변경 (+ 색상 피커 테두리 on/off)
    $('.inner').click(function() {
        const imgTitle = $(this).attr('class'); // 클래스 이름 전체 불러옴 
        const imgNum = imgTitle.split(' ', 2); // 파일제목 추출 => imgNum(1) 
        const imgPath = $(this).parents('.item-box').children('.item-view').children('.i-img').children('a');

        imgPath.children('img').addClass('hidden');
        imgPath.append(`<img src=./images/${imgNum[1]}.png>`);
        
        $(this).parents('.i-color').children('.outer').removeClass('selected');
        $(this).parents('.outer').addClass('selected');
    });

    // 제품 색상 hover 시 이미지 변경
    $('.inner').hover(function() {
        const imgTitle = $(this).attr('class');
        const imgNum = imgTitle.split(' ', 2);
        const imgPath = $(this).parents('.item-box').children('.item-view').children('.i-img').children('a');

        imgPath.children('img').addClass('hidden');
        imgPath.append(`<img src=./images/${imgNum[1]}.png>`);
    });

    // 컬러피커 영역을 떠나면 첫번째 이미지 + 색상으로 고정
    $('.i-color').mouseleave(function() {
        
        const imgTitle = $(this).children('.outer').children('.inner').attr('class');
        const imgNum = imgTitle.split(' ', 2);
        const imgPath = $(this).parents('.item-box').children('.item-view').children('.i-img').children('a');
        
        imgPath.children('img').addClass('hidden');
        imgPath.append(`<img src=./images/${imgNum[1]}.png>`);
        $(this).find('.outer.selected').removeClass('selected');
        $(this).children('.outer:first-child').addClass('selected');
    });

    // 뉴스레터 이메일
    $('.email-box input[type=submit]').click(function() {
        var email = $("#email").val();

        if (email == '') {
            alert('이메일을 입력해주세요.');
        } else if (!email_check(email)) {
            alert('이메일 형식이 올바르지 않습니다.');
        } else {
            alert('뉴스레터 구독신청이 완료되었습니다.');
        }
    });
});

// 이메일 유효성 체크
function email_check(email) {
	var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	return reg.test(email);
}

// 팝업창을 브라우저 크기를 파악해 정중앙에 띄움
function openPopup(url) {
    const width = '800';
    const height = '500';
    let left = Math.round(window.screenX + (window.outerWidth/2) - (width/2));
    let top = Math.round(window.screenY + (window.outerHeight/2) - (height/2));

    return window.open(url, 'popup','width='+ width +', height='+ height +', left=' + left +', top=' + top);
}
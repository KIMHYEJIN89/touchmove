/** 
 * 
 *  author : kimhyejin
 *  version : 1.0
 * 
 * 
 **/

$( document ).ready(function() {

    var deleteBox = 0;
    var boxWidth = 0;
    var touchStart = 0;
    var touchEnd = 0;
    var touchMove = 0;
    var setWidth = 40;

    $('.list li').each(function(e){
        $(this).bind('touchstart',function(e){
            touchStart = e.originalEvent.changedTouches[0].pageX;
            console.log("터치 스타트 " + touchStart);
        });

        $(this).bind('touchend',function(e){

            touchEnd = e.originalEvent.changedTouches[0].pageX;
            console.log("터치 엔드 " + touchEnd);

            //삭제
            if(touchStart >= touchMove){
                console.log("deleteBox" + deleteBox)
                boxWidth = deleteBox.substring(7,9)
                console.log("boxWidth" + boxWidth)
                if(boxWidth >= setWidth){
                    $(this).find('.delete').stop().animate({
                        width:100+'%'
                    },100,function() {
                        $(this).closest('li').remove();
                        boxWidth = 0;
                    });

                    $(this).find('.box').stop().animate({
                        left:-100+'%'
                    },100);
    
                }else{
                    $(this).find('.box').stop().animate({
                        left:0
                    },100);
                    $(this).find('.delete').stop().animate({
                        width:0
                    },100);
                }
            }
            //수정
            else if(touchStart <= touchMove){
                if(boxWidth >= setWidth){
                    $(this).find('.modify').stop().animate({
                        width:100+'%'
                    },100,function() {
                        boxWidth = 0;
                        
                    });
    
                }else{
                    $(this).find('.box').stop().animate({
                        left:0
                    },500);
                    $(this).find('.modify').stop().animate({
                        width:0
                    },500);
                }
            }
        });
        $(this).find('.box').bind('touchmove',function(e){
            
            var li = $(this).closest('li')
            touchMove = e.originalEvent.touches[0].clientX;
           // console.log("터치 스타2 " + touchStart);
           // console.log("터치 무브 " + touchMove);
    
            if(touchStart >= touchMove){
                
                $(this).css('left',  (touchMove / 10) -30  +'%');
                  var move =  (touchMove / 10) - 30;
                  li.find('.delete').css('width', -(move) +'%')
                  deleteBox = li.find('.delete').attr('style');

            }else if(touchStart <= touchMove){
                     
                $(this).css('left',(touchMove / 10) -20  +'%');
                var move =  (touchMove / 10) -20;
                li.find('.modify').css('width',move  +'%')
                deleteBox = li.find('.modify').attr('style');
  
            }

        });

    })

});
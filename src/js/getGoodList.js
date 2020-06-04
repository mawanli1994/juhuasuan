function getGoodslist(typeId){
    let data = {};
    if(typeId){
        data.typeId = typeId;
    }
    $.get("./php/getGoodsList.php",data,
		function(data){
			let htmlStr = "";
			data.forEach(goods =>{
				htmlStr += `
	    						<div class="goods">
		                            <a href="product-details.html?goodsId=${goods.goodsId}"><img src="${goods.goodsImg}" alt=""></a>
		                            <span>¥ ${goods.goodsPrice}</span>
		                            <p>${goods.goodsDesc}</p>
		                        </div>
	    					`
			})
        $("#product-list").html(htmlStr);
    },"json");
}

$(function(){
    getGoodslist();
    $("#nvxie").click(function(){
        getGoodslist('001')
    });
    $("#nanzhuang").click(function(){
        getGoodslist('002')
    });
})


//回到顶部
$('.Top').click(function() {
			$("html,body").animate({scrollTop:0},1100); 
		})
	 $(".Top").mouseover(function () {
		       $(".Top").css({color:'white',background:'#FD3F31'});
		    }).mouseout(function () {
		    	$(".Top").css({color:'#FD3F31',background:'white'});
            })
            //返回顶部显示
		$(window).on('scroll',function(){
		    var $scroll=$(this).scrollTop();
		    if($scroll>=120){
		        $('.Top').show();
		    }else{
		        $('.Top').hide();
		    }
		})
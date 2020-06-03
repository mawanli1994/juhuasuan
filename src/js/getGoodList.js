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
		                            <p>${goods.goodsCount}</p>
//		                            <input type="button" value="加入购物车" class="add">
		                        </div>
	    					`
			})
        $("#product-list").html(htmlStr);
    },"json");
}
//`<div class="goods" index="${this.data[i].goodsId}">
//  <img src="${this.data[i].img}" alt="">
//  <span>${this.data[i].price}</span>
//  <p>${this.data[i].name}</p>
//  <input type="button" value="加入购物车" class="add">
//</div>`

$(function(){
    getGoodslist();
    $("#nvxie").click(function(){
        getGoodslist('001')
    });
    $("#nanzhuang").click(function(){
        getGoodslist('002')
    });
})
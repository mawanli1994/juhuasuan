function getCar(){
    // 从cookie中获取当前登录的用户名
       let username = getCookie("username");
    $.get("./php/getShoppingCart.php",{
        "vipName":username
    },function(data){
        showCar(data);
        addEvent();
    },"json");
}

function showCar(data){
    let htmlStr=`
                <tr>
                    <td style="">
                        <input type="checkbox" >
                    </td>
                    <td>图片</td>
                    <td>商品名称</td>
                    <td>价格</td>
                    <td>数量</td>
                    <td>金额</td>
                    <td>操作</td>
                </tr>
            `;
    data.forEach(goods => {
            htmlStr +=`
              <tr goodsId="${goods.goodsId}">
                    <td>
                        <input type="checkbox" >
                    </td>
                    <td><img src="${goods.goodsImg}" alt=""></td>
                    <td>${goods.goodsName}</td>
                    <td>${goods.goodsPrice}</td>
                    <td>
                            <input type="button" class="reduceBtn" value="-">
                            <span>${goods.goodsCount}</span>
                            <input type="button" class="addBtn" value="+">
                    </td>
                    <td>${goods.goodsPrice*goods.goodsCount}</td>
                    <td>
                        <input  class="delBtn" type="button" value="删除" style="color:white;background-color:red;border:none;border-radius:5px;">
                    </td>
                </tr>
            `;
        });
        
		htmlStr+=`
	                <tr>
	                	<td colspan="6" style="text-align: center" >
	                   	总金额：<span>0</span>
	                	</td>
	                	<td>
	                		<input type="button" value="去结算" style="width:60px;height:30px;color:white;background-color:red;border:none;border-radius:5px;"/>
	                	</td>
	                </tr>
                `;
                
		$("#shopping").html(htmlStr);
	
}
	function addEvent(){
     // 全选，反选的插件
	    $("table :checkbox:eq(0)").check($("table :checkbox:gt(0)"));
	    // 复选框点击后计算总金额
	    $(":checkbox").click(function(){
	        totalMoney();
	    });
	    // 加法
	    $(".addBtn").click(function(){
	        // 数量
	        let count = $(this).prev().html();
	        count++;
	
	         // 从cookie中获取当前登录的用户名
	        let username = getCookie();
	        let goodsId = $(this).parent().parent().attr("goodsid");
	        $.get("./php/updateGoodsCount.php",{
	            vipName:username,
	            goodsId,
	            goodsCount:count
	        },data=>{
	            if(data=="1"){
	                $(this).prev().html(count);
	                // 单价
	                let price = $(this).parent().prev().html();
	                // 计算金额
	                let money = price*count;
	                $(this).parent().next().html(money);
	                // 总金额
	                totalMoney();
	            }else{
	                alert("数量改变失败！");
	            }
	        })
	    });
	    // 减法
	    $(".reduceBtn").click(function(){
	        // 数量
	        let count = $(this).next().html();
	        count--;
	        if(count<1){
	            count=0;
	        }
	        $(this).next().html(count);
	        // 单价
	        let price = $(this).parent().prev().html();
	        // 计算金额
	        let money = price*count;
	        $(this).parent().next().html(money);
	
	        // 同时改变当前行的复选框的状态
	        if(count==0){
	            $(this).parent().parent().find(":checkbox").prop("checked",false);
	            // $(this).parent().parent().remove();
	        }
	
	        // 总金额
	        totalMoney();
	    });
	
	    // 删除
	    $(".delBtn").click(function(){
	        if(confirm("亲，您真的要删除吗？")){
	            // 从cookie中获取当前登录的用户名
	             let username = getCookie();
	            let goodsId = $(this).parent().parent().attr("goodsid");
	            // 先删除后端
	            $.get("./php/deleteGoods.php",{
	                vipName:username,
	                goodsId
	            },data=>{
	                if(data=="1"){   
	                    // 后端删除成功后，再删除前端
	                    $(this).parent().parent().remove();
	                    totalMoney();
	                }else{
	                    alert("删除失败!");
	                }
	            })
	        }
	    });
	}
	
	$(function(){
	    getCar();
	
	})
	// 计算总金额
	function totalMoney(){
	    // 
	    let money =0;
	    let $tr = $("table tr:gt(0)").not("table tr:last");
	    $tr.each(function(){
	        // 复选框是不是选中了
	        if($(this).find(":checkbox").prop("checked")){
	            money += parseFloat($(this).find("td").eq(5).html());
	        }
	    });
	    $("table tr:last").find("span").html(money);    
	}
	


//反选框
jQuery.fn.extend({
    // 参数：
    // $subCheck：子复选框
    // $unBtn:反选按钮
    check: function ($subCheck,$unBtn) {            
        //1、 点击全选复选框
        this.click(function () {
            $subCheck.prop("checked", this.checked);
        });
        if($unBtn){
            // 点击反选按钮
            $unBtn.click(function () {
                $subCheck.each(function () {
                    // this: 循环时的当前元素
                    this.checked = !this.checked;
                });
                subChangeFather();
            });
        }
        // 点击子复选框
        $subCheck.click(function () {
            subChangeFather();
        })           

        var subChangeFather = ()=> {
            // 循环所有的复选框，看看是不是都选中了呢
            let allCheck = true;//假定都选中了
            $subCheck.each(function () {
                // this:循环时的当前dom对象。
                if (this.checked != true) {
                    allCheck = false;
                }
            });
            this.prop("checked", allCheck);
        }
    }
});
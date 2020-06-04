function getdataDetail(goodsId){
    $.get("./php/getGoodsInfo.php",{
        goodsId:goodsId
    },function(data){ 
        let htmlImg =`
				<div class="s_box">
			        <img src="${data.goodsImg}" alt="">
			        <span></span>
			    </div>
			    <div class="b_box">
			        <img src="${data.goodsImg}" alt="">
			    </div>
			    <ul class="list">
			    	<li><img src="${data.goodsImg}" alt=""></li>
			        <li><img src="${data.beiyong2}" alt=""></li>
			    </ul>
			`;
			$("#product-img").html(htmlImg);
			let htmlStr =`
					<p id="nam">"${data.goodsDesc}"</p>
					<div id="bao">
						<span id="baoyou">包邮</span>
						<span id="tuihuo">退货赔运费</span>
						<span id="diejuan">叠券满300减60</span>
					</div>
					<div id="fuwu">
						<ul>
							<li>夏季新品 2020新品上市</li>
							<li>潮流时尚 穿着舒适</li>
							<li>七天无忧退换 品牌直供，七天无忧退换货，0风险购物</li>
						</ul>
					</div>
					<div id="price">
						<span id="now">¥ ${data.goodsPrice}</span>
						<span id="original">¥ ${data.beiyong3}</span>
						<span id="qiang"><input type="button" value="马上抢"/></span>
					</div>
					<div id="shuliang">
						
						<span id="kucui">库存：${data.goodsCount}</span>
					</div>
			`;
			$("#product-introduce").html(htmlStr);
			let l = new Large();
    		l.addEvent();
    },"json");
}

function addShoppingCar(goodsId){
    // 从cookie中获取当前登录的用户名
       let username = getCookie("username");
    $.post("./php/addShoppingCart.php",{
        vipName:username,
        goodsId,
        goodsCount:$("#count").val()
    },
    showMsg
    );
}

function showMsg(data){
    if(data=="1"){
        $("#message-box").html("添加成功");
    }else{
        $("#message-box").html("添加失败");
    }
    $("#message-box").css({
        display:"block"
    }).fadeOut(2000);
}
//
//
$(function(){
    let goodsId = location.search.split("=")[1] ;//?goodsId=01001    
    getdataDetail(goodsId);
    $("#jia").click(function(){
//  	console.log(goodsId);
        addShoppingCar(goodsId);
    });
//  $("#btnGo").click(function(){
//      location.href="shoppingCar.html";
//  });
})




class Large{
        constructor(){
            this.sBox = document.querySelector(".s_box");
            this.sImg = document.querySelector(".s_box img");
            this.sSpan = document.querySelector(".s_box span");
            this.bBox = document.querySelector(".b_box");
            this.bImg = document.querySelector(".b_box img");
            // 点击小图切换大图的按钮
            this.li = document.querySelectorAll(".list li");
        }
        addEvent(){
            var that = this;
            this.sBox.onmouseover = function(){
                that.over();
            }
            this.sBox.onmousemove = function(eve){
                var e = eve || window.event;
                that.move(e);
            }
            this.sBox.onmouseout = function(){
                that.out();
            }
            // 切换图片按钮的点击事件：根据布局做出调整
            for(var i=0;i<this.li.length;i++){
                this.li[i].onclick = function(){
                    // that
                    // console.log(this);
                    // console.log(this.children[0]);
                    // console.log(this.children[0].src);
                    that.sImg.src = this.children[0].src;
                    that.bImg.src = this.children[0].src;
                }
            }
        }
        over(){
            this.sSpan.style.display = "block";
            this.bBox.style.display = "block";
        }
        move(e){
            // 计算遮罩层跟随鼠标移动时的left和top
            var l = e.pageX - this.sBox.offsetLeft - this.sSpan.offsetWidth/2;
            var t = e.pageY - this.sBox.offsetTop - this.sSpan.offsetHeight/2;
            // 边界限定
            if(l<0) l=0;
            if(t<0) t=0;
            if(l > this.sBox.offsetWidth - this.sSpan.offsetWidth){
                l = this.sBox.offsetWidth - this.sSpan.offsetWidth;
            }
            if(t > this.sBox.offsetHeight - this.sSpan.offsetHeight){
                t = this.sBox.offsetHeight - this.sSpan.offsetHeight;
            }
            // 设置遮罩层的位置
            this.sSpan.style.left = l + "px";
            this.sSpan.style.top = t + "px";

            // 比例的计算公式
            // A教室，共100个座位，其中有13个座位是空的
                // 当前值 / 总值，得到的就是比例
            // 需要将B教室，共有89个座位，需要将B教室的座位闲置率和A教室保持一致
                // 上一步得到的比例 * 另一个总值，得到的是另一个教室的当前值
            // 根据遮罩层移动的距离计算比例
            var x = l / (this.sBox.offsetWidth - this.sSpan.offsetWidth);
            var y = t / (this.sBox.offsetHeight - this.sSpan.offsetHeight);
            // 根据上一步得到的比例，计算右侧大图要移动的当前值
            this.bImg.style.left = (this.bBox.offsetWidth - this.bImg.offsetWidth) * x + "px";
            this.bImg.style.top = (this.bBox.offsetHeight - this.bImg.offsetHeight) * y + "px";
        }
        out(){
            this.sSpan.style.display = "none";
            this.bBox.style.display = "none";
        }
    }


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
		


//选项卡
function Fn(){		//构造函数，保存属性
				this.li = document.querySelectorAll("#xuanxiang li");
				this.cont = document.querySelectorAll(".cont div");
			}
//			绑定事件
			Fn.prototype.eve = function(){
				var that = this;
				for(let i=0;i<this.li.length;i++){
					this.li[i].onclick = function(){
						that.act(i);
					}
				}
			}
			
			Fn.prototype.act = function(iNow){
				for(var i=0;i<this.li.length;i++){
					this.li[i].className = "";
					this.cont[i].style.display = "none";
				}
				this.li[iNow].className = "active";
				this.cont[iNow].style.display = "block";
			}
			var t = new Fn();
			t.eve();
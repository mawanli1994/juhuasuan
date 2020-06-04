
	    class GoodsList{
	    	constructor(){
	    		let data = {};
	    		this.data = data;
            	this.product = document.querySelector("#product-list");
	    	}
	    	init(){
//	    		if(typeId){
//			        data.typeId = typeId;
//			    }
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
	    			})
//	    		 var str = "";
//		            for(var i=0;i<this.data.length;i++){
//		                str += `<div class="goods" index="${this.data[i].goodsId}">
//		                            <img src="${this.data[i].img}" alt="">
//		                            <span>${this.data[i].price}</span>
//		                            <p>${this.data[i].name}</p>
//		                            <input type="button" value="加入购物车" class="add">
//		                        </div>`
//                  }
//		            this.product.innerHTML = str;
	    	}
	    	
//	    	let data = {};
//		    if(typeId){
//		        data.typeId = typeId;
//		    }
//		    $.get("./php/getGoodsList.php",data,
//		        function(data){
//		        let htmlStr = "";
//		        data.forEach(goods => {
//		            htmlStr +=`
//		                <li>
//		                    <h2>${goods.goodsName}</h2>
//		                    <a href="goodsdetail.html?goodsId=${goods.goodsId}"><img src="${goods.goodsImg}" alt=""></a>
//		                    <p>¥ ${goods.goodsPrice}</p>
//		                    <p>${goods.goodsCount}</p>
//		                </li>
//		            `;
//		        });
//		        $("#box").html(htmlStr);
//		    },"json");
	    	
	    	
	    	
		    addEvent(){
		    	var that = this;
            	this.product.onclick = function(eve){
            		var e = eve || window.event;
                	var tar = e.target || e.srcElement;
                	if(tar.className === "add"){
                		that.goodsId = tar.parentNode.getAttribute("index");
                    	that.setData();
                	}
        		}
		    }
		    setData(){
		    	var gm = localStorage.getItem("goodsMsg");
		    	if(gm === null){
		    		gm = [{
		    			goodsId:this.goodsId,
	                    num:1,
	                    msg:this.getData(this.goodsId)
		    		}];
		    	}else{
		    		gm = JSON.parse(gm);
		    		var zhuangtai = 0;
		    		for(var i=0;i<gm.length;i++){
		    			if(gm[i].goodsId === this.goodsId){
		    				gm[i].num++;
	                        zhuangtai = 1;
	                        break;
		    			}
		    		}
		    		if(zhuangtai == 0){
		    			gm.push({
		    				goodsId:this.goodsId,
	                        num:1,
	                        msg:this.getData(this.goodsId)
		    			})
		    		}
		    	}
		    	localStorage.setItem("goodsMsg",JSON.stringify(gm));
		    }
		    getData(id){
		    	for(var i=0;i<this.data.length;i++){
		    		if(this.data[i].goodsId === id){
		    			return this.data[i];
		    		}
		    	}
		    	return {};
		    }
	    }	    
	    var g = new GoodsList();
	    g.init();
	    g.addEvent();
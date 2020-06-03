var data = [{
	        img:"https://img12.360buyimg.com/n7/jfs/t1/94329/20/12711/106212/5e4a97bcE66a103ae/721ae0eaf9ecbaa7.jpg",
	        price:"￥1999.00",
	        name:"荣耀20S 李现同款 3200万人像超级夜景 4800万超广角AI三摄 麒麟810 全网通版6GB+128GB 蝶羽蓝",
	        goodsId:"123asd"
	    },{
	        img:"https://img10.360buyimg.com/n7/jfs/t1/93499/17/90/221850/5da6d4ebE9747a490/8b167328e1dadff8.jpg",
	        price:"￥2199.00",
	        name:"【品质好物】5000mAh大电量,支持18W快充,Type-C充电接口！【K305G爆品开售，点击选购】",
	        goodsId:"ajgjgj"
	    },{
	        img:"https://img12.360buyimg.com/n7/jfs/t1/103980/26/12527/248017/5e4a6b2bEde93b893/af9f1eb0617ce599.jpg",
	        price:"￥2399.00",
	        name:"这是一个手机，看着像手机就行，这是名字",
	        goodsId:"12u3"
	    },{
	        img:"https://img10.360buyimg.com/n7/jfs/t11266/172/3136897597/311385/898550cb/5ce41430N7bb10f75.jpg",
	        price:"￥1899.00",
	        name:"这也是个手机，这是这个手机的名字",
	        goodsId:"afa876"
	    },{
	        img:"https://img10.360buyimg.com/n7/jfs/t11266/172/3136897597/311385/898550cb/5ce41430N7bb10f75.jpg",
	        price:"￥1899.00",
	        name:"这也是个手机，这是这个手机的名字",
	        goodsId:"afa876"
	    },{
	        img:"https://img10.360buyimg.com/n7/jfs/t11266/172/3136897597/311385/898550cb/5ce41430N7bb10f75.jpg",
	        price:"￥1899.00",
	        name:"这也是个手机，这是这个手机的名字",
	        goodsId:"afa876"
	    },{
	        img:"https://img10.360buyimg.com/n7/jfs/t11266/172/3136897597/311385/898550cb/5ce41430N7bb10f75.jpg",
	        price:"￥1899.00",
	        name:"这也是个手机，这是这个手机的名字",
	        goodsId:"afa876"
	    },{
	        img:"https://img10.360buyimg.com/n7/jfs/t11266/172/3136897597/311385/898550cb/5ce41430N7bb10f75.jpg",
	        price:"￥1899.00",
	        name:"这也是个手机，这是这个手机的名字",
	        goodsId:"afa876"
	    },{
	        img:"https://img10.360buyimg.com/n7/jfs/t11266/172/3136897597/311385/898550cb/5ce41430N7bb10f75.jpg",
	        price:"￥1899.00",
	        name:"这也是个手机，这是这个手机的名字",
	        goodsId:"afa876"
	    },{
	        img:"https://img10.360buyimg.com/n7/jfs/t11266/172/3136897597/311385/898550cb/5ce41430N7bb10f75.jpg",
	        price:"￥1899.00",
	        name:"这也是个手机，这是这个手机的名字",
	        goodsId:"afa876"
	    }];
	    class GoodsList{
	    	constructor(){
	    		this.data = data;
            	this.product = document.querySelector("#product-list");
	    	}
	    	init(){
	    		 var str = "";
		            for(var i=0;i<this.data.length;i++){
		                str += `<div class="goods" index="${this.data[i].goodsId}">
		                            <img src="${this.data[i].img}" alt="">
		                            <span>${this.data[i].price}</span>
		                            <p>${this.data[i].name}</p>
		                            <input type="button" value="加入购物车" class="add">
		                        </div>`
                    }
		            this.product.innerHTML = str;
	    	}
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
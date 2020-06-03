class Glowworm{
	    constructor(){
	        // 获取屏幕的可视区域的宽高，用作将来的随机范围
	        this.clientW = document.documentElement.clientWidth;
	        this.clientH = document.documentElement.clientHeight;
	        // 假设萤火虫的宽高
	        this.w = 20;
	        this.h = 20;
	    }
	    createEle(){
	        var div = document.createElement("div");
	        div.className = "box1";
	        document.body.appendChild(div);
	        // 在创建元素之前一定得先生成随机坐标
	        div.style.left = this.x + "px";
	        div.style.top = this.y + "px";
	        // 元素创建好之后，需要立即运动
	        this.move(div);
	    }
	    randomPos(){
	        // 随机生成坐标
	        this.x = random(0,this.clientW - this.w);
	        this.y = random(0,this.clientH - this.h);
	    }
	    move(ele){
	        // 开始运动之前，还得随机生成目标
	        this.randomPos();
	        // 开始运动
	        move(ele,{
	            left:this.x,
	            top:this.y
	        },()=>{
	            // 一个动画结束后，重复开启当前动画，即可
	            this.move(ele);
	        })
	    }
	}
	
	
	for(var i=0;i<30;i++){
	    // 先得到实例
	    var g = new Glowworm();
	    // 生成随机坐标
	    g.randomPos();
	    // 再创建元素
	    g.createEle();
	}
	
	
	
	function random(a,b){
	    return Math.round(Math.random()*(a-b)+b);
	}
	

	
import {sliderH} from "./move2001.js";

// 一、定义类（轮播图）
export class Slider {
    constructor(boxDom, obj) {    
        // dom相关属性        
        this.boxDom = boxDom;
        this.imgBox=null; //图片容器
        this.imgDoms=[]; // 图片数组
        this.douBox = null;//分页器（豆豆）的容器
        this.douDoms = []; //豆豆的数组
        this.leftArrow = null;//左箭头
        this.rightArrow = null;//右箭头


        // 属性
        let defaultObj = {
            width: this.boxDom.offsetWidth,
            height: this.boxDom.offsetHeight,
            imgs: ["img/lunbo2.jpg","img/lunbo3.jpg","img/lunbo4.jpg","img/lunbo1.jpg","img/lunbo5.jpg"],

            // 分页器相关属性
            douWidth: 20,
            douHeight: 20,
            isCircle: true,
            color: "pink",
            highColor: "blue",
            douPos: "bottom",

            ord:0,
            timeLong: 2000,
            myTimer:null,
            isMove:false
        }

        let obj1 = obj || {};
        for(let key in defaultObj){
            this[key] = obj1[key]!=undefined?obj1[key]:defaultObj[key];
        }
        this.createUI();
        this.addEvent();
        this.autoPlay();
    }

    createUI() {
        // 1、创建图片标签
        this.createImgs();
        // 2、创建分页器
        this.createDous();
        // 3、左右箭头
        this.createArrows();
    }

    createImgs() {
        // 1、创建图片容器
        this.imgBox = document.createElement("div");
        this.imgBox.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        `;
        this.boxDom.appendChild(this.imgBox);            

        // 2、创建图片
        this.imgs.forEach((item,index) => {
            let imgDom = document.createElement("img");
            imgDom.src = item;
            imgDom.style.cssText=`
                    position: absolute;
                    left: ${index==0?0:this.width}px;
                    top: 0;
                    width: 100%;
                    height: 100%;
            `;
            this.imgDoms.push(imgDom);//把所有的img对象，放在一个数组里
            this.imgBox.appendChild(imgDom); //把img标签放在div里。
        });
    }

    createDous() {
        // 1、创建分页器的容器
        this.douBox = document.createElement("ul");
        this.douBox.style.cssText = `
            list-style: none;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 20px;
            width: ${(this.imgs.length*2+1)*this.douWidth}px;
            height: ${this.douHeight*2}px;
            background-color: red;
            border-radius: ${this.douHeight}px;
            z-index: 999;
        `;
        this.boxDom.appendChild(this.douBox);

        // 2、创建每个按钮（豆豆）
        this.imgs.forEach((item,index)=>{
            let liDom = document.createElement("li");
            liDom.style.cssText = `
                float: left;                    
                margin-top: ${this.douHeight/2}px;
                margin-left:${this.douWidth}px;
                width: ${this.douWidth}px;
                height:${this.douHeight}px;
                background-color: ${index==0?this.highColor:this.color};
                border-radius: ${this.isCircle?50:0}%; 
            `;
            this.douDoms.push(liDom);
            this.douBox.appendChild(liDom);
        })
    } 

    createArrows() {
        // 左箭头
        this.leftArrow = document.createElement("span");
        this.leftArrow.innerHTML = "《";
        this.leftArrow.style.cssText = `
                position: absolute;
                top: ${(this.boxDom.offsetHeight-40)/2}px;
                display: block;
                width: 60px;
                height: 40px;
                font-size: 30px;
                color: red;
                left: 0px;
                `;
        this.leftArrow.style.display = "none";        
        this.boxDom.appendChild(this.leftArrow);
        // 右箭头
        this.rightArrow = document.createElement("span");
        this.rightArrow.innerHTML = "》";
        this.rightArrow.style.cssText = `
                position: absolute;
                top: ${(this.boxDom.offsetHeight-40)/2}px;
                display: block;
                width: 60px;
                height: 40px;
                font-size: 30px;
                color: red;
                right: 0px;
        `;
        this.rightArrow.style.display = "none";
        
        this.boxDom.appendChild(this.rightArrow);
    }

    // 自动播放
   // 1、自动播放
    autoPlay(){  
        this.myTimer = setInterval(()=>{        
            this.goImg(this.ord+1);       
        },this.timeLong)
    }

    // 2、点击豆豆切换对应的图片
    goImg(transOrd){ //ord+1 = 2
        if(transOrd==this.ord){
            return;
        }
        // 一、数据处理
        // 1、数据计算
        let outOrd = this.ord; //1
        this.ord = transOrd; //2

        // 2、边界处理
        if(this.ord<0){
            this.ord = this.imgs.length-1;
        }    
        if(this.ord>this.imgs.length-1){
            this.ord = 0;
        }   
        // 二、外观呈现
        // 1、图片滑入滑出
        //  让即将进入的图片的left为400；
        this.imgDoms[this.ord].style.left = this.width+"px";
        this.isMove = true;
        sliderH(this.imgDoms[outOrd],this.imgDoms[this.ord],-this.width,"left",this.timeLong/4,()=>{
            this.isMove = false;
        });            

        // 2、豆豆的变化
        this.douDoms[outOrd].style.backgroundColor = this.color;
        this.douDoms[this.ord].style.backgroundColor = this.highColor;    
    }

    // 3、鼠标移入停止
    stopPlay(){
        window.clearInterval(this.myTimer);
        this.leftArrow.style.display = "block";
        this.rightArrow.style.display = "block";
    }

    // 4、鼠标离开继续播放
    continuePlay(){
        this.autoPlay();
        this.leftArrow.style.display = "none";
        this.rightArrow.style.display = "none";
        
    }

    // 5、点击右箭头，跳转到下一张
    nextImg(){
        this.goImg(this.ord+1);    
    }

    // 6、点击左箭头，跳转到上一张
    previousImg(){
        this.goImg(this.ord-1);
    }

    addEvent(){
        // 点击豆豆跳转图片
        for(let i=0;i<this.douDoms.length;i++){
            this.douDoms[i].onclick = ()=>{
                this.stopPlay();
                this.goImg(i);
            }
        }
        // 3、鼠标进入停止播放
        this.boxDom.onmouseover = ()=>{
            this.stopPlay();
        }
        // 4、鼠标离开继续播放
        this.boxDom.onmouseout = ()=>{
            this.continuePlay();
        }

        // 5、点击右箭头
        this.rightArrow.onclick = ()=>{
            // 判断上一个过渡是否进行中；
            if(this.isMove){
                return;
            }
            console.log("下一个");
            this.nextImg();            
        }

        // 6、点击左箭头
        this.leftArrow.onclick = ()=>{                
            // 判断上一个过渡是否进行中；
            if(this.isMove){
                return;
            }
            console.log("上一个");
            this.previousImg();
        }

        // 处理失去焦点和获取焦点
        window.addEventListener("blur",()=>{
//          console.log("停止");
//          console.log(this);
            this.stopPlay();
        });
        
        window.addEventListener("focus",()=>{
            console.log("继续");
            console.log(this);
            this.continuePlay();
        });
    }
}

//时间
var box=document.getElementById("time");
 box.innerHTML= change(new Date);
 setInterval(function(){
	  box.innerHTML= change(new Date);
	 },1000)
	 
	 function change(d){
	  var y=d.getFullYear();
	  var m=d.getMonth()+1;
	  var r=d.getDate();
	  var w=d.getDay();
	  var h=d.getHours();
	  var mm=d.getMinutes();
	  var s=d.getSeconds();
	  
	  switch(w){
	   case 0:
	    w="星期日";break;
	   case 1:
	    w="星期一";break;
	   case 2:
	    w="星期二";break;
	   case 3:
	    w="星期三";break;
	   case 4:
	    w="星期四";break;
	   case 5:
	    w="星期五" ;break;
	   case 6:
	    w="星期六";break;
	  }
	  var str=y+"年"+createzero(m)+"月"+r+"日 "+ w+" "+createzero(h)+":"+createzero(mm)+":"+createzero(s)+"";
	  return str;
	 }
	 function createzero(n){
	  return n>=10?""+ n:"0"+n;
	 }
	 createzero();




//欢迎语
$(function(){
		showwelcomeOrLogin();
		$("#btnLogout").click(function(){
			removeCookie("username");
			showwelcomeOrLogin();
		})
	})
	function showwelcomeOrLogin(){
		 let username = getCookie("username");
	    if (username == null) {
	        $("#login-box").css("display", "block");
	        $("#welcome-box").css("display", "none");
	    }
	    else {
	        $("#welcome-box").css("display", "block");
	        $("#login-box").css("display", "none");
	        $("#userSpan").html(username);
	    }

	}
	

//萤火虫
class Glowworm{
	    constructor(){
	    	var k = document.getElementById("xinpin");
	        // 获取屏幕的可视区域的宽高，用作将来的随机范围
	        this.clientW = k.offsetWidth;
	        this.clientH = k.offsetHeight;
	        // 假设萤火虫的宽高
	        this.w = 20;
	        this.h = 20;
	    }
	    createEle(){
	        var div = document.createElement("div");
	        div.className = "box1";
	        document.getElementById("xinpin").appendChild(div);
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
	
	
	for(var i=0;i<50;i++){
	    // 先得到实例
	    var g = new Glowworm();
	    // 生成随机坐标
	    g.randomPos();
	    // 再创建元素
	    g.createEle();
	}
	
	
	
	function move(ele,obj,cb){		//参数2被修改成对象，使用之前需要解析（遍历）
		clearInterval(ele.t);
		ele.t = setInterval(() =>{
			var i = true;
			for(var attr in obj){
				if(attr == "opacity"){
					var iNow = getStyle(ele,attr) * 100;
				}else{
					var iNow = parseInt(getStyle(ele,attr));
				}
				let speed = (obj[attr] - iNow)/10;
				speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);
				if(iNow !== obj[attr]){
					i = false;
				}
				if(attr == "opacity"){
					ele.style.opacity = (iNow + speed)/100;
				}else{
					ele.style[attr] = iNow + speed + "px";
				}
			}
			if(i){
				clearInterval(ele.t);
				if(cb){
					cb();
				}
			}
		},100);
	}
	
	function getStyle(ele,attr){
    if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return getComputedStyle(ele,false)[attr];
    }
}
	
	
	function random(a,b){
	    return Math.round(Math.random()*(a-b)+b);
	}



	window.onload = function(){
//		产生验证码
		showCode();
//		点击span重新产生验证码
		$("#codeSpan").onclick = function(){
			showCode();
			$("#codeSpan").innerHTML = code;			
//			把验证码发到后端
			sendCode(code);
		}
//		登录
		$("#btn").onclick = function(){
			if($("#code").value != $("#codeSpan").innerHTML){
				alert("验证码不正确");
				showCode();
				return;
			}
			login();
		}
	}
	
	
	function showCode(){
		$("#codeSpan").innerHTML = getCode(5);
	}
	function getCode(n){
		let str = "";
		for(let i=0;i<n;i++){
			str += parseInt(Math.random()*10);
		}
		return str;
	}
	function sendCode(code){
		ajax({
			url:"code.php",
			params:"code="+$("#codeSpan").innerHTML
		});
	}
	function login(){
		ajax({
			method:"post",
			url:"signCheck.php",
			params:`username=${$("#user").value}&userpass=${$("#pass").value}`,
			cb:function(result){
				if(result=="1"){
					addCookie("username",$("#user").value,7);
					let count = 3;
					$("#message-box").innerHTML = `登陆成功,${count}秒后,跳转到<a href="index.html">首页</a>`;
					let myTimer = setInterval(()=>{
						count--;
						if(count == 0){
							window.clearInterval(myTimer);
							window.location.href = "index.html;"
							return;
						}
						$("#message-box").innerHTML = "登陆成功,${count}秒后,跳转到<a href='index.html'>首页</a>";
					},1000);
				}else{
					$("#message-box").innerHTML = "登陆失败,用户名或密码不正确";
					showCode();
				}
			}
		});
	}
	
//萤火虫
function $(str){
		if(str.charAt(0) == "."){
			return document.getElementsByClassName(str.substring(1));
		}else if(str.charAt(0) == "#"){
			return document.getElementById(str.substring(1));
		}else{
			return document.getElementsByTagName(str);
		}
	}


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
	},30);
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

//带有px的css属性和透明度,可以运动
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
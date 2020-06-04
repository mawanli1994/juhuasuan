let isCheck = {
		user:false,
		pass:false,
		pass2:false
	}
	let hasUser = true;
	window.onload = function(){
//		用户名验证
		$("#user").onblur = function(){
//			前段的格式验证
			if(checkUserFront()){
//				后端是否存在验证
				checkUserBack();
			}
		}
		
//		密码验证
		$("#pass").onblur = function(){
			checkPass();
		}
		$("#pass").onchange = function(){
			$("#pass2").value = "";
			$("#pass2").nextElementSibling.innerHTML = "";
		}
//		确认密码验证
		$("#pass2").onblur = function(){
			checkPass2();
		}
//		注册
		$("#btn").onclick = function(){
			let trueCount = 0;
			for(let key in isCheck){
				if(isCheck[key]){trueCount++;}
			}
			if(trueCount == 3){
				if(!hasUser){
					regSave();
					return;
				}
			}
			alert("请检查信息是否正确或输入完整");			
		}
	}	
	function checkUserFront(){
		let userDom = $("#user");
		let reg = /^\w{6,12}$/;
		if(reg.test(userDom.value)){
			isCheck.user = true;
			return true;
		}else{
			userDom.nextElementSibling.innerHTML = "用户名规则：长度在6-12位；由数字，字母下划线";
			isCheck.user = false;
			return false;
		}
	}
	function checkUserBack(){
		ajax({
			url:"checkUser.php",
			params:"username=" + $("#user").value,
			isAsync:false,
			cb:(result)=>{
//				console.log(result);
				if(result == "1"){
					$("#user").nextElementSibling.style.color = "red";
					$("#user").nextElementSibling.innerHTML = "该用户名存在";
					hasUser = true;
				}else{
					$("#user").nextElementSibling.style.color = "green";
					$("#user").nextElementSibling.innerHTML = "用户名正确";
					hasUser = false;
				}
			}
		});
	}
	function checkPass(){
		let passDom = $("#pass");
		let passSpan = $("#pass-box").children;
		for(let i=0;i<passSpan.length;i++){
			passSpan[i].style.backgroundColor = "white";
		}
		let reg = /^\w{6,18}$/;
		if(reg.test(passDom.value)){
			passDom.nextElementSibling.innerHTML = "密码正确";
			isCheck.pass = true;
//			1、统计字符类型的个数
			let regLetter = /[a-zA-Z]/;
			let regNum = /[0-9]/;
			let regLine = /[_]/;
			count = 0;
			if(regLetter.test(passDom.value)){
				count++;
			}
			if(regNum.test(passDom.value)){
				count++;
			}
			if(regLine.test(passDom.value)){
				count++;
			}
			switch(count){
//				强
				case 3:passSpan[2].style.backgroundColor = "green";
//				中
				case 2:passSpan[1].style.backgroundColor = "yellow";
//				弱
				case 1:passSpan[0].style.backgroundColor = "red";
			}
		}else{
			isCheck.pass = false;
			passDom.nextElementSibling.innerHTML = "密码不正确";			
		}
	}
	function checkPass2(){
		let pass2Dom = $("#pass2");
		if(pass2Dom.value === $("#pass").value){
			isCheck.pass2 = true;
			pass2Dom.nextElementSibling.innerHTML = "重复密码正确";
		}else{
			isCheck.pass2 = false;
			pass2Dom.nextElementSibling.innerHTML = "重复密码不正确,请输入正确密码";
		}
	}
	function regSave(){
		let sexDoms = document.getElementsByName("sex");
		let sex = "女";
		if(sexDoms[1].checked){
			sex = "男";
		}
		let str = `username=${$("#user").value}&userpass=${$("#pass").value}&usersex=${sex}`;
		ajax({
			method:"post",
			url:"regSave.php",
			params:str,
			cb:(result)=>{
				if(result == "1"){
					$("#message-box").innerHTML = "注册成功，请<a href='Sign.html'>登录</a>";
				}else{
					$("#message-box").innerHTML = "注册失败";
				}
			}
		})
	}
	




function $(str){
		if(str.charAt(0) == "."){
			return document.getElementsByClassName(str.substring(1));
		}else if(str.charAt(0) == "#"){
			return document.getElementById(str.substring(1));
		}else{
			return document.getElementsByTagName(str);
		}
	}


function ajax(obj){
	let defObj = {
		method:"get",
		url:"#",	
		isAsync:true,
		params:"",
		cb:null
	}
	for(let key in obj){
		defObj[key] = obj[key];
	}
	let xhr = new XMLHttpRequest();
	let urlAndParams = defObj.url;
	if(defObj.method.toLowerCase() == "get"){
		urlAndParams += "?" + defObj.params;
	}
	xhr.open(defObj.method,urlAndParams,defObj.isAsync);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			defObj.cb && defObj.cb(xhr.responseText);
		}
	}
	if(defObj.method.toLowerCase() == "post"){
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(defObj.params);
	}else{
		xhr.send();
	}
}

var data=[];
	//验证是否为空和是否为数字
	var pattern=/^[0-9]*$/;  
	function validateNum(num){
		if(document.getElementById("num").value==""){
			alert("输入不能为空~");
			return false;
		}
		else if (!pattern.test(num)) {
			alert("输入内容必须是数字！~");
			return false;
		}else{
			return true;
		}
	}
	//验证内容中是否有数字
	function hasNum(){
		if(document.getElementById("content").innerHTML==""){
			alert("没有可以弹出的数字~");
			return false;
		}else{
			return true;
		}
	}
	//四种按钮的处理函数
	function dealNum(id){
		var num=document.getElementById("num").value;
		switch(id){
			case "leftIn":
			if(!validateNum(num)){
				return;
			}else{
				data.unshift(num);
			}
			break;

			case "leftOut":
			if(!hasNum()){
				return;
			}
			else{
				data.shift();
			}
			break;

			case "rightIn":
			if(!validateNum(num)){
				return;
			}else{
				data.push(num);
			}
			break;

			case "rightOut":
			if(!hasNum()){
				return;
			}
			else{
				data.pop();
			}
			break;
		}
	}

	//渲染队列数字内容
	function showNum(){
		var len=data.length;
		var body="";
		//console.log(data);
		for(var i=0;i<len;i++){
			body+="<li>"+data[i]+"</li>";
		}
		document.getElementById("content").innerHTML=body;
	}

	//按钮事件代理
	document.getElementById("options").addEventListener("click",function(e){
		e=e||window.event;
		if(e.target.nodeName.toLowerCase()==="button"){
			var id=e.target.id;
			dealNum(id);
			showNum();
		}
	});

	//删除队列数字内容
	document.getElementById("content").addEventListener("click",function(e){
		e=e||window.event;
		if(e.target.nodeName.toLowerCase()==="li"){
			document.getElementById("content").removeChild(e.target);
			data.pop(Number(e.target.innerHTML));
			
		}
	});


	//输入数据左右去字符串
	String.prototype.trim=function(){
		return this.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
	}
	//验证是否为空和是否为数字
	var pattern=/^[0-9]*$/;  
	function validateNum(num){
		if(num==""){
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
	function dealNum(id,arr){
		var num=document.getElementById("num").value.trim();
		switch(id){
			case "leftIn":
			if(!validateNum(num)){
				return;
			}else{
				arr.unshift(num);
			}
			break;

			case "rightIn":
			if(!validateNum(num)){
				return;
			}else{
				arr.push(num);
			}
			break;

		}
	}

	//渲染队列数字内容
	function showNum(arr){
		var body="";
		//console.log(data);
		for(var i=0;i<arr.length;i++){
			body+="<li>"+arr[i]+"</li>";
		}
		document.getElementById("content").innerHTML=body;
	}
	//渲染柱状图中的内容
	function renderBubble(arr){
		var body="";
		for(var i=0;i<arr.length;i++){
			body+="<li class='flex-item' style='height:"+arr[i]+"px;'></li>";
		}
		document.getElementById("bubble").innerHTML=body;
	}

	//输入框获取焦点的时候对输入框中的内容进行全选
	document.getElementById("num").addEventListener("focus",function(){
		document.getElementById("num").select();
	});

	//全局变量
	var data=[];
	var snapshots=[]; //快照对象，用于保存刚进行交换后的数组快照
	var count=0;
	var timer=null;

	//按钮事件代理
	document.getElementById("options").addEventListener("click",function(e){
		e=e||window.event;
		if(e.target.nodeName.toLowerCase()==="button"){
			dealNum(e.target.id,data);
			showNum(data);
			renderBubble(data);
		}
	});

	//给冒泡排序的按钮绑定点击事件
	document.getElementById("bubbleSort").addEventListener("click",function(){
		var temp;
		var k=0;
		var count=0;
		//冒泡排序并使用snapshots数组保存交换后的数组集合
		for(var i=0;i<data.length-1;i++){
			for(var j=0;j<data.length-1-i;j++){
				if(Number(data[j])>Number(data[j+1])){
					temp=data[j];
					data[j]=data[j+1];
					data[j+1]=temp;
					//使用快照数组来保存冒泡交换之后的快照数组集合
					snapshots[k]=data.slice(0,data.length);
					k++;
				}
			}
		}
		
		//设置定时器，对排序过程进行可视化演示
		var timer=setInterval(function(){
			var arr=[];
			arr=snapshots[count].concat();
			showNum(data);
			renderBubble(arr);
			
			if(count==snapshots.length-1){
				clearInterval(timer);
			}
			count++;
		},1000);
		

	});


	








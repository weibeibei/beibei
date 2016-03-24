var aqiData={},city,air;

//利用原型添加trim方法
String.prototype.trim=function(){
	return this.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
}


//从用户输入中获取数据，向aqiData中增加一条数据
//然后渲染aqi-list列表，增加新增的数据
function addAqiData() {
	city=document.getElementById("city").value.trim();
	air=document.getElementById("air").value.trim();
	//对城市名称的输入进行校验
	if(city==""){
		alert("城市不能为空~");
	}else{
		var patt1=/^[\u4e00-\u9fa5a-zA-Z]+$/;
		if(!patt1.test(city)){
			alert("城市名称必须为中英文字符~");
		}
	}
	//对空气质量指数的输入进行校验
	if(air==""){
		alert("空气质量指数不能为空~");
	}else{
		var patt2=/^\d+$/;
		if(!patt2.test(air)){
			alert("空气质量指数必须为整数~");
		}
	}
	//将新填写的数据添加到数据列表中
	aqiData[city]=air;
	
}


//渲染aqi-table表格

function renderAqiList() {
	var content="",tbody="";
	for(var city in aqiData){
		content+="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button type='button' class='del'>删除</button></td></tr>";
	}
	tbody="<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>"+content;
	document.getElementById("cityAir").innerHTML=tbody;

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function add() {
  addAqiData();

  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {

  delete aqiData[city]; 
  renderAqiList();
}

function init() {
  // 给添加按钮绑定一个点击事件，点击时触发add函数；
  document.getElementById("add").addEventListener("click",add);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.getElementById("cityAir").addEventListener("click",function(e){
  	if(e.target.className.indexOf('del') > -1){
  		var vCity=e.target.parentNode.previousSibling.previousSibling.firstChild.nodeValue;
  		delBtnHandle(vCity);
  	}

  });
}

window.onload=function(){
	init();
}

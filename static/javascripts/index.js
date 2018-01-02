var main=document.getElementById('main');
var add=document.getElementById('add');
var addInput=document.getElementById('addInput');
var addBtn=document.getElementById('addBtn');
var sendInput=document.getElementById('sendInput');
var sendBtn=document.getElementById('sendBtn');
var messageAddr=[];
var nickname='';
// 实例化
var websocket=new WebSocket('ws://echo.websocket.org/');

// 加入聊天室
addBtn.onclick=function(){
  console.log('addInput ->: ',addInput.value);
  var sysObj={
    name:'系统通知',
    content:'亲，请输入您的昵称'
  }

  if(addInput.value==''){
    // 将消息加入数组
    messageAddr.length=0;
    messageAddr.push(jointStr(sysObj));
    jointArr(main,messageAddr);
    return;
  }

  nickname=addInput.value;
  sysObj.content='欢迎'+nickname+'加入到聊天室';

  wsServer(sysObj);

}

// 发送消息
sendBtn.onclick=function(){
  console.log(sendInput.value);
  if(sendInput.value==''){
    console.log("没有消息")
    return;
  }
  // 组装消息
  var obj={
    name:nickname,
    content:sendInput.value
  }
  var addStr=jointStr(obj);
  messageAddr.push(addStr);

  // 将消息加入数组
  jointArr(main,messageAddr);

  // 发送数据
  websocket.send(JSON.stringify(obj))

  sendInput.value='';
}



// 创建ws服务
function wsServer(sysObj){
  console.log('wsServer --> ');

  //打开一个ws连接
  websocket.onopen=function(){
    console.log('wsServer -> open -> connect');
    // 将消息加入数组
    messageAddr.push(jointStr(sysObj));
    jointArr(main,messageAddr);
    // 隐藏添加
    add.style.display='none';
  }


  console.log('wsServer --> ');


  // 关闭ws连接
  websocket.onclose=function(){
    console.log('wsServer -> open -> close');
  }

  websocket.onmessage=function(e){
    console.log('wsServer -> open -> 接收的数据: ',e);
  }
}

// 消息拼接
function jointArr(div,arr){
  var htmlStr=''
  for(var i=0;i<arr.length;i++){
    htmlStr=htmlStr+arr[i];
  }
  div.innerHTML=htmlStr;
  // 滚动到底部
  div.scrollTop=div.scrollHeight;
}

// 单条消息拼接
function jointStr(obj){
  var fastChar=(obj.name).substring(0,1);
  console.log('jointStr -> ',fastChar)
  var jStr = '<div class="list">'
    +   '<div class="usr_head">'
    +    fastChar
    +   '</div>'
    +   '<div class="usr_name">'
    +     obj.name
    +   '</div>'
    +   '<div class="trigon"></div>'
    +   '<div class="txt_main">'
    +     obj.content
    +   '</div>'
    + '</div>'
  return jStr;
}

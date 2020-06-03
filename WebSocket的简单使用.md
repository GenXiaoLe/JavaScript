### websocket的概念
- HTML5开始提供的一种浏览器与服务器进行全双工通讯的网络技术，属于应用层协议。它基于TCP传输协议，并复用HTTP的握手通道。

### websocket的作用
- 较少的控制开销。连接创建后，ws客户端、服务端进行数据交换时，协议控制的数据包头部较小。在不包含头部的情况下，服务端到客户端的包头只有2~10字节（取决于数据包长度），客户端到服务端的的话，需要加上额外的4字节的掩码。而HTTP协议每次通信都需要携带完整的头部。

### websocket的用法
> websocket的事件一般有四个事件: open(连接建立时触发), message(客户端接收服务端数据时触发), error(通信发生错误时触发), close(连接关闭时触发)；以及两个方法: Socket.send() 发送数据使用， Socket.close() 关闭连接。

- 举个例子
```js
// 界面的js


  let user = {
    id: 1,
    name: 'wang1'
  };

  $(window).on('newSocket', function(event) {

     console.log('有新人连接socket');

  })

  $(window).on('sendTalk', function(event, data) {

    if (data.to.id === user.id) {
  
      alert(`${data.form.name}对你说${data.form.talk}`);
  
    }

  })

```

```js

// ws

  let ws;

  if ("WebSocket" in window) {
  
    function createWS() {
    
      ws = new WebSocket("ws://xxx");
      
      init();
    
    }
  
    function init() {
      
      ws.onopen = function() {
        
        // 重置心跳包
        heartModel.start();

        let data = { uuid: 'xxx', token: 'xxx' }

        ws.send(data);

        $(window).on('newSocket');

      }

      ws.ononmessage = function(event) {
      
        // 重置心跳包
        heartModel.start();

        let data = event.data;

        // data = {
        //   form: {
        //    id: 2,
        //    name: 'wang2',
        //    talk: 'hello'
        //   },
        //   to: {
        //    id: 1,
        //    name: 'wang1'
        //   }
        // }

        $(window).tirgger('sendTalk', data);

      }

      ws.onerror = function() {

        console.log('连接发生了错误');
        resetConnect();

      }

      ws.oncolse = function() {

         console.log('ws连接已关闭');
         resetConnect();

      }
    
    }
    
    let lockRestart = false;
    let resetTimeout;
    
    function resetConnect = function() {
    
      // 阻止反复重连
      if (lockRestart) return;
      
      lockRestart = true;
      resetTimeout && clearTimeout(resetTimeout);
      
      resetTimeout = setTimeout(function() {
      
        createWS();
        lockRestart = false;
      
      }, 5000)
    
    }
    
    
    // 设置心跳包 前端断开重连
    
    let heartModel = {
      time: 5000,
      timeOut: null,
      severOut: null,
      start: function() {
      
        let _self = this;
        
        timeOut && clearTimeout(timeOut);
        severOut && clearTimeout(severOut);
        
        timeOut = setTimeout(function() {
        
          // 给后台发送一个消息, 后台返回心跳信息后, 重置心跳包
          ws.send('online');
          
          // 如果后台无返回, 可能连接失败, 结束掉当前ws进程, 重新连接
          severOut = setTimeout(function() {
          
            console.log('关闭');
            ws.close();
          
          }, _self.time);
        
        }, this.time);
      
      }
    }
  
  }

```

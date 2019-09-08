export default class WebSocketPack {
  /**
   * @description: 初始化实例属性，保存参数
   * @param {String} url ws的接口
   * @param {Function} msgCallback 服务器信息的回调传数据给函数
   * @param {String} name 可选值 用于区分ws，用于debugger
   */
  constructor(url, callback, name = 'default') {
    this.url = url;
    this.callback = callback;
    this.name = name;
    this.ws = null; // websocket对象
    this.status = null; // websocket是否关闭
  }
  /**
   * @description: 初始化 连接websocket或重连webSocket时调用
   * @param {*} 可选值 要传的数据
   */
  connect(data) {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = e => {
      this.status = 'open';
      console.log(`${this.name}连接成功`, e)

      // 心跳检测
      this.heartCheck();

      if (data !== undefined) {
        return this.ws.send(data);
      }
    }

    // 监听服务器端返回的信息
    this.ws.onmessage = e => {
      return this.callback(e.data);
    }

    // ws关闭回调
    this.ws.onclose = e => {
      this.close(e); // 判断是否关闭
    }

    // ws出错回调
    this.onerror = e => {
      this.close(e); // 判断是否关闭
    }
  }

  // 心跳检测
  heartCheck() {
    setInterval(() => {
      this.ws.readyState !== 1 && this.connect()
    }, 10000)
  }

  // 发送信息给服务器
  send(data) {
    console.log(`${this.name}发送消息给服务器:`, data)
    return this.ws.send(data);
  }

  // 关闭连接
  close() {
    // 非手动关闭则重连
    if (this.status !== 'close') {
      this.connect();
    }
  }

  // 手动关闭WebSocket
  closeManual() {
    this.status = 'close';
    return this.ws.close();
  }
}

// function someFn(data) {
//   console.log('接收服务器消息的回调：', data);
// }
// // const wsValue = new WebSocketClass('ws://121.40.165.18:8800', someFn, 'wsName'); // 这个链接一天只能发送消息50次
// const wsValue = new WebSocketClass('wss://echo.websocket.org', someFn, 'wsName'); // 阮一峰老师教程链接
// wsValue.connect('立即与服务器通信'); // 连接服务器

/**
 * @created : 2023/7/14
 * @author : by zyy
 * @desc : webscoket
 */
var WebSocketUrl = 'ws://localhost:3000/' //连接后台服务
var WebSocketObj = null

//创建websocket
/**
 * 创建websocket
 * @param {String} url websocket地址
 */
function createWebSocket() {
    // if (!url) {
    //     url = 'ws://'
    // }
    //判断当前浏览器是否支持WebSocket，是则创建WebSocket
    if ('WebSocket' in window) {
        //浏览器支持，创建
        if (!WebSocketObj) {
            WebSocketObj = new WebSocket(WebSocketUrl)
            console.log('创建成功=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', WebSocketObj);
        } else {
            console.log('WebSocketObj已经存在', WebSocketObj.readyState)
        }
    } else {
        //浏览器不支持
        console.log('当前浏览器 Not support websocket')
    }

    //连接成功建立的回调方法
    WebSocketObj.onopen = () => {
        console.log('websocket连接成功')
            // 这里用一个延时器模拟事件
            // setInterval(function() {
            //     WebSocketObj.send('客户端发送消息数据到服务器');
            // }, 2000);
    }

    //连接发生错误的回调方法
    WebSocketObj.onerror = (e) => {
        console.log('websocket连接异常', e)
    }

    //接收到消息的回调方法
    WebSocketObj.onmessage = (e) => {
        try {
            //接收到消息，将消息显示到网页上
            // var msgHandle = handler(event)
            // console.log(msgHandle)
            // showHtml(msgHandle)

            var message = JSON.parse(e.data)
            console.log(message)
            if (message) {
                showHtml(message)
            }

        } catch (error) {
            console.log('收到无法解析的数据', event)
        }
    }

    //断开连接成功的回调方法
    WebSocketObj.onclose = () => {
        console.log("WebSocket连接关闭")
    }
}

//关闭WebSocket连接
function closeWebSocket() {
    WebSocketObj.close()
    WebSocketObj = null
}

//发送指令
/* 
    @param {*} agentData
*/
function sendSock(agentData) {
    //ws若是开启状态
    if (WebSocketObj && WebSocketObj.readyState === WebSocketObj.OPEN) {
        //发送指令
        WebSocketObj.send(JSON.stringify(agentData))
    } else {
        console.log('websocket未创建')
    }
}


//将接收到的服务器的消息显示到网页上
function showHtml(message) {
    document.getElementById('message').innerHTML = message
}

//如果websocket连接还没断开就关闭了窗口，后台server端会抛异常。
//所以增加监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接
window.onbeforeunload = function() {
    closeWebSocket()
}
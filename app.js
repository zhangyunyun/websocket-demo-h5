const ws = require('nodejs-websocket') //引入所需的websocket模块
const PORT = 3000 //设置服务器端口号
    //创建服务器实例并设置连接事件处理函数
const server = ws.createServer(connect => {
    console.log('有用户连接上来了')
    connect.on('text', data => {
        console.log('接收到了用户的数据', data)
        connect.send(data.toUpperCase())
    })
    connect.on('close', () => {
        console.log('连接断开了');
    })
    connect.on('error', () => {
        console.log('用户连接异常')
    })
})

//启动服务器，开始监听指定端口
server.listen(PORT, () => {
    console.log('web服务器启动成功了，监听了端口' + PORT)
})
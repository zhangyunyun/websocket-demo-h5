deviceAuthRspHandle(message)

function handler(e) {
    const msg = JSON.parse(e.data)
        // const msgType = msg.msgType
        // const message = msg.message ? JSON.parse(msg.message) | null
    const msgType = "DeviceAuthRsp"
    const message = "哈哈哈，测试websocket"

    switch (msgType) {
        // server 登陆结果 ok
        case 'DeviceAuthRsp':
            deviceAuthRspHandle(message)
            break
            // server 微信登陆结果通知 弃用
        case 'WeChatLoginNoticeResp':
            console.log('WeChatLoginNoticeResp', message)
            break
            // 账号强制下线通知
        case 'AccountForceOfflineNotice':
            console.log('AccountForceOfflineNotice', message)
            break
            // 微信登陆通知
        case 'WeChatLoginNotice':
            console.log('WeChatLoginNotice', message)
            break
            // 微信下线通知 ok
        case 'WeChatOfflineNotice':
            weChatOfflineNoticeHandle(message)
            break
            // 微信上线通知 ok
        case 'WeChatOnlineNotice':
            weChatOnlineNoticeHandle(message)
            break
        default:
            break
    }
}
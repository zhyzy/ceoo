const express = require('express');
const crypto = require('crypto');
const app = express();

const token = '4XFW54KYMWFENJkWF6XZXWF7y8KKzJV';

app.get('/oauth/mpweixin/callback', (req, res) => {
    const { signature, timestamp, nonce, echostr } = req.query;

    // 验证签名
    const array = [token, timestamp, nonce].sort();
    const str = array.join('');
    const sha1 = crypto.createHash('sha1');
    const result = sha1.update(str).digest('hex');

    if (result === signature) {
        res.send(echostr);
    } else {
        res.status(403).send('验证失败');
    }
});

app.post('/oauth/mpweixin/callback', (req, res) => {
    // 处理微信的消息
    res.send('success');
});

app.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});
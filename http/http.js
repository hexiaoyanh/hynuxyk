var CryptoJS = require('./crypto-js/crypto-js.js')
var xml = require('./xml/dom-parser.js')
var xmlParser = new xml.DOMParser();

class http {
    url = "http://106.15.249.85/";
    UserNumber = "";
    Password = "";
    Time = "";
    Sign = "";
    Msg = "";
    AccNum = "";
    AccName = "";
    PerCode = "";
    CarID = "";
    CustomerID = "";
    AgentID = "";
    LostDate = "";
    IsDefault = "";
    MonDBCurr = "";
    IsOpen = "";
    RandomNum = "";
    OrderNum = "";
    QRcode = "";
    BankName = "";
    BankCard = "";

    setTime() {
        //当前时间化成yyyymmddhhmmss
        var d = new Date();
        var time = d.getFullYear().toString();

        if (d.getMonth() < 9) time = time + "0" + (d.getMonth() + 1).toString();
        else time += (d.getMonth() + 1).toString();

        if (d.getDate() < 10) time = time + "0" + d.getDate().toString();
        else time += d.getDate().toString();

        if (d.getHours() < 10) time = time + "0" + d.getHours().toString();
        else time += d.getHours().toString();

        if (d.getMinutes() < 10) time = time + "0" + d.getMinutes().toString();
        else time += d.getMinutes().toString();

        if (d.getSeconds() < 10) time = time + "0" + d.getSeconds().toString();
        else time += d.getSeconds().toString();

        this.Time = time;

    }
    //签名生成
    setSign(str1, str2) {
        //设置签名
        var key = "ok15we1@oid8x5afd@";
        var str3 = new Array(str1.length);
        for (var i = 0; i < str1.length; ++i) {
            str3[i] = str1[i];
        }
        str3.sort();
        var sign = "";
        for (var i = 0; i < str3.length; ++i) {
            var i2 = 0;
            while (true) {
                if (i2 >= str3.length) break;
                else if (str3[i] == str1[i2]) {
                    sign += str2[i2];
                    sign += "|";
                    break;
                } else {
                    i2++;
                }
            }
        }
        sign += key;
        //MD5 32位加密
        var md5 = CryptoJS.MD5(sign).toString();
        this.Sign = md5;
    }
    //设置用户名
    setUsername(str) {
        //设置用户名
        this.UserNumber = str;
    }
    //密码加密
    setPassword(str) {
        //设置密码
        var key = "12347890";
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var ivHex = CryptoJS.enc.Utf8.parse(key);
        var encrypted = CryptoJS.DES.encrypt(str, keyHex, {
            iv: ivHex,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
        this.Password = encrypted;
    }
    //支付密码加密
    OtherPassword(str) {
        //设置密码
        var key = "12347890";
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var ivHex = CryptoJS.enc.Utf8.parse(key);
        var encrypted = CryptoJS.DES.encrypt(str, keyHex, {
            iv: ivHex,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
        return encrypted;
    }
    //登录
    Login() {
        var a = ['Time', 'UserNumber', 'Password'];
        this.setTime();
        var b = [this.Time, this.UserNumber, this.Password];
        this.setSign(a, b);
        var that = this;

        wx.request({
            url: that.url,
            data: {
                "Time": that.Time,
                "Sign": that.Sign,
                "UserNumber": that.UserNumber,
                "Password": that.Password
            },
            success(res) {
                var doc = xmlParser.parseFromString(res.data);
                var code = doc.getElementsByTagName('Code')['0'].firstChild.data.toString();
                if (code == "1") {
                    that.Msg = doc.getElementsByTagName('Msg')['0'].firstChild.data.toString();
                    that.AccNum = doc.getElementsByTagName('AccNum')['0'].firstChild.data.toString();
                    that.AccName = doc.getElementsByTagName('AccName')['0'].firstChild.data.toString();
                    that.PerCode = doc.getElementsByTagName('PerCode')['0'].firstChild.data.toString();
                    that.CarID = doc.getElementsByTagName('CardID')['0'].firstChild.data.toString();
                    that.CustomerID = doc.getElementsByTagName('CustomerID')['0'].firstChild.data.toString();
                    that.AgentID = doc.getElementsByTagName('AgentID')['0'].firstChild.data.toString();
                    that.LostDate = doc.getElementsByTagName('LostDate')['0'].firstChild.data.toString();
                    that.IsDefault = doc.getElementsByTagName('IsDefault')['0'].firstChild.data.toString();

                } else {
                    that.Msg = doc.getElementsByTagName('Msg')['0'].firstChild.data.toString();
                }

            },
            fail(error) {
                that.Msg = "NetError";
            }
        })
        that.QueryAccWallent();
    }
    //查询钱包信息
    QueryAccWallent() {
        //接口:AccNum
        var that = this;
        var a = ['Time', 'AccNum']
        this.setTime();
        var b = [that.Time, that.AccNum]
        this.setSign(a, b);
        var url = that.url + "QueryAccWallet.aspx"
        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum
                },
                success(res) {
                    var doc = xmlParser.parseFromString(res.data);
                    var code = doc.getElementsByTagName('Code')['0'].firstChild.data.toString();
                    if (code == "1") {
                        that.MonDBCurr = doc.getElementsByTagName('MonDBCurr')['0'].firstChild.data.toString();
                        that.IsOpen = doc.getElementsByTagName('IsOpen')['0'].firstChild.data.toString();
                    }
                    resolve();
                },
                fail(error) {
                    reject()
                    console.error("QueryAccWallent" + error);
                }
            })
        })
    }
    //查询用户信息
    QueryAccInfo() {
        //接口:AccNum
        var that = this;
        var a = ['Time', 'AccNum']
        this.setTime();
        var b = [that.Time, that.AccNum]
        this.setSign(a, b);
        console.log(this)
        var url = that.url + "QueryAccInfo.aspx"
        return new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum
                },
                success(res) {
                    var doc = xmlParser.parseFromString(res.data);
                    that.BankCard = doc.getElementsByTagName('BankCard')['0'].firstChild.data.toString();
                    that.BankName = doc.getElementsByTagName('BankName')['0'].firstChild.data.toString();
                    resolve();
                },
                fail(error) {
                    reject()
                    console.error("QueryAccInfo" + error);
                }
            })
        })
    }
    //请求RandomNum
    getRandomNum() {
        var that = this;
        var a = ['Time', 'AccNum']
        this.setTime();
        var b = [that.Time, that.AccNum]
        this.setSign(a, b);
        var url = that.url + "GetRandomNum.aspx"
        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum
                },
                success(res) {
                    resolve(res)
                    var doc = xmlParser.parseFromString(res.data);
                    var RandomNum = doc.getElementsByTagName('RandomNum')['0'].firstChild.data.toString();
                    that.RandomNum = RandomNum;
                    resolve();
                },
                fail(error) {
                    reject(error)
                    console.error("getRandomNum" + error);
                }
            })
        })
    }//请求OrderNum
    getOrderNum() {
        var that = this;
        var a = ['Time', 'AccNum']
        this.setTime();
        var b = [that.Time, that.AccNum]
        this.setSign(a, b);
        var url = that.url + "GetOrderNum.aspx"
        return new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum
                },
                success(res) {
                    resolve(res)
                    var doc = xmlParser.parseFromString(res.data);
                    var OrderNum = doc.getElementsByTagName('OrderNum')['0'].firstChild.data.toString();
                    that.OrderNum = OrderNum;
                    resolve();
                },
                fail(error) {
                    reject(error)
                    console.error("OrderNum" + error);
                }
            })
        })
    }
    //虚拟校园卡
    getQRcode(){
        var that = this;
        var url = that.url+"proxy/qr"
        return new Promise(function (resolve, reject){
            wx.request({
                url: url,
                method:"POST",
                data:{
                    "randomNum": that.RandomNum,
                    "perCode": that.PerCode,
                    "orderNumb": that.OrderNum,
                    "customerID": that.CustomerID,
                    "cardID": that.CarID,
                    "agentID": that.AgentID,
                    "accNum": that.AccNum,
                    "accName": that.AccName
                },
                success(res){
                    resolve(res)
                },
                error(error){
                    console.log("getQRcode"+error)
                }
            })
        })
    }
    //充值
    Recharge(money,password){
        var that = this;
        var a = ['Time', 'AccNum', 'MonTrans','Password']
        this.setTime();
        var b = [that.Time, that.AccNum, money, that.OtherPassword(password)]
        this.setSign(a, b);
        var url = that.url + "BankTransfer.aspx"
        return new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum,
                    "MonTrans":money,
                    "Password": that.OtherPassword(password)
                },
                success(res) {
                    resolve(res);
                },
                fail(error) {
                    reject(error)
                    console.error("BankTransfer" + error);
                }
            })
        })
    }
    //扫描二维码
    ScanQR(str){
        var that = this;
        var url = that.url + "proxy/scan"
        return new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                method: "POST",
                data: {
                    "agentID": that.AgentID,
                    "customID": that.CustomerID,
                    "data": str
                },
                success(res) {
                    resolve(res)
                },
                error(error) {
                    reject(error)
                }
            })
        })
    }
}
export {
    http
}
/*
 * Code
 * Msg
 * AccNum
 * AccName
 * PerCode
 * CarID
 * CustomID
 * AgentId
 * LostDate
 * IsDefault
 */
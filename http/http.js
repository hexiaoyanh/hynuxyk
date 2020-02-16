var CryptoJS = require('./crypto-js/crypto-js.js')
var X2JS = require('../http/x2j/x2js/we-x2js.js');
var x2js = new X2JS();


class http {
    url = "https://www.hynuxyk.club/";
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
    AccStatus = "";
    BankTransState = "";
    JwCookie = "";

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

        return new Promise(function(resolve, reject) {
            wx.request({
                url: that.url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "UserNumber": that.UserNumber,
                    "Password": that.Password
                },
                success(res) {
                    var json = x2js.xml2js(res.data).ZYTK;
                    var code = json.Code;
                    if (code == "1") {
                        that.Msg = json.Msg
                        that.AccNum = json.AccNum;
                        that.AccName = json.AccName;
                        that.PerCode = json.PerCode;
                        that.CarID = json.CardID;
                        that.CustomerID = json.CustomerID;
                        that.AgentID = json.AgentID;
                        that.LostDate = json.LostDate;
                        that.IsDefault = json.IsDefault;
                    } else {
                        that.Msg = json.Msg;
                    }
                    resolve(res);
                },
                fail(error) {
                    that.Msg = "NetError";
                    reject(error);
                }
            })
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
                    var json = x2js.xml2js(res.data).ZYTK;
                    var code = json.Code;
                    if (code == "1") {
                        that.MonDBCurr = json.Table.Row.MonDBCurr;
                        that.IsOpen = json.Table.Row.IsOpen;
                    }
                    resolve(res);
                },
                fail(error) {
                    reject(error)
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
        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum
                },
                success(res) {
                    var json = x2js.xml2js(res.data).ZYTK;
                    that.BankCard = json.BankCard;
                    that.BankName = json.BankName;
                    resolve(res);
                },
                fail(error) {
                    reject(error)
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
                    var json = x2js.xml2js(res.data).ZYTK;
                    var RandomNum = json.RandomNum;
                    that.RandomNum = RandomNum;
                    resolve(res);
                },
                fail(error) {
                    reject(error)
                    console.error("getRandomNum" + error);
                }
            })
        })
    } //请求OrderNum
    getOrderNum() {
        var that = this;
        var a = ['Time', 'AccNum']
        this.setTime();
        var b = [that.Time, that.AccNum]
        this.setSign(a, b);
        var url = that.url + "GetOrderNum.aspx"
        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum
                },
                success(res) {
                    var json = x2js.xml2js(res.data).ZYTK;
                    var OrderNum = json.OrderNum;
                    that.OrderNum = OrderNum;
                    resolve(res);
                },
                fail(error) {
                    reject(error)
                    console.error("OrderNum" + error);
                }
            })
        })
    }
    //虚拟校园卡
    getQRcode(height,width) {
        var that = this;
        //var url = that.url + "proxy/qr"
        var url = that.url +"proxy/getqr";
        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                method: "POST",
                data: {
                    "randomNum": that.RandomNum,
                    "perCode": that.PerCode,
                    "orderNumb": that.OrderNum,
                    "customerID": that.CustomerID,
                    "cardID": that.CarID,
                    "agentID": that.AgentID,
                    "accNum": that.AccNum,
                    "accName": that.AccName,
                    "height": height.toString(),
                    "width": width.toString()
                },
                success(res) {
                    resolve(res)
                },
                error(error) {
                    console.log("getQRcode" + error)
                }
            })
        })
    }
    //充值
    Recharge(money, password) {
        var that = this;
        var a = ['Time', 'AccNum', 'MonTrans', 'Password']
        this.setTime();
        var b = [that.Time, that.AccNum, money, that.OtherPassword(password)]
        this.setSign(a, b);
        var url = that.url + "BankTransfer.aspx"
        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum,
                    "MonTrans": money,
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
    ScanQR(str) {
        var that = this;
        var url = that.url + "proxy/scan"
        return new Promise(function(resolve, reject) {
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
    //获取账号有效性
    QueryAccAuth() {
        var that = this;
        var a = ['Time', 'AccNum']
        this.setTime();
        var b = [that.Time, that.AccNum]
        this.setSign(a, b);
        var url = that.url + "QueryAccAuth.aspx"
        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum
                },
                success(res) {
                    var json = x2js.xml2js(res.data).ZYTK;
                    var AccStatus = json.AccStatus;
                    var BankTransState = json.BankTransState;
                    that.AccStatus = AccStatus;
                    that.BankTransState = BankTransState;
                    resolve(res)
                },
                fail(error) {
                    reject(error)
                }
            })
        })
    }
    //获取付款信息
    GetDealerInfo(dealerNum, staNum, terNum) {
        var that = this;
        var a = ['Time', "AccNum", "DealerNum", "StaNum", "TerNum"]
        this.setTime();
        var b = [that.Time, that.AccNum, dealerNum, staNum, terNum]
        this.setSign(a, b);
        var url = that.url + "GetDealerInfo.aspx"

        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum,
                    "DealerNum": dealerNum,
                    "StaNum": staNum,
                    "TerNum": terNum
                },
                success(res) {
                    resolve(res)
                },
                fail(error) {
                    console.log(error)
                    reject(error)
                }
            })
        })
    }
    Pay(dealerNum, staNum, terNum, password, mondeal) {
        var that = this;
        var a = ['Time', "AccNum", "OrderNum", "DealerNum", "StaNum", "TerNum", "Password", "MonDeal"]
        this.setTime();
        password = that.OtherPassword(password);

        var b = [that.Time, that.AccNum, that.OrderNum, dealerNum, staNum, terNum, password, mondeal]
        this.setSign(a, b);
        var url = that.url + "ScanPayMon.aspx"

        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum,
                    "OrderNum": that.OrderNum,
                    "DealerNum": dealerNum,
                    "StaNum": staNum,
                    "TerNum": terNum,
                    "Password": password,
                    "MonDeal": mondeal
                },
                success(res) {
                    resolve(res)
                },
                fail(error) {
                    console.log(error)
                    reject(error)
                }
            })
        })
    }
    QueryDealRec(begindate, enddate, type, viceaccnum, walletnum, recnum, count) {
        var that = this;
        var a = ['Time', "AccNum", "BeginDate", "EndDate", "Type", "ViceAccNum", "WalletNum", "RecNum", "Count"]
        this.setTime();
        var b = [that.Time, that.AccNum, begindate, enddate, type, viceaccnum, walletnum, recnum, count]
        this.setSign(a, b);
        var url = that.url + "QueryDealRec.aspx"

        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum,
                    "BeginDate": begindate,
                    "EndDate": enddate,
                    "Type": type,
                    "ViceAccNum": viceaccnum,
                    "WalletNum": walletnum,
                    "RecNum": recnum,
                    "Count": count
                },
                success(res) {
                    resolve(res)
                },
                fail(error) {
                    console.log(error)
                    reject(error)
                }
            })
        })
    }
    QueryAccountDoor(date, recnum, count) {
        var that = this;
        var a = ['Time', "AccNum", "Date", "RecNum", "Count"]
        this.setTime();
        var b = [that.Time, that.AccNum, date, recnum, count]
        this.setSign(a, b);
        var url = that.url + "QueryAccountDoor.aspx"
        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum,
                    "Date": date,
                    "RecNum": recnum,
                    "Count": count
                },
                success(res) {
                    resolve(res)
                },
                fail(error) {
                    console.log(error)
                    reject(error)
                }
            })
        })
    }
    ApplyDoorPwd(devicesnum, doorid) {
        var that = this;
        var a = ['Time', "AccNum", "DeviceNum", "DoorID"]
        this.setTime();
        var b = [that.Time, that.AccNum, devicesnum, doorid]
        this.setSign(a, b);
        var url = that.url + "ApplyDoorPwd.aspx"
        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum,
                    "DeviceNum": devicesnum,
                    "DoorID": doorid
                },
                success(res) {
                    resolve(res)
                },
                fail(error) {
                    console.log(error)
                    reject(error)
                }
            })
        })
    }
    ReportLost(password) {
        var that = this;
        var a = ['Time', "AccNum", "OptType", "Password"]
        this.setTime();
        var b = [that.Time, that.AccNum, "1", password]
        this.setSign(a, b);
        var url = that.url + "ReportLost.aspx"
        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum,
                    "OptType": "1",
                    "Password": password
                },
                success(res) {
                    resolve(res)
                },
                fail(error) {
                    console.log(error)
                    reject(error)
                }
            })
        })
    }
    ModifyPassword(oldpassword, newpassword, PswType) {
        var that = this;
        var a = ['Time', "AccNum", "PswType", "OldPassword", "NewPassword"]
        this.setTime();
        var b = [that.Time, that.AccNum, PswType, that.OtherPassword(oldpassword), that.OtherPassword(newpassword)]
        this.setSign(a, b);
        var url = that.url + "ModifyPassword.aspx"
        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                data: {
                    "Time": that.Time,
                    "Sign": that.Sign,
                    "AccNum": that.AccNum,
                    "PswType": PswType,
                    "OldPassword": that.OtherPassword(oldpassword),
                    "NewPassword": that.OtherPassword(newpassword)
                },
                success(res) {
                    resolve(res)
                },
                fail(error) {
                    console.log(error)
                    reject(error)
                }
            })
        })
    }
    JwLogin(username, password) {
        var that = this;
        var url = that.url + "query/login"
        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                method: 'POST',
                data: {
                    "username": username,
                    "password": password
                },
                success(res) {
                    resolve(res)
                },
                fail(res) {
                    reject(res)
                }
            })
        })
    }
    JwKb(week) {
        var that = this;
        var date = new Date();
        var year = Number(date.getFullYear().toString());
        var month = Number(date.getMonth() + 1)
        var str = null;
        if(month<=1 || month>=8){
            str = (year-1).toString()+'-'+year.toString()+'-1';
        }else{
            str = (year-1).toString()+'-'+year.toString()+'-2';
        }

        return new Promise(function(resolve, reject) {
            wx.request({
                url: that.url + 'query/kb',
                method: 'POST',
                data: {
                    "cookies": that.JwCookie,
                    "date": str,
                    "week": week
                },
                success(res) {
                    resolve(res)
                },
                fail(res) {
                    reject(res);
                }
            })
        })
    }
    JwCj(str) {
        var that = this;
        return new Promise(function(resolve, reject) {
            wx.request({
                url: that.url + 'query/cj',
                method: 'POST',
                data: {
                    "cookies": that.JwCookie,
                    "date": str,
                },
                success(res) {
                    resolve(res)
                },
                fail(res) {
                    reject(res)
                }
            })
        })
    }
    JwPscj(url) {
        var that = this;
        return new Promise(function(resolve, reject) {
            wx.request({
                url: that.url + 'query/pscj',
                method: 'POST',
                data: {
                    "cookie": that.JwCookie,
                    "url": url
                },
                success(res) {
                    resolve(res);
                },
                fail(error) {
                    reject(error);
                }
            })
        })
    }
    getmsg(){
        var that = this;
        return new Promise(function(resolve,reject){
            wx.request({
                url: that.url+'query/getMsg',
                method:"POST",
                success(res){
                    resolve(res);
                },
                fail(error){
                    reject(res);
                }
            })
        })
    }
    // JwKbLogin(code){
    //     var that = this;
    //     return new Promise(function (resolve, reject) {
    //         wx.request({
    //             url: that.url + 'submsg/login',
    //             method: 'POST',
    //             data: {
    //                 "code": code,
    //             },
    //             success(res) {
    //                 resolve(res);
    //             },
    //             fail(error) {
    //                 reject(error);
    //             }
    //         })
    //     })
    // }
}
export {
    http
}
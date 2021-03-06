const crypto = requirePlugin("crypto");
var X2JS = require('../http/x2j/x2js/we-x2js.js');
var x2js = new X2JS();
console.error("到 https://www.css-js.com/ 加密http.js再发布")

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
    CardID = "";
    CertCode = "";
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
    Nanyue = "";

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
        var md5 = new crypto["MD5"](sign).toString();
        this.Sign = md5;
    }

    //设置用户名
    setUsername(str) {
        //设置用户名
        this.UserNumber = str;
        wx.setStorage({
            key: 'UserNumber',
            data: str,
        })
    }

    //密码加密
    setPassword(str) {
        //设置密码
        const key = "12347890";
        const keyHex = crypto.Utf8.parse(key);
        const encrypted = new crypto.DES().encrypt(str, keyHex, {
            iv: keyHex,
            mode: crypto.Mode.CBC,
            padding: crypto.Padding.Pkcs7
        });
        this.Password = encrypted.toString();
    }

    //支付密码加密
    OtherPassword(str) {
        //设置密码
        var key = "12347890";
        var keyHex = crypto.Utf8.parse(key);
        var encrypted = new crypto.DES().encrypt(str, keyHex, {
            iv: keyHex,
            mode: crypto.Mode.CBC,
            padding: crypto.Padding.Pkcs7
        });
        return encrypted.toString();
    }

    //登录
    Login() {
        var a = ['Time', 'UserNumber', 'Password'];
        this.setTime();
        var b = [this.Time, this.UserNumber, this.Password];
        this.setSign(a, b);
        var that = this;
        return new Promise(function (resolve, reject) {
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
                        wx.setStorage({
                            key: 'AccNum',
                            data: that.AccNum,
                        });
                        wx.setStorage({
                            key: 'AccName',
                            data: that.AccName,
                        });
                        wx.setStorage({
                            key: 'PerCode',
                            data: that.PerCode,
                        });
                        wx.setStorage({
                            key: 'CardID',
                            data: that.CarID,
                        });
                        wx.setStorage({
                            key: 'CustomerID',
                            data: that.CustomerID,
                        });
                        wx.setStorage({
                            key: 'AgentID',
                            data: that.AgentID,
                        });
                        wx.setStorage({
                            key: 'LostDate',
                            data: that.LostDate,
                        });
                        wx.setStorage({
                            key: 'IsDefault',
                            data: that.IsDefault,
                        })
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
        return new Promise(function (resolve, reject) {
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
        return new Promise(function (resolve, reject) {
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
                    that.CertCode = json.CertCode;
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
        return new Promise(function (resolve, reject) {
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
        return new Promise(function (resolve, reject) {
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
    getQRcode(height, width) {
        var that = this;
        //var url = that.url + "proxy/qr"
        var url = that.url + "proxy/getqr";
        return new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                method: "POST",
                data: {
                    "randomNum": that.RandomNum,
                    "perCode": that.PerCode,
                    "orderNumb": that.OrderNum,
                    "customerID": that.CustomerID,
                    "cardID": that.CardID,
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
        return new Promise(function (resolve, reject) {
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

    //获取账号有效性
    QueryAccAuth() {
        var that = this;
        var a = ['Time', 'AccNum']
        this.setTime();
        var b = [that.Time, that.AccNum]
        this.setSign(a, b);
        var url = that.url + "QueryAccAuth.aspx"
        return new Promise(function (resolve, reject) {
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

        return new Promise(function (resolve, reject) {
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

        return new Promise(function (resolve, reject) {
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

        return new Promise(function (resolve, reject) {
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
        return new Promise(function (resolve, reject) {
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
        return new Promise(function (resolve, reject) {
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
        return new Promise(function (resolve, reject) {
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
        return new Promise(function (resolve, reject) {
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
        return new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                method: 'POST',
                data: {
                    "username": username,
                    "password": password,
                    "nanyue": that.Nanyue
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
        if (month <= 1 || month >= 8) {
            str = (year).toString() + '-' + (year+1).toString() + '-1';
        } else {
            str = (year - 1).toString() + '-' + year.toString() + '-2';
        }
        console.log(that.Nanyue)
        return new Promise(function (resolve, reject) {
            wx.request({
                url: that.url + 'query/kb',
                method: 'POST',
                data: {
                    "cookies": that.JwCookie,
                    "date": "2020-2021-1",
                    "week": week,
                    "nanyue": that.Nanyue
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
        return new Promise(function (resolve, reject) {
            wx.request({
                url: that.url+ 'query/cj',
                //url:"http://127.0.0.1:5000/query/cj",
                method: 'POST',
                data: {
                    "cookies": that.JwCookie,
                    "date": str,
                    "nanyue": that.Nanyue
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
        return new Promise(function (resolve, reject) {
            wx.request({
                url: that.url + 'query/pscj',
                //url:"http://127.0.0.1:5000/query/pscj",
                method: 'POST',
                data: {
                    "cookie": that.JwCookie,
                    "url": url,
                    "nanyue": that.Nanyue
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

    getmsg() {
        var that = this;
        return new Promise(function (resolve, reject) {
            wx.request({
                url: that.url + 'query/getMsg',
                method: "POST",
                success(res) {
                    resolve(res);
                },
                fail(error) {
                    reject(res);
                }
            })
        })
    }

    ResetPassword(username, idcard) {
        var that = this;
        return new Promise(function (resolve, reject) {
            wx.request({
                url: that.url + 'query/resetPassword',
                //url:"http://127.0.0.1:5000/query/resetPassword",
                method: "POST",
                data: {
                    "username": that.UserNumber,
                    "idcardnum": that.CertCode,
                    "nanyue": that.Nanyue
                },
                success(res) {
                    console.log(res)
                    resolve(res);
                },
                fail(error) {
                    reject(error)
                }
            })
        })
    }

    CetGetVerify(id_num, name) {
        var that = this;
        return new Promise(function (resolve, reject) {
            wx.request({
                url: that.url + 'publicexam/cetgetverify',
                method: "POST",
                data: {
                    "id_num": id_num,
                    "name": name
                },
                success(res) {
                    resolve(res)
                },
                fail(error) {
                    reject(error)
                }
            })
        })
    }

    CetGetScore(id_num, name, capcha, cookie) {
        var that = this;
        return new Promise(function (resolve, reject) {
            wx.request({
                url: that.url + 'publicexam/cetgetscore',
                method: "POST",
                data: {
                    "id_num": id_num,
                    "name": name,
                    "capcha": capcha,
                    "cookie": cookie
                },
                success(res) {
                    resolve(res)
                },
                fail(error) {
                    reject(error)
                }
            })
        })
    }
    GetAboutus() {
        var that = this;
        return new Promise(function (resolve, reject) {
            wx.request({
                url: that.url + 'query/getaboutus',
                method: "GET",
                data: null,
                success(res) {
                    resolve(res)
                },
                fail(error) {
                    reject(error)
                }
            })
        })
    }
    ViewAd() {
        var that = this;
        wx.request({
            url: that.url + 'query/viewadd',
            method: "POST",
            data: {
                "userid": that.UserNumber == "" ? "游客" : that.UserNumber,
                "username": that.AccName == "" ? "游客" : that.AccName
            },
            success(res) {},
            fail(error) {}
        })
    }
    GetAdData() {
        var that = this;
        return new Promise(function (resolve, reject) {
            wx.request({
                url: that.url + 'query/getviewad',
                method: "GET",
                data: null,
                success(res) {
                    resolve(res)
                },
                fail(error) {
                    reject(error)
                }
            })
        })
    }
    GetRankList(userid, xqmc, elective) {
        var that = this;
        return new Promise(function (resolve, reject) {
            wx.request({
                url: that.url + "rank/getrankmsg",
                method: "POST",
                data: {
                    "userid": userid,
                    "xqmc": xqmc,
                    "elective": elective
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
    FindYou(userid, xm) {
        let that = this;
        return new Promise(function (resolve, reject) {
            wx.request({
                url: that.url + "rank/findyou",
                method: "POST",
                data: {
                    "userid": userid,
                    "xm": xm
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
    Donate(openid, money) {
        let that = this;
        return new Promise(function (resolve, reject) {
            wx.request({
                url:  that.url+"/donate/donate",
                method: "POST",
                data: {
                    "openid": openid,
                    "money": money
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
    Update_user_info(openid,name,msg){
        let that = this;
        return new Promise(function (resolve, reject) {
            wx.request({
                url:  that.url+"/donate/update_user_info",
                method: "POST",
                data: {
                    "openid":openid,
                    "name": name,
                    "msg": msg
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
}

export {
    http
}
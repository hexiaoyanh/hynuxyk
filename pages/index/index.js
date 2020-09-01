//index.js
//获取应用实例
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        btn_loading: false,
        MonDBCurr: "",
        AccNum: "",

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        app.http.getmsg().then((res)=>{
            wx.showModal({
                title:"衡师服务小助手",
                content:res.data['msg']
            })
        })
        //读取缓存
        var that = this;
        wx.getStorage({
            key: 'AccNum',
            success: function(res) {
                app.http.AccNum = res.data;
                app.http.QueryAccWallent().then((res) => {
                    that.setData({
                        AccNum: app.http.AccName,
                        MonDBCurr: app.http.MonDBCurr
                    })
                });
                app.http.QueryAccAuth();
            },
            fail: function() {
                that.setData({
                    AccNum: "您未登录",
                    MonDBCurr: "点击登录"
                });
            }
        });
        wx.getStorage({
            key: 'AccName',
            success: function(res) {
                app.http.AccName = res.data
            },
        });

        wx.getStorage({
            key: 'PerCode',
            success: function(res) {
                app.http.PerCode = res.data
            },
        });
        wx.getStorage({
            key: 'CardID',
            success: function(res) {
                app.http.CardID = res.data
            },
        });
        wx.getStorage({
            key: 'CustomerID',
            success: function(res) {
                app.http.CustomerID = res.data
            },
        });
        wx.getStorage({
            key: 'AgentID',
            success: function(res) {
                app.http.AgentID = res.data
            },
        });
        wx.getStorage({
            key: 'LostDate',
            success: function(res) {
                app.http.LostDate = res.data
            },
        });
        wx.getStorage({
            key: 'IsDefault',
            success: function(res) {
                app.http.IsDefault = res.data
            },
        });
        wx.getStorage({
            key: 'UserNumber',
            success: function(res) {
                app.http.UserNumber = res.data
            },
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let a = Math.floor((Math.random()*100)+1);
        console.log(a);
        if (a==1){
            wx.showModal({
                title: '谢谢你了',
                content: '小程序制作不易，给我打点赏吧，一元十元也是爱',
                confirmText: "打赏",
                cancelText:"拒绝",
                success: (res) => {
                    if (res.confirm){
                        wx.navigateTo({
                          url: '../myself/record/record',
                        })
                    }
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading() //在标题栏中显示加载
        app.http.QueryAccWallent().then((res) => {
            this.setData({
                AccNum: app.http.AccName,
                MonDBCurr: app.http.MonDBCurr
            })
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    Scan: function(e) {
        if (app.http.AccNum == "") {
            wx.showModal({
                title: '请先登录',
                content: '要先登录才能使用校园卡扫码功能哦',
                success(res) {
                    if (res.confirm) {
                        wx.redirectTo({
                            url: '../login/login',
                        })
                    }
                }
            });
            return;
        }
        wx.scanCode({
            success(res) {
                wx.showLoading({
                    title: '正在加载',
                    mask: true
                })
                app.http.ScanQR(res.result).then((res) => {
                    console.log(res.data)
                    if (res.data.code == "1") {
                        app.http.QueryAccAuth().then((res2) => {
                            if (app.http.AccStatus != "1" || app.http.BankTransState != "1") {
                                wx.hideLoading();
                                wx.showModal({
                                    title: '错误',
                                    content: '账号状态错误!',
                                    success() {
                                        wx.navigateBack({});
                                    }
                                })
                            } else
                                wx.navigateTo({
                                    url: './Scan/Scan?array=' + res.data.data,
                                })
                        })

                        wx.hideLoading();
                    } else {
                        wx.hideLoading();
                        wx.showModal({
                            title: '错误',
                            content: '二维码错误',
                        })
                    }
                })

            }
        })
    },
    VirtualCard: function(e) {
        if (app.http.AccNum == "") {
            wx.showModal({
                title: '请先登录',
                content: '要先登录才能使用虚拟校园卡功能哦',
                success(res) {
                    if (res.confirm) {
                        wx.redirectTo({
                            url: '../login/login',
                        })
                    }
                }
            });
            return;
        }
        wx.navigateTo({
            url: './VirtualCard/VirtualCard',
        })
    },
    Charge: function(e) {
        if (app.http.AccNum == "") {
            wx.showModal({
                title: '请先登录',
                content: '要先登录才能使用校园卡充值功能哦',
                success(res) {
                    if (res.confirm) {
                        wx.redirectTo({
                            url: '../login/login',
                        })
                    }
                }
            });
            return;
        }
        wx.navigateTo({
            url: './Charge/Charge',
        })
    },
    Transfer: function(e) {
        if (app.http.AccNum == "") {
            wx.showModal({
                title: '请先登录',
                content: '要先登录才能使用账单功能哦',
                success(res) {
                    if (res.confirm) {
                        wx.redirectTo({
                            url: '../login/login',
                        })
                    }
                }
            });
            return;
        }
        wx.navigateTo({
            url: './bill/bill',
        })
    },
    AccessControl: function(e) {
        if (app.http.AccNum == "") {
            wx.showModal({
                title: '请先登录',
                content: '要先登录才能使用开门密码功能哦',
                success(res) {
                    if (res.confirm) {
                        wx.redirectTo({
                            url: '../login/login',
                        })
                    }
                }
            });
            return;
        }
        wx.navigateTo({
            url: './AccessControl/AccessControl',
        })
    },
    ReportLoss: function(e) {
        if (app.http.AccNum == "") {
            wx.showModal({
                title: '请先登录',
                content: '要先登录才能使用挂失功能哦',
                success(res) {
                    if (res.confirm) {
                        wx.redirectTo({
                            url: '../login/login',
                        })
                    }
                }
            });
            return;
        }
        wx.navigateTo({
            url: './ReportLoss/ReportLoss',
        })
    },
    Attendance: function(e) {
        wx.navigateTo({
            url: '../myself/myself',
        })
    },
    Kbcj: function(e) {
        wx.navigateTo({
            url: './kbcj/kbcj',
        })
    },
    login: function(e) {
        wx.redirectTo({
            url: '../login/login',
        })
    },
    Exam: function(e){
        wx.navigateTo({
          url: '../Exam/Exam',
        })
    },
    findyou: function(e){
        wx.navigateTo({
          url: '../findYou/findyou',
        })
    }
})
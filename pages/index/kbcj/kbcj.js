// pages/JW/JW.js

var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH: null,
        username: "",
        password: "",
        switchValue: false, //保存选择按钮值
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            stateH: app.hei
        })
        var that = this;
        wx.getStorage({
            key: 'Jwusername',
            success: function (res) {
                let username = res.data;
                that.setData({
                    username: res.data
                });
                wx.getStorage({
                    key: 'Jwpassword',
                    success: function (res) {
                        let password = res.data;
                        that.setData({
                            password: res.data
                        });
                        wx.getStorage({
                            key: 'Jwnanyue',
                            success: function (res) {
                                that.setData({
                                    switchValue: res.data
                                })
                                app.http.Nanyue = res.data;
                                wx.showLoading({
                                  title: '登录中',
                                })
                                that.logins(username,password);
                            },
                        })
                    },
                });
            },
        });


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //开关变更函数
    switchChange: function (e) {
        this.setData({
            switchValue: e.detail.value
        })
        app.http.Nanyue = e.detail.value;
        wx.setStorage({
            key: 'Jwnanyue',
            data: e.detail.value,
        })
    },
    login: function (e) {
        var that = this;
        wx.showLoading({
            title: '加载中',
        })
        var objData = e.detail.value;
        var that = this;
        if (objData.username && objData.password) {
            that.setData({
                btn_loading: !that.data.btn_loading
            })
            wx.setStorage({
                key: 'Jwusername',
                data: objData.username,
            });
            wx.setStorage({
                key: 'Jwpassword',
                data: objData.password,
            });
            wx.setStorage({
                key: 'Jwnanyue',
                data: that.data.switchValue,
            })
            that.logins(objData.username,objData.password);

        } else {
            wx.hideLoading();
            wx.showModal({
                title: '错误',
                content: '请输入学号或密码',
            })
        }
    },
    logins:function(username,password){
        app.http.JwLogin(username,password).then((res) => {
            wx.hideLoading();
            var data = res.data;
            console.log(res.data)
            if (data['Msg'] == "OK") {
                app.http.JwCookie = data['cookie']['JSESSIONID'];
                wx.navigateTo({
                    url: './index/index',
                })
            } else {
                wx.showModal({
                    title: '错误',
                    content: res.data['Msg'],
                    cancelText: "找回密码",
                    confirmText: "再试一次",
                    success(res) {
                        if (res.confirm) {
                            return;
                        } else if (res.cancel) {
                            wx.showModal({
                                title: '重置密码',
                                content: '您确定将密码重置为身份证后6位吗，需要登录校园卡',
                                success(res) {
                                    if (res.confirm) {
                                        wx.showLoading({
                                            title: '正在重置',
                                        })
                                        app.http.QueryAccInfo().then((res) => {
                                            app.http.ResetPassword().then((res) => {
                                                wx.hideLoading();
                                                wx.showModal({
                                                    title: '重置密码',
                                                    content: res.data['Msg'],
                                                })
                                            })
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    }
})
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        password: '',
        btn_loading: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var conf = {
            title: '提示',
            content: '本程序为衡师校园卡第三方程序，登录密码为校园卡密码（初始密码为888888），我们不会上传您的任何数据，登录即可使用所有功能，服务器端代码开源地址为：https://github.com/hexiaoyanh/hynuxykbackstage，图片来自于Alto\'s Adventure，如有疑问请加QQ群：127652979，我们不负任何法律责任。',
            cancelText: '不再显示',
            confirmText: '确定',
            success(res) {
                if (res.cancel) {
                    wx.setStorage({
                        key: 'msgconfim',
                        data: '1',
                    })
                }
            }
        };
        wx.getStorage({
            key: 'msgconfim',
            success: function(res) {},
            fail(res) {
                wx.showModal(conf);
            }
        })

        var that = this;
        wx.getStorage({
            key: 'username',
            success: function(res) {
                app.http.setUsername(res.data);
                that.setData({
                    username: res.data
                })
            },
        });
        wx.getStorage({
            key: 'password',
            success: function(res) {
                that.setData({
                    password: res.data
                })
                wx.showLoading({
                    title: '登录中',
                });
                app.http.setPassword(res.data);
                app.http.Login().then((res) => {
                    wx.hideLoading();
                    if (app.http.Msg == "NetError") {
                        wx.showModal({
                            title: '提示',
                            content: '网络错误',
                        });
                        app.http.Msg = "";

                    } else if (app.http.Msg == "登录成功") {
                        wx.redirectTo({
                            url: '../index/index',
                        })

                    } else {
                        wx.showModal({
                            title: '提示',
                            content: '用户名或密码错误',
                        });
                        app.http.Msg = "";
                    }
                }).catch((error) => {
                    wx.showModal({
                        title: '提示',
                        content: error,
                    });
                    console.log(error);
                })
            },
        });




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
    submit: function(e) {
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
                key: 'username',
                data: objData.username,
            });
            wx.setStorage({
                key: 'password',
                data: objData.password,
            });
            app.http.setUsername(objData.username);
            app.http.setPassword(objData.password);
            app.http.Login().then((res) => {
                wx.hideLoading();
                if (app.http.Msg == "NetError") {
                    wx.showModal({
                        title: '提示',
                        content: '网络错误',
                    });
                    app.http.Msg = "";

                } else if (app.http.Msg == "登录成功") {
                    wx.redirectTo({
                        url: '../index/index',
                    })

                } else {
                    wx.showModal({
                        title: '提示',
                        content: '用户名或密码错误',
                    });
                    app.http.Msg = "";
                }
            }).catch((error) => {
                console.log(error);
            })
        } else {
            wx.hideLoading();
            wx.showModal({
                title: '错误',
                content: '请输入学号或密码',
            })
        }
    },

})
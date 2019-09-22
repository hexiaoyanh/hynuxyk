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
        var that = this;
        wx.getStorage({
            key: 'username',
            success: function(res) {
                that.setData({
                    username: res.data
                })
            },
        })
        wx.getStorage({
            key: 'password',
            success: function(res) {
                that.setData({
                    password: res.data
                })
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
            app.http.Login();

            function e(a){
                if(a>3000) {next("NetError");return;}
                setTimeout(function(){
                    if(app.http.Msg != "")
                    {
                        next(app.http.Msg);
                        return;
                    }else{
                        e(a+1000);
                    }
                },a)
            }
            function next(sta) {
                if (sta == "NetError") {
                    wx.showModal({
                        title: '提示',
                        content: '网络错误',
                    });
                    app.http.Msg="";
                    that.setData({
                        btn_loading: !that.data.btn_loading
                    });
                } else if (sta == "登录成功") {
                    wx.switchTab({
                        url: '../index/index',
                    });

                } else {
                    wx.showModal({
                        title: '提示',
                        content: '用户名或密码错误',
                    });
                    app.http.Msg="";
                    that.setData({
                        btn_loading: !that.data.btn_loading
                    });
                }
            }
            e(0);

        }
    },
    
})
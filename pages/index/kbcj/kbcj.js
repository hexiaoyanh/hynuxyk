// pages/JW/JW.js

var hei = wx.getMenuButtonBoundingClientRect().top;
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH: hei,
        username:"",
        password:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getStorage({
            key: 'Jwusername',
            success: function (res) {
                that.setData({
                    username: res.data
                })
            },
        })
        wx.getStorage({
            key: 'Jwpassword',
            success: function (res) {
                that.setData({
                    password: res.data
                })
            },
        })
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
    login:function(e){
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
            app.http.JwLogin(objData.username,objData.password).then((res)=>{
                wx.hideLoading();
                var data = res.data;
                console.log(res.data)
                if(data['Msg']=="OK")
                {
                    app.http.JwCookie = data['cookie']['JSESSIONID'];
                    wx.navigateTo({
                        url: './index/index',
                    })
                }else{
                    wx.showModal({
                        title: '错误',
                        content: '账号或密码错误,也许是服务器错误，请重试。',
                    })
                }
            })
            
        }
        else {
            wx.hideLoading();
            wx.showModal({
                title: '错误',
                content: '请输入学号或密码',
            })
        }
    }
})

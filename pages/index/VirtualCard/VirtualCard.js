// pages/index/VirtualCard/VirtualCard.js

const app = getApp();
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;
// 300rpx 在6s上为 150px
const qrcode_w = Math.floor(400 / rate);

Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH :app.hei,
        qrcode_w: qrcode_w,
        RandomNum: "",
        AccName: app.http.AccName,
        UserNumber: app.http.UserNumber,
        QrString: "",
        Pngpath:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            stateH: app.hei
        })
        this.setData({
            AccName: app.http.AccName,
            UserNumber: app.http.UserNumber
        });
        wx.showLoading({
            title: '加载中',
        })
        this.getPic();
        var that = this;
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
        this.getPic();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
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
    getPic:function(){
        var that = this;
        app.http.getRandomNum().then((res)=>{
            app.http.getOrderNum().then((res2)=>{
                app.http.getQRcode(qrcode_w, qrcode_w).then((res3)=>{
                    wx.hideLoading();
                    console.log(res3.data)
                    that.setData({
                        Pngpath:res3.data
                    })
                })
            })
        })
    },
    BigPic: function() {
        var that = this;
        wx.navigateTo({
            url: './BigPic/BigPic?PngPath='+that.data.Pngpath,
        })
    }
})
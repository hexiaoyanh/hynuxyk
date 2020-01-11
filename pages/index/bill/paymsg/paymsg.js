// pages/index/bill/paymsg/paymsg.js
var hei = wx.getMenuButtonBoundingClientRect().top;
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH:hei,
        FeeName:null,
        MonCard:null,
        MonDeal:null,
        Time:null,     
        Source:null   
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            stateH: app.hei
        })
        var Time = options.Time;
        var FeeName = options.FeeName;
        var MonCard = options.MonCard;
        var MonDeal = options.MonDeal;
        var Source = options.Source;
        this.setData({
            FeeName:FeeName,
            MonCard:MonCard,
            MonDeal:MonDeal,
            Time:Time,
            Source:Source
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

    }
})
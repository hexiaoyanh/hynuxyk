// pages/index/VirtualCard/BigPic/BigPic.js
const app = getApp();
var QRCode = require('../../../../utils/weapp-qrcode.js')
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;
// 300rpx 在6s上为 150px
const qrcode_w = 750 / rate;
var scbr;
var hei = wx.getMenuButtonBoundingClientRect().top;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        qrcode_w: qrcode_w,
        stateH: hei,
        PngPath: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            PngPath: options.PngPath
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        wx.getScreenBrightness({
            success: function(res) {
                scbr = res.value;
            }
        });
        wx.setScreenBrightness({
            value: parseFloat(1).toFixed(1)
        })
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
        wx.setScreenBrightness({
            value: parseFloat(scbr).toFixed(1)
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        wx.setScreenBrightness({
            value: parseFloat(scbr).toFixed(1)
        })
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

    }
})
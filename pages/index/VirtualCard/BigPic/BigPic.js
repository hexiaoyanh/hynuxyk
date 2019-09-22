// pages/index/VirtualCard/BigPic/BigPic.js
const app = getApp();
var QRCode = require('../../../../utils/weapp-qrcode.js')
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;
// 300rpx 在6s上为 150px
const qrcode_w = 750 / rate;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        qrcode_w: qrcode_w
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var qrcode = new QRCode('canvas', {
            // usingIn: this,
            text: app.http.QRcode,
            width: qrcode_w,
            height: qrcode_w,
            padding: 6,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M,
            callback: (res) => {
                // 生成二维码的临时文件
                console.log(res.path)
            }
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

    }
})
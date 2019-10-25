// pages/index/VirtualCard/VirtualCard.js

const app = getApp();
var QRCode = require('../../../utils/weapp-qrcode.js')
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;
// 300rpx 在6s上为 150px
const qrcode_w = 400 / rate;
var hei = wx.getMenuButtonBoundingClientRect().top;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH :hei,
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
        wx.showLoading({
            title: '加载中',
        })
        var that = this;

        function getqr() {
            app.http.getQRcode().then((res) => {
                wx.hideLoading();
                if (res.data == null) {
                    wx.showModal({
                        title: '错误',
                        content: '网络错误',
                        success(res) {
                            if (res.confirm) {
                                wx.navigateBack({

                                })
                            } else if (res.cancel) {
                                wx.navigateBack({

                                })
                            }
                        }
                    })
                } else {
                    app.http.QRCode = res.data;
                    that.setData({
                        QrString: app.http.QRcode,
                        AccName: app.http.AccName,
                        UserNumber: app.http.UserNumber
                    });
                    var qrcode = new QRCode('canvas', {
                        // usingIn: this,
                        text: res.data,
                        width: qrcode_w,
                        height: qrcode_w,
                        padding: 6,
                        background: "#fad689",
                        colorDark: "#a36336",
                        colorLight: "#fad689",
                        correctLevel: QRCode.CorrectLevel.L,
                        callback: (res) => {
                            // 生成二维码的临时文件
                            console.log(res.path)
                            that.setData({
                                Pngpath: res.path
                            })
                        }
                    });
                }
            });
        }
        if (app.http.RandomNum != "") {
            if (app.http.OrderNum != "") {
                getqr();
            } else {
                app.http.getOrderNum().then((res) => getqr());
            }
        } else {
            app.http.getRandomNum((res) => {
                app.http.getOrderNum().then((res) => { getqr() });
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
        var that = this;
        app.http.getRandomNum().then((res)=>{
            app.http.getOrderNum().then((res2)=>{
                function getqr() {
                    app.http.getQRcode().then((res) => {
                        wx.hideLoading();
                        if (res.data == null) {
                            wx.showModal({
                                title: '错误',
                                content: '网络错误',
                                success(res) {
                                    if (res.confirm) {
                                        wx.navigateBack({

                                        })
                                    } else if (res.cancel) {
                                        wx.navigateBack({

                                        })
                                    }
                                }
                            })
                        } else {
                            app.http.QRCode = res.data;
                            that.setData({
                                QrString: app.http.QRcode,
                                AccName: app.http.AccName,
                                UserNumber: app.http.UserNumber
                            });
                            var qrcode = new QRCode('canvas', {
                                // usingIn: this,
                                text: res.data,
                                width: qrcode_w,
                                height: qrcode_w,
                                padding: 6,
                                background: "#fad689",
                                colorDark: "#a36336",
                                colorLight: "#fad689",
                                correctLevel: QRCode.CorrectLevel.L,
                                callback: (res) => {
                                    // 生成二维码的临时文件
                                    that.setData({
                                        Pngpath: res.path
                                    })
                                }
                            });
                        }
                    });
                }
                getqr();
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh();
            })
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
    BigPic: function() {
        var that = this;
        wx.navigateTo({
            url: './BigPic/BigPic?PngPath='+that.data.Pngpath,
        })
    }
})
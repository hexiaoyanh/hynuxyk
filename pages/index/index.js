//index.js
//获取应用实例
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        btn_loading: false,
        MonDBCurr: app.http.MonDBCurr,
        AccNum: app.http.AccNum,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.http.getmsg().then((res) => {
            if (res.data['code'] != 0) {
                wx.showModal({
                    title: '一些信息',
                    content: res.data['msg'],
                })
            }
        });
        app.http.QueryAccWallent().then((res) => {
            this.setData({
                AccNum: app.http.AccName,
                MonDBCurr: app.http.MonDBCurr
            })
        })
        app.http.getRandomNum();
        app.http.getOrderNum();
        app.http.QueryAccAuth();
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
        app.http.QueryAccWallent().then((res) => {
            this.setData({
                AccNum: app.http.AccName,
                MonDBCurr: app.http.MonDBCurr
            })
        })

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
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    Scan: function (e) {
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
    VirtualCard: function (e) {
        wx.navigateTo({
            url: './VirtualCard/VirtualCard',
        })
    },
    Charge: function (e) {
        wx.navigateTo({
            url: './Charge/Charge',
        })
    },
    Wallent: function (e) {
        wx.navigateTo({
            url: './Wallent/Wallent',
        })
    },
    Transfer: function (e) {
        wx.navigateTo({
            url: './bill/bill',
        })
    },
    AccessControl: function (e) {
        wx.navigateTo({
            url: './AccessControl/AccessControl',
        })
    },
    ReportLoss: function (e) {
        wx.navigateTo({
            url: './ReportLoss/ReportLoss',
        })
    },
    Attendance: function (e) {
        wx.navigateTo({
            url: '../myself/myself',
        })
    },
    Kbcj: function (e) {
        wx.navigateTo({
            url: './kbcj/kbcj',
        })
    }
})
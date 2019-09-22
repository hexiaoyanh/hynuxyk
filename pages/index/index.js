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
        app.http.QueryAccWallent().then((res) => {
            this.setData({
                AccNum: app.http.AccName,
                MonDBCurr: app.http.MonDBCurr
            })
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
    backs: function (e) {
        this.setData({
            btn_loading: !this.data.btn_loading
        })
        wx.switchTab({
            url: '../login/login',
        })
    },
    Scan: function (e) {
        wx.scanCode({
            success(res) {
                console.log(res.result)
                wx.navigateTo({
                    url: './Scan/Scan',
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
            url: './Transfer/Transfer',
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
            url: './Attendance/Attendance',
        })
    },
    DoorPassword: function (e) {
        wx.navigateTo({
            url: './DoorPassword/DoorPassword',
        })
    }
})
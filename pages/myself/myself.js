// pages/myself/myself.js
const app = getApp();
var hei = wx.getMenuButtonBoundingClientRect().top;
let videoAd = null

Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH: hei,
        name: "",
        id: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            name: app.http.AccName,
            id: app.http.UserNumber
        })
        if (wx.createRewardedVideoAd) {
            videoAd = wx.createRewardedVideoAd({
                adUnitId: 'adunit-11c3b9b24ab293cc'
            })
            videoAd.onLoad(() => {
                console.log("正在准备ad")
            })
            videoAd.onError((err) => {
                console.log(err);
                wx.showToast({
                    icon:"error",
                    title: '广告拉取失败',
                })
            })
            videoAd.onClose((res) => {
                console.log(res);
                if (res && res.isEnded) {
                    // 正常播放结束，可以下发游戏奖励
                    wx.showModal({
                        title: '万分感谢',
                        content: '非常感谢您帮助了可怜的开发者，给你一个么么哒😘，平时成绩已经解锁了哦',
                    })
                } else {
                    // 播放中途退出，不下发游戏奖励
                    wx.showModal({
                        title: '没关系',
                        content: '感谢您好奇的点了一下，虽然没有帮到我，但是这个小程序帮到了你使我感觉很开心😊',
                    })
                }
            })
        }
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
    logout: function(e) {
        wx.clearStorage();
        wx.reLaunch({
            url: '../login/login',
        })
    },
    record: function() {
        wx.navigateTo({
            url: './record/record',
        })
    },
    adshow: function() {
        if (videoAd) {
            videoAd.show().catch(() => {
                // 失败重试
                videoAd.load()
                    .then(() => videoAd.show())
                    .catch(err => {
                        console.log('激励视频 广告显示失败')
                    })
            })
        } else {
            wx.showToast({
                title: '广告加载出现问题',
            })
        }
    },
    change: function() {
        wx.navigateTo({
            url: './change/change',
        })
    }
})
// pages/Exam/cet/cj/cj.js
const app = getApp();
let interstitialAd = null

Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH: null,
        id_num: "",
        name: "",
        writing: "",
        listening: "",
        score: "",
        school: "",
        reading: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            stateH: app.hei,
            id_num: options.id_num,
            name: options.name,
            score: options.score,
            writing: options.writing,
            listening: options.listening,
            school: options.school,
            reading: options.reading
        });
        if (wx.createInterstitialAd) {
            interstitialAd = wx.createInterstitialAd({
              adUnitId: 'adunit-77f7566412eb47c1'
            })
            interstitialAd.onLoad(() => {})
            interstitialAd.onError((err) => {})
            interstitialAd.onClose(() => {})
          }
          
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
        if (interstitialAd) {
            interstitialAd.show().catch((err) => {
              console.error(err)
            })
          }
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
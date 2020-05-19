// pages/index/kbcj/index/cj/pm/pm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stateH: app.hei,
    schoolYear: "",
    rankList:null,//用于存储排名信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stateH:app.hei,
  })
    //获取参数：学年
    var that = this;
    that.setData({
      schoolYear: options.time,
    })
    //此处添加获取当前学年排名方法,将返回值存于rankList
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
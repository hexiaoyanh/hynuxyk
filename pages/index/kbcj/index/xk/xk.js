// pages/index/kbcj/index/xk/xk.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stateH: null,
    slideStyle: "slideInDown",
    allData: null,
    memberList: null,
    pickerIndex: 0,
    schoolYear: 0,
    showloading:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var year = date.getFullYear();
    this.setData({
      stateH:app.hei,
      slideStyle: "slideInDown",
      allData: null,
      memberList: {
        key:1,
      },
      pickerIndex: 0,
      schoolYear: year,
      showloading:true,
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
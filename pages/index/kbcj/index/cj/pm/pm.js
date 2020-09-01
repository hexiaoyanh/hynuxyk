// pages/index/kbcj/index/cj/pm/pm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stateH: app.hei,
    schoolYear: "",
    rankList: null, //用于存储排名信息
    switchValue: false, //保存选择按钮值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stateH: app.hei
    })
    wx.showModal({
      title: "注意",
      content: "放广告是迫不得已，(＞人＜；)对不起，一个月支出起码要100块，我们已经贴了差不多一千块了，只能放点广告会点血了，成绩排名都是班级内的所有人的排名，等以后有空了我给大家做一个年级排名，现在是在是没有空，学院一般按照平均学分绩点来排名，如果今天出来了新成绩，那么排名就不会准确，晚上更新后才会准确，具体怎么算，请到百度上搜一下。选修关闭是除了选修课其他成绩都进入计算，选修开启是所有成绩都进入计算。"
    })
    //获取参数：学年
    var that = this;
    that.setData({
      schoolYear: options.time,
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.getStorage({
      key: 'Jwusername',
      success: function (res) {
        app.http.GetRankList(res.data, options.time).then((ress) => {
          wx.hideLoading({
            complete: (res) => {},
          });
          that.setData({
            rankList: ress.data
          })
        })
      }
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

  },
  switchChange: function (e) {
    this.setData({
      switchValue: e.detail.value
    })
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.getStorage({
      key: 'Jwusername',
      success: function (res) {
        app.http.GetRankList(res.data, that.data.schoolYear,e.detail.value).then((ress) => {
          wx.hideLoading({
            complete: (res) => {},
          });
          that.setData({
            rankList: ress.data
          })
        })
      }
    })
  }
})
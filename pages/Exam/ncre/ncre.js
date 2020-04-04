// pages/Exam/ncre/ncre.js

const app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stateH : null,
    examTime: null,
    tPickerIndex: 0,
    subjects: null,
    sPickerIndex: 0,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stateH : app.hei,
    });
    //初始化时间选择
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let index = Math.floor(month/3)==0?4:Math.floor(month/3);
    let monthList = ["03","06","09","12"];
    let list = new Array();
    for(let i = index-1;i>=0;i--){
      let string = year+"年"+monthList[i]+"月";
      list.push(string);
    }
    for(let i=3;i>=index;i--){
      let string = ""+year-1+"年"+monthList[i]+"月";
      list.push(string);
    }
    this.setData({
      examTime:list,
    });
    //初始化科目先择
    let lists = new Array();
    lists.push("14一级计算机基础及WPS Office应用");
    lists.push("15一级计算机基础及MS Office应用");
    this.setData({
      subjects:lists,
    });
  },
  timePickerChange: function(e) {
    this.setData({
        tPickerIndex: e.detail.value,
    })
  },
  subPickerChange: function(e){
    this.setData({
      sPickerIndex:e.detail.value,
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
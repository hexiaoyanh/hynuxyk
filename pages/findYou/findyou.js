// pages/findYou/findyou.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stateH: null,
    inputNo: "",
    inputName: "",
    memberList: null, //用于存储查询结果
    showloading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        stateH:app.hei
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
  noInput: function (e) {
    var that = this;
    that.setData({
      inputNo: e.detail.value,
    })
  },
  nameInput: function (e) {
    var that = this;
    that.setData({
      inputName: e.detail.value,
    })
  },
  getData(param) { //接受数据函数
    let that = this;
    app.http.FindYou(param.userid,param.xm).then((res)=>{
      console.log(res.data);
      if (res.data.code != 1) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
        return;
      }
      let list = that.dealData(res.data);
      console.log(list);
      that.setData({
        memberList: list,
        showloading: false,
      })
    })
    
  },
  findPeople: function () {
    var that = this;
    that.setData({
      showloading: true,
    })
    if (that.data.inputNo == "" && that.data.inputName == "") {
      wx.showToast({
        title: '请输入学号或姓名',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let param = {
      "userid": that.data.inputNo,
      "xm": that.data.inputName
    };
    that.getData(param);
  },
  dealData(data) {
    delete data.code;
    delete data.msg;
    let list = new Array();
    let index = 0;
    for (let i in data) {
      let cur = {};
      cur.name = data[i].xm;
      cur.no = data[i].xh;
      let detailList = new Array();
      let nameList = ["班级", "年级", "学号", "姓名", "学院"];
      let y = 0;
      for (let key in data[i]) {
        let item = {};
        cur.detail = {};
        item.name = nameList[y++];
        item.value = data[i][key];
        detailList.push(item);
      }
      cur.detail = detailList;
      cur.hiddena = true;
      cur.id = index;
      list.push(cur);
      index++;
    }
    return list
  },
  isOpen: function (e) {
    var idx = Number(e.currentTarget.dataset.index);
    var that = this;
    var list = that.data.memberList;
    list[idx].hiddena = !list[idx].hiddena;
    this.setData({
      memberList: list
    });
    return true;
  },
})
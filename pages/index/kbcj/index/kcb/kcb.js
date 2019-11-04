// pages/table/table.js
var hei = wx.getMenuButtonBoundingClientRect().top;
var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var weeks = [7, 1, 2, 3, 4, 5, 6];
var date = new Date();
var currentYear = date.getFullYear();
var currentMonth = date.getMonth() + 1;
var currentDay = date.getDate();
var currentWeek = weeks[date.getUTCDay()];
var week = [];
for (var i = 0; i < currentWeek; i++) {
    week[i] = currentDay - currentWeek + i + 1;
    if (week[i] <= 0)
        week[i] = week[i] + month[currentMonth - 2];
}
for (var i = currentWeek, j = 1; i < 7; i++, j++) {
    week[i] = currentDay + j;
    if (week[i] > month[currentMonth - 1])
        week[i] = week[i] - month[currentMonth - 1];
}

const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH: hei,
        year: currentYear,
        month: currentMonth,
        day: currentDay,
        classArray:["1\\2","3\\4","5\\6","7\\8","9\\10"],
        dayArray: [{
            index: 1,
            day: week[0]
        }, {
            index: 2,
            day: week[1]
        }, {
            index: 3,
            day: week[2]
        }, {
            index: 4,
            day: week[3]
        }, {
            index: 5,
            day: week[4]
        }, {
            index: 6,
            day: week[5]
        }, {
            index: 7,
            day: week[6]
        }],
        listData: null,
        allData:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.showLoading();
        app.http.JwKb().then((res) => {
            wx.hideLoading();
            var jsons = JSON.parse(res.data['kb'])
            var listData = that.dealData(jsons);
            console.log(jsons)
            that.setData({
                listData: listData,
                allData: jsons
            })
        },(error)=>{
            wx.hideLoading();
            wx.showModal({
                title: '错误',
                content: '网络错误，请重新登录',
                success(){
                    wx.navigateTo({
                        url: '../../kbcj',
                    })
                }
            })
        })
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
    dealData: function(data) {
        var newData = Array();
        var temp = 0;
        var a = 1;
        var b = 1;
        for (var i = 0; i <= 4; ++i) {
            var nowData = Array();
            for (var j = 0; j <= 6; ++j) {
                var str = a.toString() + '-' + b.toString() + '-1';
                nowData.push(data[temp++][0][str]);
                b++;
            }
            a++;
            b = 1;
            newData.push(nowData);
        }
        return newData
    }
})
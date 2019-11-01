// pages/table/table.js
var hei = wx.getMenuButtonBoundingClientRect().top;
var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var date = new Date();
var currentYear = date.getFullYear();
var currentMonth = date.getMonth() + 1;
var currentDay = date.getDate();
var currentWeek = date.getUTCDay() + 1;
var week = [];
for (var i = 0; i < currentWeek; i++) {
    week[i] = currentDay - currentWeek + i + 2;
    if (week[i] <= 0)
        week[i] = week[i] + month[currentMonth - 2];
}
for (var i = currentWeek, j = 2; i < 7; i++ , j++) {
    week[i] = currentDay + j;
    if (week[i] > month[currentMonth - 1])
        week[i] = week[i] - month[currentMonth - 1];
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH: hei,
        year: currentYear,
        month: currentMonth,
        day: currentDay,
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
        listData: [{
            code: 1,
            myClass: "语文@计科楼南101",
        },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) { },

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

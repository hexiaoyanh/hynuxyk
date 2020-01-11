// pages/index/AccessControl/AccessControl.js
const app = getApp();
var date = new Date();
var currenttime_year = date.getFullYear();
var currenttime_month = date.getMonth() + 1;
var currenttime_day = date.getDate();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH: app.hei,
        year: currenttime_year,
        month: currenttime_month,
        day: currenttime_day,
        date: null,
        loading: true,
        allrecsum: -2,
        currentrecsum: -1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            stateH: app.hei
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        console.log(this.dealDate());
        var that = this;
        var dt = this.dealDate();
        app.http.QueryAccountDoor(this.dealDate(), "1", "0").then((res) => {
            var json = app.x2js.xml2js(res.data).ZYTK;
            that.setData({
                allrecsum: Number(json.AllRecSum)
            });
        })
        app.http.QueryAccountDoor(this.dealDate(), "1", "15").then((res) => {
            var json = app.x2js.xml2js(res.data).ZYTK;
            that.setData({
                date: json.Table,
                currentrecsum: that.data.currentrecsum += json.Table.length,
                loading: false
            });
        })
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
    dealDate() {
        var year = currenttime_year.toString();
        var month;
        if (currenttime_month <= 9)
            month = "0" + currenttime_month.toString();
        else month = currenttime_month.toString();
        var day;
        if (currenttime_day <= 9)
            day = "0" + currenttime_day.toString();
        else day = currenttime_day.toString();
        return year + month + day;
    },
    loadingmore: function(e) {
        var that = this;
        console.log(that.data.currentrecsum, that.data.allrecsum)

        that.setData({
            loading: true
        });
        if (that.data.currentrecsum == that.data.allrecsum) {
            that.setData({
                loading: false
            });
        }
        if (that.data.currentrecsum != that.data.allrecsum) {
            var table = that.data.date;
            app.http.QueryAccountDoor(this.dealDate(), that.data.currentrecsum + 1, "15").then((res) => {
                var json = app.x2js.xml2js(res.data).ZYTK;
                table = table.concat(json.Table)
                that.setData({
                    date: table,
                    currentrecsum: that.data.currentrecsum += json.Table.length,
                    loading: false
                });
            })
        }
    },
    getpsw(e) {
        console.log(e.currentTarget.id);
        wx.navigateTo({
            url: './getpsw/getpsw?value='+e.currentTarget.id,
        })
    }
})
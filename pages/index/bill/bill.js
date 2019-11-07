// pages/index/bill/bill.js
const app = getApp();
var pages = 1;

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
        current_item: 0,
        swiper_item: [{
            id: 1,
            year: currenttime_year,
            month: currenttime_month,
            allrecsum: null,
            currentsum: 0,
            over: 0,
            table: null,
            loading: true
        }, {
            id: 2,
            year: currenttime_year,
            month: currenttime_month - 1,
            allrecsum: null,
            currentsum: 0,
            over: 0,
            table: null,
            loading: true
        }],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.createNewSwiper({
            detail: {
                current: 0
            }
        });
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
    //创建开始结束时间
    createDate: function(mon) {
        var months = 0,
            years = 0;
        if (mon != 0) {
            months = mon % 12;
            years = Math.floor(mon / 12);
        }
        var month = currenttime_month - months;
        var year = currenttime_year - years;
        var day;

        if (mon != 0)
            day = new Date(year, month, 0).getDate();
        else day = currenttime_day;

        if (month <= 9) month = "0" + month.toString();
        else month = month.toString();
        if (day <= 9) day = "0" + day.toString();
        else day = day.toString();

        var beginTime = year.toString() + month + "01";
        var endTime = year.toString() + month + day;
        return {
            "beginTime": beginTime,
            "endTime": endTime
        }

    },
    //监听页面切换,生成新的标签和加载数据
    createNewSwiper: function(e) {

        var that = this;
        var nowuse = e.detail.current;
        var that = this;

        //设置当前item_id
        this.setData({
            current_item: nowuse
        });
        var sitem = this.data.swiper_item;
        var lens = sitem.length;

        //加载标签
        if (sitem[nowuse].allrecsum == null) {
            sitem[nowuse].loading = true;
            that.setData({
                swiper_item: sitem
            })
        }

        //加入新的标签
        if (nowuse + 1 == lens && sitem[lens - 1].id <= 12) {
            sitem.push({
                id: sitem[lens - 1].id + 1,
                year: sitem[lens - 1].year - (sitem[lens - 1].month == 1 ? 1 : 0),
                month: (sitem[lens - 1].month - 1) == 0 ? 12 : (sitem[lens - 1].month - 1),
                allrecsum: null,
                currentsum: 0,
                over: 0,
                table: null,
                loading: true
            })
            that.setData({
                swiper_item: sitem
            })
        }

        //加载当前标签
        if (sitem[nowuse].allrecsum == null) {
            var times = that.createDate(nowuse);
            app.http.QueryDealRec(times.beginTime, times.endTime, "0", "-1", "0", "1", "0").then((res) => {
                var json = app.x2js.xml2js(res.data).ZYTK;
                if (json.Code == "1")
                    sitem[nowuse].allrecsum = Number(json.AllRecSum);
                else sitem[nowuse].allrecsum = 0;

                that.setData({
                    swiper_item: sitem
                })

                if (json.Code == "1") {
                    // TODO:修改加载数量

                    app.http.QueryDealRec(times.beginTime, times.endTime, "0", "-1", "0", sitem[nowuse].currentsum, 15).then((res2) => {
                        var json2 = app.x2js.xml2js(res2.data).ZYTK;
                        var row = json2.Table.Row;
                        sitem[nowuse].table = that.dealdate(row);
                        if (sitem[nowuse].table.length != undefined)
                            sitem[nowuse].currentsum += sitem[nowuse].table.length;
                        else sitem[nowuse].currentsum += 1;
                        sitem[nowuse].loading = false;
                        that.setData({
                            swiper_item: sitem
                        });
                    });
                } else {
                    sitem[nowuse].allrecsum = 0;
                    sitem[nowuse].currentsum = 0;
                    sitem[nowuse].over = 1;
                    sitem[nowuse].loading = false;
                    that.setData({
                        swiper_item: sitem
                    })
                }
            })
        }
    },
    //处理日期
    dealdate: function(row) {
        if(row.length==undefined)
            row = [row]
        for (var i = 0; i < row.length; ++i) {
            var date = row[i].Date;
            date = date.split("-");
            var lens = date.length;
            date = date[lens - 1];
            row[i].Date = date;
        }
        return row;
    },
    //加载更多
    loadingmore: function(e) {
        //TODO 加载更多
        var that = this;
        var sitem = that.data.swiper_item;
        var nowuse = that.data.current_item;
        sitem[nowuse].loading = true;
        that.setData({
            swiper_item: sitem
        })
        var times = that.createDate(nowuse);
        var citem;
        sitem[nowuse].loading = false;
        if (sitem[nowuse].currentsum >= sitem[nowuse].allrecsum) {
            sitem[nowuse].over = 1;
            that.setData({
                swiper_item: sitem
            });
            return;
        }
        app.http.QueryDealRec(times.beginTime, times.endTime, "0", "-1", "0", sitem[nowuse].currentsum, 15).then((res) => {
            var json = app.x2js.xml2js(res.data).ZYTK;
            sitem[nowuse].table = sitem[nowuse].table.concat(that.dealdate(json.Table.Row))
            sitem[nowuse].currentsum += sitem[nowuse].table.length;
            that.setData({
                swiper_item: sitem
            })
        })



    },
    paymsg: function(e) {
        var that = this;
        var nowuse = Number(e.currentTarget.id);
        var data = that.data.swiper_item[that.data.current_item].table[nowuse];
        wx.navigateTo({
            url: './paymsg/paymsg?FeeName=' + data.FeeName + '&Time=' + data.Time + '&MonDeal=' + data.MonDeal + '&MonCard=' + data.MonCard + '&Source=' + data.Source,
        })
    }
})
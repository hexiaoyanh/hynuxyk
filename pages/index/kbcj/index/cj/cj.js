// pages/grade/grade.js

var hei = wx.getMenuButtonBoundingClientRect().top;
const app = getApp();
let videoAd = null

Page({

    /**
     * 页面的初始数据
     */
    data: {
        slideStyle: "slideInDown",
        stateH: hei,
        allData: null,
        memberList: null,
        pickerIndex: 0,
        schoolYear: null,
        showloading: true
    },
    isOpen: function (e) {
        var idx = Number(e.currentTarget.dataset.index);
        var that = this;
        var list = that.data.memberList;
        list[idx].hiddena = !list[idx].hiddena;
        app.http.JwPscj(that.data.allData[idx]['gradeDetail']).then((res) => {
            var datas = res.data;
            list[idx].detail[1]['value'] = datas[0];
            list[idx].detail[2]['value'] = datas[2];
            that.setData({
                memberList: list
            })
        })
        this.setData({
            memberList: list
        });
        return true;
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            stateH: app.hei
        })
        var that = this;
        var date = new Date();
        var year = date.getFullYear();
        year += 1;
        var list = Array();
        for (var i = 1; i <= 4; ++i) {
            var str = (year - i - 1).toString() + '-' + (year - i).toString() + '-1';
            var str2 = (year - i - 1).toString() + '-' + (year - i).toString() + '-2';
            list.push(str2);
            list.push(str);
        }
        that.setData({
            schoolYear: list,
            showloading: true
        })
        that.getData(list[that.data.pickerIndex]);
        that.adCreate();
    },
    adCreate: function () {
        var that = this;

        if (wx.createRewardedVideoAd) {
            videoAd = wx.createRewardedVideoAd({
                adUnitId: 'adunit-f1cbccc279268640'
            })
            videoAd.onLoad(() => {
                console.log("正在准备ad")
            })
            videoAd.onError((err) => {
                console.log(err);
                wx.showToast({
                    icon: "none",
                    title: '广告拉取失败',
                })
            })
            videoAd.onClose((res) => {
                console.log(res);
                if (res && res.isEnded) {
                    app.http.ViewAd();
                    var time;
                    var index = that.data.pickerIndex;
                    time = that.data.schoolYear[index];
                    wx.navigateTo({
                        url: './pm/pm?time=' + time,
                    })

                } else {
                    // 播放中途退出，不下发游戏奖励
                    wx.showModal({
                        title: '好吧',
                        content: '看广告才能查排名哦，还有GPA，难道你不想知道自己考的怎么样吗🤭',
                    })
                }
            })
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
     * 排名按钮点击事件
     */
    rankTap: function () {
        wx.getStorage({
            key: 'Jwnanyue',
            success: function (res) {
                console.log(res.data);
                if (res.data == true) {
                    wx.showModal({
                        'title': "8行",
                        'content': "南岳学院的暂时8行",
                        cancelColor: 'cancelColor',
                    })
                }else if (videoAd) {
                    videoAd.show().catch(() => {
                        // 失败重试
                        videoAd.load()
                            .then(() => videoAd.show())
                            .catch(err => {
                                console.log('激励视频 广告显示失败')
                            })
                    })
                } else {
                    wx.showToast({
                        'icon': 'none',
                        title: '广告加载出现问题',
                    })
                }
            },
        })

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    getData: function (str) {
        var that = this;
        app.http.JwCj(str).then((res) => {
            var jsons = JSON.parse(res.data['cj'])
            var list = that.dealData(jsons);
            console.log(list);
            that.setData({
                allData: jsons,
                memberList: list,
                showloading: false
            })
        })
    },
    pickerChange: function (e) {
        this.setData({
            pickerIndex: e.detail.value,
            showloading: true
        })
        var list = this.data.schoolYear;
        this.getData(list[e.detail.value]);
    },
    dealData: function (data) {
        var list = Array();
        console.log(data)
        for (var i in data) {
            var conf = {
                cont: data[i]['className'],
                gradeTotal: data[i]['grade'],
                hiddena: true,
                id: i,
                detail: [{
                        name: "课程名：",
                        value: data[i]['className']
                    },
                    {
                        name: "平时成绩：",
                        value: "加载中",
                    },
                    {
                        name: "考试成绩：",
                        value: "加载中",
                    },
                    {
                        name: "学分：",
                        value: data[i]['classgrade'],
                    },
                    {
                        name: "课程类型：",
                        value: data[i]['courseCategory'],
                    },
                    {
                        name: "类型：",
                        value: data[i]['examinationNature']
                    }
                ]
            }
            list.push(conf);
        }
        return list;
    }
})
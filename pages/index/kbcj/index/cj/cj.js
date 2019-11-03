// pages/grade/grade.js

var hei = wx.getMenuButtonBoundingClientRect().top;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        slideStyle: "slideInDown",
        stateH: hei,
        memberList: [
            {
                cont: "语文",
                gradeTotal: "100.0",
                hiddena: true,
                id: "0",
                detail: [
                    {
                        name: "平时成绩",
                        value: "100.0",
                    },
                    {
                        name: "考试成绩",
                        value: "100.0",
                    },
                    {
                        name: "学分",
                        value: "4",
                    },
                    {
                        name: "课程类型",
                        value: "必修",
                    },
                ]
            }
        ]
    },
    isOpen: function (e) {
        var idx = e.currentTarget.dataset.index;
        console.log(idx);
        var list = this.data.memberList;
        console.log(list);
        console.log(list.length);
        for (let i = 0; i < list.length; i++) {
            if (idx == i) {
                list[i].hiddena = !list[i].hiddena;
            }
        }
        this.setData({ memberList: list });
        return true;
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
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

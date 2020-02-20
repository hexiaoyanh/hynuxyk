// pages/myself/myself.js
const app = getApp();
var hei = wx.getMenuButtonBoundingClientRect().top;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH:hei,
        name:"",
        id:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            name:app.http.AccName,
            id: app.http.UserNumber
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
    logout:function(e){
        wx.clearStorage();
        wx.reLaunch({
            url: '../login/login',
        })
    },
    about:function(e){
        var temp = 0;
        var header = "关于";
        var text = "此小程序是由衡阳师范学院ACM竞赛组成员MikaHe和EnderXiao所制作,还有EnderXiao的老婆フレイア,有问题请联系QQ:785010323";
        var conf = {
            title: header,
            content: text,
            success(res)
            {
                if(res.confirm)
                {
                    temp ++;
                    if(temp==5)
                    {
                        header = "嘻嘻";
                        text = "欢迎加入ACM";
                        conf = {
                            title: header,
                            content: text,
                        }
                    }
                    
                    wx.showModal(conf)
                }
            }
        }
        wx.showModal(conf)
    },
    record:function(){
        wx.navigateTo({
            url: './record/record',
        })
    },
    change:function(){
        wx.navigateTo({
            url: './change/change',
        })
    }
})
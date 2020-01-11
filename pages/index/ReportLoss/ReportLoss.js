// pages/index/ReportLoss/ReportLoss.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH: app.hei, 
        showPassword: false,
        // 输入框参数设置
        inputData: {
            input_value: "",//输入框的初始内容
            value_length: 0,//输入框密码位数
            isNext: false,//是否有下一步的按钮
            get_focus: true,//输入框的聚焦状态
            focus_class: true,//输入框聚焦样式
            value_num: [1, 2, 3, 4, 5, 6],//输入框格子数
            height: "98rpx",//输入框高度
            width: "604rpx",//输入框宽度
            see: false,//是否明文展示
            interval: true,//是否显示间隔格子
        },
        states:"加载中......"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(app.http.AccStatus)
        var that = this;
        if(app.http.AccStatus == "1")
            that.setData({
                states:"可用"
            })
        else that.setData({
            states:"不可用"
        })
        this.setData({
            stateH: app.hei
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
    report:function(e){

    },
    valueSix(e) {
        this.hidePassBord()
        // 模态交互效果
        var that = this;
        var psd = e.detail;
        app.http.ReportLost(app.http.OtherPassword(psd)).then((res)=>{
            console.log(res);
            var json = app.x2js.xml2js(res.data).ZYTK;
            if(json.Code=="1")
                wx.showModal({
                    title: '成功',
                    content: '成功挂失',
                    success(){
                        that.setData({
                            states:"不可用"
                        })
                    }
                })
            else wx.showModal({
                title: '错误',
                content: json.Msg,
            })
        })
        
    },
    //显示交易密码框
    passwordInput: function (e) {
        this.setData({
            showPassword: true,
        })
    },
    //隐藏交易密码框
    hidePassBord() {
        this.setData({
            showPassword: false,
        })
    },
})
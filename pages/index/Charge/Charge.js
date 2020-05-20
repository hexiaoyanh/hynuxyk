// pages/index/Charge/Charge.js
const app = getApp()
var Money = ""
Page({

    /**
     * 页面的初始数据
     */
    data: {
        BankName: "",
        BankCard: "",
        showPassword: false,
        // 输入框参数设置
        inputData: {
            input_value: "", //输入框的初始内容
            value_length: 0, //输入框密码位数
            isNext: false, //是否有下一步的按钮
            get_focus: true, //输入框的聚焦状态
            focus_class: true, //输入框聚焦样式
            value_num: [1, 2, 3, 4, 5, 6], //输入框格子数
            height: "98rpx", //输入框高度
            width: "604rpx", //输入框宽度
            see: false, //是否明文展示
            interval: true, //是否显示间隔格子
        },
        stateH: app.hei
    },
    valueSix(e) {
        this.hidePassBord()
        // 模态交互效果
        var code = app.http.Recharge(Money, e.detail).then((res) => {
            console.log(res.data);
            var json = app.x2js.xml2js(res.data).ZYTK;
            console.log(json)
            if (json.Code == "1") {
                wx.showModal({
                    title: '提交成功',
                    content: '充值提交成功, 已将请求发送至服务器，请稍后返回主页下拉刷新查看。',
                    success(res) {
                        wx.navigateBack({
                            delta: 1,
                        })
                    }
                })

            } else {
                wx.showModal({
                    title: '错误',
                    content: json.Msg,
                    success(res) {
                        wx.navigateBack({
                            delta: 1,
                        })
                    }
                })
            }
        })


    },
    //显示交易密码框
    passwordInput: function(e) {
        var objData = e.detail.value;
        if (objData.money == "") {
            wx.showModal({
                title: '错误',
                content: '金额不能为空',
            });
            return;
        }
        this.setData({
            showPassword: true,
        })
        Money = objData.money;
    },
    //隐藏交易密码框
    hidePassBord() {
        this.setData({
            showPassword: false,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app.http.QueryAccInfo().then((res) => {
            this.setData({
                BankName: app.http.BankName,
                BankCard: app.http.BankCard.substr(app.http.BankCard.length - 4)
            })
        })
        this.setData({
            stateH: app.hei
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
})
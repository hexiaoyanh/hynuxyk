// pages/index/Scan/Scan.js
const app = getApp();
var xml = require('../../../http/xml/dom-parser.js')
var xmlParser = new xml.DOMParser();
var arrays;
var hei = wx.getMenuButtonBoundingClientRect().top;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        where: "",
        who: "",
        had: "",
        money: "",
        stateH:hei,
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
    },
    valueSix(e) {
        this.hidePassBord()
        // 模态交互效果
        wx.showLoading();
        var code = 0;
        var msg;
        app.http.getRandomNum().then((res) => {
            app.http.getOrderNum().then((res) => {
                app.http.Pay(arrays[4], arrays[7], arrays[8], e.detail, arrays[6] * 0.01).then((res) => {
                    var doc = xmlParser.parseFromString(res.data);
                    code = doc.getElementsByTagName('Code')['0'].firstChild.data.toString();
                    msg = doc.getElementsByTagName('Msg')['0'].firstChild.data.toString();
                    wx.hideLoading();
                    if (code == "1") {
                        wx.showModal({
                            title: '成功',
                            content: '支付成功',
                            success(res) {
                                wx.switchTab({
                                    url: '../index',
                                })
                            }
                        })
                    } else {
                        wx.showModal({
                            title: '错误',
                            content: msg,
                            success() {
                                wx.switchTab({
                                    url: '../index',
                                })
                            }
                        })

                    }
                })
            })
        })

    },
    //显示交易密码框
    passwordInput: function(e) {
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var array = options.array.split(',');
        var that = this;
        arrays = array;
        if (array[1] != "3") {
            wx.showModal({
                title: '错误',
                content: '暂不支持此功能',
                success(res) {
                    if (res.confirm) {
                        wx.navigateBack({

                        });
                        return;
                    } else if (res.cancel) {
                        wx.navigateBack({

                        });
                        return;
                    }
                }
            });

        }
        if (array[1] == "3")
            app.http.GetDealerInfo(array[4], array[7], array[8]).then((res) => {
                var doc = xmlParser.parseFromString(res.data);
                var DealerName = doc.getElementsByTagName('DealerName')['0'].firstChild.data.toString();
                var MonDBCur = doc.getElementsByTagName('MonDBCur')['0'].firstChild.data.toString();
                that.setData({
                    where: DealerName,
                    who: app.http.AccName,
                    had: MonDBCur,
                    money: array[6] * 0.01
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

    }
})
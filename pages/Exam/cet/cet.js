// pages/Exam/cet/cet.js

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH: null,
        name: "",
        id_num:"",
        verify_img:"",
        cookie:"",
        verify_code:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            stateH: app.hei,
        });
        var that = this;
        wx.getStorage({
            key: 'AccName',
            success: function(res) {
                that.setData({
                    name:res.data
                })
            },
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
    changeid:function(e){
        this.setData({
            id_num:e.detail.value
        })
    },
    changename:function(e){
        this.setData({
            name:e.detail.value
        })
    },
    changeverify:function(e){
        this.setData({
            verify_code:e.detail.value
        })
    },
    getverify: function() {
        var that = this;
        if(that.data.name=="" || that.data.id_num==""){
            wx.showModal({
                title: '错误',
                content: '请先输入准考证号和姓名',
            })
            return;
        };
        wx.showLoading({
            title: '获取验证码中',
        });
        app.http.CetGetVerify(that.data.id_num,that.data.name).then((res)=>{
            console.log(res);
            if(res.data.code == "-1"){
                wx.showModal({
                    title: '错误',
                    content: res.data.msg,
                });
                return;
            }
            wx.hideLoading();
            that.setData({
                verify_img:res.data.base64,
                cookie:res.data.cookies
            })
        })
    },
    submits:function(){
        var that = this;
        if(that.data.verify_code == ""){
            wx.showModal({
                title: '错误',
                content: '请输入验证码',
            });
        }
        wx.showLoading({
            title: '获取中',
        });
        app.http.CetGetScore(that.data.id_num,that.data.name,that.data.verify_code,that.data.cookie).then((res)=>{
            wx.hideLoading();
            if (res.data.code == "-1") {
                wx.showModal({
                    title: '错误',
                    content: res.data.msg,
                });
                that.getverify();
                that.setData({
                    verify_code:""
                });
                return;
            }
            wx.navigateTo({
                url: './cj/cj?id_num=' + that.data.id_num + "&listening=" + res.data.listending + "&name=" + res.data.name + "&reading=" + res.data.reading + "&school=" + res.data.school + "&writing=" + res.data.writing + "&score=" + res.data.score,
            })
        })
    }
})
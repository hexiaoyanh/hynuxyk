// pages/changPassword/change.js

var hei = wx.getMenuButtonBoundingClientRect().top;
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH: hei,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
    changep1: function(e) {
        var objData = e.detail.value;
        console.log(objData);
        if (!(objData.oldpassword && objData.newpassword && objData.newpassword2))
            wx.showModal({
                title: '错误',
                content: '请输入完整信息',
            })
        if(objData.newpassword!=objData.newpassword2)
            wx.showModal({
                title: '错误',
                content: '两次密码不一致',
            })
        if(objData.newpassword == objData.oldpassword)
            wx.showModal({
                title: '错误',
                content: '新密码不能与旧密码一致',
            })
        app.http.ModifyPassword(objData.oldpassword,objData.newpassword,1).then((res)=>{
            var jsons = app.x2js.xml2js(res.data).ZYTK;
            console.log(jsons);
            if(jsons.Code!="1")
                wx.showModal({
                    title: '错误',
                    content: jsons.Msg,
                })
            else
                wx.showModal({
                    title: '成功',
                    content: jsons.Msg,
                    success(){
                        wx.redirectTo({
                            url: '../../login/login',
                        })
                    }
                })
        })
    },
    changep2: function(e) {
        var objData = e.detail.value;
        console.log(objData);
        if (!(objData.oldpassword && objData.newpassword && objData.newpassword2))
            wx.showModal({
                title: '错误',
                content: '请输入完整信息',
            })
        if (objData.newpassword != objData.newpassword2)
            wx.showModal({
                title: '错误',
                content: '两次密码不一致',
            })
        if (objData.newpassword == objData.oldpassword)
            wx.showModal({
                title: '错误',
                content: '新密码不能与旧密码一致',
            })
        app.http.ModifyPassword(objData.oldpassword, objData.newpassword, 2).then((res) => {
            var jsons = app.x2js.xml2js(res.data).ZYTK;
            console.log(jsons);
            if (jsons.Code != "1")
                wx.showModal({
                    title: '错误',
                    content: jsons.Msg,
                })
            else
                wx.showModal({
                    title: '成功',
                    content: jsons.Msg,
                    success() {
                        wx.redirectTo({
                            url: '../../login/login',
                        })
                    }
                })
        })
    }
})
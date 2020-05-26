// pages/myself/addata/addata.js
const app=getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		stateH: app.hei,
		datas:null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
            stateH:app.hei
		})
		var that = this;
		app.http.GetAdData().then((res)=>{
			var data = []
			console.log(res.data);
			for(var i in res.data){
				var temp = {
					"userid":i,
					"username":res.data[i].username,
					"num":res.data[i].adviewnum
				}
				data.push(temp);
			}
			console.log(data)
			that.setData({
				datas:data
			})
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

	}
})
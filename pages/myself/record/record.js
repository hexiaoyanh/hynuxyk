// pages/myself/record/record.js

var hei = wx.getMenuButtonBoundingClientRect().top;
// 在页面中定义插屏广告
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateH: hei,
        priceIndexNow: -1,//当前选择金额标号，6为自定义金额
        priceNow: 0,//当前选择金额数目
        chosePrice: null,//可选金额列表
        hiddenmodalput:true,
        commend:"",//评论内容
        item: [//捐赠榜单内容及格式
            {
                no : 0,
                name: 'MIKA',
                num: '100000',
            },
            {
                no : 1,
                name: 'MIKE',
                num: '10',
            },
            {
                no : 2,
                name: '何老师',
                num: '10',
            },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let priceNum = [1,5,10,20,50,100,"自行选择金额"];
        let price = new Array();
        for(let i = 0;i<3;i++){
            price[i] = new Array();
            for(let j = 0;j<3&&i*3+j<priceNum.length;j++){
                console.log(priceNum[i*3+j]);
                price[i][j] = {
                    id: i*3+j,
                    num: priceNum[i*3+j],
                    status: "",
                }
            }
        }
        that.setData({
            chosePrice: price,
        });
        console.log(that.data.chosePrice);
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
    //可选择金额状态变化
    //参数 id:需要改变的可选项目的ID
    choseChange:function (id) {
        let that = this
        if(id == -1)
            return;
        id = parseInt(id);
        let col = id%3;
        let row = (id - col)/3;
        let choseBlock = that.data.chosePrice;
        for (let i = 0; i < choseBlock.length; i++) {
            if(i != row)continue;
            for (let j = 0; j < choseBlock[i].length; j++) {
                if(j == col){
                    if(choseBlock[i][j].status == "chosed")
                        choseBlock[i][j].status = "";
                    else
                        choseBlock[i][j].status = "chosed";
                }
            }
        }
        that.setData({
            chosePrice: choseBlock,
        })
    },
    //点击预设金额事件
    clickPrice:function(e){
        let that = this;
        let clickId = e.target.id;
        that.choseChange(that.data.priceIndexNow);
        that.setData({
            priceIndexNow: clickId,
        })
        that.getPrice(),
        that.choseChange(clickId);
    },
    //获取当前选择金额
    getPrice:function(){
        let that = this
        let id = parseInt(that.data.priceIndexNow);
        let col = id%3;
        let row = (id - col)/3;
        let choseBlock = that.data.chosePrice;
        for (let i = 0; i < choseBlock.length; i++) {
            if(i != row)continue;
            for (let j = 0; j < choseBlock[i].length; j++) {
                if(j == col){
                    that.setData({
                        priceNow: choseBlock[i][j].num,
                    })
                }
            }
        }
    },
    showModal:function(){
        this.setData({
            hiddenmodalput: false,
            priceNow:  0,
        });
    },
    hideMpdal:function(){
        this.setData({
            hiddenmodalput: true,
        })
    },
    //点击自定义金额按钮事件
    inputPrice:function (e){
        let that = this;
        let clickId = e.target.id;
        that.choseChange(that.data.priceIndexNow);
        that.setData({
            priceIndexNow: clickId,
        })
        that.choseChange(clickId);
        that.showModal();
    },
    //输入自定义金额事件
    selfInputPrice:function (e){
        let that = this;
        that.setData({
            priceNow: e.detail.value,
        })
    },
    //取消按钮
    cancel: function () {
        this.setData({
            hiddenmodalput: true,
            priceNow: 0,
        });
    },
    //确认  
    confirm: function (e) {
        let that = this;
        this.setData({
            hiddenmodalput: true,
        });
        if(that.data.priceNow == 0)
        return;
        let choseBlock = that.data.chosePrice;
        choseBlock[2][0].num = that.data.priceNow+"元";
        that.setData({
            chosePrice: choseBlock,
        })
        console.log();
    },
    //支付按钮点击事件
    pay:function () {
        let that = this;
        let price = parseInt(that.data.priceNow);
        console.log(price);
        wx.requestPayment({
            timeStamp: '',
            nonceStr: '',
            package: '',
            signType: 'MD5',
            paySign: '',
            success (res) { },
            fail (res) { }
          })
    },
    //输入留言事件
    commend: function(e){
        let that = this;
        that.setData({
            commend: e.detail.value,
        })
    },
    //留言按钮点击事件
    commendSubmit:function (){
        let that = this;
        console.log(that.data.commend);
    }
})
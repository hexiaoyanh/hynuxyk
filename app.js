import {
    http
} from "http/http.js"
var X2JS = require('./http/x2j/x2js/we-x2js.js');

App({
    globalData: {
        http: null,
        x2js:null,
        hei:null
    },
    /** 
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次） 
     */
    onLaunch: function () {
        this.hei = wx.getMenuButtonBoundingClientRect().top;
        this.http = new http();
        this.x2js = new X2JS();

        //监测小程序更新
        if (wx.canIUse("getUpdateManager")) {
            let updateManager = wx.getUpdateManager();
            updateManager.onCheckForUpdate((res) => {
                // 请求完新版本信息的回调
                console.log(res.hasUpdate);
            })
            updateManager.onUpdateReady(() => {
                wx.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启应用？',
                    success: (res) => {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate();
                        } else if (res.cancel) {
                            return false;
                        }
                    }
                })
            })
            updateManager.onUpdateFailed(() => {
                // 新的版本下载失败
                wx.hideLoading();
                wx.showModal({
                    title: '升级失败',
                    content: '新版本下载失败，请检查网络！',
                    showCancel: false
                });
            });
        }
        var conf = {
            title: '提示',
            content: '本程序为校园卡第三方程序，登录密码为校园卡密码，我们不会上传您的任何数据，服务器端代码开源地址为：https://github.com/hexiaoyanh/hynuxykbackstage，图片来自于Alto\'s Adventure，如有疑问请联系QQ：785010323，我们不负任何法律责任。',
            cancelText: '不再显示',
            confirmText: '确定',
            success(res) {
                if (res.cancel) {
                    wx.setStorage({
                        key: 'msgconfim',
                        data: '1',
                    })
                }
            }
        };
        wx.getStorage({
            key: 'msgconfim',
            success: function(res) {
            },
            fail(res){
                wx.showModal(conf);
            }
        })
        
        //提示语
    },

    /** 
     * 当小程序启动，或从后台进入前台显示，会触发 onShow 
     */
    onShow: function (options) {

    },

    /** 
     * 当小程序从前台进入后台，会触发 onHide 
     */
    onHide: function () {

    },

    /** 
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息 
     */
    onError: function (msg) {

    }
});
// pages/personal/personal.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    name:"",
    avatarUrl:"",
    notLogin:"",
    login:""
  },
  //扫二维码事件响应程序
  tapname:function(){
    //调用接口
    wx.scanCode({
      success(res) {
        //返回结果
        console.log(res.result)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //如果用户已经授权，那么直接从全局的app.js的data数据中获取用户信息
          that.setData({ name: app.globalData.userInfo.nickName});
          that.setData({ avatarUrl: app.globalData.userInfo.avatarUrl});
          that.setData({notLogin:"none"});
          that.setData({login:"block"})
          //加密字符串发送到后端，后端获取用户信息
          // wx.request({
          //   url: 'https://www.bigstudentm.com/smallapp/demo.php',
          //   data: {
          //     encryptedData: app.globalData.encryptedData,
          //     iv: app.globalData.iv,
          //     session_key: wx.getStorageSync('session_key')
          //   },
          //   method: 'GET',
          //   success(res) {
          //     console.log(res);
          //     console.log(app.globalData.encryptedData);
          //     console.log(app.globalData.iv);
          //     console.log(wx.getStorageSync('session_key'))
          //     //wx.setStorageSync('session_key', res.data.session_key);
          //   }
          // })
        }else{
          that.setData({notLogin:"block"});
          that.setData({login:"none"});
        }
      }
      
    })
  },
  bindGetUserInfo:function(){
    var that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //点击登录后授权成功，获取用户信息，保存到全局app.js中
          wx.getUserInfo({
            withCredentials:true,
            success:function(res){
              app.globalData.userInfo = res.userInfo;
              that.setData({ name: app.globalData.userInfo.nickName });
              that.setData({ avatarUrl: app.globalData.userInfo.avatarUrl });
              that.setData({ notLogin: "none" });
              that.setData({ login: "block" })
            }
          })

        }else{
          that.setData({ notLogin: "block" });
          that.setData({ login: "none" });
        }
      }

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
  zhuye: function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  seat: function () {
    wx.navigateTo({
      url: '../seat/seat',
    })
  },
  yonghu: function () {
    wx.navigateTo({
      url: '../person/person',
    })
  },
  yuyue: function () {
    wx.navigateTo({
      url: '../yuyue/yuyue',
    })
  }
})
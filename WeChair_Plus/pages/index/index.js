//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    z1:1,
    z2:2,
    z3:3,
    background1:"rgba(255,255,255,0.6)",
    background2:"rgba(0,0,0,0.4)",
    background3:"rgba(0,0,0,0.4)",
    h:wx.getSystemInfoSync().windowHeight-70,
    w:wx.getSystemInfoSync().windowWidth/2-25
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tapSaoma: function () {
    //调用接口
    wx.scanCode({
      success(res) {
        var seat = res.result;
        console.log(seat);
        //未登录
        if (wx.getStorageSync('openid') == '' || wx.getStorageSync('session_key') == '') {
          wx.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 2000
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../person/person',
            })
          }, 2000)
        };
        //请求该座位的状态
        wx.request({
          url: 'https://wechair.com.cn/ChairsManagementController/scanChair', //仅为示例，并非真实的接口地址
          data: {
            seat_num: seat,
            open_id: wx.getStorageSync('openid'),
            session_key: wx.getStorageSync('session_key')
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data);
            if(res.data.status == 1){
              //上座成功
              wx.showToast({
                title: '上座成功',
                icon: 'success',
                duration: 2000
              });
            }else if(res.data.status == 2){
              //该座位为空闲座位
              wx.showModal({
                title: '使用',
                content: '您是否要使用该座位',
                success(res) {
                  if (res.confirm) {
                    wx.request({
                      url: 'https://wechair.com.cn/ChairsManagementController/conformUsing', //仅为示例，并非真实的接口地址
                      data: {
                        seat_num: seat,
                        open_id: wx.getStorageSync('openid'),
                        session_key: wx.getStorageSync('session_key')
                      },
                      method: "GET",
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success(res) {
                        console.log(res.data);
                        if (res.data.result == 0) {
                          //选座失败
                          wx.showToast({
                            title: '失败',
                            icon: 'none',
                            duration: 2000
                          });
                          setTimeout(function () {
                            wx.navigateTo({
                              url: '../person/person',
                            })
                          }, 2000)
                        } else if (res.data.result == 1){
                          wx.showToast({
                            title: '成功',
                            icon: 'success',
                            duration: 2000
                          });
                          setTimeout(function () {
                            wx.navigateTo({
                              url: '../yuyue/yuyue',
                            })
                          }, 2000)
                        } 
                      }
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }else if(res.data.status == 4){
              wx.showToast({
                title: '您已预约或使用座位！',
                icon: 'none',
                duration: 2000
              });
              setTimeout(function () {
                wx.navigateTo({
                  url: '../yuyue/yuyue',
                })
              }, 2000)
            }else if(res.data.status == 5){
              wx.showToast({
                title: '该座位已被使用！',
                icon: 'none',
                duration: 2000
              });
            }
          }
        })
      }
    })
  },
  onLoad: function () {
    var num = 2;
    var that = this;
    function alwaysPlay(that){
      switch(num){
        case 2:
          that.setData({z1:2});
          that.setData({z2:3});
          that.setData({z3:1});
          that.setData({ background2:"rgba(255,255,255,0.6)"});
          that.setData({background1:"rgba(0,0,0,0.4)"});
          that.setData({background3: "rgba(0,0,0,0.4)"});
          if(num > 3){
            num = 1;
          }
          num++;
          setTimeout(alwaysPlay,2000,that);
          break;
        case 3:
          that.setData({z3:2});
          that.setData({z2:1});
          that.setData({z1:3});
          that.setData({ background1: "rgba(0,0,0,0.4)" });
          that.setData({ background2: "rgba(0,0,0,0.4)" });
          that.setData({ background3: "rgba(255,255,255,0.6)" });
          if(num > 3){
            num = 1;
          }
          num++;
          setTimeout(alwaysPlay,2000,that);
          break;
        default:
          that.setData({z3:3});
          that.setData({z2:2});
          that.setData({z1:1});
          that.setData({ background3: "rgba(0,0,0,0.4)" });
          that.setData({ background2: "rgba(0,0,0,0.4)" });
          that.setData({ background1: "rgba(255,255,255,0.6)" });
          if (num > 3) {
            num = 1;
          }
          num++;
          setTimeout(alwaysPlay,2000,that);
      }
    }
    setTimeout(alwaysPlay,2000,that);
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  //  },
  // bindGetUserInfo(e) {
  //   console.log(e.detail.userInfo)
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  },
  zhuye: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  seat: function () {
    wx.redirectTo({
      url: '../seat/seat',
    })
  },
  yonghu: function () {
    wx.redirectTo({
      url: '../person/person',
    })
  },
  yuyue: function () {
    wx.redirectTo({
      url: '../yuyue/yuyue',
    })
  }
})
//轮播图



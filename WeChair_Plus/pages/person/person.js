// pages/demo1/demo1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //底部导航的定位
    h: wx.getSystemInfoSync().windowHeight - 70,
    w: wx.getSystemInfoSync().windowWidth / 2 - 25,
    //存放用户信息
    userInfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权

    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo;
              app.globalData.encryptedData = res.encryptedData;
              app.globalData.iv = res.iv;
              that.setData({
                userInfo: res.userInfo,
              });

              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: function (res) {
                  wx.request({
                    url: 'https://wechair.com.cn/LoginController/decodeUserInfo',
                    data: {
                      code: res.code,
                      encryptedData: app.globalData.encryptedData,
                      iv: app.globalData.iv
                    },
                    method: 'GET',
                    success(res) {

                      wx.setStorageSync('session_key', res.data.session_key);
                      wx.setStorageSync('openid', res.data.open_id);
                      //测试
                
                      console.log(res.data);
                      console.log(wx.getStorageSync('session_key'));
                      console.log(wx.getStorageSync('openid'));
                      
                    }
                  })
                },
              });

            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },
  
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      app.globalData.encryptedData = e.detail.encryptedData;
      app.globalData.iv = e.detail.iv;
      wx.login({
        success: function (res) {
          wx.request({
            url: 'https://wechair.com.cn/LoginController/decodeUserInfo',
            data: {
              code: res.code,
              encryptedData: app.globalData.encryptedData,
              iv: app.globalData.iv
            },
            method: 'GET',
            success(res) {

              wx.setStorageSync('session_key', res.data.session_key);
              wx.setStorageSync('openid', res.data.open_id);
              console.log(res.data);
              console.log(wx.getStorageSync('session_key'));
              console.log(wx.getStorageSync('openid'));

            }
          })
        },
      });
      that.setData({
        isHide: false,
        userInfo: e.detail.userInfo
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
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
            if (res.data.status == 1) {
              //上座成功
              wx.showToast({
                title: '上座成功',
                icon: 'success',
                duration: 2000
              });
            } else if (res.data.status == 2) {
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
                        } else if (res.data.result == 1) {
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
            } else if (res.data.status == 4) {
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
            } else if (res.data.status == 5) {
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
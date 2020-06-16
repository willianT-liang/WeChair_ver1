// pages/seat/seat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [1,2,3,4,5,6,7,8,9,10,11,12,13],
    one_one: "green",
    one_two: "green",
    one_three: "green",
    one_four: "green",
    two_one: "green",
    two_two: "green",
    two_three:"green",
    two_four: "green",
    three_one: "green",
    three_two: "green",
    three_three: "green",
    three_four: "green",
    four_one: "green",
    four_two: "green",
    four_three: "green",
    four_four: "green",
    five_one: "green",
    five_two: "green",
    five_three: "green",
    five_four: "green",
    six_one: "green",
    six_two: "green",
    six_three: "green",
    six_four: "green",
    seven_one: "green",
    seven_two: "green",
    seven_three: "green",
    seven_four: "green",
    eight_one: "green",
    eight_two: "green",
    eight_three: "green",
    eight_four: "green",
    nine_one: "green",
    nine_two: "green",
    nine_three: "green",
    nine_four: "green",
    ten_one: "red",
    ten_two: "green",
    ten_three: "green",
    ten_four: "green",
    //底部导航的定位
    h: wx.getSystemInfoSync().windowHeight - 70,
    w: wx.getSystemInfoSync().windowWidth / 2 - 25,
  },
  // 选座响应程序
  select: function(event){
      // if (wx.getStorageSync('openid') == '' || wx.getStorageSync('session_key')==''){
        // wx.showToast({
        //   title: '请先登录',
        //   icon: 'none',
        //   duration: 2000
        // });
        // setTimeout(function () {
        //   wx.navigateTo({
        //     url: '../person/person',
        //   })
        // }, 2000)
      // };

      if(event.currentTarget.dataset.status == "green"){
        wx.showModal({
          title: '选座',
          content: '您确定要选该座位吗？',
          success(res) {
            if (res.confirm) {
              wx.request({
                url: 'https://wechair.com.cn/ChairsManagementController/seatReservation', 
                data: {
                  seat_num: event.currentTarget.dataset.hi,
                  open_id: wx.getStorageSync('openid'),
                  session_key: wx.getStorageSync('session_key')
                },
                method:"GET",
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  console.log(res.data);
                  if (res.data.result == 0){
                    //选座失败
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
                  } else if(res.data.result == -1){
                    wx.showToast({
                      title: '您有正在使用的座位！',
                      icon: 'none',
                      duration: 2000
                    });
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
                  }else if(res.data.result == -3){
                    wx.showToast({
                      title: '您有正在预约的座位！',
                      icon: 'none',
                      duration: 2000
                    });
                  }else if(res.data.result == -4){
                    wx.showToast({
                      title: '您本日违规预约超过3次!',
                      icon: 'none',
                      duration: 2000
                    });
                  }else if (res.data.result == -2){
                    wx.showToast({
                      title: '请先实名认证',
                      icon: 'none',
                      duration: 2000
                    });
                    setTimeout(function () {
                      wx.navigateTo({
                        url: '../person/person',
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
      } else if (event.currentTarget.dataset.status == "red"){
        console.log("当前座位有人在使用");
      }else{
        console.log("当前座位被人预约了")
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://wechair.com.cn/ChairsManagementController/showChairsDistribution', 
      data: {
        show:"weChair"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"GET",
      success(res) {
        console.log(res);
        that.setData({one_one:res.data.one_one});
        that.setData({one_two: res.data.one_two});
        that.setData({one_three: res.data.one_three});
        that.setData({one_four: res.data.one_four});
        that.setData({two_one: res.data.two_one});
        that.setData({two_two: res.data.two_two});
        that.setData({two_three: res.data.two_three});
        that.setData({two_four: res.data.two_four});
        that.setData({three_one: res.data.three_one});
        that.setData({three_two: res.data.three_two});
        that.setData({three_three: res.data.three_three});
        that.setData({three_four: res.data.three_four});
        that.setData({four_one: res.data.four_one});
        that.setData({four_two: res.data.four_two});
        that.setData({four_three: res.data.four_three});
        that.setData({four_four: res.data.four_four});
        that.setData({five_one: res.data.five_one});
        that.setData({five_two: res.data.five_two});
        that.setData({five_three: res.data.five_three});
        that.setData({five_four: res.data.five_four});
        that.setData({six_one: res.data.six_one});
        that.setData({six_two: res.data.six_two});
        that.setData({six_three: res.data.six_three});
        that.setData({six_four: res.data.six_four});
        that.setData({seven_one: res.data.seven_one});
        that.setData({seven_two: res.data.seven_two});
        that.setData({seven_three: res.data.seven_three});
        that.setData({seven_four: res.data.seven_four});
        that.setData({eight_one: res.data.eight_one});
        that.setData({eight_two: res.data.eight_two});
        that.setData({eight_three: res.data.eight_three});
        that.setData({eight_four: res.data.eight_four});
        that.setData({nine_one: res.data.nine_one});
        that.setData({nine_two: res.data.nine_two});
        that.setData({nine_three: res.data.nine_three});
        that.setData({nine_four: res.data.nine_four});
        that.setData({ten_one: res.data.ten_one});
        that.setData({ten_two: res.data.ten_two});
        that.setData({ten_three: res.data.ten_three});
        that.setData({ten_four: res.data.ten_four});
      }
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


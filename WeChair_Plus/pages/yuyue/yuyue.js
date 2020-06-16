// pages/yuyue/yuyue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否显示正在预约
    appointingShow: false,
    appointingRoomName: '北书库2',
    appointingStatus: '带使用',
    appointingSeat: '1桌1座',
    appointingNum:0,
    second:10,
    minute: 0,
    appointNum:0,
    appointingDate: "2020-5-25 8:25",
    usedAppointNum: [],
    usedAppointRoomName: [],
    usedAppointStatus: [],
    usedAppointSeat: [],
    usedAppointDate: [],
    usedAppointNumber:0,
    //是否显示正在使用
    usingShow: false,
    usingRoomName: '北书库2',
    usingStatus: '正使用',
    usingSeat: '1桌1座',
    usingDate: '2020-5-25 8:20',
    usingNum:0,
    useAllNum:0,
    usedNum: [],
    usedNumber:0,
    usedRoomName: [],
    usedStatus: [],
    usedSeat:[],
    usedDate: [],
    //预约部分渲染
    view: 1,
    allAppointStyle: "2px solid #E1E2DD",
    waitUseStyle: "none",
    alreadyCancelStyle: "none",
    yuyueNavStyle: "2px solid #E1E2DD",
    shiyonNavStyle: "none",
    //顶部渲染
    topView: 1,
    //使用部分渲染
    useView:1,
    allUseStyle: "2px solid #E1E2DD",
    isUsingStyle: "none",
    alreadyUseStyle: "none",
    //导航栏定位部分
    h: wx.getSystemInfoSync().windowHeight - 70,
    w: wx.getSystemInfoSync().windowWidth / 2 - 25
  },
  //取消预约实践响应程序
  cancelAppoint: function(){
    wx.showModal({
      title: '取消预约',
      content: '您确定要取消预约吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://wechair.com.cn/ChairsManagementController/cancelReservation', //仅为示例，并非真实的接口地址
            data: {
              open_id:wx.getStorageSync('openid'),
              session_key: wx.getStorageSync('session_key')
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if(res.data.status == 1){
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 2000
                });
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../yuyue/yuyue',
                  })
                }, 2000)
              }else if(res.data.status == 0){
                wx.showToast({
                  title: '取消失败',
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
  },
  //离座
  leaveSeat: function(){
    wx.showModal({
      title: '下座',
      content: '您确定要下座吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://wechair.com.cn/ChairsManagementController/leaveChair', //仅为示例，并非真实的接口地址
            data: {
              open_id: wx.getStorageSync('openid'),
              session_key: wx.getStorageSync('session_key')
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.status == 1) {
                wx.showToast({
                  title: '下座成功',
                  icon: 'success',
                  duration: 2000
                });
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../yuyue/yuyue',
                  })
                }, 2000)
              } else {
                wx.showToast({
                  title: '下座失败',
                  icon: 'none',
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
  },
  // 顶部导航栏的点击事件响应程序，渲染页面
  yuyueNav: function(){
    this.setData({topView:1});
    this.setData({ yuyueNavStyle: "2px solid #E1E2DD" });
    this.setData({ shiyonNavStyle: "none" });
  },
  shiyonNav: function(){
    this.setData({ topView: 2 });
    this.setData({ yuyueNavStyle: "none" });
    this.setData({ shiyonNavStyle: "2px solid #E1E2DD" });
    var that = this;
    wx.request({
      url: 'https://wechair.com.cn/ChairsManagementController/showUsing', //仅为示例，并非真实的接口地址
      data: {
        open_id: wx.getStorageSync('openid'),
        session_key: wx.getStorageSync('session_key')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.using.length > 0) {
          that.setData({useAllNum: that.data.useAllNum+1});
          that.setData({usingNum:that.data.usingNum+1});
          that.setData({ usingShow: true });
          that.setData({ usingRoomName: res.data.using[0] });
          that.setData({ usingStatus: res.data.using[1] });
          that.setData({ usingSeat: res.data.using[2] });
          that.setData({ usingDate: res.data.using[3] });
        }
        if (res.data.room_name.length == 0) {
          return;
        }
        var array = [];
        for (var i = 0; i < res.data.room_name.length; i++) {
          array.push(i);
        }
        that.setData({ usedNum:array});
        that.setData({useAllNum:that.data.useAllNum+array.length});
        that.setData({usedNumber:array.length});
        that.setData({ usedRoomName: res.data.room_name });
        that.setData({ usedStatus: res.data.status });
        that.setData({ usedSeat: res.data.seat });
        that.setData({ usedDate: res.data.date });

      }
    })

  },


  // 预约子导航栏点击事件渲染
  allAppoint: function(){
    this.setData({ view: 1});
    this.setData({ allAppointStyle:"2px solid #E1E2DD"});
    this.setData({waitUseStyle:"none"});
    this.setData({alreadyCancelStyle:"none"});
    var that = this;
    wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('openid'),
        session_key: wx.getStorageSync('session_key')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data.appointing.length > 0){
          that.setData({appointingShow:true});
          that.setData({appointingRoomName:res.data.appointing[0]});
          that.setData({appointingStatus: res.data.appointing[1]});
          that.setData({appointingSeat:res.data.appointing[2]});
          that.setData({ minute: res.data.appointing[3] });
          that.setData({ second: res.data.appointing[4] });
          that.setData({appointingDate:res.data.appointing[5]});
        }
      //   if(res.data.room_name.length == 0){
      //     return;
      //   }
      //   for(var i = 1; i<=res.data.room_name.length; i++){
      //     that.data.usedAppointNum.push(i);
      //   }
      //   that.setData({usedAppointRoomName: res.data.room_name});
      //   that.setData({usedAppointStatus: res.data.status});
      //   that.setData({usedAppointSeat: res.data.seat});
      //   that.setData({usedAppointDate: res.data.date});
        
      }
    })
  },
  waitUse: function(){
    this.setData({view:2});
    this.setData({ allAppointStyle: "none" });
    this.setData({ waitUseStyle: "2px solid #E1E2DD" });
    this.setData({ alreadyCancelStyle: "none" });
  },
  alreadyCancel:function(){
    this.setData({ view: 3 });
    this.setData({ allAppointStyle: "none" });
    this.setData({ waitUseStyle: "none" });
    this.setData({ alreadyCancelStyle: "2px solid #E1E2DD" });
  },
  // 使用子导航栏点击事件渲染
  allUse: function(){
    this.setData({useView:1});
    this.setData({ allUseStyle: "2px solid #E1E2DD"});
    this.setData({isUsingStyle:"none"});
    this.setData({alreadyUseStyle:"none"});
  },
  isUsing: function () {
    this.setData({ useView: 2 });
    this.setData({ allUseStyle: "none" });
    this.setData({ isUsingStyle: "2px solid #E1E2DD" });
    this.setData({ alreadyUseStyle: "none" });
  },
  alreadyUse: function () {
    this.setData({ useView: 3});
    this.setData({ allUseStyle: "none" });
    this.setData({ isUsingStyle: "none" });
    this.setData({ alreadyUseStyle: "2px solid #E1E2DD" });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ view: 1 });
    this.setData({ allAppointStyle: "2px solid #E1E2DD" });
    this.setData({ waitUseStyle: "none" });
    this.setData({ alreadyCancelStyle: "none" });
    //判断是否登录
    if (wx.getStorageSync('openid') == '' || wx.getStorageSync('session_key') == ''){
      this.setData({array:[]});
      wx.navigateTo({
        url: '../person/person',
      })
    }
    var that = this;
    wx.request({
      url: 'https://wechair.com.cn/ChairsManagementController/showReservation', 
      data: {
        open_id: wx.getStorageSync('openid'),
        session_key: wx.getStorageSync('session_key')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.appointing.length > 0) {
          that.setData({appointingNum:that.data.appointingNum + 1});
          that.setData({ appointNum: that.data.appointNum + 1 });
          that.setData({ appointingShow: true });
          that.setData({ appointingRoomName: res.data.appointing[0] });
          that.setData({ appointingStatus: res.data.appointing[1] });
          that.setData({ appointingSeat: res.data.appointing[2] });
          that.setData({ minute: res.data.appointing[3] });
          that.setData({ second: res.data.appointing[4] });
          that.setData({ appointingDate: res.data.appointing[5] });
        }
        if (res.data.room_name.length == 0) {
          return;
        }
        var array = [];
        for (var i = 0; i < res.data.room_name.length; i++) {
          // that.data.usedAppointNum.push(i);
          array.push(i);
        }
        that.setData({ usedAppointNumber: array.length });
        that.setData({usedAppointNum:array});
        that.setData({ appointNum: that.data.appointNum + array.length });
        console.log(that.data.usedAppointNum)
        that.setData({ usedAppointRoomName: res.data.room_name });
        that.setData({ usedAppointStatus: res.data.usedAppointStatus });
        that.setData({ usedAppointSeat: res.data.usedAppointSeat });
        that.setData({ usedAppointDate: res.data.usedAppointDate });

      }
    })
    //倒计时
    function countDown() {
      if (that.data.second == 0) {
        if (that.data.minute == 0) {
          clearInterval(id);
          // wx.navigateTo({
          //   url: '../yuyue/yuyue',
          // })
        } else {
          that.setData({ minute: that.data.minute - 1 });
          that.setData({ second: 59});
        }
      } else {
        that.setData({ second: that.data.second-1 });
      }
    }
    var id = setInterval(countDown,1000);
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


//倒计时函数

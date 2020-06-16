// pages/identify/identify.js
const app = getApp()
Page({
  data:{
    img: 0,
    photoPath:'',
  },
  // 点击选取照片的点击事件响应程序
  selectPhoto: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({img:1});
        that.setData({ photoPath: res.tempFilePaths });
      }
    })
  },
  // 提交按钮点击事件响应程序
  submit: function(){
   
    wx.uploadFile({
      url: 'https://wechair.com.cn/LoginController/uploadImage', //后端页面地址
      filePath: this.data.photoPath[0],
      name: 'file',
      formData: {
       
      },
      fail(res){
        console.log(res);
      },
      success(res) {
        console.log(res.data);
        var data = JSON.parse(res.data)
        if(data.status == 1){
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(function(){
            wx.navigateTo({
              url: '../person/person',
            })
          },2000)
        }else{
          wx.showToast({
            title: '上传失败',
            icon: 'success',
            duration: 2000
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../identify/identify',
            })
          }, 2000)
        }
        //do something
      }
    })
      
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '实名认证' })
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
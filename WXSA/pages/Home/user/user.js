"use strict";
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    academy: " ",
    name: " ",
    username: " ",
    flag: 0,
    point: "none"
  },
  copy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.copy
    })
  },
  jump(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.jumpurl
    })
  },
  jumpUpdate(e) {
    this.setData({
      point: "none"
    })
    wx.navigateTo({
      url: e.currentTarget.dataset.jumpurl
    })
  },
  logout(e) {
    wx.navigateTo({
      url: '/pages/Login/login?status=E'
    })
  },
  onLoad: function(options) {
    var that = this;
    var pointOp = (res) => {
      if (res.data !== app.globalData.version) {
        that.setData({
          point: "block"
        })
      }
    }
    wx.getStorage({
      key: 'point',
      complete: (res) => pointOp(res)
    })
    if (!app.globalData.userFlag) {
      that.setData({
        academy: "游客",
        name: "游客",
        username: "游客",
        flag: 1
      })
      return;
    }
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        console.log("GET USERINFO FROM CACHE");
        that.setData({
          academy: res.data.academy,
          name: res.data.name,
          username: res.data.username,
          flag: 1
        })
      },
      fail : res => {
        console.log("GET USERINFO FROM REMOTE");
        app.ajax({
          load: 1,
          url: app.globalData.url + 'funct/user/getuserinfo',
          fun: res => {
            if (res.data.info) {
              wx.setStorage({
                key: 'userInfo',
                data: res.data.info
              })
              that.setData({
                academy: res.data.info.academy,
                name: res.data.info.name,
                username: res.data.info.username,
                flag: 1
              })
            } else {
              app.toast("服务器错误");
            }

          }
        })
      }
    })
    
  },
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

  }
})
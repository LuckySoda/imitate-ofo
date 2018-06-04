//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    latitude: 30.67,
    longitude: 104.07
  },
  bindcontroltap:function(e){
    console.log(e)
    switch(e.controlId){
      case 1 : 
        this.movetoCenter();
        break;
      case 2:
        if(this.timer){
          wx.navigateBack({
            delta:1
          })
        }else{
          wx.scanCode({
            success: () => {
              wx.showLoading({
                title: '正在获取密码',
              })
              console.log(111)
              wx.request({
                url: 'https://www.easy-mock.com/mock/5b1175c716e1e93c6ab6ff17/sodaofo/getPassword',
                success: (res) => {
                  console.log(res);
                  wx.hideLoading();
                  wx.redirectTo({
                    url: '../scanResult/index?password=' + res.data.data.password + '&number=' + res.data.data.number,
                    success: () => {
                      wx.showToast({
                        title: '获取密码成功',
                        duration: 1000
                      })
                    }
                  })
                }
              })
            },
            fail: () => {

            }
          })
        }
        break;
      case 3:
        wx.navigateTo({
          url: '../warn/index',
        })
        break;
      case 4 :
        wx.navigateTo({
          url: '../my/index',
        })
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 生命周期函数 -- 监听页面加载
  onLoad: function (options) { //options为页面跳转所带来的参数
    this.timer = options.timer;
    console.log(this) //当前页面的实例
    wx.getLocation({
      success: (res)=> { //箭头函数把this指向当前作用域
        console.log(res)
        this.setData({
          longitude:res.longitude,
          latitude:res.latitude
        })
      },
    })
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          controls:[
            {
              id:1,
              iconPath:'/images/location.png',
              position:{
                width:50,
                height:50,
                left:20,
                top:res.windowHeight - 80
              },
              clickable:true
            },
            {
              id: 2,
              iconPath: '/images/use.png',
              position: {
                width: 90,
                height: 90,
                top: res.windowHeight - 100,
                left:res.windowWidth/2 - 45
              },
              clickable: true
            },
            {
              id: 3,
              iconPath: '/images/warn.png',
              position: {
                width: 50,
                height: 50,
                top: res.windowHeight - 80,
                left: res.windowWidth - 70
              },
              clickable: true
            },
            {
              id: 4,
              iconPath: '/images/user.png',
              position: {
                width: 50,
                height: 50,
                top: res.windowHeight - 155,
                left: res.windowWidth - 70
              },
              clickable: true
            },
            {
              id: 5,
              iconPath: '/images/marker.png',
              position: {
                width: 30,
                height: 45,
                top: res.windowHeight/2 - 45,
                left: res.windowWidth/2 - 15
              }
            }
          ]
        })
      },
    })
  },
  //生命周期函数 -- 监听页面初次渲染完成
  onReady: function () {
    // Do something when page ready.
  },
  //回到中心点
  movetoCenter:function(){
    this.mapctx.moveToLocation();
  },
  //生命周期函数 -- 监听页面显示
  onShow: function () {
    this.mapctx = wx.createMapContext('ofo-map');
    this.movetoCenter();
  },
  onHide: function () {
    // Do something when page hide.
  },
  onUnload: function () {
    // Do something when page close.
  },
})

// pages/info/add.js
var util = require('../../utils/util.js');  
var app = getApp();
Page({
  data:{
    type:1,
    startLocation:"出发地",
    endLocation:"目的地",
    floor:"",
    name:"",
    mobile:"",
    lng:"", //经度
    lat:""  //维度
  },
  setStart: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          startLocation:res.address,
          lng: res.longitude,
          lat: res.latitude
        })
      }
    })
  },
  setEnd: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          endLocation: res.address
        })
      }
    })
  },
  formSubmit:function(e){
    var data = e.detail.value;
    var that = this;
    console.log(that);

    if(data.name == ''){
      util.isError('请输入姓名', that);
      return false;
    }
    if(data.floor == ''){
      util.isError('请选择性别', that);
      return false;
    }

    if(data.mobile == ''){
      util.isError('请输入手机号码', that);
      return false;
    }

    if(!(/^1[34578]\d{9}$/.test(data.mobile))){
      util.isError('手机号码错误', that);
      return false;
    }
    if(that.data.startLocation == '出发地' && that.data.type == 1){
      util.isError('请选择出发地', that);
      return false;
    }

    if (that.data.endLocation == '目的地' && that.data.type == 2) {
      util.isError('目的地', that);
      return false;
    }
    //跳转上一层页面
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    if(that.data.type == 1) {
      prevPage.setData({//直接给上移页面赋值
        departure: that.data.startLocation,
      });
    } else {
      prevPage.setData({//直接给上移页面赋值
        destination: that.data.endLocation,
      });
    }
    wx.navigateBack({//返回
      delta: 1
    })
    util.clearError(that);
  },

  onLoad:function(options){
    var that = this;
    that.setData({
      type: options.type
    })

    }
})
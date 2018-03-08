// pages/map/index.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({
  　data: {
    　　resData: []
  　},
  　onLoad: function (options) {
    　　// 实例化腾讯地图API核心类
    　　qqmapsdk = new QQMapWX({
      　　　key: 'HPNBZ-B426V-CZQPP-UN4R6-QYOF2-MYFU3'//此处使用你自己申请的key
    　　});
  　},
  　onShow: function () {
    　　var that = this;
    　　// 腾讯地图调用接口
    　　qqmapsdk.search({
      　　　keyword: '彩票',
      　　　page_size: 20,
      　　　success: function (res) {
        　　　　console.log(res);
        　　　　var resData = res.data;
        　　　　for (var i = 0; i < resData.length; i++) {
          　　　　　resData[i]._distance = resData[i]._distance;//转换一下距离的格式
        　　　　}
        　　　　that.setData({ resData: resData });
      　　　},
      　　　fail: function (res) {
        　　　　console.log(res);
      　　　},
      　　　complete: function (res) {
        　　　　console.log(res);
      　　　}
    　　})
  　}
})
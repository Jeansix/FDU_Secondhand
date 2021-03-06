//index.js
//获取应用实例
const app = getApp()
var utils = require('../../utils/util.js');

Page({
  data: {
    navList: [{
        icon: '/images/nav-icon/book.png',
        text: '二手书籍'
      },
      {
        icon: '/images/nav-icon/tech.png',
        text: '数码家电'
      },
      {
        icon: '/images/nav-icon/life.png',
        text: '生活用品'
      },
      {
        icon: '/images/nav-icon/cos.png',
        text: '护肤美妆'
      },
      {
        icon: '/images/nav-icon/more.png',
        text: '更多'
      },
    ],
    goodsList: [],
    swiperCurrent: 0,
    loaded: 0
  },

  /**
   * 生命周期函数 —— 监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function (options){
    var that = this;
    wx.cloud.callFunction({
      name: 'getDateLatest8',
      data: {},
      success(res) {
        console.log(res)
        var glist = res.result.data.list
        var pics = []
        glist.forEach((g) => { pics = pics.concat(g.coverMiddle) })
        wx.cloud.callFunction({
          name: 'getUrlsByPicIds',
          data: { picIdList: pics },
          success: (res) => {
            for (let i = 0; i < glist.length; i++) 
              glist[i].coverMiddle = res.result.data.urlList[i]
            console.log('latest8成功', glist);
            that.setData({ goodsList: glist, loaded: 1 });
          }
        })
      },
    })
  },
  // 宫格导航改变事件
  gotoFenlei(e) {
    var text=e.currentTarget.dataset.text;
    let str = JSON.stringify(text)
    console.log('goto: '+ str);
    wx.navigateTo({
      url: '/pages/category/category?str=' + str,
    })
  },
  // 上新推荐改变事件
  gotoDetails(e) {
    //var url = e.currentTarget.dataset.coverimg;
    //var title = e.currentTarget.dataset.title;
    var goodId = e.currentTarget.dataset.id;
    console.log(goodId)
    //wx.navigateTo({
    //  url: '/pages/details/details?url=' + url + '&title=' + title,
    //})
    wx.navigateTo({
      url: '/pages/details/index?key=' + goodId
    })
  },

  gotoSeller(e) {
    var sellerId = e.currentTarget.dataset.text;
    console.log(sellerId)
    wx.navigateTo({
      url: '/pages/userPage/userPage?sellerId=' + sellerId
    })
  }
})

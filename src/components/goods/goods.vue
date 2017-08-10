<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  // import food from '../../food/food';
  const ERR_OK = 0;
  // import axios from 'axios';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: []
//        listHeight: [],
//        scrollY: 0
      };
    },
//    computed: {
//      currentIndex () {
//        for (let i = 0; i < this.listHeight.length; i++) {
//          let height1 = this.listHeight[i];
//          let height2 = this.listHeight[i + 1];
//          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
//            this._followScroll(i);
//            return i;
//          }
//        }
//        return 0;
//      }
//    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => { // 在这个回调函数中才能更新dom
            this._initScroll();
//            this._calculateHeight();
          });
        }
      });
    },
    methods: {
//      selectMenu(index, event) {
//        if (!event._constructed) {
//          return;
//        }
//        let foodList = this.$refs.foodList;
//        let el = foodList[index];
//        this.foodsScroll.scrollToElement(el, 300);
//      },
      _initScroll () {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
//        this.foodsScroll.on('scroll', (pos) => {
//          // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
//          if (pos.y <= 0) {
//            this.scrollY = Math.abs(Math.round(pos.y));
//          }
//        });
      }
//      _calculateHeight() {
//        let foodList = this.$els.foodList;
//        let height = 0;
//        this.listHeight.push(height);
//        for (let i = 0; i < foodList.length; i++) {
//          let item = foodList[i];
//          height += item.clientHeight;
//          this.listHeight.push(height);
//        }
//      },
//      _followScroll(index) {
//        let menuList = this.$refs.menuList;
//        let el = menuList[index];
//        this.meunScroll.scrollToElement(el, 300, 0, -100);
//      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 174px
    width: 100%
    bottom: 46px
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px //兼容
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        .icon
          display: inline-block;
          width: 12px;
          height: 12px;
          vertical-align: top;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.guarantee
            bg-img('guarantee_3')
          &.invoice
            bg-img('invoice_3')
          &.special
            bg-img('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        font-size: 12px
        color: rgb(147, 153, 159)
        border-left: 2px solid #d9dde1
        background: #f3f5f7
      .food-item
        display: flex
        margin: 12px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
          width: 57px
        .content
          flex: 1
          margin-left: 57px
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            &.count
              margin-right: 12px
          .price
            line-height: 24px
            font-weight: 700
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              font-size: 10px
              color: rgb(147, 153, 159)
              text-decoration: line-through
</style>

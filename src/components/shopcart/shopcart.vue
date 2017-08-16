<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        <!--APP.vue的router-组件向goods组建传入seller组件，通过prop传入deliveryPrice参数与minPrice参数-->
      </div>
      <div class="content-right">
        <div class="pay" v-show="totalPrice < minPrice">
          还差￥{{minPrice-totalPrice}}起送
        </div>
        <div class="gopay" v-show="totalPrice >= minPrice">去结算</div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 1
            },
            {
              price: 5,
              count: 1
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    background: #000000
    .content
      display: flex
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display:inline-block
          vertice-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: rgb(255, 255, 255)
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: rgb(255, 255, 255)
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.4)
        .price
          display:inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: borer-box
          border-right:1px solid rgba(255, 255 , 255, 0.1)
          font-size: 16px
          font-weight: 700
          color: rgba(255, 255 , 255, 0.4)
          &.highlight
            color: rgb(255, 255, 255)
        .desc
          display:inline-block
          vertical-align: top
          line-height: 24px
          margin: 12px 0 0 12px
          font-size:  10px
          font-weight: 700px
          color: rgba(255, 255 , 255, 0.4)
      .content-right
        flex: 0 0 105px
        width: 105px
        background: #2b343c
        .pay, .gopay
          height: 48px
          line-height: 48px
          font-size: 12px
          font-weight: 700
          color: rgba(255, 255 , 255, 0.4)
          text-align: center
        .gopay
          background: #00b43c
          color: #fff


</style>

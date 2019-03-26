<template>
  <div>
    <preview title="基础用法">
      <div class="container">
        <div class="block">
          <span class="demonstration">默认 Hover 指示器触发</span>
          <el-carousel height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="block">
          <span class="demonstration">Click 指示器触发</span>
          <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </preview>

    <preview title="指示器">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </preview>

    <preview title="切换箭头">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </preview>

    <preview title="卡片化">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </preview>

  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  @import "../../style/vars";

  .el-carousel__item:nth-child(2n) {
    background-color: $--color-text-secondary;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: $--color-text-secondary;
  }

  .container {
    flex: 1;
    display: flex;
  }

  .preview {
    /deep/ {
      .el-carousel__item > h3 {
        color: $--color-text-primary;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
        text-align: center;
      }
    }
  }

  .block {
    padding: 30px;
    flex: 1;

  }

  .demonstration {
    display: block;
    margin-bottom: 20px;
  }
</style>

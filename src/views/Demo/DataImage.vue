<script setup lang="ts"></script>

<template>
  <div class="data-image">
    <div class="item">
      <img src="../../assets/data-image-1.png" />
      <span class="des">当前心率HR</span>
    </div>
    <div class="item">
      <img src="../../assets/data-image-2.png" />
      <span class="des">血红蛋白HRB</span>
    </div>
    <div class="item">
      <img src="../../assets/data-image-3.png" />
      <span class="des">血小板PLT</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.data-image {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
    }
    .des {
      font-size: 18px;
      color: #fff;
      margin-top: 10px;
    }
  }
}
</style>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  data: {
    bodyHeat: number
    bloodOxygen: number
  }
}>()
</script>

<template>
  <div class="person-data">
    <div class="item">
      <div class="icon">
        <img src="../../assets/body-heat.png" />
        <span class="des">体温</span>
      </div>
      <span class="value body-heat">{{ props.data.bodyHeat }}°C</span>
    </div>
    <div class="item">
      <div class="icon">
        <img src="../../assets/blood-oxygen.png" />
        <span class="des">血氧饱和度</span>
      </div>
      <span class="value blood-oxygen">{{ props.data.bloodOxygen }}%</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.person-data {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  color: #fff;
  .item {
    display: flex;
    height: 100%;
    align-items: center;
    &.body-heat{
      
    }
    .icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      img {
        height: 70%;
      }
      .des {
        font-size: 18px;
        margin-top: 20px;
        flex-shrink: 0;
      }
    }
  }
  .value {
    font-size: 40px;
    font-weight: bold;
    margin-left: 20px;
    &.body-heat{
      color: #3bff72;
    }
    &.blood-oxygen{
      color: #01d3e5;
    }
  }
}
</style>

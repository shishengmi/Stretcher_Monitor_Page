<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  data: {
    name: string
    age: number
    gender: string
    nationality: string
    address: string
    idNum: string
  }
}>()
</script>

<template>
  <div class="person-info">
    <img src="../../assets//avatar.png" class="avatar" />
    <div class="info">
      <div class="line-wrapper">
        <div class="item">
          <span class="label">姓名:</span>
          <span class="value">{{ props.data.name }}</span>
        </div>
        <div class="item">
          <span class="label">年龄:</span>
          <span class="value">{{ props.data.age }}</span>
        </div>
      </div>
      <div class="line-wrapper">
        <div class="item">
          <span class="label">性别:</span>
          <span class="value">{{ props.data.gender }}</span>
        </div>
        <div class="item">
          <span class="label">民族:</span>
          <span class="value">{{ props.data.nationality }}</span>
        </div>
      </div>
      <div class="item">
        <div class="label">住址:</div>
        <div class="value">{{ props.data.address }}</div>
      </div>
      <div class="item">
        <div class="label">身份证号:</div>
        <div class="value">{{ props.data.idNum }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.person-info {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  color: #fff;
  display: flex;
  .avatar {
    width: 200px;
    height: 200px;
  }
  .info {
    margin-left: 30px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 100%;
    }
    .label {
      margin-right: 10px;
      font-size: 16px;
      color: #eee;
    }
    .value {
      margin-top: 10px;
      display: block;
      font-size: 16px;
    }
  }
  .line-wrapper {
    display: flex;
    width: 100%;
    .item {
      width: 50%;
      display: flex;
      .value {
        margin-top: 0;
      }
    }
  }
}
</style>

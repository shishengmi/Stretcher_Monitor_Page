<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { getIntDecimal } from '../../utils'
const props = defineProps<{
  data: {
    score: number
    minBasicVal: number
    maxBasicVal: number
  }
}>()
const score = computed(() => {
  return getIntDecimal(props.data.score)
})
const minBasicVal = computed(() => {
  return getIntDecimal(props.data.minBasicVal)
})
const maxBasicVal = computed(() => {
  return getIntDecimal(props.data.maxBasicVal)
})
</script>

<template>
  <div class="immune-num">
    <div class="left">
      <div class="num">
        <span class="int">{{ score.int }}</span>
        <span class="decimal" v-if="score.decimal">.{{ score.decimal }}</span>
      </div>
      <span class="des">
        <span class="green">免疫系统</span>
        <span>综合值</span>
      </span>
    </div>
    <div class="right">
      <div class="standard-value">
        <span class="name">标准值</span>
        <span class="bracket left">(</span>
        <span class="int">
          {{ minBasicVal.int }}{{ minBasicVal.decimal ? '.' : '' }}
        </span>
        <span class="decimal" v-if="minBasicVal.decimal">
          {{ minBasicVal.decimal }}
        </span>
        <span>-</span>
        <span class="int">{{ maxBasicVal.int }}{{ maxBasicVal.decimal ? '.' : '' }}</span>
        <span class="decimal" v-if="maxBasicVal.decimal">
          {{ maxBasicVal.decimal }}
        </span>
        <span class="bracket right">)</span>
      </div>
      <div class="border-img">
        <img src="../../assets/immune-icon.png" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.immune-num {
  width: 100%;
  color: #fff;
  display: flex;
  align-items: flex-end;
  .left {
    width: 50%;
    .num {
      font-weight: bold;
      .int {
        font-size: 48px;
      }
      .decimal {
        font-size: 28px;
      }
    }
    .des {
      font-size: 20px;
      margin-top: 10px;
      display: block;
      .green {
        color: #3bff72;
      }
    }
  }
  .right {
    width: 50%;
    .standard-value {
      padding-left: 20px;
      .name {
        font-size: 16px;
        width: 30px;
      }
      .bracket {
        font-size: 18px;
        &.left {
          margin: 0 10px;
        }
        &.right {
          margin-left: 10px;
        }
      }
      .int {
        font-size: 18px;
      }
      .decimal {
        font-size: 16px;
        color: #5a5c5d;
      }
    }
    .border-img {
      margin-top: 10px;
    }
  }
}
</style>

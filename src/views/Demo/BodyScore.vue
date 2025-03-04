<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { getIntDecimal } from '../../utils'
const props = defineProps<{
  data: {
    score: number
    maxBloodPressure: number
    minBloodPressure: number
  }
}>()
const score = computed(() => {
  return getIntDecimal(props.data.score)
})


// 计算分数颜色
const scoreColor = computed(() => {
  const value = props.data.score // 直接获取 score 数值
  if (value < 60) return 'Low'   // 低（红色）
  if (value < 80) return 'Mid'   // 偏低（黄色）
  return 'High'                  // 正常（绿色）
})

const fullSliderNum = 200
const maxSliderPercent = computed(() => {
  return Math.round((props.data.maxBloodPressure / fullSliderNum) * 100) + '%'
})
const minSliderPercent = computed(() => {
  return Math.round((props.data.minBloodPressure / fullSliderNum) * 100) + '%'
})

</script>

<template>
  <div class="body-score">
    <div class="left">
      <span class="icon"></span>
      <div class="text">
      <span class="num" :class="scoreColor">
        <span class="int">{{ score.int }}</span>
        <span class="decimal">.{{ score.decimal }}</span>
      </span>
              <span class="des">{人体综合指数} ({{ scoreColor }})</span>  <!-- 调试 -->
      </div>
    </div>
    <div class="right">
      <div class="item">
        <div class="slider">
          <div class="slider-liner" :style="{ height: maxSliderPercent }"></div>
        </div>
        <div class="text">
          <span class="num">{{ props.data.maxBloodPressure }}</span>
          <span class="des">最高血压</span>
        </div>
      </div>
      <div class="item">
        <div class="slider">
          <div class="slider-liner" :style="{ height: minSliderPercent }"></div>
        </div>
        <div class="text">
          <span class="num">{{ props.data.minBloodPressure }}</span>
          <span class="des">最低血压</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.body-score {
  display: flex;
  align-items: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 40px;
  .left {
    display: flex;
    align-items: center;
    display: flex;
    height: 100%;
    .icon {
      width: 30px;
      height: 75px;
      background: url('../..//assets/person-icon.png');
      background-size: 100%;
    }
    .text {
      height: 100%;
      display: flex;
      flex-direction: column;
      display: flex;
      justify-content: center;
      margin-left: 20px;
      padding-right: 30px;
      border-right: 2px solid #666;
      .num {
        color: #3bff72;
        font-weight: bold;
        .int {
          font-size: 48px;
        }
        .decimal {
          font-size: 28px;
        }
      }
      .des {
        color: #5a5c5d;
        font-size: 18px;
        margin-top: 10px;
      }
    }
  }
  .right {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 30px;
    color: #fff;
    .item {
      height: 40%;
      display: flex;
      .slider {
        width: 8px;
        height: 100%;
        background-color: #aaacac;
        position: relative;
        margin-right: 10px;
        .slider-liner {
          width: 100%;
          height: 30%;
          background-color: #3bff72;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
      .text {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .num {
          font-size: 24px;
        }
        .des {
          font-size: 14px;
          margin-top: 5px;
        }
      }
    }
  }
}

.Low {
  color: red !important;   /* 添加 !important 强制生效 */
}

.Mid {
  color: yellow !important;
}

.High {
  color: green !important;
}
</style>

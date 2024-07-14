<script setup lang="ts">
import { defineProps } from 'vue'
type itemData = { num: number; status: string }
const props = defineProps<{
  data: {
    heartRate: itemData
    hrv: itemData
    pr: itemData
    bodyScore: {
      num: number
      pwr: number
    }
    heartScore: {
      num: number
      pwr: number
    }
  }
}>()
</script>

<template>
  <div class="body-data">
    <ul class="top-wrapper">
      <li class="item">
        <div class="name-wrapper">
          <h6 class="name">心率</h6>
          <span class="des">全线检测仪</span>
          <div :class="'tags ' + props.data.heartRate.status">
            <span class="tag">STANDARD</span>
            <span class="tag">POOR</span>
            <span class="tag">TIME</span>
          </div>
        </div>
        <div class="value-wrapper">
          <div :class="'status ' + props.data.heartRate.status">
            <span>
              {{ props.data.heartRate.status === 'up' ? '+' : '-' }}
            </span>
          </div>
          <div class="value">
            <span class="num">{{ props.data.heartRate.num }}</span>
            <div class="unit">ME</div>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="name-wrapper">
          <h6 class="name">心率变异性HRV</h6>
          <span class="des">全线检测仪</span>
          <div :class="'tags ' + props.data.hrv.status">
            <span class="tag">STANDARD</span>
            <span class="tag">POOR</span>
            <span class="tag">TIME</span>
          </div>
        </div>
        <div class="value-wrapper">
          <div :class="'status ' + props.data.hrv.status">
            <span>
              {{ props.data.hrv.status === 'up' ? '+' : '-' }}
            </span>
          </div>
          <div class="value">
            <span class="num">{{ props.data.hrv.num }}</span>
            <div class="unit">ME</div>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="name-wrapper">
          <h6 class="name">PR间隔</h6>
          <span class="des">全线检测仪</span>
          <div :class="'tags ' + props.data.pr.status">
            <span class="tag">STANDARD</span>
            <span class="tag">POOR</span>
            <span class="tag">TIME</span>
          </div>
        </div>
        <div class="value-wrapper">
          <div :class="'status ' + props.data.pr.status">
            <span>
              {{ props.data.pr.status === 'up' ? '+' : '-' }}
            </span>
          </div>
          <div class="value">
            <span class="num">{{ props.data.pr.num }}</span>
            <div class="unit">ME</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="bottom-wrapper">
      <div class="item">
        <div class="name">
          <span class="icon"></span>
          <span class="text">人体技能检测</span>
        </div>
        <div class="score">
          <span class="text">综合评分</span>
          <span class="num">{{ props.data.bodyScore.num }}</span>
        </div>
        <div class="pwr">
          <span class="icon"></span>
          <span class="num">{{ props.data.bodyScore.pwr }}</span>
          <span class="unit">pwr</span>
        </div>
      </div>
      <div class="item">
        <div class="name">
          <span class="icon"></span>
          <span class="text">心脏整体检测检测</span>
        </div>
        <div class="score">
          <span class="text">综合评分</span>
          <span class="num">{{ props.data.heartScore.num }}</span>
        </div>
        <div class="pwr">
          <span class="icon"></span>
          <span class="num">{{ props.data.heartScore.pwr }}</span>
          <span class="unit">pwr</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.body-data {
  display: flex;
  flex-direction: column;
  .top-wrapper {
    width: 100%;
    border-top: 2px solid rgba(255, 255, 255, 0.3);
    padding-top: 20px;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      padding-bottom: 10px;
      border-bottom: 2px solid rgba(255, 255, 255, 0.3);
      & + .item {
        margin-top: 10px;
      }

      .name-wrapper {
        color: #fff;
        .name {
          font-weight: normal;
          font-size: 18px;
        }
        .des {
          color: #5a5c5d;
          font-size: 14px;
          margin-top: 5px;
          display: block;
        }
        .tags {
          margin-top: 8px;
          display: flex;
          &.up .tag::before {
            background-image: url('../../assets//arrow-up.png');
          }
          &.down .tag::before {
            background-image: url('../../assets//arrow-down.png');
          }
          .tag {
            font-size: 12px;
            display: flex;
            align-items: center;
            & + .tag {
              margin-left: 20px;
            }
            &::before {
              content: '';
              display: block;
              width: 10px;
              height: 10px;
              background-size: 100% 100%;
              margin-right: 5px;
            }
          }
        }
      }
      .value-wrapper {
        display: flex;
        align-items: center;
        .status {
          display: flex;
          align-items: center;
          width: 30px;
          &.up {
            color: #3bff72;
          }
          &.down {
            color: #01d3e5;
          }
          span {
            font-size: 40px;
            width: 100%;
            text-align: center;
          }
        }
        .value {
          display: flex;
          width: 130px;
          align-items: flex-end;
          justify-content: flex-end;
          margin-left: 60px;
          .num {
            font-size: 40px;
          }
          .unit {
            font-size: 14px;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .bottom-wrapper {
    margin-top: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .item {
      color: #fff;
      display: flex;
      align-items: center;
      & + .item {
        margin-top: 20px;
      }
      &:first-child {
        .name .icon {
          background: url('../../assets/person-data-icon1.png');
        }
        .score .num {
          color: #01d3e5;
        }
        .pwr .icon {
          background: url('../../assets/person-data-icon3.png');
        }
      }
      &:last-child {
        .name .icon {
          background: url('../../assets/person-data-icon2.png');
        }
        .score .num {
          color: #3bff72;
        }
        .pwr .icon {
          background: url('../../assets/person-data-icon4.png');
        }
      }
      > div {
        border-right: 2px dashed rgba(255, 255, 255, 0.3);
        padding-right: 10px;
      }
      .name {
        display: flex;
        align-items: center;

        .icon {
          width: 27px;
          height: 26px;
          background-size: 100% 100%;
        }
        .text {
          font-size: 18px;
          margin-left: 10px;
        }
      }
      .score {
        display: flex;
        align-items: center;
        margin-left: 10px;
        .text {
          font-size: 13px;
          color: #5a5c5d;
        }
        .num {
          font-size: 20px;
          margin-left: 5px;
        }
      }
      .pwr {
        display: flex;
        align-items: center;
        margin-left: 10px;
        .icon {
          width: 21px;
          height: 21px;
          background-size: 100% 100%;
        }
        .num {
          font-size: 20px;
          margin-left: 5px;
        }
        .unit {
          font-size: 13px;
          margin-left: 5px;
          color: #5a5c5d;
        }
      }
    }
  }
}
</style>

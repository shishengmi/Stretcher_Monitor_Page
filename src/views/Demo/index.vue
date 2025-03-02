<script setup lang="ts">
import {onMounted, ref} from 'vue'
import axios from 'axios';
// import { calculateBodyScore } from '../../utils/bodyScoreAlgorithm';
import { calculateHealthScore } from '../../utils/Range Algorithm';

import BodyScore from './BodyScore.vue'
import EKGChart from './EKGChart.vue'
import BodyData from './BodyData.vue'
import PersonInfo from './PersonInfo.vue'
import ImmuneNum from './ImmuneNum.vue'
import PersonData from './PersonData.vue'
import DataImage from './DataImage.vue'

function getNowDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return {
    secondsStr: String(now.getSeconds()).padStart(2, '0'),
    dateStr: `${year}-${month}-${day} ${hours}:${minutes}:`,
  }
}

const { secondsStr, dateStr } = getNowDate()
const formatDate = ref(dateStr)
const seconds = ref(secondsStr)

setInterval(() => {
  const { secondsStr, dateStr } = getNowDate()
  formatDate.value = dateStr
  seconds.value = secondsStr
}, 1000)

const data = ref({
  bodyScore: {
    score: 102.67,
    maxBloodPressure: 102,
    minBloodPressure: 86,
  },
  bodyData: {
    heartRate: {
      num: 0,
      status: 'down',
    },
    hrv: {
      num: 0,
      status: 'down',
    },
    pr: {
      num: 0,
      status: 'up',
    },
    bodyScore: {
      num: 100,
      pwr: 356,
    },
    heartScore: {
      num: 100,
      pwr: 450,
    },
  },
  immuneNum: {
    score: 0.00,
    minBasicVal: 12.33,
    maxBasicVal: 100.0,
  },
  personInfo: {
    name: '小明',
    age: 18,
    gender: '男',
    nationality: '汉',
    address: '江苏省南京市xx区xx街道xx小区xx楼1栋101',
    idNum: '110125123412349876',
  },
  personData: {
    bodyHeat: 40,
    bloodOxygen: 100,
  },
  ecgChart:{
    ecgData: [] as any[]  // 添加用于存放ECG图像的队列
  }
});



async function getData() {//从后端获取数据
  try {
    const response = await axios.get('http://localhost:5000/get_data');
    // console.log(response.data)
    return response.data

  } catch (error) {
    // console.error('Error fetching data:', error);
    return [];
  }
}



// 需要在组件范围内声明intervalId
// @ts-ignore
let intervalId = null;

onMounted(() => {
  let heartRate_hrv_process = [];
  let differences = [];
  intervalId = setInterval(async () => {
    const response = await getData();//从这里获取数据响应

    data.value.personData.bloodOxygen = response.blood_oxygen / 100;
    data.value.personData.bodyHeat = response.body_temperature/10;
    data.value.bodyData.heartRate.num = response.heart_rate/10;

    data.value.bodyScore.score = parseFloat(
        calculateHealthScore(
          response.heart_rate/10,
          response.body_temperature/10,
          response.blood_oxygen / 100
      ).toFixed(2)
    )//计算综合值并保留两位小数点


    data.value.immuneNum.score = parseFloat(
        (
            ((data.value.personData.bloodOxygen * 50) + // 假设血氧占比 50%
            (data.value.personData.bodyHeat * 30) +    // 假设体温占比 30%
            (data.value.bodyData.heartRate.num * 20))*0.01   // 假设心率占比 20%
        ).toFixed(2)
    );//计算免疫系统综合值


    heartRate_hrv_process.push(response.heart_rate / 10);
    if (heartRate_hrv_process.length > 2) {
      // 清空 differences 列表
      differences = [];

      // 仅计算两个数据点的差异
      for (let i = 1; i < heartRate_hrv_process.length; i++) {
        differences.push(heartRate_hrv_process[i] - heartRate_hrv_process[i - 1]);
      }

      // 清空 heartRate_hrv_process 列表
      heartRate_hrv_process.length = 0;

      // 计算 HRV 值
      const sumDifferences = differences.reduce((acc, val) => acc + val, 0);
      data.value.bodyData.hrv.num = sumDifferences / differences.length;
    }
    if(response.heart_rate !== 0)
    {
      data.value.bodyData.pr.num = 1/response.heart_rate/10*1000000
    }
    else data.value.bodyData.pr.num = 0
    const newData = response.ecg_data

    data.value.ecgChart.ecgData.push(...newData);
    console.log(data.value.ecgChart.ecgData)
  }, 1000); // 每2000毫秒（2秒）执行一次
});

</script>

<template>
  <div class="demo">
    <div class="container">
      <header>
        <h2 class="title">担架可视化分析</h2>
        <div class="time">
          <img src="../../assets//date.png" />
          <span class="val">
            {{ formatDate }}
            <span class="seconds">{{ seconds }}</span>
          </span>
        </div>
      </header>
      <div class="bottom-wrapper">
        <div class="left">
          <BodyScore class="body-score" :data="data.bodyScore"></BodyScore>
          <EKGChart class="ekg-chart" :data="data.ecgChart"></EKGChart>
          <BodyData class="body-data" :data="data.bodyData"></BodyData>
        </div>
        <div class="middle"></div>
        <div class="right">
          <ImmuneNum class="immune-num" :data="data.immuneNum"></ImmuneNum>
          <PersonInfo class="person-info" :data="data.personInfo"></PersonInfo>
          <PersonData class="person-data" :data="data.personData"></PersonData>
          <DataImage class="data-image"></DataImage>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.demo {
  width: 100%;
  height: 100%;
  min-width: 1260px;
  min-height: 1000px;
  background: linear-gradient(45deg, #1c322e, #0f1917);
  padding: 100px 40px;
  .container {
    width: 100%;
    height: 100%;
    background-color: #0f1317;
    box-shadow: #000 0px 20px 30px -10px;
    display: flex;
    flex-direction: column;
    padding: 30px 40px;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        color: #fff;
        font-size: 24px;
        font-weight: normal;
      }
      .time {
        display: flex;
        color: #fff;
        align-items: center;
        img {
          width: 25px;
          height: 25px;
        }
        .val {
          font-size: 20px;
          margin-left: 10px;
          display: flex;
          align-items: flex-end;
        }
        .seconds {
          font-size: 14px;
          border-bottom: 2px solid #3bff72;
        }
      }
    }

    .bottom-wrapper {
      width: 100%;
      flex: 1;
      margin-top: 30px;
      display: flex;
      .left {
        width: 22%;
        .body-score {
          width: 100%;
          height: 20%;
        }
        .ekg-chart {
          width: 100%;
          height: 30%;
        }
        .body-data {
          width: 100%;
          height: 50%;
        }
      }
      .middle {
        width: 46%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url(../../assets/middle-bg.png);
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .right {
        width: 32%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .immune-num {
          width: 100%;
        }
        .person-info {
          width: 100%;
          height: 200px;
        }
        .person-data {
          width: 100%;
          height: 25%;
        }
        .data-image {
          width: 100%;
          height: 25%;
        }
      }
    }
  }
}
</style>

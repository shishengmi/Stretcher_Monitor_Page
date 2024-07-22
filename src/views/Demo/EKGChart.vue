<script setup lang="ts">
import {defineProps, nextTick, onMounted, ref} from 'vue'


const canvasRoot = ref<HTMLElement>()
const gridCanvas = ref<HTMLCanvasElement>()
const EKGCanvas = ref<HTMLCanvasElement>()
const canvasWidth = ref(0)
const canvasHeight = ref(0)

const props = defineProps<{
  data: {
    ecgData: number[]
  }
}>();

function setCanvasSize() {
  if (!canvasRoot || !canvasRoot.value) return
  const { width, height } = canvasRoot.value.getBoundingClientRect()
  canvasWidth.value = Math.floor(width)
  canvasHeight.value = Math.floor(height)
}
function drawGrid(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.lineWidth = 1
  const cellWidth = 40
  const cellHeight = 20
  const width = canvasWidth.value
  const height = canvasHeight.value
  const cols = Math.floor(width / cellWidth)
  const rows = Math.floor(height / cellHeight)

  for (let col = 0; col <= cols; col++) {
    let x = col * cellWidth
    if (col == cols) {
      x -= cellWidth * 0.3
    }
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }

  for (let row = 0; row <= rows; row++) {
    let y = row * cellHeight
    if (row == rows) {
      y -= cellHeight * 0.3
    }
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.stroke()
}

let offset = 2
function drawEKGPoint(
    ctx: CanvasRenderingContext2D,
    num: number,
    pointSpace = 2,
    refreshBlockWidth = 20,
    minValue = 110000,
    maxValue = 160000
) {
  const canvasRange = canvasHeight.value;
  const maxOffset = canvasWidth.value / pointSpace;
  ctx.strokeStyle = '#3bff72';
  ctx.lineWidth = 1;

  if(num>maxValue)
    num = maxValue;
  if(num<minValue)
    num = minValue;
  // 将num值从[minValue, maxValue]范围映射到[canvasHeight.value, 0]范围
  const scaledNum = ((num - minValue) / (maxValue - minValue)) * canvasRange;

  // Y坐标调整，使数值小的在画布下方，数值大的在画布上方
  const yPos = canvasHeight.value - scaledNum;

  // 清除即将更新的区域
  ctx.clearRect(offset * pointSpace, 0, refreshBlockWidth, canvasHeight.value);
  offset+=4;
  ctx.lineTo(offset * pointSpace, yPos);
  ctx.stroke();

  // 重置偏移量
  if (offset > maxOffset) {
    offset = 2;
    ctx.beginPath();
  }
}


document.body.onresize = function () {
  setCanvasSize()
  const gridCtx = gridCanvas!.value!.getContext('2d')
  const ECGCtx = EKGCanvas!.value!.getContext('2d')
  nextTick(() => {
    if (!gridCtx || !ECGCtx) return
    gridCtx.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
    ECGCtx.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
    drawGrid(gridCtx)
  })
}

onMounted(() => {
  setCanvasSize();
  const gridCtx = gridCanvas.value?.getContext('2d');
  const ECGCtx = EKGCanvas.value?.getContext('2d');

  nextTick(() => {
    if (!gridCtx || !ECGCtx) return;
    drawGrid(gridCtx);

    setInterval(() => {
      if (props.data.ecgData.length > 0) {
        const num = props.data.ecgData.shift() as number; // 从数组中取出并移除第一个元素
        drawEKGPoint(ECGCtx, num);
      }
    }, 50); // 调整间隔时间以适应绘制需求
  });
});
</script>

<template>
  <div class="ekg-chart" ref="canvasRoot">
    <canvas
      ref="gridCanvas"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
    <canvas
      ref="EKGCanvas"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
  </div>
</template>

<style scoped lang="less">
.ekg-chart {
  width: 100%;
  height: 100%;
  position: relative;
  canvas {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>

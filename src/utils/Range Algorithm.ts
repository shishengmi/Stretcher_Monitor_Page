// healthScore.ts

// 定义标准值
export const Standard = {
    heartRate: 80,
    bodyTemperature: 31.65,
    oxygenLevel: 97.5,
};

// 指数衰减系数
export const exponential = {
    // heartRate: 0.00058,
    // bodyTemperature: 0.738,
    // oxygenLevel: 0.0357,

    heartRate: 0.00028,
    bodyTemperature: 0.538,
    oxygenLevel: 0.0157,
};

// 指数衰减函数
export function expDecayScore(x: number, x0: number, k: number): number {
    return 100 * Math.exp(-k * Math.pow(x - x0, 2));
}

// 计算健康评分
export function calculateHealthScore(heartRate: number, bodyTemperature: number, oxygenLevel: number): number {
    // 计算单项得分
    const S_H = expDecayScore(heartRate, Standard.heartRate, exponential.heartRate);
    const S_T = expDecayScore(bodyTemperature, Standard.bodyTemperature, exponential.bodyTemperature);
    const S_S = expDecayScore(oxygenLevel, Standard.oxygenLevel, exponential.oxygenLevel);

    // 设定权重 (可调整)
    const W_H = 0.1, W_T = 0.3, W_S = 0.6;

    // 计算总健康评分
    return W_H * S_H + W_T * S_T + W_S * S_S;
}

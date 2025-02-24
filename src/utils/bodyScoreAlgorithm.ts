
const WEIGHTS = {
    heartRate: 0.4,
    bodyTemperature: 0.3,
    oxygenLevel: 0.3,
};

// 计算单项得分的函数
const calculateScore = (value: number, min: number, max: number): number => {
    // 如果值超出正常范围，返回0
    if (value < min || value > max) {
        return 0;
    }

    // 将值归一化到0-100分之间
    return ((value - min) / (max - min)) * 100;
};

// 计算综合身体分数的函数
export const calculateBodyScore = (
    heartRate: number,
    bodyTemperature: number,
    oxygenLevel: number
): number => {
    // 计算各项得分
    const heartRateScore = calculateScore(heartRate, 60, 100);
    const bodyTemperatureScore = calculateScore(bodyTemperature, 36.5, 37.5);
    const oxygenLevelScore = calculateScore(oxygenLevel, 95, 100);

    // 计算加权综合分数
    const bodyScore =
        heartRateScore * WEIGHTS.heartRate +
        bodyTemperatureScore * WEIGHTS.bodyTemperature +
        oxygenLevelScore * WEIGHTS.oxygenLevel;

    return bodyScore;
};


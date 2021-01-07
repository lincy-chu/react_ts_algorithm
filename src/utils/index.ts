/**
 * 运行计时器
 * @param name 计时器名称
 * @param cb 需要执行计时的运行函数
 */
export const Timer = (name = '计时器名称',cb = () => {}) => {
    console.time(name);
    cb();
    console.timeEnd(name);
};

/**
 * 数据备忘录
 * @param n
 */
export const Memo = (n: number) => {
    const dp: number[] = [0, 1,1];
    if (n >= 3) {
        for (let i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
    }
    return dp[n];
};

/**
 * 为斐波那契数列数列定制的备忘录
 * 根据斐波那契数列数列的状态方程，
 * 当前状态只和之前的两个状态有关，
 * 其实并不需要那么长的一个备忘录数组来存储所有状态，
 * 只要想办法存储之前的两个状态就行
 * @param n
 */
export const MemoForFib = (n: number) => {
    if (Object.is(n, 1) || Object.is(n, 2)) {
        return 1;
    }
    let [prev, curr] = [1, 1];
    for (let i = 3; i <= n; i++) {
        const sum = prev + curr;
        [prev, curr] = [curr, sum];
    }
    return curr;
};

export const LogStart = (title: string, cb: any = () => {}) => {
    console.group(title);
    cb();
    console.groupEnd();
};

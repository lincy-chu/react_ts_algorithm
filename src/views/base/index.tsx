import React, {useEffect} from "react";
import {Timer, MemoForFib, LogStart} from "../../utils";

const Base = () => {
    useEffect(() => {
        LogStart('斐波那契数列', () => {
            // 斐波那契数列
            const fib = (n: number): number => {
                if (n < 1) {
                    return 0
                }
                if (Object.is(n, 1) || Object.is(n, 2)) {
                    return 1;
                }
                return fib(n - 1) + fib(n - 2);
            };
            Timer('斐波那契数列耗时', () => {
                console.log('斐波那契数列', fib(30));
            });

            const max = 30;

            // 带尾递归优化的斐波那契数列
            const fibWithTail = (n: number, ac1:number = 1, ac2: number = 1): number => {
                if (n < 1) return 0;
                if(Object.is(n, 1) || Object.is(n, 2)) return ac1;
                return fibWithTail(n - 1, ac2, ac1 + ac2);
            };

            Timer('带尾递归优化的斐波那契数列', () => {
                console.log('带尾递归优化的斐波那契数列', fibWithTail(max));
            });

            // 带备忘录的斐波那契数列数列
            const fibWithMemo = (n: number): number => {
                if (n < 1) {
                    return 0;
                }
                // 备忘录
                return MemoForFib(n);
            };
            Timer('带备忘录的斐波那契数列数列耗时', () => {
                console.log('带备忘录的斐波那契数列数列', fibWithMemo(max));
            });
        });

        LogStart('凑零钱问题', () => {
            /**
             * 给你k种面值的硬币，面值分别为c1, c2 ... ck ，
             * 每种硬币的数量无限，再给一个总金额amount，
             * 问你最少需要几枚硬币凑出这个金额，如果不可能凑出，算法返回-1
             *
             * 这是一个动态规划问题，因为它具有最优子结构的。要符合最优子结构，子问题间必须相互独立
             */
            Timer('找零钱', () => {
                const coinChange = (coins: number[], amount: number) => {
                    // 定义：要凑出金额n，至少需要dp(n)个硬币
                    const dp = (n: number) => {
                        if (Object.is(n, 0)) return 0;
                        if (n < 0) return -1;
                        // 求最小值，所以初始化为正无穷
                        let res = Infinity;
                        for(let i = 0; i < coins.length; i++) {
                            const sub = dp(n - coins[i]);
                            if (Object.is(sub, -1)) continue;
                            res = Math.min(res, 1 + sub);
                        }
                        if (Object.is(res, Infinity)) {
                            return -1;
                        } else {
                            return res;
                        }
                    };
                    return dp(amount);
                };
                console.log('搜零钱', coinChange([1, 2, 5], 17));
            });

            Timer('带备忘录的找零钱', () => {
                const coinChange = (coins: number[], amount: number) => {
                    // 备忘录大大减少了子问题的数目，完全消除了子问题的冗余，所以子问题总数不会超过金额数，即子问题数目为O(n)。
                    const memo: number[] = [];

                    const dp = (n: number) => {
                        if (memo[n]) {
                            return memo[n];
                        }
                        if (Object.is(n, 0)) {
                            return 0;
                        }
                        if (n < 0) {
                            return -1;
                        }

                        let res = Infinity;
                        for (let i = 0; i < coins.length; i++) {
                            const sub = dp(n - coins[i]);
                            if (Object.is(sub, -1)) continue;
                            res = Math.min(res, 1 + sub);
                        }
                        // 记入备忘录
                        memo[n] = res
                        if (Object.is(res, Infinity)) {
                            return -1;
                        }
                        return memo[n];
                    };

                    return dp(amount);
                };
                console.log('带备忘录的找零钱', coinChange([1, 2, 5], 17));
            });

            Timer('基于dp数组的迭代算法的找零钱', () => {
                const coinChange = (coins: Array<number>, amount: number) => {
                    const dp = new Array(amount + 1).fill(amount + 1);
                    dp[0] = 0;
                    for (let i = 0; i < dp.length; i++) {
                        //  内层for在求所有子问题+1的最小值
                        for (let j = 0; j < coins.length; j++) {
                            // 子问题无解，跳过
                            if (i - coins[j] < 0) continue;
                            dp[i] = Math.min(dp[i], 1 + dp[i - coins[j]]);
                        }
                    }
                    return (Object.is(dp[amount], amount + 1)) ? -1: dp[amount];
                };
                console.log('基于dp数组的迭代算法的找零钱', coinChange([1, 2, 5], 17));
            });


        });

    }, []);
    return (
        <div>
            <h3>算法基础 - 动态规划</h3>
        </div>
    );
};

export default Base;

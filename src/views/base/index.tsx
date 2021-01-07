import React, {useEffect} from "react";
import MarkdownEditor from "../../components/MarkdownEditor";
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
                if(Object.is(n, 1) || Object.is(n, 2)) return ac2;
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
    const val1 = `
        public traverse(arr: number[]) {
            for (let i = 0; i < arr.length; i++) {
                // 迭代访问arr[i]
            }
        }
    `;
    const val2 = `
        /* 基本的单链表节点 */
        class ListNode<T> {
            public val: T;
            public ListNode: ListNode;
        }
        
        public traverse(head: ListNode) {
            let p = head;
            while(p.next) {
                p = p.next;
            }
        }
    `;
    const val3 = `
        /* 基本的二叉树节点 */
        class TreeNode<T> {
            public val: T;
            public left: TreeNode;
            public right: TreeNode;
        }
        
        public traverse(root: TreeNode): void {
            traverse(root.left);
            traverse(root.right);
        }
    `;
    const val4 = `
        const result = [];
        const backTrack = (路径，选择列表) => {
            if(满足结束条件) {
                result.add(路径);
                return;
            }
            for (let i = 0; i < 选择列表的长度; i++) {
                做选择
                backTrack(路径，选择列表);
                撤销选择
            }
        };
    `;
    return (
        <div>
            <h2>算法基础 - 动态规划</h2>
            <h3>一、数据结构的存储方式</h3>
            <p><strong>数据结构的存储方式只有两种：数组（顺序存储）和链表（链式存储）。</strong></p>
            <p><strong>数组</strong>由于是紧凑连续存储，可以随机访问，通过索引快速找到对应元素，而且相对节省存储空间。但正因为连续存储，内存空间必须一次性分配够，所以说数组如果要扩容，需要重新分配一块更多的空间，再把数据全部复制过去，时间复杂度为 O（N）;而且如果想在数组中间进行插入和删除，每次必须搬移后面的所有数据以保证连续，时间复杂度 O（N）。</p>
            <p><strong>链表</strong>因为元素不连续，而是靠指针指向下一个元素的位置，所以不存在数组的扩容问题；如果知道某一个元素的前驱和后驱，操作指针即可删除该元素或者插入新元素，时间复杂度 O（1）。但是正因为存储空间不连续，你无法根据一个索引算出对应元素的地址，所以不能随机访问；而且由于每个元素必须存储指向前后元素位置的指针，会消耗相对更多的存储空间。</p>
            <h3>二、数据结构的基本操作</h3>
            <p>对于任何数据结构，其基本操作无非遍历+访问，再具体点就是：增删改查。</p>
            <p>如何遍历+访问？各种数据结构的遍历+访问无非两种形式：线性的和非线性的。</p>
            <p>线性就是for/while迭代为代表，非线性就是递归为代表。再具体一点，无非以下几种框架：</p>
            <p>数组遍历框架，典型的线性迭代结构：</p>
            <MarkdownEditor val={val1}/>
            <p>链表遍历框架，兼具迭代和递归结构：</p>
            <MarkdownEditor val={val2} />
            <p>二叉树遍历框架，典型的非线性递归遍历结构：</p>
            <MarkdownEditor val={val3}/>
            <h2>算法基础 - 回溯算法</h2>
            <p>解决一个回溯问题，实际上就是一个决策树的遍历过程。你只需要思考3个问题：</p>
            <ol>
                <li>路径：也就是已经做出的选择</li>
                <li>选择列表：也就是你当前可以做的选择</li>
                <li>结束条件：也就是到达决策树底层，无法再做选择的条件</li>
            </ol>
            <MarkdownEditor val={val4} />
            <p><strong>其核心就是for循环里面的递归，在递归调用之前做选择，在递归调用之后撤销选择。</strong></p>

        </div>
    );
};

export default Base;

export namespace Ease {
    export type Func = (x: number) => number

    export const Linear: Func = (x) => x
    export const In: Func = (x) => x ** 2
    export const Out: Func = (x) => 1 - (1 - x) ** 2
    export const InOut: Func = (x) => 3 * x ** 2 - 2 * x ** 3
    export const Sin: Func = (x) => Math.sin(x * Math.PI)
    export const InSin: Func = (x) => 1 - Math.cos((x * Math.PI) / 2)
    /** 一度逆方向に溜めてから、勢いよく1へ到達する */
    export const InBack: Func = (x) => {
        const 溜め終わり = 0.95
        const 溜め深さ = 0.6
        const 震え回数 = 12
        const 震え幅 = 0.05
        if (x < 溜め終わり) {
            const t = x / 溜め終わり
            // 溜めるほど強く震える。t=1で0に戻るので解放と繋がる
            const 震え = 震え幅 * t * Math.sin(t * Math.PI * 2 * 震え回数)
            return -溜め深さ * Out(t) + 震え
        }
        return -溜め深さ + (1 + 溜め深さ) * In((x - 溜め終わり) / (1 - 溜め終わり))
    }

    export const join =
        (A: Func, B: Func): Func =>
        (x) =>
            A(B(x))
}

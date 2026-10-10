export declare namespace Ease {
    type Func = (x: number) => number;
    const Linear: Func;
    const In: Func;
    const Out: Func;
    const InOut: Func;
    const Sin: Func;
    const InSin: Func;
    /** 一度逆方向に溜めてから、勢いよく1へ到達する */
    const InBack: Func;
    const join: (A: Func, B: Func) => Func;
}

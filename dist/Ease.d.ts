export declare namespace Ease {
    type Func = (x: number) => number;
    const Linear: Func;
    const In: Func;
    const Out: Func;
    const InOut: Func;
    const Sin: Func;
    const InSin: Func;
    const join: (A: Func, B: Func) => Func;
}

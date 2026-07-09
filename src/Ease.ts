export namespace Ease {
    export type Func = (x: number) => number

    export const Linear: Func = (x) => x
    export const In: Func = (x) => x ** 2
    export const Out: Func = (x) => 1 - (1 - x) ** 2
    export const InOut: Func = (x) => 3 * x ** 2 - 2 * x ** 3
    export const Sin: Func = (x) => Math.sin(x * Math.PI)
    export const InSin: Func = (x) => 1 - Math.cos((x * Math.PI) / 2)

    export const join =
        (A: Func, B: Func): Func =>
        (x) =>
            A(B(x))
}

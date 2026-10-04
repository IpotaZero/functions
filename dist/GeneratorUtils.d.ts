export declare namespace GenUtils {
    /**
     * 複数のジェネレータを同時に進める
     *
     * 全ジェネレータが終了するまで yield し続ける。
     *
     * @example
     * yield* parallel({
     *     attackA: this.attackA(),
     *     attackB: this.attackB(),
     * })
     */
    export function all<T, K extends string>(gens: Record<K, Iterable<void>>): Generator<void, Record<K, T>, void>;
    /**
     * 複数のジェネレータを同時に進める。
     * いずれか1つが終了した時点で全体を終了し、
     * 最初に終了したジェネレータのインデックスを返す。
     *
     * @example
     * // タイムアウトつきの攻撃パターン
     * const result = yield* race({
     *      attack: attack(),
     *      timeout: wait(300),
     * })
     * if (result.key === "timeout") {
     *     // タイムアウトで終了した場合の処理
     * }
     */
    type GeneratorReturn<T> = T extends Iterator<unknown, infer R, unknown> ? R : never;
    type RaceResult<T extends Record<string, Iterator<unknown, unknown, unknown>>> = {
        [K in keyof T]: {
            key: K;
            value: GeneratorReturn<T[K]>;
        };
    }[keyof T];
    export function race<T extends Record<string, IterableIterator<unknown, unknown, unknown>>>(gens: T): Generator<void, RaceResult<T>, void>;
    /**
     * n フレーム待つジェネレータ。
     * parallel / race と組み合わせて使うと便利。
     *
     */
    export function waitFrames(n: number): Generator<void, void, void>;
    /**
     * ジェネレータを n 回繰り返す。
     *
     * @example
     * yield* repeat(3, () => this.attackPattern())
     */
    export function repeat(n: number, gen: (index: number) => IterableIterator<void, unknown, unknown>): Generator<void, void, unknown>;
    /**
     * ジェネレータのリストを順番に実行する。
     * 配列で渡せるので、動的にパターンを組み立てるときに便利。
     *
     * @example
     * yield* sequence([
     *     this.phase1(),
     *     this.phase2(),
     *     this.phase3(),
     * ])
     */
    export function sequence(gens: IterableIterator<void, void, unknown>[]): Generator<void, void, unknown>;
    export function waitForPromise<T>(promise: Promise<T>): Generator<void, T, void>;
    export {};
}

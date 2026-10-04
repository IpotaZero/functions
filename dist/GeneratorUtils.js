export var GenUtils;
(function (GenUtils) {
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
    function* all(gens) {
        const keys = Object.keys(gens);
        const results = {};
        const activeKeys = new Set(keys);
        const iterators = {};
        for (const key of keys) {
            iterators[key] = gens[key][Symbol.iterator]();
        }
        while (activeKeys.size > 0) {
            for (const key of activeKeys) {
                const step = iterators[key].next();
                if (step.done) {
                    results[key] = step.value;
                    activeKeys.delete(key);
                }
            }
            // まだ完了していないジェネレータがある場合は1回 yield して親に制御を戻す
            if (activeKeys.size > 0) {
                yield;
            }
        }
        return results;
    }
    GenUtils.all = all;
    function* race(gens) {
        const G = Object.entries(gens);
        while (true) {
            for (const [key, g] of G) {
                const res = g.next();
                if (res.done) {
                    return { key, value: res.value };
                }
            }
            yield;
        }
    }
    GenUtils.race = race;
    /**
     * n フレーム待つジェネレータ。
     * parallel / race と組み合わせて使うと便利。
     *
     */
    function* waitFrames(n) {
        yield* Array(n);
    }
    GenUtils.waitFrames = waitFrames;
    /**
     * ジェネレータを n 回繰り返す。
     *
     * @example
     * yield* repeat(3, () => this.attackPattern())
     */
    function* repeat(n, gen) {
        for (let i = 0; i < n; i++) {
            yield* gen(i);
        }
    }
    GenUtils.repeat = repeat;
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
    function* sequence(gens) {
        for (const gen of gens) {
            yield* gen;
        }
    }
    GenUtils.sequence = sequence;
    function* waitForPromise(promise) {
        let state;
        promise.then((value) => {
            state = { ok: true, value };
        }, (error) => {
            state = { ok: false, error };
        });
        while (state === undefined)
            yield;
        if (!state.ok)
            throw state.error;
        return state.value;
    }
    GenUtils.waitForPromise = waitForPromise;
})(GenUtils || (GenUtils = {}));

export class Awaits {
    static sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    static frame(fn = () => { }) {
        return new Promise((resolve) => requestAnimationFrame(() => {
            fn();
            resolve();
        }));
    }
    /**
     * 時間掛かり過ぎたら、Promiseを待たずに"timeout"を返す。
     */
    static timeout(ms, promise) {
        return Promise.race([promise, Awaits.sleep(ms).then(() => "timeout")]);
    }
    /**
     * Promiseを待つには待つが、時間掛かり過ぎたらローディングなどを表示する。
     */
    static async loading(ms, promise, whenOver) {
        let done = false;
        let over = false;
        Awaits.sleep(ms).then(() => {
            if (!done) {
                over = true;
                whenOver();
            }
        });
        const value = await promise;
        done = true;
        return { value, over };
    }
    static async waitElementReady(container) {
        const hasReadyPromise = Array.from(container.querySelectorAll("*")).filter((e) => e.ready instanceof Promise);
        await Promise.all(hasReadyPromise.map((e) => e.ready));
    }
    static async waitCSSLoad(container) {
        const links = Array.from(container.querySelectorAll('link[rel="stylesheet"]'));
        await Promise.all(links.map((link) => {
            if (link.sheet)
                return Promise.resolve(); // すでに読み込み済み
            return new Promise((resolve) => {
                link.onload = () => resolve();
                link.onerror = () => resolve(); // エラー時も進めるようにする
            });
        }));
    }
    static *yield(p) {
        let loaded = false;
        let result;
        p.then((r) => {
            result = r;
            loaded = true;
        });
        while (!loaded)
            yield;
        return result;
    }
}

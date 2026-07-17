export class Awaits {
    static sleep(ms: number): Promise<void> {
        return new Promise<void>((resolve) => {
            setTimeout(resolve, ms)
        })
    }

    static frame(fn = () => {}): Promise<void> {
        return new Promise<void>((resolve) =>
            requestAnimationFrame(() => {
                fn()
                resolve()
            }),
        )
    }

    /**
     * 時間掛かり過ぎたら、Promiseを待たずに"timeout"を返す。
     */
    static timeout<T>(ms: number, promise: Promise<T>): Promise<T | "timeout"> {
        return Promise.race([promise, Awaits.sleep(ms).then(() => "timeout" as const)])
    }

    /**
     * Promiseを待つには待つが、時間掛かり過ぎたらローディングなどを表示する。
     */
    static async loading<T>(
        ms: number,
        promise: Promise<T>,
        whenOver: () => void,
    ): Promise<{ value: T; over: boolean }> {
        let done = false
        let over = false

        Awaits.sleep(ms).then(() => {
            if (!done) {
                over = true
                whenOver()
            }
        })

        const value = await promise
        done = true

        return { value, over }
    }

    static async waitElementReady(container: Element): Promise<void> {
        type ElementWithReady = Element & { ready: Promise<unknown> }

        const hasReadyPromise = Array.from(container.querySelectorAll("*")).filter(
            (e: any): e is ElementWithReady => e.ready instanceof Promise,
        )

        await Promise.all(hasReadyPromise.map((e) => e.ready))
    }

    static async waitCSSLoad(container: Element): Promise<void> {
        const links = Array.from(container.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))

        await Promise.all(
            links.map((link) => {
                if (link.sheet) return Promise.resolve() // すでに読み込み済み
                return new Promise<void>((resolve) => {
                    link.onload = () => resolve()
                    link.onerror = () => resolve() // エラー時も進めるようにする
                })
            }),
        )
    }

    static *yield<T>(p: Promise<T>): Generator<void, T> {
        let loaded = false
        let result: T

        p.then((r) => {
            result = r
            loaded = true
        })

        while (!loaded) yield

        return result!
    }
}

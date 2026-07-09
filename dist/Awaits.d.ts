export declare class Awaits {
    static sleep(ms: number): Promise<void>;
    static frame(fn?: () => void): Promise<void>;
    /**
     * 時間掛かり過ぎたら、Promiseを待たずに"timeout"を返す。
     */
    static timeout<T>(ms: number, promise: Promise<T>): Promise<T | "timeout">;
    /**
     * Promiseを待つには待つが、時間掛かり過ぎたらローディングなどを表示する。
     */
    static loading<T>(ms: number, promise: Promise<T>, whenOver: () => void): Promise<{
        value: T;
        over: boolean;
    }>;
    static waitElementReady(container: Element): Promise<void>;
    static waitCSSLoad(container: Element): Promise<void>;
    static inputFile(extension: string): Promise<File | null>;
}

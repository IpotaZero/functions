export declare namespace Files {
    function downLoadString(string: string, defaultName: string, extension?: string): void;
    function inputFile(extension: string): Promise<File | null>;
}

export namespace Files {
    export function downLoadString(string: string, defaultName: string, extension: string = "json") {
        // 2. ユーザーにファイル名を決めてもらう
        // キャンセルされたら終了
        const fileName = window.prompt("保存するファイルを命名しよう", defaultName)
        if (fileName === null) return

        // 3. JSONをBlob（塊）に変換
        const blob = new Blob([string])

        // 4. ダウンロード用のリンクを「メモリ上」に作成
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")

        a.href = url
        a.download = `${fileName}.${extension}` // 拡張子を付ける

        // 5. リンクを自動クリックしてダウンロード開始
        a.click()

        // 6. 後片付け
        URL.revokeObjectURL(url) // メモリを解放
    }

    export function inputFile(extension: string): Promise<File | null> {
        // 1. ファイルを選択するための隠し input 要素を作成
        const input = document.createElement("input")
        input.type = "file"
        input.accept = extension

        return new Promise<File | null>((resolve) => {
            // 2. ファイルが選択された時の処理
            input.onchange = async () => {
                const file = input.files?.[0]
                if (!file) {
                    resolve(null)
                    return
                }

                resolve(file)
            }

            // 3. ファイル選択ダイアログを表示
            input.click()
        })
    }
}

Excelr
======

エクセルからデータを抜き取り、htmlを生成します。

![img](https://user-images.githubusercontent.com/7459529/28049135-3df75f0a-6630-11e7-9e28-a732aff14bcb.png)


Feature
-------

- エクセルデータを読み込み
- テンプレートへ流し込み

Howto
-----

1. 作業フォルダへファイル一式を持っていき `npm install` を実行しモジュールをインストール
2. "データをテンプレートへ埋め込み、htmlを生成" の部分を必要に応じて書き換え
3. `npm start` で実行

Modules
-------

- **[Exceljs](https://github.com/guyonroche/exceljs)** : エクセルファイルを取り込む
- **[Nunjucks](https://mozilla.github.io/nunjucks/)** : テンプレートエンジン

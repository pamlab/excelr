// モジュールの読み込み
const fs         = require('fs');
const nunjucks   = require('nunjucks');
const Excel      = require('exceljs');
const mkdirp     = require('mkdirp');
const beautify   = require('js-beautify').html;
const getDirName = require('path').dirname;
const workbook = new Excel.Workbook();

// オプションを設定
const config = require('./config.json');
const opt = {
    data      : config.data,          // エクセルファイルを指定
    tmpl      : config.template_path, // テンプレートを指定
    total     : config.total_row,     // 行の総数
    startRow  : config.start_row,     // 開始行
    columnNum : config.total_column   // カラムの数
};

// データをテンプレートへ埋め込み、htmlを生成
const makeFile = (cb, index, ...array) => {
    fs.readFile(opt.tmpl, 'utf8', (err, data) => {

        // Nunjucksでテンプレへ値を埋め込み
        const str = nunjucks.renderString(data, {
            pref_name: array[0],
            location: array[1]
        });

        const result = beautify(str.replace(/\r?\n/g,""), {
            "indent_size" : 4,
            "indent-char" : " "
        });

        // 設置するディレクトリ・ファイル名を設定
        const filename = `./dist/${array[2]}/index.html`;

        // ディレクトリを作成しつつファイルを設置
        mkdirp(getDirName(filename), err => {
            fs.writeFile(filename, result, cb);
        });
    });
};

// エクセルからデータを抜き出し配列化、テンプレートへ
workbook.xlsx.readFile(opt.data).then(() => {
    return new Promise((resolve, reject) => {
        const sheet1 = workbook.getWorksheet(1); // シートを指定
        let count = 0;

        for (let i = opt.startRow; i <= opt.total + 1; i++) {
            let array = [];

            // 行の数だけ実行
            for (let j = 1; j <= opt.columnNum; j++) {

                // セルの要素を配列へ格納
                array.push(sheet1.getCell(i, j).value);
            }

            // 配列をテンプレートへ送出
            makeFile(err => {
                if (err) reject(err);

                count++;
                if (count >= opt.total) resolve('Complete!!');
            }, i, ...array);
        }
    });
}).then(msg => {
    console.log(msg);
}).catch(err => {
    console.error(err);
});

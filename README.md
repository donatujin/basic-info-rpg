# 基本情報クエスト（iPhone向けPWA）

## 現在の引き継ぎ状態
- Lv.2 / 140 XP
- 正解8、不正解0、正答率100%、連続正解8
- 第9問（OR）未回答
- 端末内保存（LocalStorage）

## まず動かす
PWAは `file://` からは正しく動きません。HTTPSで公開するか、ローカル開発サーバーで起動してください。

### すぐ試す（PC）
Pythonがある環境で、このフォルダ内から次を実行：
```bash
python -m http.server 8000
```
ブラウザで `http://localhost:8000` を開きます。

## iPhoneに追加する
1. HTTPSで公開する（GitHub Pages、Cloudflare Pages等）。
2. iPhoneのSafariで公開URLを開く。
3. 共有ボタン →「ホーム画面に追加」。
4. 「Webアプリとして開く」が表示されたら有効にして追加。

## AI APIについて
フロントエンドにAPIキーを埋め込まないでください。設定画面の「AI解説APIの接続先」には、あなたが用意したバックエンドのHTTPSエンドポイントを指定します。

アプリは次のJSONをPOSTします：
```json
{
  "question": "問題文",
  "choices": ["選択肢A", "選択肢B"],
  "correctAnswer": "正解文",
  "userAnswer": "回答文",
  "isCorrect": true,
  "explanation": "基本解説",
  "level": 2
}
```
バックエンドは次の形式で返してください：
```json
{"explanation":"理解を助ける追加解説"}
```
APIキーはバックエンドの環境変数等に保管し、ブラウザへ返さない構成にします。AI APIを使わなくても、問題演習・XP・履歴は動作します。

## 保存とバックアップ
- 学習データはブラウザのLocalStorageに保存されます。
- 設定画面からJSONバックアップと復元ができます。
- Safariの履歴・Webサイトデータを消去すると学習データが消える可能性があります。定期的にバックアップしてください。
- LocalStorageは同じ端末・同じブラウザ内の保存です。複数端末間の同期はありません。

## MVPの範囲
- RPG風ホーム画面、XP・レベル・連勝
- 問題回答、正誤判定、解説
- 苦手問題リスト、学習履歴
- PWAマニフェスト、Service Worker
- AI解説APIの接続口
- ローカル保存とJSONバックアップ

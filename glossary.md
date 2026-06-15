# 用語集

## URL・API関連

- **boards** : Trelloの「ボード」。タスク管理の作業スペース単位
- **/api/boards** : ボード一覧を操作するAPI窓口
- **エンドポイント** : APIの受け取り口（URLのこと）
- **200 OK** : リクエスト成功のサインボード

## Spring Boot

- **@RestController** : ホールスタッフ。リクエストを受け取る役割
- **@GetMapping** : GETリクエスト（データ取得）担当
- **@RequestMapping** : URLのパスを指定するアノテーション
- **Controller** : 注文を受け取るホールスタッフ
- **Service** : 調理判断をする料理長
- **Repository** : DBから食材を取り出す冷蔵庫係  
Service：ビジネスロジックを担当する層。Controllerからの依頼を処理する
  Repository：DBへのデータ取得・保存を担当する層
  bootRun：Spring Bootのサーバーを起動するGradleコマンド

## DB・環境

- **JPA** : JavaからDBを操作する専用トング
- **JAVA_HOME** : Javaの場所をPCに教える設定
- **bootRun** : 厨房に火を入れる（サーバー起動）コマンド  
  
## フロントエンド・接続
  - **Vite**：フロントエンドの開発サーバー`npm run dev` で起動する
  - **React**：UIを部品（コンポーネント）単位で作るJavaScriptライブラリ
  - **TypeScript**：JavaScriptに型チェックを加えた言語。バグを早期に発見できる
  - **npm run dev**：フロントエンドの開発サーバーを起動するコマンド
  - **localhost:5173**：フロントエンドの開発用URL
  - **localhost:8080**：バックエンドのAPI用URL
  - **CORS**：異なるポート間の通信を許可するセキュリティ設定。フロントとバックを繋ぐために必要
  - **[CorsConfig.java](http://CorsConfig.java)**：SpringBootでCORSを設定するJavaクラス
  - **featureブランチ**：新機能を開発するための作業用ブランチ。masterに直接pushしない運用


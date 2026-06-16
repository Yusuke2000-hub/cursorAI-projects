# Trello 風タスク管理アプリ

RaiseTech AI 講座の学習課題として作成する、Trello に着想を得たカンバン方式のタスク管理 Web アプリケーション。

## 技術スタック

| レイヤ | 技術 | バージョン |
|--------|------|------------|
| フロントエンド | React（Vite 経由） | 19.x |
| フロントエンド | TypeScript | 6.0.x |
| フロントエンド | Vite | 8.x |
| バックエンド | Java（Microsoft OpenJDK） | 21 |
| バックエンド | Spring Boot | 4.0.0 |
| バックエンド | Gradle | 8.14 |
| データベース | PostgreSQL | 18.4 |

## 起動手順

### フロントエンド

```bash
cd trello-app
npm install
npm run dev
```

ブラウザで http://localhost:5173 にアクセス。

### バックエンド

```bash
cd trello-api
./gradlew bootRun
```

API は http://localhost:8080 で起動。終了は Ctrl+C。

## ディレクトリ構成

```
cursorAI-projects/
├── README.md
├── requirements.md
├── trello-app/        # フロントエンド（React + Vite）
└── trello-api/        # バックエンド（Spring Boot）
```

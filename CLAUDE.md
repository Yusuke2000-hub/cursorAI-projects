# CLAUDE.md - Claude Code ルール設定

## プロジェクト概要
RaiseTech AI講座・Trello風タスク管理アプリ

## 基本ルール

### 言語
- 返答は必ず日本語で行う
- コメントも日本語で書く

### Gitブランチ運用
- mainブランチへの直接pushは禁止
- 作業は必ずfeatureブランチで行う
- ブランチ名はIssue番号と連動させる
  例：feature/1-board-list-api
- マージ後はブランチを削除する
- PR作成時は本文に `Closes #{issue番号}` を含め、マージ時に自動クローズさせる
- モノレポ構成のため、`git add` 時はファイルを明示的に指定し、フロントエンド/バックエンドの変更を混在させない

### コーディングルール
- レイヤードアーキテクチャを厳守する
  Controller → Service → Repository → DB
- ControllerはRepositoryを直接呼ばない
- 1メソッド1責務で書く
- バックエンド: Spotless（google-java-format）でフォーマット統一。コミット前に spotlessApply を実行
- フロントエンド: ESLintでチェック。npm run lint をエラー・警告ゼロで通過させること
- 例外処理: orElseThrow を用い、GlobalExceptionHandler（@RestControllerAdvice）で一元管理する

### 技術スタック
- Java 21（Microsoft OpenJDK）
- Spring Boot 4.0.0
- PostgreSQL 18.4
- Gradle 8.14
- フロントエンド: React 19, TypeScript, Vite（trello-app）

### 作業前の確認事項
- JAVA_HOME が設定されているか確認する
- bootRun終了時は必ずCtrl+Cで停止する
- npm run dev終了時も必ずCtrl+Cで停止する

## 作業スタイル

- 変更は一度に大きくまとめず、1件ずつ確認しながら進める（planモードでの手動承認を前提とする）
- 変更理由（なぜその修正が必要か）を明確にしてから実装する

## ポート管理ルール
- バックエンド：localhost:8080（変更禁止）
- フロントエンド：localhost:5173（変更禁止）
- ポート競合が発生した場合は別ポートで起動せず、必ず指定ポートで解決する

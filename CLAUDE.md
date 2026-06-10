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

### コーディングルール
- レイヤードアーキテクチャを厳守する
  Controller → Service → Repository → DB
- ControllerはRepositoryを直接呼ばない
- 1メソッド1責務で書く

### 技術スタック
- Java 21（Microsoft OpenJDK）
- Spring Boot 4.0.0
- PostgreSQL 18.4
- Gradle 8.14

### 作業前の確認事項
- JAVA_HOME が設定されているか確認する
- bootRun終了時は必ずCtrl+Cで停止する

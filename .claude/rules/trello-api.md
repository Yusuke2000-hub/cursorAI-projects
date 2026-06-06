---
paths:
  - trello-api/**/*
---

# trello-api（Spring Boot）

- Java 21、Spring Boot 4、PostgreSQL（`application.yml` の接続先）
- API は `http://localhost:8080`（`server.port`）
- ビルド・テスト: `trello-api` ディレクトリで `.\gradlew.bat test` / `.\gradlew.bat bootRun`
- レイヤー: `controller` → `service` → `repository` → `entity`（`com.example.trelloapi`）
- 要件の詳細はリポジトリ直下の `requirements.md` を参照

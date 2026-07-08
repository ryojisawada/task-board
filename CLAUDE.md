# CLAUDE.md

このファイルは、このリポジトリで作業する際のClaude Code向けガイダンスです。

## プロジェクト概要

タスクの追加・完了切替・削除ができるタスクボードアプリ。タスクはブラウザのlocalStorageに保存され、リロードしても消えない。

## デプロイ先

https://ryojisawada.github.io/task-board/

- `main`ブランチへのpushをトリガーに、GitHub Actions（[.github/workflows/deploy.yml](.github/workflows/deploy.yml)）が自動でビルド・デプロイする。
- ビルド成果物（`dist/`）は手動でデプロイしない。必ずワークフロー経由で公開する。
- GitHub Pagesの公開パスに合わせて、本番ビルド時のみ`vite.config.ts`の`base`を`/task-board/`にしている（開発サーバーは`/`のまま）。

## 技術スタック

- React 19 + TypeScript
- Vite（ビルドツール・開発サーバー）
- oxlint（Lint）
- ライブラリなしの素の`useState`/`useEffect`で状態管理（追加の状態管理ライブラリは導入しない）
- 永続化はブラウザの`localStorage`のみ（バックエンド・DBなし）

## コンポーネントの命名規約

- コンポーネントは`src/components/`配下に1コンポーネント1ファイルで配置し、ファイル名・関数名ともにPascalCase（例: [TaskForm.tsx](src/components/TaskForm.tsx), [TaskItem.tsx](src/components/TaskItem.tsx), [TaskList.tsx](src/components/TaskList.tsx)）。
- ドメイン名（`Task`）を先頭に置き、役割を表す語（`Form`/`Item`/`List`）を後ろに続ける（`{ドメイン}{役割}`形式）。
- Props型は`{コンポーネント名}Props`という名前のinterfaceで、コンポーネントと同じファイル内に定義する。
- 型定義は共通のものを[src/types.ts](src/types.ts)に集約し、コンポーネントからは`import type`で参照する。
- CSSクラス名はBEM風に`.task-item`, `.task-item__label`, `.task-item--completed`のように、ブロック／エレメント／モディファイアを`__`/`--`で区切る。

## Git運用ルール

- **コードを変更するたびに、その変更をコミットし、GitHubにプッシュすること。**
  - 変更後は都度 `git add` → `git commit` → `git push` を実行し、リモート（GitHub）を常に最新の状態に保つ。
  - 変更をローカルに溜め込んだまま放置しない。
- コミットメッセージは変更内容が分かるように簡潔に記載する。
- force push（`git push --force`）やhistoryを書き換える操作は、明示的に指示がない限り行わない。
- コミット前に `git status` / `git diff` で変更内容を確認する。

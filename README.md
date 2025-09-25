# スムージー EC サイトの制作プロジェクト

##　現状の注意点を以下に示します。

- とりあえず、DB(supabase)に関しては、開発環境と本番環境をまだ分けてないです。本番環境が必要になったら、以下のいずれかの対処を行なってください
  - Supabase のサイト上で、別プロジェクトを作成し、そちらを本番環境として使う。(容量などは共有なので、リソース制限に注意が必要)
  - 現在のものを本番環境として、開発環境を分ける
    - Supabase 公式のローカル DB を構築して、それを開発環境とする。`supabase start`とか。docker 使うので設定が少し面倒そう。
    - Postgres を自分の PC に直接インストールして、Prisma の DATABASE_URL をそこに向ける。GUI ツールとして Sequel Ace で接続する。
- また、本番環境時に必要なことをまとめておきます。
  - Vercel 上では、環境変数 `DATABASE_URL` のポート番号が 6543 であることを確認してください。
    - ※もしかしたら、それでだと下記の自動マイグレーションができないかもしれないので、またその時は手動でマイグレーションするかポート番号の変更が必要。
  - デプロイ時に自動で migration をしてくれるように`package.json` の `scripts` セクションに以下を追加します:
    ```json
    {
      "scripts": {
        "postinstall": "prisma generate",
        "vercel-build": "prisma migrate deploy"
      }
    }
    ```
    👉 こうすると、GitHub に push → Vercel が build → 本番 Supabase に自動で migrate が流れる。

## DB 接続 URL の使い分け

### DB の操作関連の URL(本番でも開発でも)

- **URL**：`DATABASE_URL`
- **ポート**：6543（pgBouncer 経由：多重接続に強い）
- **操作**：単純な読み書きなど
- **例**：Next.js API Route で Prisma Client を使う

### マイグレーション / スキーマ変更

- **URL**：`DIRECT_URL`
- **ポート**：5432（Direct Connection：DB に直接接続）
- **操作**：`yarn db:migrate:dev` / `yarn db:push` / `yarn db:studio`

#### マイグレーションの手順

1. 必要に応じて開発中は `DATABASE_URL` を 5432 に一時変更して `yarn db:migrate:dev` などを実行
2. マイグレーション完了後、`DATABASE_URL` を 6543（pgBouncer 用）に戻す  
   ※マイグレーション後に戻しても、DB 操作やマイグレーションには影響なし

### 本番デプロイ

- **URL**：Vercel 等に登録した本番用環境変数（`DIRECT_URL`）
- **コマンド**：`yarn db:migrate:deploy`
- **ポイント**：既存マイグレーションを本番 DB に安全に適用

## DB 操作用のコマンド詳細

### 開発中

- `yarn db:migrate:dev --name <message>`  
  モデル変更を反映 & マイグレーションファイル生成（開発専用）
  - ⚠️ マイグレーション時は環境変数の`DATABASE_URL`のポート番号を 5432 に、それ以外時は 6543 にする ⚠️
    - 直接接続（5432）は DB にフルアクセスでき、スキーマ変更やマイグレーションが可能。
    - コネクションプール（6543）は同時接続数を効率化しますが、DDL（テーブル定義変更など）は制限される場合がある。
- `yarn db:push`  
  スキーマを即座に反映（履歴なし、本番禁止）

- `yarn db:studio`  
  ブラウザで DB を操作
  → これで DB の操作が可能に。

---

### 本番 / CI

- `yarn db:migrate:deploy`  
  既存マイグレーションを本番 DB に適用（安全）←vercel で自動でやるので、あまり気にしなくて良いと思う。

  ※ちなみに、開発環境で `yarn db:migrate:deploy` を実行した場合は、  
  `.env.local` の `DIRECT_URL` に従って接続されます。  
  接続先は dev と同じ（`DIRECT_URL` で指定された DB）です。
  違いは以下の通りです：

  - `migrate dev` は新しいマイグレーションファイルを生成しつつ適用します。
  - `migrate deploy` は既存マイグレーションを順番に適用するだけです。
    つまり、開発環境でも `deploy` を使えますが、マイグレーションファイルの作成はできないので注意してください。

- `yarn prisma:generate`  
  Prisma Client を再生成

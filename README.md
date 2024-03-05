# firebase プロジェクトの設定
- Authentication を開始して、 mail と google を有効にする
- Cloud Firestore を開始する


# `.env.local`
- json ファイルを環境変数に設定するときは、key を`""` で囲んで、[改行を削除](https://www.textfixer.com/tools/remove-line-breaks.php)
## `AUTH_SECRET`
```shell
npx auth secret
```
## `NEXT_PUBLIC_FIREBASE_CONFIG`
- firebase SDK で使用
- console から `firebaseConfig`を取得

## `NEXT_FIREBASE_SERVICE_ACCOUNT_KEY`
- firebase Admin SDK　で使用
- サービスアカウント > `新しい秘密鍵を生成`

## `NEXT_PUBLIC_ADMIN_UID`
- admin の uid を設定
- `SetAdminButton`を押して、`NEXT_PUBLIC_ADMIN_UID`の`Custom Claim` に `Admin` を設定する


# deploy
## `Firebase: Error (auth/unauthorized-domain).`がでた場合
- firebase console Authentication 承認済みドメインに`anonymous-login.vercel.app`を追加
- `NEXTAUTH_URL`は`http://localhost:3000`のままでも正常動作

# primary color について
shadcn で primary color が設定されているので、
アプリで使うメインテーマは`tailwind.config.ts`に`main`として登録

# firebase エミュレータ
```zsh
# 設定で Firestore, Emulators を選ぶ
firebase init
# Emulators Setup で Auth, Firestore を選ぶ
```

## 1. エミュレータへの接続
### a. Admin SDK firestore
環境変数に`FIRESTORE_EMULATOR_HOST`を設定
### b. Admin SDK auth
環境変数に`FIREBASE_AUTH_EMULATOR_HOST`を設定
### c. SDK auth
```js
import { getAuth, connectAuthEmulator } from "firebase/auth";
const isDev = process.env.NODE_ENV === "development";
if (isDev) {
  connectAuthEmulator(authClient, "http://127.0.0.1:9099");
}
```

## 2. エミュレータの立ち上げ
```zsh
firebase emulators:start
```
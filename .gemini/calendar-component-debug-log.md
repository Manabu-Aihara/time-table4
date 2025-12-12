# Calendarコンポーネントのテスト修正とデバッグ記録

## 1. `Calendar.spec.tsx` のテスト修正

### 1.1. 問題点

- `Calendar.spec.tsx` のテストが `DnDCalendar` を参照していたため、`MyCalendar` を使用するように修正する必要があった。
- `authId` に紐づくイベントのフィルタリングテストが失敗していた。

### 1.2. 原因の調査

1.  **`authId` の型:**
    - `CalendarComponent.tsx` 内の `useAuthInfo()` から取得する `authId` が、テスト実行時に `string` 型になっている可能性が浮上した。

2.  **イベントデータの日付型:**
    - `react-big-calendar` が `start` と `end` プロパティに `Date` オブジェクトを期待しているのに対し、渡されているデータが `string` 型のままだった。
    - これにより、`TypeError: d[("get" + method)] is not a function` という `react-big-calendar` 内部のエラーが発生していた。

3.  **制約事項:**
    - `Timeline` コンポーネントとの連携上、イベントの `start_time` と `end_time` を `Date` 型に直接変更することはできない。

### 1.3. 提案された修正

- **`Calendar.stories.tsx` の修正:**
    - `composeStories` を使用してテストを記述できるように、`Calendar.stories.tsx` に `args` を追記する。

- **`CalendarComponent.tsx` の修正:**
    - イベントデータを `react-big-calendar` に渡す直前で、`start_time` と `end_time` を `string` 型から `Date` オブジェクトに変換する処理を追加する。

### 1.4. テスト失敗の解釈

- 認証情報 (`useAuthInfo`) の解決やイベントの描画が完了する前にテストが実行され、イベント数が0件としてアサーションが行われている可能性がある。
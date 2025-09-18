# セレクトボックス色分け機能

## 1. 要件定義

### 1.1. 機能概要
タスクの進捗状況に応じて、セレクトボックスの表示色を変更し、視覚的に進捗を分かりやすくする。

### 1.2. 対象画面
- タスク詳細入力・編集フォーム (`/home/nabu_dvl/workspace/time-table4/src/components/organisms/InputItem.tsx`)

### 1.3. 機能要件
- 進捗セレクトボックスの選択肢に応じて、セレクトボックスの背景色が変わること。
- 色の変化は以下の通りとする。
    - **これから**: 赤系統
    - **まだ**: ピンク系統
    - **もうすぐ**: 紫系統
    - **完了**: 青系統

## 2. 設計

### 2.1. 対象ファイル
- `/home/nabu_dvl/workspace/time-table4/src/components/organisms/InputItem.tsx`

### 2.2. 実装方針
- 個々の`<option>`要素への直接的な色付けは、ブラウザ間の互換性の問題があるため、`<Select>`コンポーネント自体の背景色を変更する方針とする。
- Chakra UIの`backgroundColor`プロパティを利用して動的に色を適用する。

### 2.3. 詳細設計

#### 2.3.1. データ構造の変更
`OptionType`に`color`プロパティを追加し、各選択肢に対応する色情報を保持する。

```typescript
type OptionType = {
	value: string;
	label: string;
	color: string; // 追加
}

const options: OptionType[] = [
	{value: 'from now', label: 'これから', color: 'red.100'},
	{value: 'still', label: 'まだ', color: 'pink.100'},
	{value: 'almost', label: 'もうすぐ', color: 'purple.100'},
	{value: 'complete', label: '完了', color: 'blue.100'}
];
```

#### 2.3.2. UIコンポーネントの変更
選択されている`eventItem.progress`の値から対応する`color`を探し出し、`<Select>`コンポーネントの`backgroundColor`に設定する。

```typescriptreact
// 選択された進捗に応じてSelectコンポーネントの背景色を変更します。
const selectedOptionColor = options.find(o => o.label === eventItem.progress)?.color;

// ...

<Select
    name="progress"
    value={eventItem.progress}
    onChange={handleChange}
    backgroundColor={selectedOptionColor} // 動的に背景色を適用
>
    {/* ... options ... */}
</Select>
```
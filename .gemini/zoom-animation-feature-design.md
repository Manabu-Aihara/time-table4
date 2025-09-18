## 1. 機能設計書

### 1.1. 前提

 - React(Vite), TypeScriptを使用。
 - "react-calendar-timeline-v3" ライブラリのTimelineコンポーネントを既に使用している。
 - "react-calendar-timeline-v3" ライブラリは、アニメーション機能も提供しているため、1.4節で述べるアニメーション機能は1.3節での実装が困難なときの代替案とする。

### 1.2. 対象ファイル

- タイムライン (`/home/nabu_dvl/workspace/time-table4/src/components/pages/TimelineComponent.tsx`)
```js
    const state ← DBからfetchした、全てのタイムラインアイテムの配列
    <Timeline
        {...timelineProps}
        items={state.map((item) => {
            return {
              ...item, ← ここのアイテムをドラッグすることでズームできる
              }
        })}
    >
```

### 1.3. 実装要件 (ズーム機能)

 - [React Calendar Timeline](https://github.com/namespace-ee/react-calendar-timeline)を読み込み、アイテムのドラッグに適したプロパティを使用する。具体的には`onItemDrag`プロパティを使用する。

 - ズーム機能は、`onItemDrag`プロパティを使用して、アイテムのドラッグイベントを検知し、タイムラインの表示範囲を動的に変更することで実現する。

 - ズームイン・ズームアウトの切り替えは、ドラッグの方向（左右）によって判断する。

 - ズームの度合いは、ドラッグの距離に応じて調整する。

 - ズームは、タイムライン全体に及ぶので、その都度適切なプロバティを設定する。そのため、再度[React Calendar Timeline](https://github.com/namespace-ee/react-calendar-timeline)を読み込む必要がある。

 - hookが必要なら、`src/hooks/useZoomAnimation.tsx`にhook関数を実装する。

### 1.4. 代替案 (アニメーション機能)
 - ズームイン・ズームアウト時に、タイムラインの表示が滑らかに変化するようなアニメーションを実装する。
 - アニメーションは、CSSトランジションまたはReact Springなどのライブラリを使用して実現する。
 - アニメーションの速度やイージングは、ユーザー体験を考慮して調整する。
 - アニメーションの開始・終了時に、適切なコールバック関数を呼び出すことで、他の処理と連携できるようにする。
 - アニメーションの状態（開始、進行中、終了）を管理し、必要に応じてUIの更新や他のロジックをトリガーできるようにする。
 - アニメーション中にユーザーが別の操作を行った場合、アニメーションを中断し、新しい操作を優先する。

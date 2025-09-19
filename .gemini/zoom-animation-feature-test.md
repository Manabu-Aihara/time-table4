## テスト

### 開発方法
 1. ズームのロジックは、ヘルパー関数として実装します。`src/lib/timelineZoomUtils.ts`。必要に応じて、`src/tests/timelineZoomUtils.spec.ts`にテストコードを記述する。
 2. Storybookで必要と考えられる場合、最低限の実装（Timelineの必須プロパティのみ、数件のgroups,itemsのダミーを用意したうえ）でズームアニメーションのコンポーネントを実装する。`src/components/organisms/TimelineZoomAnimation.tsx`
 3. 2でコンポーネントを実装した場合、Storybookで、ズームアニメーションのコンポーネントを開発する。`src/stories/TimelineZoomAnimation.stories.tsx`
 

## バックエンドドRepo: [daily-mind-rails-backend](https://github.com/lei900/daily-mind-rails-backend)
## サービスURL：　[Daily Mind](https://www.idailymind.com/)

### サービス概要

自己否定感などネガティブな感情から抜け出したい人に、

認知療法に基づいたセルフケア方法を提供するサービスです。

認知療法を勉強するためのクイズ機能、ユーザー間交流機能も提供しています。

### メインのターゲットユーザー

ストレスや不安、自己否定感などネガティブな感情から気持ちの切り替えが難しい人

### ユーザーが抱える課題

ネガティブな考えに囚われるとき、自分の考え方のゆがみに気づき、そのゆがみを見直し、つらい気持ちから抜け出すことが難しくなる。

### ユーザーに提供する解決策

自動思考や認知の歪みなど基本概念をクイズ形式で学習し、認知行動療法を活用して自分の思考を記録・分析する機能を提供する。

また、ユーザー間相互交流機能も提供し、他のユーザーの分析方法を参照したり、アドバイスを求めたりすることができる。

### サービスを使用したユーザーの未来像

認知療法の基本概念を理解し、自分で実践することでストレスや辛い気分を改善することができる。

さらに、自分の気持ちや思考を記録することを習慣化にする。

### なぜこのサービスを作りたいのか？

自分だけでなく、よく自己否定したり、ネガティブな気分になりがちな友達が結構いる。

しかし、認知行動療法を実践する方法として、気持ちの記録機能を提供する既存のアプリは多いが、考え方のゆがみを見直すための勉強機能を提供していない。

友達と一緒に認知行動療法を勉強して、考え方のゆがみに気づき、見直す習慣を身に付けたいと思う。

### 実装機能

- 未ログインユーザー

  - 認知行動療法や認知のゆがみについての基本紹介ページを閲覧できる
  - 認知行動療法を勉強するクイズを実行できる
  - 他人の公開記録を閲覧できる
  - 他人のユーザーページを閲覧できる

- ログインユーザー

  - 自分の日記・思考分析の作成、下書き保存、一覧、詳細、編集、削除
  - 他人の公開記録を閲覧、コメント、いいね、ブックマークできる
  - マイページから自分が作成した記録、いいね、ブックマークした他人の記録一覧を確認できる
  - 匿名認証ユーザーは通常ユーザーへアップグレードすることができる

- 管理ユーザー

  - ユーザーの検索、一覧、詳細、編集、削除
  - クイズの一覧、詳細、作成、編集、削除
  - 公開記録一覧、詳細、編集、削除
  - コメント一覧、詳細、編集、削除

### 画面遷移図

Figma リンク  
https://www.figma.com/file/s1FsnwtiZpqgXouTMo6ap3/Daily-mind-Screen-transitions

### ER 図

![daily-mind-er-diagram](https://user-images.githubusercontent.com/97896554/216803080-79797fad-cbcc-481b-8a5e-d86093540e49.png)

### 使用技術

フロントエンド
Next.js 13.0.4 (React 18.2.0) + TypeScript 4.9.3

UI フレームワーク： Tailwind CSS 3.2.4 + NextUI v1.0.0

バックエンド
Rails 7.0.4

認証
Firebase Authentication

デプロイ
Vercel、fly.io

### 技術を選定した理由

**Next.js:** 
近年特に勢いのあるReactフレームワーク。

Server Side RenderingやStatic Generationなどの機能で画面特徴により異なる画面表示形式を実装可能。

Pre-rendering機能で画面の表示が高速になる。

また、単純なReactよりルーティングが簡単で、SEO 効果が良い。

ドキュメントが豊富で、コミュニティも活発して安心できる。

**TypeScript:　**

静的な型チェックでより安全的に開発できるため

**Tailwind CSS:** 

class属性を記述する必要なく、設計時間が短縮できる。hoverやレスポンシブ対応が楽になり、実装速度が速くなる。

**Firebase Authentication:** 

ユーザー情報の安全性を考慮したため。

ソーシャルログインの対応や匿名認証機能が便利なため。

### 既存の類似サービスとの比較したメリット

- 単純な個人記録機能だけでなく、認知療法の基本概念を勉強するためのクイズ機能とユーザー間相互交流機能を提供している。
- 認知療法に対してまだ詳しくないユーザーに対して、思考分析をよりしやすくため、歪みの定義や分析のやり方を作中にヒントとして提示するなどUX向上

### メリットを最大にするためにどういった工夫をしたか

- 認知療法の基本概念をよりわかりやすいようにするため、日本人ユーザーの生活に寄り添った事例を取り上げ、独自コンテンツを企画して、クイズ形式で提供する。
- 個人記録機能とユーザー間相互交流機能を同時に実現するため、投稿は公開、非公開で設定できる。
- 辛い気持ちを感じるユーザー間の相互応援を促進するため、投稿への応援とコメント機能を追加した。
- また、ユーザーの公開投稿を促進するため、ユーザーのソーシャルアカウント情報を直接使うのでなく、ユーザー名とプロフィール画像をデフォルトで匿名形式で設定している。
- 思考記録するとき、認知の歪みの概念や事例を含めた基本紹介を提示することで、ユーザーが自分の思考の歪みをより分析しやすくなる。

### スケジュール

- 企画〜技術調査(React 学習）：10/20 〆切
- README〜ER 図作成：10/27 〆切
- メイン機能実装：10/27 - 1/8
- β 版を RUNTEQ 内リリース（MVP）：1/10 〆切
- 本番リリース：1/25 〆切

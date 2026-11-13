const STORAGE_KEY = "basicInfoQuestSave_v1";
const initialState = {
  xp: 140, correct: 8, wrong: 0, streak: 8, current: 8,
  skills: ["CPU・RAM・ROM","SSD/HDD","2進数","情報量（bit/byte）","論理演算 AND"],
  history: [], wrongQuestions: [], apiEndpoint: ""
};
const questions = [
{id:1,chapter:"コンピュータの基礎",title:"CPUの役割",text:"CPUの主な役割として、最も適切なものはどれでしょう？",choices:["データを長期間保存する","演算や制御を行う","インターネットに接続する","画面を表示する"],answer:1,explain:"CPUは命令の実行・演算・各装置の制御を行います。",skill:"CPU基礎"},
{id:2,chapter:"コンピュータの基礎",title:"RAMの役割",text:"RAMの特徴として、最も適切なものはどれでしょう？",choices:["電源を切っても内容が保持される","CPUが処理するデータやプログラムを一時的に記憶する","データを印刷する","ネットワークを暗号化する"],answer:1,explain:"RAMは主記憶装置として使われる揮発性メモリです。",skill:"RAM基礎"},
{id:3,chapter:"コンピュータの基礎",title:"ROMの役割",text:"ROMの特徴として、最も適切なものはどれでしょう？",choices:["電源を切ると記憶内容が消える","CPUの演算速度を高速化する","電源を切っても記憶内容が保持される","通信速度を制御する"],answer:2,explain:"ROMは不揮発性メモリで、電源を切っても内容が保持されます。",skill:"ROM基礎"},
{id:4,chapter:"コンピュータの基礎",title:"SSDとHDD",text:"SSDとHDDの特徴について、正しい説明はどれでしょう？",choices:["SSDは磁気ディスクを回転させる","HDDはフラッシュメモリを使う","SSDは一般的にHDDより読み書きが高速","どちらも電源を切ると消える"],answer:2,explain:"SSDはフラッシュメモリを使い、一般的にHDDより高速です。",skill:"SSD/HDD"},
{id:5,chapter:"データ表現",title:"2進数の基本",text:"2進数で使われる数字はどれでしょう？",choices:["0から9","0と1","1から16","AからZ"],answer:1,explain:"2進数は0と1の2種類で数を表現します。",skill:"2進数"},
{id:6,chapter:"データ表現",title:"2進数から10進数へ",text:"2進数 1010 を10進数に変換するといくつでしょう？",choices:["8","10","12","14"],answer:1,explain:"1×8 + 0×4 + 1×2 + 0×1 = 10です。",skill:"2進数変換"},
{id:7,chapter:"データ表現",title:"ビットとバイト",text:"情報量の単位について、正しい説明はどれでしょう？",choices:["1バイト＝4ビット","1バイト＝8ビット","1バイト＝16ビット","1ビット＝8バイト"],answer:1,explain:"1バイト（Byte）は8ビット（bit）です。",skill:"情報量"},
{id:8,chapter:"論理演算",title:"論理演算 AND",text:"AND（論理積）の説明として正しいものはどれでしょう？",choices:["A=1、B=0のとき結果は1","A=0、B=0のとき結果は1","A=1、B=1のときだけ結果は1","AかBのどちらかが1なら必ず1"],answer:2,explain:"ANDは「かつ」。両方が1の場合だけ結果が1です。",skill:"論理演算 AND"},
{id:9,chapter:"論理演算",title:"論理演算 OR",text:"OR（論理和）の説明として正しいものはどれでしょう？",choices:["両方が1の場合だけ1","両方が0の場合だけ1","AかBのどちらか一方でも1なら1","AとBが異なる場合だけ1"],answer:2,explain:"ORは少なくとも一方が1なら結果が1です。",skill:"論理演算 OR"},
{id:10,chapter:"論理演算",title:"論理演算 XOR",text:"XOR（排他的論理和）の説明として正しいものはどれでしょう？",choices:["両方が1のときだけ1","両方が0のときだけ1","AとBが異なるとき1","どちらかが0なら必ず1"],answer:2,explain:"XORは入力が異なる場合に1、同じ場合に0です。",skill:"論理演算 XOR"},
{id:11,chapter:"ネットワーク",title:"IPアドレスの役割",text:"IPアドレスの主な役割として、最も適切なものはどれでしょう？",choices:["ネットワーク上の機器を識別する","ファイルを圧縮する","画面の解像度を決める","CPUの温度を管理する"],answer:0,explain:"IPアドレスはIPネットワーク上の機器や接続点を識別し、通信先を指定します。",skill:"ネットワーク基礎"},
{id:12,chapter:"ネットワーク",title:"DNSの役割",text:"DNSの主な役割はどれでしょう？",choices:["ドメイン名とIPアドレスを対応付ける","通信内容を暗号化する","データを圧縮する","電源を管理する"],answer:0,explain:"DNSはドメイン名から対応するIPアドレスなどを調べる仕組みです。",skill:"DNS"},
{id:13,chapter:"ネットワーク",title:"HTTPS",text:"HTTPSで主に利用されるセキュリティ技術はどれでしょう？",choices:["画像圧縮","TLSによる通信の暗号化など","CPUの仮想化","磁気記録"],answer:1,explain:"HTTPSはHTTP通信をTLSで保護し、盗聴や改ざんのリスクを低減します。",skill:"HTTPS・TLS"},
{id:14,chapter:"データベース",title:"主キー",text:"リレーショナルデータベースの主キーの説明として正しいものはどれでしょう？",choices:["同じ値が複数行に存在してよい識別子","行を一意に識別するための属性","表を暗号化する鍵","検索結果を並べ替える命令"],answer:1,explain:"主キーは各行を一意に識別し、NULLや重複を許しません。",skill:"データベース・主キー"},
{id:15,chapter:"データベース",title:"SQLのSELECT",text:"SQLで表からデータを検索・取得する命令はどれでしょう？",choices:["INSERT","UPDATE","SELECT","DELETE"],answer:2,explain:"SELECT文はテーブルから必要な列や行を取得するために使います。",skill:"SQL"},
{id:16,chapter:"セキュリティ",title:"多要素認証",text:"多要素認証（MFA）の説明として正しいものはどれでしょう？",choices:["同じパスワードを2回入力する","異なる種類の要素を組み合わせて本人確認する","IDを長くするだけ","通信速度を二重化する"],answer:1,explain:"知識・所持・生体など異なる認証要素を組み合わせます。",skill:"認証"},
{id:17,chapter:"セキュリティ",title:"フィッシング",text:"フィッシング攻撃の典型的な手口はどれでしょう？",choices:["偽サイトなどに誘導して認証情報を入力させる","HDDを物理的に破壊する","通信回線を増設する","データベースを正規にバックアップする"],answer:0,explain:"実在組織を装ったメールやSMSで偽サイトへ誘導し、情報を盗みます。",skill:"フィッシング"},
{id:18,chapter:"アルゴリズム",title:"変数の更新",text:"変数xの初期値が3です。x = x + 2 を実行した後のxはいくつでしょう？",choices:["2","3","5","6"],answer:2,explain:"右辺の3+2を計算し、その結果5をxに代入します。",skill:"変数・代入"},
{id:19,chapter:"アルゴリズム",title:"繰返し処理",text:"同じ処理を条件が満たされる間、繰り返す制御構造はどれでしょう？",choices:["順次","分岐","反復","宣言"],answer:2,explain:"反復（繰返し）は、条件や回数に応じて処理を繰り返す制御構造です。",skill:"反復処理"},
{id:20,chapter:"マネジメント",title:"プロジェクト管理",text:"WBSの主な目的として適切なものはどれでしょう？",choices:["作業を階層的に分解して整理する","通信を暗号化する","データベースを正規化する","プログラムを自動実行する"],answer:0,explain:"WBSは成果物や作業を階層的に分解し、作業範囲を明確にします。",skill:"WBS"}
,
{id:21,chapter:"ハードウェア",title:"キャッシュメモリ",text:"キャッシュメモリを設ける主な目的はどれでしょう？",choices:["主記憶装置へのアクセス時間を短縮する", "補助記憶装置の容量を増やす", "通信を暗号化する", "画面表示を高解像度にする"],answer:0,explain:"CPUと主記憶装置の速度差を埋めるため、頻繁に使うデータを高速なメモリに保持します。",skill:"キャッシュメモリ"},
{id:22,chapter:"ハードウェア",title:"クロック周波数",text:"CPUのクロック周波数が表すものはどれでしょう？",choices:["1秒間に実行できるプログラム数", "1秒間に発生するクロック信号の回数", "記憶できるデータ量", "通信できる距離"],answer:1,explain:"クロック周波数はCPUの動作タイミングを刻む信号の周波数です。高ければ必ず性能が高いとは限りません。",skill:"CPU性能"},
{id:23,chapter:"ハードウェア",title:"RAID1",text:"RAID1の特徴として正しいものはどれでしょう？",choices:["複数ディスクにデータを分散して高速化する", "同じデータを複数ディスクに複製する", "データを圧縮して保存する", "単一ディスクを暗号化する"],answer:1,explain:"RAID1はミラーリング方式で、同じデータを複数のディスクに書き込みます。",skill:"RAID"},
{id:24,chapter:"ソフトウェア",title:"OSの役割",text:"オペレーティングシステム（OS）の役割として適切なものはどれでしょう？",choices:["ハードウェアやソフトウェア資源を管理する", "Webページの文章だけを作成する", "電力会社の電圧を制御する", "データベースの表だけを設計する"],answer:0,explain:"OSはプロセス、メモリ、ファイル、入出力装置などを管理し、アプリケーションの実行基盤になります。",skill:"OS"},
{id:25,chapter:"ソフトウェア",title:"仮想記憶",text:"仮想記憶方式の説明として正しいものはどれでしょう？",choices:["補助記憶装置を利用して主記憶の見かけ上の容量を拡張する", "CPUを複数台に見せるだけの方式", "画面を仮想的に拡大する方式", "ネットワークを使わずに通信する方式"],answer:0,explain:"仮想記憶は主記憶に収まらないプログラムやデータを補助記憶装置も使って扱う仕組みです。",skill:"仮想記憶"},
{id:26,chapter:"ソフトウェア",title:"オープンソース",text:"オープンソースソフトウェアの特徴として適切なものはどれでしょう？",choices:["必ず無料である", "ソースコードがライセンス条件の下で公開・利用可能である", "改変が一切できない", "企業内でしか利用できない"],answer:1,explain:"オープンソースはライセンスに従ってソースコードの利用・改変・再配布が認められる考え方です。無料とは限りません。",skill:"OSS"},
{id:27,chapter:"ネットワーク",title:"DHCP",text:"DHCPの主な役割はどれでしょう？",choices:["IPアドレスなどのネットワーク設定を自動配布する", "ドメイン名を暗号化する", "Webページを転送する", "メールを迷惑メール判定する"],answer:0,explain:"DHCPは端末にIPアドレス、サブネットマスク、デフォルトゲートウェイなどを自動設定します。",skill:"DHCP"},
{id:28,chapter:"ネットワーク",title:"サブネットマスク",text:"サブネットマスクの主な役割はどれでしょう？",choices:["IPアドレスのネットワーク部とホスト部を区別する", "通信内容を圧縮する", "MACアドレスを生成する", "通信速度を測定する"],answer:0,explain:"サブネットマスクによってIPアドレスのネットワーク部とホスト部の範囲を判断します。",skill:"サブネット"},
{id:29,chapter:"ネットワーク",title:"ルータ",text:"ルータの主な役割はどれでしょう？",choices:["異なるネットワーク間でパケットを中継する", "文字コードを変換する", "ファイルを印刷する", "CPUの命令を実行する"],answer:0,explain:"ルータはIPアドレスなどを基に、異なるネットワーク間でパケットを転送します。",skill:"ネットワーク機器"},
{id:30,chapter:"ネットワーク",title:"ファイアウォール",text:"ファイアウォールの主な役割はどれでしょう？",choices:["通信をルールに基づいて許可・遮断する", "データを必ずバックアップする", "CPUの温度を下げる", "Webサイトを自動翻訳する"],answer:0,explain:"ファイアウォールは通信条件に基づいてネットワーク通信を制御します。",skill:"ファイアウォール"},
{id:31,chapter:"データベース",title:"外部キー",text:"外部キーの役割として正しいものはどれでしょう？",choices:["他の表の主キーなどを参照し、表同士の関連を表す", "表の全データを暗号化する", "データを必ず並べ替える", "列の値を自動圧縮する"],answer:0,explain:"外部キーは他表のキーを参照し、参照整合性を保つために利用します。",skill:"外部キー"},
{id:32,chapter:"データベース",title:"正規化",text:"データベースの正規化の主な目的はどれでしょう？",choices:["データの重複や更新時の不整合を抑える", "検索結果を必ず暗号化する", "表の数を必ず一つにする", "データを画像に変換する"],answer:0,explain:"正規化はデータの重複を減らし、挿入・更新・削除時の不整合を防ぎやすくします。",skill:"正規化"},
{id:33,chapter:"データベース",title:"トランザクション",text:"トランザクションのACID特性に含まれないものはどれでしょう？",choices:["原子性", "一貫性", "独立性", "可用性"],answer:3,explain:"ACIDは原子性・一貫性・独立性・耐久性です。可用性は含まれません。",skill:"トランザクション"},
{id:34,chapter:"セキュリティ",title:"ハッシュ関数",text:"暗号学的ハッシュ関数の用途として適切なものはどれでしょう？",choices:["データから固定長の要約値を生成し、改ざん検知などに使う", "元のデータを必ず復元できるようにする", "通信経路を物理的に保護する", "IPアドレスを割り当てる"],answer:0,explain:"ハッシュ値はデータの同一性や改ざんの検知、パスワード保存などに利用されます。",skill:"ハッシュ"},
{id:35,chapter:"セキュリティ",title:"公開鍵暗号",text:"公開鍵暗号方式の説明として正しいものはどれでしょう？",choices:["暗号化と復号などに異なる鍵のペアを用いる", "全員が同じ秘密鍵を共有する", "鍵を使わずに暗号化する", "データを必ず圧縮する"],answer:0,explain:"公開鍵暗号方式では公開鍵と秘密鍵の鍵ペアを利用します。",skill:"公開鍵暗号"},
{id:36,chapter:"セキュリティ",title:"ランサムウェア",text:"ランサムウェアの典型的な被害はどれでしょう？",choices:["データを暗号化するなどして身代金を要求する", "画面の明るさを変更する", "CPUを自動交換する", "ネットワークの速度を上げる"],answer:0,explain:"ランサムウェアはデータを暗号化・窃取するなどして、金銭を要求するマルウェアです。",skill:"マルウェア"},
{id:37,chapter:"セキュリティ",title:"最小権限",text:"最小権限の原則として適切なものはどれでしょう？",choices:["利用者に業務上必要な最小限の権限だけを与える", "全員に管理者権限を与える", "パスワードを全員で共有する", "アクセス制御を無効にする"],answer:0,explain:"権限を必要最小限にすることで、誤操作や侵害時の被害を抑えます。",skill:"アクセス制御"},
{id:38,chapter:"アルゴリズム",title:"線形探索",text:"線形探索の説明として正しいものはどれでしょう？",choices:["先頭から順番に目的のデータを調べる", "必ず中央のデータから半分ずつ調べる", "データを暗号化して検索する", "データをランダムに一つだけ調べる"],answer:0,explain:"線形探索は先頭から順に比較する方法で、整列されていないデータにも使えます。",skill:"探索アルゴリズム"},
{id:39,chapter:"アルゴリズム",title:"二分探索",text:"二分探索を効率よく使うための前提として適切なものはどれでしょう？",choices:["データが一定の順序に整列されている", "データが暗号化されている", "データが必ず奇数個である", "データがすべて同じ値である"],answer:0,explain:"二分探索は整列済みデータを対象に、探索範囲を半分ずつ絞り込みます。",skill:"探索アルゴリズム"},
{id:40,chapter:"アルゴリズム",title:"スタック",text:"スタックのデータの取り出し順序はどれでしょう？",choices:["先入先出（FIFO）", "後入先出（LIFO）", "ランダム", "優先度順のみ"],answer:1,explain:"スタックは最後に格納したデータを最初に取り出すLIFO構造です。",skill:"データ構造"},
{id:41,chapter:"アルゴリズム",title:"キュー",text:"キューのデータの取り出し順序はどれでしょう？",choices:["後入先出（LIFO）", "先入先出（FIFO）", "ランダム", "値の大きい順"],answer:1,explain:"キューは先に格納したデータを先に取り出すFIFO構造です。",skill:"データ構造"},
{id:42,chapter:"アルゴリズム",title:"計算量",text:"入力データ数nに比例して処理回数が増える計算量はどれでしょう？",choices:["O(1)", "O(log n)", "O(n)", "O(n²)"],answer:2,explain:"O(n)は入力サイズに比例して処理量が増える線形時間です。",skill:"計算量"},
{id:43,chapter:"マネジメント",title:"ガントチャート",text:"ガントチャートで主に表現するものはどれでしょう？",choices:["作業の開始・終了時期や期間", "データベースの表構造", "ネットワークのIPアドレス", "プログラムの実行結果"],answer:0,explain:"ガントチャートは作業を時間軸上に配置し、スケジュールを可視化します。",skill:"プロジェクト管理"},
{id:44,chapter:"マネジメント",title:"クリティカルパス",text:"クリティカルパスの説明として正しいものはどれでしょう？",choices:["プロジェクト全体の所要期間を決める最長の作業経路", "最も費用が安い作業", "担当者が最も多い作業", "最初に着手する作業だけの経路"],answer:0,explain:"クリティカルパス上の作業が遅れると、原則としてプロジェクト全体の完了も遅れます。",skill:"スケジュール管理"},
{id:45,chapter:"マネジメント",title:"サービスレベル",text:"SLAの説明として正しいものはどれでしょう？",choices:["サービス提供者と利用者の間で合意するサービス水準", "ソフトウェアのソースコード一覧", "社員の勤務評価表", "データベースの暗号鍵"],answer:0,explain:"SLAは稼働率や応答時間など、サービス品質に関する合意内容を定めます。",skill:"サービスマネジメント"},
{id:46,chapter:"ストラテジ",title:"SWOT分析",text:"SWOT分析で外部環境の要因に該当する組合せはどれでしょう？",choices:["強みと弱み", "機会と脅威", "強みと機会", "弱みと脅威"],answer:1,explain:"SWOTは内部環境の強み・弱みと、外部環境の機会・脅威を分析します。",skill:"経営戦略"},
{id:47,chapter:"ストラテジ",title:"損益分岐点",text:"損益分岐点の説明として正しいものはどれでしょう？",choices:["売上高と総費用が等しく、利益がゼロとなる点", "売上高が最大になる点", "固定費がゼロになる点", "現金残高が最大になる点"],answer:0,explain:"損益分岐点では売上高と総費用が一致し、利益も損失も発生しません。",skill:"企業会計"},
{id:48,chapter:"ストラテジ",title:"著作権",text:"著作権に関する説明として適切なものはどれでしょう？",choices:["著作物は原則として創作した時点で権利が発生する", "著作権は登録しないと一切発生しない", "アイデアそのものは常に著作権で保護される", "著作権は必ず永久に存続する"],answer:0,explain:"著作権は原則として創作と同時に発生し、登録は権利発生の要件ではありません。",skill:"知的財産権"},
{id:49,chapter:"ストラテジ",title:"個人情報",text:"個人情報保護の観点で適切な対応はどれでしょう？",choices:["利用目的を明確にし、必要な範囲で取り扱う", "目的を問わず無制限に共有する", "保管期限を設けず公開する", "本人確認なしに第三者へ提供する"],answer:0,explain:"個人情報は利用目的や法令上の要件を踏まえ、適切に取得・利用・管理します。",skill:"法務・個人情報"},
{id:50,chapter:"アルゴリズム",title:"配列の添字",text:"配列Aの添字が0から始まり、A=[4,7,9]のときA[1]の値はどれでしょう？",choices:["4", "7", "9", "1"],answer:1,explain:"添字0が4、添字1が7、添字2が9です。",skill:"配列"}
];

let state = loadState(), selected = null, answered = false;
function loadState(){
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {...initialState, ...saved,
      current: Math.max(0, Math.min(Number.isInteger(saved.current) ? saved.current : initialState.current, questions.length)),
      skills: Array.isArray(saved.skills) ? saved.skills : [...initialState.skills],
      history: Array.isArray(saved.history) ? saved.history : [],
      wrongQuestions: Array.isArray(saved.wrongQuestions) ? saved.wrongQuestions : []
    };
  } catch { return {...initialState}; }
}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));render()}
function level(){return Math.floor(state.xp/100)+1}
function levelName(){return ["","新人エンジニア","見習いエンジニア","駆け出しエンジニア","一人前エンジニア","熟練エンジニア"][Math.min(level(),5)]||"上級エンジニア"}
function currentQ(){return questions[state.current] || null}
function render(){
  const lv=level(), xpIn=state.xp%100, total=state.correct+state.wrong, q=currentQ();
  document.querySelector("#levelName").textContent=`Lv.${lv} ${levelName()}`;
  document.querySelector("#xp").textContent=state.xp;
  document.querySelector("#nextXp").textContent=q?`次のレベルまで${100-xpIn} XP`:"全クエスト達成！";
  document.querySelector("#xpBar").style.width=xpIn+"%";
  document.querySelector("#streak").textContent=state.streak;
  document.querySelector("#correct").textContent=state.correct;
  document.querySelector("#wrong").textContent=state.wrong;
  document.querySelector("#accuracy").textContent=(total?Math.round(state.correct/total*100):0)+"%";
  document.querySelector("#questTitle").textContent=q?q.chapter:"全クエスト達成";
  document.querySelector("#questSub").textContent=q?`第${q.id}問 · ${q.title}`:`${questions.length}問クリア`;
  document.querySelector("#chapterTag").textContent=q?`第${Math.ceil(q.id/10)}章`:"COMPLETE";
  document.querySelector("#skills").innerHTML=state.skills.map(s=>`<span class="skill">✦ ${esc(s)}</span>`).join("");
  document.querySelector("#skillCount").textContent=state.skills.length;
  document.querySelector("#apiEndpoint").value=state.apiEndpoint||"";
  document.querySelector("#startBtn").textContent=q?"冒険を再開する →":"クエストを確認する";
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function openQuestion(){
  const q=currentQ();
  if(!q){alert("現在登録されているクエストはすべて完了しました。次のアップデートをお待ちください。");return;}
  selected=null; answered=false;
  document.querySelector("#qStage").textContent=`STAGE ${Math.ceil(q.id/10)}-${((q.id-1)%10)+1}`;
  document.querySelector("#qTitle").textContent=`第${q.id}問：${q.title}`;
  document.querySelector("#qCategory").textContent=q.chapter;
  document.querySelector("#qText").textContent=q.text;
  document.querySelector("#hint").textContent="選択肢から最も適切なものを選びましょう。";
  document.querySelector("#choices").innerHTML=q.choices.map((c,i)=>`<label class="choice"><input type="radio" name="choice" value="${i}"><span><b>${"ABCD"[i]}.</b> ${esc(c)}</span></label>`).join("");
  document.querySelectorAll('input[name="choice"]').forEach(el=>el.addEventListener("change",e=>{selected=Number(e.target.value);document.querySelectorAll(".choice").forEach(x=>x.classList.remove("selected"));e.target.closest(".choice").classList.add("selected");document.querySelector("#submitAnswer").disabled=false}));
  document.querySelector("#submitAnswer").classList.remove("hidden");
  document.querySelector("#submitAnswer").disabled=true;
  document.querySelector("#result").className="result hidden";
  document.querySelector("#nextQuestion").classList.add("hidden");
  document.querySelector("#submitAnswer").onclick=submit;
  document.querySelector("#nextQuestion").onclick=()=>{document.querySelector("#questionDialog").close();render()};
  document.querySelector("#questionDialog").showModal();
}
async function submit(){
  if(selected===null||answered)return;
  answered=true;
  const q=currentQ(), good=selected===q.answer;
  let gained=0, bonus="";
  if(good){
    state.correct++;state.streak++;gained=10;
    if(state.streak%3===0){gained+=10;bonus="<br><b>連続正解ボーナス +10 XP！</b>";}
    if(!state.skills.includes(q.skill))state.skills.push(q.skill);
  } else {
    state.wrong++;state.streak=0;
    if(!state.wrongQuestions.some(x=>x.id===q.id))state.wrongQuestions.unshift({id:q.id,title:q.title,chapter:q.chapter,when:new Date().toISOString()});
  }
  const nextIndex=state.current+1;
  const chapterClear=good && q.id%10===0;
  if(chapterClear){gained+=30;bonus+="<br><b>ステージクリアボーナス +30 XP！</b>";}
  state.xp+=gained;
  state.history.unshift({id:q.id,title:q.title,answer:"ABCD"[selected],correct:good,xp:gained,when:new Date().toISOString()});
  state.current=Math.min(nextIndex,questions.length);
  save();
  const result=document.querySelector("#result");
  result.className="result "+(good?"good":"bad");
  result.innerHTML=`<b>${good?`✨ 正解！ +${gained} XP`:"⚔️ 不正解"}</b><br>${esc(q.explain)}${bonus}<div id="aiExplanation"></div>`;
  document.querySelector("#submitAnswer").classList.add("hidden");
  document.querySelector("#nextQuestion").classList.remove("hidden");
  document.querySelector("#nextQuestion").textContent=state.current<questions.length?"次の問題へ →":"クエスト結果を見る";
  if(state.apiEndpoint) askAI(q,good).catch(()=>{});
}
async function askAI(q,good){
  const el=document.querySelector("#aiExplanation");el.innerHTML="<p>AI補足を取得中…</p>";
  try{
    const r=await fetch(state.apiEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:q.text,choices:q.choices,correctAnswer:q.choices[q.answer],userAnswer:q.choices[selected],isCorrect:good,explanation:q.explain,level:level()})});
    if(!r.ok)throw Error("API error");
    const data=await r.json();el.innerHTML=`<p><b>AIからの補足</b><br>${esc(data.explanation||data.answer||"補足はありません")}</p>`;
  } catch {el.innerHTML="<p class='tiny'>AI補足を取得できませんでした。API接続先とサーバー設定を確認してください。</p>";}
}
function showReview(){
  const box=document.querySelector("#reviewContent");
  box.innerHTML=state.wrongQuestions.length?state.wrongQuestions.map(x=>`<div class="review-item"><b>第${x.id}問：${esc(x.title)}</b><br><span class="muted">${esc(x.chapter)} · 復習対象</span></div>`).join(""):'<div class="empty">まだ間違えた問題はありません。<br>この調子で冒険を続けましょう！</div>';
  document.querySelector("#reviewDialog").showModal();
}
function showHistory(){
  const box=document.querySelector("#historyContent");
  box.innerHTML=state.history.length?state.history.map(x=>`<div class="log-item"><b>${x.correct?"🟢":"🔴"} 第${x.id}問：${esc(x.title)}</b><br><span class="muted">${x.correct?"正解":"不正解"} · ${new Date(x.when).toLocaleString("ja-JP")} · ${x.xp||0} XP</span></div>`).join(""):'<div class="empty">まだ学習履歴がありません。</div>';
  document.querySelector("#historyDialog").showModal();
}
document.querySelector("#startBtn").onclick=openQuestion;
document.querySelector("#navQuest").onclick=openQuestion;
document.querySelector("#reviewBtn").onclick=showReview;document.querySelector("#navReview").onclick=showReview;
document.querySelector("#historyBtn").onclick=showHistory;document.querySelector("#navRecord").onclick=showHistory;
document.querySelector("#settingsBtn").onclick=()=>document.querySelector("#settingsDialog").showModal();
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>document.getElementById(b.dataset.close).close());
document.querySelector("#saveSettings").onclick=()=>{state.apiEndpoint=document.querySelector("#apiEndpoint").value.trim();save();document.querySelector("#aiStatus").textContent=state.apiEndpoint?"AI API接続先を保存しました。":"AI APIは未設定です。通常の問題演習は利用できます。"};
document.querySelector("#exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="basic-info-rpg-backup.json";a.click();URL.revokeObjectURL(a.href)};
document.querySelector("#importFile").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const v=JSON.parse(await f.text());if(typeof v.xp!=="number"||!Array.isArray(v.history))throw Error();state={...initialState,...v};save();alert("バックアップを復元しました。");}catch{alert("バックアップファイルを読み込めませんでした。");}};
document.querySelector("#resetBtn").onclick=()=>{if(confirm("学習履歴と進行状況を初期化します。よろしいですか？")){state={...initialState};save();document.querySelector("#settingsDialog").close();}};
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
render();

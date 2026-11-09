const STORAGE_KEY = "basicInfoQuestSave_v1";
const initialState = {
  xp: 140, correct: 8, wrong: 0, streak: 8, current: 8,
  skills: ["CPU・RAM・ROM","SSD/HDD","2進数","情報量（bit/byte）","論理演算 AND"],
  history: [], wrongQuestions: [], apiEndpoint: ""
};
const questions = [
 {id:1,chapter:"コンピュータの基礎",title:"CPUの役割",text:"CPUの主な役割として、最も適切なものはどれでしょう？",choices:["データを長期間保存する","演算や制御を行う","インターネットに接続する","画面を表示する"],answer:1,explain:"CPUはコンピュータの頭脳にあたり、命令の実行・演算・各装置の制御を行います。",skill:"CPU基礎"},
 {id:2,chapter:"コンピュータの基礎",title:"RAMの役割",text:"RAMの特徴として、最も適切なものはどれでしょう？",choices:["電源を切っても内容が保持される","CPUが処理するデータやプログラムを一時的に記憶する","データを印刷する","ネットワークを暗号化する"],answer:1,explain:"RAMは主記憶装置として使われる揮発性メモリです。電源を切ると原則として内容は消えます。",skill:"RAM基礎"},
 {id:3,chapter:"コンピュータの基礎",title:"ROMの役割",text:"ROM（Read Only Memory）の特徴として、最も適切なものはどれでしょう？",choices:["電源を切ると記憶内容が消える","CPUの演算速度を高速化する","電源を切っても記憶内容が保持される","ネットワークの通信速度を制御する"],answer:2,explain:"ROMは不揮発性メモリで、電源を切っても内容が保持されます。",skill:"ROM基礎"},
 {id:4,chapter:"コンピュータの基礎",title:"SSDとHDD",text:"SSDとHDDの特徴について、正しい説明はどれでしょう？",choices:["SSDは磁気ディスクを回転させて読み書きする","HDDはフラッシュメモリを使う","SSDは一般的にHDDより読み書きが高速である","どちらも電源を切るとデータが消える"],answer:2,explain:"SSDはフラッシュメモリを使い、一般的にHDDより高速です。HDDは磁気ディスクを回転させて記録します。",skill:"SSD/HDD"},
 {id:5,chapter:"データ表現",title:"2進数の基本",text:"コンピュータで使われる2進数について、正しい説明はどれでしょう？",choices:["0から9までの10種類を使う","0と1の2種類を使う","1から16までの16種類を使う","文字だけで数値を表現する"],answer:1,explain:"2進数は0と1の2種類の数字で表現します。デジタル回路のON/OFFに対応します。",skill:"2進数"},
 {id:6,chapter:"データ表現",title:"2進数から10進数へ",text:"2進数 1010 を10進数に変換すると、いくつでしょう？",choices:["8","10","12","14"],answer:1,explain:"右から重みは1、2、4、8です。1×8 + 0×4 + 1×2 + 0×1 = 10 となります。",skill:"2進数変換"},
 {id:7,chapter:"データ表現",title:"ビットとバイト",text:"情報量の単位について、正しい説明はどれでしょう？",choices:["1バイト＝4ビット","1バイト＝8ビット","1バイト＝16ビット","1ビット＝8バイト"],answer:1,explain:"1バイト（Byte）は8ビット（bit）です。ビットは0または1を表す情報量の最小単位です。",skill:"情報量"},
 {id:8,chapter:"論理演算",title:"論理演算 AND",text:"AND（論理積）の説明として正しいものはどれでしょう？",choices:["A=1、B=0のとき結果は1","A=0、B=0のとき結果は1","A=1、B=1のときだけ結果は1","AかBのどちらかが1なら必ず1"],answer:2,explain:"ANDは「かつ」です。両方が1の場合だけ結果が1になります。",skill:"論理演算 AND"},
 {id:9,chapter:"論理演算",title:"論理演算 OR",text:"OR（論理和）の説明として正しいものはどれでしょう？",choices:["AとBの両方が1の場合だけ結果が1","AとBの両方が0の場合だけ結果が1","AかBのどちらか一方でも1なら結果が1","AとBが異なる場合だけ結果が1"],answer:2,explain:"ORは「または」です。少なくとも一方が1なら結果が1です。両方0のときだけ0になります。",skill:"論理演算 OR"},
 {id:10,chapter:"論理演算",title:"論理演算 XOR",text:"XOR（排他的論理和）の説明として正しいものはどれでしょう？",choices:["両方が1のときだけ1","両方が0のときだけ1","AとBが異なるとき1","どちらかが0なら必ず1"],answer:2,explain:"XORは入力が異なる場合に1、同じ場合に0になります。A=1,B=0またはA=0,B=1で1です。",skill:"論理演算 XOR"},
 {id:11,chapter:"ネットワーク",title:"IPアドレスの役割",text:"IPアドレスの主な役割として、最も適切なものはどれでしょう？",choices:["ネットワーク上の機器を識別する","ファイルを圧縮する","画面の解像度を決める","CPUの温度を管理する"],answer:0,explain:"IPアドレスは、IPネットワーク上で機器やインターフェースを識別し、通信先を指定するために使われます。",skill:"ネットワーク基礎"}
];
let state = loadState(), selected = null, answered = false;
function loadState(){try{return {...initialState,...JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")}}catch{return {...initialState}}}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));render()}
function level(){return Math.floor(state.xp/100)+1}
function levelName(){return ["","新人エンジニア","見習いエンジニア","駆け出しエンジニア","一人前エンジニア","熟練エンジニア"][Math.min(level(),5)]||"上級エンジニア"}
function currentQ(){return questions[Math.min(state.current,questions.length-1)]}
function render(){
 const lv=level(), xpIn=state.xp%100, total=state.correct+state.wrong;
 document.querySelector("#levelName").textContent=`Lv.${lv} ${levelName()}`;
 document.querySelector("#xp").textContent=state.xp;
 document.querySelector("#nextXp").textContent=`次のレベルまで${100-xpIn} XP`;
 document.querySelector("#xpBar").style.width=xpIn+"%";
 document.querySelector("#streak").textContent=state.streak;
 document.querySelector("#correct").textContent=state.correct;
 document.querySelector("#wrong").textContent=state.wrong;
 document.querySelector("#accuracy").textContent=(total?Math.round(state.correct/total*100):0)+"%";
 document.querySelector("#questTitle").textContent=currentQ().chapter;
 document.querySelector("#questSub").textContent=`第${currentQ().id}問 · ${currentQ().title}`;
 document.querySelector("#chapterTag").textContent=currentQ().id<=8?"第1章":"第1章";
 document.querySelector("#skills").innerHTML=state.skills.map(s=>`<span class="skill">✦ ${esc(s)}</span>`).join("");
 document.querySelector("#skillCount").textContent=state.skills.length;
 document.querySelector("#apiEndpoint").value=state.apiEndpoint||"";
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function openQuestion(){
 const q=currentQ(); selected=null; answered=false;
 document.querySelector("#qStage").textContent=`STAGE 1-${q.id}`;
 document.querySelector("#qTitle").textContent=`第${q.id}問：${q.title}`;
 document.querySelector("#qCategory").textContent=q.chapter;
 document.querySelector("#qText").textContent=q.text;
 document.querySelector("#hint").textContent=q.id===9?"ヒント：ORは「または」。少なくとも一方が1なら、結果はどうなる？":"選択肢から最も適切なものを選びましょう。";
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
 if(selected===null||answered)return; answered=true;
 const q=currentQ(), good=selected===q.answer;
 if(good){state.correct++;state.streak++;state.xp+=10;if(state.streak%3===0)state.xp+=10;if(!state.skills.includes(q.skill))state.skills.push(q.skill)}
 else{state.wrong++;state.streak=0;state.wrongQuestions.unshift({id:q.id,title:q.title,chapter:q.chapter,when:new Date().toISOString()})}
 state.history.unshift({id:q.id,title:q.title,answer:"ABCD"[selected],correct:good,xp:good?10:0,when:new Date().toISOString()});
 if(q.id===10&&good){state.xp+=30}
 state.current=Math.min(state.current+1,questions.length-1);
 save();
 const result=document.querySelector("#result");result.className="result "+(good?"good":"bad");
 result.innerHTML=`<b>${good?"✨ 正解！ +10 XP":"⚔️ 不正解"}</b><br>${esc(q.explain)}${good&&state.streak%3===0?"<br><b>連続正解ボーナス +10 XP！</b>":""}${q.id===10&&good?"<br><b>第1章クリアボーナス +30 XP！</b>":""}<div id="aiExplanation"></div>`;
 document.querySelector("#submitAnswer").classList.add("hidden");
 document.querySelector("#nextQuestion").classList.remove("hidden");
 document.querySelector("#nextQuestion").textContent="次の問題へ →";
 if(state.apiEndpoint) askAI(q,good).catch(()=>{});
}
async function askAI(q,good){
 const el=document.querySelector("#aiExplanation");el.innerHTML="<p>AI補足を取得中…</p>";
 try{const r=await fetch(state.apiEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:q.text,choices:q.choices,correctAnswer:q.choices[q.answer],userAnswer:q.choices[selected],isCorrect:good,explanation:q.explain,level:level()})});if(!r.ok)throw Error("API error");const data=await r.json();el.innerHTML=`<p><b>AIからの補足</b><br>${esc(data.explanation||data.answer||"補足はありません")}</p>`}
 catch{el.innerHTML="<p class='tiny'>AI補足を取得できませんでした。API接続先とサーバー設定を確認してください。</p>"}
}
function showReview(){const box=document.querySelector("#reviewContent");box.innerHTML=state.wrongQuestions.length?state.wrongQuestions.map(x=>`<div class="review-item"><b>第${x.id}問：${esc(x.title)}</b><br><span class="muted">${esc(x.chapter)} · 復習対象</span></div>`).join(""):'<div class="empty">まだ間違えた問題はありません。<br>この調子で冒険を続けましょう！</div>';document.querySelector("#reviewDialog").showModal()}
function showHistory(){const box=document.querySelector("#historyContent");box.innerHTML=state.history.length?state.history.map(x=>`<div class="log-item"><b>${x.correct?"🟢":"🔴"} 第${x.id}問：${esc(x.title)}</b><br><span class="muted">${x.correct?"正解":"不正解"} · ${new Date(x.when).toLocaleString("ja-JP")}</span></div>`).join(""):'<div class="empty">まだ学習履歴がありません。</div>';document.querySelector("#historyDialog").showModal()}
document.querySelector("#startBtn").onclick=openQuestion;
document.querySelector("#navQuest").onclick=openQuestion;
document.querySelector("#reviewBtn").onclick=showReview;document.querySelector("#navReview").onclick=showReview;
document.querySelector("#historyBtn").onclick=showHistory;document.querySelector("#navRecord").onclick=showHistory;
document.querySelector("#settingsBtn").onclick=()=>document.querySelector("#settingsDialog").showModal();
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>document.getElementById(b.dataset.close).close());
document.querySelector("#saveSettings").onclick=()=>{state.apiEndpoint=document.querySelector("#apiEndpoint").value.trim();save();document.querySelector("#aiStatus").textContent=state.apiEndpoint?"AI API接続先を保存しました。":"AI APIは未設定です。通常の問題演習は利用できます。"};
document.querySelector("#exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="basic-info-rpg-backup.json";a.click();URL.revokeObjectURL(a.href)};
document.querySelector("#importFile").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const v=JSON.parse(await f.text());if(typeof v.xp!=="number"||!Array.isArray(v.history))throw Error();state={...initialState,...v};save();alert("バックアップを復元しました。")}catch{alert("バックアップファイルを読み込めませんでした。")}};
document.querySelector("#resetBtn").onclick=()=>{if(confirm("学習履歴と進行状況を初期化します。よろしいですか？")){state={...initialState};save();document.querySelector("#settingsDialog").close()}};
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
render();

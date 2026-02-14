// BGM変数
let bgmAudio = null;
let gameBgmAudio = null;
let bgmStarted = false;
let bgmVolume = 0.5; // BGMデフォルト音量50%
let sfxVolume = 0.5; // 効果音デフォルト音量50%
let broadcastStarted = false; // 配信開始フラグ

// 効果音再生関数
function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.volume = sfxVolume;
  audio.play().catch(e => console.log('効果音再生エラー:', e));
}

// ゲットメッセージ表示関数
function showGetMessage(number) {
  const getMessage = document.getElementById('get-message');
  if (number === 1) {
    getMessage.innerHTML = '<div style="text-align: center;"><span style="color: #c0edf0;">甘狼このみ</span><br><span style="font-size: 0.8em;">ゲット！</span></div>';
  } else if (number === 2) {
    getMessage.innerHTML = '<div style="text-align: center;"><span style="color: #b4b1df;">音ノ乃のの</span><br><span style="font-size: 0.8em;">ゲット！</span></div>';
  } else if (number === 3) {
    getMessage.innerHTML = '<div style="text-align: center;"><span style="color: #b2405d;">あくび・でもんすぺーど</span><br><span style="font-size: 0.8em;">ゲット！</span></div>';
  } else if (number === 4) {
    getMessage.innerHTML = '<div style="text-align: center;"><span style="color: #ffdf5c;">音ノ瀬らこ</span><br><span style="font-size: 0.8em;">ゲット！</span></div>';
  } else if (number === 5) {
    getMessage.innerHTML = '<div style="text-align: center;"><span style="color: #9BB7E9;">ゆらぎゆら</span><br><span style="font-size: 0.8em;">ゲット！</span></div>';
  } else if (number === 6) {
    getMessage.innerHTML = '<div style="text-align: center;"><span style="color: #ffab57;">小廻こま</span><br><span style="font-size: 0.8em;">ゲット！</span></div>';
  } else if (number === 7) {
    getMessage.innerHTML = '<div style="text-align: center;"><span style="color: #2b3236;">雨夜リズ</span><br><span style="font-size: 0.8em;">ゲット！</span></div>';
  } else if (number === 8) {
    getMessage.innerHTML = '<div style="text-align: center;"><span style="color: #8b9dff;">眠雲ツクリ</span><br><span style="font-size: 0.8em;">ゲット！</span></div>';
  } else if (number === 9) {
    getMessage.innerHTML = '<div style="text-align: center;"><span style="color: #F5B7B7;">虹深゜ぬふ</span><br><span style="font-size: 0.8em;">ゲット！</span></div>';
  } else {
    getMessage.innerHTML = `<div style="text-align: center;">${number}<br><span style="font-size: 0.8em;">ゲット！</span></div>`;
  }
  getMessage.classList.remove('hidden');
  
  // ゲットメッセージ表示中はカード操作をロック
  lock = true;
  
  // 全カードのクリックを無効化
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(c => c.style.pointerEvents = 'none');
  
  // 2秒後に非表示
  setTimeout(() => {
    getMessage.classList.add('hidden');
    // ロックを解除
    lock = false;
    // カードのクリックを再有効化
    allCards.forEach(c => c.style.pointerEvents = '');
  }, 2000);
}

// キャラクターカードめくり機能
function initCharacterCard() {
  const characterCard = document.querySelector('.character-simple-card');
  if (characterCard) {
    characterCard.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  }
}

// デコレーションカードめくり機能
function initDecorationCard() {
  // クリック機能を削除 - プレイヤー1のカードとして制御
}

// プレイヤー1のデコレーションカードを裏返す
function showPlayer1DecorationCard() {
  const decorationCard = document.querySelector('.decoration-left-center');
  if (decorationCard) {
    decorationCard.classList.add('flipped');
    
    // 5秒後に表に戻す
    setTimeout(() => {
      decorationCard.classList.remove('flipped');
    }, 5000);
  }
}

// プレイヤー1のデコレーションカードを泣き顔にする
function showPlayer1SadFace() {
  const decorationCard = document.querySelector('.decoration-left-center');
  const happyFace = decorationCard.querySelector('.card-back');
  const sadFace = decorationCard.querySelector('.card-sad');
  
  if (decorationCard && happyFace && sadFace) {
    // 笑顔を非表示、泣き顔を表示
    happyFace.style.display = 'none';
    sadFace.style.display = 'flex';
    
    // カードをひっくり返す
    decorationCard.classList.add('flipped');
    
    // 5秒後に元に戻す
    setTimeout(() => {
      decorationCard.classList.remove('flipped');
      setTimeout(() => {
        happyFace.style.display = 'flex';
        sadFace.style.display = 'none';
      }, 400); // アニメーション時間を待つ
    }, 5000);
  }
}

// プレイヤー2のデコレーションカードを裏返す
function showPlayer2DecorationCard() {
  const decorationCard = document.querySelector('.decoration-right-center');
  if (decorationCard) {
    decorationCard.classList.add('flipped');
    
    // 5秒後に表に戻す
    setTimeout(() => {
      decorationCard.classList.remove('flipped');
    }, 5000);
  }
}

// プレイヤー2のデコレーションカードを泣き顔にする
function showPlayer2SadFace() {
  const decorationCard = document.querySelector('.decoration-right-center');
  const happyFace = decorationCard.querySelector('.card-back');
  const sadFace = decorationCard.querySelector('.card-sad');
  
  if (decorationCard && happyFace && sadFace) {
    // 笑顔を非表示、泣き顔を表示
    happyFace.style.display = 'none';
    sadFace.style.display = 'flex';
    
    // カードをひっくり返す
    decorationCard.classList.add('flipped');
    
    // 5秒後に元に戻す
    setTimeout(() => {
      decorationCard.classList.remove('flipped');
      setTimeout(() => {
        happyFace.style.display = 'flex';
        sadFace.style.display = 'none';
      }, 400); // アニメーション時間を待つ
    }, 5000);
  }
}

// 汎用メッセージ表示関数
function showGeneralMessage(text, duration = 2000) {
  const message = document.getElementById('general-message');
  
  message.textContent = text;
  message.classList.remove('hidden');
  
  // durationが0の場合は永続表示（消さない）
  if (duration > 0) {
    setTimeout(() => {
      message.classList.add('hidden');
    }, duration);
  }
}

// スキル確認表示関数
function showSkillConfirm(text, onConfirm) {
  const confirmDiv = document.getElementById('skill-confirm');
  const textDiv = confirmDiv.querySelector('.skill-confirm-text');
  textDiv.textContent = text;
  confirmDiv.classList.remove('hidden');
  
  // コールバックをグローバル変数に保存
  window.skillConfirmCallback = onConfirm;
}

// スキル確認結果処理関数
function confirmSkill(result) {
  const confirmDiv = document.getElementById('skill-confirm');
  confirmDiv.classList.add('hidden');
  
  if (window.skillConfirmCallback) {
    window.skillConfirmCallback(result);
    window.skillConfirmCallback = null;
  }
}

// 配信開始関数
function startBroadcast() {
  if (!broadcastStarted) {
    broadcastStarted = true;
    
    // ゲームスタートボタンを有効化
    const startBtn = document.getElementById('start-btn');
    startBtn.disabled = false;
    
    // BGMを開始
    startBGM();
    
    // コメントを開始
    setTimeout(() => {
      console.log('配信開始：チャット開始');
      startChat();
    }, 1000);
    
    // 配信開始ボタンのテキストを変更
    const broadcastBtn = document.getElementById('broadcast-btn');
    broadcastBtn.textContent = 'LIVE';
    broadcastBtn.style.background = 'linear-gradient(to bottom, #28a745 0%, #20c997 100%)';
    
    console.log('配信を開始しました');
  }
}

// BGM開始関数
function startBGM() {
  if (!bgmStarted) {
    bgmAudio = new Audio('./bgm/Mini.mp3');
    bgmAudio.loop = true;
    bgmAudio.volume = 0.3;
    bgmAudio.play().catch(e => console.log('BGM再生エラー:', e));
    bgmStarted = true;
  }
}

// ゲームBGM開始関数
function startGameBGM() {
  gameBgmAudio = new Audio('./bgm/gamebiyori.mp3');
  gameBgmAudio.loop = true;
  gameBgmAudio.volume = 0.3;
  gameBgmAudio.play().catch(e => console.log('ゲームBGM再生エラー:', e));
}

// スタートゲーム関数
function startGame(event) {
  // イベント伝播を停止
  if (event) {
    event.stopPropagation();
  }
  
  // 配信が開始されているかチェック
  if (!broadcastStarted) {
    showGeneralMessage('まず配信を開始してください！', 2000);
    return;
  }
  
  // ゲーム開始時にコメントを待機用に切り替え
  currentComments = waitingComments;
  gameStarted = true;
  firstCardClicked = false;
  console.log('ゲーム開始：待機用コメントに切り替え');
  
  // スタート画面BGMを停止
  if (bgmAudio) {
    bgmAudio.pause();
    bgmAudio = null;
  }
  
  // スタート画面を非表示
  document.getElementById('start-screen').style.display = 'none';
  
  // ゲーム画面を表示
  document.getElementById('game-container').style.display = 'flex';
  
  // ゲームを初期化
  initializeGame();
  
  // ゲームBGMを開始
  startGameBGM();
}

// BGM再生関数（互換性のため残す）
function playBGM() {
  startBGM();
}

// ゲーム初期化関数
function initializeGame() {
  // ゲームの初期化処理
  updateScores();
  updateSkillButtons();
}

// 効果音再生関数
function playSound(soundType) {
  const audio = new Audio();
  
  switch(soundType) {
    case 'flip':
      audio.src = './sounds/card_is_taken.mp3';
      break;
    case 'shuffle':
      audio.src = './sounds/shuff.mp3';
      break;
    default:
      return;
  }
  
  audio.volume = sfxVolume;
  audio.play().catch(e => console.log('音声再生エラー:', e));
}

// ホームに戻る確認関数
function confirmGoHome() {
  // モーダルを表示
  const modal = document.getElementById('home-confirm-modal');
  modal.classList.remove('hidden');
}

// ホームに戻る関数
function goToHome() {
  location.reload();
}

// ホーム確認を閉じる関数
function closeHomeConfirm() {
  const modal = document.getElementById('home-confirm-modal');
  modal.classList.add('hidden');
}

let currentPlayer = 1;
let firstCard = null;
let lock = false;
let player1Score = 0;
let player2Score = 0;
let blockedCards = []; // ブロックされたカード情報 [cardIndex, blockingPlayer, turnsRemaining]
let extraTurn = false; // 追加手番フラグ
let blockingMode = false; // ブロックモードフラグ
let pendingBlock = false; // 手番終了後のブロック待ちフラグ
let blockTargetPlayer = 0; // ブロック対象のプレイヤー
let pendingShuffle = false; // 手番終了後のシャッフル待ちフラグ
let activeSkills = {1: [], 2: []}; // 各プレイヤーの使用済みスキル
let pendingSkills = {1: null, 2: null}; // 各プレイヤーの待機中スキル

const images = [];
for (let i = 1; i <= 10; i++) {
  images.push(i, i);
}
images.sort(() => Math.random() - 0.5);

const board = document.getElementById("board");

images.forEach((num, index) => {
  const card = document.createElement("div");
  card.className = "card";
  
  // カードに位置番号を設定（1から20）
  card.dataset.position = index + 1;
  
  // カード表面（裏面）
  const cardFront = document.createElement("div");
  cardFront.className = "card-face card-front position-number";
  // A～Sの文字を生成
  const positionChar = String.fromCharCode(65 + index); // A=65, B=66, ...
  cardFront.textContent = positionChar;
  
  // カード裏面（表面）
  const cardBack = document.createElement("div");
  cardBack.className = "card-face card-back";
  // 10のカードは「×」に、それ以外は数字を表示
  cardBack.textContent = num === 10 ? "×" : num;
  // 数字「1」のカードにdata-number属性を設定
  if (num === 1) {
    cardBack.setAttribute('data-number', '1');
  }
  // 数字「2」のカードにdata-number属性を設定
  if (num === 2) {
    cardBack.setAttribute('data-number', '2');
  }
  // 数字「3」のカードにdata-number属性を設定
  if (num === 3) {
    cardBack.setAttribute('data-number', '3');
  }
  // 数字「4」のカードにdata-number属性を設定
  if (num === 4) {
    cardBack.setAttribute('data-number', '4');
  }
  // 数字「5」のカードにdata-number属性を設定
  if (num === 5) {
    cardBack.setAttribute('data-number', '5');
  }
  // 数字「6」のカードにdata-number属性を設定
  if (num === 6) {
    cardBack.setAttribute('data-number', '6');
  }
  // 数字「7」のカードにdata-number属性を設定
  if (num === 7) {
    cardBack.setAttribute('data-number', '7');
  }
  // 数字「8」のカードにdata-number属性を設定
  if (num === 8) {
    cardBack.setAttribute('data-number', '8');
  }
  // 数字「9」のカードにdata-number属性を設定
  if (num === 9) {
    cardBack.setAttribute('data-number', '9');
  }
  // 数字「10」のカードにdata-number属性を設定
  if (num === 10) {
    cardBack.setAttribute('data-number', '10');
  }
  
  card.appendChild(cardFront);
  card.appendChild(cardBack);

  card.onclick = () => {
    // 最初のカードクリックでゲーム用コメントに切り替え
    if (gameStarted && !firstCardClicked) {
      currentComments = gameComments;
      firstCardClicked = true;
      console.log('最初のカードクリック：ゲーム用コメントに切り替え');
    }
    
    // ロック中、既に開いているカード、マッチ済みカードはクリック不可
    if (lock || card.classList.contains("open") || card.classList.contains("matched")) return;
    
    // 即座にロックをかけて連続クリックを防止
    lock = true;
    
    // ブロックされたカードは選択できるかチェック（ただしブロックモード時は除く）
    const cardIndex = Array.from(board.children).indexOf(card);
    const isBlocked = blockedCards.some(([idx, blockedPlayer, turns]) => 
      idx === cardIndex && currentPlayer === blockedPlayer && turns > 0
    );
    
    if (isBlocked && !blockingMode) {
      showGeneralMessage('このカードは選べません！');
      lock = false; // ロックを解除
      return;
    }

    // ブロックモードの場合（2枚めくり終わった後）
    if (blockingMode) {
      if (card.classList.contains("open")) {
        showGeneralMessage('表向きのカードはブロックできません！');
        lock = false; // ロックを解除
        return;
      }
      
      const blockingPlayer = currentPlayer === 1 ? 2 : 1;
      blockedCards.push([cardIndex, blockingPlayer, 1]);
      blockingMode = false;
      updateBlockDisplay();
      showGeneralMessage(`サインを描きました！`, 2000);
      
      // ブロック選択後、全カードのクリックを再有効化
      const allCards = document.querySelectorAll('.card');
      allCards.forEach(c => c.style.pointerEvents = '');
      
      // ブロック選択後、すぐに手番交代
      handleTurnChange();
      return;
    }

    // 10のカードチェック（「×」のカードも含む）
    const cardBack = card.querySelector('.card-back');
    if (cardBack.textContent === '10' || cardBack.textContent === '×') {
      // 10のカードをめくって効果音を鳴らす
      card.classList.add("open");
      playSound('flip'); // カードめくり音
      
      // 10カードコメントに切り替え
      if (!first10Drawn) {
        currentComments = firstCard10Comments;
        first10Drawn = true;
        console.log('はじめて10カードを引いた：初回10カードコメントに切り替え');
      } else {
        currentComments = secondCard10Comments;
        console.log('2回目以降の10カード：2回目以降10カードコメントに切り替え');
      }
      
      // 既存の10カードタイマーをクリア
      if (card10Timer) {
        clearTimeout(card10Timer);
      }
      
      // 10秒後にゲーム用コメントに戻す
      card10Timer = setTimeout(() => {
        currentComments = gameComments;
        console.log('10秒経過：ゲーム用コメントに戻す');
        card10Timer = null;
      }, 10000);
      
      // 即座に全カードのクリックを無効化
      const allCards = document.querySelectorAll('.card');
      allCards.forEach(c => c.style.pointerEvents = 'none');
      
      // 0.5秒遅らせてアウトメッセージを中央に2秒間表示
      setTimeout(() => {
        const outMessage = document.getElementById('out-message');
        outMessage.classList.remove('hidden');
        
        // ×カードを引いたプレイヤーに泣き顔を表示
        if (currentPlayer === 1) {
          showPlayer1SadFace();
        } else {
          showPlayer2SadFace();
        }
        
        // 2秒後にメッセージを消してカードを裏返す
        setTimeout(() => {
          outMessage.classList.add('hidden');
          card.classList.remove("open");
          // firstCardがあればそれも裏返す
          if (firstCard) {
            firstCard.classList.remove("open");
            firstCard = null;
          }
          
          // ゲーム終了チェック（10カードアウト後）
          const remainingCardsAfterOut = document.querySelectorAll(".card:not(.matched)");
          const remainingXCardsAfterOut = document.querySelectorAll(".card:not(.matched) .card-back[data-number='10']");
          
          if (remainingCardsAfterOut.length === 2 && remainingXCardsAfterOut.length === 2) {
            console.log('×カード2枚検出、自動めくり開始');
            console.log('残りカード数:', remainingCardsAfterOut.length);
            console.log('×カード数:', remainingXCardsAfterOut.length);
            
            setTimeout(() => {
              // 残りの×カード2枚を自動的にめくる
              const xCards = document.querySelectorAll(".card:not(.matched) .card-back[data-number='10']");
              console.log('見つかった×カード:', xCards.length);
              
              xCards.forEach(cardBack => {
                const card = cardBack.parentElement;
                card.classList.add("open");
                playSound('flip'); // カードめくり音
              });
              
              // 2秒後に結果を表示
              setTimeout(() => {
                // ゲーム終了時にゲーム終了用コメントに切り替え
                currentComments = gameEndComments;
                console.log('10カードアウト後、×カードが2枚残ったため自動めくり');
                showGeneralMessage(`${player1Score}vs${player2Score}\n${player1Score > player2Score ? "Player1の勝ち！" : player2Score > player1Score ? "Player2の勝ち！" : "引き分け！"}`, 0);
              }, 2000);
            }, 500);
            return;
          }
          
          // 追加手番のチェック
          if (extraTurn) {
            extraTurn = false;
            showGeneralMessage('アンコール！もう一度プレイ！');
            // 追加手番の場合はクリックを再有効化
            allCards.forEach(c => c.style.pointerEvents = '');
          } else {
            // スキル処理を実行
            handleAfterTwoCards();
          }
          lock = false; // ロックを解除
        }, 2000);
      }, 500);
      return;
    }

    card.classList.add("open");
    playSound('flip'); // カードめくり音
    
    // 10カードを引いた場合の処理
    const currentCardBack = card.querySelector('.card-back');
    if (currentCardBack && currentCardBack.textContent === '10') {
      // はじめて10を引いたかどうかでコメントを切り替え
      if (!first10Drawn) {
        currentComments = firstCard10Comments;
        first10Drawn = true;
        console.log('はじめて10カードを引いた：初回10カードコメントに切り替え');
      } else {
        currentComments = secondCard10Comments;
        console.log('2回目以降の10カード：2回目以降10カードコメントに切り替え');
      }
      
      // 既存の10カードタイマーをクリア
      if (card10Timer) {
        clearTimeout(card10Timer);
      }
      
      // 10秒後にゲーム用コメントに戻す
      card10Timer = setTimeout(() => {
        currentComments = gameComments;
        console.log('10秒経過：ゲーム用コメントに戻す');
        card10Timer = null;
      }, 10000);
    }

    if (!firstCard) {
      firstCard = card;
      lock = false; // 1枚目の場合はロックを解除して次のカードを選択可能に
    } else {
      lock = true;
      const firstCardBack = firstCard.querySelector('.card-back');
      if (firstCardBack.textContent === cardBack.textContent) {
        // ペアが揃った場合 - 一致コメントに切り替え
        currentComments = matchComments;
        console.log('ペア一致：一致コメントに切り替え');
        
        // 既存の一致タイマーをクリア
        if (matchTimer) {
          clearTimeout(matchTimer);
        }
        
        // 10秒後にゲーム用コメントに戻す
        matchTimer = setTimeout(() => {
          currentComments = gameComments;
          console.log('10秒経過：ゲーム用コメントに戻す');
          matchTimer = null;
        }, 10000);
        
        if (currentPlayer === 1) {
          player1Score++;
          // プレイヤー1の場合、デコレーションカードを裏返す
          showPlayer1DecorationCard();
        } else {
          player2Score++;
          // プレイヤー2の場合、デコレーションカードを裏返す
          showPlayer2DecorationCard();
        }
        
        // ゲットメッセージを表示（カード除去の前に呼ぶ）
        const cardNumber = cardBack.getAttribute('data-number');
        if (cardNumber && cardNumber >= '1' && cardNumber <= '9') {
          showGetMessage(parseInt(cardNumber));
        }
        
        // ゲットメッセージ表示中はカード除去を待つ
        setTimeout(() => {
          // すぐにカードを盤面から除去
          firstCard.classList.add("matched");
          card.classList.add("matched");
          updateScores();
          
          // ゲーム終了チェック
          const remainingCards = document.querySelectorAll(".card:not(.matched)");
          const remainingXCards = document.querySelectorAll(".card:not(.matched) .card-back[data-number='10']");
          
          if (remainingCards.length === 0) {
            // 通常のゲーム終了（全カード除去）
            setTimeout(() => {
              currentComments = gameEndComments;
              console.log('ゲーム終了：全カード除去');
              showGeneralMessage(`${player1Score}vs${player2Score}\n${player1Score > player2Score ? "Player1の勝ち！" : player2Score > player1Score ? "Player2の勝ち！" : "引き分け！"}`, 0);
            }, 500);
          } else if (remainingCards.length === 2 && remainingXCards.length === 2) {
            // ×カード2枚のみ残った場合
            console.log('ゲーム終了チェック - 残りカード:', remainingCards.length, '×カード:', remainingXCards.length);
            
            setTimeout(() => {
              console.log('ペア成立後、×カード2枚検出、自動めくり開始');
              
              // 残りの×カード2枚を自動的にめくる
              remainingXCards.forEach(cardBack => {
                const card = cardBack.parentElement;
                card.classList.add("open");
                playSound('flip'); // カードめくり音
              });
              
              // 2秒後に結果を表示
              setTimeout(() => {
                // ゲーム終了時にゲーム終了用コメントに切り替え
                currentComments = gameEndComments;
                console.log('ペア成立後、×カードが2枚残ったため自動めくり');
                showGeneralMessage(`${player1Score}vs${player2Score}\n${player1Score > player2Score ? "Player1の勝ち！" : player2Score > player1Score ? "Player2の勝ち！" : "引き分け！"}`, 0);
              }, 2000);
            }, 500);
          } else {
            // 追加手番のチェック
            if (extraTurn) {
              extraTurn = false;
              showGeneralMessage('アンコール！もう一度プレイ！');
            } else {
              // 少し遅延してから2枚引いた後の処理（カード除去アニメーションを待つ）
              setTimeout(() => {
                handleAfterTwoCards();
              }, 300);
            }
          }
          
          firstCard = null;
          lock = false;
        }, 2000); // ゲットメッセージ表示時間と同じ2秒待つ
      } else {
        // ペアが揃わなかった場合 - 不一致コメントに切り替え
        currentComments = mismatchComments;
        console.log('ペア不一致：不一致コメントに切り替え');
        
        // 既存の不一致タイマーをクリア
        if (mismatchTimer) {
          clearTimeout(mismatchTimer);
        }
        
        // 10秒後にゲーム用コメントに戻す
        mismatchTimer = setTimeout(() => {
          currentComments = gameComments;
          console.log('10秒経過：ゲーム用コメントに戻す');
          mismatchTimer = null;
        }, 10000);
        
        setTimeout(() => {
          card.classList.remove("open");
          firstCard.classList.remove("open");
          firstCard = null;
          lock = false;
          
          // 追加手番のチェック
          if (extraTurn) {
            extraTurn = false;
            showGeneralMessage('アンコール！もう一度プレイ！');
          } else {
            // 2枚引いた後の処理
            handleAfterTwoCards();
          }
        }, 1200);
      }
    }
  };

  board.appendChild(card);
});

// スコア表示更新関数
function updateScores() {
  const player1ScoreElement = document.getElementById("player1-score");
  const player2ScoreElement = document.getElementById("player2-score");
  
  // 親要素にdata-numberを設定
  player1ScoreElement.parentElement.setAttribute("data-number", player1Score);
  player2ScoreElement.parentElement.setAttribute("data-number", player2Score);
  
  player1ScoreElement.textContent = "";
  player2ScoreElement.textContent = "";
  
  // 残りカード枚数をチェック
  checkRemainingCards();
  
  // 手番表示の更新（アクティブターンのクラスを変更）
  const player1Info = document.querySelector(".player1-info");
  const player1Skills = document.querySelector(".player1-skills");
  const player2Info = document.querySelector(".player2-info");
  const player2Skills = document.querySelector(".player2-skills");
  
  // 全てのアクティブクラスを削除
  player1Info?.classList.remove("active-turn");
  player1Skills?.classList.remove("active-turn");
  player2Info?.classList.remove("active-turn");
  player2Skills?.classList.remove("active-turn");
  
  // 現在のプレイヤーにアクティブクラスを追加
  if (currentPlayer === 1) {
    player1Info?.classList.add("active-turn");
    player1Skills?.classList.add("active-turn");
  } else {
    player2Info?.classList.add("active-turn");
    player2Skills?.classList.add("active-turn");
  }
}

// 残りカード枚数チェック関数
function checkRemainingCards() {
  const cards = document.querySelectorAll('.card');
  const remainingCards = Array.from(cards).filter(card => 
    !card.classList.contains('matched')
  );
  
  // 残り2枚になったら自動的に10のカードをめくる
  if (remainingCards.length === 2) {
    // 両方のカードが10かチェック
    const card1Back = remainingCards[0].querySelector('.card-back');
    const card2Back = remainingCards[1].querySelector('.card-back');
    
    if (card1Back.textContent === '10' && card2Back.textContent === '10') {
      // 0.5秒後に自動的にカードをめくる
      setTimeout(() => {
        autoRevealFinalCards(remainingCards);
      }, 500);
    }
  }
}

// 最後の2枚の10のカードを自動的にめくる関数
function autoRevealFinalCards(cards) {
  lock = true; // ロックをかける
  
  // ゲーム終了用コメントに切り替え（タイマーなしでずっと流し続ける）
  currentComments = gameEndComments;
  console.log('最後の10カード：ゲーム終了用コメントに切り替え');
  
  // カードをめくるアニメーション
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("open");
      playSound('flip');
    }, index * 300); // 0.3秒間隔でめくる
  });
  
  // 2枚めくった後に結果表示
  setTimeout(() => {
    // アウトメッセージを表示せずに直接ゲーム結果を表示
    showGameResult();
  }, 800); // 2枚めくるのにかかる時間 + 少し待機
}

// ゲーム結果表示関数
function showGameResult() {
  let resultMessage = '';
  let winner = '';
  
  if (player1Score > player2Score) {
    winner = 'Player1';
    resultMessage = `🎉 Player1の勝利！ 🎉\nスコア: ${player1Score} - ${player2Score}`;
  } else if (player2Score > player1Score) {
    winner = 'Player2';
    resultMessage = `🎉 Player2の勝利！ 🎉\nスコア: ${player1Score} - ${player2Score}`;
  } else {
    resultMessage = `🤝 引き分け！ 🤝\nスコア: ${player1Score} - ${player2Score}`;
  }
  
  showGeneralMessage(resultMessage, 5000); // 5秒間表示
  
  // ゲーム終了処理
  lock = true; // ゲーム終了なのでロックを維持
}

// チャットコメント機能
const startScreenComments = [
  "きちゃ",
  "きちゃー", 
  "きちゃ!",
  "きちゃー！",
  "きちゃー！!",
  "楽しみ～",
  "間に合ったー",
  "こんにちは",
  "こんみりー",
  "こんみり～",
  "こんみりー！",
  "こんみり！",
  "まだかな～",
  "楽しみすぎる！",
  "楽しみやー",
  "始まってる？",
  "初見です",
  "初見です　こんみりー",
  "待機！",
  "待機っ！",
  "待機！！",
  "待機",
  "たいきっ！",
  "まだかなまだかな",
  "このときを待ってた",
  "待機",
  "待機！",
  "待機～",
  "待機っ！",
  "今日も楽しみ～",
  "わくわく",
  "わくわく！",
  "わくわく",
  "わくわく！",
  "こんみりー",
  "こんみり～",
  "こんみり！",
  "きちゃ",
  "きちゃー", 
  "きちゃ!",
  "きちゃー！",
  "きちゃー！!",
  "楽しみ～",
  "こんみりー",
  "こんみり～",
  "こんみりー！",
  "こんみり！",
  "こんみりー",
  "こんみり～",
  "こんみりっ！",
  "こんみりっ！",
  "こんみりー",
  "こんみり～",
  "こんみりー！",
  "こんみり！",
  "こんみりー",
  "こんみり～",
  "こんみりっ！",
  "こんみりっ！"
];

const gameComments = [
  "そのカードどこやったっけ？",
  "次は何が出るかな",
  "ミリちゃんは引いちゃあかんよ",
  "ミリちゃん来い！",
  "むちゃ集中してる",
  "ミリちゃんは引かないで",
  "リミックスする？",
  "スキルもあるのか",
  "次こそは！",
  "意外とむずいのか",
  "スキル使うものありかも",
  "見ててハラハラする",
  "このペアどこやった？",
  "思い出せっ！",
  "次はいける！",
  "ここが勝負どころ",
  "頑張って！",
  "こんみり～",
  "こんみりっ！",
  "こんみりっ！",
  "こんみりー",
  "こんみり～",
  "こんみりー！",
  "こんみり！",
  "こんみりー",
  "こんみり～",
  "こんみりっ！",
  "こんみりっ！",
  "初見です",
  "こんみりー",
  "ふぁいと～",
  "ファイト！",
  "ファイト～",
  "ふぁいと!",
  "ファイトだ！",
  "どこにペアがあるかな",
  "初見です",
  "こんにちは",
  "奇跡起きろ",
  "２人ともがんばれ～"
];

const waitingComments = [
  "ゲームスタート！",
  "始まった始まった！",
  "はじまった",
  "はじまった！",
  "両方がんば",
  "どっちが勝つかな",
  "始まった！",
  "がんばれ！",
  "頑張れー",
  "がんばれ～！",
  "がんばれー！！",
  "注目の一手目！",
  "おっはじまってる",
  "間に合った～",
  "こんみり～",
  "こんみりっ！",
  "こんみりっ！",
  "こんみりー",
  "こんみり～",
  "こんみりー！",
  "こんみり！",
  "こんみりー",
  "こんみり～",
  "こんみりっ！",
  "こんみりっ！",
  "初見です",
  "こんみりー",
  "ふぁいと～",
  "ファイト！",
  "ファイト～",
  "ふぁいと!",
  "ファイトだ！",
  "どこにペアがあるかな",
  "最初の一手大事！",
  "初見です",
  "こんにちは",
  "奇跡起きろ",
  "いきなり揃ったら神",
  "２人ともがんばれ～",
  "応援だ～",
];

const mismatchComments = [
  "あれー？",
  "違ったか！",
  "違うか～",
  "惜しい！",
  "次こそは！",
  "残念！",
  "うーん",
  "難しいな",
  "次だ次！",
  "大丈夫！",
  "諦めないで",
  "もういっちょ！",
  "もう１回！",
  "リカバリー！",
  "集中！",
  "あれっそこ違うんや",
  "あらまっ",
  "いやむず～",
  "しゃーなし",
  "どんまい",
  "ドンマイだ！",
  "流れを変えよう",
  "巻き返し！",
  "まだまだある",
  "メンタル大事",
  "気合いだ～！",
  "頑張れ！",
  "ファイト！",
  "負けないで～",
  "気合いだ～！",
  "おっと"

];

const matchComments = [
  "ナイス！",
  "ないすぅ～",
  "ないす！",
  "ナイスすぎ",
  "おっ！そろった！",
  "よし！",
  "揃った！",
  "すごい！",
  "すげー！",
  "お見事！",
  "天才か？",
  "神プレイ！",
  "やったね！",
  "最高！",
  "素晴らしい！",
  "見事！",
  "完璧！",
  "エクセレント！",
  "パーフェクト！",
  "ファンタスティック！",
  "アメージング！",
  "ワンダフル！",
  "グレート！",
  "グッド！",
  "よく覚えていたな",
  "うわっそこやったか",
  "記憶力すごっ",
  "この調子だ！"
];

const firstCard10Comments = [
  "ミリちゃん引いちゃった！",
  "ミリちゃんだ！",
  "やばいミリちゃんきた！",
  "ミリちゃんカード！",
  "ミリちゃん引いたか…",
  "ミリちゃんが来た！",
  "ミリちゃん出た！",
  "ミリちゃん引かれた！",
  "ミリちゃんだー！",
  "ミリちゃんが選ばれた！",
  "ミリちゃんが出現！",
  "ミリちゃんが現れた！",
  "く、くるっ",
  "ミリちゃんが現る！",
  "ミリちゃんが来たぞ！",
  "ミリちゃんの圧www",
  "あっ",
  "おっと",
  "あっwww",
  "www",
  "あっ",
  "おっと",
  "あっwww",
  "www",
  "あっ",
  "おっと",
  "あっwww",
  "www",
  "進捗確認は草",
  "進捗確認は草",
  "く、くるっ",
  "ここで手番終了はきついー",
  "手番終わっちゃうのか～",
  "ドンマイ",
  "ドンマイすぎる"

];

const secondCard10Comments = [
  "またミリちゃんだ！",
  "連続ミリちゃん！",
  "ミリちゃんまた来た！",
  "ミリちゃん連発！",
  "ミリちゃんがまた出た！",
  "ミリちゃんがまた来た！",
  "ミリちゃんがまた現れた！",
  "ミリちゃんがまた登場！",
　"ミリちゃん再びwww",
  "く、くるっ",
  "ミリちゃんが現る！",
  "ミリちゃんが来たぞ！",
  "ミリちゃんの圧www",
  "あっ",
  "おっと",
  "あっwww",
  "www",
  "あっ",
  "おっと",
  "あっwww",
  "www",
  "あっ",
  "おっと",
  "あっwww",
  "www",
  "進捗確認は草",
  "進捗確認は草",
  "く、くるっ",
  "ここで手番終了はきついー",
  "手番終わっちゃうのか～",
  "ドンマイ",
  "ドンマイすぎる"

];

const gameEndComments = [
  "おつかれさま！",
  "ゲームお疲れ様！",
  "見てて楽しかった！",
  "おつかれ！",
  "おつみり～",
  "再戦する？",
  "おもろかったwww",
  "おもろかった！",
  "ないすファイト!",
  "もう終わったのかー",
  "面白すぎる！",
  "クリアおめでとう！",
  "勝利おめでとう！",
  "頑張ったね！",
  "よく頑張った！",
  "記憶力すごかった！",
  "おつかれ！",
  "おつみり～",
  "おつみりっ！",
　"おつミリ～",
  "おつミリ！",
  "おつかれ！",
  "おつみり～",
  "おつみりっ！",
　"おつミリ～",
  "おつミリ！",
  "おつかれ！",
  "おつみり～",
  "おつみりっ！",
　"おつミリ～",
  "おつミリ！"

];

let currentComments = startScreenComments; // 最初はスタート画面用コメント
let gameStarted = false; // ゲームが開始されたか
let firstCardClicked = false; // 最初のカードがクリックされたか
let mismatchTimer = null; // ペア不一致時のタイマー
let matchTimer = null; // ペア一致時のタイマー
let card10Timer = null; // 10カード時のタイマー
let first10Drawn = false; // はじめて10を引いたか

let chatInterval;

// チャットコメントを追加する関数
function addChatComment() {
  const chatContent = document.getElementById('chat-content');
  if (!chatContent) {
    console.log('chat-content要素が見つかりません');
    return;
  }
  
  const randomComment = currentComments[Math.floor(Math.random() * currentComments.length)];
  const commentElement = document.createElement('div');
  commentElement.className = 'chat-comment';
  
  // タイムスタンプを生成
  const time = new Date().toLocaleTimeString('ja-JP', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  
  commentElement.innerHTML = `
    <span class="comment-time">${time}</span>
    <span class="comment-text">${randomComment}</span>
  `;
  
  // コメント履歴のようなボックススタイル
  commentElement.style.position = 'absolute';
  commentElement.style.bottom = '10px';
  commentElement.style.left = '10px';
  commentElement.style.right = '10px';
  commentElement.style.background = 'rgba(120, 150, 255, 0.2)';
  commentElement.style.padding = '4px 8px';
  commentElement.style.marginBottom = '3px';
  commentElement.style.borderRadius = '6px';
  commentElement.style.borderLeft = '2px solid #7896ff';
  commentElement.style.fontSize = '14px';
  commentElement.style.fontFamily = "'cinecaption226', cursive, sans-serif";
  commentElement.style.color = '#ffffff';
  commentElement.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.8)';
  commentElement.style.opacity = '0';
  commentElement.style.transform = 'translateX(-20px)';
  commentElement.style.transition = 'all 0.3s ease';
  commentElement.style.zIndex = '10';
  commentElement.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
  commentElement.style.backdropFilter = 'blur(5px)';
  commentElement.style.display = 'flex';
  commentElement.style.alignItems = 'center';
  commentElement.style.justifyContent = 'flex-start';
  commentElement.style.whiteSpace = 'nowrap';
  commentElement.style.overflow = 'hidden';
  commentElement.style.textOverflow = 'ellipsis';
  
  chatContent.appendChild(commentElement);
  console.log('コメントを追加しました:', randomComment);
  
  // フェードインアニメーション
  setTimeout(() => {
    commentElement.style.opacity = '1';
    commentElement.style.transform = 'translateX(0)';
  }, 100);
  
  // 既存のコメントを上に移動
  const existingComments = chatContent.querySelectorAll('.chat-comment');
  existingComments.forEach((existingComment, index) => {
    if (existingComment !== commentElement) {
      const currentBottom = parseInt(existingComment.style.bottom) || 10;
      existingComment.style.bottom = (currentBottom + 35) + 'px';
      
      // 上に移動したコメントをフェードアウト（5行表示に対応）
      if (currentBottom > 120) {
        existingComment.style.opacity = '0';
        setTimeout(() => {
          if (existingComment.parentNode) {
            existingComment.parentNode.removeChild(existingComment);
          }
        }, 300);
      }
    }
  });
  
  // このコメントも時間経過後に削除（ゲーム終了時は削除しない）
  if (currentComments !== gameEndComments) {
    setTimeout(() => {
      commentElement.style.opacity = '0';
      commentElement.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        if (commentElement.parentNode) {
          commentElement.parentNode.removeChild(commentElement);
        }
      }, 300);
    }, 8000);
  }
}

// チャットを開始する関数
function startChat() {
  console.log('チャット開始テスト');
  
  // テスト用の要素は削除
  // const testDiv = document.createElement('div');
  // ...（テストコードはコメントアウト）
  
  // 本来のチャット処理を有効化
  const chatContent = document.getElementById('chat-content');
  if (chatContent) {
    console.log('chat-contentが見つかりました');
    
    // 不規則な間隔で新しいコメントを追加
    function scheduleNextComment() {
      const randomInterval = Math.random() * 700 + 100; // 0.1秒〜0.8秒のランダム間隔
      chatInterval = setTimeout(() => {
        addChatComment();
        if (chatInterval) { // チャットが停止されていなければ次を予約
          scheduleNextComment();
        }
      }, randomInterval);
    }
    
    scheduleNextComment(); // 最初のコメントを予約
    console.log('不規則なチャットコメントの自動生成を開始しました');
  } else {
    console.log('chat-contentが見つかりません');
  }
}

// チャットを停止する関数
function stopChat() {
  if (chatInterval) {
    clearTimeout(chatInterval);
    chatInterval = null;
  }
}

// ゲーム開始時にチャットを開始
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM読み込み完了');
  
  // 配信開始ボタンがクリックされたときの処理
  const broadcastButton = document.getElementById('broadcast-btn');
  console.log('broadcast-btn:', broadcastButton);
  
  if (broadcastButton) {
    broadcastButton.addEventListener('click', function() {
      console.log('配信開始ボタンがクリックされました');
    });
  } else {
    console.log('broadcast-btnが見つかりません');
  }
});

// スキル使用関数
function useSkill(player, skillType) {
  if (lock) {
    showGeneralMessage('カード処理中はスキルを使用できません');
    return;
  }
  
  if (player !== currentPlayer) {
    showGeneralMessage('自分の手番でないとスキルを使用できません');
    return;
  }
  
  if (firstCard) {
    showGeneralMessage('カードを選択中はスキルを使用できません');
    return;
  }
  
  // スキル番号を取得
  const skillNum = skillType === 'block' ? 1 : skillType === 'shuffle' ? 2 : 3;
  
  // 既に使用済みのスキルかチェック
  if (activeSkills[player].includes(skillNum)) {
    return; // メッセージを表示せずに何もしない
  }
  
  // 既に待機中のスキルがあるかチェック
  if (pendingSkills[player] !== null) {
    showGeneralMessage('既に他のスキルが待機中です！');
    return;
  }
  
  const skillNames = {block: 'サイン', shuffle: 'リミックス', extra: 'アンコール'};
  
  showSkillConfirm(`「${skillNames[skillType]}」を発動させますか？`, (confirmed) => {
    if (confirmed) {
      // スキルを使用済みに登録
      activeSkills[player].push(skillNum);
      pendingSkills[player] = skillNum;
      
      // OKクリック時はボタンを更新しない
      // updateSkillButtons();
      
      switch(skillType) {
        case 'block':
          skillBlockCard();
          break;
        case 'shuffle':
          skillShuffleCards();
          break;
        case 'extra':
          skillExtraTurn();
          break;
      }
    }
  });
}

// スキル1：カードをブロックする
function skillBlockCard() {
  pendingBlock = true;
  blockTargetPlayer = currentPlayer === 1 ? 2 : 1;
  
  // ブロックスキルは即時実行されるので待機中スキルをクリア
  pendingSkills[currentPlayer] = null;
}

// スキル2：カードをシャッフルする
function skillShuffleCards() {
  pendingShuffle = true;
}

// スキル3：追加手番
function skillExtraTurn() {
  extraTurn = true;
  
  // 追加手番スキルは即時実行されるので待機中スキルをクリア
  pendingSkills[currentPlayer] = null;
}

// 2枚引いた後の処理
function handleAfterTwoCards() {
  // ブロック待ち中の場合はブロックモードを有効化
  if (pendingBlock) {
    // ブロックモードの場合はカードクリックを再有効化
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(c => c.style.pointerEvents = '');
    
    blockingMode = true;
    pendingBlock = false;
    showGeneralMessage('カードを１枚選んでください！');
  } else {
    // シャッフル待ち中の場合はカードが閉じた後にシャッフル
    if (pendingShuffle) {
      // カードが完全に閉じてからシャッフルを実行（1000ms + 100ms）
      setTimeout(() => {
        executeShuffle();
        pendingShuffle = false;
        handleTurnChange();
      }, 1100);
    } else {
      // 通常の手番交代
      handleTurnChange();
    }
  }
}

// 手番交代処理
function handleTurnChange() {
  // スキルボタンを更新（相手の手番に移る直前）
  updateSkillButtons();
  
  // ロックを解除
  lock = false;
  
  // 全カードのクリックを再有効化
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(c => c.style.pointerEvents = '');
  
  // ブロックの残りターンを減らす（ただし、ブロックされたプレイヤーの手番が終わった後のみ）
  for (let i = blockedCards.length - 1; i >= 0; i--) {
    const [cardIndex, blockedPlayer, turnsRemaining] = blockedCards[i];
    if (blockedPlayer === currentPlayer) { // ちょうど手番が終わったプレイヤーのブロックを減らす
      blockedCards[i][2] = turnsRemaining - 1;
      // ターンが0になったらブロックを解除
      if (blockedCards[i][2] <= 0) {
        blockedCards.splice(i, 1);
      }
    }
  }
  
  // ブロック表示を更新
  updateBlockDisplay();
  
  // 待機中スキルをクリア
  pendingSkills[currentPlayer] = null;
  
  // 手番交代
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  
  // 手番表示を更新
  updateScores();
  
  // スキルボタン状態を更新
  updateSkillButtons();
}

// ブロック表示更新関数
function updateBlockDisplay() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    // 既存のブロックマークを削除
    const existingBlock = card.querySelector('.block-mark');
    if (existingBlock) {
      existingBlock.remove();
    }
    
    // 新しいブロックマークを追加
    const blockInfo = blockedCards.find(([idx, blockedPlayer, turns]) => idx === index && turns > 0);
    if (blockInfo && !card.classList.contains('open')) {
      const blockMark = document.createElement('div');
      blockMark.className = 'block-mark';
      blockMark.textContent = '🚫';
      card.appendChild(blockMark);
    }
  });
}

// シャッフル実行関数
function executeShuffle() {
  // シャッフル前に全てのブロックマークを取り除く
  const allBlockMarks = document.querySelectorAll('.block-mark');
  allBlockMarks.forEach(mark => mark.remove());
  
  const cards = document.querySelectorAll('.card');
  const board = document.getElementById('board');
  
  // シャッフル可能なカードを収集（ブロックされているカードも含む）
  const shuffleTargets = [];
  
  cards.forEach((card, index) => {
    if (!card.classList.contains('open') && !card.classList.contains('matched')) {
      shuffleTargets.push({card, index});
    }
  });
  
  if (shuffleTargets.length < 2) {
    showGeneralMessage('シャッフルできるカードが2枚以上ありません！');
    return;
  }
  
  // 全ての位置を収集
  const allPositions = [];
  for (let i = 0; i < cards.length; i++) {
    allPositions.push(i);
  }
  
  // シャッフル対象カードの情報を収集
  const cardData = shuffleTargets.map(item => {
    const cardBack = item.card.querySelector('.card-back');
    const text = cardBack.textContent;
    return {
      card: item.card,
      originalIndex: item.index,
      number: text === '×' ? '10' : text,
      displayText: text
    };
  });
  
  // 数字をシャッフル
  const numbers = cardData.map(item => item.number);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  
  // 位置をシャッフル（空いている場所も含めてランダム配置）
  const availablePositions = [...allPositions];
  const selectedPositions = [];
  
  for (let i = 0; i < shuffleTargets.length; i++) {
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    selectedPositions.push(availablePositions[randomIndex]);
    availablePositions.splice(randomIndex, 1);
  }
  
  // シャッフルされた数字をカードに設定
  cardData.forEach((item, index) => {
    const newNumber = numbers[index];
    const cardBack = item.card.querySelector('.card-back');
    
    if (newNumber === '10') {
      cardBack.textContent = '×';
      cardBack.setAttribute('data-number', '10');
    } else {
      cardBack.textContent = newNumber;
      cardBack.setAttribute('data-number', newNumber);
    }
  });
  
  // シャッフルアニメーション
  shuffleTargets.forEach(item => {
    item.card.style.transition = 'all 0.6s ease';
    item.card.style.transform = 'rotateY(720deg) scale(0.8)';
    item.card.style.opacity = '0.5';
  });
  
  // アニメーション後に位置を変更
  setTimeout(() => {
    // ボードをクリアして再構築
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    // 位置マップを作成
    const positionMap = new Map();
    shuffleTargets.forEach((item, i) => {
      positionMap.set(selectedPositions[i], item);
    });
    
    // 全ての位置にカードを配置
    for (let pos = 0; pos < allPositions.length; pos++) {
      const targetItem = positionMap.get(pos);
      const originalCard = cards[pos];
      
      if (targetItem) {
        // シャッフル対象カードを新しい位置に配置
        board.appendChild(targetItem.card);
        targetItem.card.style.display = '';
        
        // 新しい位置に応じてA～Sを設定
        const cardFront = targetItem.card.querySelector('.card-front');
        if (cardFront) {
          const alphabet = String.fromCharCode(65 + pos);
          cardFront.textContent = alphabet;
        }
      } else if (originalCard) {
        // シャッフル対象外のカードを元の位置に配置
        board.appendChild(originalCard);
        originalCard.style.display = '';
        
        // A～Sを更新
        const cardFront = originalCard.querySelector('.card-front');
        if (cardFront && !originalCard.classList.contains('matched')) {
          const alphabet = String.fromCharCode(65 + pos);
          cardFront.textContent = alphabet;
        }
      }
    }
    
    // アニメーションを元に戻す
    setTimeout(() => {
      shuffleTargets.forEach(item => {
        item.card.style.transform = '';
        item.card.style.opacity = '';
      });
      
      // ブロック表示を更新
      updateBlockDisplay();
      
      showGeneralMessage('リミックス 完了！');
      playSound('shuffle');
    }, 300);
  }, 600);
}

// スキルボタン状態更新関数
function updateSkillButtons() {
  console.log('updateSkillButtons called');
  
  // プレイヤー1のボタン更新
  const player1Buttons = document.querySelectorAll('.player1-skills .skill-btn');
  console.log('Player1 buttons found:', player1Buttons.length);
  
  // 各ボタンのスキル番号を正しく設定
  const skillTypes = ['block', 'shuffle', 'extra'];
  
  player1Buttons.forEach((btn, index) => {
    const skillType = skillTypes[index];
    const skillNum = skillType === 'block' ? 1 : skillType === 'shuffle' ? 2 : 3;
    const isUsed = activeSkills[1].includes(skillNum);
    const isPending = pendingSkills[1] !== null;
    
    console.log(`Player1 button ${index + 1} (${skillType}): used=${isUsed}, pending=${isPending}`);
    
    if (isUsed) {
      btn.disabled = true;
      btn.classList.add('skill-used');
    } else if (isPending) {
      btn.disabled = true;
      btn.classList.add('skill-pending');
    } else {
      btn.disabled = false;
      btn.classList.remove('skill-used', 'skill-pending');
    }
  });
  
  // プレイヤー2のボタン更新
  const player2Buttons = document.querySelectorAll('.player2-skills .skill-btn');
  console.log('Player2 buttons found:', player2Buttons.length);
  
  player2Buttons.forEach((btn, index) => {
    const skillType = skillTypes[index];
    const skillNum = skillType === 'block' ? 1 : skillType === 'shuffle' ? 2 : 3;
    const isUsed = activeSkills[2].includes(skillNum);
    const isPending = pendingSkills[2] !== null;
    
    console.log(`Player2 button ${index + 1} (${skillType}): used=${isUsed}, pending=${isPending}`);
    
    if (isUsed) {
      btn.disabled = true;
      btn.classList.add('skill-used');
    } else if (isPending) {
      btn.disabled = true;
      btn.classList.add('skill-pending');
    } else {
      btn.disabled = false;
      btn.classList.remove('skill-used', 'skill-pending');
    }
  });
}

// 初期スコア表示
updateScores();

// キャラクターカードを初期化
initCharacterCard();

// デコレーションカードを初期化
initDecorationCard();

// 音量調整機能
function initVolumeControl() {
  // スタート画面の音量調整
  const volumeSlider = document.getElementById('volume-slider');
  const volumeValue = document.getElementById('volume-value');
  
  if (volumeSlider && volumeValue) {
    // スライダーの値が変更されたときの処理
    volumeSlider.addEventListener('input', function() {
      const volume = this.value;
      bgmVolume = volume / 100; // 0-1の範囲に変換
      volumeValue.textContent = volume + '%';
      
      // ゲーム画面のBGMスライダーも同期
      const bgmSliderGame = document.getElementById('bgm-slider-game');
      const bgmValueGame = document.getElementById('bgm-value-game');
      if (bgmSliderGame && bgmValueGame) {
        bgmSliderGame.value = volume;
        bgmValueGame.textContent = volume + '%';
      }
      
      // BGMの音量を更新
      updateBGMVolume();
    });
    
    // スライダーをクリックしたときのイベント伝播を停止
    volumeSlider.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  // ゲーム画面のBGM音量調整
  const bgmSliderGame = document.getElementById('bgm-slider-game');
  const bgmValueGame = document.getElementById('bgm-value-game');
  
  if (bgmSliderGame && bgmValueGame) {
    // スライダーの値が変更されたときの処理
    bgmSliderGame.addEventListener('input', function() {
      const volume = this.value;
      bgmVolume = volume / 100; // 0-1の範囲に変換
      bgmValueGame.textContent = volume + '%';
      
      // スタート画面のスライダーも同期
      const startSlider = document.getElementById('volume-slider');
      const startValue = document.getElementById('volume-value');
      if (startSlider && startValue) {
        startSlider.value = volume;
        startValue.textContent = volume + '%';
      }
      
      // BGMの音量を更新
      updateBGMVolume();
    });
    
    // スライダーをクリックしたときのイベント伝播を停止
    bgmSliderGame.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  // ゲーム画面の効果音音量調整
  const sfxSliderGame = document.getElementById('sfx-slider-game');
  const sfxValueGame = document.getElementById('sfx-value-game');
  
  if (sfxSliderGame && sfxValueGame) {
    // スライダーの値が変更されたときの処理
    sfxSliderGame.addEventListener('input', function() {
      const volume = this.value;
      sfxVolume = volume / 100; // 0-1の範囲に変換
      sfxValueGame.textContent = volume + '%';
      
      // 効果音の音量を更新
      updateSFXVolume();
    });
    
    // スライダーをクリックしたときのイベント伝播を停止
    sfxSliderGame.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
}

// BGM音量を更新する関数
function updateBGMVolume() {
  if (bgmAudio) {
    bgmAudio.volume = bgmVolume;
  }
  if (gameBgmAudio) {
    gameBgmAudio.volume = bgmVolume;
  }
}

// 効果音音量を更新する関数
function updateSFXVolume() {
  // 効果音の音量を更新する処理
  // 効果音が再生されるときにsfxVolumeを使用する
}

// 音量バーの表示/非表示を切り替える関数
function toggleVolumeBar() {
  const volumeBarContainer = document.getElementById('volume-bar-container');
  const volumeIcon = document.getElementById('volume-icon');
  
  if (volumeBarContainer) {
    const isShowing = volumeBarContainer.classList.contains('show');
    
    if (isShowing) {
      volumeBarContainer.classList.remove('show');
      volumeIcon.classList.remove('active');
    } else {
      volumeBarContainer.classList.add('show');
      volumeIcon.classList.add('active');
    }
  }
}

// タブ切り替え関数
function switchTab(tabName) {
  // すべてのタブを非アクティブに
  const allTabs = document.querySelectorAll('.rule-tab');
  allTabs.forEach(tab => tab.classList.remove('active'));
  
  // すべてのタブコンテンツを非表示に
  const allContents = document.querySelectorAll('.tab-content');
  allContents.forEach(content => content.classList.remove('active'));
  
  // 選択されたタブをアクティブに
  if (tabName === 'howto') {
    document.querySelector('.rule-tab:first-child').classList.add('active');
    document.getElementById('howto-tab').classList.add('active');
  } else if (tabName === 'future') {
    document.querySelector('.rule-tab:last-child').classList.add('active');
    document.getElementById('future-tab').classList.add('active');
  }
}

// ホーム確認モーダルを表示する関数
function confirmGoHome() {
  const homeConfirmModal = document.getElementById('home-confirm-modal');
  if (homeConfirmModal) {
    homeConfirmModal.classList.add('show');
  }
}

// ホームに戻る関数
function goToHome() {
  // ホームページに遷移
  window.location.href = 'index.html';
}

// ホーム確認モーダルを閉じる関数
function closeHomeConfirm() {
  const homeConfirmModal = document.getElementById('home-confirm-modal');
  if (homeConfirmModal) {
    homeConfirmModal.classList.remove('show');
  }
}

// クレジットモーダルを表示する関数
function showCredits() {
  const creditModal = document.getElementById('credit-modal');
  if (creditModal) {
    creditModal.classList.add('show');
  }
}

// クレジットモーダルを非表示にする関数
function hideCredits() {
  const creditModal = document.getElementById('credit-modal');
  if (creditModal) {
    creditModal.classList.remove('show');
  }
}

// ルールモーダルの表示/非表示を切り替える関数
function toggleRules() {
  const ruleModal = document.getElementById('rule-modal');
  if (ruleModal) {
    ruleModal.classList.toggle('show');
  }
}

// 音量調整を初期化
initVolumeControl();

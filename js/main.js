
let soundOn = true;
let selectedTiles = [];
let tileData = [];  // Placeholder for actual tile data (to be loaded by layout)

function playSound(id) {
    if (!soundOn) return;
    const sound = document.getElementById(id);
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}

function toggleSound() {
    soundOn = !soundOn;
    document.getElementById('soundStatus').textContent = soundOn ? 'On' : 'Off';
    const bgm = document.getElementById('bgm');
    if (soundOn) {
        bgm.play();
    } else {
        bgm.pause();
    }
}

function restartGame() {
    selectedTiles = [];
    drawBoard();
    playSound('clickSound');
}

function shuffleBoard() {
    tileData = tileData.sort(() => Math.random() - 0.5);
    drawBoard();
    playSound('clickSound');
}

function changeLayout(layout) {
    tileData = getLayout(layout);
    drawBoard();
    playSound('clickSound');
}

function drawBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';
    tileData.forEach((tile, index) => {
        const div = document.createElement('div');
        div.className = 'tile';
        div.style.backgroundImage = `url('images/${tile.image}')`;
        div.dataset.id = index;
        div.dataset.symbol = tile.symbol;
        div.onclick = () => handleTileClick(div);
        board.appendChild(div);
    });
}

function handleTileClick(tileElement) {
    const tileId = tileElement.dataset.id;
    const symbol = tileElement.dataset.symbol;

    if (selectedTiles.includes(tileId)) return;

    tileElement.classList.add('selected');
    selectedTiles.push(tileId);

    if (selectedTiles.length === 2) {
        const [first, second] = selectedTiles;
        const tile1 = document.querySelector(`[data-id='${first}']`);
        const tile2 = document.querySelector(`[data-id='${second}']`);

        if (tile1.dataset.symbol === tile2.dataset.symbol) {
            playSound('matchSound');
            setTimeout(() => {
                tile1.style.visibility = 'hidden';
                tile2.style.visibility = 'hidden';
                checkWinCondition();
            }, 300);
        } else {
            playSound('errorSound');
            setTimeout(() => {
                tile1.classList.remove('selected');
                tile2.classList.remove('selected');
            }, 500);
        }
        selectedTiles = [];
    } else {
        playSound('clickSound');
    }
}

function checkWinCondition() {
    const visibleTiles = document.querySelectorAll('.tile:not([style*="hidden"])');
    if (visibleTiles.length === 0) {
        playSound('winSound');
        alert('You win!');
    }
}

// Auto-start background music
window.onload = () => {
    changeLayout('turtle');
    const bgm = document.getElementById('bgm');
    if (soundOn) {
        bgm.play().catch(() => {});
    }
};

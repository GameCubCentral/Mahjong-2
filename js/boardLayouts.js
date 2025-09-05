
function getLayout(name) {
    const tileSymbols = ['bamboo', 'circle', 'character', 'wind', 'dragon', 'flower', 'season'];
    const layout = [];

    switch(name) {
        case 'pyramid':
            for (let i = 0; i < 36; i++) {
                layout.push({ image: 'mahjong_smallscreen_classic.png', symbol: tileSymbols[i % tileSymbols.length] });
                layout.push({ image: 'mahjong_smallscreen_classic.png', symbol: tileSymbols[i % tileSymbols.length] });
            }
            break;
        case 'dragon':
            for (let i = 0; i < 30; i++) {
                layout.push({ image: 'mahjong_smallscreen_fruits.png', symbol: tileSymbols[i % tileSymbols.length] });
                layout.push({ image: 'mahjong_smallscreen_fruits.png', symbol: tileSymbols[i % tileSymbols.length] });
            }
            break;
        case 'turtle':
        default:
            for (let i = 0; i < 40; i++) {
                layout.push({ image: 'mahjong_smallscreen_classic.png', symbol: tileSymbols[i % tileSymbols.length] });
                layout.push({ image: 'mahjong_smallscreen_classic.png', symbol: tileSymbols[i % tileSymbols.length] });
            }
            break;
    }

    return layout.sort(() => Math.random() - 0.5); // Shuffle layout
}

// --- GAME STATE ---
let gameState = 'title'; // title, charSelect, practiceTargetSelect, assistSelect, difficultySelect, levelSelect, fight, finishHim, victory
let gameMode = 'cpu'; // cpu, practice
let titleCursor = 0; // 0 = Fight CPU, 1 = Practice
let practiceTargetCursor = 0; // 0 = Bag, 1 = Mannequin
let selectedPlayer = null;
let selectedCPU = null;
let selectedAssist = null;
let cpuAssistIndex = 0;
let charSelectCursor = 0;
let charSelectScroll = 0;
let charSelectMaxScroll = 0;
let charSelectLastCursor = -1;
let charSelectPerRow = 7; // updated by drawCharSelectScreen
let cpuSelectCursor = 1;
let selectingCPU = false;
let showLockedChars = false;
let assistCursor = 0;
let selectingCPUAssist = false;
let cpuAssistCursor = 0;
let difficultyCursor = 1; // default Normal

// Lottery animation state
let lotteryActive = false;
let lotteryTimer = 0;
let lotteryDuration = 90; // frames total
let lotteryCurrent = 0; // currently displayed index
let lotteryFinal = 0; // final chosen index
let lotteryType = ''; // 'char', 'cpu', 'assist', 'cpuAssist'
let lotteryCallback = null; // called when animation finishes
let cpuDifficulty = null;
let paused = false;
let winner = null;
let titlePulse = 0;
let shakeTimer = 0;
let shakeIntensity = 0;
let finishHimTimer = 0;
const FINISH_HIM_DURATION = 360; // 6 seconds at 60fps

const femaleCharacters = new Set(['TORRENA', 'CORVIDA', 'TELATRINE', 'KILLA WATT', 'VORTICE', 'ERICTHO']);

// Campaign state
let campaignId = null;        // 'brawler', etc.
let campaignFightIndex = 0;   // current fight (0-19)
let campaignSelectCursor = 0; // cursor on campaign select screen
let campaignSkipBuffer = '';  // buffer for IMPAL24 skip code


let frameCount = 0;

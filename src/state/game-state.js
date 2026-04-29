// --- GAME STATE ---
let gameState = 'title'; // title, charSelect, practiceTargetSelect, assistSelect, difficultySelect, levelSelect, fight, finishHim, victory
let gameMode = 'cpu'; // cpu, practice
let titleCursor = 0; // 0 = Fight CPU, 1 = Practice
let practiceTargetCursor = 0; // 0 = Bag, 1 = Mannequin, 2 = Drone, 3 = Practice Boss
let bossSelectCursor = 0;
let bossSelectScroll = 0;

// Boss unlock tracking — set to true when beaten in campaign
const defeatedBosses = {};
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

const femaleCharacters = new Set(['TORRENA', 'CORVIDA', 'TELATRINE', 'KILLA WATT', 'VORTICE', 'ERICTHO', 'SCALENA', 'DRYAD']);

// Campaign state
let campaignId = null;        // 'brawler', etc.
let campaignFightIndex = 0;   // current fight (0-19)
let campaignSelectCursor = 0; // cursor on campaign select screen
let campaignSkipBuffer = '';  // buffer for IMPAL24 skip code

// Test Your Might bonus state
let testYourMightActive = false;
let testYourMightTimer = 0;     // frames remaining
let testYourMightMaxTime = 0;   // total frames
let testYourMightDamage = 0;    // total damage dealt

// Printer Boss secret phase
let countDeathPhase = -1;   // -1=inactive, 0=bow, 1=hold, 2=burst, 3=fade
let countDeathTimer = 0;

let printerBossPhase = 0;      // 0=TYM fake, 1-3=text phases, 4=growth, 5=boss fight
let printerBossTimer = 0;      // timer for current phase
let printerBossInkSplats = []; // { x, y, w, h, alpha } screen coverage
let printerBossPapers = [];    // { x, y, vx, vy, rot, timer, hit }


let frameCount = 0;

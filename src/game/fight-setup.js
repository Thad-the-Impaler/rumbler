let campaignMusicOverride = null;

function startVersusScreen() {
  versusTimer = 0;
  gameState = 'versus';
  stopTitleMusic();
  // The Count always gets his theme, regardless of level
  if (selectedCPU && selectedCPU.isTheCount && !campaignMusicOverride) {
    campaignMusicOverride = 'THE COUNT';
  }
  const musicKey = campaignMusicOverride || (selectedLevel ? selectedLevel.name : 'CLASSIC');
  playFightMusic(musicKey);
  campaignMusicOverride = null;
}

function setupCampaignFight(index) {
  const campaign = campaigns[campaignId];

  // Infinite mode: generate a random fight
  let fight;
  if (campaign.infinite) {
    fight = generateRumblerFight(index);
    // Store it so victory screen can reference it
    campaign.fights[index] = fight;
  } else {
    fight = campaign.fights[index];
  }
  if (!fight) return;

  // Resolve opponent
  if (typeof fight.opponent === 'string') {
    selectedCPU = characters.find(c => c.name === fight.opponent)
      || secretCharOrder.find(c => c.name === fight.opponent);
  } else {
    selectedCPU = fight.opponent; // boss or special character object
  }

  // Resolve difficulty (case-insensitive)
  const fightDiff = fight.difficulty.toUpperCase();
  cpuDifficulty = difficulties.find(d => d.name === fightDiff) || difficulties[0];

  // Resolve level
  selectedLevel = defaultLevels.find(l => l.name === fight.level)
    || secretLevels.find(l => l.name === fight.level)
    || campaignLevels.find(l => l.name === fight.level)
    || defaultLevels[0];

  // Random CPU assist
  cpuAssistIndex = Math.floor(Math.random() * assists.length);

  // Set up bonus fight state
  if (fight.isBonus && fight.bonusType === 'testYourMight') {
    testYourMightActive = true;
    testYourMightMaxTime = fight.bonusTime * 60; // seconds to frames
    testYourMightTimer = testYourMightMaxTime;
    testYourMightDamage = 0;
  } else {
    testYourMightActive = false;
  }

  // Printer Boss secret phase
  if (fight.isPrinterBoss) {
    printerBossPhase = 0; // starts as TYM fake
    printerBossTimer = 0;
    printerBossInkSplats = [];
    printerBossPapers = [];
  } else {
    printerBossPhase = -1; // not a printer boss fight
  }

  // Music override for specific fights
  campaignMusicOverride = fight.music || null;

  startVersusScreen();
}

function startRumblePractice() {
  // Create fighters like a normal fight
  player = new Fighter(selectedPlayer, 250, 1, true, selectedAssist);
  cpu = new Fighter(selectedCPU, 710, -1, false, assists[cpuAssistIndex]);
  paused = false;
  shakeTimer = 0;
  resetRumbleState();
  // Restart fight music if not already playing (retry from victory screen)
  if (!currentFightMusic || currentFightMusic.paused) {
    const level = selectedLevel ? selectedLevel.name : 'CLASSIC';
    playFightMusic(level);
  }
  // Set player as winner, cpu health to 0
  winner = 'player';
  cpu.health = 0;
  // Clear hit effects on both fighters
  for (const f of [player, cpu]) {
    f.hitEffect = null;
    f.assistActive = null;
    f.queuedAttacks = [];
    f.inputBuffer = [];
    f.aiComboQueue = [];
  }
  // Go straight to finishHim
  finishHimTimer = 0;
  gameState = 'finishHim';
}

function startFight() {
  player = new Fighter(selectedPlayer, 250, 1, true, selectedAssist);
  cpu = new Fighter(selectedCPU, 710, -1, false, assists[cpuAssistIndex]);

  // Clear printer boss state from previous fights
  printerBossInkSplats = [];
  printerBossPapers = [];
  if (cpu.char.isPrinterBoss) {
    // Practice mode: skip cutscene, go straight to boss phase
    if (printerBossPhase === -1) printerBossPhase = 5;
  } else if (printerBossPhase !== 0) {
    // Not a printer boss fight (and not mid-campaign-cutscene): reset phase
    printerBossPhase = -1;
    printerBossTimer = 0;
  }

  // The Count on Brutal: upgrade to final version
  if (cpu.char.isTheCount && !cpu.char.isTheCountFinal && cpuDifficulty && cpuDifficulty.name === 'BRUTAL') {
    cpu.char = { ...cpu.char, isTheCountFinal: true, stats: { speed: 6.0, power: 1.5, defense: 1.3 } };
    cpu.health = 350;
    cpu.maxHealth = 350;
  }

  // Reset Count death phase
  countDeathPhase = -1;
  countDeathTimer = 0;

  gameState = 'fight';
  paused = false;
  winner = null;
  shakeTimer = 0;
  rumbleActive = false; rumbleTimer = 0; rumbleType = null;
  rumbleCodeBuffer = ''; rumbleAshes = null; rumbleLoserHidden = false; rumbleIceShards = [];
        rumbleAcidBlob = null; rumbleGoo = null; rumbleAcidSplashes = []; rumbleVenomMeltPct = 0; rumbleVenomDrips = [];
        rumbleLightBurst = null; rumbleLightParticles = []; rumbleZapActive = false;
        rumbleSinkhole = null; rumbleSinkProgress = 0; rumbleDirtParticles = [];
        rumbleShadePoof = false; rumbleSmokeParticles = []; rumbleShadeComboHit = 0; rumbleShadeBrush = false;
        rumbleBojdoPhase = 0; rumbleBojdoLaunchVy = 0;
        rumbleTetherAngle = 0; rumbleTetherSlams = 0; rumbleTetherCracked = false; rumbleTetherGrabX = 0;
        rumbleTorrenaPhase = 0; rumbleTorrenaCloudX = 0; rumbleTorrenaCloudY = 0; rumbleRaindrops = []; rumbleHailstone = null; rumbleHailCracked = false; rumbleHailShards = []; rumbleTorrenaEvapParticles = [];
        rumbleSnazzDiscoBall = null; rumbleSnazzConfetti = []; rumbleSnazzPunchLanded = false;
        rumbleHaystackRavens = []; rumbleHaystackScythe = false; rumbleHaystackStrike = false; rumbleHaystackDust = []; rumbleHaystackDiveStart = null;
        rumbleCodemaxLaser = false; rumbleCodemaxPixelLevel = 0; rumbleCodemaxGlitch = 0; rumbleCodemaxLaserParticles = [];
        rumbleCorvidaPhase = 0; rumbleCorvidaNestX = 0; rumbleCorvidaEggs = []; rumbleCorvidaGulpChick = -1;
        rumbleGolgarEntity2 = null; rumbleGolgarPhase = 0; rumbleGolgarLaunchVy = 0; rumbleGolgarOpX = 0;
        rumbleDryadPhase = 0; rumbleDryadVines = []; rumbleDryadSinkProgress = 0; rumbleDryadCracks = []; rumbleDryadLeaves = [];
        rumbleKavakPhase = 0; rumbleKavakGrabX = 0; rumbleKavakSlamX = 0; rumbleKavakPunchT = 0; rumbleKavakStuck = false; rumbleKavakDust = [];
        rumbleAetherPhase = 0; rumbleAetherChainT = 0; rumbleAetherLaserT = 0; rumbleAetherCharFade = 1;
        rumbleAetherFireballs = []; rumbleAetherImpacts = []; rumbleAetherSmoke = []; rumbleAetherSparks = [];
        if (player) { player.rubberArmReach = 0; player._hideFrontArm = false; player._hideBackArm = false; player._rumbleRotation = 0; }
        if (cpu) { cpu.rubberArmReach = 0; cpu._hideFrontArm = false; cpu._hideBackArm = false; cpu._rumbleRotation = 0; }
        if (player) { player._brushArmT = undefined; player._rumbleAlpha = undefined; }
        if (cpu) { cpu._brushArmT = undefined; cpu._rumbleAlpha = undefined; }
}


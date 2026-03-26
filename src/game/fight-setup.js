function startVersusScreen() {
  versusTimer = 0;
  gameState = 'versus';
  stopTitleMusic();
  const level = selectedLevel ? selectedLevel.name : 'CLASSIC';
  playFightMusic(level);
}

function setupCampaignFight(index) {
  const campaign = campaigns[campaignId];
  const fight = campaign.fights[index];
  if (!fight) return;

  // Resolve opponent
  if (typeof fight.opponent === 'string') {
    selectedCPU = characters.find(c => c.name === fight.opponent)
      || secretCharOrder.find(c => c.name === fight.opponent);
  } else {
    selectedCPU = fight.opponent; // boss character object
  }

  // Resolve difficulty
  cpuDifficulty = difficulties.find(d => d.name === fight.difficulty) || difficulties[0];

  // Resolve level
  selectedLevel = defaultLevels.find(l => l.name === fight.level)
    || secretLevels.find(l => l.name === fight.level)
    || defaultLevels[0];

  // Random CPU assist
  cpuAssistIndex = Math.floor(Math.random() * assists.length);

  startVersusScreen();
}

function startRumblePractice() {
  // Create fighters like a normal fight
  player = new Fighter(selectedPlayer, 250, 1, true, selectedAssist);
  cpu = new Fighter(selectedCPU, 710, -1, false, assists[cpuAssistIndex]);
  paused = false;
  shakeTimer = 0;
  resetRumbleState();
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
        if (player) { player.rubberArmReach = 0; player._hideFrontArm = false; player._hideBackArm = false; player._rumbleRotation = 0; }
        if (cpu) { cpu.rubberArmReach = 0; cpu._hideFrontArm = false; cpu._hideBackArm = false; cpu._rumbleRotation = 0; }
        if (player) { player._brushArmT = undefined; player._rumbleAlpha = undefined; }
        if (cpu) { cpu._brushArmT = undefined; cpu._rumbleAlpha = undefined; }
}


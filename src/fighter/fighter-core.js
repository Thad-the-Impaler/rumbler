class Fighter {
  constructor(charData, x, facing, isPlayer, assistData) {
    this.char = charData;
    this.x = x;
    this.y = 380;
    this.groundY = 380;
    this.facing = facing; // 1 = right, -1 = left
    this.isPlayer = isPlayer;
    this.vx = 0;
    this.vy = 0;
    this.health = 150;
    this.maxHealth = 150;
    this.practiceRegenDelay = 0; // frames until regen starts
    this.width = 50;
    this.height = 90;

    // State
    this.state = 'idle'; // idle, walk, attack, hitstun, blockstun, launched, crouching
    this.stateTimer = 0;
    this.currentAttack = null;
    this.attackFrame = 0;
    this.blocking = false;
    this.crouching = false;
    this.grounded = true;
    this.comboCount = 0;
    this.comboTimer = 0;

    // Animation
    this.animFrame = 0;
    this.animTimer = 0;
    this.flashTimer = 0;
    this.hitEffect = null;

    // Assist
    this.assist = assistData;
    this.assistCooldown = 0;
    this.assistActive = null;

    // Combo system
    this.inputBuffer = [];        // simple list of attack type strings
    this.lastInputFrame = 0;     // frame of last input
    this.comboWindowFrames = 180; // frames before buffer resets from inactivity
    this.queuedAttacks = [];     // queued attacks to execute in order
    this.pendingCombo = null;
    this.comboFlash = 0;
    this.comboNameDisplay = null;
    this.comboNameTimer = 0;

    // Status effects
    this.dotEffect = null;       // { ticksRemaining, tickDamage, tickInterval, tickTimer, color }
    this.frozenTimer = 0;
    this.slowTimer = 0;
    this.armorActive = false;
    this.armorTimer = 0;
    this.phaseTimer = 0;
    this.chainHits = null;       // { remaining, damage, timer, interval }
    this.teleportGhost = null;   // { x, y, timer }

    // Rubberman stretch tracking
    this.rubberStretch = 0;
    this.rubberArmReach = 0;
    this.rubberLegReach = 0;

    // Torrena water phase
    this.waterPhase = false;

    // Codemax swap
    this.swapCooldown = 0;
    this.glitchTimer = 0; // visual glitch effect after swap

    // Haystack explosion
    this.exploding = false;
    this.reformTimer = 0;
    this.reformMaxFrames = 60; // 1 second at 60fps
    this.haystackProjectiles = []; // { x, y, vx, vy, type: 'arrow'|'sword', hit: false, timer }
    this.hayParticles = []; // visual hay bits during explosion

    // Snazz McJazz dance
    this.dancing = false;
    this.danceTimer = 0;
    this.danceMaxFrames = 120; // 2 seconds at 60fps

    // Golgar twin entities
    this.golgarEntity = 1; // which entity is active (1 or 2)
    this.golgarOtherX = x + facing * 40; // dormant entity position
    this.golgarOtherY = 380;
    this.golgarOtherFacing = facing;

    // Duplaire clones
    this.duplaireClones = [];
    this.duplaireMaxClones = this.char.isDarkDuplaire ? 4 : 6;
    this.duplaireOrigHealth = this.maxHealth; // original body's section health
    this._isCloneDraw = false;
    this._cloneAlpha = 1;

    // Buck firework spray
    this.buckFiring = false;
    this.buckFireTimer = 0;
    this.buckFireCooldown = 0;
    this.buckFireworks = []; // active firework projectiles
    this.buckExplosions = []; // explosion particles

    // Exor soul drain
    this.exorDraining = false;
    this.exorDrainTimer = 0;
    this.exorDrainCooldown = 0;
    this.exorDrainTarget = null;
    this.exorSoulParticles = []; // visual wisps flowing from target to Exor

    // Backtrack rewind
    this.btHistory = new Array(480); // ring buffer of { x, y, health } snapshots
    this.btHistoryIdx = 0; // current write position
    this.btHistoryLen = 0; // how many entries are filled
    this.btRewindCooldown = 0;
    this.btRewindEffect = 0; // visual effect timer
    this.btMaxHistory = 480; // 8 seconds at 60fps

    // Killa Watt zap
    this.kwZapCooldown = 0;
    this.kwZapEffect = null; // { target, timer, bolts }
    this.kwStunTimer = 0; // vibration when stunned by zap

    // Matador dash-slash
    this.matadorDashing = false;
    this.matadorDashTimer = 0;
    this.matadorDashFrames = 0;
    this.matadorDashCooldown = 0;
    this.matadorDashHit = false;
    this.matadorDashStartX = 0;
    this.matadorDashEndX = 0;
    this.matadorRoses = []; // decorative rose particles

    // Paletap shockwave
    this.paletapShockwave = null; // { x, y, vx, timer, maxTimer }
    this.paletapShockCooldown = 0;
    this.paletapSlamming = false;
    this.paletapSlamFrame = 0;

    // Batsch tortoise form
    this.isTortoise = false;
    this.lastCrouchPress = 0; // frame of last crouch press for double-tap detection
    this.batschCrouchPending = false;

    // Gourmand consume
    this.mouthOpen = false;
    this.gourmandEnergy = 0; // absorbed damage stored
    this.gourmandMaxEnergy = 80; // max before full
    this.gourmandFull = false; // can't move when full
    this.gourmandProjectile = null; // { x, y, vx, vy, damage, timer }

    // Bozollok molt
    this.molting = false; // currently in molt leap
    this.moltHover = 0; // hover frames remaining
    this.moltDescending = false; // descending with claw attack
    this.moltCooldown = 0;
    this.moltHusk = null; // { x, y, timer } decomposing husk

    // Corvida blue jay form
    this.isJay = false;
    this.lastJumpPress = 0; // frame of last jump key down for double-tap detection
    this.corvidaJayPending = false;
    this.jayScale = 0.7; // smaller in jay form

    // Bojdo scale system
    this.bojdoScale = 1.0; // 1.0 = normal, grows/shrinks with K/L
    this.bojdoShifting = false;
    this.bojShrinkTimer = 0; // Boj assist shrink effect
    this.cyanoJayTimer = 0; // Cyano assist jay form effect
    this.studTortoiseTimer = 0; // Stud assist tortoise form effect
    this.stickerSlowTimer = 0; // Sticker assist slow effect

    // X-haust oil & ignite
    this.xhaustOilTank = 0; // current oil amount (fills from combos)
    this.xhaustMaxOil = 100; // tank capacity
    this.xhaustLeaking = false; // currently dripping oil
    this.xhaustOilPuddles = []; // { x, y, width } placed on ground
    this.xhaustFlames = []; // { x, y, timer, width } active fire bursts

    // Vortice tornado
    this.vorticeTornado = false; // is pull tornado active (H held)
    this.vorticePushing = false; // is push tornado active (J pressed)
    this.vorticePushTimer = 0; // how long push lasts
    this.vorticeTornadoParticles = []; // visual wind particles
    this.vorticePushCooldown = 0; // J push cooldown

    // Dryad walls — { x, growT, maxGrowT, w, h, health, maxHealth, flashTimer, seed: { y } }
    this.dryadWalls = [];

    // Kavak punch flurry + secret dash
    this.kavakFlurry = null; // { hitsLeft, hitsTotal, hitTimer, hitInterval }
    this.kavakFlurryCooldown = 0;
    this.kavakDash = null;   // { startX, endX, frames, frame, hit }
    this.kavakDashCooldown = 0;
    this.kavakDashLeftPending = false;
    this.kavakDashRightPending = false;
    this.kavakLastLeftPress = -100;  // sentinel: no prior press
    this.kavakLastRightPress = -100;

    // Aether laser charge
    this.aetherCharging = false;
    this.aetherChargeT = 0;
    this.aetherMaxCharge = 90;       // 1.5s for full charge
    this.aetherCooldown = 0;
    this.aetherLaser = null;         // { fireT, maxFireT, charge, beamY, dir }

    // CPU AI
    this.aiTimer = 0;
    this.aiAction = null;
    this.aiReactTime = 20 + Math.random() * 20;
    this.aiComboQueue = [];

    // Quellic boss state
    if (this.char.isQuellic) {
      this.quellicFirePhase = false;     // currently in fire phase
      this.quellicFireTimer = 0;         // frames remaining in fire phase (max 390 = 6.5s)
      this.quellicFireCooldown = 0;      // cooldown frames before next fire phase
      this.quellicFireMaxDuration = 390; // 6.5 seconds at 60fps
      this.quellicFireCooldownMax = 540; // 9 seconds at 60fps
      this.quellicContactCooldown = 0;   // prevent damage every single frame
      this.health = 190;
      this.maxHealth = 190;
    }

    // Erictho boss state
    if (this.char.isErictho) {
      this.ericthoPortal = null;       // active portal { x, y, timer, phase } phase: 'enter','hidden','exit'
      this.ericthoPortalCooldown = 90; // start with short cooldown
      this.ericthoHidden = false;      // true when inside portal
      this.ericthoHiddenTimer = 0;     // frames spent hidden
      this.ericthoExitChosen = false;  // whether exit location has been picked
      this.health = 180;
      this.maxHealth = 180;
    }

    // Bojdobojdobojdo boss state
    if (this.char.isBojdo3) {
      this.health = 250;
      this.maxHealth = 250;
    }

    // The Count boss state
    if (this.char.isTheCount) {
      this.countFireworks = [];           // active firework projectiles
      this.countExplosions = [];          // explosion particles
      this.countFiring = false;           // firing sweep active
      this.countFireTimer = 0;
      this.countFireCooldown = 0;
      this.countGroundCooldown = 0;       // cooldown between ground firework shots
      this.countJumpExplosionUsed = false; // one explosion per jump
      this.health = this.char.maxHealth || 220;
      this.maxHealth = this.health;
    }

    // Relapmi boss state
    if (this.char.isRelapmi) {
      this.relapmiSpears = [];            // ground spears { x, y, timer, emergeT, hit }
      this.relapmiSpearCooldown = 0;      // cooldown between ground spear summons
      this.relapmiShank = null;           // directional spear from body { angle, timer, length, hit }
      this.relapmiShankCooldown = 0;      // cooldown between shanks
      this.relapmiSpikeRing = null;       // { spikes: [{x,y,angle,dist}], timer }
      this.relapmiSpikeRingCooldown = 0;  // cooldown between spike rings
      this.health = this.char.maxHealth || 250;
      this.maxHealth = this.health;
    }

    // Six Iron-Nine Iron boss state
    if (this.char.isSixIron) {
      this.sixIronClubSwinging = false;   // club swing attack active
      this.sixIronClubTimer = 0;          // swing animation timer
      this.sixIronClubCooldown = 0;       // cooldown between swings
      this.sixIronGolfBalls = [];         // active golf ball projectiles
      this.sixIronGolfCooldown = 0;       // cooldown between shots
      this.sixIronLasso = null;           // active lasso { x, y, vx, timer, pulling }
      this.sixIronLassoCooldown = 0;      // cooldown between lasso throws
      this.sixIronLassoPulling = false;   // currently pulling opponent
      this.sixIronLassoPullTimer = 0;
      // Six Driver enhancements
      this.sixDriverGroundHoles = [];     // { x, timer, fired }
      this.sixDriverHoleCooldown = 0;
      this.health = this.char.maxHealth || 210;
      this.maxHealth = this.health;
    }

    // Birdeater boss state
    if (this.char.isBirdeater) {
      this.birdeaterLegPhase = 0;          // walk animation phase
      this.birdeaterTailStriking = false;   // tail attack active
      this.birdeaterTailTimer = 0;          // tail strike animation timer
      this.birdeaterTailCooldown = 0;       // cooldown between tail strikes
      this.birdeaterLegCrushCooldown = 0;   // cooldown between leg crush damage
      this.birdeaterJumping = false;        // boss jump over player
      this.birdeaterJumpVy = 0;
      this.birdeaterJumpCooldown = 0;
      // Maneater enhancements
      this.maneaterHovering = false;
      this.maneaterHoverTimer = 0;
      this.health = this.char.maxHealth || 230;
      this.maxHealth = this.health;
    }

    // Twins boss state
    if (this.char.isTwins) {
      this.health = this.char.maxHealth || 220;
      this.maxHealth = this.health;
      // Selene (the twin) — independent position and state
      this.twin = {
        x: this.x + 100,
        y: this.y,
        facing: -1,
        grounded: true,
        vy: 0, vx: 0,
        state: 'idle',
        stateTimer: 0,
        animTimer: 0, animFrame: 0,
        flashTimer: 0,
        // AI state
        aiTimer: 0,
        aiAction: 'idle',
        // Arrow
        arrows: [],
        arrowCooldown: 60
      };
      // Helios arrows
      this.twinsArrows = [];
      this.twinsArrowCooldown = 60;
    }

    // Hangman boss state
    if (this.char.isHangman) {
      this.hangmanDisassembled = false;   // true when pieces are flying
      this.hangmanPieces = [];            // flying pieces: { type, x, y, vx, vy, landed }
      this.hangmanTargetX = 0;            // where to reassemble
      this.hangmanDisCooldown = 120;      // cooldown between disassembles
      this.hangmanPieceIndex = 0;         // which piece to launch next
      this.hangmanLaunchTimer = 0;        // frames between piece launches
      this.hangmanHidden = false;         // true while body is disassembled
      this.health = this.char.maxHealth || 200;
      this.maxHealth = this.health;
    }

    // Canis boss state
    if (this.char.isCanis) {
      this.isWolf = false;          // wolf form active
      this.wolfPouncing = false;    // mid-pounce
      this.wolfPounceCooldown = 0;
      this.wolfFormTimer = 0;       // frames spent in wolf form
      this.wolfFormMaxTime = 420;   // 7 seconds max in wolf form
      this.wolfCooldown = 0;        // cooldown before transforming again
      this.health = this.char.maxHealth || 210;
      this.maxHealth = this.health;
    }

    // Dark Bojdo boss state
    if (this.char.isDarkBojdo) {
      this.bojdoScale = 1.0;
      this.bojdoShifting = false;
      this.darkBojdoHudScale = 1.0;    // current HUD distortion scale
      this.darkBojdoHudTarget = 1.0;   // target HUD scale
      this.darkBojdoHudTimer = 0;      // timer for HUD distortion
      this.health = this.char.maxHealth || 220;
      this.maxHealth = this.health;
    }

    // Head boss state
    if (this.char.isHead) {
      this.headRotation = 0;         // current rotation angle
      this.headSpitCooldown = 0;     // cooldown between spits
      this.headSpitProjectiles = []; // { x, y, vx, vy, hit, timer }
      this.headCharging = false;     // charging up for roll
      this.headChargeTimer = 0;      // charge-up frames
      this.headRolling = false;      // fast rolling across screen
      this.headRollSpeed = 0;        // current roll speed
      this.headRollCooldown = 0;     // cooldown between charges
      this.health = this.char.maxHealth || 300;
      this.maxHealth = this.health;
    }

    // Orcus boss state
    if (this.char.isOrcus) {
      // Soul drain (same system as Exor)
      this.exorDraining = false;
      this.exorDrainTimer = 0;
      this.exorDrainCooldown = 0;
      this.exorDrainTarget = null;
      this.exorSoulParticles = [];
      // Green lightning
      this.orcusLightning = [];        // active lightning strikes { x, timer, bolts }
      this.orcusLightningCooldown = 0;
      // Spirits
      this.orcusSpirits = [];          // { x, y, vx, vy, hp, stolenHP, phase, returning }
      this.orcusSpiritCooldown = 0;
      this.health = this.char.maxHealth || 240;
      this.maxHealth = this.health;
    }

    // Tube Warden boss state
    if (this.char.isTubeWarden) {
      this.twTubes = [];            // active tube projectiles { x, y, vx, vy, stuck, stuckTimer, exploded }
      this.twTubeCooldown = 0;      // cooldown between tube shots
      this.twGasClouds = [];        // gas clouds { x, y, timer, radius }
      this.twGasCooldown = 0;       // cooldown between gas sprays
      this.health = this.char.maxHealth || 220;
      this.maxHealth = this.health;
    }

    // Scalena boss state
    if (this.char.isScalena) {
      this.scalenaNeckExtend = 0;       // 0-1, how far neck is extended
      this.scalenaBiting = false;        // true during bite attack
      this.scalenaBiteTimer = 0;         // frames of bite animation
      this.scalenaBiteCooldown = 0;      // cooldown between bites
      this.scalenaSnakes = [];           // array of active snakes { x, y, vx, vy, timer, biteCooldown }
      this.scalenaSnakeCooldown = 0;     // cooldown between snake summons
      this.health = this.char.maxHealth || 200;
      this.maxHealth = this.health;
    }

    // Borgus boss state
    if (this.char.isBorgus) {
      this.borgusLaser = null;        // active laser projectile { x, y, vx, timer, hit }
      this.borgusLaserCooldown = 60;  // start with short cooldown
      this.borgusSlamCooldown = 0;
      this.borgusLaserCharging = 0;   // charge-up frames before firing
      this.health = 200;              // bosses have more HP
      this.maxHealth = 200;
    }
  }

  get left() { return this.x - this.width / 2; }
  get right() { return this.x + this.width / 2; }
  get top() { return this.y - this.height; }
  get centerY() { return this.y - this.height / 2; }

}

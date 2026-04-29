// Rumble (fatality) state
let rumbleActive = false;
let rumbleTimer = 0;
let rumbleType = null;
let rumbleSubType = null; // specific rumble code when character has multiple rumbles
let rumbleCodeBuffer = '';
let rumbleAshes = null;
let rumbleLoserHidden = false;
let rumbleIceShards = [];
let rumbleAcidBlob = null;
let rumbleGoo = null;
let rumbleAcidSplashes = [];
let rumbleVenomMeltPct = 0; // 0-1 melt progress for clipping the loser
let rumbleVenomDrips = []; // drips falling off the body during melt
let rumbleLightBurst = null; // { x, y, timer } explosion of light
let rumbleLightParticles = []; // beautiful light particles
let rumbleZapActive = false; // electricity beam active
let rumbleSinkhole = null; // { x, y, radius, maxRadius, depth } sinkhole state
let rumbleSinkProgress = 0; // 0-1 how far the opponent has sunk
let rumbleDirtParticles = []; // dirt/debris flying out of sinkhole
let rumbleShadePoof = false; // opponent turned to smoke
let rumbleSmokeParticles = []; // smoke puff particles
let rumbleShadeComboHit = 0; // which hit in the combo we're on
let rumbleShadeBrush = false; // Shade brushing shoulder
let rumbleBojdoPhase = 0;
let rumbleBojdoLaunchVy = 0;
let rumbleTetherAngle = 0; // current swing angle for Tetherball
let rumbleTetherSlams = 0; // number of slams done
let rumbleTetherCracked = false; // final smash done
let rumbleTetherGrabX = 0; // where Rubberman's arm reaches to
let rumbleTorrenaPhase = 0; // 0=water, 1=evaporate, 2=cloud, 3=rain, 4=hailstone, 5=done
let rumbleTorrenaCloudX = 0; // cloud position
let rumbleTorrenaCloudY = 0;
let rumbleRaindrops = []; // rain particles
let rumbleHailstone = null; // { x, y, vy, size }
let rumbleHailCracked = false; // hailstone has shattered on impact
let rumbleSnazzDiscoBall = null; // { y, targetY } disco ball descending
let rumbleHaystackRavens = []; // raven positions { x, y, wingPhase }
let rumbleHaystackScythe = false; // scythe has been drawn
let rumbleHaystackStrike = false; // scythe strike connected
let rumbleHaystackDust = []; // dust particles from dissolved opponent
let rumbleHaystackDiveStart = null; // { x, y } stored at start of dive
let rumbleCodemaxLaser = false; // laser is firing
let rumbleCodemaxPixelLevel = 0; // 0=none, 1-4 = progressively worse pixelation
let rumbleCodemaxGlitch = 0; // glitch-out timer
let rumbleCodemaxLaserParticles = []; // pixelated laser trail particles
let rumbleCorvidaPhase = 0; // animation phase
let rumbleCorvidaNestX = 0; // nest position
let rumbleCorvidaEggs = []; // { x, y, hatched }
let rumbleCorvidaGulpChick = -1; // which chick ate the opponent (-1 = none)
let rumbleGolgarEntity2 = null; // { x, y, facing } second entity position
let rumbleGolgarPhase = 0;
let rumbleGolgarLaunchVy = 0; // opponent launch velocity
let rumbleGolgarOpX = 0; // stored opponent X at start
let rumbleTelatrinePhase = 0;
let rumbleTelatrineShrug = 0; // shrug animation timer
let rumbleDuplairePhase = 0;
let rumbleDuplaireClones = []; // clones dropping from ceiling { x, y, vx, vy, facing, landed }
let rumbleDuplairePileClones = []; // clones leaping in from offscreen
let rumbleDuplaireZoom = 0; // 0=fight stage, 1=Earth view
let rumbleDuplaireEarthDots = []; // cyan dots on Earth { angle, dist, size }
let rumbleDuplaireStars = []; // background stars { x, y, size, alpha }
let rumbleBozollokPhase = 0;
let rumbleBozollokSwarm = []; // insect particles { x, y, vx, vy, angle, size }
let rumbleBozollokSkeleton = null; // { x, groundY, collapseT }
let rumbleGourmandPhase = 0; // 0=pickup, 1=drop in pan, 2=toss, 3=plate, 4=leaf, 5=tongue, 6=swallow, 7=hold
let rumbleGourmandPanX = 0; // pan center X
let rumbleGourmandPanY = 0; // pan center Y
let rumbleGourmandTossAngle = 0; // opponent toss rotation
let rumbleGourmandTossCount = 0; // number of tosses
let rumbleGourmandToppings = []; // { x, y, type, vy, landed }
let rumbleGourmandSauces = []; // { x, y, color, drizzleT }
let rumbleGourmandPlateX = 0;
let rumbleGourmandLeafPlaced = false;
let rumbleGourmandTongueT = 0; // 0-1 tongue extension progress
let rumbleGourmandSwallowT = 0; // 0-1 swallow progress
let rumbleBatschPhase = 0; // 0=enter shell, 1=spin up, 2=ricochet, 3=launch, 4=pop out, 5=hold
let rumbleBatschShellX = 0;
let rumbleBatschShellY = 0;
let rumbleBatschShellVx = 0;
let rumbleBatschShellVy = 0;
let rumbleBatschSpinAngle = 0;
let rumbleBatschPopTimer = 0;
let rumbleBatschSpinSpeed = 0; // radians per frame
let rumbleBatschHits = 0; // ricochet hits landed
let rumbleBatschSparks = []; // impact spark particles { x, y, vx, vy, life }
let rumbleBatschTrail = []; // motion blur trail { x, y, alpha }
let rumbleBatschLaunchVy = 0; // opponent launch velocity
let rumbleBatschLastHitFrame = 0; // frame of last hit (for cooldown)
let rumbleXhaustPhase = 0; // 0=spray, 1=drenched walk, 2=ignite, 3=explosion, 4=hold
let rumbleXhaustOilDrops = []; // { x, y, vy }
let rumbleXhaustFlames = []; // { x, y, vx, vy, size, timer }
let rumbleXhaustDrenched = false;

let rumbleVorticePhase = 0; // 0=summon, 1=suck in, 2=spin, 3=fling, 4=crack, 5=hold
let rumbleVorticeAngle = 0; // opponent orbit angle
let rumbleVorticeSpeed = 0; // spin speed
let rumbleVorticeRadius = 0; // orbit radius
let rumbleVorticeTornadoR = 0; // tornado visual radius
let rumbleVorticeFlingX = 0; // flung opponent position
let rumbleVorticeFlingY = 0;
let rumbleVorticeFlingVx = 0;
let rumbleVorticeFlingVy = 0;
let rumbleVorticeCrackSide = ''; // which edge cracked
let rumbleVorticeCracks = []; // pre-generated crack lines
let rumbleVorticeDebris = []; // crack debris particles

let rumbleBuckPhase = 0; // 0=flex+fireworks, 1=eagles+flags, 2=bomber, 3=explosion, 4=hold
let rumbleBuckFireworks = []; // { x, y, vx, vy, color, timer, trail }
let rumbleBuckEagles = []; // { x, y, vx, flagTrail }
let rumbleBuckExplosions = []; // { x, y, vx, vy, color, timer, text }
let rumbleBuckBomberX = 0;
let rumbleBuckMissileY = -50;
let rumbleBuckMissileDropped = false;

let rumbleExorPhase = 0; // 0=walk, 1=punch, 2=soul flies out, 3=absorb, 4=crumble, 5=hold
let rumbleExorSoulX = 0;
let rumbleExorSoulY = 0;
let rumbleExorSoulAlpha = 1;
let rumbleExorCrumbleT = 0;

let rumbleBacktrackPhase = 0; // 0=rewind effect, 1=shrinking, 2=baby, 3=run+punt, 4=hold
let rumbleBacktrackShrink = 1.0; // opponent scale (1.0 → 0.4)
let rumbleBacktrackBabyY = 0; // baby launch Y velocity
let rumbleBacktrackBabyX = 0; // baby X position
let rumbleBacktrackBabyVy = 0;

let rumbleKillaWattPhase = 0; // 0=strike, 1=electrocute, 2=skeleton reveal, 3=collapse, 4=hold
let rumbleKillaWattBolts = []; // lightning bolt paths
let rumbleKillaWattSkeleton = null; // { x, groundY, collapseT }

let rumbleMatadorPhase = 0; // 0=walk+cape, 1=bull rush, 2=trample, 3=hold
let rumbleMatadorBullX = 0; // bull position
let rumbleMatadorBullSpeed = 0;
let rumbleMatadorDust = []; // dust particles from bull

let rumblePaletapPhase = 0; // 0=walk, 1=slam fist, 2=vibrate, 3=disassemble, 4=hold
let rumblePaletapVibrate = 0; // vibration intensity (ramps up)
let rumblePaletapParts = []; // disassembled body parts { type, x, y, vy, rot, rotSpeed }

let rumbleDryadPhase = 0;        // 0=windup, 1=sprout, 2=wrap, 3=sink, 4=settle
let rumbleDryadVines = [];       // [{ baseAngle, length, sway, swayPhase, thickness, leafSeed }]
let rumbleDryadSinkProgress = 0; // 0..1
let rumbleDryadCracks = [];      // ground crack lines around opponent { angle, length, jitterSeed }
let rumbleDryadLeaves = [];      // { x, y, vx, vy, rot, rotSpeed, color, size, timer }

let rumbleKavakPhase = 0;        // 0=approach, 1=grab, 2=lift, 3=punch1, 4=punch2, 5=slamWind, 6=slam, 7=stuck
let rumbleKavakGrabX = 0;        // x position where Kavak ends up after approach
let rumbleKavakSlamX = 0;        // x where opponent gets buried
let rumbleKavakPunchT = 0;       // 0..1 punch animation progress
let rumbleKavakStuck = false;    // opponent buried face-first
let rumbleKavakDust = [];        // { x, y, vx, vy, alpha, size }

let rumbleAetherPhase = 0;          // 0=chains, 1=charge, 2=barrage, 3=fade, 4=ash
let rumbleAetherChainT = 0;         // 0..1 chain emergence
let rumbleAetherLaserT = 0;         // 0..1 laser intensity
let rumbleAetherCharFade = 1;       // opponent alpha during disintegration
let rumbleAetherFireballs = [];     // { x, y, vx, vy, size, timer }
let rumbleAetherImpacts = [];       // { x, y, timer, size }
let rumbleAetherSmoke = [];         // { x, y, vx, vy, alpha, size }
let rumbleAetherSparks = [];        // { x, y, vx, vy, alpha }

let rumbleSnazzConfetti = []; // confetti particles
let rumbleSnazzPunchLanded = false; // final punch connected
let rumbleHailShards = []; // ice shards from hailstone cracking
let rumbleTorrenaEvapParticles = []; // evaporation steam particles

function resetRumbleState() {
  rumbleActive = false; rumbleTimer = 0; rumbleType = null; rumbleSubType = null;
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
  rumbleTelatrinePhase = 0; rumbleTelatrineShrug = 0;
  rumbleDuplairePhase = 0; rumbleDuplaireClones = []; rumbleDuplairePileClones = [];
  rumbleDuplaireZoom = 0; rumbleDuplaireEarthDots = []; rumbleDuplaireStars = [];
  rumbleBozollokPhase = 0; rumbleBozollokSwarm = []; rumbleBozollokSkeleton = null;
  rumbleGourmandPhase = 0; rumbleGourmandPanX = 0; rumbleGourmandPanY = 0;
  rumbleGourmandTossAngle = 0; rumbleGourmandTossCount = 0;
  rumbleGourmandToppings = []; rumbleGourmandSauces = [];
  rumbleGourmandPlateX = 0; rumbleGourmandLeafPlaced = false;
  rumbleGourmandTongueT = 0; rumbleGourmandSwallowT = 0;
  rumbleBatschPhase = 0; rumbleBatschShellX = 0; rumbleBatschShellY = 0;
  rumbleBatschShellVx = 0; rumbleBatschShellVy = 0; rumbleBatschSpinAngle = 0; rumbleBatschPopTimer = 0;
  rumbleBatschSpinSpeed = 0; rumbleBatschHits = 0; rumbleBatschSparks = [];
  rumbleBatschTrail = []; rumbleBatschLaunchVy = 0; rumbleBatschLastHitFrame = 0;
  rumbleXhaustPhase = 0; rumbleXhaustOilDrops = []; rumbleXhaustFlames = []; rumbleXhaustDrenched = false;
  rumbleVorticePhase = 0; rumbleVorticeAngle = 0; rumbleVorticeSpeed = 0; rumbleVorticeRadius = 0;
  rumbleVorticeTornadoR = 0; rumbleVorticeFlingX = 0; rumbleVorticeFlingY = 0;
  rumbleVorticeFlingVx = 0; rumbleVorticeFlingVy = 0; rumbleVorticeCrackSide = ''; rumbleVorticeCracks = []; rumbleVorticeDebris = [];
  rumbleBuckPhase = 0; rumbleBuckFireworks = []; rumbleBuckEagles = []; rumbleBuckExplosions = [];
  rumbleBuckBomberX = 0; rumbleBuckMissileY = -50; rumbleBuckMissileDropped = false;
  rumbleExorPhase = 0; rumbleExorSoulX = 0; rumbleExorSoulY = 0; rumbleExorSoulAlpha = 1; rumbleExorCrumbleT = 0;
  rumbleBacktrackPhase = 0; rumbleBacktrackShrink = 1.0; rumbleBacktrackBabyY = 0; rumbleBacktrackBabyX = 0; rumbleBacktrackBabyVy = 0;
  rumbleKillaWattPhase = 0; rumbleKillaWattBolts = []; rumbleKillaWattSkeleton = null;
  rumbleMatadorPhase = 0; rumbleMatadorBullX = 0; rumbleMatadorBullSpeed = 0; rumbleMatadorDust = [];
  rumblePaletapPhase = 0; rumblePaletapVibrate = 0; rumblePaletapParts = [];
  rumbleDryadPhase = 0; rumbleDryadVines = []; rumbleDryadSinkProgress = 0; rumbleDryadCracks = []; rumbleDryadLeaves = [];
  rumbleKavakPhase = 0; rumbleKavakGrabX = 0; rumbleKavakSlamX = 0; rumbleKavakPunchT = 0; rumbleKavakStuck = false; rumbleKavakDust = [];
  rumbleAetherPhase = 0; rumbleAetherChainT = 0; rumbleAetherLaserT = 0; rumbleAetherCharFade = 1;
  rumbleAetherFireballs = []; rumbleAetherImpacts = []; rumbleAetherSmoke = []; rumbleAetherSparks = [];
}

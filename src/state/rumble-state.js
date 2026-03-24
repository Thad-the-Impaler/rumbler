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
}

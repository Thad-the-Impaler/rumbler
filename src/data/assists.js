const assists = [
  { name: 'PYRA', color: '#ff4500', accent: '#ff7b4f', type: 'Fireball', damage: 12, cooldownTime: 300, desc: 'Ranged fire blast' },
  { name: 'GLACIUS', color: '#00bfff', accent: '#7fdbff', type: 'Ice Slam', damage: 18, cooldownTime: 420, desc: 'Heavy ice strike' },
  { name: 'BOLT', color: '#ffd700', accent: '#fff176', type: 'Thunder', damage: 10, cooldownTime: 200, desc: 'Quick lightning' },
  { name: 'GRIM', color: '#8b008b', accent: '#da70d6', type: 'Shadow', damage: 15, cooldownTime: 360, desc: 'Dark energy wave' }
];

const weedthornAssist = { name: 'WEEDTHORN', color: '#2d8a4e', accent: '#5ee87a', type: 'Ground Thorn', damage: 14, cooldownTime: 340, desc: 'Thorns erupt from below', isWeedthorn: true };
const bojAssist = { name: 'BOJ', color: '#22aa22', accent: '#66ff66', type: 'Shrink Shot', damage: 8, cooldownTime: 360, desc: 'Shrinks opponent to 0.3x for 6s', isBoj: true };
const jazzAssist = { name: 'THE JAZZ', color: '#e6a800', accent: '#ffe066', type: 'Healing Note', damage: 6, cooldownTime: 300, desc: 'Heals player on hit', isJazz: true };
const cyanoAssist = { name: 'CYANO', color: '#4488cc', accent: '#88ccff', type: 'Jay Curse', damage: 5, cooldownTime: 400, desc: 'Turns opponent into a bird for 8s', isCyano: true };
const warperAssist = { name: 'WARPER', color: '#9933cc', accent: '#cc88ff', type: 'Warp Shot', damage: 12, cooldownTime: 320, desc: 'Attacks from behind', isWarper: true };
const aphidAssist = { name: 'APHID', color: '#555555', accent: '#aaaaaa', type: 'Dive Bomb', damage: 10, cooldownTime: 280, desc: 'Drops on foe from above', isAphid: true };
const studAssist = { name: 'STUD', color: '#6b5a3a', accent: '#c4a55a', type: 'Shell Curse', damage: 5, cooldownTime: 400, desc: 'Turns opponent into a tortoise for 8s', isStud: true };
const floatAssist = { name: 'FLOAT', color: '#ff99cc', accent: '#ffccee', type: 'Arc Lob', damage: 11, cooldownTime: 300, desc: 'Arcing shot through the air', isFloat: true };
const stickerAssist = { name: 'STICKER', color: '#cc8800', accent: '#ffbb33', type: 'Glue Trap', damage: 4, cooldownTime: 350, desc: 'Slows opponent for 8s', isSticker: true };
const serpentAssist = { name: 'SERPENT', color: '#336633', accent: '#66cc66', type: 'Homing Snake', damage: 5, cooldownTime: 480, desc: 'Snake hunts opponent for 10s', isSerpent: true };

// Fixed order for secret assists (after base assists)
const secretAssistOrder = [weedthornAssist, bojAssist, jazzAssist, cyanoAssist, warperAssist, aphidAssist, studAssist, floatAssist, stickerAssist, serpentAssist];
function insertAssistOrdered(assist) {
  const orderIdx = secretAssistOrder.indexOf(assist);
  for (let i = 0; i < assists.length; i++) {
    const ci = secretAssistOrder.indexOf(assists[i]);
    if (ci >= 0 && ci > orderIdx) {
      assists.splice(i, 0, assist);
      return;
    }
  }
  assists.push(assist);
}

function activateMasterPasskey() {
  if (!bojdoUnlocked) { bojdoUnlocked = true; insertCharOrdered(bojdoChar); }
  if (!bojdobojdoUnlocked) {
    bojdobojdoUnlocked = true;
    bojdoChar.name = 'BOJDOBOJDO';
    bojdoChar.desc = 'ULTIMATE SIZE SHIFTER';
    bojdoChar.accent = '#ff4400';
  }
  if (!rubbermanUnlocked) { rubbermanUnlocked = true; insertCharOrdered(rubbermanChar); }
  if (!torrenaUnlocked) { torrenaUnlocked = true; insertCharOrdered(torrenaChar); }
  if (!snazzUnlocked) { snazzUnlocked = true; insertCharOrdered(snazzChar); }
  if (!haystackUnlocked) { haystackUnlocked = true; insertCharOrdered(haystackChar); }
  if (!codemaxUnlocked) { codemaxUnlocked = true; insertCharOrdered(codemaxChar); }
  if (!corvidaUnlocked) { corvidaUnlocked = true; insertCharOrdered(corvidaChar); }
  if (!golgarUnlocked) { golgarUnlocked = true; insertCharOrdered(golgarChar); }
  if (!telatrineUnlocked) { telatrineUnlocked = true; insertCharOrdered(telatrineChar); }
  if (!duplaireUnlocked) { duplaireUnlocked = true; insertCharOrdered(duplaireChar); }
  if (!bozollokUnlocked) { bozollokUnlocked = true; insertCharOrdered(bozollokChar); }
  if (!gourmandUnlocked) { gourmandUnlocked = true; insertCharOrdered(gourmandChar); }
  if (!batschUnlocked) { batschUnlocked = true; insertCharOrdered(batschChar); }
  if (!paletapUnlocked) { paletapUnlocked = true; insertCharOrdered(paletapChar); }
  if (!matadorUnlocked) { matadorUnlocked = true; insertCharOrdered(matadorChar); }
  if (!killawattUnlocked) { killawattUnlocked = true; insertCharOrdered(killawattChar); }
  if (!backtrackUnlocked) { backtrackUnlocked = true; insertCharOrdered(backtrackChar); }
  if (!exorUnlocked) { exorUnlocked = true; insertCharOrdered(exorChar); }
  if (!buckUnlocked) { buckUnlocked = true; insertCharOrdered(buckChar); }
  if (!vorticeUnlocked) { vorticeUnlocked = true; insertCharOrdered(vorticeChar); }
  if (!xhaustUnlocked) { xhaustUnlocked = true; insertCharOrdered(xhaustChar); }
  if (!weedthornUnlocked) { weedthornUnlocked = true; insertAssistOrdered(weedthornAssist); }
  if (!bojAssistUnlocked) { bojAssistUnlocked = true; insertAssistOrdered(bojAssist); }
  if (!jazzAssistUnlocked) { jazzAssistUnlocked = true; insertAssistOrdered(jazzAssist); }
  if (!cyanoAssistUnlocked) { cyanoAssistUnlocked = true; insertAssistOrdered(cyanoAssist); }
  if (!warperAssistUnlocked) { warperAssistUnlocked = true; insertAssistOrdered(warperAssist); }
  if (!aphidAssistUnlocked) { aphidAssistUnlocked = true; insertAssistOrdered(aphidAssist); }
  if (!studAssistUnlocked) { studAssistUnlocked = true; insertAssistOrdered(studAssist); }
  if (!floatAssistUnlocked) { floatAssistUnlocked = true; insertAssistOrdered(floatAssist); }
  if (!stickerAssistUnlocked) { stickerAssistUnlocked = true; insertAssistOrdered(stickerAssist); }
  if (!serpentAssistUnlocked) { serpentAssistUnlocked = true; insertAssistOrdered(serpentAssist); }
  if (!snowyCityUnlocked) { snowyCityUnlocked = true; }
  if (!foggyCityUnlocked) { foggyCityUnlocked = true; }
  if (!rainyCityUnlocked) { rainyCityUnlocked = true; }
  if (!glowingCityUnlocked) { glowingCityUnlocked = true; }
  if (!sunnyCityUnlocked) { sunnyCityUnlocked = true; }
  rumblePracticeUnlocked = true;
  masterUnlockFlash = 60;
}

function isMasterPasskeyNeeded() {
  return !bojdoUnlocked || !bojdobojdoUnlocked || !rubbermanUnlocked || !torrenaUnlocked || !snazzUnlocked || !haystackUnlocked || !codemaxUnlocked || !corvidaUnlocked || !golgarUnlocked || !telatrineUnlocked || !duplaireUnlocked || !bozollokUnlocked || !gourmandUnlocked || !batschUnlocked || !paletapUnlocked || !matadorUnlocked || !killawattUnlocked || !backtrackUnlocked || !exorUnlocked || !buckUnlocked || !vorticeUnlocked || !xhaustUnlocked || !weedthornUnlocked || !bojAssistUnlocked || !jazzAssistUnlocked || !cyanoAssistUnlocked || !warperAssistUnlocked || !aphidAssistUnlocked || !studAssistUnlocked || !floatAssistUnlocked || !stickerAssistUnlocked || !serpentAssistUnlocked || !snowyCityUnlocked || !foggyCityUnlocked || !rainyCityUnlocked || !glowingCityUnlocked || !sunnyCityUnlocked;
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 960;
canvas.height = 540;

// Preloaded icon images
const iconImages = {};
const artikIconImg = new Image();
artikIconImg.onload = function() { iconImages['ARTIK'] = artikIconImg; };
artikIconImg.src = 'data:image/png;base64,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';
iconImages['ARTIK'] = artikIconImg;

// Preload portrait icons for versus screen (base64 embedded)
// [Extracted to data/assets.js]

// [Extracted to state/game-state.js]
// [Extracted to state/rumble-state.js]
// [Extracted to state/unlock-state.js]

// [Extracted to fighter/]

// --- INPUT ---
const keys = {};
window.addEventListener('wheel', e => {
  if (gameState === 'charSelect') {
    charSelectScroll = Math.max(0, Math.min(charSelectMaxScroll, charSelectScroll + e.deltaY * 0.5));
    e.preventDefault();
  }
}, { passive: false });

window.addEventListener('keydown', e => {
  keys[e.key] = true;
  handleKeyPress(e.key);
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','Tab'].includes(e.key)) e.preventDefault();
});
window.addEventListener('keyup', e => { keys[e.key] = false; });
// Start title music on any user interaction (click or key)
window.addEventListener('click', () => {
  const menuState = gameState === 'title' || gameState === 'charSelect' || gameState === 'practiceTargetSelect' || gameState === 'assistSelect' || gameState === 'difficultySelect' || gameState === 'levelSelect';
  if (menuState && titleMusic.paused) playTitleMusic();
});

function handleKeyPress(key) {
  // Keep title music playing during menu screens
  const menuState = gameState === 'title' || gameState === 'charSelect' || gameState === 'practiceTargetSelect' || gameState === 'assistSelect' || gameState === 'difficultySelect' || gameState === 'levelSelect';
  if (menuState && titleMusic.paused) {
    playTitleMusic();
  }
  switch (gameState) {
    case 'title': {
      const titleOptionCount = rumblePracticeUnlocked ? 3 : 2;
      if (key === 'ArrowUp' || key === 'w' || key === 'W') titleCursor = (titleCursor - 1 + titleOptionCount) % titleOptionCount;
      if (key === 'ArrowDown' || key === 's' || key === 'S') titleCursor = (titleCursor + 1) % titleOptionCount;
      if (key === 'Enter' || key === ' ') {
        if (titleCursor === 0) {
          gameMode = 'cpu';
        } else if (titleCursor === 1) {
          gameMode = 'practice';
        } else {
          gameMode = 'rumblePractice';
        }
        gameState = 'charSelect';
        charSelectCursor = 0;
        cpuSelectCursor = 1;
        charSelectScroll = 0;
        selectingCPU = false;
      }
      break;
    }

    case 'charSelect': {
      // Toggle locked character display
      if (key === 'Tab') {
        showLockedChars = !showLockedChars;
        charSelectScroll = 0;
      }
      // Secret code: type b0jd0 to unlock Bojdo, type again for Bojdobojdo
      if (!bojdoUnlocked || !bojdobojdoUnlocked) {
        bojdoCodeBuffer += key;
        if (bojdoCodeBuffer.length > 10) bojdoCodeBuffer = bojdoCodeBuffer.slice(-10);
        if (bojdoCodeBuffer.includes('b0jd0')) {
          bojdoCodeBuffer = '';
          if (!bojdoUnlocked) {
            bojdoUnlocked = true;
            insertCharOrdered(bojdoChar);
            bojdoUnlockFlash = 60;
            charSelectCursor = characters.length - 1;
          } else if (!bojdobojdoUnlocked) {
            bojdobojdoUnlocked = true;
            bojdoChar.name = 'BOJDOBOJDO';
            bojdoChar.desc = 'ULTIMATE SIZE SHIFTER';
            bojdoChar.accent = '#ff4400';
            bojdoUnlockFlash = 60;
            // Jump to Bojdobojdo
            charSelectCursor = characters.indexOf(bojdoChar);
          }
        }
      }
      // Secret code: type rubbr to unlock Rubberman
      if (!rubbermanUnlocked) {
        rubbermanCodeBuffer += key.toLowerCase();
        if (rubbermanCodeBuffer.length > 10) rubbermanCodeBuffer = rubbermanCodeBuffer.slice(-10);
        if (rubbermanCodeBuffer.includes('rubbr')) {
          rubbermanCodeBuffer = '';
          rubbermanUnlocked = true;
          insertCharOrdered(rubbermanChar);
          rubbermanUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type fl00d to unlock Torrena
      if (!torrenaUnlocked) {
        torrenaCodeBuffer += key.toLowerCase();
        if (torrenaCodeBuffer.length > 10) torrenaCodeBuffer = torrenaCodeBuffer.slice(-10);
        if (torrenaCodeBuffer.includes('fl00d')) {
          torrenaCodeBuffer = '';
          torrenaUnlocked = true;
          insertCharOrdered(torrenaChar);
          torrenaUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type 5na22 to unlock Snazz McJazz
      if (!snazzUnlocked) {
        snazzCodeBuffer += key.toLowerCase();
        if (snazzCodeBuffer.length > 10) snazzCodeBuffer = snazzCodeBuffer.slice(-10);
        if (snazzCodeBuffer.includes('5na22')) {
          snazzCodeBuffer = '';
          snazzUnlocked = true;
          insertCharOrdered(snazzChar);
          snazzUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type dumm1 to unlock Haystack
      if (!haystackUnlocked) {
        haystackCodeBuffer += key.toLowerCase();
        if (haystackCodeBuffer.length > 10) haystackCodeBuffer = haystackCodeBuffer.slice(-10);
        if (haystackCodeBuffer.includes('dumm1')) {
          haystackCodeBuffer = '';
          haystackUnlocked = true;
          insertCharOrdered(haystackChar);
          haystackUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type 404er to unlock Codemax
      if (!codemaxUnlocked) {
        codemaxCodeBuffer += key.toLowerCase();
        if (codemaxCodeBuffer.length > 10) codemaxCodeBuffer = codemaxCodeBuffer.slice(-10);
        if (codemaxCodeBuffer.includes('404er')) {
          codemaxCodeBuffer = '';
          codemaxUnlocked = true;
          insertCharOrdered(codemaxChar);
          codemaxUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type v0id1 to unlock Telatrine
      if (!telatrineUnlocked) {
        telatrineCodeBuffer += key.toLowerCase();
        if (telatrineCodeBuffer.length > 10) telatrineCodeBuffer = telatrineCodeBuffer.slice(-10);
        if (telatrineCodeBuffer.includes('v0id1')) {
          telatrineCodeBuffer = '';
          telatrineUnlocked = true;
          insertCharOrdered(telatrineChar);
          telatrineUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type g0yl3 to unlock Golgar
      if (!golgarUnlocked) {
        golgarCodeBuffer += key.toLowerCase();
        if (golgarCodeBuffer.length > 10) golgarCodeBuffer = golgarCodeBuffer.slice(-10);
        if (golgarCodeBuffer.includes('g0yl3')) {
          golgarCodeBuffer = '';
          golgarUnlocked = true;
          insertCharOrdered(golgarChar);
          golgarUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type f3thr to unlock Corvida
      if (!corvidaUnlocked) {
        corvidaCodeBuffer += key.toLowerCase();
        if (corvidaCodeBuffer.length > 10) corvidaCodeBuffer = corvidaCodeBuffer.slice(-10);
        if (corvidaCodeBuffer.includes('f3thr')) {
          corvidaCodeBuffer = '';
          corvidaUnlocked = true;
          insertCharOrdered(corvidaChar);
          corvidaUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type mult1 to unlock Duplaire
      if (!duplaireUnlocked) {
        duplaireCodeBuffer += key.toLowerCase();
        if (duplaireCodeBuffer.length > 10) duplaireCodeBuffer = duplaireCodeBuffer.slice(-10);
        if (duplaireCodeBuffer.includes('mult1')) {
          duplaireCodeBuffer = '';
          duplaireUnlocked = true;
          insertCharOrdered(duplaireChar);
          duplaireUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type m0ltr to unlock Bozollok
      if (!bozollokUnlocked) {
        bozollokCodeBuffer += key.toLowerCase();
        if (bozollokCodeBuffer.length > 10) bozollokCodeBuffer = bozollokCodeBuffer.slice(-10);
        if (bozollokCodeBuffer.includes('m0ltr')) {
          bozollokCodeBuffer = '';
          bozollokUnlocked = true;
          insertCharOrdered(bozollokChar);
          bozollokUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type fea5t to unlock Gourmand
      if (!gourmandUnlocked) {
        gourmandCodeBuffer += key.toLowerCase();
        if (gourmandCodeBuffer.length > 10) gourmandCodeBuffer = gourmandCodeBuffer.slice(-10);
        if (gourmandCodeBuffer.includes('fea5t')) {
          gourmandCodeBuffer = '';
          gourmandUnlocked = true;
          insertCharOrdered(gourmandChar);
          gourmandUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type sh3ll to unlock Batsch
      if (!batschUnlocked) {
        batschCodeBuffer += key.toLowerCase();
        if (batschCodeBuffer.length > 10) batschCodeBuffer = batschCodeBuffer.slice(-10);
        if (batschCodeBuffer.includes('sh3ll')) {
          batschCodeBuffer = '';
          batschUnlocked = true;
          insertCharOrdered(batschChar);
          batschUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type r8ttl to unlock Paletap
      if (!paletapUnlocked) {
        paletapCodeBuffer += key.toLowerCase();
        if (paletapCodeBuffer.length > 10) paletapCodeBuffer = paletapCodeBuffer.slice(-10);
        if (paletapCodeBuffer.includes('r8ttl')) {
          paletapCodeBuffer = '';
          paletapUnlocked = true;
          insertCharOrdered(paletapChar);
          paletapUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      if (!matadorUnlocked) {
        matadorCodeBuffer += key.toUpperCase();
        if (matadorCodeBuffer.length > 10) matadorCodeBuffer = matadorCodeBuffer.slice(-10);
        if (matadorCodeBuffer.includes('8LFTR')) {
          matadorCodeBuffer = '';
          matadorUnlocked = true;
          insertCharOrdered(matadorChar);
          matadorUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type V0LTG to unlock Killa Watt
      if (!killawattUnlocked) {
        killawattCodeBuffer += key.toUpperCase();
        if (killawattCodeBuffer.length > 10) killawattCodeBuffer = killawattCodeBuffer.slice(-10);
        if (killawattCodeBuffer.includes('V0LTG')) {
          killawattCodeBuffer = '';
          killawattUnlocked = true;
          insertCharOrdered(killawattChar);
          killawattUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type R3WND to unlock Backtrack
      if (!backtrackUnlocked) {
        backtrackCodeBuffer += key.toUpperCase();
        if (backtrackCodeBuffer.length > 10) backtrackCodeBuffer = backtrackCodeBuffer.slice(-10);
        if (backtrackCodeBuffer.includes('R3WND')) {
          backtrackCodeBuffer = '';
          backtrackUnlocked = true;
          insertCharOrdered(backtrackChar);
          backtrackUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type 2R3AP to unlock Exor
      if (!exorUnlocked) {
        exorCodeBuffer += key.toUpperCase();
        if (exorCodeBuffer.length > 10) exorCodeBuffer = exorCodeBuffer.slice(-10);
        if (exorCodeBuffer.includes('2R3AP')) {
          exorCodeBuffer = '';
          exorUnlocked = true;
          insertCharOrdered(exorChar);
          exorUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type 07/04 to unlock Buck
      if (!buckUnlocked) {
        buckCodeBuffer += key;
        if (buckCodeBuffer.length > 10) buckCodeBuffer = buckCodeBuffer.slice(-10);
        if (buckCodeBuffer.includes('07/04')) {
          buckCodeBuffer = '';
          buckUnlocked = true;
          insertCharOrdered(buckChar);
          buckUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type WH1RL to unlock Vortice
      if (!vorticeUnlocked) {
        vorticeCodeBuffer += key.toUpperCase();
        if (vorticeCodeBuffer.length > 10) vorticeCodeBuffer = vorticeCodeBuffer.slice(-10);
        if (vorticeCodeBuffer.includes('WH1RL')) {
          vorticeCodeBuffer = '';
          vorticeUnlocked = true;
          insertCharOrdered(vorticeChar);
          vorticeUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type D1ESL to unlock X-haust
      if (!xhaustUnlocked) {
        xhaustCodeBuffer += key.toUpperCase();
        if (xhaustCodeBuffer.length > 10) xhaustCodeBuffer = xhaustCodeBuffer.slice(-10);
        if (xhaustCodeBuffer.includes('D1ESL')) {
          xhaustCodeBuffer = '';
          xhaustUnlocked = true;
          insertCharOrdered(xhaustChar);
          xhaustUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Master passkey: type imp11 to unlock all secrets
      if (isMasterPasskeyNeeded()) {
        masterCodeBuffer += key.toLowerCase();
        if (masterCodeBuffer.length > 20) masterCodeBuffer = masterCodeBuffer.slice(-20);
        if (masterCodeBuffer.includes('imp11')) {
          masterCodeBuffer = '';
          activateMasterPasskey();
          charSelectCursor = characters.length - 1;
          charSelectScroll = 0;
        }
      }
      const charSlots = characters.length + 1; // +1 for RANDOM
      const csPerRow = charSelectPerRow;
      if (!selectingCPU) {
        if (key === 'ArrowLeft' || key === 'a') charSelectCursor = (charSelectCursor - 1 + charSlots) % charSlots;
        if (key === 'ArrowRight' || key === 'd') charSelectCursor = (charSelectCursor + 1) % charSlots;
        if (key === 'ArrowUp' || key === 'w') {
          const newIdx = charSelectCursor - csPerRow;
          charSelectCursor = newIdx >= 0 ? newIdx : Math.min(charSelectCursor + (Math.ceil(charSlots / csPerRow) - 1) * csPerRow, charSlots - 1);
        }
        if (key === 'ArrowDown' || key === 's') {
          const newIdx = charSelectCursor + csPerRow;
          charSelectCursor = newIdx < charSlots ? newIdx : charSelectCursor % csPerRow;
        }
        if ((key === 'Enter' || key === ' ') && !lotteryActive) {
          if (charSelectCursor >= characters.length) {
            // Random - start lottery
            lotteryFinal = Math.floor(Math.random() * characters.length);
            lotteryCurrent = 0;
            lotteryTimer = 0;
            lotteryDuration = 90;
            lotteryType = 'char';
            lotteryActive = true;
            lotteryCallback = () => {
              selectedPlayer = characters[lotteryFinal];
              charSelectCursor = lotteryFinal;
              if (gameMode === 'rumblePractice') {
                selectedCPU = drone;
                selectedAssist = assists[0];
                cpuAssistIndex = 0;
                gameState = 'levelSelect';
              } else if (gameMode === 'practice') {
                gameState = 'practiceTargetSelect';
                practiceTargetCursor = 0;
              } else {
                selectingCPU = true;
                cpuSelectCursor = (charSelectCursor + 1) % charSlots;
              }
            };
          } else {
            selectedPlayer = characters[charSelectCursor];
            if (gameMode === 'rumblePractice') {
              selectedCPU = drone;
              selectedAssist = assists[0];
              cpuAssistIndex = 0;
              gameState = 'levelSelect';
            } else if (gameMode === 'practice') {
              gameState = 'practiceTargetSelect';
              practiceTargetCursor = 0;
            } else {
              selectingCPU = true;
              cpuSelectCursor = (charSelectCursor + 1) % charSlots;
            }
          }
        }
        if (key === 'Escape' || key === 'Backspace') {
          gameState = 'title';
        }
      } else {
        if (key === 'ArrowLeft' || key === 'a') cpuSelectCursor = (cpuSelectCursor - 1 + charSlots) % charSlots;
        if (key === 'ArrowRight' || key === 'd') cpuSelectCursor = (cpuSelectCursor + 1) % charSlots;
        if (key === 'ArrowUp' || key === 'w') {
          const newIdx = cpuSelectCursor - csPerRow;
          cpuSelectCursor = newIdx >= 0 ? newIdx : Math.min(cpuSelectCursor + (Math.ceil(charSlots / csPerRow) - 1) * csPerRow, charSlots - 1);
        }
        if (key === 'ArrowDown' || key === 's') {
          const newIdx = cpuSelectCursor + csPerRow;
          cpuSelectCursor = newIdx < charSlots ? newIdx : cpuSelectCursor % csPerRow;
        }
        if ((key === 'Enter' || key === ' ') && !lotteryActive) {
          if (cpuSelectCursor >= characters.length) {
            lotteryFinal = Math.floor(Math.random() * characters.length);
            lotteryCurrent = 0;
            lotteryTimer = 0;
            lotteryDuration = 90;
            lotteryType = 'cpu';
            lotteryActive = true;
            lotteryCallback = () => {
              selectedCPU = characters[lotteryFinal];
              gameState = 'assistSelect';
              assistCursor = 0;
              selectingCPUAssist = false;
            };
          } else {
            selectedCPU = characters[cpuSelectCursor];
            gameState = 'assistSelect';
            assistCursor = 0;
            selectingCPUAssist = false;
          }
        }
        if (key === 'Escape' || key === 'Backspace') {
          selectingCPU = false;
        }
      }
      break;
    }

    case 'practiceTargetSelect': {
      const numTargets = 3;
      if (key === 'ArrowLeft' || key === 'a' || key === 'ArrowUp' || key === 'w') practiceTargetCursor = (practiceTargetCursor - 1 + numTargets) % numTargets;
      if (key === 'ArrowRight' || key === 'd' || key === 'ArrowDown' || key === 's') practiceTargetCursor = (practiceTargetCursor + 1) % numTargets;
      if (key === 'Enter' || key === ' ') {
        selectedCPU = [punchingBag, mannequin, drone][practiceTargetCursor];
        gameState = 'assistSelect';
        assistCursor = 0;
        selectingCPUAssist = false;
      }
      if (key === 'Escape' || key === 'Backspace') {
        gameState = 'charSelect';
        charSelectScroll = 0;
      }
      break;
    }

    case 'assistSelect': {
      const assistSlots = assists.length + 1; // +1 for RANDOM
      if (!selectingCPUAssist) {
        if (key === 'ArrowLeft' || key === 'a') assistCursor = (assistCursor - 1 + assistSlots) % assistSlots;
        if (key === 'ArrowRight' || key === 'd') assistCursor = (assistCursor + 1) % assistSlots;
        if ((key === 'Enter' || key === ' ') && !lotteryActive) {
          if (assistCursor >= assists.length) {
            lotteryFinal = Math.floor(Math.random() * assists.length);
            lotteryCurrent = 0;
            lotteryTimer = 0;
            lotteryDuration = 90;
            lotteryType = 'assist';
            lotteryActive = true;
            lotteryCallback = () => {
              selectedAssist = assists[lotteryFinal];
              if (gameMode === 'practice') {
                cpuAssistIndex = Math.floor(Math.random() * assists.length);
                levelSelectCursor = 0;
                gameState = 'levelSelect';
              } else {
                selectingCPUAssist = true;
                cpuAssistCursor = 0;
              }
            };
          } else {
            selectedAssist = assists[assistCursor];
            if (gameMode === 'practice') {
              cpuAssistIndex = Math.floor(Math.random() * assists.length);
              levelSelectCursor = 0;
              gameState = 'levelSelect';
            } else {
              selectingCPUAssist = true;
              cpuAssistCursor = 0;
            }
          }
        }
        if (key === 'Escape' || key === 'Backspace') {
          if (gameMode === 'practice') {
            gameState = 'practiceTargetSelect';
            practiceTargetCursor = 0;
          } else {
            gameState = 'charSelect';
            charSelectScroll = 0;
            selectingCPU = true;
          }
        }
      } else {
        if (key === 'ArrowLeft' || key === 'a') cpuAssistCursor = (cpuAssistCursor - 1 + assistSlots) % assistSlots;
        if (key === 'ArrowRight' || key === 'd') cpuAssistCursor = (cpuAssistCursor + 1) % assistSlots;
        if ((key === 'Enter' || key === ' ') && !lotteryActive) {
          if (cpuAssistCursor >= assists.length) {
            lotteryFinal = Math.floor(Math.random() * assists.length);
            lotteryCurrent = 0;
            lotteryTimer = 0;
            lotteryDuration = 90;
            lotteryType = 'cpuAssist';
            lotteryActive = true;
            lotteryCallback = () => {
              cpuAssistIndex = lotteryFinal;
              gameState = 'difficultySelect';
            };
          } else {
            cpuAssistIndex = cpuAssistCursor;
            gameState = 'difficultySelect';
          }
        }
        if (key === 'Escape' || key === 'Backspace') {
          selectingCPUAssist = false;
        }
      }

      // Weedthorn unlock code: RTH
      if (!weedthornUnlocked && key.length === 1) {
        weedthornCodeBuffer += key.toUpperCase();
        if (weedthornCodeBuffer.length > 3) weedthornCodeBuffer = weedthornCodeBuffer.slice(-3);
        if (weedthornCodeBuffer === 'RTH') {
          weedthornUnlocked = true;
          insertAssistOrdered(weedthornAssist);
          weedthornUnlockFlash = 60;
        }
      }
      // Boj unlock code: B0J
      if (!bojAssistUnlocked && key.length === 1) {
        bojAssistCodeBuffer += key.toUpperCase();
        if (bojAssistCodeBuffer.length > 3) bojAssistCodeBuffer = bojAssistCodeBuffer.slice(-3);
        if (bojAssistCodeBuffer === 'B0J') {
          bojAssistUnlocked = true;
          insertAssistOrdered(bojAssist);
          bojAssistUnlockFlash = 60;
        }
      }
      // The Jazz unlock code: WKA
      if (!jazzAssistUnlocked && key.length === 1) {
        jazzAssistCodeBuffer += key.toUpperCase();
        if (jazzAssistCodeBuffer.length > 3) jazzAssistCodeBuffer = jazzAssistCodeBuffer.slice(-3);
        if (jazzAssistCodeBuffer === 'WKA') {
          jazzAssistUnlocked = true;
          insertAssistOrdered(jazzAssist);
          jazzAssistUnlockFlash = 60;
        }
      }
      // Cyano unlock code: JAY
      if (!cyanoAssistUnlocked && key.length === 1) {
        cyanoAssistCodeBuffer += key.toUpperCase();
        if (cyanoAssistCodeBuffer.length > 3) cyanoAssistCodeBuffer = cyanoAssistCodeBuffer.slice(-3);
        if (cyanoAssistCodeBuffer === 'JAY') {
          cyanoAssistUnlocked = true;
          insertAssistOrdered(cyanoAssist);
          cyanoAssistUnlockFlash = 60;
        }
      }
      // Warper unlock code: PAC
      if (!warperAssistUnlocked && key.length === 1) {
        warperAssistCodeBuffer += key.toUpperCase();
        if (warperAssistCodeBuffer.length > 3) warperAssistCodeBuffer = warperAssistCodeBuffer.slice(-3);
        if (warperAssistCodeBuffer === 'PAC') {
          warperAssistUnlocked = true;
          insertAssistOrdered(warperAssist);
          warperAssistUnlockFlash = 60;
        }
      }
      // Aphid unlock code: FLY
      if (!aphidAssistUnlocked && key.length === 1) {
        aphidAssistCodeBuffer += key.toUpperCase();
        if (aphidAssistCodeBuffer.length > 3) aphidAssistCodeBuffer = aphidAssistCodeBuffer.slice(-3);
        if (aphidAssistCodeBuffer === 'FLY') {
          aphidAssistUnlocked = true;
          insertAssistOrdered(aphidAssist);
          aphidAssistUnlockFlash = 60;
        }
      }
      // Stud unlock code: TOR
      if (!studAssistUnlocked && key.length === 1) {
        studAssistCodeBuffer += key.toUpperCase();
        if (studAssistCodeBuffer.length > 3) studAssistCodeBuffer = studAssistCodeBuffer.slice(-3);
        if (studAssistCodeBuffer === 'TOR') {
          studAssistUnlocked = true;
          insertAssistOrdered(studAssist);
          studAssistUnlockFlash = 60;
        }
      }
      // Float unlock code: SFT
      if (!floatAssistUnlocked && key.length === 1) {
        floatAssistCodeBuffer += key.toUpperCase();
        if (floatAssistCodeBuffer.length > 3) floatAssistCodeBuffer = floatAssistCodeBuffer.slice(-3);
        if (floatAssistCodeBuffer === 'SFT') {
          floatAssistUnlocked = true;
          insertAssistOrdered(floatAssist);
          floatAssistUnlockFlash = 60;
        }
      }
      // Sticker unlock code: GLU
      if (!stickerAssistUnlocked && key.length === 1) {
        stickerAssistCodeBuffer += key.toUpperCase();
        if (stickerAssistCodeBuffer.length > 3) stickerAssistCodeBuffer = stickerAssistCodeBuffer.slice(-3);
        if (stickerAssistCodeBuffer === 'GLU') {
          stickerAssistUnlocked = true;
          insertAssistOrdered(stickerAssist);
          stickerAssistUnlockFlash = 60;
        }
      }
      // Serpent unlock code: SNK
      if (!serpentAssistUnlocked && key.length === 1) {
        serpentAssistCodeBuffer += key.toUpperCase();
        if (serpentAssistCodeBuffer.length > 3) serpentAssistCodeBuffer = serpentAssistCodeBuffer.slice(-3);
        if (serpentAssistCodeBuffer === 'SNK') {
          serpentAssistUnlocked = true;
          insertAssistOrdered(serpentAssist);
          serpentAssistUnlockFlash = 60;
        }
      }
      // Master passkey: type imp11 to unlock all secrets
      if (isMasterPasskeyNeeded()) {
        masterCodeBuffer += key.toLowerCase();
        if (masterCodeBuffer.length > 20) masterCodeBuffer = masterCodeBuffer.slice(-20);
        if (masterCodeBuffer.includes('imp11')) {
          masterCodeBuffer = '';
          activateMasterPasskey();
        }
      }
      break;
    }

    case 'difficultySelect':
      if (key === 'ArrowLeft' || key === 'a') difficultyCursor = (difficultyCursor - 1 + difficulties.length) % difficulties.length;
      if (key === 'ArrowRight' || key === 'd') difficultyCursor = (difficultyCursor + 1) % difficulties.length;
      if (key === 'Enter' || key === ' ') {
        cpuDifficulty = difficulties[difficultyCursor];
        levelSelectCursor = 0;
        gameState = 'levelSelect';
      }
      if (key === 'Escape' || key === 'Backspace') {
        gameState = 'assistSelect';
      }
      break;

    case 'levelSelect': {
      const lvls = getLevels();
      const totalItems = lvls.length + 1; // +1 for RANDOM
      const perRow = Math.min(totalItems, 5);

      if (key === 'ArrowLeft' || key === 'a') levelSelectCursor = (levelSelectCursor - 1 + totalItems) % totalItems;
      if (key === 'ArrowRight' || key === 'd') levelSelectCursor = (levelSelectCursor + 1) % totalItems;
      if (key === 'ArrowUp' || key === 'w') {
        levelSelectCursor -= perRow;
        if (levelSelectCursor < 0) levelSelectCursor += totalItems;
      }
      if (key === 'ArrowDown' || key === 's') {
        levelSelectCursor += perRow;
        if (levelSelectCursor >= totalItems) levelSelectCursor -= totalItems;
      }

      if ((key === 'Enter' || key === ' ') && !lotteryActive) {
        if (levelSelectCursor >= lvls.length) {
          // Random
          lotteryFinal = Math.floor(Math.random() * lvls.length);
          lotteryCurrent = 0;
          lotteryTimer = 0;
          lotteryDuration = 90;
          lotteryType = 'level';
          lotteryActive = true;
          lotteryCallback = () => {
            levelSelectCursor = lotteryFinal;
            selectedLevel = lvls[lotteryFinal];
            startVersusScreen();
          };
        } else {
          selectedLevel = lvls[levelSelectCursor];
          startVersusScreen();
        }
      }
      if (key === 'Escape' || key === 'Backspace') {
        if (gameMode === 'rumblePractice') {
          gameState = 'charSelect';
          selectingCPU = false;
          charSelectScroll = 0;
        } else if (gameMode === 'practice') {
          gameState = 'assistSelect';
        } else {
          gameState = 'difficultySelect';
        }
      }

      // Secret level unlock codes
      if (!snowyCityUnlocked && key.length === 1) {
        snowyCityCodeBuffer += key.toUpperCase();
        if (snowyCityCodeBuffer.length > 10) snowyCityCodeBuffer = snowyCityCodeBuffer.slice(-10);
        if (snowyCityCodeBuffer.includes('NY')) {
          snowyCityUnlocked = true;
          snowyCityUnlockFlash = 60;
        }
      }
      if (!foggyCityUnlocked && key.length === 1) {
        foggyCityCodeBuffer += key.toUpperCase();
        if (foggyCityCodeBuffer.length > 10) foggyCityCodeBuffer = foggyCityCodeBuffer.slice(-10);
        if (foggyCityCodeBuffer.includes('SF')) {
          foggyCityUnlocked = true;
          foggyCityUnlockFlash = 60;
        }
      }
      if (!rainyCityUnlocked && key.length === 1) {
        rainyCityCodeBuffer += key.toUpperCase();
        if (rainyCityCodeBuffer.length > 10) rainyCityCodeBuffer = rainyCityCodeBuffer.slice(-10);
        if (rainyCityCodeBuffer.includes('SE')) {
          rainyCityUnlocked = true;
          rainyCityUnlockFlash = 60;
        }
      }
      if (!glowingCityUnlocked && key.length === 1) {
        glowingCityCodeBuffer += key.toUpperCase();
        if (glowingCityCodeBuffer.length > 10) glowingCityCodeBuffer = glowingCityCodeBuffer.slice(-10);
        if (glowingCityCodeBuffer.includes('LV')) {
          glowingCityUnlocked = true;
          glowingCityUnlockFlash = 60;
        }
      }
      if (!sunnyCityUnlocked && key.length === 1) {
        sunnyCityCodeBuffer += key.toUpperCase();
        if (sunnyCityCodeBuffer.length > 10) sunnyCityCodeBuffer = sunnyCityCodeBuffer.slice(-10);
        if (sunnyCityCodeBuffer.includes('LA')) {
          sunnyCityUnlocked = true;
          sunnyCityUnlockFlash = 60;
        }
      }
      break;
    }

    case 'versus':
      if (key === 'Escape') {
        gameState = 'levelSelect';
      }
      break;

    case 'fight':
      if (key === ' ') paused = !paused;
      if (key === 'Escape') {
        gameState = 'title';
        paused = false;
        stopFightMusic();
        playTitleMusic();
      }
      // Corvida: detect double-tap jump for jay transform
      if ((key === 'ArrowUp' || key === 'w' || key === 'W') && player && player.char.isCorvida && !player.isJay) {
        if (frameCount - player.lastJumpPress < 20) {
          player.corvidaJayPending = true;
          player.lastJumpPress = 0;
        } else {
          player.lastJumpPress = frameCount;
        }
      }
      // Batsch: detect double-tap crouch for tortoise transform
      if ((key === 'ArrowDown' || key === 's' || key === 'S') && player && player.char.isBatsch && !player.isTortoise) {
        if (frameCount - player.lastCrouchPress < 20) {
          player.batschCrouchPending = true;
          player.lastCrouchPress = 0;
        } else {
          player.lastCrouchPress = frameCount;
        }
      }
      break;

    case 'finishHim':
      if (key === ' ') paused = !paused;
      if (key === 'Escape') {
        gameState = 'title';
        paused = false;
        playTitleMusic();
        resetRumbleState();
      }
      // Rumble code input (only when not paused and no rumble active)
      if (!paused && !rumbleActive && winner === 'player') {
        if (key.length === 1) {
          rumbleCodeBuffer += key.toLowerCase();
          if (rumbleCodeBuffer.length > 10) rumbleCodeBuffer = rumbleCodeBuffer.slice(-10);
          const winChar = winner === 'player' ? selectedPlayer : selectedCPU;
          const rumbleEntry = characterRumbles[winChar.name];
          if (rumbleEntry) {
            const rumbleList = Array.isArray(rumbleEntry) ? rumbleEntry : [rumbleEntry];
            for (const rumble of rumbleList) {
              if (rumbleCodeBuffer.includes(rumble.code)) {
                rumbleActive = true;
                rumbleTimer = 0;
                rumbleType = winChar.name;
                rumbleSubType = rumble.code;
                rumblePracticeUnlocked = true;
                rumbleCodeBuffer = '';
                player.assistActive = null;
                cpu.assistActive = null;
                break;
              }
            }
          }
        }
      }
      break;

    case 'victory':
      if (key === 'Enter' || key === ' ') {
        if (gameMode === 'rumblePractice') {
          startRumblePractice();
          break;
        }
        gameState = 'title';
        paused = false;
        playTitleMusic();
        resetRumbleState();
      }
      if ((key === 'Escape' || key === 'Backspace') && gameMode === 'rumblePractice') {
        gameState = 'title';
        paused = false;
        playTitleMusic();
        resetRumbleState();
      }
      break;
  }
}

let player, cpu;

// --- VERSUS SCREEN STATE ---
let versusTimer = 0;
const VERSUS_DURATION = 150; // frames (~2.5 sec at 60fps)

function startVersusScreen() {
  versusTimer = 0;
  gameState = 'versus';
  stopTitleMusic();
  const level = selectedLevel ? selectedLevel.name : 'CLASSIC';
  if (level === 'CLASSIC') playFightMusic();
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

// --- DRAWING FUNCTIONS ---
// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to backgrounds/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// --- MAIN LOOP ---
function update() {
  // Lottery animation update
  if (lotteryActive) {
    lotteryTimer++;
    const progress = lotteryTimer / lotteryDuration;
    // Speed decreases as progress increases: fast at start, slow near end
    const interval = Math.max(2, Math.floor(2 + progress * progress * 20));
    const isChar = lotteryType === 'char' || lotteryType === 'cpu';
    const isLevel = lotteryType === 'level';
    const pool = isLevel ? getLevels() : (isChar ? characters : assists);
    if (lotteryTimer % interval === 0) {
      // Cycle to a random different index
      let next;
      do { next = Math.floor(Math.random() * pool.length); } while (next === lotteryCurrent && pool.length > 1);
      lotteryCurrent = next;
    }
    if (lotteryTimer >= lotteryDuration) {
      lotteryCurrent = lotteryFinal;
    }
    if (lotteryTimer >= lotteryDuration + 30) {
      lotteryActive = false;
      if (lotteryCallback) lotteryCallback();
      lotteryCallback = null;
    }
  }

  if (gameState === 'fight' && !paused && !winner) {
    frameCount++;
    // Screen shake
    if (shakeTimer > 0) shakeTimer--;

    player.update(cpu, keys);
    cpu.update(player, {});

    // Push apart if overlapping (skip if water phase or Matador dashing)
    const matadorDashing = player.matadorDashing || cpu.matadorDashing;
    if (!player.waterPhase && !cpu.waterPhase && !matadorDashing) {
      // Allow jumping over: skip push-apart only when one fighter is high enough above the other
      // Paletap: so tall that opponents must crouch under his legs instead of jumping over
      const paletapInvolved = player.char.isPaletap || cpu.char.isPaletap;
      const crouchingUnder = paletapInvolved && (
        (cpu.char.isPaletap && player.crouching && player.grounded) ||
        (player.char.isPaletap && cpu.crouching && cpu.grounded)
      );
      const jumpingOver = (!player.grounded && player.y < cpu.y - 50) || (!cpu.grounded && cpu.y < player.y - 50);
      if (!jumpingOver && !crouchingUnder) {
        const overlap = 40 - Math.abs(player.x - cpu.x);
        if (overlap > 0) {
          const push = overlap / 2 + 0.5;
          if (player.x < cpu.x) {
            player.x -= push;
            cpu.x += push;
          } else {
            player.x += push;
            cpu.x -= push;
          }
        }
      }
    }


    // Check victory (not in practice mode)
    if (gameMode !== 'practice') {
      if (player.health <= 0 || cpu.health <= 0) {
        winner = player.health <= 0 ? 'cpu' : 'player';
        finishHimTimer = 0;
        gameState = 'finishHim';
        stopFightMusic();
        // Clear hit effects, projectiles, and particles on both fighters
        for (const f of [player, cpu]) {
          f.hitEffect = null;
          f.assistActive = null;
          f.queuedAttacks = [];
          f.inputBuffer = [];
          f.aiComboQueue = [];
          f.haystackProjectiles = [];
          f.hayParticles = [];
          f.buckFireworks = [];
          f.buckExplosions = [];
          f.exorSoulParticles = [];
          f.matadorRoses = [];
          f.xhaustFlames = [];
          f.vorticeTornadoParticles = [];
          f.state = f === (winner === 'player' ? cpu : player) ? 'idle' : f.state;
          if (f.assistFighter) f.assistFighter = null;
        }
        // Set loser to idle
        const loseFighter = winner === 'player' ? cpu : player;
        loseFighter.state = 'idle';
      }
    }
  }

  // Finish Him phase: winner can still move, loser is passive
  if (gameState === 'finishHim' && !paused) {
    const winFighter = winner === 'player' ? player : cpu;
    const loseFighter = winner === 'player' ? cpu : player;

    if (rumbleActive) {
      // Rumble animation is playing — timer stops, fighters freeze
      rumbleTimer++;
      if (shakeTimer > 0) shakeTimer--;

      if (rumbleType === 'BLAZE') {
        // Blaze Scorched Earth: 210 frames total
        // 0-30: pillar rises, 30-120: full blaze, 120-150: fade, 150-170: ashes settle, 170-210: pause on ashes
        if (rumbleTimer >= 10 && rumbleTimer <= 120) {
          shakeTimer = 2;
          shakeIntensity = rumbleTimer < 30 ? 3 : 5;
        }
        if (rumbleTimer >= 30) {
          rumbleLoserHidden = true;
        }
        if (rumbleTimer >= 150 && !rumbleAshes) {
          rumbleAshes = { x: loseFighter.x, y: loseFighter.groundY };
        }
        if (rumbleTimer >= 210) {
          gameState = 'victory';
        }
        // Winner idles during Blaze rumble
        winFighter.vx = 0;
        winFighter.state = 'idle';
      }

      if (rumbleType === 'ARTIK') {
        // Artik Oppsicle: 270 frames total
        // 0-40: freeze solid (ice overlay intensifies)
        // 40-140: Artik walks toward opponent
        // 140-155: Artik winds up punch
        // 155-165: Punch connects, shatter, screen shake
        // 165-270: shards fly and settle
        const freezeEnd = 40;
        const walkEnd = 140;
        const windupEnd = 155;
        const punchFrame = 158;
        const shatterEnd = 165;
        const endFrame = 270;

        if (rumbleTimer <= freezeEnd) {
          // Freeze phase — loser gets frozen visual
          loseFighter.frozenTimer = 999;
          winFighter.vx = 0;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= walkEnd) {
          // Walk toward opponent
          const dir = loseFighter.x > winFighter.x ? 1 : -1;
          const dist = Math.abs(winFighter.x - loseFighter.x);
          winFighter.facing = dir;
          if (dist > 50) {
            winFighter.vx = dir * 2.5;
            winFighter.x += winFighter.vx;
            winFighter.state = 'walk';
          } else {
            winFighter.vx = 0;
            winFighter.state = 'idle';
          }
        } else if (rumbleTimer <= windupEnd) {
          // Wind up — face opponent, idle
          winFighter.vx = 0;
          winFighter.facing = loseFighter.x > winFighter.x ? 1 : -1;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= shatterEnd) {
          // Punch!
          winFighter.vx = 0;
          winFighter.state = 'attack';
          if (rumbleTimer === punchFrame && rumbleIceShards.length === 0) {
            // Shatter — spawn ice shards from loser's body
            rumbleLoserHidden = true;
            loseFighter.frozenTimer = 0;
            shakeTimer = 15;
            shakeIntensity = 8;
            const sx = loseFighter.x;
            const sy = loseFighter.y - 30; // center of body
            for (let i = 0; i < 24; i++) {
              const angle = (Math.random() * Math.PI * 2);
              const speed = 2 + Math.random() * 6;
              rumbleIceShards.push({
                x: sx + (Math.random() - 0.5) * 30,
                y: sy + (Math.random() - 0.5) * 60,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 3,
                size: 3 + Math.random() * 8,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.3,
                alpha: 1,
                color: ['#aaeeff', '#ccf0ff', '#88ccee', '#ffffff', '#66bbdd'][Math.floor(Math.random() * 5)]
              });
            }
          }
        } else {
          // Shards flying and fading
          winFighter.vx = 0;
          winFighter.state = 'idle';
        }

        // Update ice shards
        for (const s of rumbleIceShards) {
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.15; // gravity
          s.rot += s.rotSpeed;
          s.vx *= 0.98;
          // Fade out in last phase
          if (rumbleTimer > 200) {
            s.alpha = Math.max(0, s.alpha - 0.012);
          }
          // Bounce off ground
          if (s.y > loseFighter.groundY) {
            s.y = loseFighter.groundY;
            s.vy *= -0.4;
            s.vx *= 0.7;
          }
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'VENOM') {
        // Venom You've Been Pardoned: 270 frames total
        // 0-30: Venom faces opponent, winds up spit
        // 30-31: Launch acid blob projectile
        // 31-??: Blob flies toward opponent (variable, depends on distance)
        // impact: splash, opponent starts melting
        // impact+120: fully melted Wicked Witch style
        // last 90 frames: goo puddle bubbles
        const spitFrame = 30;
        const endFrame = 330;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer < spitFrame) {
          // Wind up
          winFighter.state = 'idle';
        } else if (rumbleTimer === spitFrame) {
          // Spit blob
          winFighter.state = 'attack';
          rumbleAcidBlob = {
            x: winFighter.x + dir * 25,
            y: winFighter.y - 35,
            vx: dir * 7,
            vy: -2
          };
        } else if (rumbleAcidBlob) {
          // Blob in flight
          winFighter.state = 'idle';
          rumbleAcidBlob.x += rumbleAcidBlob.vx;
          rumbleAcidBlob.y += rumbleAcidBlob.vy;
          rumbleAcidBlob.vy += 0.12; // gravity arc

          // Check if blob reached opponent
          if (Math.abs(rumbleAcidBlob.x - loseFighter.x) < 25 && Math.abs(rumbleAcidBlob.y - loseFighter.y + 20) < 50) {
            // Impact — spawn splashes
            for (let i = 0; i < 16; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = 1 + Math.random() * 4;
              rumbleAcidSplashes.push({
                x: loseFighter.x + (Math.random() - 0.5) * 20,
                y: loseFighter.y - 20 + (Math.random() - 0.5) * 30,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: 2 + Math.random() * 4,
                alpha: 1,
                color: ['#44cc00', '#33aa00', '#66dd22', '#88ee44', '#22aa00'][Math.floor(Math.random() * 5)]
              });
            }
            rumbleAcidBlob = null;
            shakeTimer = 10;
            shakeIntensity = 4;
          }
        } else {
          // Post-impact: Wicked Witch melting phase
          winFighter.state = 'idle';
          if (!rumbleLoserHidden) {
            if (!rumbleGoo) {
              rumbleGoo = { x: loseFighter.x, y: loseFighter.groundY, meltTimer: 0 };
            }
            rumbleGoo.meltTimer++;
            rumbleVenomMeltPct = Math.min(1, rumbleGoo.meltTimer / 120); // slower melt over 120 frames

            // Spawn drips from the body as it melts
            if (rumbleGoo.meltTimer % 3 === 0 && rumbleVenomMeltPct < 0.95) {
              const bodyTop = loseFighter.y - 60 * (1 - rumbleVenomMeltPct);
              const bodyBot = loseFighter.groundY;
              const dripY = bodyTop + Math.random() * (bodyBot - bodyTop) * 0.6;
              const side = Math.random() > 0.5 ? 1 : -1;
              rumbleVenomDrips.push({
                x: loseFighter.x + side * (8 + Math.random() * 14),
                y: dripY,
                vx: side * (0.2 + Math.random() * 0.5),
                vy: 0.5 + Math.random() * 1.5,
                size: 2 + Math.random() * 3,
                alpha: 0.8 + Math.random() * 0.2,
                color: ['#44cc00', '#33aa00', '#66dd22', '#228800'][Math.floor(Math.random() * 4)]
              });
            }

            if (rumbleGoo.meltTimer >= 120) {
              rumbleLoserHidden = true;
            }
          }
        }

        // Update drips and remove dead ones
        for (let i = rumbleVenomDrips.length - 1; i >= 0; i--) {
          const d = rumbleVenomDrips[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy += 0.15;
          if (d.y >= loseFighter.groundY) {
            d.y = loseFighter.groundY;
            d.vy = 0;
            d.vx = 0;
            d.alpha = Math.max(0, d.alpha - 0.02);
          }
          if (d.alpha <= 0) rumbleVenomDrips.splice(i, 1);
        }

        // Update acid splashes
        for (const s of rumbleAcidSplashes) {
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.1;
          s.vx *= 0.97;
          if (s.y > loseFighter.groundY) {
            s.y = loseFighter.groundY;
            s.vy = 0;
            s.vx *= 0.5;
          }
          if (rumbleTimer > 200) {
            s.alpha = Math.max(0, s.alpha - 0.015);
          }
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'SURGE') {
        // Surge Mr. Electric Boom: 300 frames total
        // 0-30: Surge raises hands, faces opponent
        // 30-120: Electricity beam connects, opponent overcharges (glows brighter)
        // 120-130: Screen goes white, opponent explodes
        // 130-300: Beautiful light particles expand and fade
        const zapStart = 30;
        const zapEnd = 120;
        const explodeFrame = 125;
        const endFrame = 300;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer < zapStart) {
          winFighter.state = 'idle';
        } else if (rumbleTimer < zapEnd) {
          // Zapping phase
          winFighter.state = 'attack';
          rumbleZapActive = true;
          // Loser glows and shakes increasingly
          loseFighter.flashTimer = 2;
        } else if (rumbleTimer === explodeFrame) {
          // Explosion!
          rumbleZapActive = false;
          rumbleLoserHidden = true;
          rumbleLightBurst = { x: loseFighter.x, y: loseFighter.y - 30, timer: 0 };
          shakeTimer = 25;
          shakeIntensity = 12;
          // Spawn beautiful light particles
          for (let i = 0; i < 40; i++) {
            const angle = (i / 40) * Math.PI * 2 + Math.random() * 0.3;
            const speed = 1.5 + Math.random() * 5;
            const hue = Math.floor(Math.random() * 360);
            rumbleLightParticles.push({
              x: loseFighter.x,
              y: loseFighter.y - 30,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 1,
              size: 3 + Math.random() * 7,
              alpha: 1,
              hue: hue,
              glow: 10 + Math.random() * 20,
              decay: 0.003 + Math.random() * 0.004
            });
          }
        } else {
          winFighter.state = 'idle';
          rumbleZapActive = false;
        }

        // Update light burst
        if (rumbleLightBurst) {
          rumbleLightBurst.timer++;
        }

        // Update light particles
        for (const p of rumbleLightParticles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.03; // very light gravity
          p.vx *= 0.995;
          p.alpha = Math.max(0, p.alpha - p.decay);
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'TITAN') {
        // Titan "And what are you sinking about?": 300 frames total
        // 0-40: Titan stomps / raises fist, ground starts rumbling
        // 40-60: Sinkhole opens under opponent, dirt flies out
        // 60-180: Opponent sinks into the hole, struggling
        // 180-240: Hole closes over them
        // 240-300: Ground settles, dust clears
        const stompFrame = 30;
        const holeStart = 40;
        const sinkStart = 60;
        const sinkEnd = 180;
        const closeStart = 180;
        const closeEnd = 240;
        const endFrame = 300;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer < stompFrame) {
          winFighter.state = 'idle';
        } else if (rumbleTimer === stompFrame) {
          // Stomp!
          winFighter.state = 'attack';
          shakeTimer = 20;
          shakeIntensity = 8;
        } else if (rumbleTimer >= holeStart && rumbleTimer < sinkStart) {
          // Sinkhole opening
          winFighter.state = 'idle';
          if (!rumbleSinkhole) {
            rumbleSinkhole = {
              x: loseFighter.x,
              y: loseFighter.groundY,
              radius: 0,
              maxRadius: 55
            };
          }
          const openPct = (rumbleTimer - holeStart) / (sinkStart - holeStart);
          rumbleSinkhole.radius = rumbleSinkhole.maxRadius * openPct;

          // Spawn dirt particles as it opens
          if (rumbleTimer % 2 === 0) {
            for (let i = 0; i < 3; i++) {
              const angle = -Math.PI * Math.random();
              const speed = 2 + Math.random() * 4;
              rumbleDirtParticles.push({
                x: loseFighter.x + (Math.random() - 0.5) * 40,
                y: loseFighter.groundY - Math.random() * 5,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: 2 + Math.random() * 4,
                alpha: 1,
                color: ['#8B7355', '#6B5B3A', '#A0926B', '#554433'][Math.floor(Math.random() * 4)]
              });
            }
          }
          shakeTimer = 2;
          shakeIntensity = 3;
        } else if (rumbleTimer >= sinkStart && rumbleTimer <= sinkEnd) {
          // Opponent sinking
          winFighter.state = 'idle';
          rumbleSinkhole.radius = rumbleSinkhole.maxRadius;
          rumbleSinkProgress = Math.min(1, (rumbleTimer - sinkStart) / (sinkEnd - sinkStart));

          // Continuous small rumble
          if (rumbleTimer % 10 === 0) {
            shakeTimer = 3;
            shakeIntensity = 2;
          }

          // Occasional dirt bursts
          if (rumbleTimer % 8 === 0) {
            const angle = -Math.PI * Math.random();
            const speed = 1 + Math.random() * 3;
            rumbleDirtParticles.push({
              x: loseFighter.x + (Math.random() - 0.5) * 50,
              y: loseFighter.groundY - Math.random() * 3,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 1.5,
              size: 2 + Math.random() * 3,
              alpha: 0.8,
              color: ['#8B7355', '#6B5B3A', '#A0926B'][Math.floor(Math.random() * 3)]
            });
          }

          // Hide loser once fully sunk
          if (rumbleSinkProgress >= 1) {
            rumbleLoserHidden = true;
          }
        } else if (rumbleTimer >= closeStart && rumbleTimer < closeEnd) {
          // Hole closing
          winFighter.state = 'idle';
          const closePct = (rumbleTimer - closeStart) / (closeEnd - closeStart);
          rumbleSinkhole.radius = rumbleSinkhole.maxRadius * (1 - closePct);

          if (rumbleTimer === closeStart) {
            shakeTimer = 10;
            shakeIntensity = 4;
          }
        } else if (rumbleTimer >= closeEnd) {
          // Ground settled
          winFighter.state = 'idle';
          rumbleSinkhole.radius = 0;
        }

        // Update dirt particles
        for (let i = rumbleDirtParticles.length - 1; i >= 0; i--) {
          const d = rumbleDirtParticles[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy += 0.2; // gravity
          d.vx *= 0.98;
          if (d.y > loseFighter.groundY + 5) {
            d.alpha = Math.max(0, d.alpha - 0.05);
          }
          if (d.alpha <= 0) rumbleDirtParticles.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'SHADE') {
        // Shade "Wanted the smoke, got the smoke": 360 frames total
        // 0-30: Shade walks toward opponent
        // 30-160: Rapid martial arts combo (punches and kicks)
        // 160-170: Wind-up for final jab
        // 170-175: Final hard jab — opponent poofs into smoke
        // 175-280: Smoke dissipates, Shade brushes shoulder
        // 280-360: Pause on the cool pose
        const walkEnd = 30;
        const comboStart = 30;
        const comboEnd = 160;
        const windupEnd = 170;
        const poofFrame = 175;
        const brushStart = 290;
        const endFrame = 420;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;

        // Combo hit schedule: frame offsets from comboStart
        // Alternating punches and kicks with increasing speed
        const comboHits = [0, 15, 28, 39, 48, 56, 63, 69, 74, 79, 84, 89, 94, 99, 104, 109, 114, 118, 122, 126];

        if (rumbleTimer < walkEnd) {
          // Walk toward opponent — stop at 85px so punches/kicks are visible
          const dist = Math.abs(winFighter.x - loseFighter.x);
          if (dist > 85) {
            winFighter.vx = dir * 3;
            winFighter.x += winFighter.vx;
            winFighter.state = 'walk';
          } else {
            winFighter.vx = 0;
            winFighter.state = 'idle';
          }
        } else if (rumbleTimer >= comboStart && rumbleTimer < comboEnd) {
          // Martial arts combo
          winFighter.vx = 0;
          const comboFrame = rumbleTimer - comboStart;

          // Check if this frame is a hit frame
          const hitIndex = comboHits.indexOf(comboFrame);
          if (hitIndex !== -1) {
            rumbleShadeComboHit = hitIndex + 1;
            winFighter.state = 'attack';
            // Cycle through attack types so the animation shows different moves
            const moveOrder = [attacks.jab, attacks.lowKick, attacks.uppercut, attacks.highKick];
            winFighter.currentAttack = moveOrder[hitIndex % moveOrder.length];
            winFighter.attackFrame = 0;
            // Small screen shake on each hit
            shakeTimer = 3;
            shakeIntensity = 2 + Math.floor(hitIndex / 5);
            // Flash the loser
            loseFighter.flashTimer = 4;
          } else {
            // Between hits — advance the attack animation frame
            if (winFighter.state === 'attack' && winFighter.currentAttack) {
              winFighter.attackFrame++;
              const total = winFighter.currentAttack.startup + winFighter.currentAttack.active + winFighter.currentAttack.recovery;
              if (winFighter.attackFrame >= total) {
                winFighter.state = 'idle';
                winFighter.currentAttack = null;
                winFighter.attackFrame = 0;
              }
            }
          }
        } else if (rumbleTimer >= comboEnd && rumbleTimer < windupEnd) {
          // Wind-up for final jab
          winFighter.vx = 0;
          winFighter.state = 'idle';
        } else if (rumbleTimer === poofFrame) {
          // Final hard jab — opponent turns to smoke!
          winFighter.state = 'attack';
          winFighter.currentAttack = attacks.jab;
          winFighter.attackFrame = 0;
          shakeTimer = 15;
          shakeIntensity = 10;
          rumbleShadePoof = true;
          rumbleLoserHidden = true;

          // Spawn smoke particles at opponent's position
          for (let i = 0; i < 35; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 2.5;
            rumbleSmokeParticles.push({
              x: loseFighter.x + (Math.random() - 0.5) * 30,
              y: loseFighter.y - 30 + (Math.random() - 0.5) * 40,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 0.8,
              size: 8 + Math.random() * 18,
              alpha: 0.7 + Math.random() * 0.3,
              growRate: 0.3 + Math.random() * 0.5,
              shade: Math.floor(40 + Math.random() * 60)
            });
          }
        } else if (rumbleTimer > poofFrame && rumbleTimer < brushStart) {
          // Post-poof: let final jab animation finish, then idle
          winFighter.vx = 0;
          if (winFighter.state === 'attack' && winFighter.currentAttack) {
            winFighter.attackFrame++;
            const total = winFighter.currentAttack.startup + winFighter.currentAttack.active + winFighter.currentAttack.recovery;
            if (winFighter.attackFrame >= total) {
              winFighter.state = 'idle';
              winFighter.currentAttack = null;
              winFighter.attackFrame = 0;
            }
          }
        } else if (rumbleTimer >= brushStart) {
          // Brush dust off shoulder — idle pose with arm override
          winFighter.vx = 0;
          winFighter.state = 'idle';
          winFighter.currentAttack = null;
          rumbleShadeBrush = true;
          // Set brush arm progress (0 to 1 over 80 frames)
          const brushProgress = Math.min(1, (rumbleTimer - brushStart) / 80);
          winFighter._brushArmT = brushProgress;
        }

        // Update smoke particles
        for (let i = rumbleSmokeParticles.length - 1; i >= 0; i--) {
          const p = rumbleSmokeParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy -= 0.02; // smoke rises
          p.vx *= 0.98;
          p.size += p.growRate; // smoke expands
          p.growRate *= 0.97; // expansion slows
          p.alpha = Math.max(0, p.alpha - 0.01);
          if (p.alpha <= 0) rumbleSmokeParticles.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if ((rumbleType === 'BOJDO' || rumbleType === 'BOJDOBOJDO') && rumbleSubType === 'pellet') {
        // Bojdo "Death from below": 300 frames total
        // 0-40: Bojdo shrinks to tiny size
        // 40-90: Tiny Bojdo scurries under the opponent
        // 90-110: Pause underneath
        // 110-180: Grows back to normal, launching opponent upward
        // 180-240: Opponent flies offscreen
        // 240-300: Bojdo stands triumphant
        const shrinkEnd = 40;
        const scurryEnd = 90;
        const pauseEnd = 110;
        const growEnd = 180;
        const endFrame = 300;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;

        if (rumbleTimer <= shrinkEnd) {
          // Shrink phase: Bojdo gets tiny
          winFighter.vx = 0;
          winFighter.state = 'idle';
          const t = rumbleTimer / shrinkEnd;
          winFighter.bojdoScale = Math.max(0.15, 1 - t * 0.85);
        } else if (rumbleTimer <= scurryEnd) {
          // Scurry phase: tiny Bojdo runs toward opponent
          winFighter.state = 'walk';
          winFighter.bojdoScale = 0.15;
          const targetX = loseFighter.x;
          const dist = targetX - winFighter.x;
          if (Math.abs(dist) > 5) {
            const speed = 4;
            winFighter.x += dist > 0 ? speed : -speed;
            winFighter.facing = dist > 0 ? 1 : -1;
          } else {
            winFighter.x = targetX;
          }
          winFighter.vx = 0;
        } else if (rumbleTimer <= pauseEnd) {
          // Pause underneath: centered under opponent
          winFighter.vx = 0;
          winFighter.x = loseFighter.x;
          winFighter.state = 'idle';
          winFighter.bojdoScale = 0.15;
        } else if (rumbleTimer <= growEnd) {
          // Grow phase: expand back to full size, pushing opponent up
          winFighter.vx = 0;
          winFighter.x = loseFighter.x;
          winFighter.state = 'idle';
          const growT = (rumbleTimer - pauseEnd) / (growEnd - pauseEnd);
          const easeGrow = growT * growT; // accelerating growth
          winFighter.bojdoScale = 0.15 + easeGrow * 0.85;

          // Push the loser upward as Bojdo grows
          if (growT < 0.8) {
            loseFighter.y = loseFighter.groundY - growT * 80;
            loseFighter.grounded = false;
          }
          // At full size, launch!
          if (rumbleTimer === growEnd) {
            rumbleBojdoLaunchVy = -18;
            shakeTimer = 15;
            shakeIntensity = 10;
          }
        } else {
          // Post-launch: opponent flies offscreen, Bojdo stands proud
          winFighter.vx = 0;
          winFighter.state = 'idle';
          winFighter.bojdoScale = 1.0;

          // Launch the loser upward — no gravity, they fly offscreen
          if (!rumbleLoserHidden) {
            loseFighter.y += rumbleBojdoLaunchVy;
            loseFighter.vy = rumbleBojdoLaunchVy; // override so gravity code doesn't pull them back
            loseFighter.grounded = false;
            if (loseFighter.y < -150) {
              rumbleLoserHidden = true;
            }
          }
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'BOJDOBOJDO' && rumbleSubType === 'massiv') {
        // Bojdobojdo "Death from above": 340 frames total
        // 0-var: Walk to opponent
        // var-var+60: Grows to gargantuan size (only bottom half visible)
        // +60-+90: Raises one leg (stomp windup)
        // +90-+100: Stomps down on opponent
        // +100-+200: Foot on ground, opponent flattened
        // +200-+260: Lifts foot, shrinks back to normal
        // +260-+300: Stands triumphant
        const walkSpeed = 3;
        const distToOpponent = Math.abs(loseFighter.x - winFighter.x);
        const walkFrames = Math.max(10, Math.ceil(distToOpponent / walkSpeed));
        const walkEnd = walkFrames;
        const growEnd2 = walkEnd + 60;
        const raiseEnd = growEnd2 + 30;
        const stompFrame = raiseEnd + 10;
        const holdEnd = stompFrame + 100;
        const shrinkEnd2 = holdEnd + 60;
        const endFrame2 = shrinkEnd2 + 40;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer <= walkEnd) {
          // Walk toward opponent
          winFighter.state = 'walk';
          const dist = loseFighter.x - winFighter.x;
          if (Math.abs(dist) > 5) {
            winFighter.x += dist > 0 ? walkSpeed : -walkSpeed;
            winFighter.facing = dist > 0 ? 1 : -1;
          } else {
            winFighter.x = loseFighter.x;
          }
        } else if (rumbleTimer <= growEnd2) {
          // Grow to gargantuan
          winFighter.state = 'idle';
          winFighter.x = loseFighter.x;
          const t = (rumbleTimer - walkEnd) / (growEnd2 - walkEnd);
          const easeT = t * t;
          winFighter.bojdoScale = 1 + easeT * 7; // grow to 8x
          if (rumbleTimer > 10) {
            shakeTimer = 2;
            shakeIntensity = 2 + t * 4;
          }
        } else if (rumbleTimer <= raiseEnd) {
          // Foot raised — we track via rumbleBojdoPhase
          winFighter.state = 'idle';
          winFighter.x = loseFighter.x;
          winFighter.bojdoScale = 8;
          rumbleBojdoPhase = 1; // signal to draw: leg raised
        } else if (rumbleTimer <= stompFrame) {
          // Stomp down!
          winFighter.state = 'idle';
          winFighter.x = loseFighter.x;
          winFighter.bojdoScale = 8;
          rumbleBojdoPhase = 2; // signal to draw: stomp
          if (rumbleTimer === stompFrame) {
            shakeTimer = 25;
            shakeIntensity = 15;
            rumbleLoserHidden = true;
          }
        } else if (rumbleTimer <= holdEnd) {
          // Hold foot down
          winFighter.state = 'idle';
          winFighter.x = loseFighter.x;
          winFighter.bojdoScale = 8;
          rumbleBojdoPhase = 2;
        } else if (rumbleTimer <= shrinkEnd2) {
          // Shrink back to normal
          winFighter.state = 'idle';
          rumbleBojdoPhase = 0;
          const t = (rumbleTimer - holdEnd) / (shrinkEnd2 - holdEnd);
          winFighter.bojdoScale = 8 - t * 7; // back to 1
        } else {
          // Stand triumphant
          winFighter.state = 'idle';
          winFighter.bojdoScale = 1;
          rumbleBojdoPhase = 0;
        }

        if (rumbleTimer >= endFrame2) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'RUBBERMAN') {
        // Rubberman "Tetherball": 360 frames total
        // 0-30: Rubberman reaches out and grabs opponent
        // 30-240: Swings opponent back and forth, slamming into ground
        // 240-260: Winds up for final overhead smash
        // 260-270: Final smash into ground
        // 270-360: Opponent stuck in cracked ground, Rubberman retracts arm
        const grabEnd = 30;
        const swingEnd = 150;
        const windupEnd = 170;
        const smashFrame = 180;
        const endFrame = 280;
        const numSwings = 6;

        winFighter.vx = 0;

        // On first frame, store the fixed grab distance and direction
        if (rumbleTimer === 1) {
          rumbleTetherGrabX = Math.abs(loseFighter.x - winFighter.x);
          winFighter.facing = loseFighter.x > winFighter.x ? 1 : -1;
        }
        const dir = winFighter.facing;
        const pivotX = winFighter.x;
        const groundY = loseFighter.groundY;
        const armLen = Math.max(80, rumbleTetherGrabX);

        // Hide the fighter's normal front arm — the custom stretchy arm replaces it
        winFighter._hideFrontArm = true;

        if (rumbleTimer <= grabEnd) {
          // Reach out and grab
          winFighter.state = 'attack';
        } else if (rumbleTimer <= swingEnd) {
          // Swinging phase
          winFighter.state = 'walk'; // walk anim makes him look active/braced
          const swingTime = rumbleTimer - grabEnd;
          const swingDuration = swingEnd - grabEnd;

          const progress = swingTime / swingDuration;
          const swingAngle = progress * numSwings * Math.PI;
          rumbleTetherAngle = swingAngle;

          // Opponent on semicircular arc, grounded at extremes
          loseFighter.x = pivotX + Math.cos(swingAngle) * armLen;
          loseFighter.y = groundY - Math.abs(Math.sin(swingAngle)) * armLen;
          loseFighter.grounded = false;

          // Rotate opponent to follow the arc — body trails behind the swing direction
          // The tangent angle of the arc gives the direction of travel
          const sinA = Math.sin(swingAngle);
          const cosA = Math.cos(swingAngle);
          // Rotation: head points outward along the arc
          loseFighter._rumbleRotation = -swingAngle + Math.PI / 2;

          // Detect ground slams
          const prevSwingAngle = ((swingTime - 1) / swingDuration) * numSwings * Math.PI;
          if (Math.floor(swingAngle / Math.PI) !== Math.floor(prevSwingAngle / Math.PI) && swingTime > 3) {
            rumbleTetherSlams++;
            shakeTimer = 8;
            shakeIntensity = 5 + rumbleTetherSlams * 2;
            loseFighter.y = groundY;
          }

          // Rubberman leans into the swing
          winFighter.facing = cosA > 0 ? 1 : -1;
        } else if (rumbleTimer <= windupEnd) {
          // Wind up — smoothly arc opponent from last swing position to overhead
          winFighter.state = 'idle';
          winFighter.facing = dir;
          const windupDur = windupEnd - swingEnd;
          const t = (rumbleTimer - swingEnd) / windupDur;
          const ease = t * t; // ease in

          // Starting position: where swing ended (last swing angle)
          const finalSwingAngle = numSwings * Math.PI;
          const startX = pivotX + Math.cos(finalSwingAngle) * armLen;
          const startY = groundY - Math.abs(Math.sin(finalSwingAngle)) * armLen;
          // End position: directly overhead
          const endX = pivotX;
          const endY = groundY - armLen;

          // Arc upward via an intermediate high point
          loseFighter.x = startX + (endX - startX) * ease;
          // Use a smooth arc — go up first then settle overhead
          loseFighter.y = startY + (endY - startY) * ease - Math.sin(t * Math.PI) * 30;
          loseFighter.grounded = false;

          // Smoothly rotate from last swing rotation to upside down (PI)
          const lastSwingRot = -finalSwingAngle + Math.PI / 2;
          // Normalize to closest equivalent of PI
          const targetRot = Math.PI;
          loseFighter._rumbleRotation = lastSwingRot + (targetRot - lastSwingRot) * ease;
        } else if (rumbleTimer <= smashFrame) {
          // Final smash — arc from overhead down to the ground at a distance
          winFighter.state = 'attack';
          winFighter.facing = dir;
          const smashDist = Math.min(armLen * 0.8, 200); // land further out
          const smashDur = smashFrame - windupEnd;
          const t = (rumbleTimer - windupEnd) / smashDur;

          // Start: overhead (pivotX, groundY - armLen)
          const startX = pivotX;
          const startY = groundY - armLen;
          // End: on the ground further out
          const endX = pivotX + dir * smashDist;
          const endY = groundY;

          // Smooth arc down: x moves linearly, y uses cubic ease for impact feel
          loseFighter.x = startX + (endX - startX) * t;
          loseFighter.y = startY + (endY - startY) * t * t * t;
          loseFighter.grounded = false;

          // Rotate from upside down (PI) to face-down (PI/2)
          loseFighter._rumbleRotation = Math.PI * (1 - t * 0.5);

          if (rumbleTimer === smashFrame) {
            shakeTimer = 25;
            shakeIntensity = 15;
            rumbleTetherCracked = true;
            rumbleTetherGrabX = loseFighter.x; // store final smash X for draw
            loseFighter.y = groundY;
          }
        } else {
          // Retract, opponent face-down in cracked ground
          winFighter.state = 'idle';
          winFighter.facing = dir;
          winFighter._hideFrontArm = false;
          const smashX = rumbleTetherGrabX; // stored from smash impact
          loseFighter.x = smashX;
          loseFighter.y = groundY;
          loseFighter.grounded = true;
          loseFighter._rumbleRotation = 0;
          if (!rumbleLoserHidden) {
            rumbleLoserHidden = true;
          }
        }

        if (rumbleTimer >= endFrame) {
          winFighter._hideFrontArm = false;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'GOLGAR') {
        // Golgar "You Must Be Double Dead!": ~340 frames
        // 0-40: Second entity walks to other side of opponent
        // 40-70: Both entities grab opponent's arms
        // 70-120: Wind up — pull opponent back together
        // 120-140: Swing forward and release — launch!
        // 140-200: Opponent flies diagonally into the sky
        // 200-280: Both entities face each other and high-five
        // 280-340: Settle
        const walkEnd = 40;
        const grabEnd = 70;
        const windupEnd = 120;
        const launchFrame = 135;
        const flyEnd = 200;
        const highFiveStart = 220;
        const highFiveHit = 250;
        const endFrame = 340;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (!rumbleGolgarEntity2) {
          // Initialize on first frame
          rumbleGolgarEntity2 = {
            x: winFighter.golgarOtherX,
            y: winFighter.golgarOtherY || winFighter.y,
            facing: -dir
          };
          rumbleGolgarPhase = 0;
          rumbleGolgarLaunchVy = 0;
          rumbleGolgarOpX = loseFighter.x; // store opponent position once
        }

        const e2 = rumbleGolgarEntity2;
        // Target positions: one on each side of opponent (fixed from start)
        const entity1TargetX = rumbleGolgarOpX - dir * 45;
        const entity2TargetX = rumbleGolgarOpX + dir * 45;

        if (rumbleTimer <= walkEnd) {
          // Both entities walk toward opponent from each side
          rumbleGolgarPhase = 0;
          winFighter.x += (entity1TargetX - winFighter.x) * 0.08;
          e2.x += (entity2TargetX - e2.x) * 0.08;
          e2.y = winFighter.groundY;
          e2.facing = -dir;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= grabEnd) {
          // Grab opponent's arms — both face inward
          rumbleGolgarPhase = 1;
          winFighter.x += (entity1TargetX - winFighter.x) * 0.15;
          e2.x += (entity2TargetX - e2.x) * 0.15;
          winFighter.facing = dir;
          e2.facing = -dir;
          winFighter.state = 'idle';
          loseFighter.state = 'hitstun';
        } else if (rumbleTimer <= windupEnd) {
          // Wind up — both step back together (away from launch direction), pulling opponent
          rumbleGolgarPhase = 2;
          const t = (rumbleTimer - grabEnd) / (windupEnd - grabEnd);
          const pullBack = Math.sin(t * Math.PI * 0.5) * 50; // pull back away from launch dir
          winFighter.x = entity1TargetX - dir * pullBack;
          e2.x = entity2TargetX - dir * pullBack;
          // Opponent follows between them
          loseFighter.x = (winFighter.x + e2.x) / 2;
          loseFighter.y = winFighter.groundY;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= launchFrame) {
          // Swing forward and release — both lunge forward together
          rumbleGolgarPhase = 3;
          const t = (rumbleTimer - windupEnd) / (launchFrame - windupEnd);
          const ease = t * t;
          const swingForward = ease * 100;
          winFighter.x = (entity1TargetX - dir * 50) + dir * swingForward;
          e2.x = (entity2TargetX - dir * 50) + dir * swingForward;
          loseFighter.x = (winFighter.x + e2.x) / 2;
          // At launch frame, release opponent
          if (rumbleTimer === launchFrame) {
            rumbleGolgarLaunchVy = -18;
            shakeTimer = 10;
            shakeIntensity = 8;
          }
        } else if (rumbleTimer <= flyEnd) {
          // Opponent flies diagonally into the sky — slingshot angle
          rumbleGolgarPhase = 4;
          winFighter.state = 'idle';
          loseFighter.x += dir * 10; // strong horizontal — slingshot
          loseFighter.y += rumbleGolgarLaunchVy;
          rumbleGolgarLaunchVy -= 0.15; // gentler upward accel so angle stays diagonal
          loseFighter.grounded = false;
          loseFighter._rumbleRotation = (loseFighter._rumbleRotation || 0) + 0.2 * dir;
          if (loseFighter.y < -100) {
            rumbleLoserHidden = true;
          }
          // Entities return to center
          const midX = (entity1TargetX + entity2TargetX) / 2;
          winFighter.x += (midX - 30 - winFighter.x) * 0.05;
          e2.x += (midX + 30 - e2.x) * 0.05;
        } else if (rumbleTimer <= highFiveHit) {
          // Walk toward each other for high-five
          rumbleGolgarPhase = 5;
          winFighter.state = 'idle';
          winFighter._hideFrontArm = true; // hide normal arm, we draw raised arm
          const midX = rumbleGolgarOpX;
          winFighter.x += (midX - 35 - winFighter.x) * 0.12;
          e2.x += (midX + 35 - e2.x) * 0.12;
          winFighter.facing = 1;
          e2.facing = -1;
          rumbleLoserHidden = true;
        } else if (rumbleTimer <= highFiveHit + 30) {
          // High-five hold
          rumbleGolgarPhase = 6;
          winFighter.state = 'idle';
          winFighter._hideFrontArm = true;
          const midX = rumbleGolgarOpX;
          winFighter.x = midX - 35;
          e2.x = midX + 35;
          winFighter.facing = 1;
          e2.facing = -1;
          if (rumbleTimer === highFiveHit + 1) {
            shakeTimer = 3;
            shakeIntensity = 2;
          }
        } else {
          // Settle
          rumbleGolgarPhase = 7;
          winFighter.state = 'idle';
          winFighter._hideFrontArm = false;
        }

        if (rumbleTimer >= endFrame) {
          loseFighter._rumbleRotation = 0;
          winFighter._hideFrontArm = false;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'TELATRINE') {
        const pickupStart = 40;
        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        const walkSpeed = 2.5;

        if (rumbleTelatrinePhase === 0) {
          winFighter.facing = dir;
          const dist = Math.abs(loseFighter.x - winFighter.x);
          if (dist > 40) {
            winFighter.x += dir * walkSpeed;
          } else if (rumbleTimer >= pickupStart) {
            rumbleTelatrinePhase = 1;
          }
        } else if (rumbleTelatrinePhase === 1) {
          winFighter.facing = dir;
          const liftT = Math.min(1, (rumbleTimer - pickupStart) / 20);
          loseFighter.x = winFighter.x;
          loseFighter.y = winFighter.y - 50 - liftT * 30;
          loseFighter.grounded = false;
          loseFighter._rumbleScale = 0.8;
          if (liftT >= 1) {
            rumbleTelatrinePhase = 2;
            winFighter.facing = winFighter.x < 480 ? -1 : 1;
          }
        } else if (rumbleTelatrinePhase === 2) {
          winFighter.x += winFighter.facing * walkSpeed;
          loseFighter.x = winFighter.x;
          loseFighter.y = winFighter.y - 80;
          if (winFighter.x < -30 || winFighter.x > 990) {
            rumbleTelatrinePhase = 3;
            rumbleLoserHidden = true;
            winFighter._rumbleAlpha = 0;
            loseFighter._rumbleAlpha = 0;
            loseFighter._rumbleScale = undefined;
            rumbleTelatrineShrug = 0;
          }
        } else if (rumbleTelatrinePhase === 3) {
          winFighter._rumbleAlpha = 0;
          rumbleTelatrineShrug++;
          if (rumbleTelatrineShrug >= 50) {
            rumbleTelatrinePhase = 4;
            if (winFighter.facing === 1) {
              winFighter.x = -20;
            } else {
              winFighter.x = 980;
            }
            winFighter._rumbleAlpha = 1;
            rumbleTelatrineShrug = 0;
          }
        } else if (rumbleTelatrinePhase === 4) {
          winFighter._rumbleAlpha = 1;
          winFighter.x += winFighter.facing * walkSpeed;
          const targetX = 480 + winFighter.facing * 100;
          if ((winFighter.facing === 1 && winFighter.x >= targetX) ||
              (winFighter.facing === -1 && winFighter.x <= targetX)) {
            rumbleTelatrinePhase = 5;
            winFighter.vx = 0;
            rumbleTelatrineShrug = 0;
          }
        } else if (rumbleTelatrinePhase === 5) {
          winFighter.state = 'idle';
          winFighter.vx = 0;
          winFighter._hideFrontArm = true;
          winFighter._hideBackArm = true;
          rumbleTelatrineShrug++;
        }

        if (rumbleTelatrinePhase <= 2 || rumbleTelatrinePhase === 4) {
          winFighter.animTimer++;
          if (winFighter.animTimer > 6) { winFighter.animTimer = 0; winFighter.animFrame = (winFighter.animFrame + 1) % 4; }
        }

        if (rumbleTelatrinePhase === 5 && rumbleTelatrineShrug >= 80) {
          winFighter._rumbleAlpha = undefined;
          loseFighter._rumbleAlpha = undefined;
          loseFighter._rumbleScale = undefined;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'CORVIDA') {
        // Corvida "Early Bird": ~480 frames
        // 0-40: Corvida transforms to giant blue jay
        // 40-80: Flies to center, drops nest on ground
        // 80-140: Lays 3 eggs into the nest
        // 140-190: Swoops to grab opponent
        // 190-240: Lifts opponent, hovers above nest
        // 240-290: Eggs hatch, chicks open mouths
        // 290-320: Drops opponent into a chick's mouth
        // 320-380: Gulp, chick satisfied
        // 380-480: Corvida lands, transforms back
        const transformEnd = 40;
        const nestDropEnd = 80;
        const layEnd = 140;
        const swoopEnd = 190;
        const hoverEnd = 240;
        const hatchEnd = 290;
        const dropFrame = 305;
        const gulpEnd = 380;
        const endFrame = 480;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        const centerX = 480;
        const groundY = loseFighter.groundY;

        if (rumbleTimer === 1) {
          rumbleCorvidaNestX = centerX;
          // Giant eggs — positions relative to nest center, with falling state
          rumbleCorvidaEggs = [
            { x: centerX - 40, y: groundY - 15, fallY: -100, falling: false, landed: false, hatched: false },
            { x: centerX, y: groundY - 18, fallY: -100, falling: false, landed: false, hatched: false },
            { x: centerX + 40, y: groundY - 15, fallY: -100, falling: false, landed: false, hatched: false }
          ];
          rumbleCorvidaGulpChick = -1;
          rumbleCorvidaPhase = 0;
        }

        // Egg fall frames (staggered during lay phase)
        const eggDropFrames = [85, 105, 125];
        // Update falling eggs
        for (let i = 0; i < rumbleCorvidaEggs.length; i++) {
          const egg = rumbleCorvidaEggs[i];
          if (rumbleTimer === eggDropFrames[i]) {
            egg.falling = true;
            egg.fallY = winFighter.y + 30; // start from jay's position
            egg.fallVy = 0;
          }
          if (egg.falling && !egg.landed) {
            egg.fallVy += 0.8;
            egg.fallY += egg.fallVy;
            if (egg.fallY >= egg.y) {
              egg.fallY = egg.y;
              egg.landed = true;
              egg.falling = false;
              shakeTimer = 4;
              shakeIntensity = 3;
            }
          }
        }

        if (rumbleTimer <= transformEnd) {
          // Transform — grow into giant jay, hide normal fighter
          rumbleCorvidaPhase = 0;
          winFighter._rumbleAlpha = Math.max(0, 1 - rumbleTimer / 20);
          winFighter.vx = 0;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= nestDropEnd) {
          // Fly as giant jay to center, drop nest
          rumbleCorvidaPhase = 1;
          winFighter._rumbleAlpha = 0;
          const t = (rumbleTimer - transformEnd) / (nestDropEnd - transformEnd);
          winFighter.x = winFighter.x + (centerX - winFighter.x) * 0.08;
          winFighter.y = groundY - 80 - t * 60;
        } else if (rumbleTimer <= layEnd) {
          // Hover above nest and lay eggs (they fall from jay)
          rumbleCorvidaPhase = 2;
          winFighter._rumbleAlpha = 0;
          winFighter.x += (centerX - winFighter.x) * 0.1;
          winFighter.y = groundY - 200 + Math.sin(rumbleTimer * 0.08) * 5;
        } else if (rumbleTimer <= swoopEnd) {
          // Swoop to grab opponent
          rumbleCorvidaPhase = 3;
          winFighter._rumbleAlpha = 0;
          const t = (rumbleTimer - layEnd) / (swoopEnd - layEnd);
          const ease = t * t;
          winFighter.x += (loseFighter.x - winFighter.x) * 0.1;
          winFighter.y = (groundY - 200) + ((loseFighter.y - 40) - (groundY - 200)) * ease;
          winFighter.facing = loseFighter.x > winFighter.x ? 1 : -1;
        } else if (rumbleTimer <= hoverEnd) {
          // Lift opponent in talons, hover above nest
          rumbleCorvidaPhase = 4;
          winFighter._rumbleAlpha = 0;
          // Opponent is visible, dangling below the jay
          loseFighter._rumbleScale = 0.7; // slightly smaller in talons
          loseFighter.grounded = false;
          // Fly back above nest
          winFighter.x += (centerX - winFighter.x) * 0.08;
          winFighter.y += ((groundY - 200) - winFighter.y) * 0.08;
          // Opponent follows below the jay (in talons)
          loseFighter.x = winFighter.x;
          loseFighter.y = winFighter.y + 70;
        } else if (rumbleTimer <= hatchEnd) {
          // Eggs hatch, opponent still held
          rumbleCorvidaPhase = 5;
          winFighter._rumbleAlpha = 0;
          loseFighter._rumbleScale = 0.7;
          winFighter.x += (centerX - winFighter.x) * 0.05;
          winFighter.y = groundY - 200 + Math.sin(rumbleTimer * 0.08) * 3;
          loseFighter.x = winFighter.x;
          loseFighter.y = winFighter.y + 70;
          // Hatch eggs progressively
          const hatchProgress = (rumbleTimer - hoverEnd) / (hatchEnd - hoverEnd);
          if (hatchProgress > 0.2 && !rumbleCorvidaEggs[0].hatched) { rumbleCorvidaEggs[0].hatched = true; shakeTimer = 3; shakeIntensity = 2; }
          if (hatchProgress > 0.5 && !rumbleCorvidaEggs[1].hatched) { rumbleCorvidaEggs[1].hatched = true; shakeTimer = 3; shakeIntensity = 2; }
          if (hatchProgress > 0.8 && !rumbleCorvidaEggs[2].hatched) { rumbleCorvidaEggs[2].hatched = true; shakeTimer = 3; shakeIntensity = 2; }
          if (rumbleCorvidaGulpChick < 0) {
            rumbleCorvidaGulpChick = 1; // center chick
          }
        } else if (rumbleTimer <= dropFrame) {
          // Drop the opponent into the chick's mouth
          rumbleCorvidaPhase = 6;
          winFighter._rumbleAlpha = 0;
          const t = (rumbleTimer - hatchEnd) / (dropFrame - hatchEnd);
          const targetChick = rumbleCorvidaEggs[rumbleCorvidaGulpChick];
          // Opponent falls from jay toward the chick's open mouth
          const chickMouthY = targetChick.y - 50; // above the chick head
          loseFighter.x += (targetChick.x - loseFighter.x) * 0.15;
          loseFighter.y += (chickMouthY - loseFighter.y) * 0.12;
          loseFighter._rumbleScale = Math.max(0.3, 0.7 - t * 0.4);
        } else if (rumbleTimer <= gulpEnd) {
          // Gulp — opponent disappears
          rumbleCorvidaPhase = 7;
          winFighter._rumbleAlpha = 0;
          rumbleLoserHidden = true;
          loseFighter._rumbleAlpha = undefined;
          loseFighter._rumbleScale = undefined;
          winFighter.y = groundY - 200 + Math.sin(rumbleTimer * 0.06) * 5;
        } else {
          // Land and transform back — land beside the nest, not on it
          rumbleCorvidaPhase = 8;
          const t = (rumbleTimer - gulpEnd) / (endFrame - gulpEnd);
          winFighter._rumbleAlpha = Math.min(1, t * 2);
          // Move to side of nest
          const landX = centerX + 150;
          winFighter.x += (landX - winFighter.x) * 0.08;
          winFighter.y += (groundY - winFighter.y) * 0.06;
          if (t > 0.5) {
            winFighter.x = landX;
            winFighter.y = groundY;
            winFighter.grounded = true;
          }
          winFighter.facing = -1; // face the nest
          winFighter.state = 'idle';
        }

        if (rumbleTimer >= endFrame) {
          winFighter._rumbleAlpha = undefined;
          loseFighter._rumbleAlpha = undefined;
          loseFighter._rumbleScale = undefined;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'CODEMAX') {
        // Codemax "Your New Overlord": ~360 frames
        // 0-30: Codemax raises hand, charges laser
        // 30-60: Green pixelated laser fires at opponent
        // 60-100: Opponent pixelates (level 1 — large pixels)
        // 100-140: Pixelate level 2 — larger pixels
        // 140-180: Pixelate level 3 — very large pixels
        // 180-220: Pixelate level 4 — barely recognizable
        // 220-300: Glitch and blink out
        // 300-360: Settle
        const chargeEnd = 30;
        const laserEnd = 60;
        const pixel1End = 100;
        const pixel2End = 140;
        const pixel3End = 180;
        const pixel4End = 220;
        const glitchEnd = 300;
        const endFrame = 360;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer <= chargeEnd) {
          // Charge up — arm raised
          winFighter.state = 'attack';
          rumbleCodemaxLaser = false;
          rumbleCodemaxPixelLevel = 0;
        } else if (rumbleTimer <= laserEnd) {
          // Fire laser
          winFighter.state = 'attack';
          rumbleCodemaxLaser = true;
          // Spawn laser particles along the beam
          if (rumbleTimer % 2 === 0) {
            const sx = winFighter.x + dir * 25;
            const sy = winFighter.y - 35;
            const ex = loseFighter.x;
            const ey = loseFighter.y - 30;
            for (let i = 0; i < 5; i++) {
              const t = Math.random();
              rumbleCodemaxLaserParticles.push({
                x: sx + (ex - sx) * t + (Math.random() - 0.5) * 8,
                y: sy + (ey - sy) * t + (Math.random() - 0.5) * 8,
                size: 3 + Math.random() * 5,
                alpha: 0.8,
                life: 15 + Math.random() * 10
              });
            }
          }
          if (rumbleTimer === laserEnd) {
            loseFighter.flashTimer = 10;
            shakeTimer = 8;
            shakeIntensity = 4;
          }
        } else if (rumbleTimer <= pixel1End) {
          winFighter.state = 'idle';
          rumbleCodemaxLaser = false;
          rumbleCodemaxPixelLevel = 1;
          loseFighter._rumbleAlpha = 0; // hide real fighter, show pixel version
        } else if (rumbleTimer <= pixel2End) {
          rumbleCodemaxPixelLevel = 2;
          loseFighter._rumbleAlpha = 0;
          if (rumbleTimer === pixel1End + 1) {
            shakeTimer = 4; shakeIntensity = 3;
          }
        } else if (rumbleTimer <= pixel3End) {
          rumbleCodemaxPixelLevel = 3;
          loseFighter._rumbleAlpha = 0;
          if (rumbleTimer === pixel2End + 1) {
            shakeTimer = 4; shakeIntensity = 3;
          }
        } else if (rumbleTimer <= pixel4End) {
          rumbleCodemaxPixelLevel = 4;
          loseFighter._rumbleAlpha = 0;
          if (rumbleTimer === pixel3End + 1) {
            shakeTimer = 6; shakeIntensity = 5;
          }
        } else if (rumbleTimer <= glitchEnd) {
          // Glitch out phase
          rumbleCodemaxPixelLevel = 4;
          loseFighter._rumbleAlpha = 0;
          rumbleCodemaxGlitch = rumbleTimer - pixel4End;
          // Opponent fully gone after enough glitching
          if (rumbleCodemaxGlitch > 40) {
            rumbleLoserHidden = true;
            rumbleCodemaxPixelLevel = 0;
          }
        } else {
          // Settle
          winFighter.state = 'idle';
          rumbleLoserHidden = true;
          rumbleCodemaxPixelLevel = 0;
          rumbleCodemaxGlitch = 0;
        }

        // Update laser particles
        for (let i = rumbleCodemaxLaserParticles.length - 1; i >= 0; i--) {
          const p = rumbleCodemaxLaserParticles[i];
          p.life--;
          p.alpha = Math.max(0, p.life / 15);
          if (p.life <= 0) rumbleCodemaxLaserParticles.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'HAYSTACK') {
        // Haystack "Don't Fear the Reaper": ~380 frames
        // 0-40: Arms out, ravens fly in from edges
        // 40-80: Ravens grab and lift Haystack into the air
        // 80-120: Reaches into chest, pulls out scythe
        // 120-160: Hover in place, scythe gleams
        // 160-200: Ravens dive bomb toward opponent
        // 200-210: Scythe strike
        // 210-300: Opponent dissolves into dust
        // 300-380: Dust dissipates, Haystack lands
        const ravensArriveEnd = 40;
        const liftEnd = 80;
        const scytheEnd = 120;
        const hoverEnd = 160;
        const diveEnd = 200;
        const strikeFrame = 205;
        const dissolveEnd = 300;
        const endFrame = 380;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        // Spawn ravens at start
        if (rumbleTimer === 1) {
          rumbleHaystackRavens = [];
          for (let i = 0; i < 4; i++) {
            rumbleHaystackRavens.push({
              x: i < 2 ? -50 - i * 40 : 1010 + (i - 2) * 40,
              y: 50 + i * 30,
              wingPhase: Math.random() * Math.PI * 2,
              offsetX: (i - 1.5) * 20,
              offsetY: (i % 2) * 15 - 7
            });
          }
        }

        if (rumbleTimer <= ravensArriveEnd) {
          // Arms out, ravens fly toward Haystack
          winFighter.state = 'idle';
          const t = rumbleTimer / ravensArriveEnd;
          for (const r of rumbleHaystackRavens) {
            const targetX = winFighter.x + r.offsetX;
            const targetY = winFighter.y - 40 + r.offsetY;
            r.x += (targetX - r.x) * 0.08;
            r.y += (targetY - r.y) * 0.08;
          }
        } else if (rumbleTimer <= liftEnd) {
          // Ravens lift Haystack into the air
          const t = (rumbleTimer - ravensArriveEnd) / (liftEnd - ravensArriveEnd);
          const liftY = winFighter.groundY - 120 * t;
          winFighter.y = liftY;
          winFighter.grounded = false;
          winFighter.state = 'idle';
          // Ravens stay around Haystack
          for (const r of rumbleHaystackRavens) {
            r.x += (winFighter.x + r.offsetX - r.x) * 0.15;
            r.y += (winFighter.y - 20 + r.offsetY - r.y) * 0.15;
          }
        } else if (rumbleTimer <= scytheEnd) {
          // Reaches into chest and pulls out scythe
          winFighter.state = 'attack';
          if (rumbleTimer === liftEnd + 20) {
            rumbleHaystackScythe = true;
          }
          for (const r of rumbleHaystackRavens) {
            r.x += (winFighter.x + r.offsetX - r.x) * 0.1;
            r.y += (winFighter.y - 20 + r.offsetY - r.y) * 0.1;
          }
        } else if (rumbleTimer <= hoverEnd) {
          // Hover menacingly
          winFighter.state = 'idle';
          winFighter.y = winFighter.groundY - 120 + Math.sin(rumbleTimer * 0.08) * 5;
          for (const r of rumbleHaystackRavens) {
            r.x += (winFighter.x + r.offsetX - r.x) * 0.1;
            r.y += (winFighter.y - 20 + r.offsetY - r.y) * 0.1;
          }
        } else if (rumbleTimer <= diveEnd) {
          // Dive bomb toward opponent — store start position once
          if (!rumbleHaystackDiveStart) {
            rumbleHaystackDiveStart = { x: winFighter.x, y: winFighter.groundY - 120 };
          }
          const t = (rumbleTimer - hoverEnd) / (diveEnd - hoverEnd);
          const ease = t * t; // accelerating
          const targetX = loseFighter.x - dir * 40;
          const targetY = loseFighter.y - 30;
          winFighter.x = rumbleHaystackDiveStart.x + (targetX - rumbleHaystackDiveStart.x) * ease;
          winFighter.y = rumbleHaystackDiveStart.y + (targetY - rumbleHaystackDiveStart.y) * ease;
          winFighter.state = 'attack';
          // Ravens follow
          for (const r of rumbleHaystackRavens) {
            r.x += (winFighter.x + r.offsetX - r.x) * 0.2;
            r.y += (winFighter.y - 20 + r.offsetY - r.y) * 0.2;
          }
        } else if (rumbleTimer <= strikeFrame) {
          // Strike!
          winFighter.state = 'attack';
          if (rumbleTimer === strikeFrame && !rumbleHaystackStrike) {
            rumbleHaystackStrike = true;
            shakeTimer = 20;
            shakeIntensity = 12;
            loseFighter.flashTimer = 10;
            // Spawn dust particles from opponent
            for (let i = 0; i < 30; i++) {
              rumbleHaystackDust.push({
                x: loseFighter.x + (Math.random() - 0.5) * 30,
                y: loseFighter.y - 30 + (Math.random() - 0.5) * 50,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 3 - 1,
                size: 3 + Math.random() * 8,
                alpha: 0.8 + Math.random() * 0.2,
                color: ['#aa9966', '#887755', '#ccbb88', '#665533'][Math.floor(Math.random() * 4)]
              });
            }
          }
        } else if (rumbleTimer <= dissolveEnd) {
          // Opponent dissolves, Haystack lands
          winFighter.state = 'idle';
          rumbleLoserHidden = true;

          // Haystack descends back to ground
          const landT = Math.min(1, (rumbleTimer - strikeFrame) / 40);
          winFighter.y = (loseFighter.y - 30) + (winFighter.groundY - (loseFighter.y - 30)) * landT;
          if (landT >= 1) {
            winFighter.y = winFighter.groundY;
            winFighter.grounded = true;
          }

          // Ravens scatter
          for (const r of rumbleHaystackRavens) {
            r.x += r.offsetX > 0 ? 3 : -3;
            r.y -= 1.5;
          }
        } else {
          winFighter.state = 'idle';
          winFighter.y = winFighter.groundY;
          winFighter.grounded = true;
        }

        // Update dust particles
        for (let i = rumbleHaystackDust.length - 1; i >= 0; i--) {
          const d = rumbleHaystackDust[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy -= 0.02; // rise slightly
          d.vx *= 0.98;
          d.size *= 0.995;
          d.alpha -= 0.006;
          if (d.alpha <= 0) rumbleHaystackDust.splice(i, 1);
        }

        // Update raven wing animation
        for (const r of rumbleHaystackRavens) {
          r.wingPhase += 0.15;
        }

        if (rumbleTimer >= endFrame) {
          rumbleHaystackScythe = false;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'SNAZZ MCJAZZ') {
        // Snazz McJazz "Annie, are you okay?": ~400 frames
        // 0-30: Disco ball descends from ceiling
        // 30-300: Snazz dances toward opponent, confetti falls
        // 300-310: Snazz stops, winds up punch
        // 310-315: Punch connects
        // 315-400: Opponent falls, disco ball rises, confetti settles
        const discoDownEnd = 30;
        const danceEnd = 300;
        const windupEnd = 310;
        const punchFrame = 313;
        const endFrame = 400;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;

        if (rumbleTimer <= discoDownEnd) {
          // Disco ball descends
          winFighter.state = 'idle';
          winFighter.vx = 0;
          if (!rumbleSnazzDiscoBall) {
            rumbleSnazzDiscoBall = { y: -30, targetY: 60 };
          }
          const t = rumbleTimer / discoDownEnd;
          rumbleSnazzDiscoBall.y = -30 + (rumbleSnazzDiscoBall.targetY + 30) * t * t;
        } else if (rumbleTimer <= danceEnd) {
          // Dance phase — Snazz dances toward opponent
          winFighter.dancing = true;
          winFighter.danceTimer = 999; // keep dancing

          // Move toward opponent slowly
          const distToOpponent = Math.abs(loseFighter.x - winFighter.x);
          if (distToOpponent > 50) {
            winFighter.x += dir * 1.2;
          }

          // Spawn confetti
          if (rumbleTimer % 4 === 0) {
            for (let i = 0; i < 3; i++) {
              rumbleSnazzConfetti.push({
                x: 100 + Math.random() * 760,
                y: -10 - Math.random() * 30,
                vx: (Math.random() - 0.5) * 2,
                vy: 1 + Math.random() * 2,
                size: 3 + Math.random() * 4,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.2,
                color: ['#ff00ff', '#00ffff', '#ff4400', '#44ff00', '#ffff00', '#ff66aa', '#6644ff'][Math.floor(Math.random() * 7)],
                alpha: 1
              });
            }
          }
        } else if (rumbleTimer <= windupEnd) {
          // Stop dancing, face opponent, wind up
          winFighter.dancing = false;
          winFighter.danceTimer = 0;
          winFighter.vx = 0;
          winFighter.state = 'idle';
          // Step right up to opponent
          const targetX = loseFighter.x - dir * 45;
          const t = (rumbleTimer - danceEnd) / (windupEnd - danceEnd);
          winFighter.x += (targetX - winFighter.x) * 0.3;
        } else if (rumbleTimer <= punchFrame) {
          // Punch!
          winFighter.state = 'attack';
          winFighter.currentAttack = 'jab';
        } else if (rumbleTimer === punchFrame + 1) {
          // Punch connects
          rumbleSnazzPunchLanded = true;
          loseFighter.flashTimer = 8;
          shakeTimer = 15;
          shakeIntensity = 10;
          loseFighter.state = 'hitstun';
          winFighter.state = 'idle';
        } else {
          // Aftermath — opponent falls, disco ball rises
          winFighter.state = 'idle';
          winFighter.vx = 0;

          // Opponent falls to ground
          if (!loseFighter.grounded || loseFighter.y < loseFighter.groundY) {
            loseFighter.vy = (loseFighter.vy || 0) + 0.5;
            loseFighter.y += loseFighter.vy;
            if (loseFighter.y >= loseFighter.groundY) {
              loseFighter.y = loseFighter.groundY;
              loseFighter.grounded = true;
            }
          }

          // Opponent lies flat (knocked out)
          loseFighter._rumbleRotation = dir * Math.PI / 2;

          // Disco ball rises back up
          if (rumbleSnazzDiscoBall) {
            rumbleSnazzDiscoBall.y -= 1.5;
          }
        }

        // Update confetti
        for (let i = rumbleSnazzConfetti.length - 1; i >= 0; i--) {
          const c = rumbleSnazzConfetti[i];
          c.x += c.vx;
          c.y += c.vy;
          c.vx += (Math.random() - 0.5) * 0.1; // flutter
          c.vy += 0.02;
          c.rot += c.rotSpeed;
          if (c.y > 550) {
            c.alpha -= 0.05;
          }
          if (rumbleTimer > danceEnd) {
            c.alpha -= 0.008;
          }
          if (c.alpha <= 0) rumbleSnazzConfetti.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          winFighter.dancing = false;
          winFighter.danceTimer = 0;
          // Keep loseFighter._rumbleRotation so they stay knocked down on victory screen
          gameState = 'victory';
        }
      }

      if (rumbleType === 'TORRENA') {
        // Torrena "Cloudy, with a chance of demise": ~420 frames
        // 0-30: Enter water phase (go translucent)
        // 30-70: Evaporate — rise up as steam particles, fighter fades out
        // 70-90: Cloud forms above opponent
        // 90-280: Heavy rain pummels opponent
        // 280-300: Hailstone forms and drops
        // 300-330: Impact + crush
        // 330-420: Settle, transition to victory
        const waterEnd = 30;
        const evapEnd = 70;
        const cloudFormEnd = 90;
        const rainEnd = 280;
        const hailFormEnd = 295;
        const hailImpact = 340;
        const endFrame = 440;

        const cloudTargetX = loseFighter.x;
        const cloudTargetY = 60;

        winFighter.vx = 0;

        if (rumbleTimer <= waterEnd) {
          // Phase 0: Enter water phase
          rumbleTorrenaPhase = 0;
          winFighter.waterPhase = true;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= evapEnd) {
          // Phase 1: Evaporate — spawn steam particles rising from fighter position
          rumbleTorrenaPhase = 1;
          winFighter.waterPhase = true;
          const evapT = (rumbleTimer - waterEnd) / (evapEnd - waterEnd);
          // Fade out the winner (we'll use a custom alpha via a flag)
          winFighter._rumbleAlpha = Math.max(0, 1 - evapT * 1.5);
          // Spawn steam particles
          if (rumbleTimer % 2 === 0) {
            for (let i = 0; i < 3; i++) {
              rumbleTorrenaEvapParticles.push({
                x: winFighter.x + (Math.random() - 0.5) * 30,
                y: winFighter.y - 30 + (Math.random() - 0.5) * 40,
                vx: (Math.random() - 0.5) * 1.5,
                vy: -1.5 - Math.random() * 2,
                size: 3 + Math.random() * 5,
                alpha: 0.6 + Math.random() * 0.3,
                color: `rgba(100,200,255,`
              });
            }
          }
          if (evapT >= 0.8) {
            // Start hiding winner
            rumbleLoserHidden = false; // make sure loser still visible
          }
        } else if (rumbleTimer <= cloudFormEnd) {
          // Phase 2: Cloud forms above opponent, winner is invisible
          rumbleTorrenaPhase = 2;
          winFighter._rumbleAlpha = 0;
          const formT = (rumbleTimer - evapEnd) / (cloudFormEnd - evapEnd);
          rumbleTorrenaCloudX = cloudTargetX;
          rumbleTorrenaCloudY = cloudTargetY + (1 - formT) * 40;
        } else if (rumbleTimer <= rainEnd) {
          // Phase 3: Heavy rain pummels opponent
          rumbleTorrenaPhase = 3;
          winFighter._rumbleAlpha = 0;
          rumbleTorrenaCloudX = cloudTargetX + Math.sin(rumbleTimer * 0.05) * 15;
          rumbleTorrenaCloudY = cloudTargetY;

          // Spawn raindrops from cloud
          if (rumbleTimer % 2 === 0) {
            for (let i = 0; i < 4; i++) {
              rumbleRaindrops.push({
                x: rumbleTorrenaCloudX + (Math.random() - 0.5) * 80,
                y: rumbleTorrenaCloudY + 25 + Math.random() * 10,
                vx: (Math.random() - 0.5) * 0.5,
                vy: 6 + Math.random() * 4,
                size: 1 + Math.random() * 2,
                alpha: 0.7 + Math.random() * 0.3
              });
            }
          }

          // Rain hits opponent — flash and shake periodically
          if (rumbleTimer % 15 === 0) {
            loseFighter.flashTimer = 3;
            shakeTimer = 3;
            shakeIntensity = 2;
          }

          // Push opponent down slightly (staggering under rain)
          loseFighter.state = 'hitstun';
        } else if (rumbleTimer <= hailFormEnd) {
          // Phase 4: Hailstone forms — rain stops, ominous pause
          rumbleTorrenaPhase = 4;
          winFighter._rumbleAlpha = 0;
          rumbleTorrenaCloudX = cloudTargetX;
          // Cloud darkens (handled in draw)
          loseFighter.state = 'idle';
          if (rumbleTimer === rainEnd + 1) {
            // Create hailstone above cloud
            rumbleHailstone = {
              x: cloudTargetX,
              y: cloudTargetY - 20,
              vy: 0,
              size: 0
            };
          }
          if (rumbleHailstone) {
            // Hailstone grows
            const growT = (rumbleTimer - rainEnd) / (hailFormEnd - rainEnd);
            rumbleHailstone.size = 25 * growT;
          }
        } else if (rumbleTimer <= hailImpact) {
          // Phase 5: Hailstone drops
          rumbleTorrenaPhase = 5;
          winFighter._rumbleAlpha = 0;
          if (rumbleHailstone) {
            rumbleHailstone.vy += 1.8;
            rumbleHailstone.y += rumbleHailstone.vy;
            // Check if hailstone reached opponent
            if (rumbleHailstone.y >= loseFighter.y - 30 && !rumbleHailCracked) {
              rumbleHailstone.y = loseFighter.groundY - rumbleHailstone.size;
              rumbleLoserHidden = true;
              rumbleHailCracked = true;
              shakeTimer = 30;
              shakeIntensity = 15;
              // Spawn hailstone shards flying outward
              for (let i = 0; i < 25; i++) {
                const angle = -Math.PI * Math.random(); // mostly upward
                const speed = 3 + Math.random() * 6;
                rumbleHailShards.push({
                  x: loseFighter.x + (Math.random() - 0.5) * 30,
                  y: loseFighter.groundY - 10,
                  vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
                  vy: -2 - Math.random() * 5,
                  size: 2 + Math.random() * 6,
                  alpha: 1,
                  rot: Math.random() * Math.PI * 2,
                  rotSpeed: (Math.random() - 0.5) * 0.3
                });
              }
            }
          }
        } else {
          // Phase 6: Settle — cloud fades, winner reappears
          rumbleTorrenaPhase = 6;
          const settleT = (rumbleTimer - hailImpact) / (endFrame - hailImpact);
          winFighter._rumbleAlpha = Math.min(1, settleT * 1.5);
          winFighter.waterPhase = settleT < 0.5;
          // Move winner back to ground near opponent
          if (rumbleTimer === hailImpact + 1) {
            winFighter.x = loseFighter.x + (winFighter.x > loseFighter.x ? 60 : -60);
          }
          winFighter.state = 'idle';
        }

        // Update evaporation particles
        for (let i = rumbleTorrenaEvapParticles.length - 1; i >= 0; i--) {
          const p = rumbleTorrenaEvapParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy *= 0.98;
          p.alpha -= 0.01;
          if (p.alpha <= 0) rumbleTorrenaEvapParticles.splice(i, 1);
        }

        // Update raindrops
        for (let i = rumbleRaindrops.length - 1; i >= 0; i--) {
          const r = rumbleRaindrops[i];
          r.x += r.vx;
          r.y += r.vy;
          r.vy += 0.1;
          if (r.y > loseFighter.groundY + 5) {
            r.alpha -= 0.15;
          }
          if (r.alpha <= 0 || r.y > 550) rumbleRaindrops.splice(i, 1);
        }

        // Update hail shards
        for (let i = rumbleHailShards.length - 1; i >= 0; i--) {
          const s = rumbleHailShards[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.25;
          s.rot += s.rotSpeed;
          if (s.y > loseFighter.groundY) {
            s.y = loseFighter.groundY;
            s.vy *= -0.3;
            s.vx *= 0.7;
            if (Math.abs(s.vy) < 0.5) {
              s.vy = 0;
              s.alpha -= 0.015;
            }
          }
          if (s.alpha <= 0) rumbleHailShards.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          winFighter._rumbleAlpha = undefined;
          winFighter.waterPhase = false;
          gameState = 'victory';
        }
      }

      // Animate winner
      winFighter.animTimer++;
      if (winFighter.animTimer > 8) { winFighter.animTimer = 0; winFighter.animFrame = (winFighter.animFrame + 1) % 4; }
    } else {
      // Normal finishHim phase — winner moves, timer counts down
      finishHimTimer++;
      frameCount++;
      if (shakeTimer > 0) shakeTimer--;
      // Winner keeps acting
      if (winner === 'player') {
        winFighter.update(loseFighter, keys);
      } else {
        winFighter.update(loseFighter, {});
      }
      if (finishHimTimer >= FINISH_HIM_DURATION && gameMode !== 'rumblePractice') {
        gameState = 'victory';
      }
    }

    // Loser stays passive: idle, no movement, still animates
    loseFighter.vx = 0;
    loseFighter.state = 'idle';
    loseFighter.blocking = false;
    if (loseFighter.flashTimer > 0) loseFighter.flashTimer--;
    if (loseFighter.hitEffect) {
      loseFighter.hitEffect.timer--;
      if (loseFighter.hitEffect.timer <= 0) loseFighter.hitEffect = null;
    }
    loseFighter.animTimer++;
    if (loseFighter.animTimer > 8) { loseFighter.animTimer = 0; loseFighter.animFrame = (loseFighter.animFrame + 1) % 4; }
    // Apply gravity so loser lands if airborne (skip during Bojdo launch)
    const bojdoLaunching = (rumbleType === 'BOJDO' || rumbleType === 'BOJDOBOJDO') && rumbleActive && (rumbleSubType === 'pellet' ? rumbleTimer > 110 : rumbleSubType === 'massiv');
    const rubberSwinging = rumbleType === 'RUBBERMAN' && rumbleActive;
    const golgarLaunching = rumbleType === 'GOLGAR' && rumbleActive;
    const telatrineCarrying = rumbleType === 'TELATRINE' && rumbleActive;
    if (!loseFighter.grounded && !bojdoLaunching && !rubberSwinging && !golgarLaunching && !telatrineCarrying) {
      loseFighter.vy += 0.6;
      loseFighter.y += loseFighter.vy;
      if (loseFighter.y >= loseFighter.groundY) {
        loseFighter.y = loseFighter.groundY;
        loseFighter.vy = 0;
        loseFighter.grounded = true;
      }
    }
  }
}

// [Extracted to screens/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

function draw() {
  ctx.clearRect(0, 0, 960, 540);

  switch (gameState) {
    case 'title':
      drawTitleScreen();
      break;

    case 'charSelect':
      drawCharSelectScreen();
      break;

    case 'practiceTargetSelect':
      drawPracticeTargetScreen();
      break;

    case 'assistSelect':
      drawAssistSelectScreen();
      break;

    case 'difficultySelect':
      drawDifficultySelectScreen();
      break;

    case 'levelSelect':
      drawLevelSelectScreen();
      break;

    case 'versus':
      versusTimer++;
      if (versusTimer >= VERSUS_DURATION) {
        if (gameMode === 'rumblePractice') {
          startRumblePractice();
        } else {
          startFight();
        }
      } else {
        drawVersusScreen();
      }
      break;

    case 'fight':
      ctx.save();
      if (shakeTimer > 0) {
        ctx.translate(
          (Math.random() - 0.5) * shakeIntensity,
          (Math.random() - 0.5) * shakeIntensity
        );
      }
      drawBackground();
      player.draw(ctx);
      cpu.draw(ctx);
      drawHUD();
      // Backtrack rewind screen flash
      const btEffect = player.btRewindEffect || cpu.btRewindEffect || 0;
      if (btEffect > 0) {
        ctx.save();
        ctx.globalAlpha = btEffect / 40 * 0.5;
        ctx.fillStyle = '#b44dff';
        ctx.fillRect(0, 0, 960, 540);
        // Rewind text
        ctx.globalAlpha = Math.min(1, btEffect / 20);
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText('⏪ REWIND ⏪', 480, 270);
        ctx.restore();
      }
      ctx.restore();
      if (paused) drawPauseOverlay();
      break;

    case 'finishHim':
      ctx.save();
      drawBackground();
      {
        const loserF = winner === 'player' ? cpu : player;
        const winnerF = winner === 'player' ? player : cpu;
        // Draw winner — clip if gargantuan (Death from Above)
        if (rumbleType === 'BOJDOBOJDO' && rumbleSubType === 'massiv' && winnerF.bojdoScale > 2) {
          ctx.save();
          // Only show the bottom portion of the giant — clip top of screen
          ctx.beginPath();
          ctx.rect(0, 0, 960, 540);
          ctx.clip();
          winnerF.draw(ctx);
          ctx.restore();
        } else {
          winnerF.draw(ctx);
        }
        // Draw loser with special rumble effects if applicable
        if (!rumbleLoserHidden) {
          if (rumbleType === 'VENOM' && rumbleVenomMeltPct > 0) {
            drawMeltingFighter(loserF);
          } else if (rumbleType === 'TITAN' && rumbleSinkProgress > 0) {
            drawSinkingFighter(loserF);
          } else {
            loserF.draw(ctx);
          }
        }
      }
      if (rumbleAshes) drawAshPile(rumbleAshes.x, rumbleAshes.y);
      if (rumbleGoo) drawVenomRumble(winner === 'player' ? cpu : player);
      if (rumbleLightBurst && rumbleLoserHidden) drawSurgeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleSinkhole && rumbleLoserHidden) drawTitanRumble(winner === 'player' ? cpu : player);
      if (rumbleShadePoof) drawShadeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleHailCracked) drawTorrenaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleCorvidaGulpChick >= 0 && rumbleLoserHidden) drawCorvidaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleGolgarEntity2 && rumbleLoserHidden) drawGolgarRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleTelatrinePhase === 5) drawTelatrineRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      ctx.restore();
      drawFinishHimScreen();
      if (paused) drawPauseOverlay();
      break;

    case 'victory':
      ctx.save();
      drawBackground();
      {
        const loserF = winner === 'player' ? cpu : player;
        const winnerF = winner === 'player' ? player : cpu;
        winnerF.draw(ctx);
        if (!rumbleLoserHidden) {
          if (rumbleType === 'VENOM' && rumbleVenomMeltPct > 0) {
            drawMeltingFighter(loserF);
          } else {
            loserF.draw(ctx);
          }
        }
      }
      if (rumbleAshes) drawAshPile(rumbleAshes.x, rumbleAshes.y);
      if (rumbleGoo) drawVenomRumble(winner === 'player' ? cpu : player);
      if (rumbleLightBurst && rumbleLoserHidden) drawSurgeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleSinkhole && rumbleLoserHidden) drawTitanRumble(winner === 'player' ? cpu : player);
      if (rumbleShadePoof) drawShadeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleType === 'BOJDOBOJDO' && rumbleSubType === 'massiv' && rumbleLoserHidden) drawBojdoStompRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleType === 'RUBBERMAN' && rumbleTetherCracked) drawRubbermanRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleHailCracked) drawTorrenaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleCorvidaGulpChick >= 0 && rumbleLoserHidden) drawCorvidaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleGolgarEntity2 && rumbleLoserHidden) drawGolgarRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleTelatrinePhase === 5) drawTelatrineRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      drawHUD();
      ctx.restore();
      drawVictoryScreen();
      break;
  }
}

function gameLoop() {
  try {
    update();
    draw();
  } catch (e) {
    console.error('Game loop error:', e);
    // Reset canvas state to prevent save/restore stack corruption
    ctx.restore();
    ctx.save();
    ctx.restore();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  requestAnimationFrame(gameLoop);
}

// Handle resize
function resize() {
  const ratio = 960 / 540;
  let w = window.innerWidth;
  let h = window.innerHeight;
  if (w / h > ratio) {
    w = h * ratio;
  } else {
    h = w / ratio;
  }
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.style.marginTop = ((window.innerHeight - h) / 2) + 'px';
}
window.addEventListener('resize', resize);
resize();

gameLoop();

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
      const titleOptionCount = rumblePracticeUnlocked ? 4 : 3;
      if (key === 'ArrowUp' || key === 'w' || key === 'W') titleCursor = (titleCursor - 1 + titleOptionCount) % titleOptionCount;
      if (key === 'ArrowDown' || key === 's' || key === 'S') titleCursor = (titleCursor + 1) % titleOptionCount;
      if (key === 'Enter' || key === ' ') {
        if (titleCursor === 0) {
          gameMode = 'cpu';
          gameState = 'charSelect';
        } else if (titleCursor === 1) {
          gameMode = 'campaign';
          gameState = 'charSelect';
        } else if (titleCursor === 2) {
          gameMode = 'practice';
          gameState = 'charSelect';
        } else {
          gameMode = 'rumblePractice';
          gameState = 'charSelect';
        }
        charSelectCursor = 0;
        cpuSelectCursor = 1;
        charSelectScroll = 0;
        selectingCPU = false;
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
              } else if (gameMode === 'campaign') {
                gameState = 'assistSelect';
                assistCursor = 0;
                selectingCPUAssist = false;
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
            } else if (gameMode === 'campaign') {
              gameState = 'assistSelect';
              assistCursor = 0;
              selectingCPUAssist = false;
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
              } else if (gameMode === 'campaign') {
                campaignSelectCursor = 0;
                gameState = 'campaignSelect';
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
            } else if (gameMode === 'campaign') {
              campaignSelectCursor = 0;
              gameState = 'campaignSelect';
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

      // Master passkey: type imp11 to unlock all secrets
      if (isMasterPasskeyNeeded()) {
        masterCodeBuffer += key.toLowerCase();
        if (masterCodeBuffer.length > 20) masterCodeBuffer = masterCodeBuffer.slice(-20);
        if (masterCodeBuffer.includes('imp11')) {
          masterCodeBuffer = '';
          activateMasterPasskey();
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

    case 'campaignSelect': {
      const cKeys = campaignKeys;
      if (key === 'ArrowUp' || key === 'w' || key === 'W') campaignSelectCursor = (campaignSelectCursor - 1 + cKeys.length) % cKeys.length;
      if (key === 'ArrowDown' || key === 's' || key === 'S') campaignSelectCursor = (campaignSelectCursor + 1) % cKeys.length;
      if (key === 'Enter' || key === ' ') {
        campaignId = cKeys[campaignSelectCursor];
        campaignFightIndex = 0;
        setupCampaignFight(0);
      }
      if (key === 'Escape' || key === 'Backspace') {
        gameState = 'assistSelect';
        selectingCPUAssist = false;
      }
      break;
    }

    case 'versus':
      if (key === 'Escape') {
        if (gameMode === 'campaign') {
          gameState = 'campaignSelect';
          stopFightMusic();
          playTitleMusic();
        } else {
          gameState = 'levelSelect';
        }
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
      // Campaign skip code: IMPAL24
      if (gameMode === 'campaign' && key.length === 1) {
        if (!campaignSkipBuffer) campaignSkipBuffer = '';
        campaignSkipBuffer += key.toUpperCase();
        if (campaignSkipBuffer.length > 10) campaignSkipBuffer = campaignSkipBuffer.slice(-10);
        if (campaignSkipBuffer.includes('IMPAL24')) {
          campaignSkipBuffer = '';
          resetRumbleState();
          winner = null;
          paused = false;
          rumbleActive = false;
          campaignFightIndex++;
          const campaign = campaigns[campaignId];
          if (campaignFightIndex < campaign.fights.length && campaign.fights[campaignFightIndex] !== null) {
            setupCampaignFight(campaignFightIndex);
          } else {
            gameState = 'title';
            paused = false;
            stopFightMusic();
            playTitleMusic();
          }
          break; // Stop processing this key event
        }
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
      // Campaign skip code also works during finishHim
      if (gameMode === 'campaign' && key.length === 1) {
        if (!campaignSkipBuffer) campaignSkipBuffer = '';
        campaignSkipBuffer += key.toUpperCase();
        if (campaignSkipBuffer.length > 10) campaignSkipBuffer = campaignSkipBuffer.slice(-10);
        if (campaignSkipBuffer.includes('IMPAL24')) {
          campaignSkipBuffer = '';
          resetRumbleState();
          winner = null;
          paused = false;
          rumbleActive = false;
          campaignFightIndex++;
          const campaign = campaigns[campaignId];
          if (campaignFightIndex < campaign.fights.length && campaign.fights[campaignFightIndex] !== null) {
            setupCampaignFight(campaignFightIndex);
          } else {
            gameState = 'title';
            paused = false;
            stopFightMusic();
            playTitleMusic();
          }
          break;
        }
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
        if (gameMode === 'campaign') {
          resetRumbleState();
          if (winner === 'player') {
            // Advance to next fight
            campaignFightIndex++;
            const campaign = campaigns[campaignId];
            if (campaignFightIndex < campaign.fights.length && campaign.fights[campaignFightIndex] !== null) {
              setupCampaignFight(campaignFightIndex);
            } else {
              // Campaign complete or no more fights
              gameState = 'title';
              paused = false;
              testYourMightActive = false;
              playTitleMusic();
            }
          } else {
            // Player lost — campaign over
            gameState = 'title';
            paused = false;
            testYourMightActive = false;
            playTitleMusic();
          }
          break;
        }
        gameState = 'title';
        paused = false;
        playTitleMusic();
        resetRumbleState();
      }
      if ((key === 'Escape' || key === 'Backspace') && (gameMode === 'rumblePractice' || gameMode === 'campaign')) {
        gameState = 'title';
        paused = false;
        testYourMightActive = false;
        playTitleMusic();
        resetRumbleState();
      }
      break;
  }
}


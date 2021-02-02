const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_STRONG_PLAYER_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

function getMaxLifeValues() {
  const enteredValue = prompt('Max lif for you and the monster.', '100');

  const parsedValue = parseInt(enteredValue);

  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw { message: 'Invalid user input' };
  }
  return parsedValue;
}

let battleLog = [];
let lastLoggedEntry;

let chosenMaxLife;
try {
  chosenMaxLife = getMaxLifeValues();
} catch (error) {
  console.log(error);
  chosenMaxLife = 100;
  //throw error;
} 

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
  //let logEntry;
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  switch (event) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_STRONG_PLAYER_ATTACK:
      logEntry = {
        event: event,
        value: value,
        target: 'MONSTER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHEalth: playerHealth,
      };
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        event: event,
        value: value,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHEalth: playerHealth,
      };
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry = {
        event: event,
        value: value,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHEalth: playerHealth,
      };
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHEalth: playerHealth,
      };
      break;
    default:
      logEntry = {};
  }
  //   if (event === LOG_EVENT_PLAYER_ATTACK) {
  //     logEntry = {
  //       event: event,
  //       value: value,
  //       target: 'MONSTER',
  //       finalMonsterHealth: monsterHealth,
  //       finalPlayerHEalth: playerHealth,
  //     };
  //   } else if (event === LOG_EVENT_STRONG_PLAYER_ATTACK) {
  //     logEntry = {
  //       event: event,
  //       value: value,
  //       target: 'MONSTER',
  //       finalMonsterHealth: monsterHealth,
  //       finalPlayerHEalth: playerHealth,
  //     };
  //   } else if (event === LOG_EVENT_MONSTER_ATTACK) {
  //     logEntry = {
  //       event: event,
  //       value: value,
  //       target: 'PLAYER',
  //       finalMonsterHealth: monsterHealth,
  //       finalPlayerHEalth: playerHealth,
  //     };
  //   } else if (event === LOG_EVENT_PLAYER_HEAL) {
  //     logEntry = {
  //       event: event,
  //       value: value,
  //       target: 'PLAYER',
  //       finalMonsterHealth: monsterHealth,
  //       finalPlayerHEalth: playerHealth,
  //     };
  //   } else if (event === LOG_EVENT_GAME_OVER) {
  //     logEntry = {
  //       event: event,
  //       value: value,
  //       finalMonsterHealth: monsterHealth,
  //       finalPlayerHEalth: playerHealth,
  //     };
  //   }
  battleLog.push(logEntry);
}

function reset() {
  currentPlayerHealth = chosenMaxLife;
  currentMonsterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert('You would be dead but the bonus life saved you!');
    setPlayerHealth(initialPlayerHealth);
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'You won!',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && monsterHealthBar > 0) {
    alert('You Lost!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Monster Won!',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('Its a draw!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Its a Draw!',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }
  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent =
    mode === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_STRONG_PLAYER_ATTACK;
  //   if (mode === MODE_ATTACK) {
  //     maxDamage = ATTACK_VALUE;
  //     logEvent = LOG_EVENT_PLAYER_ATTACK;
  //   } else if (mode === MODE_STRONG_ATTACK) {
  //     maxDamage = STRONG_ATTACK_VALUE;
  //     logEvent = LOG_EVENT_STRONG_PLAYER_ATTACK;
  //   }
  const damage = dealMonsterDamage(maxDamage);
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  currentMonsterHealth -= damage;
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal for more than you max health.");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  currentPlayerHealth += healValue;
  endRound();
}

function printLogHandler() {
  for (let i = 0; i < 3; i++) {
    console.log('--------');
  }
  let j = 0;
  do {
    console.log('Outer:', j);
    for (let k = 0; k < 5; k++) {
      console.log('Inner:', k);
    }
    j++;
  } while (j < 3);

  while (j < 3) {
    console.log('---------');
    j++;
  }
  //   for (let i = 0; i< battleLog.length; i++){
  //       console.log(battleLog[i]);
  //   }
  //   console.log(battleLog);
  let i = 0;
  for (const logEntry of battleLog) {
    if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry < i) {
      console.log(`#${i}`);
      for (const key in logEntry) {
        console.log(`${key} => ${logEntry[key]}`);
      }
      lastLoggedEntry = i;
      break;
    }
    i++;
  }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);

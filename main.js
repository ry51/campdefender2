let canvas = document.querySelector('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d')

const x = canvas.width / 2;
const y = innerHeight / 2;

let rows = 0;
let [w200, winnable, won, nerdMode, isExpert, passcoded, hexed, off, empowered, empowerboosted, corrupted, corruptboosted, apocalyptic, apocboosted, chaotic, chaosboosted, pandemonium, paboosted, SPGBoost, SACBoost, YACBoost, lrb, pen, elephant, fitmnBoosted, unitchecked, farmchecked, miscchecked, upgradechecked, autofarm, primed] = multiArray(31, false);

let difficultyHovered = null;
let difficultySelected = null;

let deadShards = 0;

let currentWavePrime = false;

let sDigit1 = 1 + Math.floor(Math.random()*3);
let sDigit2 = 5 + Math.floor(Math.random()*4);
let sDigit3 = 5 + Math.floor(Math.random()*3);
let sDigit4 = 1 + Math.floor(Math.random()*9);
let sDigit5 = 1 + Math.floor(Math.random()*3);

// Activating the secret upgrade
let randNum1 = 20 + Math.floor(Math.random()*5); // 20 - 24
let randNum2 = 215 + Math.floor(Math.random()*15) // 215 - 229
let randNum3 = 25 + Math.floor(Math.random()*30) // 25 - 54
// TOTAL 181 to 228

let [globalResourceBoost, enemyStrength, farmBuff, unLagBuff, leaderBoost, ddamageboost, fireLootBuff, foodNerds, woodNerds, stoneNerds, copperNerds, titaniumNerds, diamondNerds, antimatterNerds, farmEff, caveEff, compEff, mineEff, pressEff, compb, lootMultiplier, LTEff, leaderEff, chilled, fc, ht, lengthboost, bm, pierce, sendcost, nightlevel, playerAttackSpeed, difficultyMultiplier] = multiArray(33, 1);

let speed = 20;
let projlifetime = 50;
let reloadtime = 15;
let turretDamage = 100;
let rocketDamage = 500;
let rocketRadius = 150;
let xbowPierce = 5;
let xbowDamage = 60;
let auraRange = 200;
let auraDI = 20;
let powerMax = 100;
let reversecost = 75;

let [campers, SPGunits, SACunits, YACunits, LEADunits, LTunits, leaderunits, superSPGunits, superSACunits, superYACunits, superLTunits, superLeaderunits, staffunits, elementalunits, elementalresets, earthunits, windunits, waterunits, fireunits, strengthunits, patunits, farmunits, caveunits, compressunits, mineunits, pressurizerunits, generatorunits, reactorunits, windspireunits, pebbleunits, campfireunits, magmaunits, volcanounits, beaconunits, speakerunits, coilunits, archBoosts, enemiesKilled, offCounter, revengeLevel, revengeStacks, coordination, upgradeStacks, globalPower, buffBoost, ss8, farmBoost, duoBoost, lumberBoost, healthBoost, meditationBoost, meditationStacks, confidenceBoost, confidenceStacks, spireBoost, leechBoost, charge, leaderBoosted, sportBoost, farmdr, bellStacks, chargeStorage, campfirePrestige, experienceStacks, swapcd, lastSwap, oc, novaTimer, chilltime, rncstacks, absp, fcstacks, fctime, mtstacks, httime, htstacks, tmstacks, eva, vap, upgradesResearched, rsc, eng, farmed, LEADlevels, speakerLevels, songBoost, knockback, inertia, inertiaLevels, abLevels, pipBoost, squeakBoost, hermanBoost, trigLevel, trigBoost, turretLevel, rocketLevel, xbowLevel, auraLevel, time, introTime, wavePause, unityLevel, steamLevels, wave, wavetimer, pause, empowerment, storageBoosts, upgradeAt, upgradeDisplay, abilityDisplay, debuffDisplay, skillsDisplay, pierceChance, nightDuration, nightcd, empowerdesc, corruptdesc, apocdesc, chaosdesc, padesc] = multiArray(122, 0);
let [SPGPrestiged, SACPrestiged, YACPrestiged, LTPrestiged, LeaderPrestiged, dead, ewwfUnlocked, secretclear, nightfell, fireunlocked, pdefend] = multiArray(11, false);

let intropage = 0;

let nightcdmax = 3600;

let upgrades = [];

let resources = [0, 0, 0, 0, 0, 0, 0, 0];

let resourceImages = ['./assets/resources/food.png', './assets/resources/wood.png', './assets/resources/stone.png', './assets/resources/copper.png', './assets/resources/titanium.png', './assets/resources/diamond.png', './assets/resources/antimatter.png', './assets/resources/power.png'];
const values = ['K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Od', 'Nd', 'Vg', 'Uvg', 'Dvg', 'Tvg', 'Qavg', 'Qivg', 'Sxvg', 'Spvg', 'Ovg', 'Nvg', 'Tg', 'Utg', 'Dtg', 'Ttg', 'Qatg', 'Qitg', 'Sxtg', 'Sptg', 'Otg', 'Ntg', 'Qag', 'Uqag', 'Dqag', 'Tqag', 'Qaqag', 'Qiqag', 'Sxqag', 'Spqag', 'Oqag', 'Nqag', 'Qig', 'Uqig', 'Dqig', 'Tqig', 'Qaqig', 'Qiqig', 'Sxqig', 'Spqig', 'Oqig', 'Nqig', 'Sxg', 'Usxg', 'Dsxg', 'Tsxg', 'Qasxg', 'Qisxg', 'Sxsxg', 'Spsxg', 'Osxg', 'Nsxg', 'Spg', 'Uspg', 'Nspg', 'Tspg', 'Qaspg', 'Qispg', 'Sxspg', 'Spspg', 'Ospg', 'Nspg', 'Og', 'Uog', 'Dog', 'Tog', 'Qaog', 'Qiog', 'Sxog', 'Spog', 'Ocog', 'Nog', 'Ng', 'Ung', 'Dng', 'Tng', 'Qang', 'Qing', 'Sxng', 'Spng', 'Ong', 'Nng', 'Ct'];

// 5k base
let homesteadmaxhp = 5000;

let [description, currentDebuff, activeDebuff, onMouse] = multiArray(4, null);

let turbocharger = false;
let turboLootMultiplier = 1;

let windMultiplier = 0.8;

let display = "none";

let spawnStacks = 1;

let debuffImages = ["./assets/misc/earth.png", "./assets/misc/wind.png", "./assets/misc/water.png", "./assets/misc/fire.png", "./assets/misc/random.png"];
let powerImages = ["./assets/misc/nopower.png", "./assets/misc/earthpower.png", "./assets/misc/windpower.png", "./assets/misc/waterpower.png", "./assets/misc/firepower.png", "./assets/misc/nopower.png"];

/*
COLOURS

EARTH 6B3E2E
WIND ADD8E6
WATER 03A9F4
FIRE DD2100
*/

let [earthMax, windMax, waterMax, fireMax] = multiArray(4, 200);

let player = new Player(x, y, 60, 'blue', 0, true, 45, 45, 180, 70, 100, 5, '#000000');
let homestead = new Homestead(0, 0, homesteadmaxhp, homesteadmaxhp, './assets/misc/homestead.png');

let SPGBaseCost = [50, 0, 0, 0, 0, 0, 0, 0];
let SACBaseCost = [250, 0, 0, 0, 0, 0, 0, 0];
let YACBaseCost = [750, 0, 0, 0, 0, 0, 0, 0];
let LEADBaseCost = [10**9, 0, 0, 0, 0, 0, 0, 0];
let LTBaseCost = [2000, 0, 0, 0, 0, 0, 0, 0];
let leaderBaseCost = [10000, 0, 0, 0, 0, 0, 0, 0];

let superSPGBaseCost = [50*10**9, 0, 0, 0, 0, 0, 0, 0];
let superSACBaseCost = [250*10**9, 0, 0, 0, 0, 0, 0, 0];
let superYACBaseCost = [750*10**9, 0, 0, 0, 0, 0, 0, 0];
let superLTBaseCost = [2000*10**9, 0, 0, 0, 0, 0, 0, 0];
let superLeaderBaseCost = [10000*10**9, 0, 0, 0, 0, 0, 0, 0];

let staffBaseCost = [10**6, 0, 0, 0, 0, 0, 0, 0];
let patBaseCost = [10**18, 0, 0, 0, 0, 0, 0, 0];
let elementalBaseCost = [10**16, 0, 0, 0, 0, 0, 0, 0];
let farmBaseCost = [335, 0, 0, 0, 0, 0, 0, 0];
let caveBaseCost = [20000, 20000, 20000, 0, 0, 0, 0, 0];
let compressorBaseCost = [0, 10**6, 10**6, 10**6, 0, 0, 0, 0];
let mineBaseCost = [0, 0, 6*10**6, 5*10**6, 4*10**6, 0, 0, 0];
let pressurizerBaseCost = [0, 0, 0, 28*10**6, 25*10**6, 22*10**6, 0, 0];
let generatorBaseCost = [0, 0, 0, 10**12, 2*10**12, 0, 10**12, 0];
let reactorBaseCost = [0, 0, 0, 0, 0, 0, 10**15, 0];
let windspireBaseCost = [0, 50000, 40000, 0, 30000, 0, 0, 0];
let campfireBaseCost = [0, 5*10**6, 2*10**6, 0, 0, 0, 0, 0];
let beaconBaseCost = [0, 0, 4*10**9, 0, 3*10**9, 2*10**9, 0, 0];
let speakerBaseCost = [0, 0, 0, 0, 0, 0, 10**6, 0];
let coilBaseCost = [625*10**12, 0, 0, 0, 0, 0, 0, 0];
let pebbleBaseCost = [0, 0, 100, 0, 0, 0, 1, 0];


let namesAndColours = [["SPG", "#000099"], ["SAC", "#009900"], ["YAC", "#990000"], ["LEAD", "#331144"], ["LT", "#FFA500"], ["Leader", "#3AA5B3"], ["sSPG", "#000055"], ["sSAC", "#005500"], ["sYAC", "#550000"], ["sLT", "#CC7200"], ["sLeader", "#007280"], ["Pat", "#B100CD"], [], [], [], [], ["Farm", "#004400"], ["Cave", "#666666"], ["Compressor", "#888844"], ["Mine", "#3D251E"], ["Pressurizer", "#BEC2BC"], ["Generator", "#111111"], ["Reactor", "#440044"], ["Windspire", "#333333"], ["Campfire", "#BB0000"], ["Magma", "#DD0000"], ["Volcano", "#FF0000"], ["Beacon", "#301934"], ["Speaker", "#000044"], ["Coil", "#FFEE00"], ["Pebble", "#999999"]];
// DNCSDF - description (variable), name, cost,  stats, description of unit, fontsize
let DNCSDF = [["SPG", "SPG Camper", [SPGBaseCost, 1.4, 0, -80], "550 HP, 8 DMG, 500 RNG, 2.4 SPD", "SPG camper throws dodgeballs at nearby enemies.", 20],
			["sSPG", "Super SPG Camper", [superSPGBaseCost, 10, superSPGunits, -80], "27.5K HP, 16 DMG, 5 PRC, 500 RNG, 4.8 SPD", "SPG camper throws burning electric dodgeballs that deal massive damage at nearby enemies.", 20], 
			["SAC", "SAC Camper", [SACBaseCost, 1.4, 0, -80], "800 HP, 9 DMG, 600 RNG, 2.5 SPD", "SAC camper throws soccer balls at nearby enemies.", 20], 
			["sSAC", "Super SAC Camper", [superSACBaseCost, 10, superSACunits, -80], "48K HP, 18 DMG, 5 PRC, 600 RNG, 5 SPD", "SAC camper throws burning electric soccer balls that deal massive damage at nearby enemies.", 20], 
			["YAC", "YAC Camper", [YACBaseCost, 1.4, YACunits, -80], "1150 HP, 10 DMG, 700 RNG, 2.61 SPD", "YAC camper throws basketballs at nearby enemies.", 20], 
			["sYAC", "Super YAC Camper", [superYACBaseCost, 10, superYACunits, -80], "80.5K HP, 30 DMG, 5 PRC, 700 RNG, 5.22 SPD", "YAC camper throws burning electric basketballs that deal massive damage at nearby enemies. Provides an adequate support buff to nearby campers.", 20], 
			["LEAD", "LEAD Camper", [LEADBaseCost, 25, LEADunits, -80], "1250 HP, 12 DMG, 750 RNG, 3 SPD", "An advanced combat unit that can be upgraded with LEAD modules to massively increased power and provides many global benefits.", 20], 
			["LT", "Leadership Trainee", [LTBaseCost, 1.4, LTunits, -80], "1350 HP, 11 DMG, 800 RNG, 2.73 SPD", "A powerful defense unit. Enhances the damage of nearby campers by 10% (which can be upgraded) which stacks additively with other LTs.", 20], 
			["sLT", "Super Leadership Trainee", [superLTBaseCost, 10, superLTunits, -80], "108K HP, 55 DMG, 5 PRC, 800 RNG, 8.19 SPD", "An exceptionally powerful defense unit. Enhances the damage of nearby campers by 40% (which can be upgraded) which stacks additively with other LTs.", 20], 
			["leader", "Camp Leader", [leaderBaseCost, 1.5, leaderunits, -80], "1750 HP, 12 DMG, 800 RNG, 2.86 SPD", "Increases damage of nearby campers by a stacking 20% (again can be upgraded).", 20], 
			["sleader", "Super Camp Leader", [superLeaderBaseCost, 10, superLeaderunits, -80], "158K HP, 120 DMG, 5 PRC, 800 RNG, 8.58 SPD", "Increases damage of nearby campers by a stacking 80% (again can be upgraded).", 20], 
			["staff", "Office Staff", [staffBaseCost, 3, staffunits, -80], " ", "Office staff do not attack and cannot be seen on the battlefield. They aid with paperwork and get all the boring things done. Each office staff provides a universal +30% damage boost and adds 2000 health to the homestead. Click to add an office staff.", 16], 
			["Pat", "Princess Pat", [patBaseCost, 10000, patunits, -80], "10K HP, 10%&1 DMG, 1000 RNG, 30 SPD", "An advanced infantry unit that takes off 10% of an enemy's current health per hit, so the stronger the enemy, the more damage it does. Excels against high-health bosses in particular.", 20], 
			[], [], [], [],
			["farm", "Farm", [farmBaseCost, 1.2, farmunits, -80], "1000 HP, 50 base food/sec", "An essential building that generates food to buy other units. Can be significantly enhanced with upgrades and will generate more food as you go through waves.", 20],
			["cave", "Cave", [caveBaseCost, 1.3, caveunits, -80], "3000 HP, 600 base stone/sec", "Although dark, caves are filled with stone. Can also be upgraded to produce more resources.", 20],
			["compressor", "Compressor", [compressorBaseCost, 1.35, compressunits, -80], "5000 HP, 400 base copper/sec", "A nice building to compress more copper! Can also be upgraded to produce more resources.", 20],
			["mine", "Mine", [mineBaseCost, 1.4, mineunits, -80], "6000 HP, 300 base titanium/sec", "A good site to dig up lots of titanium. Can also be upgraded to produce more resources.", 20],
			["pressurizer", "Pressurizer", [pressurizerBaseCost, 1.45, pressurizerunits, -80], "7000 HP, 240 base diamond/sec", "Generates diamond from graphite. Can also be upgraded to produce more resources.", 20],
			["generator", "Generator", [generatorBaseCost, 4, generatorunits, -80], "9000 HP, 0.12 base power/sec", "Allows for more efficient power generation. Each generator increases base power gain by 0.12 per second. In addition, the first generator built grants 5 power per kill, and every next generator increases this bonus by a compounding 20%.", 15],
			["reactor", "Fission Reactor", [reactorBaseCost, 50, reactorunits, -80], "9000 HP", "Annihilates positive matter particles to produce antimatter! Each reactor increases antimatter gained from enemies by 4x (compounds with every next reactor), but decreases food, wood, stone, copper, titanium, and diamond gained from enemies by a stacking 9%. Maximum of 11 reactors.", 15],
			["windspire", "Windspire", [windspireBaseCost, 2.1, windspireunits, -80], "11K HP, 500 RNG", "A non-offensive but essential support tower. All enemies within 500 units will be slowed and will deal less damage to your units.", 15],
			["Campfire", "Campfire", [campfireBaseCost, 1.7, campfireunits, -80], "6500 HP", "Another important support tower. All adjacent campers will do +50% damage, which stacks additively with other campfires and compounds with bonuses from LTs/leaders or global damage buffs.", 15],
			["Magma", "Magma", [campfireBaseCost, 1.7, magmaunits, -80], "7500 HP", "Adjacent campers deal 25% more damage and time between waves is reduced by a compounding 10%. The purpose of this unit is to reward those with strong defenses with a faster clear time.", 15],
			["Volcano", "Volcano", [campfireBaseCost, 1.7, volcanounits, -80], "8500 HP", "Time between waves reduced by a compounding 12%. This unit will NOT buff adjacent campers. The purpose of this unit is to reward those with strong defenses with a faster clear time.", 15],
			["beacon", "Range Beacon", [beaconBaseCost, 1.8, beaconunits, -80], "15K HP", "Units everywhere gain a stacking 20% range.", 20],
			["speaker", "Speaker", [speakerBaseCost, 10**6, speakerunits, -80], "1000 HP, 300 RNG", "A powerful but extremely fragile support unit. Enemies within the range of a speaker will take 2x damage and gain debuff stacks twice as fast (Note: the debuff stack bonus does NOT apply to enemies affected by water as to not be a potential downgrade). This effect does not stack with other speakers on the same enemy.", 15],
			["coil", "Parachute Shard", [coilBaseCost, 2, coilunits, -80], "0.001 HP (unchangeable)", "A very tiny fragment of parachute to increase the fire rate of campers but decrease damage as a result of being distracted. Each shard will reduce the reload time of all super and regular SPG/SAC/YAC campers by a compounding 2% (equivalent to a ~2.04% speed increase) but will reduce the base damage of said units by an additive 3%. Base damage reduction stacks to a maximum of 99.99% with 34+ shards (or 10000x less damage than usual).", 15],
			["pebble", "Pebble", [pebbleBaseCost, 2.4, pebbleunits, -80], "0.001 HP (unchangeable)", "A very tiny pebble. Doesn't do much but at least it's there.", 20],
];


// RP - reverse, pause
let RP = ["Travel back in time, decreasing the current wave number by 10 but keeping all your units and resources to farm more enemies from the previous few waves. Will not change buffs based on wave number such as Trig Nerds and Pip, Squeak, and Herman - they will be the same as they were previously when you reached that wave.", "Pause the wave timer, causing no enemies to spawn until the timer is unpaused. Once paused, click the pause icon again to unpause. Cost will remain at a constant 5."]

let introInfos = ["The purpose of this game is to use units to defeat enemies. The goal is to progress through waves and win as fast as possible. You can pause/unpause the game with the spacebar and you lose if the homestead HP bar goes to 0. Use w, a, s, and d to move - the game autofires for you at the closest enemy.", "You can purchase units and upgrades by clicking the buttons near the bottom of the page. Resources are displayed in the top left corner and you will unlock more as you go. Place units by clicking the unit in the bottom right corner and then moving your moise. Pressing escape gets rid of whatever unit you have on your cursor."];

let easyDesc = ["Easy mode is the standard beginner mode.", "If you are new to the game you should", "play on this mode or else you'll probably", "get obliterated by some random circles. Survive", "150 waves to win. Completing the game on Easy mode", "will grant you the reward of nothing. Pretty lame."];
let mediumDesc = ["Medium mode is the standard average mode. If", "you have a bit of experience at the game you should", "play on this mode or else you'll probably", "get obliterated by some big random circles. Survive", "200 waves to win. This mode is similar to the original", "Camp Defender. Completing the game on Medium mode", "will grant you the reward of nothing. Pretty lame."];
let hardDesc = ["Hard mode is the standard advanced mode. If you", "are decently competent at the game you should play on", "this mode or else you'll probably get obliterated", "by some big heavy random circles. Survive 250 waves to win.", "Completing the game on Hard mode will grant you the reward", "of nothing. Pretty lame. However, if you are cool enough then", "you might be able to get more than nothing."];
let expertDesc = ["Through greed and desire you've arrived at the start,", "To the valleys and seas where the world drifts apart.", "Against the sunset you menacingly stand,", "Though the knowledge to greatness is not in your hand.", "And if you're not strong and you're not levitating,", "The consequences will be devastating.", "You'll be weakened and warped in an unholy trance,", "But prove that you're worthy and you'll be granted a chance."];
let expertUnlockedDesc = ["Expert mode is the ultimate challenge of Camp Defending power.", "This mode is incredibly difficult and if you don't know how the", "important game mechanics function you'll probably get obliterated", "by some big chunky circles. This mode is nearly identical to Hard mode with the following changes:", "- The game ends on wave 300, and all enemies past wave 260 gain 10^50x damage.", "- Enemies gain a compounding 2x health after every 50th wave", "- Every wave from 151, damage and loot is reduced by a stacking", "1% and capping at -99%. This nerf is controlled", "solely by wave and will always be equal to your current wave minus 151.", "Clearing the game on Expert mode grants you the awesome reward of bragging rights."]

let difficultyDescs = [easyDesc, mediumDesc, hardDesc, expertDesc, expertUnlockedDesc];

let nerdModeDesc = "Click here to toggle Nerd Mode. If Nerd Mode is off, descriptions to upgrades are brief, short, and only highlights what the upgrade improves. If Nerd Mode is on, descriptions are very precise and reveals the exact game mechanics and numbers behind the upgrade.";
let shownUpgrade = null;

let maxDebuff = 100;

let upgradeX, upgradeY;

let rTotal = 1000;

let maxswapcd = 20;
let swappable = true;

let displayArray = [unitchecked, farmchecked, miscchecked, upgradechecked];
let selectionArray = ["units", "farming", "misc", "upgrades"];

let infohover = null;

let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293];

let pipInitialWave;
let trigInitWave = null;

let skills = [];

let debuffTypes = ["Earth", "Wind", "Water", "Fire"];
let debuffMaxes = [earthMax, windMax, waterMax, fireMax];

let clarity = new Skill("Clarity", "Use the power of clarity to better target enemies. All units gain a stacking +5% range.", 1, 0, "./assets/skills/clarity.png", 3);
let capacity = new Skill("Capacity", "Learn how to store more power to be used when needed! Maximum power increased by 40.", 40, 0, "./assets/skills/capacity.png", 45);
let stability = new Skill("Stability", "This skill helps in stabilizing the world and making it safer. All units gain a compounding +50% health.", 90, 0, "./assets/skills/stability.png", 30);
let tenacity = new Skill("Tenacity", "Allows for more efficient control over the elements. Reduces the maximum waves between debuff swaps by 1.", 35, 0, "./assets/skills/tenacity.png", 15);
let dexterity = new Skill("Dexterity", "Learn to draw power from enemies, increasing damage of all units by an additional 0.05% per stack of Empowerment.", 150, 0, "./assets/skills/capability.png", 30);
let alacrity = new Skill("Alacrity", "Decreases the reload time of all units and the cooldown time of abilities by an additional 5%.", 70, 0, "./assets/skills/alacrity.png", 40);
let criticality = new Skill("Criticality", "Become more critical, causing all units to gain a 5% chance to critically strike for 10x damage.", 300, 0, "./assets/skills/criticality.png", 20);
let calamity = new Skill("Calamity", "Greatly increases the destructive power of the elements. All debuff caps increased by 20. For every debuff stack on an enemy, units deal an additional 2% damage to that enemy.", 400, 0, "./assets/skills/calamity.png", 5);

let relics = 0;
let possibleSkills = [clarity, capacity, stability, tenacity, dexterity, alacrity, criticality, calamity];
let skillsmax = ["./assets/skills/claritymax.png", "./assets/skills/capacitymax.png", "./assets/skills/stabilitymax.png", "./assets/skills/tenacitymax.png", "./assets/skills/capabilitymax.png", "./assets/skills/alacritymax.png", "./assets/skills/criticalitymax.png", "./assets/skills/calamitymax.png"];

let weapons = ["Turret", "Rocket", "Crossbow", "Aura"];
let equipImages = ["./assets/equips/turret1.png", "./assets/equips/rocket1.png", "./assets/equips/xbow1.png", "./assets/equips/aura1.png"];
let equipImages2 = ["./assets/equips/turret2.png", "./assets/equips/rocket2.png", "./assets/equips/xbow2.png", "./assets/equips/aura2.png"];
let equipLevels = ["I", "II", "III", "IV", "V", "VI"];
let equipDescs = [
"A basic turret attack that fires projectiles at enemies. Deals decently high damage to single targets and is efficient at defending the first few waves.",
"A powerful but slow rocket attack that fires an explosive projectile at enemies. Deals high area damage and is most efficient at taking out large clumps of enemies that have gathered near the homestead.",
"A powerful crossbow attack that fires many high-pierce projectiles in a line and can deal extremely high damage. Crossbow is very proficient at stacking a high amount of debuffs quickly.",
"Surround yourself with a powerful aura, capable of weakening enemies, shooting rings of projectiles, and later upgraded to cause various harmful effects to any enemies that approach you."
];

let ewwfBoost = 0;

let noDebuff = new Debuff("Clear Debuff", "No stacks of Empowerment will gather, and no enemies will spawn with debuffs. Enemies are still affected by base Empowerment buffs (+1% health (and loot) and +0.1% damage per stack). Note that swapping to debuffless state uses up a debuff swap.", "./assets/misc/debuffless.png");
let earthDebuff = new Debuff("Earth", `Send enemies in with ${spawnStacks} stacks of Earth. Every stack of Earth on an enemy will make them take an additive 1% more damage from units, capping at 200 (+200%). Every hit on an enemy with Earth will add one stack.`, "./assets/upgrades/earth.png");
let windDebuff = new Debuff("Wind", `Send enemies in with ${spawnStacks} stacks of Wind. Every stack of Wind on an enemy cause them to become weaker, making them deal a compounding 1% less damage and move a compounding 0.5% slower, capping at 200 (~-86.6% enemy damage, ~-63.3% enemy speed). Every hit on an enemy with Wind will add one stack.`, "./assets/upgrades/wind.png");
let waterDebuff = new Debuff("Water", `Send enemies in with ${spawnStacks} stacks of Water. Every stack of Water on an enemy will cause them to drop 0.5% more loot as well as gain 1% of their current health as health and 1% of their original maxhealth as maxhealth, capping at 200 (+100% loot, +200% health). Every hit on an enemy with Water will add one stack. Note that enemies drop resources proportional to their maxhealth, so an enemy killed with 200 water stacks will drop 6x loot.`, "./assets/upgrades/water.png");
let fireDebuff = new Debuff("Fire", `Send enemies in with ${spawnStacks} stacks of Fire. Fire will cause enemies to slowly incinerate, taking constant damage proportional to their lost health. Every frame, enemies will take an additional firestacks*0.0005% of their current health as damage, capping at 200 (-0.1% of their lost health as damage each frame, or about 5.83% damage each second). NOTE: fire debuff does NOT work on bosses.`, "./assets/upgrades/fire.png");
let randomDebuff = new Debuff("Misfortune", `Enemies spawn with ${Math.min(earthMax, windMax, waterMax, fireMax)} stacks of a random elemental debuff, and [wave/10] stacks of Empowerment will gather each wave, increasing enemy health (and resources dropped) by 1% per stack and increasing enemy attack by 0.1% per stack.`, "./assets/upgrades/ewwf.png");

let debuffs = [noDebuff, null, null, null, null, null];
let debuffEmpowers = ["Unempowered", "Naturalistic", "Windstream", "Liquidity", "Meltdown", "Chaos"];

let [snsDuration, cmpStacks, lttDuration, tsDuration, talentStacks, lctDuration] = multiArray(6, 0);

let wb = new Ability("Water Break", "Increases power to your current maximum, resets the cooldown of Nightfall, and heals all units to full health.", 9, "./assets/abilities/waterBreak.png", 4, true);
let sns = new Ability("Slip And Slide", "Enemies gain 10x speed for the next 10 seconds.", 15, "./assets/abilities/slipAndSlide.png", 3, true);
let zs = new Ability("Zone Switch", "Swaps the location of all enemies to a concentrated spot near the homestead.", 30, "./assets/abilities/zoneSwitch.png", 90, false);
let cmp = new Ability("Compost", "Instantly lose all your resources (excluding power) and gain a permanent +15% loot.", 64, "./assets/abilities/compost.png", 1.5, true);
let ltt = new Ability("Freetime", "For the next 20 seconds, all projectiles (new and current) receive 5x damage and 10x pierce. However, due to the chaotic nature of freetime, all units except LEAD campers and princess pat will shoot at a completely random angle.", 80, "./assets/abilities/LTTime.png", 80, false);
let msf = new Ability("Misfortune", "All enemies on the map lose half their current health, get knocked back 1000 units, and any enemy with under 150 debuff stacks will stack to 150 instantly.", 150, "./assets/abilities/misfortune.png", 75, false);
let ts = new Ability("Talent Show", "For the next 15 seconds, the Talent buff is triggered, starting with an initial value of 5 stacks. Every time an enemy dies, you gain 1 stack, and each stack increases the damage of all units by 8%.", 160, "./assets/abilities/talentShow.png", 20, false);
let lct = new Ability("Lecture", "For the next 20 seconds, all units deal 99% less damage but loot drops from enemies are tripled.", 525, "./assets/abilities/lecture.png", 25, false);

let abilityUses = [0, 0, 0, 0, 0, 0, 0, 0];
let abilities = [wb, sns, zs, cmp, ltt, msf, ts, lct];
let abilityIndex;

let ancientRelic = new Upgrade("Ancient Relic", "Unlocks stuff and deals more damage.", "Permanently unlocks a new skill and increases the damage of all units by 50%.", [0, 0, 0, 0, 0, 0, 10**8, 0], null, './assets/abilities/relic.png', "relic");

let synergy8 = new Upgrade("Supersynergized", "Boosts from LTs and Leaders increase massively, especially during Wind debuff.", "Boosts from LTs and Leaders increase by 150%. While the Wind debuff is active, all boosts from LTs and Leaders are doubled and loot is increased by 50%.", [800*10**6, 720*10**6, 640*10**6, 560*10**6, 0, 480*10**6, 0, 0], null, './assets/upgrades/synergy8.png', "superBuffBoost");
let synergy7 = new Upgrade("Synergy VII", "LTs and Leaders gain stronger buffs.", "Boosts from LTs and Leaders increase by 50%.", [12500000, 2200000, 600000, 150000, 35000, 20000, 0, 0], synergy8, './assets/upgrades/synergy7.png', "buffBoost");
let synergy6 = new Upgrade("Synergy VI", "LTs and Leaders gain stronger buffs.", "Boosts from LTs and Leaders increase by 50%.", [6300000, 1100000, 300000, 90000, 14000, 0, 0, 0], synergy7, './assets/upgrades/synergy6.png', "buffBoost");
let synergy5 = new Upgrade("Synergy V", "LTs and Leaders gain stronger buffs.", "Boosts from LTs and Leaders increase by 50%.", [2000000, 600000, 100000, 40000, 5000, 0, 0, 0], synergy6, './assets/upgrades/synergy5.png', "buffBoost");
let synergy4 = new Upgrade("Synergy IV", "LTs and Leaders gain stronger buffs.", "Boosts from LTs and Leaders increase by 50%.", [900000, 200000, 20000, 4000, 0, 0, 0, 0], synergy5, './assets/upgrades/synergy4.png', "buffBoost");
let synergy3 = new Upgrade("Synergy III", "LTs and Leaders gain stronger buffs.", "Boosts from LTs and Leaders increase by 50%.", [350000, 120000, 9000, 0, 0, 0, 0, 0], synergy4, './assets/upgrades/synergy3.png', "buffBoost");
let synergy2 = new Upgrade("Synergy II", "LTs and Leaders gain stronger buffs.", "Boosts from LTs and Leaders increase by 50%.", [55000, 20000, 0, 0, 0, 0, 0, 0], synergy3, './assets/upgrades/synergy2.png', "buffBoost");
let synergy = new Upgrade("Synergy I", "LTs and Leaders gain stronger buffs.", "Teach teamwork to the campers. Boosts from LTs and Leaders increase by 50%.", [10000, 0, 0, 0, 0, 0, 0, 0], synergy2, './assets/upgrades/synergy.png', "buffBoost");

let darkness6 = new Upgrade("Darkness VI", "Enhances Nightfall ability.", "Increases duration, pierce, and projectile count of the Nightfall ability. In addition, gain a single permanent Nightfall orb that will never vanish.", [0, 0, 0, 0, 0, 0, 10**42, 0], null, './assets/upgrades/dark6.png', "dark");
let darkness5 = new Upgrade("Darkness V", "Enhances Nightfall ability.", "Increases duration, pierce, and projectile count of the Nightfall ability. In addition, Nightfall cooldown reduced from 50 seconds to 40.", [0, 0, 0, 0, 0, 0, 10**30, 0], darkness6, './assets/upgrades/dark5.png', "dark");
let darkness4 = new Upgrade("Darkness IV", "Enhances Nightfall ability.", "Increases duration, pierce, and projectile count of the Nightfall ability. In addition, Nightfall projectiles gain another 50% radius increase.", [0, 0, 0, 0, 0, 0, 10**20, 0], darkness5, './assets/upgrades/dark4.png', "dark");
let darkness3 = new Upgrade("Darkness III", "Enhances Nightfall ability.", "Increases duration, pierce, and projectile count of the Nightfall ability. In addition, Nightfall resource consumption reduced from 100% to 50%.", [0, 0, 0, 0, 0, 0, 10**15, 0], darkness4, './assets/upgrades/dark3.png', "dark");
let darkness2 = new Upgrade("Darkness II", "Enhances Nightfall ability.", "Increases duration, pierce, and projectile count of the Nightfall ability. In addition, Nightfall cooldown is reduced from 60 seconds to 50.", [0, 0, 0, 0, 0, 0, 10**11, 0], darkness3, './assets/upgrades/dark2.png', "dark");
let darkness = new Upgrade("Darkness I", "Enhances Nightfall ability.", "Increases duration, pierce, and projectile count of the Nightfall ability. In addition, Nightfall projectiles gain a 50% radius increase.", [0, 0, 0, 0, 0, 0, 1, 0], darkness2, './assets/upgrades/dark1.png', "dark");

let unity5 = new Upgrade("Unity Penteract", "Office Staff increase buffs from super leaders and super LTs, as well as dropped loot from enemies.", "Enhances the power of all previously purchased and all future Office Staff. Every Office Staff unit will now increase all loot from enemies by a stacking 2%, as well as increasing the damage boost provided by super leaders and super LTs by 10% of their base amount.", [512*10**27, 0, 0, 0, 0, 0, 0, 0], null, './assets/upgrades/unity5.png', "unity");
let unity4 = new Upgrade("Unity Tesseract", "Units deal extra damage if there are more super LTs/leaders. Also enhances the boost from all other unity upgrades.", "For every super leader or super LT on screen, all units deal an additional 15% damage. In addition, the damage boots from all previous unity upgrades stack twice.", [64*10**21, 0, 0, 0, 0, 0, 0, 0], unity5, './assets/upgrades/unity4.png', "unity");
let unity3 = new Upgrade("Unity Cube", "Units deal an extra 3% damage per every enemy on screen.", "Units deal an extra 3% damage per every enemy on screen (ex. if there are 32 enemies on screen, units deal 96% more damage.).", [8*10**16, 0, 0, 0, 0, 0, 0, 0], unity4, './assets/upgrades/unity3.png', "unity");
let unity2 = new Upgrade("Unity Square", "Units deal extra damage based on how far your furthest unit from the homestead is.", "Units deal extra damage based on your furthest unit from the homestead. Assuming the top left corner has coordinates (1, 1), then if your furthest unit (by Manhattan Distance), is (m, n) then all units will deal an additional (0.2*(m + n))% damage (for reference, the maximum possible boost from this upgrade is 80%, when placing a unit in the bottom right corner with coordinates (200, 200)).", [4*10**12, 0, 0, 0, 0, 0, 0, 0], unity3, './assets/upgrades/unity2.png', "unity");
let unity1 = new Upgrade("Unity Circle", "Units deal an additional 0.5% damage for every unit on screen.", "Units deal an additional 0.5% damage for every unit on screen.", [314159265, 0, 0, 0, 0, 0, 0, 0], unity2, './assets/upgrades/unity1.png', "unity");

let secret2 = new Upgrade("Perfect Defending", "Enemies deal 0.00% more damage.", "Enemies deal 0.00% more damage.", [0, 0, 0, 0, 0, 0, 2, 0], null, './assets/upgrades/s2.png', "secret2");
let secret1 = new Upgrade("Perfect Timing", "All units deal 0.00% more damage.", "All units deal 0.00% more damage.", [0, 0, 0, 0, 0, 0, 1, 0], null, './assets/upgrades/s1.png', "secret1");

let prestigeLeader = new Upgrade("Anchored", "Leaders will be much more powerful but at a greatly increased scale cost.", "This upgrade prestiges the Leader unit. The current version will no longer be purchaseable - instead it will be replaced by a much stronger leader with 10x damage, 5x pierce, 3x attack speed, and 90x health but the scale cost per unit becomes a multiplicative 12x, and the base cost is reset to 10T food. Damage buff from LTs is also quadrupled.", [625*10**12, 0, 0, 0, 0, 0, 0, 0], null, './assets/upgrades/LP.png', "preLeader");
let prestigeLT = new Upgrade("High Five", "LTs will be much more powerful but at a greatly increased scale cost.", "This upgrade prestiges the LT unit. The current version will no longer be purchaseable - instead it will be replaced by a much stronger LT with 5x damage, 5x pierce, 3x attack speed, and 80x health but the scale cost per unit becomes a multiplicative 12x, and the base cost is reset to 2T food. Damage buff from LTs is also quadrupled, causing every LT to give a buff twice as strong as a leader.", [125*10**12, 0, 0, 0, 0, 0, 0, 0], prestigeLeader, './assets/upgrades/LTP.png', "preLT");
let prestigeYAC = new Upgrade("Youth Committee", "YAC campers will be much more powerful but at a greatly increased scale cost.", "This upgrade prestiges the YAC camper unit. The current version will no longer be purchaseable - instead it will be replaced by a much stronger YAC camper with 5x damage, 5x pierce, 2x attack speed, and 70x health but the scale cost per unit becomes a multiplicative 10x, and the base cost is reset to 750B food. YAC campers will also gain a damage buff to surrounding units equivalent to 75% of a leader.", [25*10**12, 0, 0, 0, 0, 0, 0, 0], prestigeLT, './assets/upgrades/YACP.png', "preYAC");
let prestigeSAC = new Upgrade("Unchained Spirit", "SAC campers will be much more powerful but at a greatly increased scale cost.", "This upgrade prestiges the SAC camper unit. The current version will no longer be purchaseable - instead it will be replaced by a much stronger SAC camper with 4x damage, 5x pierce, 2x attack speed, and 60x health but the scale cost per unit becomes a multiplicative 10x, and the base cost is reset to 250B food.", [5*10**12, 0, 0, 0, 0, 0, 0, 0], prestigeYAC, './assets/upgrades/SACP.png', "preSAC");
let prestigeSPG = new Upgrade("Limitless Energy", "SPG campers will be much more powerful but at a greatly increased scale cost.", "This upgrade prestiges the SPG camper unit. The current version will no longer be purchaseable - instead it will be replaced by a much stronger SPG camper with 4x damage, 5x pierce, 2x attack speed, and 50x health but the scale cost per unit becomes a multiplicative 10x, and the base cost is reset to 50B food.", [10**12, 0, 0, 0, 0, 0, 0, 0], prestigeSAC, './assets/upgrades/SPGP.png', "preSPG");

let overclocker5 = new Upgrade("Overclocker V", "Gain two new turbocharger features and turbocharged enemies drop more loot.", "Time between waves reduced by a compounding 20% (from ~59% to ~67%) and gain four useful turbocharger additions. Firstly, the power scaling per wave on the turbocharger is reduced by 20% so spamming waves is cheaper. Secondly, adds another setting to the turbocharger that allows you to travel back in time for a heavy power cost, instantly reducing the wave number by 10. Third, gain the ability to pause the wave timer at any time for a flat power cost of 5. Finally, all turbocharged enemies drop double loot.", [0, 0, 0, 0, 0, 0, 9*10**20, 0], null, './assets/upgrades/overclocker5.png', "oc");
let overclocker4 = new Upgrade("Overclocker IV", "Unlocks the turbocharger tool, allowing you to instantly send new waves.", "Time between waves reduced by a compounding 20% (from ~49% to ~59%). Also unlock the turbocharger, an immensely powerful tool that will appear under the misc tab. The turbocharger has the ability to instantly send the next wave at full strength with a power cost based on how many waves were recently sent. All enemies sent by the turbocharger will drop 5x loot.", [0, 0, 0, 0, 0, 0, 9*10**16, 0], overclocker5, './assets/upgrades/overclocker4.png', "oc");
let overclocker3 = new Upgrade("Overclocker III", "Waves send faster and units shoot faster.", "Time between waves reduced by a compounding 20% (from 36% to ~49%), and attack speed of all units increased by an additive 10% (from 20% to 30%). The purpose of this upgrade is to allow for a faster clear time when defenses can easily hold.", [0, 30000000, 1000000, 400000, 0, 0, 0, 0], overclocker4, './assets/upgrades/overclocker3.png', "oc");
let overclocker2 = new Upgrade("Overclocker II", "Waves send faster and units shoot faster.", "Time between waves reduced by a compounding 20% (from 20% to 36%), and attack speed of all units increased by an additive 10% (from 10% to 20%). The purpose of this upgrade is to allow for a faster clear time when defenses can easily hold.", [0, 5000000, 600000, 100000, 0, 0, 0, 0], overclocker3, './assets/upgrades/overclocker2.png', "oc");
let overclocker = new Upgrade("Overclocker I", "Waves send faster and units shoot faster.", "Time between waves reduced by a compounding 20%, and attack speed of all units increased by an additive 10%. The purpose of this upgrade is to allow for a faster clear time when defenses can easily hold.", [0, 200000, 4000, 0, 0, 0, 0, 0], overclocker2, './assets/upgrades/overclocker.png', "oc");

let charliesAngels = new Upgrade("Charlie's Angels", "Campers deal more damage for each leader on screen.", "All campers deal +1% damage for each camp leader on screen.", [55*10**6, 0, 0, 0, 0, 25*10**6, 0, 0], null, './assets/upgrades/charliesAngels.png', "leaderBoost");
let angryVikings = new Upgrade("Angry Vikings", "All units permanently deal +45% damage.", "All units permanently deal +45% damage.", [100000, 550000, 350000, 300000, 150000, 0, 0, 0], charliesAngels, './assets/upgrades/angryVikings.png', "triGlobalPower");
let lumberjacks = new Upgrade("Lumberjacks", "Leaders passively generate wood and enemies drop more wood when killed.", "The best way to assert dominance is to run over trees. All leaders on screen become lumberjacks and passively generate wood. All enemies also drop +55% wood.", [300000, 250000, 200000, 120000, 0, 0, 0, 0], angryVikings, './assets/upgrades/lumberjacks.png', "lumberBoost");
let youAndMe = new Upgrade("You And Me", "Boosts from LTs and Leaders increase by another 100%.", "Boosts from LTs and Leaders increase by another 100%.", [5*10**5, 10**5, 10**5, 10**5, 0, 0, 0, 0], lumberjacks, './assets/upgrades/youAndMe.png', "buffDoubleBoost");
let applesAndOranges = new Upgrade("Apples and Oranges", "Food from all sources increased.", "Farms produce 4x food. Enemy food drops increased by 25%.", [4*10**5, 4*10**4, 4*10**4, 0, 0, 0, 0, 0], youAndMe, './assets/upgrades/applesAndOranges.png', "farmBoost");
let bippityBop = new Upgrade("Bippity Bop", "All units on screen deal +15% damage.", "All units on screen deal +15% damage.", [5*10**4, 2*10**4, 0, 0, 0, 0, 0, 0], applesAndOranges, './assets/upgrades/bippityBop.png', "globalPower");

let pinsAndTreble = new Upgrade("Pins and Treble", "Campers beside multiple LTs and Leaders deal extra damage.", "Campers beside two or more combined LTs and Leaders gain an additional +60% damage boost. All campers deal a compounding 1% extra damage for every leader on screen.", [5000000000000, 1000000000000, 0, 0, 0, 500000000, 0, 0], null, './assets/upgrades/pinsAndTreble.png', "duoBoost");
let smallsAndTalls = new Upgrade("Smalls and Talls", "Campers beside multiple LTs and Leaders deal extra damage.", "Campers beside two or more combined LTs and Leaders gain an additional +60% damage boost. For every camper with n >= 4 adjacent combined LTs and leaders, they gain a +10n% damage boost (up to +80%) which stacks seperately and compounds with the additional +180% two deep damage bonus.", [1000000000, 750000000, 250000000, 100000000, 0, 0, 0, 0], pinsAndTreble, './assets/upgrades/smallsAndTalls.png', "duoBoost");
let toopyAndBinoo = new Upgrade("Toopy and Binoo", "Campers beside multiple LTs and Leaders deal extra damage.", "Campers beside two or more combined LTs and Leaders gain an additional +60% damage boost.", [5500000, 500000, 100000, 0, 0, 0, 0, 0], smallsAndTalls, './assets/upgrades/toopyAndBinoo.png', "duoBoost");
let twoDeep = new Upgrade("Two Deep", "Campers beside multiple LTs and Leaders deal extra damage.", "Campers beside two or more combined LTs and Leaders gain a +60% damage boost.", [600000, 80000, 40000, 0, 0, 0, 0, 0], toopyAndBinoo, './assets/upgrades/twoDeep.png', "duoBoost");

let reinforcements = new Upgrade("Reinforcements", "All units gain +100% health and enemies deal a compounding 4% less damage.", "All units gain +100% health and enemies deal a compounding 4% less damage.", [0, 5000, 0, 0, 0, 0, 0, 0], null, './assets/upgrades/reinforcements0.png', "healthBoost");

let ufarms = [1, 5, 50, 1250, 62500, 62500000];
let ufarmstacks = 0;
let uberfarming5 = new Upgrade("Uberfarming V", "All farming units are a compounding 100 times as efficient.", "All farming units are a compounding 100 times as efficient.", [1200000000000000, 360000000000000, 80000000000000, 10000000000000, 4000000000000, 1000000000000, 0, 0], null, './assets/upgrades/uberfarming5.png', "uberfarmBoost");
let uberfarming4 = new Upgrade("Uberfarming IV", "All farming units are a compounding 50 times as efficient.", "All farming units are a compounding 50 times as efficient.", [30000000000000, 5000000000000, 800000000000, 400000000000, 100000000000, 0, 0, 0], uberfarming5, './assets/upgrades/uberfarming4.png', "uberfarmBoost");
let uberfarming3 = new Upgrade("Uberfarming III", "All farming units are a compounding 25 times as efficient.", "All farming units are a compounding 25 times as efficient.", [60000000000, 10000000000, 6000000000, 1000000000, 0, 0, 0, 0], uberfarming4, './assets/upgrades/uberfarming3.png', "uberfarmBoost");
let uberfarming2 = new Upgrade("Uberfarming II", "All farming units are a compounding 10 times as efficient.", "All farming units are a compounding 10 times as efficient.", [200000000, 40000000, 5000000, 0, 0, 0, 0, 0], uberfarming3, './assets/upgrades/uberfarming2.png', "uberfarmBoost");
let uberfarming = new Upgrade("Uberfarming I", "All farming units are a compounding 5 times as efficient.", "All farming units are a compounding 5 times as efficient.", [500000, 100000, 0, 0, 0, 0, 0, 0], uberfarming2, './assets/upgrades/uberfarming.png', "uberfarmBoost");

let autofarming = new Upgrade("Autofarming", "Farming units don't occupy space, are thrice as efficient, and enemies deal a compounding 0.2% less damage per farm.", "Any units in the farming tab no longer occupy any space to build, they will be instead purchased similarly to Office Staff. Each unit will generate thrice as many resources. In addition, due to the fact that you can no longer block bullets with these units, a 0.2% compounding enemy damage decrease per farm will be added. Farms will still grant the appropriate Meditation bonus.", [10**9, 10**9, 0, 0, 0, 0, 0, 0], null, './assets/upgrades/uberfarming.png', "autofarm");

let fitmn = new Upgrade("Four is the Magic Number", "Every time an enemy is hit, they lose 0.16% of their current health.", "Every time an enemy is hit, they lose 0.16% of their current health.", [0, 0, 0, 0, 0, 0, 10**15, 0], null, './assets/upgrades/fitmn.png', "fitmn");
let elephants = new Upgrade("Elephants", "Deal more damage when there are more enemies on screen.", "Units deal an additional 5% damage for every enemy on screen.", [0, 0, 0, 0, 0, 0, 10**13, 0], fitmn, './assets/upgrades/elephants.png', "elephants");
let penGame = new Upgrade("The Pen Game", "Units gain a small chance to do way more damage.", "Every time an enemy is hit, there is a 5% chance that they take 15x damage.", [0, 0, 0, 0, 0, 0, 10**11, 0], elephants, './assets/upgrades/penGame.png', "penGame");
let blackMagic = new Upgrade("Black Magic", "Units deal 40% more damage.", "Units deal 40% more damage.", [0, 0, 0, 0, 0, 0, 10**9, 0], penGame, './assets/upgrades/blackMagic.png', "compoundBuff");

let ingenuity = new Upgrade("Ingenuity", "Units deal more damage and gain more loot per farming unit on screen.", "For each stack of meditation you have, units deal a additional stacking 8% (instead of 7%) damage. Maximum of 600 stacks (+4800%). In addition, every stack allows you to gain +1% loot, for a maximum of +600%. NOTE: The 6 default farms do not count toward meditation stacks.", [777.777*10**24, 0, 0, 0, 0, 0, 777.777*10**24, 0], null, './assets/upgrades/ingenuity.png', "meditationBoost");
let intellect = new Upgrade("Intellect", "Units deal more damage per farming unit on screen.", "For each stack of meditation you have, units deal a additional stacking 7% (instead of 6%) damage. Maximum of 500 stacks (+3500%). NOTE: The 6 default farms do not count toward meditation stacks.", [6*10**18, 0, 0, 0, 0, 6*10**18, 4*10**18, 0], ingenuity, './assets/upgrades/intellect.png', "meditationBoost");
let inventiveness = new Upgrade("Inventiveness", "Units deal more damage per farming unit on screen.", "For each stack of meditation you have, units deal a additional stacking 6% (instead of 5%) damage. Maximum of 350 stacks (+2100%). NOTE: The 6 default farms do not count toward meditation stacks.", [9*10**15, 0, 0, 0, 9*10**14, 9*10**14, 9*10**14, 0], intellect, './assets/upgrades/inventiveness.png', "meditationBoost");
let innovation = new Upgrade("Innovation", "Units deal more damage per farming unit on screen.", "For each stack of meditation you have, units deal a additional stacking 5% (instead of 4%) damage. Maximum of 200 stacks (+1000%). NOTE: The 6 default farms do not count toward meditation stacks.", [5*10**11, 0, 4*10**11, 0, 3*10**11, 3*10**11, 0, 0], inventiveness, './assets/upgrades/innovation.png', "meditationBoost");
let inspiration = new Upgrade("Inspiration", "Units deal more damage per farming unit on screen.", "For each stack of meditation you have, units deal a additional stacking 4% (instead of 3%) damage. Maximum of 100 stacks (+400%). NOTE: The 6 default farms do not count toward meditation stacks.", [1.5*10**9, 1.2*10**9, 8*10**8, 8*10**8, 6*10**8, 0, 0, 0], innovation, './assets/upgrades/inspiration.png', "meditationBoost");
let imagination = new Upgrade("Imagination", "Units deal more damage per farming unit on screen.", "For each stack of meditation you have, units deal a additional stacking 3% (instead of 2%) damage. Maximum of 60 stacks (+180%). NOTE: The 6 default farms do not count toward meditation stacks.", [30000000, 2000000, 2000000, 2000000, 0, 0, 0, 0], inspiration, './assets/upgrades/imagination.png', "meditationBoost");
let meditation = new Upgrade("Meditation", "Units deal more damage per farming unit on screen.", "For each farming unit on screen (farm, cave, etc.), gain one stack of meditation. For each stack of meditation you have, units deal a stacking +2% damage. Maximum of 40 stacks (+80%). NOTE: The 6 default farms do not count toward meditation stacks.", [2000000, 200000, 20000, 0, 0, 0, 0, 0], imagination, './assets/upgrades/meditation.png', "meditationBoost");

let conviction = new Upgrade("Conviction", "Units deal more damage per every enemy killed.", "Damage boost per kill increased to +1.1%. Cap raised to infinity.", [5000000000000, 0, 0, 0, 20000000000, 1000000000, 1000000, 0], null, './assets/upgrades/conviction.png', "confidenceBoost");
let faith = new Upgrade("Faith", "Units deal more damage per every enemy killed.", "Damage boost per kill increased to +1%. Cap raised to 2000 for a maximum of +2000% bonus damage.", [250000000000, 0, 0, 0, 1500000000, 80000000, 1, 0], conviction, './assets/upgrades/faith.png', "confidenceBoost");
let belief = new Upgrade("Belief", "Units deal more damage per every enemy killed.", "Damage boost per kill increased to +0.9%. Cap raised to 1000 for a maximum of +900% bonus damage.", [5000000000, 0, 0, 15000000, 5000000, 1500000, 0, 0], faith, './assets/upgrades/belief.png', "confidenceBoost");
let ambition = new Upgrade("Ambition", "Units deal more damage per every enemy killed.", "Damage boost per kill increased to +0.7%. Cap raised to 700 for a maximum of +490% bonus damage.", [50000000, 0, 800000, 0, 50000, 15000, 0, 0], belief, './assets/upgrades/ambition.png', "confidenceBoost");
let confidence = new Upgrade("Confidence", "Units deal more damage per every enemy killed.", "Gain a stacking +0.4% damage boost for each enemy killed. This counts enemies that were killed prior to purchasing this upgrade. Stacks cap at 500 (+200% damage).", [1500000, 1500000, 100000, 50000, 0, 0, 0, 0], ambition, './assets/upgrades/confidence.png', "confidenceBoost");

let spireWarped = false;
let homesteadwarp = 1;
let warpspired = new Upgrade("Warpspired", 'Disallows purchasing of Windspires but provides a global damage nerf to enemies based on how many Windspires you have on screen.', `Sacrifice the ability to purchase windspires in order to enchant the homestead with wind. The homestead transforms into a massive windspire whose strength is determined by the number of windspires purchased before this upgrade. At your current amount of ${windspireunits} windspires, you will attain a ${Math.floor(100*(1 - 1/Math.log(windspireunits*2)))}% damage reduction to all units.`, [0, 0, 1000000000, 250000000, 100000000, 75000000, 5000000, 0], null, './assets/upgrades/warpspired.png', "spireWarp");
let vortexspired = new Upgrade("Vortexspired", "Windspires provide a stronger slow and damage reduction.", "Windspire enemy slowdown and damage reduction increased from 49% to approximately 59%.", [0, 0, 1000000000, 250000000, 11000000, 1100000, 0, 0], warpspired, './assets/upgrades/vortexspired.png', "spireBoost");
let stormspired = new Upgrade("Stormspired", "Windspires provide a stronger slow and damage reduction.", "Windspire enemy slowdown and damage reduction increased from 36% to approximately 49%.", [0, 100000000, 55000000, 8000000, 1000000, 0, 0, 0], vortexspired, './assets/upgrades/stormspired.png', "spireBoost");
let cryospired = new Upgrade("Cryospired", "Windspires provide a stronger slow and damage reduction.", "Windspire enemy slowdown and damage reduction increased from 20% to 36%.", [12000000, 22000000, 8000000, 1500000, 0, 0, 0, 0], stormspired, './assets/upgrades/cryospired.png', "spireBoost");

let physicsnerds = new Upgrade("Physics Nerds", "Enemies drop +400% antimatter.", "Enemies drop +400% antimatter.", [0, 0, 0, 0, 0, 4665600000, 1000000000, 0], null, './assets/upgrades/physicsnerds.png', "antimatterNerds");

let chemistrynerds3 = new Upgrade("Chemistry Nerds III", "Enemies drop +350% diamond.", "Enemies drop +350% diamond.", [0, 0, 0, 0, 0, 777600000, 0, 0], physicsnerds, './assets/upgrades/chemistrynerds3.png', "diamondNerds");
let chemistrynerds2 = new Upgrade("Chemistry Nerds II", "Enemies drop +300% titanium.", "Enemies drop +300% titanium.", [0, 0, 0, 0, 250000000, 129600000, 0, 0], chemistrynerds3, './assets/upgrades/chemistrynerds2.png', "titaniumNerds");
let chemistrynerds = new Upgrade("Chemistry Nerds I", "Enemies drop +275% copper.", "Enemies drop +275% copper.", [0, 0, 0, 200000000, 0, 21600000, 0, 0], chemistrynerds2, './assets/upgrades/chemistrynerds.png', "copperNerds");
let biologynerds3 = new Upgrade("Biology Nerds III", "Enemies drop +250% stone.", "Enemies drop +250% stone.", [0, 0, 200000000, 0, 0, 3600000, 0, 0], chemistrynerds, './assets/upgrades/biologynerds3.png', "stoneNerds");
let biologynerds2 = new Upgrade("Biology Nerds II", "Enemies drop +225% wood.", "Enemies drop +225% wood.", [0, 125000000, 0, 0, 0, 600000, 0, 0], biologynerds3, './assets/upgrades/biologynerds2.png', "woodNerds");
let biologynerds = new Upgrade("Biology Nerds I", "Enemies drop +200% food.", "Enemies drop +200% food.", [100000000, 0, 0, 0, 0, 100000, 0, 0], biologynerds2, './assets/upgrades/biologynerds.png', "foodNerds");

let sitecheck5 = new Upgrade("Site Check V", "Enemies drop more resources.", "Provides a permanent compounding +25% additional resources from enemies.", [5*10**20, 0, 0, 0, 0, 0, 0, 0], null, './assets/upgrades/sitecheck5.png', "resourceBoostBoost");
let sitecheck4 = new Upgrade("Site Check IV", "Enemies drop more resources.", "Provides a permanent compounding +25% additional resources from enemies.", [4*10**17, 0, 0, 0, 0, 0, 0, 0], sitecheck5, './assets/upgrades/sitecheck4.png', "resourceBoostBoost");
let sitecheck3 = new Upgrade("Site Check III", "Enemies drop more resources.", "Provides a permanent compounding +25% additional resources from enemies.", [3*10**14, 0, 0, 0, 0, 0, 0, 0], sitecheck4, './assets/upgrades/sitecheck3.png', "resourceBoostBoost");
let sitecheck2 = new Upgrade("Site Check II", "Enemies drop more resources.", "Provies a permanent compounding +25% additional resources from enemies.", [2*10**11, 0, 0, 0, 0, 0, 0, 0], sitecheck3, './assets/upgrades/sitecheck2.png', "resourceBoostBoost");
let sitecheck = new Upgrade("Site Check I", "Enemies drop more resources.", "Recheck the area for resources that may potentially be ignored before! Provides a permanent compounding +25% additional resources from enemies.", [10**8, 0, 0, 0, 0, 0, 0, 0], sitecheck2, './assets/upgrades/sitecheck.png', "resourceBoostBoost");

let volcanicTransformations = new Upgrade("Volcanic Transformations", "Prestiges the campfire unit again, granting more wave reduction but no buff to adjacent units.", "Researching this upgrade will prestige the campfire a second time. Adjacent units will gain no buffs, but time between waves will be reduced by a compounding 12%. Price will again be lowered back to base, and Magmas and Campfires will still be useable but unattainable. This action is PERMANENT and cannot be undone. This is the last campfire prestige. The purpose of this upgrade is to allow you to gain more control over wave spacing... send waves as fast as possible without getting overwhelemed to end with a faster clear time.", [0, 2*10**10, 10**9, 0, 10**9, 0, 0, 0], null, './assets/upgrades/volcanictransformation.png', "campfirePrestige");
let magmaticAlterations = new Upgrade("Magmatic Alterations", "Prestiges the campfire unit, changing it to grant an effect that allows waves to send faster. Buffs to adjacent units are halved.", "Researching this upgrade will change your campfire. New campfires will be replaced by Magmas with a reduced cost. These will boost the damage of adjacent campers by 25%, and each one on screen will reduce the time between waves by a compounding 10%. This action is PERMANENT and cannot be undone. All current campfires on screen will stay as campfires. The purpose of this upgrade is to allow you to gain more control over wave spacing... send waves as fast as possible without getting overwhelemed to end with a faster clear time.", [0, 2*10**8, 10**8, 0, 10**8, 0, 0, 0], volcanicTransformations, './assets/upgrades/magmaticalteration.png', "campfirePrestige");

let psionicCharge2 = new Upgrade("Battery II", "Maximum power increased by another 25.", "Maximum power increased by another 25.", [0, 0, 0, 0, 0, 0, 6*10**18, 0], null, './assets/upgrades/psionicCharge2.png', "psi");
let psionicCharge = new Upgrade("Battery I", "Maximum power increased by 25.", "Maximum power increased by 25.", [0, 0, 0, 0, 0, 0, 6*10**12, 0], psionicCharge2, './assets/upgrades/psionicCharge.png', "psi");

let revenge5 = new Upgrade("Retaliation V", "Every time a unit dies, powerful rockets are triggered, all enemies gain more debuff stacks, and all enemies lose health.", "Every time a unit or building dies, a ring of 16 rockets is triggered with 10x normal damage, all enemies gain +15 debuff stacks instead of +10 (doesn't apply to Water), and all enemies lose 4% of their current health.", [0, 0, 0, 0, 0, 0, 5*10**23, 0], null, './assets/upgrades/rev5.png', "rev");
let revenge4 = new Upgrade("Retaliation IV", "Rocket ring on death becomes stronger and all enemies gain +10 debuff stacks once something dies unless they have the Water debuff.", "Every time a unit or building dies, a ring of 16 rockets is triggered instead of 8, and all enemies gain +10 debuff stacks once something dies unless they have the Water debuff.", [0, 0, 0, 0, 0, 0, 4*10**19, 0], revenge5, './assets/upgrades/rev4.png', "rev");
let revenge3 = new Upgrade("Retaliation III", "Every time a unit or building dies, a ring of rockets is triggered.", "Every time a unit or building dies, a ring of 8 rockets is triggered, with each rocket being as strong as a normal projectile when you are in 'Rocket' mode.", [0, 0, 0, 0, 0, 0, 3*10**16, 0], revenge4, './assets/upgrades/rev3.png', "rev");
let revenge2 = new Upgrade("Retaliation II", "Every time a unit or building dies, all units deal 3% more damage instead of 1%.", "Every time a unit or building dies, all units deal 3% more damage instead of 1%.", [0, 0, 0, 0, 0, 0, 2*10**14, 0], revenge3, './assets/upgrades/rev2.png', "rev");
let revenge1 = new Upgrade("Retaliation I", "Every time a unit or building dies, all units deal 1% more damage.", "Every time a unit or building dies, all units deal 1% more damage.", [0, 0, 0, 0, 0, 0, 10**12, 0], revenge2, './assets/upgrades/rev1.png', "rev");

let omniscients = new Upgrade("STEAM Architects", "Dectuples every previous STEAM boost.", "Dectuples every previous STEAM boost. You gain 10% instead of 1% damage per upgrade, it increases the damage boost per farm from 2% to 20%, increases the resources gained per wave from 5x the current wave to 50x the current wave, and increases the logarithmic resource boost by a factor of 10.", [0, 0, 0, 0, 0, 0, 888*10**24, 0], null, './assets/upgrades/steam7.png', "steamBoost");
let architects = new Upgrade("STEAM Managers", "Logarithmic damage boost becomes much more powerful.", "STEAM Learners damage boost scales via base e instead of base 10 as well as doubling the bonus altogether. (ex. having 10T = 10^13 total resources would give +2993% total damage instead of +299%. Having 100Qa = 10^17 would give +3914% total damage instead of +391.)", [0, 0, 0, 0, 0, 10**18, 4*10**18, 0], omniscients, './assets/upgrades/steam6.png', "steamBoost");
let professors = new Upgrade("STEAM Professors", "Resource boost based on wave is doubled.", "Resource bonus based on wave is doubled (ex. wave 140 would give +280% loot).", [65*10**15, 0, 0, 0, 0, 0, 65*10**15, 0], architects, './assets/upgrades/steam5.png', "steamBoost");
let engineers = new Upgrade("STEAM Engineers", "Gain more loot as you progress through waves.", "Gain a resource bonus equivalent to the current wave as a percentage (ex. wave 140 would give +140% loot).", [450*10**12, 0, 0, 0, 350*10**12, 250*10**12, 850*10**12, 0], professors, './assets/upgrades/steam4.png', "steamBoost");
let developers = new Upgrade("STEAM Developers", "Gain more damage for every farm on screen.", "All units gain an additional +2% damage for every farm on screen, essentially raising the damage boost per Meditation stack by 2%.", [30*10**12, 0, 15*10**12, 0, 15*10**12, 15*10**12, 0, 0], engineers, './assets/upgrades/steam3.png', "steamBoost");
let researchers = new Upgrade("STEAM Researchers", "Gain more damage for every upgrade researched.", "All units gain +1% damage for every upgrade researched (including this one).", [800*10**9, 400*10**9, 600*10**9, 0, 0, 800*10**9, 0, 0], developers, './assets/upgrades/steam2.png', "steamBoost");
let learners = new Upgrade("STEAM Learners", "Gain more damage based on how many resources you have.", "Gain a global damage boost which is logarithmically proportional (base 10) with ratio 5% to the sum of your current resources (ex. having 10T = 10^13 total resources would give +65% total damage. Having 100Qa = 10^17 would give +85% total damage.)", [100*10**9, 0, 0, 0, 0, 50*10**9, 40*10**9, 0], researchers, './assets/upgrades/steam1.png', "steamBoost");

let [tecLevels, winLevels, aqLevels, eldLevels] = multiArray(4, 0);

let elderHex = new Upgrade("Elder Hex", "Enemies are significantly weakened once many debuff stacks stack up on them.", "Learn the ancient tactics of weakening already debuffed enemies. Every 100 debuff stacks on an enemy, one stack of Cursed will gather on said enemy. Every stack of Cursed will cause that enemy to take a compounding triple damage. In addition, every stack of Cursed will cause that enemy to gain 1 extra debuff stack per hit (doesn't work while Water is active).", [8750*10**24, 8750*10**24, 0, 0, 0, 0, 8750*10**24, 0], null, './assets/upgrades/elder4.png', "elderBoost");

let elderRampage = new Upgrade("Elder Rampage", "Elder Blaze ticks 4x faster.", "Elder Blaze ticks 4x faster, at a rate of twice per second.", [8750*10**20, 8750*10**20, 0, 0, 0, 0, 8750*10**20, 0], elderHex, './assets/upgrades/elder3.png', "elderBoost");
let elderBlaze = new Upgrade("Elder Blaze", "Enemies take percentage damage periodically based on how many total Fire stacks are on screen.", "Increases maximum Fire stacks by 100 and provides a periodic health slash on enemies if there are any Fire debuffed enemies on screen. All enemies lose 0.01% of their current health every 2 seconds per Fire debuff on the field, capping at 99% (9900 debuff stacks total to max). As an example, if there were a total of 4 enemies on screen with 200 Fire, 250 Fire, 150 Fire, and 500 Wind respectively, ALL of these enemies will take (200+250+150)/100 = 6% of their current health as damage every 2 seconds regardless of what debuff they possess.", [3750*10**16, 6250*10**16, 0, 0, 0, 0, 6250*10**16, 0], elderRampage, './assets/upgrades/elder2.png', "elderBoost");
let elderSpark = new Upgrade("Elder Spark", "Increases maximum Fire stacks by 100.", "Increases maximum Fire stacks by 100.", [3750*10**12, 6250*10**12, 0, 0, 0, 0, 6250*10**9, 0], elderBlaze, './assets/upgrades/elder1.png', "elderBoost");

let aquaticCataclysm = new Upgrade("Aquatic Cataclysm", "Water debuff is much stronger but enemies heal more health and drop far more loot.", "Increases maximum Water stacks by 50. Every time an enemy with a non-maxed water debuff is hit, they will gain an additional 2% (instead of 1.5%) or their original max health and every Water stack on an enemy increases their loot by 2% instead of 1%. Enemies with maxed Water take 50x damage (with no other boosts, this brings loot gained from maxed Water enemies from 16.5x to 64x).", [1250*10**16, 0, 0, 0, 0, 750*10**16, 250*10**16, 0], null, './assets/upgrades/aq3.png', "aquaBoost");
let aquaticCatalyst = new Upgrade("Aquatic Catalyst", "Water debuff is much stronger but enemies heal more health and drop far more loot.", "Increases maximum Water stacks by 50. Every time an enemy with a non-maxed water debuff is hit, they will instantly heal back to full while also receiving a maxhealth boost of 1.5% instead of 1%. Purchasing this upgrade makes Water enemies more difficult but they will also drop far more loot (with no other boosts, this brings loot gained from maxed Water enemies from 8.75x to 16.5x).", [1250*10**14, 0, 0, 0, 0, 750*10**14, 0, 0], aquaticCataclysm, './assets/upgrades/aq2.png', "aquaBoost");
let aquaticCatastrophe = new Upgrade("Aquatic Catastrophe", "Water debuff is much stronger but enemies heal more health and drop far more loot.", "Increases maximum Water stacks by 50 and increases the loot gained per stack from 0.5% to 1% (with no other boosts, this brings loot gained from maxed Water enemies from 6x to 8.75x).", [1250*10**12, 0, 0, 0, 0, 750*10**12, 0, 0], aquaticCatalyst, './assets/upgrades/aq1.png', "aquaBoost");

let windfinity = new Upgrade("Windfinity", "Wind max stacks increase by 1000 and enemies drop more loot when Wind is active (note that a non-wind enemy still drops more loot as long as the current debuff is Wind).", "Wind can stack 1000 more times. Enemies drop another compounding 5x loot (25x with windtelligence) while the Wind debuff is active (note that a non-wind enemy still drops more loot as long as the current debuff is Wind).", [250*10**16, 0, 0, 0, 0, 125*10**16, 125*10**16, 0], null, './assets/upgrades/wind3.png', "windBoost");
let windtelligence = new Upgrade("Windtelligence", "Wind can stack more and enemies drop more loot when Wind is active (note that a non-wind enemy still drops more loot as long as the current debuff is Wind).", "Increases maximum Wind stacks by 200 and enemies drop 5x loot when the Wind debuff is active (note that a non-wind enemy still drops more loot as long as the current debuff is Wind).", [250*10**14, 0, 0, 0, 0, 125*10**14, 0, 0], windfinity, './assets/upgrades/wind2.png', "windBoost");
let windfiltration = new Upgrade("Windfiltration", "Increases maximum Wind stacks by 200.", "Increases maximum Wind stacks by 200.", [250*10**12, 0, 0, 0, 0, 125*10**12, 0, 0], windtelligence, './assets/upgrades/wind1.png', "windBoost");

let tectonicSkewer = new Upgrade("Tectonic Skewer", "Increases maximum Earth stacks by 50 and enemies with Earth stacks take more percentage damage.", "Increases maximum Earth stacks by 50 and allows 4 stacks of Earth to gather on an enemy every hit instead of 3. Enemies with n stacks of Earth will lose (n/50K)% of their current health every hit instead of (n/100K)%.", [50*10**16, 0, 20*10**16, 0, 0, 0, 0, 0], null, './assets/upgrades/tec3.png', "tectonicBoost");
let tectonicSurge = new Upgrade("Tectonic Surge", "Increases maximum Earth stacks by 50 and enemies with Earth stacks take percentage damage.", "Increases maximum Earth stacks by 50 and allows 3 stacks of Earth to gather on an enemy every hit instead of 2. Enemies with n stacks of Earth will lose (n/100K)% of their current health every hit.", [50*10**14, 0, 20*10**14, 0, 0, 0, 0, 0], tectonicSkewer, './assets/upgrades/tec2.png', "tectonicBoost");
let tectonicStrike = new Upgrade("Tectonic Strike", "Increases maximum Earth stacks by 50 and allows it to stack faster.", "Increases maximum Earth stacks by 50 and allows 2 stacks of Earth to gather on an enemy every hit instead of 1.", [50*10**12, 0, 20*10**12, 0, 0, 0, 0, 0], tectonicSurge, './assets/upgrades/tec1.png', "tectonicBoost");

let psh2 = new Upgrade("Pip, Squeak, and Herman II", "All boosts from Pip, Squeak, and Herman are stronger.", "Damage boost from Pip is doubled (+100% -> +200%), attack speed boost from Squeak is tripled (+30% -> +90%), and antimatter boost from Herman is quadrupled (+300% -> +1200%).", [10**24, 0, 0, 0, 0, 0, 0, 0], null, './assets/upgrades/psh2.png', "psh");
let psh = new Upgrade("Pip, Squeak, and Herman I", "Grants a cyclic buff based on wave, swapping constantly between Pip, Squeak, and Herman.", "Grants a cyclic buff based on wave, swapping constantly between Pip, Squeak, and Herman. While the Pip buff is active, all units deal +100% damage. While the Squeak buff is active, all units shoot 30% faster. While the Herman buff is active, antimatter gain is increased by 300%. Purchasing this upgrade will cause the Pip buff to initiate on the current wave, which will then swap to Squeak and then to Herman, with any specific buff occuring once every 3 waves. Note that there is no way after purchasing this upgrade to change which buff is on which wave, so purchase wisely!", [1337, 0, 0, 0, 0, 0, 0, 0], psh2, './assets/upgrades/psh.png', "psh");

let aura5 = new Upgrade("Aura VI", "Enemies under aura influence take more damage and gain debuff stacks faster (unless it's water debuff). Triggers a periodic ring of arrows.", "Enemies under Aura influence take 800% more damage instead of 200% more. In addition, enemies will gain +4 debuff stacks (for a total of +6 with Aura IV) per hit while under the influence of Aura (does not work against Water enemies). Triggers a periodic ring of 20 arrows every 1.5 seconds which are as powerful as your current level of crossbow projectiles. This will also be desynced and fired during the gaps between turret and rocket rings.", [0, 0, 0, 0, 0, 5*10**30, 0, 0], null, './assets/upgrades/aura6.png', "aura");
let aura4 = new Upgrade("Aura V", "Aura has more range and enemies under its influence gain debuff stacks faster (unless it's water debuff).", "Aura radius increased from 250 to 300. In addition, enemies will gain +2 debuff stacks per hit while under the influence of Aura (does not work against Water enemies).", [0, 0, 0, 0, 0, 5*10**25, 0, 0], aura5, './assets/upgrades/aura5.png', "aura");
let aura3 = new Upgrade("Aura IV", "Aura has more range and enemies under its influence take more damage. Triggers a periodic ring of rockets.", "Aura radius increased from 200 to 250 and enemies under its influence take 200% more damage instead of 80% more. Every 3 seconds, unleashes a ring of 20 rockets which are as strong as your rocket level. This ring of rockets will be desynced with your ring of turret projectiles to have consistent damage.", [0, 0, 0, 0, 0, 5*10**20, 0, 0], aura4, './assets/upgrades/aura4.png', "aura");
let aura2 = new Upgrade("Aura III", "Aura has a higher damage increase.", "Aura damage increase increased from 40% to 80%.", [0, 0, 0, 0, 0, 5*10**15, 0, 0], aura3, './assets/upgrades/aura3.png', "aura");
let aura1 = new Upgrade("Aura II", "Enemies under aura take more damage and triggers a periodic bullet ring.", "Aura damage increase increased from 20% to 40%. Every 3 seconds, unleashes a ring of 20 bullets which deal damage equivalent to your current turret strength.", [0, 0, 0, 0, 0, 5*10**10, 0, 0], aura2, './assets/upgrades/aura2.png', "aura");

let crossbow5 = new Upgrade("Crossbow VI", "Crossbow has more pierce and attacks 3x faster.", "Crossbow has its pierce increased from 8 to 10. Crossbow also attacks thrice as fast.", [0, 0, 6*10**26, 0, 0, 6*10**26, 6*10**26, 0], null, './assets/upgrades/xbow6.png', "crossbow");
let crossbow4 = new Upgrade("Crossbow V", "Crossbow has more pierce and attacks 2x faster.", "Crossbow has its pierce increased from 6 to 8. Crossbow also attacks twice as fast.", [0, 0, 6*10**16, 0, 0, 6*10**16, 6*10**16, 0], crossbow5, './assets/upgrades/xbow5.png', "crossbow");
let crossbow3 = new Upgrade("Crossbow IV", "Crossbow has more pierce and damage.", "Crossbow deals 2x damage for a total of 8x damage and has its pierce increased from 5 to 6.", [0, 6*10**13, 6*10**13, 6*10**13, 0, 6*10**13, 0, 0], crossbow4, './assets/upgrades/xbow4.png', "crossbow");
let crossbow2 = new Upgrade("Crossbow III", "Crossbow has more pierce and damage.", "Crossbow deals 2x damage for a total of 4x damage and has its pierce increased from 4 to 5.", [0, 6*10**10, 6*10**10, 6*10**10, 0, 0, 0, 0], crossbow3, './assets/upgrades/xbow3.png', "crossbow");
let crossbow1 = new Upgrade("Crossbow II", "Crossbow has more pierce and damage.", "Crossbow deals 2x damage and has its pierce increased from 3 to 4.", [15*10**7, 0, 10**8, 0, 0, 0, 0, 0], crossbow2, './assets/upgrades/xbow2.png', "crossbow");

let rocket5 = new Upgrade("Rocket VI", "Rocket is stronger and has more blast radius.", "Rocket deals 3x damage for a total of 243x damage and has 300% more blast radius.", [9*10**17, 0, 0, 9*10**17, 0, 9*10**17, 9*10**17, 0], null, './assets/upgrades/rocket6.png', "rocket");
let rocket4 = new Upgrade("Rocket V", "Rocket does even more damage.", "Rocket deals 3x damage for a total of 81x damage.", [8*10**13, 0, 0, 7*10**13, 0, 6*10**13, 5*10**13, 0], rocket5, './assets/upgrades/rocket5.png', "rocket");
let rocket3 = new Upgrade("Rocket IV", "Rocket does even more damage.", "Rocket deals 3x damage for a total of 27x damage.", [8*10**10, 0, 0, 7*10**10, 0, 6*10**10, 0, 0], rocket4, './assets/upgrades/rocket4.png', "rocket");
let rocket2 = new Upgrade("Rocket III", "Rocket is stronger and has bigger explosions.", "Rocket deals 3x damage for a total of 9x damage and has another 50% more blast radius.", [5*10**8, 0, 4*10**8, 3*10**8, 0, 0, 0, 0], rocket3, './assets/upgrades/rocket3.png', "rocket");
let rocket1 = new Upgrade("Rocket II", "Rocket is stronger and has bigger explosions.", "Rocket deals 3x damage and has 50% more blast radius.", [15*10**6, 0, 10**7, 0, 0, 0, 0, 0], rocket2, './assets/upgrades/rocket2.png', "rocket");

let turret5 = new Upgrade("Turret VI", "Turret shoots faster and does 3x damage.", "Turret shoots twice as fast and deals 3x more damage, for a total of 243x more damage.", [75*10**14, 45*10**14, 0, 0, 45*10**14, 0, 45*10**14, 0], null, './assets/upgrades/turret6.png', "turret");
let turret4 = new Upgrade("Turret V", "Turret shoots faster and does 3x damage.", "Turret shoots twice as fast and deals 3x more damage, for a total of 81x more damage.", [9*10**10, 6*10**10, 0, 0, 4*10**10, 3*10**10, 0, 0], turret5, './assets/upgrades/turret5.png', "turret");
let turret3 = new Upgrade("Turret IV", "Turret deals triple damage.", "Turret deals triple damage for a total of 27x damage.", [6*10**8, 6*10**8, 0, 0, 0, 6*10**8, 0, 0], turret4, './assets/upgrades/turret4.png', "turret");
let turret2 = new Upgrade("Turret III", "Turret deals triple damage.", "Turret deals triple damage for a total of 9x damage.", [5*10**7, 10**7, 10**7, 0, 0, 0, 0, 0], turret3, './assets/upgrades/turret3.png', "turret");
let turret1 = new Upgrade("Turret II", "Turret deals triple damage.", "Turret deals triple damage.", [350000, 130000, 0, 0, 0, 0, 0, 0], turret2, './assets/upgrades/turret2.png', "turret");

let ab7 = new Upgrade("AB7: Flame of the West", "Revives some enemies that have a high amount of health to farm loot off of.", "Resurrects 3% of your total enemies killed equivalent in strength to your current wave with massively increased health (and loot) but with very little damage. Note that the scaling of these enemies are based off of scaling between waves 200-250, so if this upgrade is purchased before wave 200, the spawned enemies will have exceptionally high health.", [0, 0, 0, 0, 0, 0, 3*10**27, 0], null, './assets/upgrades/ab7.png', "abBoost");
let ab6 = new Upgrade("AB6: 2 + 2 = 5", "Enemies gain 2x damage, 2x speed, and 5x health (and loot).", "Enemies gain 2x damage, 2x speed, and 5x health (and loot).", [0, 0, 0, 0, 0, 0, 1984, 0], ab7, './assets/upgrades/ab6.png', "abBoost");
let ab5 = new Upgrade("AB5: Bxh7+", "Units do no damage for a while but will permanently do more damage.", "Units deal zero damage for the next 10 seconds (will still attack and stack debuffs, effects such as percentage damage and damage over time will still have effect). When these 10 seconds expire, all units will permanently deal triple base damage.", [0, 0, 0, 0, 0, 0, 7*10**15, 0], ab6, './assets/upgrades/ab5.png', "abBoost");
let ab4 = new Upgrade("AB4: The Marauder's Map", "Buffs your map, gaining the ability to teleport by clicking the 0 hotkey. Also gives you 100x damage if at least 100 enemies are present.", "Grants three map bonuses. (1) Enemies on the map will be colour-coded based on what type they are. Regular enemies are yellow and bosses are red. (2) Grants you the ability to teleport anywhere on the map by clicking the 0 key on the minimap - you will land in the respective spot on the real map that your mouse is hovered over. Teleport costs nothing and has no cooldown. (3) Once at least 100 enemies are on the map, a damage bonus of 100x is triggered. This bonus will go away once the number of enemies drops below 100 and will always re-trigger once 100 enemies appear.", [0, 0, 0, 0, 0, 15*10**14, 90*10**14, 0], ab5, './assets/upgrades/ab4.png', "abBoost");
let ab3 = new Upgrade("AB3: Big Chungus", "Enemies spawn with 3x health and loot.", "Enemies spawn with 3x health and loot.", [0, 0, 0, 0, 0, 25*10**12, 15*10**12, 0], ab4, './assets/upgrades/ab3.png', "abBoost");
let ab2 = new Upgrade("AB2: The Showercap", "Projectiles become slower after hitting an enemy.", "All projectiles at max speed (40 units per second) lose 90% (36) of their projectile speed once it hits an enemy.", [0, 0, 0, 0, 18*10**10, 9*10**10, 3*10**9, 0], ab3, './assets/upgrades/ab2.png', "abBoost");
let ab1 = new Upgrade("Accidental Brilliancy (AB1)", "Enemies and units do less damage.", "Enemies deal 50% less damage but units deal 20% less damage.", [0, 0, 0, 0, 8*10**8, 6*10**8, 0, 0], ab2, './assets/upgrades/ab1.png', "abBoost");

let levitating = new Upgrade("Levitating", "All enemies will be significantly weaker when spawned and deal 0 damage.", "Enemies will now spawn with near-zero health and no damage. The exact mechanics of this upgrade raises the enemies' original health to the 1/5th power (an enemy that previously spawned with 1No health will now spawn with only 1M health - a change enough to make nearly all enemies one-hittable) and decreases all enemy attacks to 0 damage. Note that this upgrade also decreases resources gained by the same factor, meaning that all resources (except power) will basically be capped at your current amount for the rest of the game.", [0, 0, 0, 0, 0, 0, 10**63*90, 0], null, './assets/upgrades/levitating.png', "speakBoost");
let firework = new Upgrade("Firework", "Speakers are cheaper and fire can stack more.", "Speakers are 1 million times cheaper. Maximum fire debuff stacks increased by 200.", [0, 0, 0, 0, 0, 0, 704*10**21, 0], levitating, './assets/upgrades/firework.png', "speakBoost");
let believer = new Upgrade("Believer", "Speakers are cheaper and LTs/Leaders have more of a boost.", "Speakers are 1 million times cheaper. Boosts from LTs and Leaders increase by 600% of their base amount (equivalent to 12 synergy upgrades).", [0, 0, 0, 0, 0, 0, 336*10**12, 0], firework, './assets/upgrades/ybwm.png', "speakBoost");

let catalyticAndSharp = new Upgrade("Catalytic and Sharp", "Increases power gain from charge, increases max debuff stacks, and increases antimatter drops from enemies.", "An epic 3-in-1 deal featuring: (1) Reduces charge gained per hit from 8 to 1 but gain 1 power per 100 charge instead of 1000. (2) Increases max stacks for all debuffs by 100. (3) Enemies drop 10x antimatter.", [0, 0, 0, 0, 0, 0, 9*10**18, 0], null, './assets/upgrades/sharp8.png', "leechBoost");
let criticalAndSharp = new Upgrade("Critical and Sharp", "Gain 8 charge per hit instead of 7 and gives an additional 15% crit chance.", "Gain 8 charge per hit instead of 7 and gives an additional 15% crit chance.", [0, 0, 0, 0, 256*10**14, 0, 256*10**16, 0], catalyticAndSharp, './assets/upgrades/sharp7.png', "leechBoost");
let divineAndSharp = new Upgrade("Unwavering and Sharp", "Gain 7 charge per hit instead of 6 and allows all units to shoot 20% faster.", "Gain 7 charge per hit instead of 6 and allows all units to shoot 20% faster.", [0, 0, 0, 0, 128*10**13, 0, 128*10**14, 0], criticalAndSharp, './assets/upgrades/sharp6.png', "leechBoost");
let empoweredAndSharp = new Upgrade("Empowered and Sharp", "Gain 6 charge per hit instead of 5 and deal an additional 0.5% damage per stack on an enemy with a debuff.", "Gain 6 charge per hit instead of 5 and deal an additional 0.5% damage per stack on an enemy with a debuff.", [0, 0, 0, 0, 64*10**12, 0, 64*10**12, 0], divineAndSharp, './assets/upgrades/sharp5.png', "leechBoost");
let swiftAndSharp = new Upgrade("Swift and Sharp", "Gain 5 charge per hit instead of 4 and reduces the maximum time between debuff swaps by 2 waves.", "Gain 5 charge per hit instead of 4 and reduces the maximum time between debuff swaps by 2 waves.", [0, 0, 0, 0, 32*10**11, 0, 32*10**11, 0], empoweredAndSharp, './assets/upgrades/sharp4.png', "leechBoost");
let armoredAndSharp = new Upgrade("Armored and Sharp", "Gain 4 charge per hit instead of 3 and increases the health of all future LEAD campers by 100%.", "Gain 4 charge per hit instead of 3 and increases the health of all future LEAD campers by 100%.", [0, 0, 0, 0, 16*10**10, 0, 16*10**10, 0], swiftAndSharp, './assets/upgrades/sharp3.png', "leechBoost");
let chargedAndSharp = new Upgrade("Charged and Sharp", "Gain 3 charge per hit instead of 2 and increases max power storage by 25.", "Gain 3 charge per hit instead of 2 and increases max power storage by 25.", [0, 0, 0, 0, 8*10**9, 0, 8*10**9, 0], armoredAndSharp, './assets/upgrades/sharp2.png', "leechBoost");
let clearAndSharp = new Upgrade("Clear and Sharp", "Gain 2 charge per hit instead of 1 and increases the range of all units by 10%.", "Gain 2 charge per hit instead of 1 and increases the range of all units by 10%.", [0, 0, 0, 0, 4*10**8, 0, 4*10**8, 0], chargedAndSharp, './assets/upgrades/sharp1.png', "leechBoost");
let lifebloodSiphon3 = new Upgrade("Sharpness III", "Homestead heals more health per every enemy death and charge will gradually build up, allowing more power to be gained.", "For every enemy killed, the homestead replenishes 300 hp, up to its maximum health. In addition, every hit on an enemy adds a stack of charge. One unit of power is gained in exchange for 1000 units of charge if possible - otherwise charge will stack infinitely.", [6*10**8, 0, 0, 0, 3*10**8, 2*10**8, 0, 0], clearAndSharp, './assets/upgrades/lifebloodsiphon3.png', "leechBoost");
let lifebloodSiphon2 = new Upgrade("Sharpness II", "Homestead heals more health per every enemy death.", "For every enemy killed, the homestead replenishes 200 hp, up to its maximum health.", [9*10**7, 0, 0, 0, 9*10**7, 45*10**6, 0, 0], lifebloodSiphon3, './assets/upgrades/lifebloodsiphon2.png', "leechBoost");
let lifebloodSiphon = new Upgrade("Sharpness I", "Homestead heals health per every enemy death.", "For every enemy killed, the homestead replenishes 100 hp, up to its maximum health.", [10**7, 0, 0, 0, 10**7, 5*10**6, 0, 0], lifebloodSiphon2, './assets/upgrades/lifebloodsiphon.png', "leechBoost");

let tarzan = new Upgrade("Tarzan", "All units gain more range and damage while enemies do less damage.", "All units gain a stacking 30% damage and a stacking 15% range. Enemies deal a compounding 15% less damage.", [0, 0, 0, 0, 0, 10**18, 0, 0], null, './assets/upgrades/song7.png', "songBoost");
let purpleStew = new Upgrade("Purple Stew", "All units gain more range and damage while enemies do less damage.", "All units gain a stacking 30% damage and a stacking 15% range. Enemies deal a compounding 15% less damage.", [10**16, 0, 0, 0, 0, 0, 0, 0], tarzan, './assets/upgrades/song6.png', "songBoost");
let toast = new Upgrade("Toast!", "All units gain more range and damage while enemies do less damage.", "All units gain a stacking 30% damage and a stacking 15% range. Enemies deal a compounding 15% less damage.", [10**14, 0, 0, 0, 0, 0, 0, 0], purpleStew, './assets/upgrades/song5.png', "songBoost");
let boomChickaboom = new Upgrade("Boom Chickaboom", "All units gain more range and damage while enemies do less damage.", "All units gain a stacking 15% damage and range. Enemies deal a compounding 15% less damage.", [0, 0, 10**12, 0, 0, 0, 0, 0], toast, './assets/upgrades/song4.png', "songBoost");
let babyBumblebee = new Upgrade("Baby Bumblebee", "All units gain more range and damage while enemies do less damage.", "All units gain a stacking 15% damage and range. Enemies deal a compounding 15% less damage.", [10**10, 0, 0, 0, 0, 0, 0, 0], boomChickaboom, './assets/upgrades/song3.png', "songBoost");
let littleRedWagon = new Upgrade("Little Red Wagon", "All units gain more range and damage while enemies do less damage.", "All units gain a stacking 15% damage and range. Enemies deal a compounding 15% less damage.", [0, 10**8, 0, 0, 0, 0, 0, 0], babyBumblebee, './assets/upgrades/song2.png', "songBoost");
let greatBigMoose = new Upgrade("Great Big Moose", "All units gain more range and damage while enemies do less damage.", "All units gain a stacking 15% damage and range. Enemies deal a compounding 15% less damage.", [10**6, 0, 0, 0, 0, 0, 0, 0], littleRedWagon, './assets/upgrades/song.png', "songBoost");

let primeModulation = new Upgrade("Prime Modulation", "Enemies drop far more resources on prime numbered waves.", "Enemies drop p times as much resources on wave p if p is a prime number (ex. since 211 is a prime, enemies killed on wave 211 will drop 211x as much resources).", [0, 0, 0, 0, 0, 0, 10**36, 0], null, './assets/upgrades/primeModulation.png', "PrimeBoost");
let LEADmodule11 = new Upgrade("LEAD Module XI", "LEAD campers gain damage equivalent to dectuple the current wave as a percentage (ex. on wave 216, LEAD campers gain +2160% damage).", "LEAD campers gain damage equivalent to dectuple the current wave as a percentage (ex. on wave 216, LEAD campers gain +2160% damage).", [0, 0, 0, 0, 0, 0, 11*10**27, 0], primeModulation, './assets/upgrades/l11.png', "LEADBoost");
let LEADmodule10 = new Upgrade("LEAD Module X", "Every lead camper increases the damage of all LEAD campers by an additive 30% instead of 15%.", "Every lead camper increases the damage of all LEAD campers by an additive 30% instead of 15%.", [0, 0, 0, 0, 0, 0, 10*10**24, 0], LEADmodule11, './assets/upgrades/l10.png', "LEADBoost");
let LEADmodule9 = new Upgrade("LEAD Module IX", "LEAD campers deal 5x damage.", "LEAD campers deal 5x damage.", [0, 0, 0, 0, 0, 0, 9*10**21, 0], LEADmodule10, './assets/upgrades/l9.png', "LEADBoost");
let LEADmodule8 = new Upgrade("LEAD Module VIII", "LEAD campers shoot twice as fast.", "LEAD campers shoot twice as fast.", [0, 0, 0, 0, 0, 0, 8*10**19, 0], LEADmodule9, './assets/upgrades/l8.png', "LEADBoost");
let LEADmodule7 = new Upgrade("LEAD Module VII", "LEAD campers fire 5 projectiles at once in a 40-degree arc.", "LEAD campers fire 5 projectiles at once in a 40-degree arc.", [0, 0, 0, 0, 0, 0, 7*10**17, 0], LEADmodule8, './assets/upgrades/l7.png', "LEADBoost");
let LEADmodule6 = new Upgrade("LEAD Module VI", "Every LEAD camper increases the maximum amount that all debuffs can stack by 5.", "Every LEAD camper increases the maximum amount that all debuffs can stack by 5.", [0, 0, 0, 0, 0, 0, 6*10**15, 0], LEADmodule7, './assets/upgrades/l6.png', "LEADBoost");
let LEADmodule5 = new Upgrade("LEAD Module V", "LEAD campers gain 10x health.", "LEAD campers gain 10x health.", [0, 0, 0, 0, 0, 0, 5*10**13, 0], LEADmodule6, './assets/upgrades/l5.png', "LEADBoost");
let LEADmodule4 = new Upgrade("LEAD Module IV", "LEAD campers deal 3x damage.", "LEAD campers deal 3x damage.", [0, 0, 0, 0, 0, 0, 4*10**12, 0], LEADmodule5, './assets/upgrades/l4.png', "LEADBoost");
let LEADmodule3 = new Upgrade("LEAD Module III", "LEAD campers fire 3 projectiles at once in a 120-degree arc.", "LEAD campers fire 3 projectiles at once in a 120-degree arc.", [0, 0, 0, 0, 0, 0, 3*10**11, 0], LEADmodule4, './assets/upgrades/l3.png', "LEADBoost");
let LEADmodule2 = new Upgrade("LEAD Module II", "LEAD campers deal +15% damage for every LEAD camper on screen (including itself).", "LEAD campers deal +15% damage for every LEAD camper on screen (including itself).", [0, 0, 0, 0, 0, 0, 2*10**10, 0], LEADmodule3, './assets/upgrades/l2.png', "LEADBoost");
let LEADmodule = new Upgrade("LEAD Module I", "LEAD campers deal 2x damage and gain 2x health.", "LEAD campers deal 2x damage and gain 2x health.", [0, 0, 0, 0, 0, 0, 10**9, 0], LEADmodule2, './assets/upgrades/l1.png', "LEADBoost");


let ewwf = new Upgrade("Earth, Wind, Water, Fire", `Units permanently deal 50% more damage. Unlocks new game mechanics that will greatly aid in the rest of the game.`, `Units permanently deal 50% more damage. Unlocks a debuff tab that lets you switch between different 'modes' to weaken the enemies in a different way: Earth, Wind, Water, and Fire. Each time an enemy is hit, they will gain a debuff stack, capping at 200 (raisable with upgrades). Earth allows enemies with stacks to take more damage. Wind weakens enemies, causing them to do less damage. Water heals enemies but make them give a lot more loot. Fire debuff causes enemies to constantly take damage.`, [50000000, 50000000, 50000000, 0, 0, 50000000, 0, 0], null, './assets/upgrades/ewwf.png', "ewwf");

let empowermentDesc = "Congratulations! You have officially made it past the first stage of the game. Enemies are now much stronger but also give more loot. Resource production will be increased, and you will have access to diamonds, a valuable resource in the later game. Campfires are now unlocked, and a game changing mechanic will be introduced soon. Your resources owned will increase by 5% after each wave. Units shoot 75% slower with +300% damage, and enemies appear 75% less frequently with +300% loot to reduce lag. Units units will also gain a compounding 0.2% damage every wave (starting from wave 1). The homestead also gains 10x health. Good luck!";
let corruptionDesc = "Congratulations! You have officially made it past the second stage of the game. Waves are more frequently sent, with spacing reduced from 9 to 7 seconds. Enemies are further buffed and also give more loot and will now explode on death, releasing a ring of projectiles whose strength scales with waves. A unique resource POWER is now abiliable. Power can be used to cast special abilities and is the only resource with a hard-cap that can be increased. Power will be passively generated based on the amount of power you have. The wave spacing reduction from previous embers and volcanoes no longer has effects - instead their costs have been reverted to base and newly placed ones will have full effects for the next 50 waves, when thereafter they will reset again. Good luck!";
let apocDesc = "Congratulations! You have officially made it to the fourth stage of the game. Waves are more frequently sent, and enemies are much stronger, and also give a compounding 5% more loot per wave after 150. The wave spacing reduction from previous embers and volcanoes no longer has effects and no more can be purchased. Be on the lookout for upgrades and effects that can significantly reduce your clear time. Good luck!";
let chaosDesc = "Congratulations! You have officially made it to the fifth stage of the game. Waves are now sent only once every 90 seconds and enemies are much stronger. Good luck!";

let paDesc = ["Through fire and ice you've fought to the end,", "Though the world is still broken, it's starting to mend.", "Against the sunset you menacingly stand,", "Knowing that enemies fall to the unwavering hand.", "But if you're not strong and you're not levitating,", "The consequences will be devastating.", "For you have arrived here at a monsterous cost,", "Complete the task else all shall be lost."];

let debuffDesc = `This is the debuffs tab, where you can swap between debuffs (Earth/Wind/Water/Fire). There is a cooldown of ${maxswapcd} waves between debuff swaps. Each swap will result in a different elemental debuff being applied to all enemies - you can gain more details by hovering over their icons.`;

let empNone = `Enemies currently have ${empowerment}% more health (will also drop ${empowerment}% more resources) and deal ${empowerment/10}% more damage. No stacks of Empowerment will gather. Note that Empowerment does not affect superbosses.`;
let empEarth = `Enemies currently have ${empowerment}% more health (will also drop ${empowerment}% more resources), deal ${empowerment/10}% more damage, and heal for ${empowerment/100}% of their max health every second. [wave/10] stacks of Empowerment will gather each wave. Note that Empowerment does not affect superbosses.`;
let empWind = `Enemies currently have ${empowerment}% more health (will also drop ${empowerment}% more resources), deal ${empowerment*0.15}% more damage, and move ${empowerment}% faster. [wave/10] stacks of Empowerment will gather each wave. Note that Empowerment does not affect superbosses.`;
let empWater = `Enemies currently have ${empowerment*1.5}% more health (will also drop ${empowerment*1.5}% more resources), deal ${empowerment/20}% more damage, and slow your power generation by ${Math.floor((1 - 0.9997**empowerment)*1000)/10}%. [wave/10] stacks of Empowerment will gather each wave. Note that Empowerment does not affect superbosses.`;
let empFire = `Enemies currently have ${empowerment}% more health (will also drop ${empowerment}% more resources), deal ${empowerment/10}% more damage, and increases enemy explosion damage by ${empowerment/2}%. [wave/10] stacks of Empowerment will gather each wave. Note that Empowerment does not affect superbosses.`;
let empRand = `Enemies currently have ${empowerment}% more health (will also drop ${empowerment}% more resources) and deal ${empowerment/10}% more damage. [wave/10] stacks of Empowerment will gather each wave. Note that Empowerment does not affect superbosses.`;

let emps = [empNone, empEarth, empWind, empWater, empFire, empRand];
let meditationFarms = farmunits + caveunits + compressunits + mineunits + pressurizerunits;

mousePos = {x:0, y:0};
tileSelect = {m:0, n:0};

addEventListener("mousemove", event => {
    mousePos.x = event.clientX;
    mousePos.y = event.clientY;
    tileSelect.m = Math.floor((player.x - canvas.width / 2 + mousePos.x) / 50) + 1;
    tileSelect.n = Math.floor((player.y - canvas.height / 2 + mousePos.y) / 50) + 1;
	if (checkDimensions(100, 140, canvas.height - 140, canvas.height - 100) && display == "units" && ewwfUnlocked == true) {
		if (currentDebuff == "Earth") description = "earth";
		if (currentDebuff == "Wind") description = "wind";
		if (currentDebuff == "Water") description = "water";
		if (currentDebuff == "Fire") description = "fire";
	} else if (checkDimensions(100, 150, canvas.height - 220, canvas.height - 170) && display == "turbo" && oc >= 4) description = "send";
	else if (checkDimensions(215, 265, canvas.height - 220, canvas.height - 170) && display == "turbo" && oc >= 5) description = "reverse";
	else if (checkDimensions(330, 380, canvas.height - 220, canvas.height - 170) && display == "turbo" && oc >= 5) description = "pause";
    else description = null;
	
	if (event.clientX > 440 && event.clientX < 840 && event.clientY < canvas.height - 67 && event.clientY > canvas.height - 117 && abilityDisplay % 2 == 1) {
		abilityIndex = Math.floor((event.clientX - 440)/50);
	} else abilityIndex = null;

	if (checkDimensions(canvas.width - 175, canvas.width - 135, 30, 60) && meditationBoost > 0) infohover = "Meditation";
	else if (checkDimensions(canvas.width - 175, canvas.width - 135, 80, 110) && confidenceBoost > 0) infohover = "Confidence";
	else if (checkDimensions(canvas.width - 175, canvas.width - 135, 130, 160) && leechBoost >= 3) infohover = "Charge";
	else if (checkDimensions(canvas.width - 175, canvas.width - 135, 180, 210) && lrb == true) infohover = "STEAM Architects";
	else if (checkDimensions(canvas.width - 175, canvas.width - 135, 280, 310) && pipInitialWave) infohover = "psh";
	else if (checkDimensions(canvas.width - 175, canvas.width - 135, 230, 260) && primed) infohover = "Prime";
	else if (checkDimensions(canvas.width / 2 - 110, canvas.width / 2 - 80, 120, 150) && currentDebuff != null) infohover = currentDebuff;
	else if (checkDimensions(canvas.width / 2, canvas.width / 2 + 30, 120, 150) && ewwfUnlocked == true) {
		switch(currentDebuff) {
			case null: infohover = "Unempowered"; break;
			case "Earth": infohover = "Naturalistic"; break;
			case "Wind": infohover = "Windstream"; break;
			case "Water": infohover = "Liquidity"; break;
			case "Fire": infohover = "Meltdown"; break;
			case "Misfortune": infohover = "Chaos"; break;
		}
	}
	else if (checkDimensions(44, 236, 502, 542)) {
		for (let i = 0; i < 4; i++) {
			if (checkDimensions(50 + 46*i, 92 + 46*i, 502, 542)) infohover = weapons[i];
		}
	}
	else if (checkDimensions(44, 236, 460, 500)) infohover = "Nerd";
	else if (checkDimensions(canvas.width / 2 - 10, canvas.width / 2 + 40, 32, 82)) infohover = "Nightfall";	
	else infohover = null;
	
	if (intropage == 4) {
		if (intropage == 4 && checkDimensions(canvas.width / 2 - 390, canvas.width / 2 - 210, canvas.height / 2 + 30, canvas.height / 2 + 100)) difficultyHovered = 1; 	
		else if (intropage == 4 && checkDimensions(canvas.width / 2 - 190, canvas.width / 2 - 10, canvas.height / 2 + 30, canvas.height / 2 + 100)) difficultyHovered = 2; 	
		else if (intropage == 4 && checkDimensions(canvas.width / 2 + 10, canvas.width / 2 + 190, canvas.height / 2 + 30, canvas.height / 2 + 100)) difficultyHovered = 3; 	
		else if (intropage == 4 && checkDimensions(canvas.width / 2 + 210, canvas.width / 2 + 390, canvas.height / 2 + 30, canvas.height / 2 + 100)) difficultyHovered = 4; 	
		else difficultyHovered = null;
	}
	
	if (intropage == 4 && difficultySelected == 4 && event.clientY < 100 && event.clientX > canvas.width - 100) {
		document.getElementById("passcode").style.display = "initial";
		document.getElementById("submitter").style.display = "initial";
		passcoded = true;
	}
})

addEventListener("click", event => {
	if (wave == 50 && enemies.length == 0 && empowered == false) empowerdesc++;
	if (wave == 100 && enemies.length == 0 && corrupted == false) corruptdesc++;
	if (wave == 150 && enemies.length == 0 && apocalyptic == false && difficultySelected != 1) apocdesc++;
	if (wave == 200 && enemies.length == 0 && chaotic == false && difficultySelected != 2) chaosdesc++;
	if (wave == 250 && enemies.length == 0 && pandemonium == false && difficultySelected != 3) padesc++;
	
	if (intropage == 4 && difficultySelected != null && event.clientX > canvas.width - 230 && event.clientX < canvas.width - 50 && event.clientY > canvas.height - 120 && event.clientY < canvas.height - 50) {
		switch(difficultySelected) {
			case 1: difficultyMultiplier = 0.75; break;
			case 2: difficultyMultiplier = 1; break;
			case 3: difficultyMultiplier = 1.25; break;
			case 4: difficultyMultiplier = 2; break;
			default: break;
		}
		intropage++;
		pause++;
		document.getElementById("passcode").style.display = "none";
		document.getElementById("submitter").style.display = "none";
		redisplay();
	}
	
	if (intropage == 0 && event.clientX > canvas.width / 2 - 350 && event.clientX < canvas.width / 2 + 350 && event.clientY > canvas.height / 2 + 300 && event.clientY < canvas.height / 2 + 370) intropage = 4;
	else if (intropage > 0 || intropage == 0 && event.clientX > canvas.width / 2 - 350 && event.clientX < canvas.width / 2 + 350 && event.clientY > canvas.height / 2 + 200 && event.clientY < canvas.height / 2 + 270) {
		if (intropage != 4) intropage++;
		else {
			if (intropage == 4 && event.clientX > canvas.width / 2 - 390 && event.clientX < canvas.width / 2 - 210 && event.clientY > canvas.height / 2 + 30 && event.clientY < canvas.height / 2 + 100) difficultySelected = 1; 	
			else if (intropage == 4 && event.clientX > canvas.width / 2 - 190 && event.clientX < canvas.width / 2 - 10 && event.clientY > canvas.height / 2 + 30 && event.clientY < canvas.height / 2 + 100) difficultySelected = 2; 	
			else if (intropage == 4 && event.clientX > canvas.width / 2 + 10 && event.clientX < canvas.width / 2 + 190 && event.clientY > canvas.height / 2 + 30 && event.clientY < canvas.height / 2 + 100) difficultySelected = 3; 	
			else if (intropage == 4 && event.clientX > canvas.width / 2 + 210 && event.clientX < canvas.width / 2 + 390 && event.clientY > canvas.height / 2 + 30 && event.clientY < canvas.height / 2 + 100) difficultySelected = 4; 	
			else if (intropage == 4) difficultySelected = null;
		}
	}
	if (intropage == 5) {
		pause++;	
	}
	if (event.clientX > 440 && event.clientX < 840 && event.clientY < canvas.height - 67 && event.clientY > canvas.height - rows*50 - 67 && upgradeDisplay % 2 == 1) {
			if (upgrades[upgradeY * 8 + upgradeX] && upgrades[upgradeY * 8 + upgradeX].purchaseable()) {
				upgrades[upgradeY * 8 + upgradeX].purchase();
				upgrades[upgradeY * 8 + upgradeX].upgradeValues();
				upgradesResearched++;
				if (upgrades[upgradeY * 8 + upgradeX].name.includes("Reinforcements")) {
					units.forEach((unit) => {
						unit.health *= (1 + 1/healthBoost);	
					})	
					homestead.maxhealth += 5000;
					homestead.health += 5000;
				}
				if (upgrades[upgradeY * 8 + upgradeX].name == "LEAD Module") {
					units.forEach((unit) => {
						if (unit.name == "LEAD") unit.health *= 2;
					})		
				}
				if (upgrades[upgradeY * 8 + upgradeX].name == "LEAD Module V") {
					units.forEach((unit) => {
						if (unit.name == "LEAD") unit.health *= 10;
					})		
				}
				if (upgrades[upgradeY * 8 + upgradeX].name == "Swift and Sharp") maxswapcd -= 2;
				if (upgrades[upgradeY * 8 + upgradeX].name == "Catalytic and Sharp") {
					earthMax += 100;
					windMax += 100;
					waterMax += 100;
					fireMax += 100;
				}
				if (shownUpgrade.nextUpgrade != null) {
					upgrades.push(shownUpgrade.nextUpgrade);
				}
				upgrades.splice(upgradeY * 8 + upgradeX, 1);
				mousePos.x = canvas.width / 2;
				mousePos.y = canvas.height / 2;
				shownUpgrade == null;
			}
		}
	if (abilityIndex != null) {
		if (abilities[abilityIndex].purchaseable()) {
			abilities[abilityIndex].purchase();
			abilities[abilityIndex].use();
		}
	}
	if (checkDimensions(canvas.width / 2 - 10, canvas.width / 2 + 40, 32, 82) && intropage > 4) useNightfall();
	if (event.clientX > 440 && event.clientX < 840 && event.clientY < canvas.height - 67 && event.clientY > canvas.height - 117 && skillsDisplay % 2 == 1) {
		if (skills[selectedSkill] && skills[selectedSkill].purchaseable()) {
			skills[selectedSkill].purchase();
			if (skills[selectedSkill].name == "Stability") {
				units.forEach((unit) => {
					unit.health *= 1.5;
				})	
				homestead.maxhealth *= 1.5;
				homestead.health *= 1.5;
			}
			if (skills[selectedSkill].name == "Tenacity") maxswapcd--;
			if (skills[selectedSkill].name == "Calamity") {
				earthMax += 20;
				windMax += 20;
				waterMax += 20;
				fireMax += 20;
			}
		}
	}
	
	let DCDM = [
		["units", 100, 140, 300, 260, SPGPrestiged ? "sSPG" : "SPG", true],
		["units", 180, 220, 300, 260, SACPrestiged ? "sSAC" : "SAC", true],
		["units", 260, 300, 300, 260, YACPrestiged ? "sYAC" : "YAC", true],
		["units", 340, 380, 300, 260, "LEAD", wave > 50],
		["units", 100, 140, 220, 180, LTPrestiged ? "sLT" : "LT", true],
		["units", 180, 220, 220, 180, LeaderPrestiged ? "sLeader" : "Leader", true],
		["units", 100, 140, 140, 100, "Pat", wave > 149],
		["units", 900, 940, 140, 100, "Earth", currentDebuff == "Earth"],
		["units", 900, 940, 140, 100, "Wind", currentDebuff == "Wind"],
		["units", 900, 940, 140, 100, "Water", currentDebuff == "Water"],
		["units", 900, 940, 140, 100, "Fire", currentDebuff == "Fire"],
		["farming", 100, 140, 220, 180, "Farm", true],
		["farming", 180, 220, 220, 180, "Cave", wave > 20],
		["farming", 260, 300, 220, 180, "Compressor", wave > 45],
		["farming", 340, 380, 220, 180, "Mine", wave > 65],
		["farming", 100, 140, 140, 100, "Pressurizer", wave > 101],
		["farming", 180, 220, 140, 100, "Generator", wave > 120],
		["farming", 260, 300, 140, 100, "Reactor", wave > 140],
		["misc", 100, 140, 220, 180, "Windspire", (spireWarped == false && wave > 30)],
		["misc", 180, 220, 220, 180, "Campfire", (campfirePrestige == 0 && wave <= 150 && wave > 50)],
		["misc", 180, 220, 220, 180, "Magma", (campfirePrestige == 1 && wave <= 150 && wave > 50)],
		["misc", 180, 220, 220, 180, "Volcano", (campfirePrestige == 2 && wave <= 150 && wave > 50)],
		["misc", 180, 220, 220, 180, "Coil", wave > 150],
		["misc", 260, 300, 220, 180, "Beacon", wave > 90],
		["misc", 340, 380, 220, 180, "Speaker", wave > 100],
		["misc", 100, 140, 140, 100, "Pebble", wave > 100]];
		
	for (let i = 0; i < DCDM.length; i++) {
		if (display == DCDM[i][0] && checkDimensions(DCDM[i][1], DCDM[i][2], canvas.height - DCDM[i][3], canvas.height - DCDM[i][4]) && DCDM[i][6]) {
			if (DCDM[i][0] == "farming" && autofarm == true) {
				let cost;
				switch(DCDM[i][5]) {
					case "Farm": cost = [1000*1.2**farmunits, 0, 0, 0, 0, 0, 0, 0]; break;
					case "Cave": cost = [20000*1.3**caveunits, 20000*1.3**caveunits, 20000*1.3**caveunits, 0, 0, 0, 0, 0]; break;
					case "Compressor": cost = [0, 10**6*1.35**compressunits, 10**6*1.35**compressunits, 10**6*1.35**compressunits, 0, 0, 0, 0]; break;
					case "Mine": cost = [0, 0, 6*10**6*1.4**mineunits, 5*10**6*1.4**mineunits, 4*10**6*1.4**mineunits, 0, 0, 0]; break;
					case "Pressurizer": cost = [0, 0, 0, 28*10**6*1.45**pressurizerunits, 25*10**6*1.45**pressurizerunits, 22*10**6*1.45**pressurizerunits, 0, 0]; break;
					case "Generator": cost = [0, 0, 0, 10**12*4**generatorunits, 2*10**12*4**generatorunits, 0, 10**12*4**generatorunits, 0]; break;
					case "Reactor": cost = [0, 0, 0, 0, 0, 0, 10**15*50**reactorunits, 0]; break;
					default: break;
				}
				if (priceCheck(cost)) {
					switch(DCDM[i][5]) {
						case "Farm":
        					farmunits++;
							DNCSDF[17][2][2]++;
							break;
						case "Cave":
        					caveunits++;
							DNCSDF[18][2][2]++;
							break;
						case "Compressor":  
    	    				compressunits++;
							DNCSDF[19][2][2]++;
							break;
						case "Mine":
        					mineunits++;
							DNCSDF[20][2][2]++;
							break;
						case "Pressurizer":
        					pressurizerunits++;
							DNCSDF[21][2][2]++;
							break;
						case "Generator": 
        					generatorunits++;
							DNCSDF[22][2][2]++;
							break;
						case "Reactor":
        					reactorunits++;
							DNCSDF[23][2][2]++;
							break;
						default: break;
					}
				}
			} else onMouse = DCDM[i][5];
		}
	}

	if (display == "units" && checkDimensions(260, 300, canvas.height - 220, canvas.height - 180) && wave > 24) spawnUnit(0, 0, [1000000*3**staffunits, 0, 0, 0, 0, 0, 0, 0], "Staff");
	
	if (display == "turbo" && event.clientX > 100 && event.clientX < 150 && event.clientY && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 170 && wave % 50 != 0) turbocharge();
	if (display == "turbo" && event.clientX > 215 && event.clientX < 265 && event.clientY && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 170) reverse();
	if (display == "turbo" && event.clientX > 330 && event.clientX < 380 && event.clientY && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 170) pauseWaves();

    if (player.x - canvas.width / 2 + mousePos.x >= 0 && player.y - canvas.height / 2 + mousePos.y >= 0 && player.x - canvas.width / 2 + mousePos.x <= 10000 && player.y - canvas.height / 2 + mousePos.y <= 10000 && checkPlacement(tileSelect.n, tileSelect.m)) {
		switch (onMouse) {
			case "SPG": spawnUnit(tileSelect.m, tileSelect.n, [50*1.4**SPGunits, 0, 0, 0, 0, 0, 0, 0], "SPG"); break;
			case "sSPG": spawnUnit(tileSelect.m, tileSelect.n, [50*10**(9 + superSPGunits), 0, 0, 0, 0, 0, 0, 0], "sSPG"); break;
			case "SAC": spawnUnit(tileSelect.m, tileSelect.n, [250*1.4**SACunits, 0, 0, 0, 0, 0, 0, 0], "SAC"); break;
			case "sSAC": spawnUnit(tileSelect.m, tileSelect.n, [250*10**(9 + superSACunits), 0, 0, 0, 0, 0, 0, 0], "sSAC"); break;
			case "YAC": spawnUnit(tileSelect.m, tileSelect.n, [750*1.4**YACunits, 0, 0, 0, 0, 0, 0, 0], "YAC"); break;
			case "sYAC": spawnUnit(tileSelect.m, tileSelect.n, [750*10**(9 + superYACunits), 0, 0, 0, 0, 0, 0, 0], "sYAC"); break;
			case "LEAD": spawnUnit(tileSelect.m, tileSelect.n, [10**9*25**LEADunits, 0, 0, 0, 0, 0, 0, 0], "LEAD"); break;
			case "LT": spawnUnit(tileSelect.m, tileSelect.n, [2000*1.4**LTunits, 0, 0, 0, 0, 0, 0, 0], "LT"); break;
			case "sLT": spawnUnit(tileSelect.m, tileSelect.n, [2000*10**(9 + superLTunits), 0, 0, 0, 0, 0, 0, 0], "sLT"); break;
			case "Leader": spawnUnit(tileSelect.m, tileSelect.n, [10000*1.5**leaderunits, 0, 0, 0, 0, 0, 0, 0], "Leader"); break;
			case "sLeader": spawnUnit(tileSelect.m, tileSelect.n, [10000*10**(9 + superLeaderunits), 0, 0, 0, 0, 0, 0, 0], "sLeader"); break;
			case "Pat": spawnUnit(tileSelect.m, tileSelect.n, [10**18*10000**patunits, 0, 0, 0, 0, 0, 0, 0], "Pat"); break;
			case "Earth": spawnUnit(tileSelect.m, tileSelect.n, [10**15*3**elementalunits*0.1**elementalresets, 0, 0, 0, 0, 0, 0, 0], "Earth"); break;
			case "Wind": spawnUnit(tileSelect.m, tileSelect.n, [10**15*3**elementalunits*0.1**elementalresets, 0, 0, 0, 0, 0, 0, 0], "Wind"); break;
			case "Water": spawnUnit(tileSelect.m, tileSelect.n, [10**15*3**elementalunits*0.1**elementalresets, 0, 0, 0, 0, 0, 0, 0], "Water"); break;
			case "Fire": spawnUnit(tileSelect.m, tileSelect.n, [10**15*3**elementalunits*0.1**elementalresets, 0, 0, 0, 0, 0, 0, 0], "Fire"); break;
			case "Farm": spawnUnit(tileSelect.m, tileSelect.n, [1000*1.2**farmunits, 0, 0, 0, 0, 0, 0, 0], "Farm"); break;
			case "Cave": spawnUnit(tileSelect.m, tileSelect.n, [20000*1.3**caveunits, 20000*1.3**caveunits, 20000*1.3**caveunits, 0, 0, 0, 0, 0], "Cave"); break;
			case "Compressor": spawnUnit(tileSelect.m, tileSelect.n, [0, 10**6*1.35**compressunits, 10**6*1.35**compressunits, 10**6*1.35**compressunits, 0, 0, 0, 0], "Compressor"); break;
			case "Mine": spawnUnit(tileSelect.m, tileSelect.n, [0, 0, 6*10**6*1.4**mineunits, 5*10**6*1.4**mineunits, 4*10**6*1.4**mineunits, 0, 0, 0], "Mine"); break;
			case "Pressurizer": spawnUnit(tileSelect.m, tileSelect.n, [0, 0, 0, 28*10**6*1.45**pressurizerunits, 25*10**6*1.45**pressurizerunits, 22*10**6*1.45**pressurizerunits, 0, 0], "Pressurizer"); break;
			case "Generator": spawnUnit(tileSelect.m, tileSelect.n, [0, 0, 0, 10**12*4**generatorunits, 2*10**12*4**generatorunits, 0, 10**12*4**generatorunits, 0], "Generator"); break;
			case "Reactor": spawnUnit(tileSelect.m, tileSelect.n, [0, 0, 0, 0, 0, 0, 10**15*50**reactorunits, 0], "Reactor"); break;
			case "Windspire": spawnWindspire(tileSelect.m, tileSelect.n, 500, 80, [0, 50000*2.1**windspireunits, 40000*2.1**windspireunits, 0, 30000*2.1**windspireunits, 0, 0, 0]); break;
			case "Campfire": spawnUnit(tileSelect.m, tileSelect.n, [0, 5*10**6*1.7**campfireunits, 2*10**6*1.7**campfireunits, 0, 0, 0, 0, 0], "Campfire"); break;
			case "Magma": spawnUnit(tileSelect.m, tileSelect.n, [0, 5*10**6*1.7**magmaunits, 2*10**6*1.7**magmaunits, 0, 0, 0, 0, 0], "Magma"); break;
			case "Volcano": spawnUnit(tileSelect.m, tileSelect.n, [0, 5*10**6*1.7**volcanounits, 2*10**6*1.7**volcanounits, 0, 0, 0, 0, 0], "Volcano"); break;
			case "Beacon": spawnUnit(tileSelect.m, tileSelect.n, [0, 0, 4*10**9*1.8**beaconunits, 0, 3*10**9*1.8**beaconunits, 2*10**9*1.8**beaconunits, 0, 0], "Beacon"); break;
			case "Speaker": spawnUnit(tileSelect.m, tileSelect.n, [0, 0, 0, 0, 0, 0, 10**(6*(1 + speakerunits))*10**(0 - 6*speakerLevels), 0], "Speaker"); break;
			case "Coil": spawnUnit(tileSelect.m, tileSelect.n, [625*10**12*2**coilunits, 0, 0, 0, 0, 0, 0, 0], "Coil"); break;
			case "Pebble": spawnUnit(tileSelect.m, tileSelect.n, [0, 0, 100*2.4**pebbleunits, 0, 0, 0, 2.4**pebbleunits, 0], "Pebble"); break;
		}
    }

	if (debuffDisplay % 2 == 1 && swappable == true) {
		for (let i = 0; i < 6; i++) {
			if (event.clientX > 440 + 50*i && event.clientX < 490 + 50*i && event.clientY > canvas.height - 117 && event.clientY  < canvas.height - 67) {
				swappable = false;
				swapcd = maxswapcd;
				elementalBaseCost[0] /= 10;
				if (i == 0) currentDebuff = null;
				else currentDebuff = debuffs[i].name;
			}
		}
	}

	if (event.clientX > 44 && event.clientX < 236 && event.clientY > 460 && event.clientY < 500) {
		if (nerdMode == false) nerdMode = true;
		else nerdMode = false;
	}
	
	if (checkDimensions(44, 236, 502, 542)) {
		for (let i = 0; i < 4; i++) {
			if (checkDimensions(50 + 46*i, 92 + 46*i, 502, 542) && wave >= 15*i) player.state = i;
		}
	}
})

addEventListener("keydown", event => {
    if (event.key == "Escape") onMouse = null;
	if (event.keyCode == 32 && intropage > 4) pause++;
	switch(event.key) {
		case '1': player.state = 0; break;
		case '2': if (wave >= 15) player.state = 1; break;
		case '3': if (wave >= 30) player.state = 2; break;
		case '4': if (wave >= 45) player.state = 3; break;
		case '5': if (intropage > 4) useNightfall(); break;
	}
	if (event.key == 0 && abLevels >= 4) {
		if (checkDimensions(canvas.width - 250, canvas.width - 50, canvas.height - 250, canvas.height - 50)) {
			player.x = (mousePos.x - (canvas.width - 250))*50;
			player.y = (mousePos.y - (canvas.height - 250))*50;
		}
	}

	if (display == "units" && checkDimensions(100, 140, canvas.height - 140, canvas.height - 100) && wave > 150) onMouse = "Pat";
})

var projectile = new Projectile(renderingPosX(player.x), renderingPosY(player.y), 5, 'black', {x:1, y:1}, true, pierce);
var projectiles = [];

let enemies = [];
let enemyprojectiles = [];
let units = [];

let keys = {"w": false, "a": false, "s": false, "d": false};

let grid = [];
let tiles = [];

let spriteTiles = [];
for (let i = 0; i < 100; i++) {
	let gridLine = [];
	for (let j = 0; j < 100; j++) {
		if (Math.random() < 0.15) gridLine.push(1);
		else gridLine.push(0);
	}
	spriteTiles.push(gridLine);
}	

noise.seed(Math.random());

for (let x = 0; x < 100; x++) {
    grid.push([]);
    for (let y = 0; y < 100; y++) {
        grid[grid.length - 1].push(~~(((p1.get(x / 50, y / 50) + p1.get(x / 100, y / 100) + p2.get(x / 25, y / 25) + p2.get(x / 10, y / 10) * 0.3) / 3.3 + 0.5) * 255));  
    }  
}

for (let i = 0; i < 200; i++) {
    tiles.push([]);
}

for (let i = 0; i < 200; i++) {
    for (let j = 0; j < 200; j++) {
        tiles[i].push(null);
    }
}

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 7; j++) {
        tiles[i][j] = "H";
    }
}

window.addEventListener("keydown", event => {
    keys[event.key.toLowerCase()] = true;
})

window.addEventListener("keyup", event => {
    keys[event.key.toLowerCase()] = false;
})

window.onresize = event => { canvas.width = window.innerWidth; canvas.height = window.innerHeight };

function getColor(value) {
	if (value < 0.04) {
		return "#332200";
	} else if (value < 0.08) {
		return "#023020";
	} else if (value < 0.14) {
		return "#1F6420";
	} else if (value < 0.22) {
		return "#B2B280";
	} else if (value < 0.35) {
		return "#999999";
	} else if (value < 0.45) {
		return "#7FD0FD";
	} else {
		return "#568CB1";
	}
}


// all rendering pos coordinates are on the currently displayed canvas
function renderingPosX(x) {
    return x + canvas.width / 2 - player.x;
}
function renderingPosY(y) {
    return y + canvas.height / 2 - player.y;
}

function edgeDist(x, y) {
    let a = x;
    let b = y;
    return Math.sqrt(a * a + b * b);
}

function getImage(src){
    let img = new Image();
    img.src = src;
    return img;
}

function spawnEnemy(x, y, radius, health, maxhealth, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, image, debuff, stacks, turbo, ws, sp, cl) {
    let velocity = {x: 0, y: 0};
    enemies.push(new Enemy(x, y, radius, velocity, health, maxhealth, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, image, debuff, stacks, turbo, ws, sp, cl));
}

function spawnUnit(m, n, cost, name) {
	if (priceCheck(cost)) {
		if (name != "Staff") tiles[n][m] = name;
		switch (name) {
			case "SPG":
				units.push(new Unit(m, n, "SPG", 550*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), 25, 25, 500, 10, "#000099", 6, cost, 1, 1));  
				SPGunits++;
        		DNCSDF[0][2][2]++;
				break;
			case "sSPG":
				units.push(new Unit(m, n, "sSPG", 27500*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), 12.5, 12.5, 500, 40, "#000055", 6, cost, 1, 5));  
				superSPGunits++;
       			DNCSDF[1][2][2]++;
				break;
			case "SAC":
				units.push(new Unit(m, n, "SAC", 800*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), 24, 24, 600, 11, "#009900", 6, cost, 1, 1));
				SACunits++;
       			DNCSDF[2][2][2]++;
				break;
			case "sSAC":
				units.push(new Unit(m, n, "sSAC", 48000*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), 12, 12, 600, 44, "#005500", 6, cost, 1, 5));  
				superSACunits++;
        		DNCSDF[3][2][2]++;
				break;
			case "YAC":
				units.push(new Unit(m, n, "YAC", 1150*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), 23, 23, 700, 12, "#990000", 6, cost, 1, 1));    
       			tiles[n][m] = "YAC";
				YACunits++;
        		DNCSDF[4][2][2]++;
				break;
			case "sYAC":
				units.push(new Unit(m, n, "sYAC", 80500*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), 11.5, 11.5, 700, 60, "#550000", 6, cost, 1, 5));
				superYACunits++;
        		DNCSDF[5][2][2]++;
				break;
			case "LEAD":
				units.push(new LEAD(m, n, 750, 12, cost, 1));    
				LEADunits++;
        		DNCSDF[6][2][2]++;
				if (LEADlevels >= 6) {
					earthMax += 5;
					windMax += 5;
					waterMax += 5;
					fireMax += 5;
				}
				break;
			case "LT":
				units.push(new Unit(m, n, "LT", 1350*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), 22, 22, 800, 13, "#FFA500", 7, cost, 1, 1));
				LTunits++;
       		 	DNCSDF[7][2][2]++;
				break;
			case "sLT":
				units.push(new Unit(m, n, "sLT", 108000*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), 22/3, 22/3, 800, 26, "#CC7200", 7, cost, 1, 5));  
				superLTunits++;
        		DNCSDF[8][2][2]++;
				break;
			case "Leader":
				units.push(new Unit(m, n, "Leader", 1750*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), 21, 21, 800, 14, "#3AA5B3", 7, cost, 1, 1));
				leaderunits++;
        		DNCSDF[9][2][2]++;
				break;
			case "sLeader":
				units.push(new Unit(m, n, "sLeader", 157500*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), 7, 7, 800, 28, "#077280", 7, cost, 1, 5));
				superLeaderunits++;
        		DNCSDF[10][2][2]++;
				break;
			case "Pat":
				units.push(new Pat(m, n, 1000, 1, cost, 1)); 
				patunits++;
        		DNCSDF[12][2][2]++;
				break;
			case "Staff":
				DNCSDF[11][2][2]++;
				staffunits++;
				homestead.maxhealth += 2000;
				homestead.health += 2000;
				break;
			case "Earth":
				elementalunits++;
				earthunits++;
				DNCSDF[13][2][2]++;
				units.push(new Earthshifter(m, n, 1000, 20, cost, 1)); 
				break;
			case "Wind":
				windunits++;
				elementalunits++;
				DNCSDF[14][2][2]++;
				units.push(new Windlancer(m, n, 1000, 4, cost, 3)); 
				break;
			case "Water":
				waterunits++;
				elementalunits++;
				DNCSDF[15][2][2]++;
				units.push(new Wavecaster(m, n, 1000, 2, cost, 1));
				break;
			case "Fire":
				fireunits++;
				elementalunits++;
				DNCSDF[16][2][2]++;
				units.push(new Flamewielder(m, n, 1000, 1, cost, 1)); 
				break;
			case "Farm":
				units.push(new Building(m, n, "Farm", 1000*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), "#003600", cost));    
        		farmunits++;
				DNCSDF[17][2][2]++;
				break;
			case "Cave":
				units.push(new Building(m, n, "Cave", 3000*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), "#666666", cost));   
        		caveunits++;
				DNCSDF[18][2][2]++;
				break;
			case "Compressor":
				units.push(new Building(m, n, "Compressor", 5000*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), "#888844", cost));   
        		compressunits++;
				DNCSDF[19][2][2]++;
				break;
			case "Mine":
				units.push(new Building(m, n, "Mine", 6000*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), "#3D251E", cost));   
        		mineunits++;
				DNCSDF[20][2][2]++;
				break;
			case "Pressurizer":
				units.push(new Building(m, n, "Pressurizer", 7000*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), "#BEC2CB", cost));    
        		pressurizerunits++;
				DNCSDF[21][2][2]++;
				break;
			case "Generator":
				units.push(new Building(m, n, "Generator", 9000*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), "#111111", cost));    
        		generatorunits++;
				DNCSDF[22][2][2]++;
				break;
			case "Reactor":
				units.push(new Building(m, n, "Reactor", 9000*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), "#440044", cost));       
        		reactorunits++;
				DNCSDF[23][2][2]++;
				break;
			case "Campfire":
				units.push(new Building(m, n, "Campfire", 6500*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), "#BB0000", cost));   
        		campfireunits++;
				DNCSDF[25][2][2]++;
				break;
			case "Magma":
				units.push(new Building(m, n, "Magma", 7500*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), "#DD0000", cost)); 
        		magmaunits++;
				DNCSDF[26][2][2]++;
				break;
			case "Volcano":
				units.push(new Building(m, n, "Volcano", 8500*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), "#FF0000", cost)); 
        		volcanounits++;
				DNCSDF[27][2][2]++;
				break;
			case "Beacon":
				units.push(new Building(m, n, "Beacon", 15000*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), "#301934", cost)); 
        		beaconunits++;
				DNCSDF[28][2][2]++;
				break;
			case "Speaker":
				units.push(new Building(m, n, "Speaker", 1000*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), "#000044", cost)); 
        		speakerunits++;
				DNCSDF[29][2][2]++;
				break;
			case "Coil":
				units.push(new Building(m, n, "Coil", 0.001, "#FFEE00", cost)); 
        		coilunits++;
				DNCSDF[30][2][2]++;
				break;
			case "Pebble":
				units.push(new Building(m, n, "Pebble", 0.001, "#999999", cost)); 
        		tiles[n][m] = "Pebble";
        		pebbleunits++;
				DNCSDF[31][2][2]++;
				break;
		}
	}
}

function spawnWindspire(m, n, range, slowdown, cost) {
    if (priceCheck(cost)) {
		units.push(new Windspire(m, n, range, slowdown, cost)); 
        tiles[n][m] = "Windspire";
        windspireunits++;
		warpspired.description = `Sacrifice the ability to purchase windspires in order to enchant the homestead with wind. The homestead transforms into a massive windspire whose strength is determined by the number of windspires purchased before this upgrade. At your current amount of ${windspireunits} windspires, you will attain a ${Math.floor(100*(1 - 1/Math.log(windspireunits*2)))}% global slowdown and damage reduction.`;
		DNCSDF[24][2][2]++;
    }
}

for (let i = 7; i < 10; i++) {
    for (let j = 1; j < 3; j++) {
        spawnUnit(i, j, [0, 0, 0, 0, 0, 0, 0, 0], "Farm");
    }
}
farmunits = 0;

function priceCheck(cost) {
	let purchaseable = true;
	for (let i = 0; i < 8; i++) {
		if (resources[i] < cost[i]) {
			purchaseable = false;
		}
	}
	if (purchaseable == false) {
		return false;
	} else {
		for (let i = 0; i < 8; i++) {
			resources[i] -= cost[i]
		}
		return true;
	}
}

function enemyDeath(enemy) {
	talentStacks += 1;
	inertia += 8*inertiaLevels;
	homestead.health += 100*leechBoost;
	homestead.health = Math.min(homestead.health, homestead.maxhealth);
	enemiesKilled++;
	let totalResourceMultiplier =  Math.log(wave*2)*enemy.maxhealth*globalResourceBoost*(1 + wave/100*eng)*fireLootBuff*lootMultiplier*enemy.turbo*(steamLevels >= 5 ? 1 + wave / 50 : (steamLevels >= 4 ? 1 + wave / 100 : 1))*(1 + cmpStacks*0.15)*((lctDuration > 0) ? 3 : 1)*(difficultySelected == 4 ? (wave > 150 ? (wave <= 249 ? (250 - wave)/100 : 0.01) : 1) : 1)*(unityLevel >= 5 ? 1 + 0.02*staffunits : 1)*(meditationBoost >= 7 ? 1 + 0.01*Math.min(600, meditationFarms) : 1);
	if (enemy.radius >= 100) totalResourceMultiplier = 0;
	let antimatterMultiplier = 4**reactorunits;
	let reactorNerf = (1 - 0.09*Math.min(reactorunits, 11));
	if (currentWavePrime == true) totalResourceMultiplier *= wave;
	if (enemy.debuff == "water") {
		if (aqLevels == 0) totalResourceMultiplier *= (1 + enemy.stacks/200);
		else if (aqLevels < 3) totalResourceMultiplier *= (1 + enemy.stacks/100);
		else totalResourceMultiplier *= (1 + enemy.stacks/50)
	}
	if (trigLevel > 0) totalResourceMultiplier *= (1 + trigBoost/100);
	if (ss8 == 1 && currentDebuff == "Wind") totalResourceMultiplier *= 1.5;
	if (winLevels >= 2 && currentDebuff == "Wind") totalResourceMultiplier *= 5**(winLevels-1);
    resources[0] += Math.log(wave)*(1 + farmBoost/4)*foodNerds*totalResourceMultiplier*reactorNerf;
	if (wave >= 5) resources[1] += Math.log(wave)/2*(1 + lumberBoost*0.55)*woodNerds*totalResourceMultiplier*reactorNerf;
	if (wave >= 10) resources[2] += Math.log(wave)/12*stoneNerds*totalResourceMultiplier*reactorNerf;
	if (wave >= 16) resources[3] += Math.log(wave)/20*copperNerds*totalResourceMultiplier*reactorNerf;
	if (wave >= 24) resources[4] += Math.log(wave)/30*titaniumNerds*totalResourceMultiplier*reactorNerf;
	if (wave >= 51) resources[5] += Math.log(wave)/42*diamondNerds*totalResourceMultiplier*reactorNerf;
	if (wave >= 101) resources[6] += Math.log(wave/32)/49*antimatterNerds*totalResourceMultiplier*antimatterMultiplier*(leechBoost >= 11 ? 10 : 1)*((!pipInitialWave && (wave - pipInitialWave) % 3 == 2) ? (1 + hermanBoost/100) : 1);
	if (absp > 0) absp -= 30;
	if (wave > 150 && enemy.radius == 150) enemies.length = 0;
	if (wave > 100) {
		if (enemy.debuff == "Fire") enemyNova(enemy, Math.floor((Math.random()*wave/10) + 5), enemy.damage*(1 + enemy.stacks/200));
		else enemyNova(enemy, Math.floor((Math.random()*wave/10) + 5), enemy.damage);
	}
	if (generatorunits > 0) resources[7] += Math.min(5*1.2**(generatorunits - 1), powerMax - resources[7]);
}

function getAdjacent(unit) {
	let m = unit.m;
	let n = unit.n;
	let adjacentTiles = [];
	for (let i = m-1; i < m+2; i++) {
		for (let j = n-1; j < n+2; j++) {
			adjacentTiles.push(tiles[j][i]);
		}
	}
	adjacentTiles.splice(4, 1);
	return adjacentTiles;
}

function getLTsAndLeaders(adjacentTiles) {
	let LTCount = 0;
	let leaderCount = 0;
	for (let i = 0; i < 8; i++) {
		if (adjacentTiles[i] == "LT" || adjacentTiles[i] == "sLT") LTCount++;
		if (adjacentTiles[i] == "leader" || adjacentTiles[i] == "sleader") leaderCount++;
	}
	return [LTCount, leaderCount];
}

function applyAdjacentBuffs(adjacentTiles) {
	let sYACstacks = 0;
	let LTstacks = 0;
	let sLTstacks = 0;
	let leaderstacks = 0;
	let sLeaderstacks = 0;
	let buffUnits = ["sYAC", "LT", "sLT", "leader", "sleader", "campfire", "magma"];
	let buffAmounts = [0.075, 0.1, 0.4, 0.2, 0.8, 0.5, 0.25];
	let totalBuff = 1;
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 7; j++) {
			if (adjacentTiles[i] == buffUnits[j]) {
				totalBuff += buffAmounts[j];
			}
		}
	}
	totalBuff *= (1 + 0.5*buffBoost);
	if (unityLevel >= 5) totalBuff *= (1 + 0.1*staffunits);
	return totalBuff;
}

// the messiest possible implementation
function simplify(amount) {
	if (amount < 10000) return Math.floor(amount);
	for (let j = 100; j >= 0; j--) {
		let placeValue = 10**(3*(j + 1));
		if (amount >= placeValue) {
			let magnitude = Math.floor(Math.log10(amount));
			let firstdigit = Math.floor(amount/(10**magnitude));
			let seconddigit = Math.floor((amount%(10**magnitude))/(10**(magnitude - 1)));
			let thirddigit = Math.floor((amount%(10**(magnitude - 1)))/(10**(magnitude - 2)));
			if (amount%(10**magnitude) <= 10**(magnitude - 8) && magnitude % 3 == 0) return `${firstdigit}${values[j]}`;
			else if (amount%(10**(magnitude - 1)) <= 10**(magnitude - 8) && magnitude % 3 == 0) return `${firstdigit}.${seconddigit}${values[j]}`;
			else if (amount%(10**(magnitude - 1)) <= 10**(magnitude - 8) && magnitude % 3 == 1) return `${firstdigit}${seconddigit}${values[j]}`;
			
			else {
				if (magnitude % 3 == 0) return `${firstdigit}.${seconddigit}${thirddigit}${values[j]}`;
				else if (magnitude % 3 == 1) return `${firstdigit}${seconddigit}.${thirddigit}${values[j]}`;
				else return `${firstdigit}${seconddigit}${thirddigit}${values[j]}`;
			}
		}
	}
}

function healthUpgrade() {
	healthBoost++;
    reinforcements = new Upgrade("Reinforcements", `All units on screen gain an additional +100% health and enemies deal a compounding 4% less damage. You have purchased this upgrade ${healthBoost} times, granting +${100*healthBoost}% health to all units and reducing enemy damage by ${Math.floor(100 - 0.96**healthBoost*100)}%.`, `All units on screen gain an additional +100% health and enemies deal a compounding 4% less damage. You have purchased this upgrade ${healthBoost} times, granting +${100*healthBoost}% health to all units and reducing enemy damage by ${Math.floor(100 - 0.96**healthBoost*100)}%.`, [0, 5000*10**healthBoost, 0, 0, 0, 0, 0, 0], null, `./assets/upgrades/reinforcements${healthBoost%7}.png`, "healthBoost");
    if (healthBoost < 30) appendUpgrade(reinforcements);
}

function spireUpgrade() {
	spireBoost++;
	windMultiplier *= 0.8;
}

function spireWarping() {
	spireBoost++;
	windMultiplier *= 0.8;
    spireWarped = true;
    sacWindspires();
    homestead.image = getImage("./assets/misc/warpstead.png");
}

function uberBoosting() {
	ufarmstacks++;
    farmBuff = ufarms[ufarmstacks];
}

function singing() {
	songBoost++;
    if (songBoost > 4) globalPower += 2;
    else globalPower++;
}

function knocking() {
	knockback += 20;
    globalPower += knockback/20;
}

function pshing() {
	if (!pipInitialWave) {
		pipInitialWave = wave;
		pipBoost = 100;
		squeakBoost = 30;
		hermanBoost = 300;
	} else {
		pipBoost = 200;
		squeakBoost = 90;
		hermanBoost = 1200;
	}
	
}

function turreting() {
	turretLevel++;
	switch(turretLevel) {
		case 1: turretDamage *= 3; break;
		case 2: turretDamage *= 3; break;
		case 3: turretDamage *= 3; break;
		case 4: 
			turretDamage *= 3;
			player.maxReloadTime /= 2;
			break;
		case 5:
			turretDamage *= 3;
			player.maxReloadTime /= 2;
			break;
	}
}

function rocketing() {
	rocketLevel++;
	switch(rocketLevel) {
		case 1: 
			rocketDamage *= 3;
			rocketRadius += 50;
			break;
		case 2:
			rocketDamage *= 3;
			rocketRadius += 50;
			break;
		case 3: rocketDamage *= 3; break;
		case 4: rocketDamage *= 3; break;
		case 5:
			rocketDamage *= 3;
			rocketRadius += 300;
			break;
	}
}

function xbowing() {
	xbowLevel++;
	switch(xbowLevel) {
		case 1:
			xbowPierce = 4;
			xbowDamage *= 2;
			break;
		case 2:
			xbowPierce = 5;
			xbowDamage *= 2;
			break;
		case 3:
			xbowPierce = 6;
			xbowDamage *= 2;
			break;
		case 4:
			xbowPierce = 8;
			player.xbowReloadTime /= 2;
			break;
		case 5:
			xbowPierce = 10;
			player.xbowReloadTime /= 3;
			break;
	}
}

function auraing() {
	auraLevel++;
	switch(auraLevel) {
		case 1: auraDI += 20; break;
		case 2: auraDI += 40; break;
		case 3:
			auraRange += 50;
			auraDI += 120;
			break;
		case 4: auraRange += 50; break;
		case 5: auraDI += 600; break;
	}
}

function tecBoost() {
	tecLevels++;
	earthMax += 50;
}

function windBoost() {
	winLevels++;
	windMax += 200;
	if (winLevels >= 3) windMax += 1000;
}

function aquaBoost() {
	aqLevels++;
	waterMax += 50;
}

function elderBoost() {
	eldLevels++;
	if (eldLevels <= 2) fireMax += 100;
	if (eldLevels >= 4) hexed = true;
}

function blaze(ticks) {
	if (time % ticks == 0) {
		let firestackTotal = 0;
		enemies.forEach((enemy) => {
			if (enemy.debuff == "Fire") firestackTotal += enemy.stacks;
		})
		if (firestackTotal > 0) {
			enemies.forEach((enemy) => {
				enemy.health *= (1 - Math.min(firestackTotal, 9900)/10000);
			})
		}
	}
}

function om() {
	lrb = 3;
	farmed = 10;
}

function speakerBoost() {
	speakerLevels++;
	if (speakerLevels == 1) buffBoost += 12;
	else if (speakerLevels == 2) fireMax += 200;
}

function abBoost() {
	abLevels++;
	if (abLevels == 5) {
		off = true;
		offCounter = 600;
	}
	if (abLevels == 7) {
		let elementalHealthEmpower = (currentDebuff == "Water") ? 0.015 : 0.01;
		let elementalDamageEmpower = (currentDebuff == "Wind") ? 0.0015 : 0.001;
		let isChunky = abLevels >= 3 ? 3 : 1;
		let isDoubled = abLevels >= 6 ? 5 : 1;
		let isLevitating = speakerLevels >= 3 ? true : false;
		for (let i = 0; i < Math.floor(enemiesKilled*3/100); i++) {
			let spawnHealthValue = 800*1.3**wave*bm*(1 + empowerment*elementalHealthEmpower)*isChunky*isDoubled*difficultyMultiplier;
			let spawnDamageValue = (6 + time*0.00015)*1.02**wave*2*(1 + empowerment*elementalDamageEmpower)*difficultyMultiplier;
			spawnEnemy(8000 + Math.random()*2000, 8000 + Math.random()*2000, 30, isLevitating ? spawnHealthValue**0.2 : spawnHealthValue, isLevitating ? spawnHealthValue**0.2 : spawnHealthValue, 8, "#440000", 1, 20, 20, isLevitating ? 0 : spawnDamageValue, './assets/enemies/enemy6.png', currentDebuff, spawnStacks, 10, 1, 1, 1);
		}
	}
}

function archBoost() {
	archBoosts++;
	pierce++;
	if (archBoosts >= 4) turretDamage *= 10;
}

function ocing() {
	oc++;
	if (oc == 4) {
		turbocharger = true;
		turboLootMultiplier *= 5;
	}
	if (oc == 5) turboLootMultiplier *= 2;
}

function ssgized() {
	buffBoost += 3;
	ss8 = 1;
}

function trigging() {
	trigLevel++;
	trigInitWave = wave;
}

function initiateEWWF() {
	ewwfUnlocked = true;
	compb *= 1.5;
	debuffs[1] = earthDebuff;
    debuffs[2] = windDebuff;
    debuffs[3] = waterDebuff;
    debuffs[4] = fireDebuff;
	redisplay();
	appendUpgrade(tectonicStrike);
	appendUpgrade(windfiltration);
	appendUpgrade(aquaticCatastrophe);
	appendUpgrade(elderSpark);
}

function displayCosts(baseCost, costMultiplier, levels, shift) {
	let displayableCost = [];
	for (let i = 0; i < 8; i++) {
		displayableCost.push(baseCost[i]*(costMultiplier**levels));
	}
	let resourceCounter = 0;
	if (!shift) shift = 0;
	for (let i = 0; i < 8; i++) {
		if (displayableCost[i] != 0) {
			ctx.drawImage(getImage(resourceImages[i]), 50, canvas.height - 505 + 30*resourceCounter + shift, 25, 25);
			ctx.font = "20px Courier New";
			if (displayableCost[i] > resources[i]) ctx.fillStyle = "red";
			else ctx.fillStyle = "green";
			ctx.fillText(simplify(displayableCost[i]), 90, canvas.height - 483 + 30*resourceCounter + shift);
			resourceCounter++;
		}
	}
	ctx.fillStyle = "#000000";
}

function displayDesc(desc, startx, starty, spacing) {
	ctx.fillStyle = "#000000";
	let splitDesc = desc.split(' ');
	for (let i = 0; i < Math.ceil(splitDesc.length / 6); i++) {
		let displayedRowDescArray = [];
		for (let j = 0; j < 6; j++) {
			displayedRowDescArray.push(splitDesc[i*6 + j]);	
		}
		let displayedRowDesc = displayedRowDescArray.join(' ');
		ctx.fillText(displayedRowDesc, startx, canvas.height - starty + spacing*i, 380)
	}
}

function displayUpgradeCosts(cost) {
	let resourceCounter = 0;
	for (let i = 0; i < 8; i++) {
		if (cost[i] != 0) {
			ctx.drawImage(getImage(resourceImages[i]), 450, canvas.height - rows*50 - 515 + 20*resourceCounter, 20, 20);
			if (resources[i] < cost[i]) ctx.fillStyle = "red";
			else ctx.fillStyle = "green";
			ctx.fillText(simplify(cost[i]), 480, canvas.height - rows*50 - 500 + 20*resourceCounter);
			resourceCounter++;
		}
	}
}

function enemyNova(enemy, projCount, damage) {
	for (let i = 0; i < projCount; i++) {
		let projV = {x:Math.cos(Math.PI*2*i/projCount)*10, y:Math.sin(Math.PI*2*i/projCount)*10};
		enemyprojectiles.push(new enemyProjectile(enemy.x, enemy.y, enemy.projradius, "#660000", projV, 1, damage, false));
	}
}

function enableRelic() {
	skills.push(possibleSkills[relics]);
	let ancientRelic = new Upgrade("Ancient Relic", "Permanently unlocks a new skill and increases the damage of all units by a stacking 50%.", "Permanently unlocks a new skill and increases the damage of all units by a stacking 50%.", [0, 0, 0, 0, 0, 0, 10**(10 + 2*relics), 0], null, `./assets/upgrades/relic${relics}.png`, "relic");
	if (relics < 7) appendUpgrade(ancientRelic);
	relics++;
}

function turretNova(x, y, turretCount, damage) {
	for (let i = 0; i < turretCount; i++) {
		let projV = {x:Math.cos(Math.PI*2*i/turretCount)*30, y:Math.sin(Math.PI*2*i/turretCount)*30};
		projectiles.push(new Projectile(x, y, 8, "#000000", projV, 60, 1, damage, null, 1));	
	}
}

function rocketNova(x, y, rocketCount, blastRadius, damage) {
	for (let i = 0; i < rocketCount; i++) {
		let rocketV = {x:Math.cos(Math.PI*2*i/rocketCount)*30, y:Math.sin(Math.PI*2*i/rocketCount)*30};
		projectiles.push(new Rocket(x, y, 8, "#FF0000", rocketV, 60, 1, damage, null, 1, blastRadius));
	}
}

function xbowNova(x, y, xbowCount, xbowP, damage) {
	for (let i = 0; i < xbowCount; i++) {
		let projV = {x:Math.cos(Math.PI*2*i/xbowCount)*30, y:Math.sin(Math.PI*2*i/xbowCount)*30};
		projectiles.push(new Projectile(x, y, 8, "#222233", projV, 60, xbowP, damage, null, 1));	
	}
}

function retaliate(x, y) {
	switch(revengeLevel) {
		case 1: revengeStacks++; break;
		case 2: revengeStacks += 3; break;
		case 3:
			revengeStacks += 3;
			rocketNova(x, y, 8, 200, rocketDamage);
			break;
		case 4:
			revengeStacks += 3;
			rocketNova(x, y, 16, 240, rocketDamage);
			enemies.forEach((enemy) => {
				if (enemy.debuff != "Water" && enemy.stacks > 0) enemy.stacks += 10;
				for (let i = 0; i < 4; i++) {
					if (enemy.debuff == debuffTypes[i]) enemy.stacks = Math.min(enemy.stacks, debuffMaxes[i]);
				}
			})
			break;
		case 5:
			revengeStacks += 5;
			rocketNova(x, y, 16, 550, rocketDamage*10);
			enemies.forEach((enemy) => {
				enemy.health *= 0.99;
				if (enemy.debuff != "Water" && enemy.stacks > 0) enemy.stacks += 15;
				for (let i = 0; i < 4; i++) {
					if (enemy.debuff == debuffTypes[i]) enemy.stacks = Math.min(enemy.stacks, debuffMaxes[i]);
				}
			})
			break;
	}
}

function appendUpgrade(upgrade) {
	upgrades.push(upgrade);
	upgradechecked = false;
}

function sacWindspires() {
	homesteadwarp = 1/Math.log(windspireunits*2);
	windspireunits = 0;
}

function turbocharge() {
	if (resources[7] >= Math.ceil(sendcost)) {
		resources[7] -= Math.ceil(sendcost);
		sendcost += (oc >= 5 ? 0.8 : 1);
		wave += 1;
		sendWave(turboLootMultiplier);
	}
}

function reverse() {
	if (resources[7] >= Math.ceil(reversecost)) {
		resources[7] -= Math.ceil(reversecost);
		reversecost += 50;
		wave -= 10;
	}
}

function pauseWaves() {
	if (resources[7] >= 5) {
		resources[7] -= 5;
		wavePause++;
	}
}

// this sucks right now
function sendWave(turboMultiplier) {
	swapcd--;
	let isLevitating = speakerLevels >= 3 ? true : false;
	if (wave == 49) {
		spawnEnemy(9999, 9999, 150, 10**6*difficultyMultiplier, 10**6*difficultyMultiplier, 10, "#990000", 1, 20, 20, 350*difficultyMultiplier, './assets/enemies/boss1.png', currentDebuff, spawnStacks, turboMultiplier, 1, 1, 1);
	} else if (wave == 99) {
		spawnEnemy(9999, 9999, 150, 2*10**9*difficultyMultiplier, 2*10**9*difficultyMultiplier, 12, "#990000", 1, 18, 18, 1000*difficultyMultiplier, './assets/enemies/boss2.png', currentDebuff, spawnStacks, turboMultiplier, 1, 1, 1);
	} else if (wave == 149) {
		spawnEnemy(9999, 9999, 150, 10**12*difficultyMultiplier, 10**12*difficultyMultiplier, 14, "#990000", 1, 16, 16, 6000*difficultyMultiplier, './assets/enemies/boss3.png', currentDebuff, spawnStacks, turboMultiplier, 1, 1, 1);
	} else if (wave == 199) {
        spawnEnemy(9999, 9999, 150, 10**24*difficultyMultiplier, 10**24*difficultyMultiplier, 16, "#880000", 1, 14, 14, 12000*difficultyMultiplier, './assets/enemies/boss4.png', currentDebuff, spawnStacks, turboMultiplier, 1, 1, 1);
	} else if (wave == 249) {
		spawnEnemy(9999, 9999, 150, isLevitating ? (10**48)**0.2 : 10**48, isLevitating ? (10**48)**0.2 : 10**48, 18, "#880000", 1, 16, 16, isLevitating ? 0 : 20000, './assets/enemies/boss5.png', currentDebuff, spawnStacks, turboMultiplier, 1, 1, 1);
	} else if (wave == 299) {
		spawnEnemy(9999, 9999, 150, isLevitating ? (10**135)**0.2 : 10**135, isLevitating ? (10**135)**0.2 : 10**135, 18, "#770000", 1, 16, 16, isLevitating ? 0 : 10**50, './assets/enemies/boss6.png', currentDebuff, spawnStacks, turboMultiplier, 1, 1, 1);
	} else {
		let elementalHealthEmpower = (currentDebuff == "Water") ? 0.015 : 0.01;
		let elementalDamageEmpower = (currentDebuff == "Wind") ? 0.0015 : 0.001;
		
		let isChunky = abLevels >= 3 ? 3 : 1;
		let isDoubled = abLevels >= 6 ? 5 : 1;
		if (wave < 50) {
			for (let i = 0; i < Math.floor(wave/10) + 1; i++) {
				let spawnPosition = getSpawnPoint();
				let spawnHealthValue = (400 + time*0.1)*1.05**wave*isChunky*isDoubled*difficultyMultiplier*(difficultySelected == 4 ? 2**Math.ceil(wave/50)/2 : 1);
				let spawnDamageValue = (6 + time*0.001)*1.01**wave*difficultyMultiplier;
				spawnEnemy(spawnPosition[0], spawnPosition[1], 30, isLevitating ? spawnHealthValue**0.2 : spawnHealthValue, isLevitating ? spawnHealthValue**0.2 : spawnHealthValue, 6, "#000000", 1, 40, 40, isLevitating ? 0 : spawnDamageValue, './assets/enemies/enemy1.png', currentDebuff, spawnStacks, turboMultiplier, 1, 1, 1);
			}
		} else if (wave < 100) {
			for (let i = 0; i < Math.floor(wave/30) + 1; i++) {
				let spawnPosition = getSpawnPoint();
				let spawnHealthValue = (400 + time*0.6)*1.07**wave*4*(1 + empowerment*elementalHealthEmpower)*isChunky*isDoubled*difficultyMultiplier*(difficultySelected == 4 ? 2**Math.ceil(wave/50)/2 : 1);
				let spawnDamageValue = (6 + time*0.001)*1.01**wave*2*(1 + empowerment*elementalDamageEmpower)*difficultyMultiplier;
					spawnEnemy(spawnPosition[0], spawnPosition[1], 30, isLevitating ? spawnHealthValue**0.2 : spawnHealthValue, isLevitating ? spawnHealthValue**0.2 : spawnHealthValue, 8, "#110000", 1, 20, 20, isLevitating ? 0 : spawnDamageValue, './assets/enemies/enemy2.png', currentDebuff, spawnStacks, turboMultiplier, 1, 1, 1);
			}
		} else if (wave < 150) {
			for (let i = 0; i < Math.floor(wave/45) + 1; i++) {
				let spawnPosition = getSpawnPoint();
				let spawnHealthValue = (600 + time*1)*1.07**wave*10*bm*(1 + empowerment*elementalHealthEmpower)*isChunky*isDoubled*difficultyMultiplier*(difficultySelected == 4 ? 2**Math.ceil(wave/50)/2 : 1);
				let spawnDamageValue = (6 + time*0.0015)*1.01**wave*2*(1 + empowerment*elementalDamageEmpower)*difficultyMultiplier;
				spawnEnemy(spawnPosition[0], spawnPosition[1], 30, isLevitating ? spawnHealthValue**0.2 : spawnHealthValue, isLevitating ? spawnHealthValue**0.2 : spawnHealthValue, 8, "#220000", 1, 20, 20, isLevitating ? 0 : spawnDamageValue, './assets/enemies/enemy3.png', currentDebuff, spawnStacks, turboMultiplier, 1, 1, 1);
			}	
		} else if (wave < 200) {
			for (let i = 0; i < Math.floor(wave/55) + 1; i++) {
				let spawnPosition = getSpawnPoint();
				let spawnHealthValue = (800 + time*1.4)*1.08**wave*50*bm*(1 + empowerment*elementalHealthEmpower)*isChunky*isDoubled*difficultyMultiplier*(difficultySelected == 4 ? 2**Math.ceil(wave/50)/2 : 1);
				let spawnDamageValue = (6 + time*0.0015)*1.01**wave*2*(1 + empowerment*elementalDamageEmpower)*difficultyMultiplier;
				spawnEnemy(spawnPosition[0], spawnPosition[1], 30, isLevitating ? spawnHealthValue**0.2 : spawnHealthValue, isLevitating ? spawnHealthValue**0.2 : spawnHealthValue, 8, "#330000", 1, 20, 20, isLevitating ? 0 : spawnDamageValue, './assets/enemies/enemy4.png', currentDebuff, spawnStacks, turboMultiplier, 1, 1, 1);
			}	
		} else if (wave < 260) {
			for (let i = 0; i < Math.floor(wave/60) + 1; i++) {
				let spawnPosition = getSpawnPoint();
				let spawnHealthValue = 800*1.3**wave*bm*(1 + empowerment*elementalHealthEmpower)*isChunky*isDoubled*difficultyMultiplier*(difficultySelected == 4 ? 2**Math.ceil(wave/50)/2 : 1);
				let spawnDamageValue = (6 + time*0.00015)*1.02**wave*2*(1 + empowerment*elementalDamageEmpower)*difficultyMultiplier;
				spawnEnemy(spawnPosition[0], spawnPosition[1], 30, isLevitating ? spawnHealthValue**0.2 : spawnHealthValue, isLevitating ? spawnHealthValue**0.2 : spawnHealthValue, 8, "#440000", 1, 20, 20, isLevitating ? 0 : spawnDamageValue, './assets/enemies/enemy5.png', currentDebuff, spawnStacks, turboMultiplier, 1, 1, 1);
			}	
		} else if (wave < 300) {
			for (let i = 0; i < 2; i++) {
				let spawnPosition = getSpawnPoint();
				let spawnHealthValue = 800*1.5**wave*bm*(1 + empowerment*elementalHealthEmpower)*isChunky*isDoubled*difficultyMultiplier*(difficultySelected == 4 ? 2**Math.ceil(wave/50)/2 : 1);
				let spawnDamageValue = (6 + time*0.00015)*1.02**wave*2*(1 + empowerment*elementalDamageEmpower)*difficultyMultiplier*10**50;
				spawnEnemy(spawnPosition[0], spawnPosition[1], 30, isLevitating ? spawnHealthValue**0.2 : spawnHealthValue, isLevitating ? spawnHealthValue**0.2 : spawnHealthValue, 8, "#550000", 1, 20, 20, isLevitating ? 0 : spawnDamageValue, './assets/enemies/enemy6.png', currentDebuff, spawnStacks, turboMultiplier, 1, 1, 1);
			}	
		}
	}
}

function checkDimensions(minX, maxX, minY, maxY) {
	if (mousePos.x > minX && mousePos.x < maxX && mousePos.y > minY && mousePos.y < maxY) return true;
	else return false;
}

function checkPlacement(n, m) {
	if (!checkDimensions(0, 450, canvas.height - 300, canvas.height) && checkDimensions(0, canvas.width, 0, canvas.height - 70 - rows*50) && tiles[tileSelect.n][tileSelect.m] == null) return true;
	else return false;
}

function multilineText(passage, splitCharLength, x, y, spacing, maxSize) {
	let passageArray = passage.split(' ');
	let charIndex = 0;
	let cycles = 0;
	while (charIndex < passageArray.length) {
		let rowPassageArray = [];
		let rowPassageSize = 0;
		do {
			rowPassageArray.push(passageArray[charIndex]);
			rowPassageSize += passageArray[charIndex] ? passageArray[charIndex].length : 1;
			charIndex++;
		} while (rowPassageSize <= splitCharLength);
		let rowPassage = rowPassageArray.join(' ');
		ctx.fillText(rowPassage, x, y + spacing * cycles, maxSize);
		cycles++;
	}
}

function hoverCircle(fillColour) {
	ctx.fillStyle = fillColour;
	ctx.beginPath();
	ctx.arc(mousePos.x, mousePos.y, 20, 0, Math.PI*2, true);
	ctx.fill();	
}

function buffBox(x, y, l, w) {
	ctx.fillStyle = "#000000";
	ctx.fillRect(x, y, l, w);
	ctx.fillStyle = "#DDDDDD";
	ctx.fillRect(x + 2, y + 2, l - 4, w - 4);	
}

function arrayMultiply(arr, multiplier) {
	let finalArray = [];
	for (let i = 0; i < arr.length; i++) {
		finalArray.append(arr[i] * multiplier);
	}
	return finalArray;
}

function showDebuffBar(enemy, borderColor, fillColor, maxStacks) {
	ctx.fillStyle = "#000000";
    ctx.fillRect(renderingPosX(enemy.x) - 82, renderingPosY(enemy.y) - 92 - enemy.radius, 164, 34);
    ctx.fillStyle = borderColor;
    ctx.fillRect(renderingPosX(enemy.x) - 80, renderingPosY(enemy.y) - 90 - enemy.radius, 160, 30)
	ctx.fillStyle = fillColor;
    ctx.fillRect(renderingPosX(enemy.x) - 80, renderingPosY(enemy.y) - 90 - enemy.radius, 160*(enemy.stacks/maxStacks), 30)
	ctx.fillStyle = "#000000";
	ctx.font = "20px Courier New"
	ctx.fillText(simplify(Math.floor(enemy.stacks)), renderingPosX(enemy.x), renderingPosY(enemy.y) - 70 - enemy.radius);
}

function resetfifty() {
	if (time % 120 == 0) console.clear();
	onMouse = null;
	pause = 1;
	ctx.globalAlpha = 0.8;
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#FFA500";
	ctx.font = "60px Courier New";
	ctx.textAlign = "center";	
}

function multiArray(count, char) {
	let elements = [];
	for (let i = 0; i < count; i++) {
		elements.push(char);
	}
	return elements;
}

function getFurthestDist() {
	let furthestDist = 0;
	if (unityLevel > 1) {
		units.forEach((unit) => {
			furthestDist = Math.max(furthestDist, unit.m + unit.n);	
		})
	}	
	return furthestDist;
}

function nightupgrade() {
	nightlevel++;
	if (nightlevel >= 6) nightcdmax = 2400;
	else if (nightlevel >= 3) nightcdmax = 3000;
	if (nightlevel >= 7) projectiles.push((new Orb(5000, 5000, 90, "rgba(255, 200, 255, 0.6)", 0, 10**15, 10**15, 100, null, 1, null)));
}

function useNightfall() {
	if (nightcd <= 0) {
		nightDuration = 600 + nightlevel*120;
		nightcd = nightcdmax;
		for (let i = 0; i < nightlevel; i++) {
			let orbx = 100 + 200*Math.cos(Math.PI*2*i/nightlevel);
			let orby = 100 + 200*Math.sin(Math.PI*2*i/nightlevel);
			projectiles.push((new Orb(orbx, orby, ((nightlevel > 4) ? 90 : ((nightlevel > 1) ? 60 : 40)), "rgba(255, 200, 255, 0.4)", 0, 600 + 120*nightlevel, 600 + 300*nightlevel, 100, null, 1, null)));
		}
		for (let i = 0; i < 7; i++) {
			if (nightlevel >= 4) resources[i] *= 0.5;
			else resources[i] = 0;
		}
	}
}

function getSpawnPoint() {
	let spawnAngle = Math.random()*Math.PI/2;
	let spawnPosition1 = (Math.random()*4000 + 6000)*Math.cos(spawnAngle);
	let spawnPosition2 = (Math.random()*4000 + 6000)*Math.sin(spawnAngle);
	return [spawnPosition1, spawnPosition2];
}

let secretDesc = "You have defended the last 250 waves flawlessly and managed to navigate around every obstacle the enemies have thrown at you. As your reward, you have unlocked the key to Expert Mode, the most difficult challenge the game has to offer. The mode is locked by a passcode. You can enter the passcode by hovering over the top right corner in the difficulty select screen with ??? mode selected, in which a text input box will pop up along with a submit button. The passcode is a 5-digit number, with each digit being accessible from a single characteristic in the difficulty select screen. As you may have noticed by now, there are subtle changes that actually indicate the key to unlocking expert mode. The first digit is the number of BUSHES (1 to 3) on the homestead when easy mode is selected (the spiky one in the middle counts). The second digit is the number of SUN RAYS (5 to 8) on the homestead when medium mode is selected. The third digit is the number of LAYERS (5 to 7) on the sunset of the homestead when hard mode is selected. The fourth digit is the number of QUESTION MARKS (1 to 9) on the expert mode label (to the right of hard). The fifth digit is the number of EXCLAMATION MARKS (1 to 3) on the play button, accessible by selecting any mode. Click the submit button when the five digits have been entered in in that order, and you will be able to access the ultimate challenge. Good luck, you're going to need it. *Stares menacingly*";

function displayWin(diff) {
	undisplay();
	onMouse = null;
	pause = 1;
	ctx.globalAlpha = 0.9;
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#00CC00";
	ctx.font = "60px Courier New";
	ctx.textAlign = "center";
	ctx.fillText("VICTORY", canvas.width / 2, canvas.height / 2 - 180);
	ctx.font = "25px Courier New";
	ctx.fillStyle = "#DDDDDD";
	let diffName;
	switch(diff) {
		case 1: diffName = "easy"; break;		
		case 2: diffName = "medium"; break;
		case 3: diffName = "hard"; break;
		case 4: diffName = "expert"; break;
		default: break;
	}
	ctx.fillText("Congratulations, you have cleared the game on " + diffName + " mode!", canvas.width / 2, canvas.height / 2 - 130);
	if (difficultySelected == 3 && pdefend) {
		ctx.font = "20px Courier New";
		multilineText(secretDesc, 70, canvas.width / 2, canvas.height / 2 - 75, 23, canvas.width - 150);
		ctx.font = "25px Courier New";
		ctx.fillText("Stats", canvas.width / 2, canvas.height / 2 + 320);
		if (Math.floor((time%3600)/60) < 10) ctx.fillText("Time Taken: " + Math.floor(time/3600) + ":0" + Math.floor((time%3600)/60), canvas.width / 2, canvas.height / 2 + 350);
   		else ctx.fillText("Time Taken: " + Math.floor(time/3600) + ":" + Math.floor((time%3600)/60), canvas.width / 2, canvas.height / 2 + 350);
		ctx.fillText("Waves Cleared: " + (wave), canvas.width / 2, canvas.height / 2 + 380);
		ctx.fillText("Enemies Defeated: " + enemiesKilled, canvas.width / 2, canvas.height / 2 + 410);
	} else {
		ctx.fillText("Stats", canvas.width / 2, canvas.height / 2 - 20);
		if (Math.floor((time%3600)/60) < 10) ctx.fillText("Time Taken: " + Math.floor(time/3600) + ":0" + Math.floor((time%3600)/60), canvas.width / 2, canvas.height / 2 + 30);
   		else ctx.fillText("Time Taken: " + Math.floor(time/3600) + ":" + Math.floor((time%3600)/60), canvas.width / 2, canvas.height / 2 + 30);
		ctx.fillText("Waves Cleared: " + (wave), canvas.width / 2, canvas.height / 2 + 60);
		ctx.fillText("Enemies Defeated: " + enemiesKilled, canvas.width / 2, canvas.height / 2 + 90);	
	}
	
}

resources = [1200, 0, 0, 0, 0, 0, 0, 0];
// resources = [10**50, 10**50, 10**50, 10**50, 10**50, 10**50, 10**50, 0];

animate();

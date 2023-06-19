function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineTo(renderingPosX(0), renderingPosY(0));
    ctx.lineTo(renderingPosX(10000), renderingPosY(0));
    ctx.lineTo(renderingPosX(10000), renderingPosY(10000));
    ctx.lineTo(renderingPosX(0), renderingPosY(10000));
    ctx.lineTo(renderingPosX(0), renderingPosY(0));
    ctx.lineWidth = 6;
    ctx.strokeStyle = "black";
    ctx.stroke();

	if (intropage < 5) infohover = null;
	
	let nextPrimes = [];
	for (let i = 0; i < 62; i++) {
		if (primes[i] > wave && nextPrimes.length <= 2) nextPrimes.push(primes[i]);	
	}

	if (swapcd <= 0) swappable = true;
	
	if (primed == true) {
		for (let i = 0; i < 62; i++) {
			if (wave == primes[i]) {
				currentWavePrime = true;
				break;
			} else {
				currentWavePrime = false;	
			}
		}
	}
	
	if (homestead.health > homestead.maxhealth) homestead.health = homestead.maxhealth;
	
	if (pause % 2 == 0) {
		snsDuration--;
		lttDuration--;
		tsDuration--;
		lctDuration--;
		nightDuration--;
		nightcd--;
	}	
	
	meditationFarms = farmunits + caveunits + compressunits + mineunits + pressurizerunits + generatorunits + reactorunits;
	rTotal = 0;
	for (let i = 0; i < 8; i++) rTotal += resources[i];
	
	if (inertiaLevels > 0 && time % 30 == 0 && inertia > 1) inertia -= 1;
	if (eldLevels >= 2) blaze(120 - 90*(eldLevels - 2));
	
	let debuffTypes = ["Earth", "Wind", "Water", "Fire"];
	let debuffMaxes = [earthMax, windMax, waterMax, fireMax];
	
	powerMax = 100 + chargeStorage + 40*capacity.level + storageBoosts*25 + (leechBoost >= 5 ? 25 : 0);

    if (pause % 2 == 0) {
		if (oc >= 4) sendcost *= 0.9975;
		if (oc >= 5) reversecost *= 0.9975;
		time++;
		offCounter--;
		novaTimer++;
		resources[1] += 4/3*(wave/2 + 1)*lumberBoost*leaderunits*Math.log(wave + 10);
		if (offCounter < 0) {
			off = false;
		}
		
		if (time % (autofarm == true ? 8 : 24) == 0) {
			resources[0] += (farmunits + 6)*(farmBoost*3 + 1)*(wave/4 + 1)*farmBuff*30*(1.08**wave);
			resources[2] += caveunits*(wave/4 + 1)*farmBuff*60*(1.08**wave);
			resources[3] += compressunits*(wave/4 + 1)*farmBuff*120*(1.08**wave);
			resources[4] += mineunits*(wave/4 + 1)*farmBuff*180*(1.08**wave);
			resources[5] += pressurizerunits*(wave/4 + 1)*farmBuff*240*(1.08**wave);
		}
	}
	
	introTime++;
	if (winnable == true && enemies.length == 0) won = true;
	
	if (mousePos.x > 440 && mousePos.x < 840 && mousePos.y < canvas.height - 67 && mousePos.y > canvas.height - rows*50 - 67 && upgradeDisplay % 2 == 1) {
		if (upgrades[upgradeY * 8 + upgradeX]) {
			shownUpgrade = upgrades[upgradeY * 8 + upgradeX];
		} else shownUpgrade = null;
	} else shownUpgrade = null;
	
	ctx.textAlign = "left";
   
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (renderingPosX(100 * x) < - 100 || renderingPosX(100 * x) > canvas.width + 100 || renderingPosY(100 * y) < -100 || renderingPosY(100 * y) > canvas.height + 100) {
                continue;
            }
            ctx.fillStyle = getColor(grid[x][y]*(edgeDist(x, y)/25000)); 
            ctx.fillRect(renderingPosX(100 * x), renderingPosY(100 * y), 101, 101);
			if (spriteTiles[x][y] == 1) {
				switch(getColor(grid[x][y]*(edgeDist(x, y)/25000))) {
					case "#332200": ctx.drawImage(getImage("./assets/terrains/mud.png"), renderingPosX(100 * x), renderingPosY(100 * y), 101, 101); break;
					case "#023020": ctx.drawImage(getImage("./assets/terrains/forest.png"), renderingPosX(100 * x), renderingPosY(100 * y), 101, 101); break;
					case "#1F6420": ctx.drawImage(getImage("./assets/terrains/grass.png"), renderingPosX(100 * x), renderingPosY(100 * y), 101, 101); break;
					case "#B2B280": ctx.drawImage(getImage("./assets/terrains/sand.png"), renderingPosX(100 * x), renderingPosY(100 * y), 101, 101); break;
					case "#999999": ctx.drawImage(getImage("./assets/terrains/mountain.png"), renderingPosX(100 * x), renderingPosY(100 * y), 101, 101); break;
					case "#7FD0FD": ctx.drawImage(getImage("./assets/terrains/glacier.png"), renderingPosX(100 * x), renderingPosY(100 * y), 101, 101); break;
					case "#568CB1": ctx.drawImage(getImage("./assets/terrains/water.png"), renderingPosX(100 * x), renderingPosY(100 * y), 101, 101); break;
				}	
			}
        }
	}

    if (dead == false) {
        homestead.draw();
        player.update();
    }

	enemies.forEach((enemy) => {
		ctx.fillStyle = "#000000"
        ctx.fillRect(renderingPosX(enemy.x) - 82, renderingPosY(enemy.y) - 52 - enemy.radius, 164, 34)
        ctx.fillStyle = "#FF0000"
        ctx.fillRect(renderingPosX(enemy.x) - 80, renderingPosY(enemy.y) - 50 - enemy.radius, 160, 30)
		ctx.fillStyle = "#00FF00"
        ctx.fillRect(renderingPosX(enemy.x) - 80, renderingPosY(enemy.y) - 50 - enemy.radius, 160*(enemy.health/enemy.maxhealth), 30)
		ctx.fillStyle = "#000000";
		ctx.textAlign = "center";
		ctx.font = "20px Courier New"
		ctx.fillText(simplify(Math.floor(enemy.health)) + "/" + simplify(Math.floor(enemy.maxhealth)), renderingPosX(enemy.x), renderingPosY(enemy.y) - 30 - enemy.radius);
		if (enemy.debuff != null) {
			// DCAM - debuff colors and maxes
			let DCAM = [["Earth", "#6B3E2E", "#A1785C", earthMax], ["Wind", "ADD8E6", "D6ECF3", windMax], ["Water", "#026592", "#03A9F4", waterMax], ["Fire", "#DD2100", "#FF4500", fireMax]];
			for (let i = 0; i < 4; i++) {
				if (enemy.debuff == DCAM[i][0]) {
					showDebuffBar(enemy, DCAM[i][1], DCAM[i][2], DCAM[i][3]);	
				}
			}
		}
		ctx.textAlign = "left";
		if (novaTimer >= (200 - wave/2)) {
			enemies.forEach((enemy) => {
				if (enemy.radius >= 150) enemyNova(enemy, Math.floor(wave/4) + 30, enemy.damage);
			})
			novaTimer = 0;
		}
	})

	campers = SPGunits + SACunits + YACunits + LEADunits + superSPGunits + superSACunits + superYACunits;
        
    projectiles.forEach((projectile, index) => {
        if (pause % 2 == 0) projectile.lifeTime--;
        if (projectile.lifeTime <= 0) {
            projectiles.splice(index, 1);
        }
        projectile.update();
    });

    enemies.forEach((enemy, indexe) => {
        let angle = Math.atan2(enemy.y, enemy.x);
        if (Math.hypot(enemy.x, enemy.y) < 400) {
            enemy.velocity = {x: 0, y: 0};
        } else {
			units.forEach((unit) => {
				if (unit.type == "Windspire" && Math.hypot(enemy.x - unit.m*50 + 25, enemy.y - unit.n*50 + 25) < 500) enemy.ws = windMultiplier;
			})
			let homesteadDist = Math.hypot(enemy.x, enemy.y);
			if (winnable == false || enemy.radius >= 150) {
				let speedMultiplier = (5 + wave*0.06)*chilled*enemy.ws;
				if (abLevels >= 6) speedMultiplier *= 2;
				if (snsDuration > 0) speedMultiplier *= 10;
				enemy.velocity = {x: -Math.cos(angle)*speedMultiplier, y: -Math.sin(angle)*speedMultiplier};
			}
        }
		if (pause % 2 == 0) enemy.update();
		else enemy.draw();

		if (enemy.debuff == "Fire" && pause % 2 == 0) {
			if (enemy.radius < 100) enemy.health *= (1 - 0.000005*enemy.stacks);
		}
		
		units.forEach((unit) => {
			if (unit.type == "speaker" && Math.hypot(enemy.x - unit.m*50 + 25, enemy.y - unit.n*50 + 25) < 300) enemy.cl = 2
		})

        projectiles.forEach((projectile, indexp) => {
            let distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if (distance - enemy.radius - projectile.radius <= 0) {
				if (projectile.velocity.x**2 + projectile.velocity.x**2 >= 49.9 && abLevels >= 2) {
					projectile.velocity.x /= 10;
					projectile.velocity.y /= 10;
				}
				enemies[indexe].health *= projectile.CB;
				let resourceEffects = 0;
				if (enemy.debuff == "Water" && enemy.stacks < waterMax) {
					if (aqLevels <= 1) {
						enemy.health *= ((1.01 + 0.01*enemy.stacks)/(1.01 + 0.01*(enemy.stacks-1)));
						enemy.maxhealth *= ((1.01 + 0.01*enemy.stacks)/(1.01 + 0.01*(enemy.stacks-1)));
					} else if (aqLevels == 2) {
						enemy.maxhealth *= ((1.015 + 0.015*enemy.stacks)/(1.015 + 0.015*(enemy.stacks-1)));
						enemy.health = enemy.maxhealth;
					} else {
						enemy.maxhealth *= ((1.02 + 0.02*enemy.stacks)/(1.02 + 0.02*(enemy.stacks-1)));
						enemy.health = enemy.maxhealth;
					}
					
				}
				let damageDealt = projectile.damage*(1 + 0.15*globalPower)*(1 + (0.01 + 0.01*meditationBoost + 0.02*farmed)*meditationStacks)*(1 + 0.3*staffunits + 0.3*strengthunits)*(1 + confidenceStacks)*unLagBuff*Math.max(1, leaderBoost*leaderBoosted)*fc*0.98**fcstacks*0.97**mtstacks*1.02**vap*lengthboost**wave*1.15**bellStacks*(steamLevels >= 7 ? 1 + 0.1*upgradesResearched : (steamLevels >= 2 ? 1 + 0.01*upgradesResearched : 1))*(1 + resourceEffects)*(1 + ewwfBoost)*compb*(1 + 0.5*relics)*(1 + 0.0005*empowerment*possibleSkills[4].level)*(1 + enemy.stacks*0.02*possibleSkills[7].level)*(leechBoost >= 8 ? 1 + enemy.stacks*0.05 : 1)*enemy.cl*(pen ? (Math.random() > 0.95 ? 15 : 1) : 1)*(elephants ? (1 + 0.05*enemies.length) : 1)*(unityLevel > 0 ? 0.005*units.length + 1 : 1)*(1 + getFurthestDist()*0.002)*(unityLevel > 2 ? 0.03*enemies.length + 1 : 1)*(unityLevel > 3 ? 0.15*(superLTunits + superLeaderunits) + 1 : 1)*(unityLevel > 3 ? 0.005*units.length + 1 : 1)*(unityLevel > 3 ? 1 + getFurthestDist()*0.002 : 1)*(unityLevel > 3 ? 0.03*enemies.length + 1 : 1)*(off ? 0 : 1)*(steamLevels >= 7 ? 1 + Math.floor(Math.log(rTotal)*50)/100 : (steamLevels >= 6 ? 1 + Math.floor(Math.log(rTotal)*5)/100 : (steamLevels >= 1 ? 1 + Math.floor(Math.log10(rTotal)*5)/100 : 1)))*((tsDuration > 0) ? (1 + talentStacks*0.08) : 1)*((lctDuration > 0) ? 0.01 : 1)*(lttDuration > 0 ? 5 : 1)*Math.max(0.0001, 1 - (coilunits - deadShards)*0.03);
				if (currentDebuff == "Earth") damageDealt *= (1 + 0.01*enemy.stacks);
				if (abLevels >= 1) damageDealt *= 0.8;
				if (enemy.debuff == "water" && enemy.stacks == waterMax && aqLevels >= 3) damageDealt *= 50;
				if (!pipInitialWave && (wave - pipInitialWave) % 3 == 0) damageDealt *= (1 + pipBoost/100);
				if (hexed) damageDealt *= 3**(Math.floor(enemy.stacks/100));
				if (fitmnBoosted) enemies[indexe].health *= 0.9986;
                if (pause % 2 == 0) enemies[indexe].health -= damageDealt;
				if (enemy.debuff == "earth" && tecLevels >= 2) enemy.health *= enemy.stacks/(100000/(tecLevels - 1));
				if (player.state == 3 && Math.hypot(enemy.x - player.x, enemy.y - player.y) < auraRange) damageDealt *= (1 + auraDI/100);
				if (abLevels >= 4 && enemies.length >= 100) damageDealt *= 100;
				if (enemy.stacks > 0) {
					let stackRate = 1;
					if (enemy.debuff == "water") enemy.stacks++;
					else {
						stackRate *= enemy.cl;
						stackRate += (hexed ? Math.floor(enemy.stacks/100) : 0);
						if (Math.hypot(enemy.x - player.x, enemy.y - player.y) < auraRange && auraLevel >= 4 && player.state == 3) {
							if (auraLevel == 4) stackRate += 2;	
							if (auraLevel == 5) stackRate += 4;
						}
						if (enemy.debuff == "earth" && tecLevels > 0) stackRate *= (1 + tecLevels);
						enemy.stacks += stackRate;
					}
				}
				for (let i = 0; i < 4; i++) {
					if (enemy.debuff == debuffTypes[i]) enemy.stacks = Math.min(enemy.stacks, debuffMaxes[i]);
				}
				if (leechBoost >= 3 && leechBoost <= 10 && pause % 2 == 0) charge += (leechBoost - 2);
				else if (leechBoost >= 11 && pause % 2 == 0) charge++;
				if (leechBoost >= 11 && resources[7] < powerMax && charge >= 100) {
					charge -= 100;
					resources[7] += 1;
				} else if (resources[7] < powerMax && charge >= 1000) {
					charge -= 1000;
					resources[7] += 1;
				}
                if (pause % 2 == 0) projectiles[indexp].pierce -= (lttDuration > 0 ? 0.1 : 1);
                if (projectiles[indexp].pierce <= 0) {
					if (projectile.isRocket == true) {
						ctx.fillStyle = "#FFA500";
						ctx.beginPath();
						ctx.arc(renderingPosX(projectile.x), renderingPosY(projectile.y), projectile.blastRadius, 0, Math.PI*2, true);
						ctx.fill();
						enemies.forEach((rangeEnemy) => {
							if (Math.hypot(projectile.x - rangeEnemy.x, projectile.y - rangeEnemy.y) < projectile.blastRadius) {
								rangeEnemy.health -= projectile.damage;
								if (enemy.debuff == "earth" && tecLevels >= 2) enemy.health *= enemy.stacks/(100000/(tecLevels - 1));
								if (enemy.stacks > 0) {
									let stackRate = 1;
									if (enemy.debuff == "water") enemy.stacks++;
									else {
										stackRate *= enemy.cl;
										stackRate += (hexed ? Math.floor(enemy.stacks/100) : 0);
										if (enemy.debuff == "earth" && tecLevels > 0) stackRate *= (1 + tecLevels);
										enemy.stacks += stackRate;
									}
								}
								for (let i = 0; i < 4; i++) {
									if (enemy.debuff == debuffTypes[i]) enemy.stacks = Math.min(enemy.stacks, debuffMaxes[i]);
								}
								if (leechBoost >= 3 && leechBoost <= 10 && pause % 2 == 0) charge += (leechBoost - 2);
								else if (leechBoost >= 11 && pause % 2 == 0) charge++;
								if (leechBoost >= 11 && resources[7] < powerMax && charge >= 100) {
									charge -= 100;
									resources[7] += 1;
								} else if (resources[7] < powerMax && charge >= 1000) {
									charge -= 1000;
									resources[7] += 1;
								}
							}
						})	
						projectiles.splice(indexp, 1);
						enemies.forEach((enemyr, indexr) => {
							if (enemies[indexr].health <= 0) {
            					enemyDeath(enemyr);
            					enemies.splice(indexr, 1);
        					}
						})
					}
                    projectiles.splice(indexp, 1);
                }
            }
        })

        if (enemies[indexe].health <= 0) {
            enemyDeath(enemy);
            enemies.splice(indexe, 1);
        }
    });

	let brittle = 1;
	if (SACBoost == true) brittle = 0.992**SACunits;
	
    enemyprojectiles.forEach((enemyprojectile, index) => {
        enemyprojectile.update();
		if (enemyprojectile.lifeTime <= 0) {
			enemyprojectiles.splice(index, 1);
		}
        if (enemyprojectile.x < 300 && enemyprojectile.y < 200) {
			let wind = false;
			let coiled = false;
			units.forEach((unit) => {
				if (unit.type == "Windspire" && Math.hypot(enemyprojectile.x - unit.m*50 + 25, enemyprojectile.y - unit.n*50 + 25) < 500) wind = true;	
			})
			units.forEach((unit) => {
				if (unit.type == "Coil" && Math.hypot(enemyprojectile.x - unit.m*50 + 25, enemyprojectile.y - unit.n*50 + 25) < 2000) coiled = true;		
			})
			let coilmultiplier = 1;
			if (coiled == true) coilmultiplier = 0.2;
			let enemyDamageDealt = enemyprojectile.damage*brittle*0.95**rncstacks*chilled*(1 - 0.01*absp)*0.95**htstacks*0.92**tmstacks*homesteadwarp*0.8**farmdr*1.75**bellStacks*0.85**songBoost*ddamageboost*(1 + difficultySelected/8)*0.96**healthBoost*(speakerLevels >= 3 ? 0 : 1);
			if (wind == true) enemyDamageDealt *= windMultiplier;
			if (abLevels >= 1) enemyDamageDealt *= 0.5;
			if (abLevels >= 6) enemyDamageDealt *= 2;
			homestead.health -= enemyDamageDealt;
			enemyprojectiles.splice(index, 1);
            if (homestead.health <= 0) {
                dead = true;
            }
        }
        units.forEach((unit, indexu) => {
            let distance = Math.hypot(enemyprojectile.x - unit.m*50 + 25, enemyprojectile.y - unit.n*50 + 25);
            if (distance - 25 - enemyprojectile.radius <= 0) {
				let wind = false;
				let coiled = false;
				units.forEach((unit) => {
					if (unit.type == "Windspire" && Math.hypot(enemyprojectile.x - unit.m*50 + 25, enemyprojectile.y - unit.n*50 + 25) < 500) wind = true;	
				})
				units.forEach((unit) => {
					if (unit.type == "Coil" && Math.hypot(enemyprojectile.x - unit.m*50 + 25, enemyprojectile.y - unit.n*50 + 25) < 2000) coiled = true;		
			})
				let coilmultiplier = 1;
				if (coiled == true) coilmultiplier = 0.2;
				let enemyDamagetoUnit = enemyprojectile.damage*brittle*0.95**rncstacks*chilled*(1 - 0.01*absp)*0.95**htstacks*0.92**tmstacks*homesteadwarp*0.8**farmdr*1.75**bellStacks*0.85**songBoost*ddamageboost*(1 + difficultySelected/8)*0.96**healthBoost*(speakerLevels >= 3 ? 0 : 1);
				if (wind == true) enemyDamagetoUnit *= windMultiplier;
				if (abLevels >= 1) enemyDamagetoUnit *= 0.5;
				if (player.state == 3 && auraLevel >= 2 && Math.hypot(enemyprojectile.x - player.x, enemyprojectile.y - player.y) < auraRange) enemyprojectile.damage *= 0.25;
				units[indexu].health -= enemyprojectile.damage*windMultiplier*brittle*0.95**rncstacks*chilled*(1 - 0.01*absp)*0.95**htstacks*0.92**tmstacks*homesteadwarp*0.8**farmdr*1.75**bellStacks*0.85**songBoost*ddamageboost;
                enemyprojectiles.splice(index, 1);
                if (units[indexu].health <= 0) {
                    tiles[unit.n][unit.m] = null;
					if (revengeLevel > 0) retaliate(unit.m*50 - 25, unit.n*50 - 25);
					if (unit.type == "Coil") deadShards++;	
                    units.splice(indexu, 1);
					
					inertia -= inertiaLevels*8;
                }
            }
        })
    });
    
	leaderBoost = 1;
    units.forEach((unit, index) => {
		let buffables = ["SPG", "SAC", "YAC", "LEAD", "sSPG", "sSAC", "sYAC"];
		let isBuffable = false;
		for (let i = 0; i < 7; i++) {
			if (unit.type == buffables[i]) isBuffable = true;
		}
		if (isBuffable) {
			let adjacentLTs = getLTsAndLeaders(getAdjacent(unit))[0];
			let adjacentLeaders = getLTsAndLeaders(getAdjacent(unit))[1];
			let supportBuffs = applyAdjacentBuffs(getAdjacent(unit.n, unit.m));
			if (adjacentLTs + adjacentLeaders >= 2)  {
				supportBuffs *= (1 + 0.6*duoBoost);
				if (adjacentLTs + adjacentLeaders >= 4 && duoBoost >= 3) supportBuffs *= (1 + 0.1*adjacentLTs + 0.1*adjacentLeaders);
			}
			if (duoBoost >= 4) supportBuffs *= 1.01**leaderunits;
			if (LTEff > 1) supportBuffs *= (1 + 1.01**LTunits);
			supportBuffs *= (1 + 0.002*sportBoost*campers);
			unit.supportBuffs = supportBuffs;
		} else if (unit.type == "Leader") {
			leaderBoost += 0.01;
		} else {
			unit.supportBuffs = 1;	
		}
        unit.draw();
        unit.update();
    });

    upgradeX = Math.floor((mousePos.x - 440)/50);
	upgradeY = Math.floor((mousePos.y - (canvas.height - rows*50 - 67))/50);
	
	selectedSkill = Math.floor((mousePos.x - 440)/50);
	
	if (onMouse != null) {
		for (let i = 0; i < namesAndColours.length; i++) {
			if (onMouse == namesAndColours[i][0]) {
				hoverCircle(namesAndColours[i][1]);	
			}
		}
	}
    
	if ((dead == false && pause % 2 == 0 && wave < 50 && wavePause % 2 == 0) || 
		(dead == false && pause % 2 == 0 && wave == 50 && empowered == true && wavePause % 2 == 0) || 
		(dead == false && pause % 2 == 0 && wave < 100 && empowered == true && wavePause % 2 == 0) || 
		(dead == false && pause % 2 == 0 && wave == 100 && corrupted == true && wavePause % 2 == 0) || 
		(dead == false && pause % 2 == 0 && wave < 150 && corrupted == true && wavePause % 2 == 0) || 
		(dead == false && pause % 2 == 0 && wave == 150 && apocalyptic == true && wavePause % 2 == 0) || 
		(dead == false && pause % 2 == 0 && wave < 200 && apocalyptic == true && wavePause % 2 == 0) || 
		(dead == false && pause % 2 == 0 && wave == 200 && chaotic == true && wavePause % 2 == 0) || 
		(dead == false && pause % 2 == 0 && wave < 250 && chaotic == true && wavePause % 2 == 0) || 
		(dead == false && pause % 2 == 0 && wave == 250 && pandemonium == true && wavePause % 2 == 0) ||
		(dead == false && pause % 2 == 0 && wave < 300 && pandemonium == true && wavePause % 2 == 0)) 
		wavetimer -= ht;
    if (wavetimer <= 0) {
		sendWave(1);
		if (wave > 251) wavetimer = 1;
		else if (wave > 200) wavetimer = Math.max(5400*0.8**oc, 45);
		else if (wave > 150) wavetimer = Math.max(300*0.8**oc, 45);
		else if (wave > 100) wavetimer = Math.max(420*0.88**volcanounits*0.9**magmaunits*0.8**oc, 45);
		else wavetimer = Math.max(540*0.88**volcanounits*0.9**magmaunits*0.8**oc, 45);
		if (wave >= 51) {
			homestead.maxhealth += 100;
			homestead.health += 300;
		}
        wave++;
		if (trigLevel == 1) trigBoost = 200 + 200*Math.sin((Math.PI*2*(wave - trigInitWave)/48));
		if (trigLevel == 2) trigBoost = 2500 + 2500*Math.sin((Math.PI*2*(wave - trigInitWave)/48));
		if (currentDebuff != null) {
			empowerment += Math.round(wave/10);
			empNone = `Enemies currently have ${empowerment}% more health (will also drop ${empowerment}% more resources) and deal ${empowerment/10}% more damage. No stacks of Empowerment will gather.`;
			empEarth = `Enemies currently have ${empowerment}% more health (will also drop ${empowerment}% more resources), deal ${empowerment/10}% more damage, and heal for ${empowerment/100}% of their max health every second. [wave/10] stacks of Empowerment will gather each wave.`;
			empWind = `Enemies currently have ${empowerment}% more health (will also drop ${empowerment}% more resources), deal ${empowerment*0.15}% more damage, and move ${empowerment}% faster. [wave/10] stacks of Empowerment will gather each wave.`;
			empWater = `Enemies currently have ${empowerment*1.5}% more health (will also drop ${empowerment*1.5}% more resources), deal ${empowerment/20}% more damage, and slow your power generation by ${Math.floor((1 - 0.9997**empowerment)*1000)/10}%. [wave/10] stacks of Empowerment will gather each wave.`;
			empFire = `Enemies currently have ${empowerment}% more health (will also drop ${empowerment}% more resources), deal ${empowerment/10}% more damage, and increases enemy explosion damage by ${empowerment/2}%. [wave/10] stacks of Empowerment will gather each wave.`;
			empRand = `Enemies currently have ${empowerment}% more health (will also drop ${empowerment}% more resources) and deal ${empowerment/10}% more damage. [wave/10] stacks of Empowerment will gather each wave.`;
			emps = [empNone, empEarth, empWind, empWater, empFire, empRand];
		}
		if (wave > 150) lootMultiplier *= 1.05;
		let unlockUpgrades = [synergy, bippityBop, reinforcements, turret1, greatBigMoose, meditation, uberfarming, twoDeep, overclocker, confidence, rocket1, cryospired, crossbow1, sitecheck, biologynerds, autofarming, magmaticAlterations, ewwf, aura1, ab1, prestigeSPG, lifebloodSiphon, learners, unity1, darkness, ancientRelic, LEADmodule, believer, blackMagic, psionicCharge, psh, revenge1];
		if ((wave > 20 && wave % 3 == 0 && unlockUpgrades[upgradeAt]) || (wave <= 20 && wave % 2 == 0 && unlockUpgrades[upgradeAt])) {
			if (wave == 48 && difficultySelected == 3) appendUpgrade(secret1);
			appendUpgrade(unlockUpgrades[upgradeAt]);
			upgradeAt++;
		}
		if (wave == 25 || wave == 51 || wave == 151) farmchecked = false;
		if (wave == 21 || wave == 46 || wave == 66 || wave == 102 || wave == 121 || wave == 141) farmchecked = false;
		if (wave == 31 || wave == 51 || wave == 91 || wave == 101 || wave == 151) farmchecked = false;
    }
	
	if (abLevels < 4) ctx.fillStyle = "#000000";
	else ctx.fillStyle = "#CCCCCC";
    ctx.fillRect(canvas.width - 252, canvas.height - 252, 204, 204);


    for (let x = 0; x < grid.length; x += 2) {
        for (let y = 0; y < grid[x].length; y += 2) {
            ctx.fillStyle = getColor(grid[x][y]*(edgeDist(x, y)/25000));
            ctx.fillRect(canvas.width - 250 + 2*x, canvas.height - 250 + 2*y, 4, 4);
        }
	}

	// minimap
    enemies.forEach((enemy) => {
		if (abLevels >= 4) {
			if (enemy.radius >= 150) {
				ctx.fillStyle = "#FF0000";
        		ctx.beginPath();
        		ctx.arc(canvas.width - 250 + enemy.x / 50, canvas.height - 250 + enemy.y / 50, 5, 0, Math.PI*2, true);
        		ctx.fill();
			} else if (enemy.radius >= 75) {
				ctx.fillStyle = "#FF4400";
        		ctx.beginPath();
        		ctx.arc(canvas.width - 250 + enemy.x / 50, canvas.height - 250 + enemy.y / 50, 4, 0, Math.PI*2, true);
        		ctx.fill();
			} else {
				ctx.fillStyle = "#FFFF00";
        		ctx.beginPath();
        		ctx.arc(canvas.width - 250 + enemy.x / 50, canvas.height - 250 + enemy.y / 50, 4, 0, Math.PI*2, true);
        		ctx.fill();
			}
		} else {
			ctx.fillStyle = "#FF4400";
        	ctx.beginPath();
        	ctx.arc(canvas.width - 250 + enemy.x / 50, canvas.height - 250 + enemy.y / 50, 4, 0, Math.PI*2, true);
        	ctx.fill();
		}
    });
	
	ctx.globalAlpha = 0.4;
	if (checkDimensions(renderingPosX(0), renderingPosX(9950), renderingPosY(0), renderingPosY(9950)) && tiles[tileSelect.n][tileSelect.m] && onMouse) ctx.fillStyle = "#AA0000";
	else ctx.fillStyle = "black";
    ctx.fillRect(renderingPosX(tileSelect.m*50 - 50), renderingPosY(tileSelect.n*50 - 50), 50, 50);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(canvas.width - 250 + player.x / 50, canvas.height - 250 + player.y / 50, 4, 0, Math.PI*2, true);
    ctx.fill();
	
	projectiles.forEach((projectile) => {
		if (projectile.radius >= 18) {
			ctx.fillStyle = "#FFCCFF";
			ctx.beginPath();
			ctx.arc(canvas.width - 250 + projectile.x / 50, canvas.height - 250 + projectile.y / 50, 2, 0, Math.PI*2, true);
			ctx.fill();
		}
	})
	
	ctx.fillStyle = "#000000";
	ctx.font = "20px Courier New";
	if (abLevels >= 4) ctx.fillText("[0] to teleport", canvas.width - 239, canvas.height - 268, 200);
	
	buffBox(40, 40, 200, 506);
    ctx.font = "20px Courier New";
	
	ctx.fillStyle = "#000000";
    ctx.fillRect(44, 460, 192, 40);
	
	if (nerdMode == false) ctx.fillStyle = "#EE0000";
	else ctx.fillStyle = "#00EE00";
	ctx.fillRect(46, 462, 188, 36);
	
	ctx.fillStyle = "#000000";
	ctx.fillText(`Nerd Mode ${nerdMode ? 'On' : 'Off'}`, 62, 485, 200);
   	ctx.fillRect(44, 502, 192, 40);
	
	for (let i = 0; i < 4; i++) {
		ctx.fillStyle = "#EE0000";
   		ctx.fillRect(50 + 46*i, 504, 42, 36);
		ctx.drawImage(getImage(equipImages[i]), 56 + 46*i, 506, 30, 30);
	}
	
	for (let i = 0; i < 4; i++) {
		if (player.state == i) {
			ctx.fillStyle = "#00EE00";
   			ctx.fillRect(50 + 46*i, 504, 42, 36);
			ctx.drawImage(getImage(equipImages2[i]), 56 + 46*i, 506, 30, 30);
		}
	}
	
	ctx.fillStyle = "#000000";
	if (wave < 15) {
		ctx.fillRect(96, 504, 42, 36);
		ctx.drawImage(getImage("./assets/equips/rocketun.png"), 102, 506, 30, 30);
	}
	if (wave < 30) {
		ctx.fillRect(142, 504, 42, 36);
		ctx.drawImage(getImage("./assets/equips/xbowun.png"), 148, 506, 30, 30);	
	}
	if (wave < 45) {
		ctx.fillRect(188, 504, 42, 36);
		ctx.drawImage(getImage("./assets/equips/auraun.png"), 194, 506, 30, 30);		
	}

    ctx.font = "25px Courier New";
	ctx.fillText("Homestead HP", 50, 70);
	if (homestead.health / homestead.maxhealth < 0.33) {
		ctx.fillStyle = "#FF0000";
	} else if (homestead.health / homestead.maxhealth < 0.67) {
		ctx.fillStyle = "#FFFF00";
	} else {
		ctx.fillStyle = "#00FF00";
	}
	
	ctx.fillRect(42, 75, Math.floor(196*homestead.health/homestead.maxhealth), 30);
	ctx.fillStyle = "#000000";
	ctx.textAlign = "center";
	ctx.fillText(simplify(homestead.health) + "/" + simplify(homestead.maxhealth), 140, 100);
	ctx.textAlign = "left";
	
	for (let i = 0; i < 8; i++) {
		if (resources[i] > 0) {
			if (i < 7) ctx.fillText(simplify(resources[i]), 90, 150 + 40*i);
			else ctx.fillText(simplify(resources[i]) + "/" + powerMax, 90, 150 + 40*i)
			ctx.drawImage(getImage(resourceImages[i]), 50, 128 + 40*i, 30, 30);
		}
	}
    
    ctx.fillStyle = "#FF0000";
    ctx.font = "30px Courier New";
    ctx.textAlign = "center";
	if (currentDebuff == null) {
		if (Math.floor((time%3600)/60) < 10) ctx.fillText("Wave " + wave + "\t\t\t\t\t" + Math.floor(time/3600) + ":0" + Math.floor((time%3600)/60), canvas.width / 2, 70);
    	else ctx.fillText("Wave " + wave + "\t\t\t\t\t\t\t" + Math.floor(time/3600) + ":" + Math.floor((time%3600)/60), canvas.width / 2, 70);
	} else {
		if (currentDebuff == "Earth") ctx.fillStyle = "#6B3E2E";
		if (currentDebuff == "Wind") ctx.fillStyle = "#ADD8E6";
		if (currentDebuff == "Water") ctx.fillStyle = "#03A9F4";
		if (currentDebuff == "Fire") ctx.fillStyle = "#DD2100";
		if (Math.floor((time%3600)/60) < 10) ctx.fillText("Wave " + wave + "\t\t\t\t\t" + Math.floor(time/3600) + ":0" + Math.floor((time%3600)/60), canvas.width / 2, 70);
    	else ctx.fillText("Wave " + wave + "\t\t\t\t\t" + Math.floor(time/3600) + ":" + Math.floor((time%3600)/60), canvas.width / 2, 70);
	}
	
    if ((wave != 50 || empowered == true) && (wave != 100 || corrupted == true) && (wave != 150 || apocalyptic == true) && (wave != 200 || chaotic == true) && (wave != 250 || pandemonium == true)) ctx.fillText("Enemies in " + Math.floor(wavetimer / 60), canvas.width / 2, 110);
	


	ctx.textAlign = "left";
	if (currentDebuff != null) {
		for (let i = 0; i < 5; i++) {
			if (debuffs[i+1] && currentDebuff == debuffs[i+1].name) ctx.drawImage(getImage(debuffImages[i]), canvas.width / 2 - 110, 120, 30, 30);
			if (swapcd > 0) ctx.fillText(swapcd, canvas.width / 2 - 70, 145, 60);
			else ctx.fillText('A', canvas.width / 2 - 70, 145, 60);
		}
	}

	if (empowerment > 0) {
		if (currentDebuff == null) {
			ctx.drawImage(getImage(powerImages[0]), canvas.width / 2, 120, 30, 30);
			ctx.fillText(empowerment, canvas.width / 2 + 50, 145, 150);
		} else {
			for (let i = 0; i < 5; i++) {
				if (debuffs[i+1] && currentDebuff == debuffs[i+1].name) ctx.drawImage(getImage(powerImages[i+1]), canvas.width / 2, 120, 30, 30);
				ctx.fillText(empowerment, canvas.width / 2 + 50, 145, 150);
			}
		}
		
	}

	ctx.textAlign = "left";

    if (display != "none") {
		buffBox(40, canvas.height - 260, 400, 200);
		if (display == "units") buffBox(40, canvas.height - 340, 400, 280);
		// TWCP - tab, wave, color, position
		let TWCP = [
			["units", 0, SPGPrestiged ? "#000055" : "#000099", 120, 280, true],
			["units", 0, SACPrestiged ? "#005500" : "#009900", 200, 280, true],
			["units", 0, YACPrestiged ? "#550000" : "#990000", 280, 280, true],
			["units", 50, "#331144", 360, 280, true],
			["units", 0, LTPrestiged ? "#CC7200" : "#FFA500", 120, 200, true],
			["units", 0, LeaderPrestiged ? "#077280" : "#3AA5B3", 200, 200, true],
			["units", 24, "#660066", 280, 200, true],
			["units", 150, "#B100CD", 120, 120, true],
			["farming", 0, "#004400", 120, 200, true],
			["farming", 20, "#666666", 200, 200, true],
			["farming", 45, "#888844", 280, 200, true],
			["farming", 65, "#3D251E", 360, 200, true],
			["farming", 101, "#BEC2CB", 120, 120, true],
			["farming", 120, "#111111", 200, 120, true],
			["farming", 140, "#440044", 280, 120, true],
			["misc", 30, "#333333", 120, 200, spireWarped == false],
			["misc", 50, "#BB0000", 200, 200, (campfirePrestige == 0 && wave <= 150)],
			["misc", 50, "#DD0000", 200, 200, (campfirePrestige == 1 && wave <= 150)],
			["misc", 50, "#FF0000", 200, 200, (campfirePrestige == 2 && wave <= 150)],
			["misc", 90, "#301934", 280, 200, true],
			["misc", 100, "#000044", 360, 200, true],
			["misc", 150, "#FFEE00", 200, 200, true],
			["misc", 100, "#999999", 120, 120, true]];
		for (let i = 0; i < TWCP.length; i++) {
			if (display == TWCP[i][0] && wave > TWCP[i][1] && TWCP[i][5]) {
				ctx.fillStyle = TWCP[i][2];
				ctx.beginPath();
				ctx.arc(TWCP[i][3], canvas.height - TWCP[i][4], 20, 0, Math.PI*2, true);
				ctx.fill();
			}
		}
    }

    if (display == "turbo") {
		ctx.fillStyle = "#000000";
        ctx.fillRect(40, canvas.height - 260, 400, 200);
		if (oc >= 4) ctx.drawImage(getImage("./assets/misc/send.png"), 100, canvas.height - 220, 50, 50);
		if (oc >= 5) {
			ctx.drawImage(getImage("./assets/misc/reverse.png"), 215, canvas.height - 220, 50, 50);
			ctx.drawImage(getImage("./assets/misc/pause.png"), 330, canvas.height - 220, 50, 50);
		}
	}
	
	// UTP - unit, type, position
	let UTP = [
	[100, 140, canvas.height - 300, canvas.height - 260, "units", SPGPrestiged ? "sSPG": "SPG", 0, true],
	[180, 220, canvas.height - 300, canvas.height - 260, "units", SACPrestiged ? "sSAC": "SAC", 0, true],
	[260, 300, canvas.height - 300, canvas.height - 260, "units", YACPrestiged ? "sYAC": "YAC", 0, true],
	[340, 380, canvas.height - 300, canvas.height - 260, "units", "LEAD", 50, true],
	[100, 140, canvas.height - 220, canvas.height - 180, "units", LTPrestiged ? "sLT": "LT", 0, true],
	[180, 220, canvas.height - 220, canvas.height - 180, "units", LeaderPrestiged ? "sleader": "leader", 0, true],
	[260, 300, canvas.height - 220, canvas.height - 180, "units", "staff", 24, true],
	[100, 140, canvas.height - 140, canvas.height - 100, "units", "Pat", 150, true],
	[100, 140, canvas.height - 220, canvas.height - 180, "farming", "farm", 0, true],
	[180, 220, canvas.height - 220, canvas.height - 180, "farming", "cave", 20, true],
	[260, 300, canvas.height - 220, canvas.height - 180, "farming", "compressor", 45, true],
	[340, 380, canvas.height - 220, canvas.height - 180, "farming", "mine", 65, true],
	[100, 140, canvas.height - 140, canvas.height - 100, "farming", "pressurizer", 101, true],
	[180, 220, canvas.height - 140, canvas.height - 100, "farming", "generator", 120, true],
	[260, 300, canvas.height - 140, canvas.height - 100, "farming", "reactor", 140, true],
	[100, 140, canvas.height - 220, canvas.height - 180, "misc", "windspire", 30, spireWarped == false],
	[180, 220, canvas.height - 220, canvas.height - 180, "misc", "Campfire", 50, (campfirePrestige == 0 && wave <= 150)],
	[180, 220, canvas.height - 220, canvas.height - 180, "misc", "Magma", 50, (campfirePrestige == 1 && wave <= 150)],
	[180, 220, canvas.height - 220, canvas.height - 180, "misc", "Volcano", 50, (campfirePrestige == 2 && wave <= 150)],
	[260, 300, canvas.height - 220, canvas.height - 180, "misc", "beacon", 90, true],
	[340, 380, canvas.height - 220, canvas.height - 180, "misc", "speaker", 100, true],
	[180, 220, canvas.height - 220, canvas.height - 180, "misc", "coil", 150, true],
	[100, 140, canvas.height - 140, canvas.height - 100, "misc", "pebble", 100, true],
	];
	for (let i = 0;i < UTP.length; i++) {
		if (checkDimensions(UTP[i][0], UTP[i][1], UTP[i][2], UTP[i][3]) && display == UTP[i][4] && wave > UTP[i][6] && UTP[i][7]) {
			description = UTP[i][5];	
		}
	}
	
    if (description != null) {
		let isUnitDesc = false;
		let isHeavyDesc = false;
		let unitDescs = ["SPG", "sSPG", "SAC", "sSAC", "YAC", "sYAC", "LEAD", "LT", "sLT", "leader", "sleader", "staff", "Pat", "earth", "wind", "water", "fire"];
		let heavyDescs = ["generator", "reactor"];
		for (let i = 0; i < 12; i++) if (description == unitDescs[i]) isUnitDesc = true;
		for (let i = 0; i < 2; i++) if (description == heavyDescs[i]) isHeavyDesc = true;
		if (isUnitDesc) buffBox(40, canvas.height - 640, 400, 300)
		else buffBox(40, canvas.height - 640, 400, 380)
		ctx.fillStyle = "#000000";
        ctx.font = "25px Courier New";
        if (description == "send") {
			ctx.fillText("Send Next Wave", 50, canvas.height - 530, 370);
			ctx.drawImage(getImage("./assets/resources/power.png"), 50, canvas.height - 505, 30, 30);
			ctx.fillText(Math.ceil(sendcost), 90, canvas.height - 478);
            ctx.font = "15px Courier New";
            ctx.fillText(`Instantly turbocharges the next wave at full`, 50, canvas.height - 450, 370);
            ctx.fillText("strength and 5x loot.", 50, canvas.height - 430, 370);
		} else if (description == "reverse") {
			ctx.fillText("Reverse", 50, canvas.height - 530, 370);
			ctx.drawImage(getImage("./assets/resources/power.png"), 50, canvas.height - 505, 30, 30);
			ctx.fillText(Math.ceil(reversecost), 90, canvas.height - 478);
            ctx.font = "15px Courier New";
			multilineText(RP[0], 30, 50, canvas.height - 450, 20, 370);
		} else if (description == "pause") {
			ctx.fillText("Pause", 50, canvas.height - 530, 370);
			ctx.drawImage(getImage("./assets/resources/power.png"), 50, canvas.height - 505, 30, 30);
			ctx.fillText(5, 90, canvas.height - 478);
            ctx.font = "15px Courier New";
            multilineText(RP[1], 30, 50, canvas.height - 450, 20, 370);
		} else {
			for (let i = 0; i < DNCSDF.length; i++) {
				if (description == DNCSDF[i][0]) {
					let topDescMargin = isUnitDesc ? 0 : 70;
					ctx.fillText(DNCSDF[i][1], 50, canvas.height - 610, 370);
					displayCosts(DNCSDF[i][2][0], DNCSDF[i][2][1], DNCSDF[i][2][2], DNCSDF[i][2][3]);
					ctx.font = `${DNCSDF[i][5]}px Courier New`;
					ctx.fillText(DNCSDF[i][3], 50, canvas.height - 520 + topDescMargin, 370);
					multilineText(DNCSDF[i][4], 450/(DNCSDF[i][5]), 50, canvas.height - 490 + topDescMargin, DNCSDF[i][5] + 5, 370);
				}
			}
		}
    }
	
	if (upgradeDisplay % 2 == 1) {
		if (upgrades.length == 0) {
			buffBox(438, canvas.height - 119, 404, 4 + 50*rows)
			ctx.fillStyle = "#000000";
			ctx.textAlign = "center";
			ctx.font = "30px Courier New";
			ctx.fillText("No upgrades available", 642, canvas.height - 80);
			ctx.textAlign = "left";
		} else {
			rows = Math.ceil(upgrades.length/8);
			buffBox(438, canvas.height - 50*rows - 69, 404, 50*rows + 4);
			for (let i = 0; i < Math.ceil(upgrades.length/8); i++) {
				for (let j = 0; j < 8; j++) {
					if (upgrades[i*8 + j]) {
						let enoughResources = true;
						for (let k = 0; k < 8; k++) {
							if (resources[k] < upgrades[i*8 + j].cost[k]) enoughResources = false;
						}
						ctx.drawImage(getImage(upgrades[i*8 + j].image), 440 + 50*j, canvas.height - 50*Math.ceil(upgrades.length/8) + 50*i - 67, 50, 50);
						ctx.fillStyle = "#000000";
						ctx.globalAlpha = 0.7;
						if (enoughResources == false) ctx.fillRect(440 + 50*j, canvas.height - 50*Math.ceil(upgrades.length/8) + 50*i - 67, 50, 50);
						ctx.globalAlpha = 1;
					}
				}
			}
		}
	}
	
	if (abilityDisplay % 2 == 1) {
		buffBox(438, canvas.height - 119, 404, 54);
		ctx.fillStyle = "#000000";
		for (let i = 0; i < abilities.length; i++) {
			ctx.drawImage(getImage(abilities[i].image), 440 + 50*i, canvas.height - 117, 50, 50);
			if (resources[7] < abilities[i].cost) {
				ctx.globalAlpha = 0.7;
				ctx.fillRect(440 + 50*i, canvas.height - 117, 50, 50);
				ctx.globalAlpha = 1;
			}
		}

		// wip - replace ability images with their "active" version
		if (snsDuration > 0) ctx.drawImage(getImage("./assets/abilities/snsActive.png"), 490, canvas.height - 117, 50, 50);
		if (lttDuration > 0) ctx.drawImage(getImage("./assets/abilities/lttActive.png"), 640, canvas.height - 117, 50, 50);
		if (tsDuration > 0) ctx.drawImage(getImage("./assets/abilities/tsActive.png"), 740, canvas.height - 117, 50, 50);
		if (lctDuration > 0) ctx.drawImage(getImage("./assets/abilities/lctActive.png"), 790, canvas.height - 117, 50, 50);
		
		if (abilityIndex != null) {
			ctx.textAlign = "left";
			buffBox(438, canvas.height - 517, 404, 400);
			ctx.font = "30px Courier New";
			ctx.fillStyle = "#000000";
			ctx.fillText(abilities[abilityIndex].name, 450, canvas.height - 475, 300);
			ctx.drawImage(getImage("./assets/resources/power.png"), 750, canvas.height - 500, 30, 30);
			ctx.fillText(abilities[abilityIndex].cost, 780, canvas.height - 475, 380);
			ctx.font = "16px Courier New";
			let abilityDescArray = abilities[abilityIndex].description.split(" ");
			for (let i = 0; i < Math.ceil(abilityDescArray.length / 5); i++) {
				let rowDescArray = [];
				for (let j = 0; j < 5; j++) {
					rowDescArray.push(abilityDescArray[i*5 + j]);
				}
				let rowDesc = rowDescArray.join(' ');
				ctx.fillText(rowDesc, 450, canvas.height - 415 + 18*i, 380);
			}
		}

		
	}

	if (mousePos.x > 540 && mousePos.x < 640 && mousePos.y > canvas.height - 65 && mousePos.y < canvas.height - 40 && ewwfUnlocked == true) {
		buffBox(438, canvas.height - 429, 404, 364);
		ctx.fillStyle = "#000000";
		ctx.font = "16px Courier New";
		let debuffArray = debuffDesc.split(" ");
		for (let i = 0; i < Math.ceil(debuffArray.length / 6); i++) {
			let rowDescArray = [];
			for (let j = 0; j < 6; j++) {
				rowDescArray.push(debuffArray[i*6 + j]);
			}
			let rowDesc = rowDescArray.join(' ');
			ctx.fillText(rowDesc, 450, canvas.height - 400 + 20*i, 380);
		}
	}

	ctx.fillStyle = "#000000";
	if (debuffDisplay % 2 == 1) {
		buffBox(438, canvas.height - 119, 404, 54);
		for (let i = 0; i < 6; i++) {
			if (debuffs[i]) {
				ctx.drawImage(getImage(debuffs[i].image), 440 + 50*i, canvas.height - 117, 50, 50);
			}
		}
		if (swapcd > 0) {
			ctx.globalAlpha = "0.7";
			ctx.fillRect(438, canvas.height - 119, 404, 54);
		}
		ctx.globalAlpha = "1";
		if (mousePos.x > 440 && mousePos.x < 840 && mousePos.y > canvas.height - 117 && mousePos.x < canvas.height - 67) {
			for (let i = 0; i < 6; i++) {
				if (mousePos.x > 440 + 50*i && mousePos.x < 490 + 50*i && debuffs[i]) {
					buffBox(438, canvas.height - 529, 404, 414);
					ctx.fillStyle = "#000000";
					ctx.font = "26px Courier New";
					ctx.fillText(debuffs[i].name, 450, canvas.height - 490, 380);
					ctx.font = "16px Courier New";
					let debuffArray = debuffs[i].description.split(" ");
					for (let j = 0; j < Math.ceil(debuffArray.length / 6); j++) {
						let rowDescArray = [];
						for (let k = 0; k < 6; k++) {
							rowDescArray.push(debuffArray[j*6 + k]);
						}
						let rowDesc = rowDescArray.join(' ');
						ctx.fillText(rowDesc, 450, canvas.height - 450 + 20*j, 380);
					}
				}
			}
		}
	}

	if (skillsDisplay % 2 == 1) {
		buffBox(438, canvas.height - 119, 404, 54);
		ctx.fillStyle = "#000000";
		for (let i = 0; i < skills.length; i++) {
			if (skills[i].level >= 10) ctx.drawImage(getImage(skillsmax[i]), 440 + 50*i, canvas.height - 117, 50, 50);
			else ctx.drawImage(getImage(skills[i].image), 440 + 50*i, canvas.height - 117, 50, 50);
			if (resources[7] < skills[i].cost && skills[i].level < 10) {
				ctx.globalAlpha = 0.7;
				ctx.fillStyle = "#000000";
				ctx.fillRect(438 + 50*i, canvas.height - 119, 54, 54);	
			}
			ctx.globalAlpha = 1;
		}
		if (mousePos.x > 440 && mousePos.x < 840 && mousePos.y > canvas.height - 117 && mousePos.x < canvas.height - 67) {
			for (let i = 0; i < skills.length; i++) {
				if (mousePos.x > 440 + 50*i && mousePos.x < 490 + 50*i) {
					buffBox(438, canvas.height - 529, 404, 414);
					ctx.fillStyle = "#000000";
					ctx.font = "26px Courier New";
					ctx.fillText(skills[i].name + "   [Level " + skills[i].level + "]", 450, canvas.height - 490, 380);
					ctx.font = "16px Courier New";
					let skillArray = skills[i].description.split(" ");
					for (let j = 0; j < Math.ceil(skillArray.length / 6); j++) {
						let rowDescArray = [];
						for (let k = 0; k < 6; k++) {
							rowDescArray.push(skillArray[j*6 + k]);
						}
						let rowDesc = rowDescArray.join(' ');
						ctx.fillText(rowDesc, 450, canvas.height - 450 + 20*j, 380);
					}
					let skillInfos = [
					`granting an additional ${skills[0].level*5}% range.`,
					`granting an additional ${skills[1] ? skills[1].level*40 : 0} max power.`,
					`granting an additional ${skills[2] ? Math.floor(1.5**skills[2].level*100) : 0}% health.`,
					`reducing swap cooldown by ${skills[3] ? skills[3].level : 0} waves.`,
					`with ${empowerment} stacks of empowerment, units are gaining ${skills[4] ? skills[4].level*empowerment*0.05 : 0}% damage.`,
					`reducing reload times of all units by ${skills[5] ? skills[5].level*5 : 0}%.`,
					`granting a ${skills[6] ? skills[6].level*5 : 0}% chance to crit.`,
					`increasing the cap of all debuffs by ${skills[7] ? skills[7].level*20 : 0} and granting +${skills[7] ? skills[7].level*2 : 0}% damage to enemies per debuff stack on that enemy.`];
					multilineText((`Your ` + skills[i].name + ` is currently level ${skills[i].level}, ` + skillInfos[i]), 28, 450, canvas.height - 300, 20, 380);
					ctx.font = "35px Courier New";
					ctx.drawImage(getImage("./assets/resources/power.png"), 460, canvas.height - 175, 50, 50);
					if (resources[7] < skills[i].cost && skills[i].level < 10) ctx.fillStyle = "red";
					else ctx.fillStyle = "green";
					if (skills[i].level < 10) ctx.fillText(skills[i].cost, 520, canvas.height - 140);
					else ctx.fillText("MAX", 520, canvas.height - 140);
				}
			}
		}
	}
	
	if (shownUpgrade != null) {
		ctx.textAlign = "left";
		buffBox(438, canvas.height - rows*50 - 567, 404, 500)
		ctx.font = "24px Courier New";
		ctx.fillStyle = "#000000";	
		ctx.fillText(shownUpgrade.name, 450, canvas.height - rows*50 - 535, 380);
		ctx.font = "16px Courier New";
		displayUpgradeCosts(shownUpgrade.cost);
		ctx.fillStyle = "black";
		if (nerdMode == true) {
			let upgradeDescArray = shownUpgrade.nerdyDesc.split(" ");
			for (let i = 0; i < Math.ceil(upgradeDescArray.length / 6); i++) {
				let rowDescArray = [];
				for (let j = 0; j < 6; j++) {
					rowDescArray.push(upgradeDescArray[i*6 + j]);
				}
				let rowDesc = rowDescArray.join(' ');
				ctx.fillText(rowDesc, 450, canvas.height - rows*50 - 365 + 18*i, 380);
			}
		} else {
			multilineText(shownUpgrade.description, 30, 450, canvas.height - rows*50 - 365, 18, 380);
			/*
			let upgradeDescArray = shownUpgrade.description.split(" ");
			for (let i = 0; i < Math.ceil(upgradeDescArray.length / 6); i++) {
				let rowDescArray = [];
				for (let j = 0; j < 6; j++) {
					rowDescArray.push(upgradeDescArray[i*6 + j]);
				}
				let rowDesc = rowDescArray.join(' ');
				ctx.fillText(rowDesc, 450, canvas.height - rows*50 - 365 + 18*i, 380);
			}
			*/
		}
		
		ctx.font = "32px Courier New";
		ctx.fillStyle = "#FFFFFF";	
		if (difficultySelected == 3) {
			switch(shownUpgrade) {
				case synergy: ctx.fillText("Purchase the upgrade 'Perfect Timing' on wave", canvas.width - 900, canvas.height / 2 - 235,8650); break;
				case lifebloodSiphon2: ctx.fillText(randNum1, canvas.width - 500, canvas.height / 2 - 235, 450); break;
				case darkness3: ctx.fillText("plus", canvas.width - 500, canvas.height / 2 - 235, 450); break;
				case uberfarming4: ctx.fillText(randNum2, canvas.width - 500, canvas.height / 2 - 235, 450); break;
				case overclocker5: ctx.fillText("minus", canvas.width - 500, canvas.height / 2 - 235, 250); break;
				case synergy6: ctx.fillText(randNum3 + " to unlock a secret....", canvas.width - 800, canvas.height / 2 - 235, 750); break;
				default: break;
			}
		}
		
	}
	

	let meditationCaps = [40, 60, 100, 200, 350, 500, 600];

	if (meditationBoost > 0) {
		meditationStacks = Math.min(meditationFarms, meditationCaps[meditationBoost - 1]);
		ctx.drawImage(getImage('./assets/buffs/meditation.png'), canvas.width - 175, 30, 40, 40);
		ctx.fillStyle = "#000000";
		ctx.font = "30px Courier New";
		ctx.fillText("+" + Math.floor((1 + meditationBoost + 2*farmed)*meditationStacks) + "%", canvas.width - 120, 60, 100);
	}

	switch(confidenceBoost) {
		case 1: confidenceStacks = Math.min(2, 0.004*enemiesKilled); break;
		case 2: confidenceStacks = Math.min(4.9, 0.007*enemiesKilled); break;
		case 3: confidenceStacks = Math.min(9, 0.009*enemiesKilled); break;
		case 4: confidenceStacks = Math.min(20, 0.01*enemiesKilled); break;
		case 5: confidenceStacks = 0.011*enemiesKilled; break;
	}
	
	ctx.fillStyle = "#000000";
	if (confidenceBoost > 0) {
		ctx.drawImage(getImage('./assets/buffs/confidence.png'), canvas.width - 175, 80, 40, 40);
		ctx.font = "30px Courier New";
		ctx.fillText("+" + Math.floor(confidenceStacks*100) + "%", canvas.width - 120, 110, 100);
	}
	
	if (leechBoost >= 3) {
		ctx.drawImage(getImage('./assets/buffs/charge.png'), canvas.width - 175, 130, 40, 40);
		ctx.font = "30px Courier New";
		ctx.fillText(simplify(charge), canvas.width - 120, 160, 100);
	}
	
	if (steamLevels >= 1) {
		ctx.drawImage(getImage('./assets/buffs/steam.png'), canvas.width - 175, 180, 40, 40);
		ctx.font = "30px Courier New";
		let STEAMTotalBoost = 0;
		if (steamLevels >= 1 && steamLevels <= 5) STEAMTotalBoost += Math.floor(Math.log10(rTotal)*5);
		else if (steamLevels == 6) STEAMTotalBoost += Math.floor(Math.log(rTotal)*5);
		else if (steamLevels == 7) STEAMTotalBoost += Math.floor(Math.log(rTotal)*50);
		if (steamLevels >= 2) STEAMTotalBoost += upgradesResearched;
		if (steamLevels >= 3) STEAMTotalBoost += meditationFarms*2;
		if (steamLevels >= 7) STEAMTotalBoost *= 10;
		ctx.fillText("+" + simplify(STEAMTotalBoost) + "%", canvas.width - 120, 210, 100);
	}

	if (primed && currentWavePrime) {
		ctx.drawImage(getImage('./assets/buffs/prime.png'), canvas.width - 175, 230, 40, 40);
		ctx.font = "30px Courier New";
		ctx.fillText("+" + simplify((wave - 1)*100) + "%", canvas.width - 120, 260, 100);
	}
	
	if (pipInitialWave) {
		if ((wave - pipInitialWave)%3 == 0) {
			ctx.drawImage(getImage('./assets/buffs/pip.png'), canvas.width - 175, 280, 40, 40);
			ctx.font = "30px Courier New";
			ctx.fillText("+" + pipBoost + "%", canvas.width - 120, 310, 100);
		} else if ((wave-pipInitialWave)%3 == 1) {
			ctx.drawImage(getImage('./assets/buffs/squeak.png'), canvas.width - 175, 280, 40, 40);
			ctx.font = "30px Courier New";
			ctx.fillText("+" + squeakBoost + "%", canvas.width - 120, 310, 100);
		} else if ((wave-pipInitialWave)%3 == 2) {
			ctx.drawImage(getImage('./assets/buffs/herman.png'), canvas.width - 175, 280, 40, 40);
			ctx.font = "30px Courier New";
			ctx.fillText("+" + hermanBoost + "%", canvas.width - 120, 310, 100);
		}
	}
	
	if (unityLevel >= 1) {
		ctx.drawImage(getImage('./assets/buffs/unity.png'), canvas.width - 175, 330, 40, 40);
		ctx.font = "30px Courier New";
		let unityTotalBoost = 0;
		if (unityLevel >= 1) unityTotalBoost += 0.5*units.length;
		if (unityLevel >= 2) unityTotalBoost += 0.2*getFurthestDist();
		if (unityLevel >= 3) unityTotalBoost += 3*enemies.length;
		if (unityLevel >= 4) {
			unityTotalBoost = (100 + unityTotalBoost)**2 / 100 - 100;
			unityTotalBoost += (15*superLTunits + 15*superLeaderunits);
		}
		ctx.fillText("+" + simplify(unityTotalBoost) + "%", canvas.width - 120, 360, 100);
	}

	if (homesteadwarp != 1) {
		ctx.globalAlpha = 0.1;
		ctx.fillStyle = "#CBC3E3";
		ctx.fillRect(0, 0, 10000, 10000);
		ctx.globalAlpha = 1;
	}
	
	if (pause % 2 == 1) {
		ctx.font = "30px Courier New";
		ctx.fillStyle = "#000000";
		ctx.textAlign = "left";
		ctx.fillText("[SPACE] to unpause", canvas.width - 350, 50);
	}
	
	if (intropage == 0) {
		pause = 1;
		undisplay();
		ctx.globalAlpha = 0.94;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "90px Courier New";
		ctx.textAlign = "center";
		ctx.fillText("Camp Defender V2", canvas.width / 2, canvas.height / 2 - 280);
		ctx.drawImage(getImage(`./assets/loading/${(Math.floor(introTime/10))%57}.png`), canvas.width / 2 - 200, canvas.height / 2 - 240, 400, 200);
		ctx.font = "26px Courier New";
		ctx.fillText("Featuring:", canvas.width / 2, canvas.height / 2 + 20);
		ctx.fillText("- A secret", canvas.width / 2, canvas.height / 2 + 56);
		ctx.fillText("- Earth Wind Water Fire, the S tier classic", canvas.width / 2, canvas.height / 2 + 92);
		ctx.fillText("- Eight relevant words ending with -ty", canvas.width / 2, canvas.height / 2 + 128);
		ctx.fillText("- Purple circles destroying smaller purple circles", canvas.width / 2, canvas.height / 2 + 164);
		ctx.fillRect(canvas.width / 2 - 350, canvas.height / 2 + 200, 700, 70);
		ctx.globalAlpha = 0.98;
		ctx.fillStyle = "#000000";
		ctx.fillRect(canvas.width / 2 - 348, canvas.height / 2 + 202, 696, 66);
		if (checkDimensions(canvas.width / 2 - 348, canvas.width / 2 + 348, canvas.height / 2 + 202, canvas.height / 2 + 268)) {
			ctx.fillStyle = "#999999";
			ctx.fillRect(canvas.width / 2 - 348, canvas.height / 2 + 202, 696, 66);
			
		}
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(canvas.width / 2 - 350, canvas.height / 2 + 300, 700, 70);
		ctx.globalAlpha = 0.98;
		ctx.fillStyle = "#000000";
		ctx.fillRect(canvas.width / 2 - 348, canvas.height / 2 + 302, 696, 66);
		if (checkDimensions(canvas.width / 2 - 348, canvas.width / 2 + 348, canvas.height / 2 + 302, canvas.height / 2 + 368)) {
			ctx.fillStyle = "#999999";
			ctx.fillRect(canvas.width / 2 - 348, canvas.height / 2 + 302, 696, 66);
			
		}
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "30px Courier New";
		ctx.fillText("Click Here for Rules and Info", canvas.width / 2, canvas.height / 2 + 245);
		ctx.fillText("Click Here to Play", canvas.width / 2, canvas.height / 2 + 345);
		ctx.textAlign = "left";
	} else if (intropage == 1) {
		ctx.globalAlpha = 0.9;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "30px Courier New";
		ctx.textAlign = "center";
		multilineText(introInfos[0], 35, canvas.width / 2, canvas.height / 2 - 140, 40);
		ctx.fillText("Click anywhere to continue", canvas.width / 2, canvas.height / 2 + 160);
		ctx.textAlign = "left";
	} else if (intropage == 2) {
		ctx.globalAlpha = 0.9;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "30px Courier New";
		ctx.textAlign = "center";
		multilineText(introInfos[1], 35, canvas.width / 2, canvas.height / 2 - 140, 40);
		ctx.fillText("Click anywhere to continue", canvas.width / 2, canvas.height / 2 + 160);
		redisplay();
	} else if (intropage == 3) {
		ctx.globalAlpha = 0.9;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "30px Courier New";
		ctx.textAlign = "center";
		ctx.fillText("Inspired by", canvas.width / 2, canvas.height / 2 - 80);
		ctx.fillText("Campdefender v1", canvas.width / 2, canvas.height / 2 - 40);
		/*
		ctx.fillText("", canvas.width / 2, canvas.height / 2);
		ctx.fillText("Thanks to", canvas.width / 2, canvas.height / 2 + 40);
		ctx.fillText("", canvas.width / 2, canvas.height / 2 + 80);
		*/
		ctx.fillText("Click anywhere to play", canvas.width / 2, canvas.height / 2 + 160);
		redisplay();
	} else if (intropage == 4) {
		ctx.globalAlpha = 0.9;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		let topColours = ["#8888FF", "#6666CC", "#FF8800", "#090217"];
		let bottomColours = ["#00BB00", "#559900", "#443322", "#100025"];
		if (difficultySelected != null) {
			if (difficultySelected != null) {
				for (let i = 0; i < 4; i++) {
					if (difficultySelected == i + 1) ctx.fillStyle = topColours[i]
				}
				ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
			}
			if (difficultySelected != null) {
				for (let i = 0; i < 4; i++) {
					if (difficultySelected == i + 1) ctx.fillStyle = bottomColours[i]
				}
				ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
			}
		} else {
			if (difficultyHovered != null) {
				for (let i = 0; i < 4; i++) {
					if (difficultyHovered == i + 1) ctx.fillStyle = topColours[i]
				}
				ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
			}
			if (difficultyHovered != null) {
				for (let i = 0; i < 4; i++) {
					if (difficultyHovered == i + 1) ctx.fillStyle = bottomColours[i]
				}
				ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
			}
		}
		
		if (difficultySelected == 1) ctx.drawImage(getImage(`./assets/misc/easybg.png`), 0, 0, canvas.width, canvas.height / 2);
		if (difficultySelected == 2) ctx.drawImage(getImage(`./assets/misc/mediumbg.png`), 0, 0, canvas.width, canvas.height / 2);
		if (difficultySelected == 3) ctx.drawImage(getImage(`./assets/misc/hardbg${sDigit3}.png`), 0, 0, canvas.width, canvas.height / 2);
		if (difficultySelected == 4) ctx.drawImage(getImage('./assets/misc/expertbg.png'), 0, 0, canvas.width, canvas.height / 2);
		
		
		if (difficultySelected == 1) ctx.drawImage(getImage(`./assets/homesteads/easy${sDigit1}.png`), canvas.width / 2 - 375, canvas.height / 2 - 400, 750, 350);
		if (difficultySelected == 2) ctx.drawImage(getImage(`./assets/homesteads/medium${sDigit2}.png`), canvas.width / 2 - 375, canvas.height / 2 - 400, 750, 350);
		if (difficultySelected == 3) ctx.drawImage(getImage('./assets/homesteads/hard.png'), canvas.width / 2 - 375, canvas.height / 2 - 400, 750, 350);
		if (difficultySelected == 4) ctx.drawImage(getImage('./assets/homesteads/expert.png'), canvas.width / 2 - 375, canvas.height / 2 - 400, 750, 350);
		ctx.globalAlpha = 1;
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "30px Courier New";
		ctx.textAlign = "center";
		if (difficultySelected == null) ctx.fillText("Difficulty Select", canvas.width / 2, canvas.height / 2 - 30);
		ctx.fillStyle = "#00FF00";
		ctx.fillRect(canvas.width / 2 - 390, canvas.height / 2 + 30, 180, 70);
		ctx.globalAlpha = 0.98;
		if (difficultyHovered != 1) ctx.fillStyle = "#000000";
		else ctx.fillStyle = "#009900";
		ctx.fillRect(canvas.width / 2 - 388, canvas.height / 2 + 32, 176, 66);
		ctx.fillStyle = "#FFFF00";
		ctx.fillRect(canvas.width / 2 - 190, canvas.height / 2 + 30, 180, 70);
		ctx.globalAlpha = 0.98;
		if (difficultyHovered != 2) ctx.fillStyle = "#000000";
		else ctx.fillStyle = "#999900";
		ctx.fillRect(canvas.width / 2 - 188, canvas.height / 2 + 32, 176, 66);
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(canvas.width / 2 + 10, canvas.height / 2 + 30, 180, 70);
		ctx.globalAlpha = 0.98;
		if (difficultyHovered != 3) ctx.fillStyle = "#000000";
		else ctx.fillStyle = "#990000";
		ctx.fillRect(canvas.width / 2 + 12, canvas.height / 2 + 32, 176, 66);
		ctx.fillStyle = "#A020F0";
		ctx.fillRect(canvas.width / 2 + 210, canvas.height / 2 + 30, 180, 70);
		ctx.globalAlpha = 0.98;
		if (difficultyHovered != 4) ctx.fillStyle = "#000000";
		else ctx.fillStyle = "#400090";
		ctx.fillRect(canvas.width / 2 + 212, canvas.height / 2 + 32, 176, 66);
		ctx.globalAlpha = 1;
		if (difficultySelected != null && !(difficultySelected == 4 && isExpert == false)) {
			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(canvas.width - 230, canvas.height - 120, 180, 70);
			if (mousePos.x > canvas.width - 230 && mousePos.x < canvas.width - 50 && mousePos.y > canvas.height - 120 && mousePos.y < canvas.height - 50) {
				ctx.fillStyle = "#BBBBBB";
				ctx.fillRect(canvas.width - 228, canvas.height - 118, 176, 66);
				ctx.globalAlpha = 1;
				ctx.fillStyle = "#000000";
				ctx.fillText(`Play${'!'.repeat(sDigit5)}`, canvas.width - 140, canvas.height - 75);
			} else {
				ctx.fillStyle = "#000000";
				ctx.globalAlpha = 0.98;
				ctx.fillRect(canvas.width - 228, canvas.height - 118, 176, 66);
				ctx.globalAlpha = 1;
				ctx.fillStyle = "#FFFFFF";
				ctx.fillText(`Play${'!'.repeat(sDigit5)}`, canvas.width - 140, canvas.height - 75);
			}
		}
		
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText("Easy", canvas.width / 2 - 300, canvas.height / 2 + 73);
		ctx.fillText("Medium", canvas.width / 2 - 100, canvas.height / 2 + 73);
		ctx.fillText("Hard", canvas.width / 2 + 100, canvas.height / 2 + 73);
		if (isExpert == false) ctx.fillText('?'.repeat(sDigit4), canvas.width / 2 + 300, canvas.height / 2 + 73);
		else ctx.fillText("Expert", canvas.width / 2 + 300, canvas.height / 2 + 73);
		ctx.font = "20px Courier New";
		if (difficultySelected != null) {
			for (let i = 0; i < 3; i++) {
				if (difficultySelected == (i+1)) for (let j = 0; j < 15; j++) if (difficultyDescs[i][j]) ctx.fillText(difficultyDescs[i][j], canvas.width / 2, canvas.height / 2 + 160 + 25*j)
			}
			if (difficultySelected == 4) {
				if (isExpert == false) for (let j = 0; j < 8; j++) ctx.fillText(expertDesc[j], canvas.width / 2, canvas.height / 2 + 160 + 25*j);
				else {
					ctx.font = "20px Courier New";
					for (let j = 0; j < 10; j++) ctx.fillText(expertUnlockedDesc[j], canvas.width / 2, canvas.height / 2 + 160 + 23*j);
				}	
			}
		}
		else if (difficultyHovered != null) {
			for (let i = 0; i < 3; i++) {
				if (difficultyHovered == (i+1)) for (let j = 0; j < 8; j++) if (difficultyDescs[i][j]) ctx.fillText(difficultyDescs[i][j], canvas.width / 2, canvas.height / 2 + 160 + 25*j)
			}
			if (difficultyHovered == 4) {
				if (isExpert == false) for (let j = 0; j < 8; j++) ctx.fillText(expertDesc[j], canvas.width / 2, canvas.height / 2 + 160 + 25*j);
				else {
					ctx.font = "20px Courier New";
					for (let j = 0; j < 10; j++) ctx.fillText(expertUnlockedDesc[j], canvas.width / 2, canvas.height / 2 + 160 + 23*j);
				}	
			}
		}
		
		if (passcoded == true) {
			ctx.textAlign = "center";
			ctx.font = "25px Courier New";
			ctx.fillText("Passcode:", canvas.width - 150, 80);
		}
		
		undisplay();
	}

	if (ht < 1) {
		httime--;
		if (httime <= 0) ht = 1;
	}
	
	if (wave > 100 && pause % 2 == 0) {
		resources[7] += 0.001*(1 + 2*generatorunits);
		resources[7] *= 1.002;
	}
	
	resources[7] = Math.min(powerMax, resources[7]);
	
	// BD = buff, description
	let BD = [
	["Meditation", `Units are dealing ${Math.floor((1 + meditationBoost)*meditationStacks)}% more damage for having ${meditationFarms} farms on screen.`],
	["Confidence", `Units are dealing ${Math.floor(confidenceStacks*100)}% more damage for defeating ${enemiesKilled} enemies so far.`],
	["Charge", `You have ${simplify(charge)} units of charge that can be converted to power.`],
	["STEAM Architects", `Units are dealing ${Math.floor(Math.log10(rTotal)*5)}% more damage for having ${simplify(rTotal)} total resources. This bonus scales logarithmically.`],
	["Trig Nerds", `Units are dealing ${trigBoost}% more damage. This boost will reach a maximum every 48 waves after wave ${trigInitWave - 36} and will reach a minimum every 48 waves after wave ${trigInitWave - 12}.`]];

	ctx.textAlign = "center";
	if (infohover != null) {
		for (let i = 0; i < 5; i++) {
			if (infohover == BD[i][0]) {
				buffBox(canvas.width - 560, 40 + 50*i, 360, 140);
				ctx.font = "20px Courier New";
				ctx.fillStyle = "#000000";
				ctx.fillText(BD[i][0], canvas.width - 380, 64 + 50*i);
				multilineText(BD[i][1], 20, canvas.width - 380, 92 + 50*i, 20, 320);
			}
		} 
		if (infohover == "lrb") {
			buffBox(canvas.width - 560, 240, 360, 140);
			ctx.font = "20px Courier New";
			ctx.fillStyle = "#000000";
			ctx.fillText("STEAM Architects", canvas.width - 380, 264);
			ctx.font = "16px Courier New";
			multilineText(`Units are dealing ${Math.floor(Math.log10(rTotal)*5)}% more damage for having ${simplify(rTotal)} total resources. This bonus scales logarithmically.`, 20, canvas.width - 380, 280, 20, 320);
		} else if (infohover == "psh") {
			buffBox(canvas.width - 560, 290, 360, 140);
			ctx.font = "20px Courier New";
			ctx.fillStyle = "#000000";
			ctx.font = "16px Courier New";
			if ((wave - pipInitialWave)%3 == 0) {
				ctx.fillText("Pip", canvas.width - 380, 314);
				ctx.fillText("Units are dealing +" + pipBoost + "% damage.", canvas.width - 380, 350, 320);
			} else if ((wave - pipInitialWave)%3 == 1) {
				ctx.fillText("Squeak", canvas.width - 380, 314);
				ctx.fillText("Units are shooting " + squeakBoost + "% faster.", canvas.width - 380, 350, 320);
			} else {
				ctx.fillText("Herman", canvas.width - 380, 314);
				ctx.fillText("You are gaining +" + hermanBoost + "% antimatter.", canvas.width - 380, 350, 320);
			}
			
		} else if (infohover == "Nerd") {
			buffBox(250, 460, 360, 320);
			ctx.fillStyle = "#000000";
			ctx.font = "24px Courier New";
			ctx.fillText("Toggle Nerd Mode", 430, 500);
			ctx.font = "16px Courier New";
			multilineText(nerdModeDesc, 20, 430, 550, 20, 340);
		} else if (infohover == "Prime") {
			buffBox(canvas.width - 560, 240, 360, 140);
			ctx.font = "20px Courier New";
			ctx.fillStyle = "#000000";
			ctx.fillText("Prime Wave", canvas.width - 380, 264);
			ctx.font = "16px Courier New";
			multilineText("You are currently finding " + wave + "x loot because it is a prime wave. Next prime waves are " + nextPrimes[0] + ", " + nextPrimes[1] + ", and " + nextPrimes[2] + ".", 20, canvas.width - 380, 280, 20, 320);
		}
		for (let i = 1; i < 5; i++) {
			if (debuffs[i] && infohover == debuffs[i].name) {
				buffBox(canvas.width / 2 - 310, 210, 404, 364)
				ctx.fillStyle = "#000000";
				ctx.font = "26px Courier New";
				ctx.fillText("Debuff: " + debuffs[i].name, canvas.width / 2 - 110, 249, 380);
				ctx.font = "14px Courier New";
				multilineText(debuffs[i].description, 30, canvas.width / 2 - 110, 280, 18, 380);
				if (swapcd > 0) ctx.fillText("Next swap in " + swapcd + " waves", canvas.width / 2 - 110, 550, 380);
				else ctx.fillText("Debuff swap available!", canvas.width / 2 - 110, 550, 380);
				
			}
		}
		for (let i = 0; i < 6; i++) {
			if (debuffs[i] && infohover == debuffEmpowers[i]) {
				buffBox(canvas.width / 2 - 220, 210, 444, 314)
				ctx.fillStyle = "#000000";
				ctx.font = "26px Courier New";
				ctx.fillText("Empowerment: " + debuffEmpowers[i], canvas.width / 2, 249, 380);
				ctx.font = "16px Courier New";
				multilineText(emps[i], 30, canvas.width / 2, 289, 20, 380);
			}
		}
		for (let i = 0; i < 4; i++) {
			if (infohover == weapons[i] && wave >= 15*i) {
				buffBox(38, 550, 300, 300)
				ctx.fillStyle = "#000000";
				ctx.font = "24px Courier New";
				let chosenLevel;
				switch(i) {
					case 0: chosenLevel = turretLevel; break;
					case 1: chosenLevel = rocketLevel; break;
					case 2: chosenLevel = xbowLevel; break;
					case 3: chosenLevel = auraLevel; break;
				}
				ctx.fillText("Equip: " + weapons[i] + " " + equipLevels[chosenLevel], 188, 584);
				ctx.font = "16px Courier New";
				multilineText(equipDescs[i], 18, 188, 622, 20, 280);
				
				ctx.fillText(`Hotkey: ${i + 1}`, 188, 809);
			}
		}
	}
	
	if (intropage > 4) {
		ctx.drawImage(getImage('./assets/misc/nightfall.png'), canvas.width / 2 - 10, 32, 50, 50);
		ctx.fillStyle = "#000000";
		ctx.globalAlpha = 0.7;
		ctx.fillRect(canvas.width / 2 - 10, 32, 50, Math.max(0, nightcd / 72));
		ctx.globalAlpha = 1;
	}
	
	
	if (infohover == "Nightfall" && intropage > 4) {
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(canvas.width / 2 - 410, 100, 850, 430);
		ctx.fillStyle = "#000000";
		ctx.fillRect(canvas.width / 2 - 408, 102, 846, 426);	
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "26px Courier New";
		ctx.fillText("Nightfall", canvas.width / 2 + 15, 140);
		ctx.font = "20px Courier New";
		if (nightcd <= 0) {
			ctx.fillStyle = "#00FF00";
			ctx.fillText("Nightfall is ready. Click or use the hotkey [5] to activate", canvas.width / 2 + 15, 170);
		}
		else {
			ctx.fillStyle = "#FF0000";
			ctx.fillText("Nightfall is recharging... " + Math.ceil(nightcd/60) + "s left...", canvas.width / 2 + 15, 170);
		}
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "20px Courier New";
		multilineText("Sometimes the best way to fight fire is with fire. Activating this ability will channel some dark energy and spawn powerful orbs to devastate your enemies. Orbs are special high-pierce seeking projectiles that will essentially latch onto a target and leech their health, damaging them once every frame (60 times a second). Orbs have the potential to damage multiple enemies at once (but will take more pierce) and will disappear once either their projectile lifespan is reached or once they run out of pierce. At your current Nightfall level of " + nightlevel + " you are getting " + nightlevel + ((nightlevel > 1) ? " orbs " : " orb ") + "per activation, each with " + (nightlevel*300 + 600) + " pierce and a " + (10 + nightlevel*2) + "s duration. The strength of this ability can be upgraded by purchasing more Darkness upgrades.", 50, canvas.width / 2 + 15, 215, 23, 800);
		
		ctx.fillStyle = "#FF0000";
		multilineText("WARNING: Using this ability will drain " + ((nightlevel > 2) ? "50%" : "ALL") + " of your total resources.", 50, canvas.width / 2 + 15, 495, 23, 800);
		ctx.fillStyle = "#000000";
	}
	
	if (nightDuration > 0) {
		ctx.globalAlpha = 0.4;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
	}
	
	if (cmpStacks > 0) {
		ctx.drawImage(getImage("./assets/abilities/compost.png"), canvas.width - 175, 480, 40, 40);
		ctx.fillStyle = "#000000";
		ctx.font = "30px Courier New";
		ctx.fillText("+" + (cmpStacks*15) + "%", canvas.width - 80, 510, 100);
	}
	
	if (tsDuration > 0) {
		ctx.drawImage(getImage("./assets/abilities/talentShow.png"), canvas.width - 175, 530, 40, 40);
		ctx.fillStyle = "#000000";
		ctx.font = "30px Courier New";
		ctx.fillText("+" + (talentStacks*8) + "%", canvas.width - 80, 560, 100);
	}
	
	if (snsDuration > 0) ctx.drawImage(getImage(abilities[1].image), canvas.width - 175, 580, 40, 40);
	if (lttDuration > 0) ctx.drawImage(getImage(abilities[4].image), canvas.width - 125, 580, 40, 40);
	if (tsDuration > 0) ctx.drawImage(getImage(abilities[6].image), canvas.width - 175, 630, 40, 40);
	if (lctDuration > 0) ctx.drawImage(getImage(abilities[7].image), canvas.width - 125, 630, 40, 40);
	
	
	displayArray = [unitchecked, farmchecked, miscchecked, upgradechecked];
	alertDisplay();
	
	ctx.globalAlpha = 1;
	
	if (wave == 50 && enemies.length == 0 && empowered == false && empowerdesc == 0) {
		resetfifty();
		ctx.fillText("Stage II", canvas.width / 2, canvas.height / 2 - 240);
		ctx.font = "25px Courier New";
		multilineText(empowermentDesc, 40, canvas.width / 2, canvas.height / 2 - 160, 30, 1200);
		ctx.fillText("Click anywhere to continue", canvas.width / 2, canvas.height / 2 + 300);
		
		if (empowerboosted == false) {
			resources[5] += 1000;
			empowerboosted = true;
			globalResourceBoost *= 4;
			unLagBuff = 4;
			homestead.maxhealth *= 10;
			homestead.health = homestead.maxhealth;
			lengthboost = 1.002;
		}
		undisplay();
	} else if (wave == 50 && enemies.length == 0 && empowered == false) {
		empowered = true;
		redisplay();	
		pause = 0;
		fireunlocked = true;
	}

	if (wave == 100 && enemies.length == 0 && corrupted == false && corruptdesc == 0) {
		resetfifty();
		ctx.fillText("Stage III", canvas.width / 2, canvas.height / 2 - 240);
		ctx.font = "25px Courier New";
		multilineText(corruptionDesc, 40, canvas.width / 2, canvas.height / 2 - 160, 30, 1200);
		ctx.fillText("Click anywhere to continue", canvas.width / 2, canvas.height / 2 + 300);
		
		if (corruptboosted == false) {
			resources[7] = 100;
			corruptboosted = true;
			globalResourceBoost *= 2;
			homestead.maxhealth *= 10;
			homestead.health = homestead.maxhealth;
			volcanounits = 0;
			DNCSDF[26][2][2] = 0;
			magmaunits = 0;
			DNCSDF[27][2][2] = 0;
			lengthboost = 1.006;
		}
		undisplay();
	} else if (wave == 100 && enemies.length == 0 && corrupted == false) {
		corrupted = true;
		redisplay();	
		pause = 0;
	}

	if (wave == 150 && enemies.length == 0 && apocalyptic == false && apocdesc == 0) {
		if (difficultySelected == 1) {
			displayWin(1);
		} else {
			resetfifty();
			ctx.fillText("Stage IV", canvas.width / 2, canvas.height / 2 - 240);
			ctx.font = "25px Courier New";
			multilineText(apocDesc, 40, canvas.width / 2, canvas.height / 2 - 160, 30, 1200);
			ctx.fillText("Click anywhere to continue", canvas.width / 2, canvas.height / 2 + 300);
		
			if (apocboosted == false) {
				apocboosted = true;
				globalResourceBoost *= 2;
				homestead.maxhealth *= 10;
				homestead.health = homestead.maxhealth;
				volcanounits = 0;
				magmaunits = 0;
				lengthboost = 1.008;
				ddamageboost = 1.65;
			}
			undisplay();
		}
		
	} else if (wave == 150 && enemies.length == 0 && apocalyptic == false) {
		apocalyptic = true;
		redisplay();	
		pause = 0;
	}
	
	if (wave == 200 && enemies.length == 0 && chaotic == false && chaosdesc == 0) {
		if (difficultySelected == 2) {
			displayWin(2);
		} else {
			resetfifty();
			ctx.fillText("Stage V", canvas.width / 2, canvas.height / 2 - 240);
			ctx.font = "25px Courier New";
			let chaosArray = chaosDesc.split(" ");
			for (let i = 0; i < Math.ceil(chaosArray.length / 8); i++) {
				let rowDescArray = [];
				for (let j = 0; j < 8; j++) {
					rowDescArray.push(chaosArray[i*8 + j]);
				}
				let rowDesc = rowDescArray.join(' ');
				ctx.fillText(rowDesc, canvas.width / 2, canvas.height / 2 - 160 + 30*i, 1200);
			}
			ctx.fillText("Click anywhere to continue", canvas.width / 2, canvas.height / 2 + 300);

			if (chaosboosted == false) {
				chaosboosted = true;
				globalResourceBoost *= 3;
				homestead.maxhealth *= 10;
				homestead.health = homestead.maxhealth;
			}
			undisplay();
		}
		
	} else if (wave == 200 && enemies.length == 0 && chaotic == false) {
		chaotic = true;
		redisplay();	
		pause = 0;
	} else if (wave == 250 && enemies.length == 0 && pandemonium == false && padesc == 0) {
		if (difficultySelected == 3) {
			displayWin(3);
		} else {
			resetfifty();
			ctx.font = "25px Courier New";
			for (let i = 0; i < 8; i++) {
				ctx.fillText(paDesc[i], canvas.width / 2, canvas.height / 2 - 160 + 30*i, 1200);
			}
			ctx.fillText("Click anywhere to continue", canvas.width / 2, canvas.height / 2 + 300);
			
			if (paboosted = false) {
				paboosted = true;
				homestead.maxhealth *= 10;
				homestead.health = homestead.maxhealth;
			}
		}

		
	} else if (wave == 250 && enemies.length == 0 && pandemonium == false) {
		pandemonium = true;
		redisplay();	
		pause = 0;
	}

	if (wave >= 300 && enemies.length == 0 && dead == false) {
		displayWin(4);
	}
	
	if (dead === true) {
        undisplay();
        ctx.globalAlpha = 0.94;
        ctx.fillStyle = "#000000";
        ctx.fillRect(renderingPosX(player.x) - canvas.width / 2, renderingPosY(player.y) - canvas.height / 2, canvas.width, canvas.height);
        ctx.font = "90px Courier New";
        ctx.fillStyle = "#FF0000";
        ctx.textAlign = "center";
        ctx.globalAlpha = 1;
        ctx.fillText("DEFEAT", canvas.width / 2, canvas.height / 2 - 45);
        ctx.font = "30px Courier New";
        ctx.fillText("Waves survived: " + (wave - 1), canvas.width / 2, canvas.height / 2 + 20);
		ctx.textAlign = "left";
    }
	
	if (difficultySelected == 4 && intropage == 4 && (introTime % 200 == 0 || introTime % 200 == 12)) {
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
    
    updateLocation();
}

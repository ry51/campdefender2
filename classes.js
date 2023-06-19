class Player {
    constructor(x, y, radius, color, state, auto, reloadTime, maxReloadTime, rocketReloadTime, xbowReloadTime, damage, projSize, projColour) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
		this.state = state;
		this.auto = auto;
		this.reloadTime = reloadTime;
		this.maxReloadTime = maxReloadTime;
		this.rocketReloadTime = rocketReloadTime;
		this.xbowReloadTime = xbowReloadTime;
		this.damage = damage;
		this.projSize = projSize;
		this.projColour = projColour;
    }

    draw() {
        ctx.beginPath()
        ctx.arc(renderingPosX(this.x), renderingPosY(this.y), 31, 0, Math.PI * 2, true)
        ctx.fillStyle = "#000000";
        ctx.fill()
        ctx.beginPath()
        ctx.arc(renderingPosX(this.x), renderingPosY(this.y), 30, 0, Math.PI * 2, true)
        ctx.fillStyle = "#AAAAAA";
        ctx.fill()
    }
	
	shoot(target) {
		const angle = Math.atan2(target.y - this.y, target.x- this.x);
        const velocity = {x:Math.cos(angle)*Math.min(15 + wave/3, 40), y:Math.sin(angle)*Math.min(15 + wave/3, 40)};
        projectiles.push(new Projectile(this.x, this.y, this.projSize, this.projColour, velocity, 50, 1, turretDamage, target, 1));	
	}
	
	rocket(target) {
		const angle = Math.atan2(target.y - this.y, target.x- this.x);
        const velocity = {x:Math.cos(angle)*30, y:Math.sin(angle)*30};
		projectiles.push(new Rocket(this.x, this.y, this.projSize, "#FF0000", velocity, 50, 1, rocketDamage, target, 1, rocketRadius));
	}
	
	crossbow(target) {
		for (let i = 0; i < 8; i++) {
			const angle = Math.atan2(target.y - this.y, target.x- this.x);
        	const velocity = {x:Math.cos(angle)*55, y:Math.sin(angle)*55};
       		projectiles.push(new Projectile(this.x + Math.cos(angle)*7*i, this.y + Math.sin(angle)*7*i, this.projSize, (i == 0 ? "#FF0000" : "#222233"), velocity, 150, xbowPierce, xbowDamage, target, 1));	
		}
	}
	
	aura() {
		ctx.globalAlpha = 0.4;
		ctx.beginPath()
        ctx.arc(renderingPosX(this.x), renderingPosY(this.y), auraRange, 0, Math.PI * 2, true)
        ctx.fillStyle = "#ADD8E6";
        ctx.fill()
		ctx.globalAlpha = 1;
		if (time % 240 == 0 && auraLevel >= 1) turretNova(this.x, this.y, 20, turretDamage);
		if (time % 240 == 120 && auraLevel >= 3) rocketNova(this.x, this.y, 20, rocketRadius, rocketDamage);
		if (time % 120 == 60 && auraLevel >= 5) xbowNova(this.x, this.y, 20, xbowPierce, xbowDamage);
	}
	
	update() {
		if (pause % 2 == 0) this.reloadTime -= playerAttackSpeed;
		player.draw();
		let mindist = 5000;
       	let closestenemy = null;
        for (let enemy of enemies) {
            let distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
           	if (distance < mindist) {
               	mindist = distance;
                closestenemy = enemy;
           	}
        }	
		if (player.state == 0) {
        	if (closestenemy && this.reloadTime <= 0) {
            	this.shoot(closestenemy);
            	this.reloadTime = this.maxReloadTime;
        	}
		} else if (player.state == 1) {
			if (closestenemy && this.reloadTime <= 0) {
            	this.rocket(closestenemy);
            	this.reloadTime = this.rocketReloadTime;
        	}	
		} else if (player.state == 2) {
			if (closestenemy && this.reloadTime <= 0) {
            	this.crossbow(closestenemy);
            	this.reloadTime = this.xbowReloadTime;
        	}	
		} else {
			this.aura()	
		}
	}
	
	
}

class Projectile {
    constructor(x, y, radius, color, velocity, lifeTime, pierce, damage, target, CB, isRocket) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.lifeTime = lifeTime;
        this.pierce = pierce;
		this.damage = damage;
		this.target = target;
        this.CB = CB;
		this.isRocket = isRocket;
    }

    draw() {
        ctx.beginPath()
        ctx.arc(renderingPosX(this.x), renderingPosY(this.y), this.radius, 0, Math.PI * 2, true)
        ctx.fillStyle = this.color;
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw()
        if (pause % 2 === 0) {
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
    }
}

class Rocket extends Projectile {
	constructor(x, y, radius, color, velocity, lifeTime, pierce, damage, target, CB, blastRadius) {
		super(x, y, radius, color, velocity, lifeTime, pierce, damage, target, CB, true);	
		this.blastRadius = blastRadius;
	}
}


// almost works - no "bouncing" from enemy to stead when there is only one enemy
class Orb extends Projectile {
	constructor(x, y, radius, color, velocity, lifeTime, pierce, damage, target, CB, lastEnemy, state) {
		super(x, y, radius, color, velocity, lifeTime, pierce, damage, target, CB, true);
		this.lastEnemy = lastEnemy;
	}
	
	update() {
		if (enemies.length > 1 || (enemies.length == 1 && this.hitstead == true)) {
			this.state = "active";	
		}
		
		this.draw()
		if (pause % 2 == 0) {
			let closestenemy = null;
			let mindist = 100000;
        	for (let enemy of enemies) {
            	let distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
            	if (distance < mindist && enemy != this.lastEnemy) {
                	mindist = distance;
                    closestenemy = enemy;
                }
            }
			if (enemies.length > 0) {
				let angle;
				if (enemies.length >= 1) {
					angle = Math.atan2(closestenemy.y - this.y, closestenemy.x - this.x);
				}
            	this.velocity = {x:Math.cos(angle)*50, y:Math.sin(angle)*50};
				this.x += this.velocity.x;
				this.y += this.velocity.y;
			}
			
		}
	}
}

class Enemy {
    constructor(x, y, radius, velocity, health, maxhealth, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, image, debuff, stacks, turbo, ws, sp, cl) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.health = health;
        this.maxhealth = maxhealth;
        this.projradius = projradius;
        this.projcolor = projcolor;
        this.projlifeTime = 60;
        this.projpierce = projpierce;
        this.enemyReloadTime = enemyReloadTime;
        this.enemyReloadTimer = enemyReloadTimer;
        this.damage = damage;
        this.image = getImage(image);
        this.debuff = debuff;
        this.stacks = stacks;
		this.turbo = turbo;
		this.ws = ws;
		this.sp = sp;
		this.cl = cl;
    }

    draw() {
        ctx.save();
        ctx.translate(renderingPosX(this.x), renderingPosY(this.y));
        ctx.rotate((Math.atan2(-this.y, -this.x) + Math.PI/2));
        ctx.drawImage(this.image, -this.radius, -this.radius);
        ctx.restore();
    }

    update() {
        this.draw();
        if (pause % 2 === 0) {
            this.enemyReloadTime--;
        }
        if (this.debuff == "Wind") {
            this.x = this.x + this.velocity.x*0.995**this.stacks;
            this.y = this.y + this.velocity.y*0.995**this.stacks;
        } else {
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
        let mindist = 10000;
        let closestunit = null;
        for (let unit of units) {
            let distance = Math.hypot(unit.m*50 - 25 - this.x, unit.n*50 - 25 - this.y);
            if (distance < mindist) {
                mindist = distance;
                if (mindist < 1000) {
                    closestunit = unit;
                }
            }
        }
        let cornerdist = Math.hypot(this.x, this.y);
        if (cornerdist <= 1200) {
            closestunit = homestead;
        }
        if (closestunit && this.enemyReloadTime <= 0) {
            this.shoot(closestunit);
            this.enemyReloadTime = this.enemyReloadTimer;
        }
    }

    shoot(target) {
        if (target != homestead) {
            if (this.radius >= 150) {
                const angle = Math.atan2(target.n*50 - 25 - this.y, target.m*50 - 25 - this.x);
                for (let i = -Math.floor(wave/50) - 1; i < Math.ceil(wave/50) + 2; i++) {
                    const velocity = {x:Math.cos(angle + Math.PI/12*i)*8, y:Math.sin(angle + Math.PI/12*i)*8};
					console.log()
                    if (this.debuff == "Wind") enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage*0.99**this.stacks*(hexed ? 0.5**(Math.floor(this.stacks/100)) : 1), false));
                    else enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage*(hexed ? 0.5**(Math.floor(this.stacks/100)) : 1), false));
                }
            } else {
                const angle = Math.atan2(target.n*50 - 25 - this.y, target.m*50 - 25 - this.x);
                const velocity = {x:Math.cos(angle)*8, y:Math.sin(angle)*8};
                if (this.debuff == "Wind") enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage*0.99**this.stacks*(hexed ? 0.5**(Math.floor(this.stacks/100)) : 1), false));
                    else enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage*(hexed ? 0.5**(Math.floor(this.stacks/100)) : 1), false));
            }
        } else {
            if (this.radius >= 150) {
                const angle = Math.atan2(-this.y, -this.x);
                for (let i = -Math.floor(wave/50) - 1; i < Math.ceil(wave/50) + 2; i++) {
                    const velocity = {x:Math.cos(angle + Math.PI/12*i)*8, y:Math.sin(angle + Math.PI/12*i)*8};
                    if (this.debuff == "Wind") enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage*0.99**this.stacks*(hexed ? 0.5**(Math.floor(this.stacks/100)) : 1), false));
                    else enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage*(hexed ? 0.5**(Math.floor(this.stacks/100)) : 1), false));
                }
            } else {
                const angle = Math.atan2(-this.y, -this.x);
                const velocity = {x:Math.cos(angle)*8, y:Math.sin(angle)*8};
                if (this.debuff == "Wind") enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage*0.99**this.stacks*(hexed ? 0.5**(Math.floor(this.stacks/100)) : 1), false));
                    else enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage*(hexed ? 0.5**(Math.floor(this.stacks/100)) : 1), false));
            }
        } 
    }
}

class enemyProjectile {
    constructor(x, y, radius, color, velocity, pierce, damage, isHoming) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.isHoming = isHoming;
        if (this.isHoming === true) {
            this.lifeTime = 540;
        }
        else {
            this.lifeTime = 90;
        }
        this.pierce = pierce;
        this.damage = damage;
    }

    draw() {
        ctx.beginPath()
        ctx.arc(renderingPosX(this.x), renderingPosY(this.y), this.radius, 0, Math.PI * 2, true)
        ctx.fillStyle = this.color;
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
		this.lifeTime--;
    }
}

class Building {
    constructor(m, n, type, health, color, cost) {
        this.m = m;
        this.n = n;
        this.type = type;
        this.health = health;
        this.color = color;
        this.cost = cost;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(renderingPosX(this.m*50 - 25), renderingPosY(this.n*50 - 25), 25, 0, Math.PI * 2, true)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
	
	update() {}
}

class Unit extends Building {
    constructor(m, n, type, health, reloadTime, maxReloadTime, range, damage, color, projRadius, cost, supportBuffs, pierce) {
        super(m, n, type, color, cost)
        this.m = m;
        this.n = n;
        this.type = type;
        this.health = health;
        this.reloadTime = reloadTime;
        this.maxReloadTime = maxReloadTime;
        this.range = range;
        this.damage = damage;
        this.color = color;
        this.projRadius = projRadius;
        this.cost = cost;
		this.supportBuffs = supportBuffs;
		this.pierce = pierce;
    }
    
    shoot(target) {
		let angle;
        if (lttDuration <= 0) angle = Math.atan2(target.y - this.n*50 + 25, target.x- this.m*50 + 25);
		else angle = Math.random()*Math.PI*2;
        const velocity = {x:Math.cos(angle)*Math.min(this.range*(1 + 0.2*beaconunits)/40 + wave/2, 40), y:Math.sin(angle)*Math.min(this.range*(1 + 0.2*beaconunits)/40 + wave/2, 40)};
		if (Math.random() < (skills[6] ? skills[6].level : 0)*0.05 + (leechBoost >= 10 ? 0.15 : 0)) projectiles.push(new Projectile(this.m*50 - 25, this.n*50 - 25, this.projRadius, "#CC0000", velocity, 50, this.pierce, this.damage*this.supportBuffs*10, target, 1));
        else projectiles.push(new Projectile(this.m*50 - 25, this.n*50 - 25, this.projRadius, "#000000", velocity, 50, this.pierce, this.damage*this.supportBuffs, target, 1));
    }
    
    update() {
        if (pause % 2 === 0) {
			let reloadAmount = (1 + 0.1*oc)*(skills[5] ? (1/(1 - 0.05*skills[5].level)) : 1)*((!pipInitialWave && (wave - pipInitialWave) % 3 == 1) ? (1 + squeakBoost/100) : 1)*((this.type == "SPG" || this.type == "sSPG" || this.type == "SAC" || this.type == "sSAC" || this.type == "YAC" || this.type == "sYAC") ? 1/0.98**(coilunits - deadShards) : 1);
			if (wave > 50) reloadAmount /= 4;
            this.reloadTime -= reloadAmount;
        }
        let mindist = 10000;
        let closestenemy = null;
        for (let enemy of enemies) {
            let distance = Math.hypot(this.m*50 - 25 - enemy.x, this.n*50 - 25 - enemy.y);
            if (distance < mindist) {
                mindist = distance;
                if (mindist < this.range*(1 + beaconunits*0.2)*(1 + songBoost*0.15)*(1 + clarity.level*0.05)*(leechBoost >= 4 ? 1.1 : 1)) {
                    closestenemy = enemy;
                }
            }
        }
        if (closestenemy && this.reloadTime <= 0) {
            this.shoot(closestenemy);
            this.reloadTime = this.maxReloadTime;
        }
    }
}

class LEAD extends Unit {
    constructor(m, n, range, damage, cost, supportBuffs) {
        super(m, n, 'LEAD', 1250*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1)*(LEADlevels ? 2 : 1)*((LEADlevels >= 5) ? 10 : 1)*((leechBoost >= 6) ? 2 : 1), 20, 20, range, damage, "#331144", 8, cost, supportBuffs, 1);
    }
	
	shoot(target) {
		let leveldamage = 1;
		if (LEADlevels >= 1) leveldamage *= 2;
		if (LEADlevels >= 10) leveldamage *= (1 + 0.3*LEADunits);
		else if (LEADlevels >= 2) leveldamage *= (1 + 0.15*LEADunits);
		if (LEADlevels >= 4) leveldamage *= 3;
		if (LEADlevels >= 9) leveldamage *= 5;
		if (LEADlevels >= 11) leveldamage *= (1 + wave/10);
		if (LEADlevels >= 7) {
			for (let i = -2; i < 3; i++) {
				const angle = Math.atan2(target.y - this.n*50 + 25, target.x- this.m*50 + 25);
        		const velocity = {x:Math.cos(angle + Math.PI*i/9)*this.range*(1 + 0.2*beaconunits)/40, y:Math.sin(angle + Math.PI*i/9)*this.range*(1 + 0.2*beaconunits)/40};
				projectiles.push(new Projectile(this.m*50 - 25, this.n*50 - 25, this.projRadius, "#440044", velocity, 50, pierce, this.damage*this.supportBuffs*leveldamage, target, 1));
			}
		} else if (LEADlevels >= 3) {
			for (let i = -1; i < 2; i++) {
				const angle = Math.atan2(target.y - this.n*50 + 25, target.x- this.m*50 + 25);
        		const velocity = {x:Math.cos(angle + Math.PI*i/3)*this.range*(1 + 0.2*beaconunits)/40, y:Math.sin(angle + Math.PI*i/3)*this.range*(1 + 0.2*beaconunits)/40};
				projectiles.push(new Projectile(this.m*50 - 25, this.n*50 - 25, this.projRadius, "#440044", velocity, 50, pierce, this.damage*this.supportBuffs*leveldamage, target, 1));
			}
		} else {
			const angle = Math.atan2(target.y - this.n*50 + 25, target.x- this.m*50 + 25);
        	const velocity = {x:Math.cos(angle)*this.range*(1 + 0.2*beaconunits)/40, y:Math.sin(angle)*this.range*(1 + 0.2*beaconunits)/40};
			projectiles.push(new Projectile(this.m*50 - 25, this.n*50 - 25, this.projRadius, "#440044", velocity, 50, pierce, this.damage*this.supportBuffs*leveldamage, target, 1));
		}
    }
	
	update() {
        if (pause % 2 === 0) {
			let reloadAmount = (1 + 0.1*oc)*(skills[5] ? (1/(1 - 0.05*skills[5].level)) : 1)*((!pipInitialWave && (wave - pipInitialWave) % 3 == 1) ? (1 + squeakBoost/100) : 1)*((LEADlevels >= 8) ? 2 : 1)*(leechBoost >= 9 ? 1.25 : 1);
			if (wave > 50) reloadAmount /= 4;
            this.reloadTime -= reloadAmount;
        }
        let mindist = 10000;
        let closestenemy = null;
        for (let enemy of enemies) {
            let distance = Math.hypot(this.m*50 - 25 - enemy.x, this.n*50 - 25 - enemy.y);
            if (distance < mindist) {
                mindist = distance;
                if (mindist < this.range*(1 + beaconunits*0.2)*(1 + songBoost*0.15)*(1 + clarity.level*0.05)*(leechBoost >= 4 ? 1.1 : 1)) {
                    closestenemy = enemy;
                }
            }
        }
        if (closestenemy && this.reloadTime <= 0) {
            this.shoot(closestenemy);
            this.reloadTime = this.maxReloadTime;
        }
    }
}

class Pat extends Unit {
    constructor(m, n, range, damage, cost, supportBuffs) {
        super(m, n, 'Pat', 10000*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), 2, 2, range, damage, "#B100CD", 8, cost, 1, 1);
    }

    shoot(target) {
        const angle = Math.atan2(target.y - this.n*50 + 25, target.x- this.m*50 + 25);
        const velocity = {x:Math.cos(angle)*this.range*(1 + 0.2*beaconunits)/40, y:Math.sin(angle)*this.range*(1 + 0.2*beaconunits)/40};
        projectiles.push(new Projectile(this.m*50 - 25, this.n*50 - 25, this.projRadius, "#B100CD", velocity, 50, pierce, this.damage*this.supportBuffs, target, 0.95));
    }
}

class Windspire extends Building {
	constructor(m, n, range, slowdown, cost) {
		super(m, m, 'Windspire', 11000*(1 + healthBoost)*(skills[2] ? 1.5**skills[2].level : 1), "#333333");
		this.m = m;
		this.n = n;
		this.range = range;
		this.slowdown = slowdown;
		this.cost = cost;
	}
	
	update() {}
}

class Homestead {
    constructor(x, y, health, maxhealth, image)    {
        this.x = x;
        this.y = y;
        this.health = health;   
		this.maxhealth = maxhealth;
        this.image = getImage(image);
    }
    
    draw() {
        ctx.drawImage(this.image, renderingPosX(this.x), renderingPosY(this.y), 300, 200);
    }
}

class Upgrade {
	constructor(name, description, nerdyDesc, cost, nextUpgrade, image, effect) {
		this.name = name;
		this.description = description;
		this.nerdyDesc = nerdyDesc;
		this.cost = cost;
		this.nextUpgrade = nextUpgrade;
		this.image = image;
		this.effect = effect;
	}
	
	purchaseable() {
		let purchaseable = true;
		for (let i = 0; i < 8; i++) {
			if (resources[i] < this.cost[i]) {
				purchaseable = false;
			}
		}
		return purchaseable;
	}
	
	purchase() {
		for (let i = 0; i < 8; i++) {
			resources[i] -= this.cost[i];
		}
	}
	
	upgradeValues() {
        switch(this.effect) {
            case "buffBoost": buffBoost++; break;
			case "superBuffBoost": ssgized(); break;
            case "buffDoubleBoost": buffBoost += 2; break;
            case "globalPower": globalPower++; break;
            case "triGlobalPower": globalPower += 3; break;
            case "farmBoost": farmBoost++; break;
            case "duoBoost": duoBoost++; break;
            case "lumberBoost": lumberBoost++; break;
            case "healthBoost": healthUpgrade(); break;
            case "meditationBoost": meditationBoost++; break;
            case "confidenceBoost": confidenceBoost++; break;
            case "spireBoost": spireUpgrade(); break;
            case "spireWarp": spireWarping(); break;
            case "foodNerds": foodNerds = 3; break;
            case "woodNerds": woodNerds = 3.25; break;
            case "stoneNerds": stoneNerds = 3.5; break;
            case "copperNerds": copperNerds = 3.75; break;
            case "titaniumNerds": titaniumNerds = 4; break;
            case "diamondNerds": diamondNerds = 4.5; break;
            case "antimatterNerds": antimatterNerds = 5; break;
            case "resourceBoostBoost": globalResourceBoost *= 1.25; break;
            case "campfirePrestige": campfirePrestige++; break;
            case "compoundBuff": compb *= 1.4; break;
            case "pairBoost": pairBoost++; break;
            case "leechBoost": leechBoost++; break;
            case "asc": ascending(); break;
            case "leaderBoost": leaderBoosted = 1; break;
            case "SPGBoost": SPGBoost = true; break;
            case "SACBoost": SACBoost = true; break;
            case "YACBoost": YACBoost = true; break;
            case "LTBoost": LTEff += 4; break;
            case "expd": leaderEff += 4; break;
            case "ofb": a4 = true; break;
            case "psi": chargeStorage += 25; break;
            case "uberfarmBoost": uberBoosting; break;
            case "sportBoost": sportBoost++; break;
            case "oc": ocing(); break;
            case "steamBoost": steamLevels++; break;
			case "farm2": farmed = 1; break;
			case "om": om(); break;
            case "sfb": spawning(); break;
            case "songBoost": singing(); break;
            case "kbBoost": knocking(); break;
            case "eng": eng++; break;
            case "bellBoost": belling(); break;
            case "ewwf": initiateEWWF(); break;
			case "relic": enableRelic(); break;
			case "LEADBoost": LEADlevels++; break;
			case "PrimeBoost": primed = true; break;
			case "psh": pshing(); break;
			case "tectonicBoost": tecBoost(); break;
			case "windBoost": windBoost(); break;
			case "aquaBoost": aquaBoost(); break;
			case "elderBoost": elderBoost(); break;
			case "speakBoost": speakerBoost(); break;
			case "abBoost": abBoost(); break;
			case "archBoost": archBoost(); break;
			case "turret": turreting(); break;
			case "rocket": rocketing(); break;
			case "crossbow": xbowing(); break;
			case "aura": auraing(); break;
			case "trigNerds": trigging(); break;
			case "inertiaNerds": inertiaLevels++; break;
			case "preSPG": SPGPrestiged = true; break;
			case "preSAC": SACPrestiged = true; break;
			case "preYAC": YACPrestiged = true; break;
			case "preLT": LTPrestiged = true; break;
			case "preLeader": LeaderPrestiged = true; break;
			case "rev": revengeLevel++; break;
			case "penGame": pen = true; break;
			case "elephants": elephant = true; break;
			case "fitmn": fitmnBoosted = true; break;
			case "unity": 
                unityLevel++; 
                if (unityLevel == 5) {
                    DNCSDF[11][4] += " Additionally, each Office Staff increases loot gained by 2% (additive)."; 
                } break;
			case "autofarm": autofarm = true;
			case "dark": nightupgrade(); break;
			case "secret1": if ((randNum1 + randNum2 - randNum3) == wave) appendUpgrade(secret2); break;
			case "secret2": pdefend = true; break;
        } 	
	}
}

class Ability {
	constructor(name, description, cost, image, increase, exponential) {
		this.name = name;
		this.description = description;
		this.cost = cost;
		this.image = image;
        this.increase = increase;
		this.exponential = exponential;
	}
	
	purchaseable() {
		if (resources[7] >= this.cost) return true;
		else return false;
	}
	
	purchase() {
		resources[7] -= this.cost;
        if (this.exponential == true) this.cost *= this.increase;
		else this.cost += this.increase;
	}
	
	use() {
		switch(this.name) {
			case "Water Break":
				nightcd = 0;
				resources[7] = powerMax;
				units.forEach((unit) => {
					unit.health = unit.maxhealth;
				});
				break;
			case "Slip And Slide":
				snsDuration = 600;
				break;
			case "Zone Switch":
				enemies.forEach((enemy) => {
					enemy.x = 1000 + 1000*Math.random();
					enemy.y = 1000 + 1000*Math.random();
				});
				break;
			case "Compost":
				for (let i = 0; i < 7; i++) {
					resources[i] = 0;	
				}
				cmpStacks++;
				break;
			case "Freetime":
				lttDuration = 1200;
				break;
			case "Misfortune":
				enemies.forEach((enemy) => {
					enemy.health /= 2;
					enemy.x += 707;
					enemy.y += 707;
					if (enemy.debuff != null && enemy.stacks < 150) {
						enemy.stacks = 150;	
					}
				})
				break;
			case "Talent Show":
				tsDuration = 900;
				talentStacks = 5;
				break;
			case "Lecture":
				lctDuration = 1200;
				break;
			default: break;
		}
	}
}

class Skill {
    constructor(name, description, cost, level, image, increase) {
		this.name = name;
		this.description = description;
		this.cost = cost;
		this.image = image;
        this.increase = increase;
        this.level = level;
	}

    purchaseable() {
		if (resources[7] >= this.cost && this.level < 10) return true;
		else return false;
	}

    purchase() {
		resources[7] -= this.cost;
        this.cost += this.increase;
		this.level++;
	}
}

class Debuff {
    constructor(name, description, image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }
}



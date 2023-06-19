# Version 2.0

# Major Content Updates

* A secret
* Epic hand drawn loading animation (6 fps lol)
* Added Earth, Wind, Water, Fire, a massive new set of mechanics to transform the game and make it less of a boring grind
* Added skills, a feature that makes power more interesting and worthwhile
* Replaced old abilities with entirely new ones to provide more long-term benefits and ability costs now scale since they weren't meant to be spammable anyways
* Added 1 new combat unit, 2 new farming units, 3 new misc units, and something that can autosend next waves to speed up progress. All of these units are more unique to allow for strategy diversity
* Added a massive range of new upgrades. Also removed/reworked some upgrades because they sucked, didn't fit the theme, were downgrades, or because they were causing too much lag
* Added difficulties so that the player can adjust the game based on their skill level
* Added Nightfall which is for you to explore

# General Changes/Fixes

* Progression past wave 150 is now highly reliant on percentage damage rather than base damage, for two reasons:
1. Playing optimally and playing suboptimally now won't cause massive differences in clear speed - playing optimally obviously still gives a major advantage, but playing suboptimally still doesn't mean that you can't beat the game (for example, an upgrade that multiplies your damage by 30 would be insane in a flat damage based system but a lot less powerful in a percentage based system)
2. Resources can scale better since loot drops are directly proportional to enemy max health
* Removed doom upgrade, antimatter drops start at wave 101 (reason being that doom constantly messed up code)
* Enemies are stronger but spawn less often to avoid lagging the game
* Replaced the tree of upgrades beginning with Prevail of the Undervalued with a tree of upgrades that prestiged each camper type, increasing their scale cost but making them must stronger. This is so the player can avoid spamming units in the endgame, but instead get a stronger equivalent without needing to deploy very many units (also increases pierce and attack speed so less overall projectiles fired will not make the upgrades useless). Both regular units and prestiged units will probably get a scale cost and power increase because they're still very spam-oriented in the current version (assuming a future update exists)
* Removed spawning the wave 200 boss manually because of potential bugs when the player doesn't spawn it manually
* Added a minimum of 0.75s between each wave send to prevent players from accidentally overwhelming their own defense or spawning too many enemies at once and lagging the game.
* Reworked enemy spawning system so enemies spawn at all angles rather than mostly contained in the bottom right corner, windspire upgrades no longer affect spawn pattern
* Bosses no longer drop loot due to the fact that they have vastly more health than regular enemies and I'm too lazy to rework the loot drop algorithm

# Bug Fixes

* Pausing should no longer erase existing projectiles
* Fixed a bug where upgrades would sometimes duplicate after purchasing an upgrade in the same tree
* Warpspired no longer halts enemies if purchased with zero windspires
* Charge should no longer accumulate when the game is paused

# UI/QOL

* Enemy health bars now display both health and max health
* Max power is now shown next to power
* Upgrades of the same tier should now correctly be the same shade (maybe I missed a couple lol)
* Added tiles so that the terrain looks cooler wow
* Numbers with exactly two significant digits should now display properly

I was debating whether or not to make a complete list of balance changes, but decided against it since 
1. this game is completely different than the first version
2. I don't remember everything and probably forgot over half of the changes

# Future Updates

Maybe a small bugfix/balance patch, we'll see how much interest the current version induces and if anyone has strong opinions on what to add/remove


document.getElementById("turbocharger").style.display = "none";
document.getElementById("passcode").style.display = "none";
document.getElementById("submitter").style.display = "none";

function toggleDisplay() {
    if (display == "none") display = units;
    else display = "none";
	document.getElementById("turbocharger").style.display = "none";
}

function unitTab() {
    display = "units";
	unitchecked = true;
	document.getElementById("turbocharger").style.display = "none";
}

function farmingTab() {
    display = "farming";
	farmchecked = true;
	document.getElementById("turbocharger").style.display = "none";
}

function miscTab() {
    display = "misc";
	miscchecked = true;
	if (turbocharger == true) document.getElementById("turbocharger").style.display = "initial";
}

function upgradesTab() {
	upgradeDisplay++;
	abilityDisplay = 0;
	debuffDisplay = 0;
	skillsDisplay = 0;
	upgradechecked = true;
	document.getElementById("turbocharger").style.display = "none";
}

function abilitiesTab() {
	abilityDisplay++;
	debuffDisplay = 0;
	upgradeDisplay = 0;
	skillsDisplay = 0;
	document.getElementById("turbocharger").style.display = "none";
}

function debuffTab() {
	debuffDisplay++;
	abilityDisplay = 0;
	upgradeDisplay = 0;
	skillsDisplay = 0;
	document.getElementById("turbocharger").style.display = "none";
}

function skillsTab() {
	skillsDisplay++;
	abilityDisplay = 0;
	upgradeDisplay = 0;
	debuffDisplay = 0;
	document.getElementById("turbocharger").style.display = "none";
}

function turbo() {
	display = "turbo";
	unitchecked = true;
}

function undisplay() {
    document.getElementById("toggle").style.display = "none";
    document.getElementById("units").style.display = "none";
    document.getElementById("farming").style.display = "none";
    document.getElementById("misc").style.display = "none";
	document.getElementById("upgrades").style.display = "none";
	document.getElementById("abilitiesTab").style.display = "none";
	document.getElementById("debuffTab").style.display = "none";
	document.getElementById("skillsTab").style.display = "none";
	document.getElementById("turbocharger").style.display = "none";
}

function redisplay() {
	document.getElementById("toggle").style.display = "initial";
    document.getElementById("units").style.display = "initial";
    document.getElementById("farming").style.display = "initial";
    document.getElementById("misc").style.display = "initial";
	document.getElementById("upgrades").style.display = "initial";
	if (wave >= 100 && corrupted == true) document.getElementById("abilitiesTab").style.display = "initial";
	if (ewwfUnlocked == true) document.getElementById("debuffTab").style.display = "initial";
	if (wave >= 100 && corrupted == true) document.getElementById("skillsTab").style.display = "initial";
	document.getElementById("turbocharger").style.display = "none";
}

function alertDisplay() {
	for (let i = 0; i < 4; i++) {
		if (displayArray[i] == false) document.getElementById(selectionArray[i]).style.color = "red";
		else document.getElementById(selectionArray[i]).style.color = "black";
	}
}

function submitPasscode() {
	entered = document.getElementById('passcode').value;
	if (entered == `${sDigit1}${sDigit2}${sDigit3}${sDigit4}${sDigit5}`) {
		isExpert = true;	
	}
}


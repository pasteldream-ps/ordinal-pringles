function updateMarkupHTML(){
    DOM("powersText").innerText = `You have ${formatWhole(data.markup.powers)} Ordinal Powers`
    DOM("markupButton").innerHTML = calculateHardy()>=10240?`Markup and gain ${formatWhole(data.ord.ordinal)} Ordinal Powers`:`H<sub>ω<sup>2</sup></sub>(10) is required to Markup...`
    DOM("factorShiftButton").innerText = `Preform a Factor Shift\nRequires: ${format(fsReqs[data.markup.shifts])} Ordinal Powers`
    DOM("auto0").innerText = `Successor AutoClicker\nCosts ${autoCost(0)} Ordinal Powers`
    DOM("auto1").innerText = `Maximize AutoClicker\nCosts ${autoCost(1)} Ordinal Powers`
    DOM("autoText").innerText = `Your ${formatWhole(data.autoLevels[0])} Successor AutoClikers click the Successor button ${formatWhole(data.autoLevels[0]*100)} times/second\nYour ${formatWhole(data.autoLevels[1])} Maximize AutoClikers click the Maximize button ${formatWhole(data.autoLevels[1]*100)} times/second`
}
let markupTab = "auto"
function switchMarkupTab(t){
    DOM(`${markupTab}SubPage`).style.display = `none`
    DOM(`${t}SubPage`).style.display = `flex`
    markupTab = t
}
function markup(){
    if(!calculateHardy()>=10240) return
    data.markup.powers += data.ord.ordinal
    data.ord.ordinal = 0
    data.ord.over = 0
}

const fsReqs = [200, 1000, 1e4, 3.5e5, 1e12, 1e21, 1e100, /*1.095e272*/ Infinity]
function factorShift(){
    if(data.markup.powers <= fsReqs[data.markup.shifts] || data.markup.shifts > 7) return createAlert("Failure", "Insufficient Ordinal Powers", "Dang.")
    --data.ord.base
    ++data.markup.shifts

    data.ord.ordinal = 0
    data.ord.over = 0
    data.markup.powers = 0
    for (let i = 0; i < data.autoLevels.length; i++) {
        data.autoLevels[i] = 0
    }
}
let boostTab = "upgrades"
function switchBoostTab(t){
    DOM(`${boostTab}SubPage`).style.display = `none`
    DOM(`${t}SubPage`).style.display = `flex`
    boostTab = t
}

const bupDesc = ['Each Factor\'s effect is doubled', 'Boost OP gain by 10x', 'The Ordinal Base is reduced by 4 if it\'s over 7', 'Dynamic Gain and Cap are squared in Odd-Numbered Challenges',
    'Unlock Max All AutoBuyer', 'Boosters Boost Tier 1 and 2 automation', 'Factor Boosts lower the Ordinal Base, but only under Ψ(Ω)', 'Dynamic Gain is increased based on how fast it decreases',
    'Unlock Markup AutoBuyer', 'Gain 20 Free OP/s', 'Gain 3 Free Factors if you have unlocked them all', 'Boosters boost OP gain if the Ordinal Base is less than 6']
const bupCosts = [1, 5, 72, 53,
    1, 4, 73, 74,
    1, 8, 16, 66]
function initBUPs(){
    let rows = [DOM('bupColumn0'), DOM('bupColumn1'), DOM('bupColumn2')]
    let total = 0
    for (let i = 0; i < rows.length; i++) {
        for (let n = 0; n < bupCosts.length/3; n++) {
            let bup = document.createElement('button')
            bup.className = 'bup'
            bup.id = `bup${total}`
            bup.innerText = `${bupDesc[total]}\n${bupCosts[total]} Boosters`
            rows[i].append(bup)
            ++total
        }
    }
    for (let i = 0; i < data.boost.hasBUP.length; i++) {
        DOM(`bup${i}`).addEventListener('click', ()=>buyBUP(i))
        DOM(`bup${i}`).style.backgroundColor = data.boost.hasBUP[i]?'#002480':'black'
    }
}
const autoNames = ['Max All', 'Markup']
const autoRequirements = ['you can\'t Factor Shift', 'you\'re past Ψ(Ω)']
const autoUps = [4, 8]
function updateBoostersHTML(){
    DOM('boosterText').innerText = `You have ${format(data.boost.amt)} Boosters (${format(data.boost.total)} total)`
    for (let i = 0; i < data.autoStatus.enabled.length; i++) {
        DOM(`t2AutoText${i}`).innerText = `Your ${autoNames[i]} AutoBuyer is clicking the ${autoNames[i]} button 0 times/second, but only if ${autoRequirements[i]}`
        DOM(`auto${i+2}`).innerText = data.boost.hasBUP[autoUps[i]]?`${autoNames[i]} AutoBuyer: ${boolToReadable(data.autoStatus.enabled[i], 'EDL')}`:`${autoNames[i]} AutoBuyer: LOCKED`
    }
}

function boosterReset(){
    data.ord.ordinal = 0
    data.ord.over = 0
    data.ord.base = 10
    data.ord.isPsi = false
    data.markup.powers = 0
    data.markup.shifts = 0
    data.dy.level = 1
    data.dy.gain = 0
    data.dy.cap = 40
    for (let i = 0; i < data.factors.length; i++) {
        data.factors[i] = 0
    }
    for (let i = 0; i < data.autoLevels.length; i++) {
        data.autoLevels[i] = 0
    }
}

function boost(){
    if(!data.ord.isPsi || data.ord.ordinal < boostReq()) return createAlert("Failure", "Insufficient Ordinal", "Dang.")

    if(data.boost.times === 0){
        DOM('boostNav').style.display = 'block'
        DOM('factorBoostButton').style.display = 'inline-block'
    }

    data.boost.amt += data.boost.times+1
    data.boost.total += data.boost.times+1
    ++data.boost.times

    boosterReset()
}
function boostReq(){
    return (3 ** (data.boost.times+1) * 4 * 10) - 11
}

function buyBUP(i){
    if(data.boost.hasBUP[i] || data.boost.amt < bupCosts[i]) return
    if(i % 4 !== 0 && !data.boost.hasBUP[i-1]) return // Force you to buy them in order, but only in columns

    data.boost.hasBUP[i] = true
    data.boost.amt -= bupCosts[i]

    DOM(`bup${i}`).style.backgroundColor = '#002480'
}
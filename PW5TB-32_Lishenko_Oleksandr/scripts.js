const PL110KV_Omega_Val = 0.01;
const T110KV_Omega_Val = 0.007;
const V110KV_Omega_Val = 0.015;
const V10KV_Omega_Val = 0.02;
const tires_Omega_Val = 0.03;
const V110KV_Tvi_Val = 30;
const PL110KV_Tvi_Val = 10;
const T110KV_Tvi_Val = 100;
const V10KV_Tvi_Val = 15;
const tires_Tvi_Val = 2;
const Planned_K_Max_Val = 43;

const inputElements = {
    'PL110KVOmegaVal': PL110KV_Omega_Val,
    'T110KVOmegaVal': T110KV_Omega_Val,
    'V110KVOmegaVal': V110KV_Omega_Val,
    'V10KVOmegaVal': V10KV_Omega_Val,
    'tiresOmegaVal': tires_Omega_Val,
    'PL110KVTviVal': PL110KV_Tvi_Val,
    'T110KVTviVal': T110KV_Tvi_Val,
    'V110KVTviVal': V110KV_Tvi_Val,
    'V10KVTviVal': V10KV_Tvi_Val,
    'tiresTviVal': tires_Tvi_Val,
    'PlannedKMaxVal': Planned_K_Max_Val
};

function setInputValues() {
    for (const id in inputElements) {
        document.getElementById(id).value = inputElements[id];
    }
}

function calcWnedaVal(Omega, tv, Pm, Tm) {
    return Omega * tv * Pm * Tm;
}

function calcWnedpVal(kp, Pm, Tm) {
    return kp * Pm * Tm;
}

function calcZperVal(ZperA, Wneda, ZperP, Wnedp) {
    return ZperA * Wneda + ZperP * Wnedp;
}

document.addEventListener('DOMContentLoaded', () => {
    setInputValues();

    const OmegaSumVal = PL110KV_Omega_Val * 10 + T110KV_Omega_Val + V110KV_Omega_Val + V10KV_Omega_Val + 6 * tires_Omega_Val;
    const tvosVal = (PL110KV_Tvi_Val * PL110KV_Omega_Val + T110KV_Tvi_Val * T110KV_Omega_Val + V110KV_Tvi_Val * V110KV_Omega_Val + V10KV_Tvi_Val * V10KV_Omega_Val + tires_Tvi_Val * 6 * tires_Omega_Val) / OmegaSumVal;
    const kaosVal = (OmegaSumVal * tvosVal) / 8760;
    const kposVal = 1.2 * (Planned_K_Max_Val / 8760);
    const DKOmega = 2 * OmegaSumVal * (kaosVal + kposVal);
    const DSOmega = DKOmega + V10KV_Omega_Val;

    document.getElementById('button__first').addEventListener('click', () => {
        document.getElementById('OmegaSumVal').textContent = OmegaSumVal.toFixed(2);
        document.getElementById('tvosVal').textContent = tvosVal.toFixed(2);
        document.getElementById('kaosVal').textContent = (kaosVal * 1e4).toFixed(2);
        document.getElementById('kposVal').textContent = (kposVal * 1e4).toFixed(2);
        document.getElementById('DKOmega').textContent = (DKOmega * 1e4).toFixed(2);
        document.getElementById('DSOmega').textContent = DSOmega.toFixed(2);
    });

    document.getElementById('button__second').addEventListener('click', () => {
        const Omega = parseFloat(document.getElementById('OmegaVal').value);
        const tv = parseFloat(document.getElementById('tvVal').value);
        const kp = parseFloat(document.getElementById('kpVal').value);
        const Pm = parseFloat(document.getElementById('PmVal').value);
        const Tm = parseFloat(document.getElementById('TmVal').value);
        const ZperA = parseFloat(document.getElementById('ZperAVal').value);
        const ZperP = parseFloat(document.getElementById('ZperPVal').value);

        const Wneda = calcWnedaVal(Omega, tv, Pm, Tm);
        const Wnedp = calcWnedpVal(kp, Pm, Tm);
        const Zper = calcZperVal(ZperA, Wneda, ZperP, Wnedp);

        document.getElementById('WnedaVal').textContent = Wneda.toFixed(2);
        document.getElementById('WnedpVal').textContent = Wnedp.toFixed(2);
        document.getElementById('ZperVal').textContent = Zper.toFixed(2);
    });
});

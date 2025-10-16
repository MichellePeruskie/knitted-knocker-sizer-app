/***** Official chart: Underwire -> diameter (cm & in) *****/
const CM_BY_UW = {30:9.7,32:10.6,34:11.4,36:12.3,38:13.1,40:14.0,42:14.8,44:15.7,46:16.5,48:17.4,50:18.2,52:19.0,54:19.9,56:20.7,58:21.6,60:22.4};
const IN_BY_UW = {30:3.82,32:4.17,34:4.49,36:4.84,38:5.16,40:5.51,42:5.83,44:6.18,46:6.50,48:6.85,50:7.17,52:7.48,54:7.83,56:8.15,58:8.50,60:8.82};

const LADDER_CANON=["AA","A","B","C","D","DD","E","F","FF","G","GG","H","HH","J","JJ","K","KK","L"];
const LADDER_US_UK=LADDER_CANON.slice();
const LADDER_EU=["AA","A","B","C","D","E","F","G","H","I","J","K","L"];
const LADDER_JP=LADDER_EU;
const LADDER_AU=["AA","A","B","C","D","DD","E","F","FF","G","GG","H","HH","J","JJ","K","KK","L"];

const bandConversion={
  EU:{60:28,65:30,70:32,75:34,80:36,85:38,90:40,95:42,100:44,105:46,110:48,115:50,120:52,125:54,130:56,135:58,140:60},
  CN:{60:28,65:30,70:32,75:34,80:36,85:38,90:40,95:42,100:44,105:46,110:48,115:50,120:52},
  AU:{6:28,8:30,10:32,12:34,14:36,16:38,18:40,20:42,22:44,24:46,26:48,28:50,30:52,32:54,34:56,36:58,38:60},
  JP:{65:30,70:32,75:34,80:36,85:38,90:40,95:42,100:44,105:46,110:48,115:50,120:52},
  US:{},UK:{},IN:{}
};

const CUP_BASES=[["AA",4.0],["A",4.5],["B",5.0],["C",5.5],["D",6.0],["DD",6.5],["E",7.0],["F",7.5],["G",8.0],["H",8.5],["I",9.0],["J",9.5],["K",10.0],["L",10.5]];
const CUP_OFFSET={"AA":-2,"A":-2,"B":0,"C":2,"D":2,"DD":4,"E":4,"F":6,"FF":8,"G":8,"GG":10,"H":10,"HH":12,"J":12,"JJ":14,"K":14,"KK":16,"L":16};

function normalizeCupRaw(region,c){c=(c||"").toUpperCase().trim();if(c==="D1")c="D";if(c==="D2")c="DD";if(c==="D3"||c==="DDD")c="F";if(c==="D4")c="G";return c;}
function cupIndexFromRegion(region,cupRaw){const c=normalizeCupRaw(region,cupRaw);let ladder=LADDER_US_UK;if(region==="EU"||region==="CN")ladder=LADDER_EU;else if(region==="AU")ladder=LADDER_AU;else if(region==="JP")ladder=LADDER_JP;let idx=ladder.indexOf(c);if(idx<0)return LADDER_CANON.indexOf(c);return LADDER_CANON.indexOf(ladder[idx]);}
function toUSBand(region,bandStr){const n=parseInt(bandStr,10);if(isNaN(n))return null;if(region==="US"||region==="UK"||region==="IN")return n;return (bandConversion[region]||{})[n]??null;}

function regionBandLooksMismatched(region,bandStr){const n=parseInt(bandStr,10);if(isNaN(n))return false;const is5=n%5===0;const looksEU=is5&&n>=60&&n<=140;const looksUS=n>=26&&n<=60&&n%2===0;const looksAU=n>=6&&n<=38&&n%2===0;if(region==="US"||region==="UK"||region==="IN"){return looksEU;}if(region==="EU"||region==="JP"||region==="CN"){return looksUS;}if(region==="AU"){return is5;}return false;}
function contactHQError(reason){const base='Contact <a href="https://www.knittedknockers.org/contact-us/" target="_blank">Knitted Knockers headquarters</a> for further sizing guidance.';if(reason==="regionMismatch")return{error:"Is the selected Country/Region correct? If so, "+base};if(reason==="tooSmall")return{error:"This size is smaller than the smallest charted underwire (30). If the Country/Region is correct, please "+base};if(reason==="tooLarge")return{error:"This size is larger than the largest charted underwire (60). If the Country/Region is correct, please "+base};return{error:base};}

function parseInput(region,input){input=(input||"").toUpperCase().trim().replace(/\s+/g,"");const m=input.match(/^(\d{1,3})([A-Z]+)$/);if(!m)return{error:"Enter a valid size like 38D, 90C, 14DD, 75F."};const bandStr=m[1],cupStr=m[2];const usBand=toUSBand(region,bandStr);if(!usBand){const hint=regionBandLooksMismatched(region,bandStr)?" Is the selected Country/Region correct?":"";return{error:"Band "+bandStr+" not recognized for "+region+"."+hint};}const cupIdx=cupIndexFromRegion(region,cupStr);if(cupIdx<0)return{error:"Unrecognized cup for "+region+": "+cupStr+". For US/UK, try letters like A, B, C, D, DD, DDD/F, etc."};return{usBand,cupIdx,cupCanon:LADDER_CANON[cupIdx],regionBand:bandStr,regionCup:cupStr};}
function uwFrom(band,cupIdx){const cup=LADDER_CANON[cupIdx]||"B";let uw=band+(CUP_OFFSET[cup]??0);uw=Math.round(uw/2)*2;return uw;}

function roundUpToQuarter(inches){return Math.ceil(inches*4)/4;}
function toNearestSixth(inches){return Math.round(inches*6)/6;}
function formatSixths(inches){const snapped=toNearestSixth(inches);const whole=Math.floor(snapped+1e-9);const frac=Math.round((snapped-whole)*6);const fracMap=["","1/6","1/3","1/2","2/3","5/6"];const fracText=frac?(" "+fracMap[frac]):"";return (whole?whole:0)+fracText+"″";}

function pickLetterAndRows(inchRaw){const bases=CUP_BASES.slice().sort((a,b)=>a[1]-b[1]);const d6=toNearestSixth(inchRaw);for(const [L,B] of bases){if(Math.abs(d6-B)<=0.02){return{label:L,rows:0,diamQuarter:B};}}const dQ=roundUpToQuarter(inchRaw);let prev=bases[0],next=bases[bases.length-1];for(let i=0;i<bases.length;i++){if(dQ<=bases[i][1]){next=bases[i];prev=bases[Math.max(0,i-1)];break;}}const delta=dQ-prev[1];if(delta<0.25)return{label:prev[0],rows:0,diamQuarter:dQ};else if(delta<0.50)return{label:prev[0],rows:1,diamQuarter:dQ};else return{label:next[0],rows:0,diamQuarter:dQ};}

function volunteerCupLabel(cup,region){const preferDD=(region==="US"||region==="UK"||region==="AU");if(cup==="DD"||cup==="E")return preferDD?"DD (E)":"E (DD)";return cup;}
window.volunteerCupLabel=volunteerCupLabel;

function recommend(region,input){const p=parseInput(region,input);if(p.error)return p;const uwRaw=uwFrom(p.usBand,p.cupIdx);if(uwRaw<30)return contactHQError("tooSmall");if(uwRaw>60){if(regionBandLooksMismatched(region,p.regionBand))return contactHQError("regionMismatch");return contactHQError("tooLarge");}const cm=CM_BY_UW[uwRaw],inchRaw=IN_BY_UW[uwRaw];if(cm==null||inchRaw==null)return contactHQError();const inchExactDisplay=formatSixths(inchRaw);const cupRows=pickLetterAndRows(inchRaw);return{cm,inch:cupRows.diamQuarter,inchExactDisplay,uw:uwRaw,parsed:p,cupRows};}
function handleCalculate(region,sizeStr){return recommend(region,sizeStr);}
window.handleCalculate=handleCalculate;

const $=sel=>document.querySelector(sel);
$('#calcBtn').addEventListener('click',()=>{const res=handleCalculate($('#region').value,$('#bra').value);const out=$('#out');if(res.error){out.innerHTML='<span style="color:#b00020;font-weight:700">'+res.error+'</span>';return;}const rowsTxt=res.cupRows.rows?(' + '+res.cupRows.rows+' row'+(res.cupRows.rows>1?'s':'')):"";const displayCup=volunteerCupLabel(res.cupRows.label,$('#region').value);out.innerHTML='Diameter: <strong>'+res.inchExactDisplay+'</strong> ('+res.cm.toFixed(1)+' cm)<br>Knocker size to send: <strong>'+displayCup+rowsTxt+'</strong>.';});
$('#resetBtn').addEventListener('click',()=>{$('#bra').value='';$('#out').textContent='—';});

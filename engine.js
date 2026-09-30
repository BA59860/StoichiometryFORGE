import {REACTIONS,ATOMIC_MASSES} from './bank.js';
export function atoms(formula){
  const tokens=formula.match(/[A-Z][a-z]?|\d+|[()]/g);
  if(!tokens||tokens.join('')!==formula)throw Error('Invalid formula');
  let i=0;
  function group(nested=false){const result={};while(i<tokens.length){const token=tokens[i++];if(token===')'){if(!nested)throw Error('Unexpected parenthesis');return result;}let part;if(token==='(')part=group(true);else {if(!(token in ATOMIC_MASSES))throw Error('Unknown element');part={[token]:1};}const multiplier=/^\d+$/.test(tokens[i]||'')?Number(tokens[i++]):1;for(const [el,count] of Object.entries(part))result[el]=(result[el]||0)+count*multiplier;}if(nested)throw Error('Missing parenthesis');return result;}return group();
}
// Use the same published two-decimal molar masses in calculations and in the UI.
export const molarMass=formula=>Number(Object.entries(atoms(formula)).reduce((sum,[el,n])=>sum+ATOMIC_MASSES[el]*n,0).toFixed(2));
export const sig=(n,d=3)=>Number(n.toPrecision(d));
export function format(n,d=3){if(!Number.isFinite(n))return '';let result=n.toPrecision(d);if(/^\d+0$/.test(result))result+='.';return result.replace(/e\+?/,' × 10^');}
export function solve(p){
  const product=p.reaction.products[p.target];const productMass=molarMass(product.formula);
  const paths=p.given.map(g=>{const r=p.reaction.reactants[g.index];const moles=g.mass/molarMass(r.formula);const productMoles=moles*product.coefficient/r.coefficient;return {...g,moles,productMoles,yield:productMoles*productMass};});
  const limiting=paths.reduce((a,b)=>a.yield<b.yield?a:b);
  return {paths,limiting:limiting.index,theoretical:limiting.yield,percent:p.actual===null?null:p.actual/limiting.yield*100};
}
export function eligibleReactions(track){return REACTIONS.filter(r=>track!=='limiting'||r.reactants.length===2);}
export function makeProblem(options={},rng=Math.random){
  const requested=options.track||'mass';if(!['mass','limiting','percent','mixed'].includes(requested))throw Error('Unknown track');
  const selected=options.reactionId&&REACTIONS.find(r=>r.id===Number(options.reactionId));
  if(options.reactionId&&!selected)throw Error('Unknown reaction');
  const tracks=selected?.reactants.length===1?['mass','percent']:['mass','limiting','percent'];
  const track=requested==='mixed'?tracks[Math.floor(rng()*tracks.length)]:requested;
  const eligible=eligibleReactions(track);if(selected&&!eligible.includes(selected))throw Error('Limiting-reactant practice needs two reactants.');
  const reaction=selected||eligible[Math.floor(rng()*eligible.length)];
  const target=reaction.targets[Math.floor(rng()*reaction.targets.length)];
  const useTwo=track==='limiting'||(track==='percent'&&reaction.reactants.length===2&&rng()<.5);
  let given;
  if(useTwo){const limiting=Math.floor(rng()*2),extent=.025+rng()*1.75,excess=1.25+rng()*1.5;given=reaction.reactants.map((r,index)=>({index,mass:sig(extent*r.coefficient*molarMass(r.formula)*(index===limiting?1:excess))}));}
  else {const index=Math.floor(rng()*reaction.reactants.length);given=[{index,mass:sig(1+rng()*149)}];}
  const p={reaction,target,given,actual:null,track,balanceFirst:options.balanceFirst===true};
  if(track==='percent')p.actual=sig(solve(p).theoretical*(.45+rng()*.53));
  return p;
}
export function parseAnswer(text){
  // Accept ordinary decimals and scientific notation; units are supplied by the form.
  const normalized=String(text).trim().replace(/[−–]/g,'-').replace(/\s*[×x*]\s*10\s*\^\s*/i,'e').replace(/\s+/g,'');
  if(!/^[+]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(normalized))return null;
  const n=Number(normalized);return Number.isFinite(n)&&n>0?n:null;
}
export const closeEnough=(value,expected)=>value!==null&&Math.abs(value-expected)<=Math.abs(expected)*.005+1e-10;
export function checkCoefficients(reaction,values){
  const expected=[...reaction.reactants,...reaction.products].map(s=>s.coefficient);
  if(values.length!==expected.length||values.some(v=>!Number.isSafeInteger(v)||v<1))return 'Use a positive whole-number coefficient in every box, including 1.';
  const ratio=values[0]/expected[0];
  if(!values.every((v,i)=>v===expected[i]*ratio))return 'The atoms are not conserved yet. Adjust coefficients only; keep every formula unchanged.';
  if(ratio!==1)return 'That equation is balanced. Now reduce all coefficients to the smallest whole-number ratio.';
  return null;
}

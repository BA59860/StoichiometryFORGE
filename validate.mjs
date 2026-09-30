import assert from 'node:assert/strict';
import {REACTIONS} from './bank.js';
import {atoms,molarMass,solve,makeProblem,eligibleReactions,parseAnswer,closeEnough,checkCoefficients,sig,format,significantFigures,looksLikeEarlyRounding} from './engine.js';
assert.equal(REACTIONS.length,50);assert.equal(new Set(REACTIONS.map(r=>r.id)).size,50);
assert.deepEqual(atoms('Ca3(PO4)2'),{Ca:3,P:2,O:8});assert.deepEqual(atoms('C2H5OH'),{C:2,H:6,O:1});assert.deepEqual(atoms('Fe2(SO4)3'),{Fe:2,S:3,O:12});
assert.equal(molarMass('MgO'),40.31);assert.equal(molarMass('CuCl2'),134.45);assert.equal(molarMass('Ca3(PO4)2'),310.18);
for(const r of REACTIONS){const total=side=>{const result={};for(const s of side)for(const [el,n] of Object.entries(atoms(s.formula)))result[el]=(result[el]||0)+s.coefficient*n;return result;};assert.deepEqual(total(r.reactants),total(r.products),r.name);const coefs=[...r.reactants,...r.products].map(s=>s.coefficient);assert.equal(checkCoefficients(r,coefs),null);assert.match(checkCoefficients(r,coefs.map(n=>n*2)),/reduce/);assert.ok(checkCoefficients(r,coefs.map((n,i)=>i===0?n+1:n)));assert.ok(r.targets.every(i=>r.products[i]));}
const fixture={reaction:REACTIONS[0],target:0,given:[{index:0,mass:10},{index:1,mass:5}],actual:10};const result=solve(fixture);assert.equal(result.limiting,1);assert.ok(Math.abs(result.theoretical-12.596875)<1e-10);assert.ok(Math.abs(result.percent-79.3847680476)<1e-7);
const al=solve({reaction:REACTIONS[30],target:1,given:[{index:0,mass:13.49},{index:1,mass:134.45}],actual:null});assert.equal(al.limiting,0);assert.ok(Math.abs(al.theoretical-47.6625)<1e-10);
const mg=solve({reaction:REACTIONS[0],target:0,given:[{index:0,mass:12}],actual:17.5});assert.ok(Math.abs(mg.theoretical-19.8979843686)<1e-9);assert.ok(closeEnough(87.9,mg.percent));
for(const text of ['1.25e-3','1.25 × 10^-3','1.25 x 10^−3','0.00125'])assert.equal(parseAnswer(text),.00125);
for(const text of ['','NaN','Infinity','-2','0','2 g','1/2','2..3','1e999'])assert.equal(parseAnswer(text),null);
for(const [text,unit,value,count] of [
 ['12.6 g','g',12.6,3],['12,6g','g',12.6,3],['87.9%','%',87.9,3],['87,90 %','%',87.9,4],
 ['1.26×10-1 g','g',.126,3],['1.26 × 10^−1 g','g',.126,3],['1.26 × 10⁻¹g','g',.126,3],
 ['1.260e-1 g','g',.126,4],['  +1,20 e +2 g  ','g',120,3],['1.56 × 10³ g','g',1560,3],
 ['0,00450','g',.0045,3],['100. g','g',100,3],['12,600 g','g',12.6,5],['12.6','g',12.6,3]
]){assert.equal(parseAnswer(text,unit),value,text);assert.equal(significantFigures(text,unit),count,text);}
for(const unit of ['g','%'])for(const text of ['<script>alert(1)</script>','12.6<img src=x>','12.6;alert(1)','9'.repeat(400),'1e999','1e-999','0','-1','NaN','Infinity','12 6','1,234,567','1,234.5','1.234,5','1..2','1e--3','1.26×10','1.26×10^-','1/2','2+3','12.6 kg','12.6 mol','12.6 g%','12.6 gg'])assert.equal(parseAnswer(text,unit),null,text);
assert.equal(parseAnswer('12.6%','g'),null);assert.equal(parseAnswer('87.9g','%'),null);
for(const [reactionId,target,given,actual,answer,kind] of [
 [14,0,[{index:0,mass:144}],null,118,'mass'],
 [7,0,[{index:0,mass:114},{index:1,mass:104}],null,157,'mass'],
 [12,1,[{index:0,mass:97.5}],31.8,69,'percent']
]){
 const p={reaction:REACTIONS[reactionId-1],target,given,actual},s=solve(p),expected=kind==='percent'?s.percent:s.theoretical;
 assert.equal(closeEnough(answer,expected),false,'Early rounding still requires a retry');
 assert.equal(looksLikeEarlyRounding(p,answer,kind),true,'Give a specific rounding hint');
 assert.equal(looksLikeEarlyRounding(p,sig(expected),kind),false,'Correctly rounded answers need no retry');
 assert.equal(looksLikeEarlyRounding(p,expected*1.1,kind),false,'Do not mislabel large errors');
}
assert.equal(format(100),'100.');assert.equal(format(120),'120.');assert.equal(format(1000),'1.00 × 10^3');
for(const [text,count] of [['5.00',3],['0.00450',3],['19.90',4],['.00120',3],['+1.20e2',3],['1.20 × 10^−3',3],['120.',3],['100.',3],['120',null],['1e2',1],['12',2],['2.0000',5],['1e999',null]])assert.equal(significantFigures(text),count,text);
const counter=solve({reaction:REACTIONS[0],target:0,given:[{index:0,mass:1},{index:1,mass:.8}],actual:null});assert.equal(counter.limiting,0);assert.equal(format(counter.paths[0].yield),'1.66');assert.equal(format(counter.paths[1].yield),'2.02');
assert.throws(()=>makeProblem({track:'limiting',reactionId:9}));assert.throws(()=>makeProblem({reactionId:999}));
let seed=71209;const rng=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);let cases=0;const seenLimits=new Set();
for(const track of ['mass','limiting','percent'])for(const reaction of eligibleReactions(track))for(let j=0;j<100;j++){
 const p=makeProblem({track,reactionId:reaction.id},rng),s=solve(p);cases++;assert.ok(Number.isFinite(s.theoretical)&&s.theoretical>0);assert.ok(closeEnough(sig(s.theoretical),s.theoretical));assert.ok(!closeEnough(s.theoretical*1.05,s.theoretical));
 for(const input of [format(s.theoretical)+' g',format(s.theoretical).replace('.',',')+'g']){assert.ok(closeEnough(parseAnswer(input,'g'),s.theoretical));assert.equal(significantFigures(input,'g'),3);}
 assert.ok(p.given.every(g=>g.mass===sig(g.mass)));if(p.given.length===2){const yields=s.paths.map(a=>a.yield).sort((a,b)=>a-b);assert.ok(yields[1]/yields[0]>1.2);seenLimits.add(s.limiting);const product=p.reaction.products[p.target],extent=s.theoretical/(product.coefficient*molarMass(product.formula));for(const g of p.given){const reactant=p.reaction.reactants[g.index];assert.ok(extent*reactant.coefficient*molarMass(reactant.formula)<=g.mass+1e-9);}}
 if(track==='percent'){assert.ok(s.percent>44&&s.percent<99);assert.ok(p.actual<s.theoretical);assert.ok(closeEnough(sig(s.percent),s.percent));assert.ok(closeEnough(parseAnswer(format(s.percent)+'%','%'),s.percent));assert.equal(significantFigures(format(s.percent)+'%','%'),3);}
}
assert.equal(seenLimits.size,2);
for(const track of ['mass','limiting','percent','mixed'])for(const edge of [0,1-Number.EPSILON]){const p=makeProblem({track},()=>edge);assert.ok(solve(p).theoretical>0);}
for(let j=0;j<100;j++)assert.notEqual(makeProblem({track:'mixed',reactionId:9},rng).track,'limiting');
console.log(`PASS: 50 balanced reactions; ${cases} generated cases; matching units, decimal commas, scientific notation, malformed input rejection, early-rounding hints, significant figures, and independent calculation fixtures.`);

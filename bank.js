// Curated classroom equations. Amounts for aqueous substances are masses of solute.
// id | name | reactants | products | target product indices | conditions
// Each species is coefficient:formula:state. Conditions qualify the equation, not a lab procedure.
const rows = `
1|Magnesium oxide|2:Mg:s,1:O2:g|2:MgO:s|0|Magnesium reacts with oxygen.
2|Water formation|2:H2:g,1:O2:g|2:H2O:l|0|Water is collected after cooling.
3|Ammonia synthesis|1:N2:g,3:H2:g|2:NH3:g|0|Use the forward reaction to calculate the maximum theoretical yield; actual conversion may be lower.
4|Aluminum oxide|4:Al:s,3:O2:g|2:Al2O3:s|0|Aluminum reacts with oxygen.
5|Sodium chloride|2:Na:s,1:Cl2:g|2:NaCl:s|0|Direct combination of the elements.
6|Iron(II) sulfide|1:Fe:s,1:S:s|1:FeS:s|0|Elemental sulfur is represented as S in this classroom equation.
7|Magnesium nitride|3:Mg:s,1:N2:g|1:Mg3N2:s|0|Magnesium reacts with nitrogen.
8|Copper(II) oxide|2:Cu:s,1:O2:g|2:CuO:s|0|Copper is oxidized to copper(II) oxide.
9|Calcium carbonate decomposition|1:CaCO3:s|1:CaO:s,1:CO2:g|0,1|Thermal decomposition; carbon dioxide escapes.
10|Magnesium carbonate decomposition|1:MgCO3:s|1:MgO:s,1:CO2:g|0,1|Thermal decomposition.
11|Potassium chlorate decomposition|2:KClO3:s|2:KCl:s,3:O2:g|0,1|Catalyzed thermal decomposition.
12|Hydrogen peroxide decomposition|2:H2O2:aq|2:H2O:l,1:O2:g|1|The given mass is pure H2O2 dissolved in solution.
13|Sodium bicarbonate decomposition|2:NaHCO3:s|1:Na2CO3:s,1:CO2:g,1:H2O:g|0,1|Thermal decomposition; gaseous products escape.
14|Copper(II) hydroxide decomposition|1:Cu(OH)2:s|1:CuO:s,1:H2O:g|0|Thermal decomposition.
15|Silver(I) oxide decomposition|2:Ag2O:s|4:Ag:s,1:O2:g|0,1|Thermal decomposition.
16|Water electrolysis|2:H2O:l|2:H2:g,1:O2:g|0,1|Electrical energy drives the decomposition.
17|Methane combustion|1:CH4:g,2:O2:g|1:CO2:g,2:H2O:g|0,1|Assume complete combustion by the equation shown; ignore alternative products.
18|Ethane combustion|2:C2H6:g,7:O2:g|4:CO2:g,6:H2O:g|0,1|Assume complete combustion by the equation shown; ignore alternative products.
19|Propane combustion|1:C3H8:g,5:O2:g|3:CO2:g,4:H2O:g|0,1|Assume complete combustion by the equation shown; ignore alternative products.
20|Butane combustion|2:C4H10:g,13:O2:g|8:CO2:g,10:H2O:g|0,1|Assume complete combustion by the equation shown; ignore alternative products.
21|Ethene combustion|1:C2H4:g,3:O2:g|2:CO2:g,2:H2O:g|0,1|Assume complete combustion by the equation shown; ignore alternative products.
22|Acetylene combustion|2:C2H2:g,5:O2:g|4:CO2:g,2:H2O:g|0,1|Assume complete combustion by the equation shown; ignore alternative products.
23|Ethanol combustion|1:C2H5OH:l,3:O2:g|2:CO2:g,3:H2O:g|0,1|Assume complete combustion by the equation shown; ignore alternative products.
24|Methanol combustion|2:CH3OH:l,3:O2:g|2:CO2:g,4:H2O:g|0,1|Assume complete combustion by the equation shown; ignore alternative products.
25|Zinc with hydrochloric acid|1:Zn:s,2:HCl:aq|1:ZnCl2:aq,1:H2:g|1|Dilute acid. Given solution-species masses refer to dissolved solute.
26|Magnesium with hydrochloric acid|1:Mg:s,2:HCl:aq|1:MgCl2:aq,1:H2:g|1|Dilute acid. Given solution-species masses refer to dissolved solute.
27|Iron with hydrochloric acid|1:Fe:s,2:HCl:aq|1:FeCl2:aq,1:H2:g|1|Dilute acid produces iron(II), not iron(III).
28|Zinc displaces copper|1:Zn:s,1:CuSO4:aq|1:ZnSO4:aq,1:Cu:s|1|Aqueous copper(II) sulfate; masses refer to anhydrous solute.
29|Iron displaces copper|1:Fe:s,1:CuSO4:aq|1:FeSO4:aq,1:Cu:s|1|Iron(II) forms. Masses refer to anhydrous solute.
30|Copper displaces silver|1:Cu:s,2:AgNO3:aq|1:Cu(NO3)2:aq,2:Ag:s|1|Aqueous silver nitrate.
31|Aluminum displaces copper|2:Al:s,3:CuCl2:aq|2:AlCl3:aq,3:Cu:s|1|Assume the oxide coating does not prevent the stated reaction.
32|Magnesium displaces zinc|1:Mg:s,1:ZnSO4:aq|1:MgSO4:aq,1:Zn:s|1|Aqueous zinc sulfate; masses refer to anhydrous solute.
33|Zinc displaces silver|1:Zn:s,2:AgNO3:aq|1:Zn(NO3)2:aq,2:Ag:s|1|Aqueous silver nitrate.
34|Magnesium displaces iron|1:Mg:s,1:FeCl2:aq|1:MgCl2:aq,1:Fe:s|1|Aqueous iron(II) chloride.
35|Silver chloride precipitation|1:AgNO3:aq,1:NaCl:aq|1:AgCl:s,1:NaNO3:aq|0|Assume complete precipitation; given masses are masses of dissolved solutes.
36|Barium sulfate precipitation|1:BaCl2:aq,1:Na2SO4:aq|1:BaSO4:s,2:NaCl:aq|0|Assume complete precipitation; given masses are masses of dissolved solutes.
37|Lead(II) iodide precipitation|1:Pb(NO3)2:aq,2:KI:aq|1:PbI2:s,2:KNO3:aq|0|Assume complete precipitation; given masses are masses of dissolved solutes.
38|Iron(III) hydroxide precipitation|1:FeCl3:aq,3:NaOH:aq|1:Fe(OH)3:s,3:NaCl:aq|0|Assume complete precipitation; given masses are masses of dissolved solutes.
39|Calcium carbonate precipitation|1:Ca(NO3)2:aq,1:Na2CO3:aq|1:CaCO3:s,2:NaNO3:aq|0|Assume complete precipitation; given masses are masses of dissolved solutes.
40|Copper(II) hydroxide precipitation|1:CuSO4:aq,2:KOH:aq|1:Cu(OH)2:s,1:K2SO4:aq|0|Assume complete precipitation; given masses are masses of dissolved solutes.
41|Magnesium phosphate precipitation|3:MgCl2:aq,2:Na3PO4:aq|1:Mg3(PO4)2:s,6:NaCl:aq|0|Assume complete precipitation by the equation shown.
42|Silver bromide precipitation|1:AgNO3:aq,1:KBr:aq|1:AgBr:s,1:KNO3:aq|0|Assume complete precipitation; given masses are masses of dissolved solutes.
43|Calcium phosphate precipitation|3:CaCl2:aq,2:Na3PO4:aq|1:Ca3(PO4)2:s,6:NaCl:aq|0|Assume complete precipitation by the equation shown.
44|Magnesium hydroxide precipitation|1:MgSO4:aq,2:KOH:aq|1:Mg(OH)2:s,1:K2SO4:aq|0|Assume complete precipitation; given masses are masses of dissolved solutes.
45|Sodium hydroxide neutralization|1:HCl:aq,1:NaOH:aq|1:NaCl:aq,1:H2O:l|0|Calculate dissolved salt formed, assuming complete neutralization.
46|Potassium hydroxide neutralization|1:HNO3:aq,1:KOH:aq|1:KNO3:aq,1:H2O:l|0|Calculate dissolved salt formed, assuming complete neutralization.
47|Calcium hydroxide neutralization|1:Ca(OH)2:aq,2:HCl:aq|1:CaCl2:aq,2:H2O:l|0|Use dissolved calcium hydroxide; calculate dissolved salt formed.
48|Sodium carbonate with acid|1:Na2CO3:aq,2:HCl:aq|2:NaCl:aq,1:CO2:g,1:H2O:l|1|Complete acid-carbonate reaction; carbon dioxide escapes.
49|Sodium bicarbonate with acid|1:NaHCO3:aq,1:HCl:aq|1:NaCl:aq,1:CO2:g,1:H2O:l|1|Complete acid-bicarbonate reaction; carbon dioxide escapes.
50|Thermite reaction|1:Fe2O3:s,2:Al:s|1:Al2O3:s,2:Fe:l|1|Stoichiometric model of the thermite reaction; iron is molten when formed.
`;
const species=text=>text.split(',').map(s=>{const [coefficient,formula,state]=s.split(':');return {coefficient:Number(coefficient),formula,state};});
export const REACTIONS=rows.trim().split('\n').map(row=>{const [id,name,left,right,targets,conditions]=row.split('|');return {id:Number(id),name,reactants:species(left),products:species(right),targets:targets.split(',').map(Number),conditions};});
export const ATOMIC_MASSES={H:1.008,C:12.01,N:14.01,O:16.00,Na:22.99,Mg:24.31,Al:26.98,P:30.97,S:32.06,Cl:35.45,K:39.10,Ca:40.08,Fe:55.85,Cu:63.55,Zn:65.38,Br:79.90,Ag:107.87,I:126.90,Ba:137.33,Pb:207.2};

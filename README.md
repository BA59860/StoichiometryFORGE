# StoichiometryFORGE

Mass stoichiometry practice for CHMY 121, in the FORGE fire, ice and polished bronze theme.

## Learning and practice

- Three short lessons: mass-to-mass calculations, limiting reactants, and percent yield.
- Fifty fixed, balanced chemical equations with randomized quantities and selected target products.
- Theoretical yield, limiting reactant plus yield, percent yield, and mixed practice.
- Balanced equations supplied, or an optional balance-first step.
- Hints, worked dimensional-analysis solutions, and feedback on common mistakes.
- Dark/light themes, responsive layouts, and keyboard-accessible controls. No Tutor mode.

Amounts are masses in grams. Aqueous species use grams of solute, not grams of total solution; salts use the anhydrous formula shown. One-reactant problems explicitly place other reactants in excess. Two-reactant problems apply only to the 42 two-reactant equations. Combustion, precipitation, and equilibrium examples state their idealized model assumptions.

The generator rounds givens to three significant figures before calculating answers, uses the displayed two-decimal molar masses, and retains precision through the calculation. Actual yields remain below theoretical yield. The numerical checker accepts a 0.5% relative tolerance; it encourages three significant figures without separately grading significant-figure formatting. Limiting reactants are generated with at least 25% molar excess before rounding. Revealed solutions do not count as independently solved.

Only the shared FORGE theme preference is saved locally. Practice progress lasts for the current visit. No login or external service is required.

## Run and validate

Serve this directory with any static web server. GitHub Pages can publish `main` from the repository root. JavaScript modules require HTTP(S), rather than opening the HTML as a local file.

Run `npm test` (or `node validate.mjs`) for bank conservation, independently calculated examples, and generated-problem checks.

## Files

`bank.js` contains the curated reactions and course atomic masses. `engine.js` owns numerical calculations and grading helpers. `views.js` renders lessons and dimensional analysis. `app.js` connects the UI. Theme files use the same system as the other FORGE tutorials.

## Chemistry references

- [OpenStax Chemistry 2e, Reaction Stoichiometry](https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry)
- [OpenStax Chemistry 2e, Reaction Yields](https://openstax.org/books/chemistry-2e/pages/4-4-reaction-yields)

Lesson wording, worked examples, and practice generation were written for this tutorial. Reaction conditions are equation-study context, not laboratory instructions.

#!/bin/env node

const performance = require('perf_hooks').performance;

/*
 * Evaluate a given polynomial "naturally".
 */
//const evaluatePolyExact = (coeffs, x) => coeffs.reduce((acc, cur, idx) => (acc + cur * Math.pow(x, idx)));
const evaluatePolyExact = (coeffs, x) => {
	let xx = 1;
	let ret = 0;
	for(let d=0; d<coeffs.length; d++) {
		ret += coeffs[d] * xx;
		xx *= x;
	}
	return ret;
}

/*
 * Evaluate a given polynomial using the method of differences.
 */
const evaluatePolyDifference = (coeffs, count) => {
	const preCompBegin = performance.now();
	// Compute binomial constants.
	const binomial = [[1]];
	for(let i=1; i<coeffs.length; i++)
		binomial.push((new Array(i+1)).fill().map((emp, j) => ((j==0 ? 0 : binomial[i-1][j-1]) + (j==i ? 0 : binomial[i-1][j]))));
	// Derive the coeffs of the differenciated polynomial.
	const diffOf = (coeffs) => (new Array(coeffs.length-1)).fill().map((u, j) =>
			coeffs.reduce((acc, c, i) => acc + (j>=i ? 0 : (coeffs[i] * binomial[i][j])), 0));
	const diffCoeffs = [coeffs];
	for(let i=1; i<coeffs.length; i++) diffCoeffs.push(diffOf(diffCoeffs[i-1]));
	const preCompEnd = performance.now();
	// Run the method of differences.
	const diffBegin = performance.now();
	const row = diffCoeffs.map((c) => c[0]);
	const values = [];
	for(let x=0; x<count; x++) {
		values.push(row[0]);
		for(let d=0; d<diffCoeffs.length-1; d++) row[d]+=row[d+1];
	}
	const diffEnd = performance.now();
	return [values, preCompEnd-preCompBegin, diffEnd-diffBegin];
};

const main = () => {
	// Read arguments.
	if(process.argv.length < 4) {
		console.log('Usage: node ./evaluatePoly.js X_MAX \'[a_0, .., a_{n-1}]\'');
		process.exit(1);
	}
	const X_MAX = parseInt(process.argv[2]);
	if(X_MAX < 0) {
		console.log('X_MAX should be zero or positive.');
		process.exit(1);
	}
	const COEFFS = JSON.parse(process.argv[3]).map((a) => +a);
	const POLY_STR = COEFFS.reduce((acc, v, i) => acc + (v==0 ? '' : `${v<0 ? '-' : '+'}${Math.abs(v)}x${i==1 ? '' : '^'+i}`))
	console.log(`Computing f(x) = ${POLY_STR} for x = 0 to ${X_MAX}..`);
	// Evaluate the given polynomial.
	const exactBegin = performance.now();
	const exactValues = new Array(X_MAX+1).fill(0).map((v, x) => evaluatePolyExact(COEFFS, x));
	const exactEnd = performance.now();
	// Evaluate the given polynomial with the method of difference.
	const diffValues = evaluatePolyDifference(COEFFS, X_MAX+1);
	// Print out the result.
	let foundUnmatched = false;
	for(let x=0; x<=X_MAX; x++) {
		const ev = exactValues[x];
		const dv = diffValues[0][x];
		const matched = ev==dv ? true : Math.abs(2.0 * (ev-dv) / (ev+dv)) < 0.000001;
		if(!matched) foundUnmatched=true;
		if(!process.env['MEASUREMENT'])
			console.log(`x=${x}, f_exact(x)=${ev}, f_diff(x)=${dv}, ${matched ? 'matched' : 'NOT MATCHED'}`);
	}
	if(foundUnmatched) console.error('E: there is an UNMATCHED result!');
	console.log(`Diff  pre-comp   ${diffValues[1].toFixed(3)}ms.`);
	console.log(`      evaluation ${diffValues[2].toFixed(3)}ms.`);
	console.log(`      total      ${(diffValues[1]+diffValues[2]).toFixed(3)}ms.`);
	console.log(`Exact total      ${(exactEnd-exactBegin).toFixed(3)}ms.`);
	if(process.env['MEASUREMENT'])
		console.log(`${X_MAX} ${COEFFS.length} ${diffValues[1]} ${diffValues[2]} ${exactEnd-exactBegin}`);
};

main();


Method of Differences Demo
==========================

This repo contains a working code which evaluates a series of values which is the substitution of `x = 0, 1, ..., STEPS` for a given polynomial `f(x) := a_0 + a_1x + a_2x^2 + ... + a_{n-1}x^{n-1}` using a method of differences.

Usage
-----

Clone the repo. and prepare Node.js environment.

Then, run the following command:
```bash
$ node ./evaluatePoly.js 100 '[1, -1, 2]'
```

The first argument `X_MAX` is the maximum number of `x` (`x = 0, ..., X_MAX` will be evaluated), and the second argument `[a_0, a_1, ..., a_{n-1}]` specifis the coefficients of a polynomial to be evaluated.




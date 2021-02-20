
all: deg5.png

clean:
	rm -rf *.dat *.png

deg5.png: deg5.dat
	echo \
		'set terminal pngcairo size 1920, 1080;' \
		'set out "$@";' \
		'set tics font "VL P Gothic,50";' \
		'set lmargin 30;' \
		'set rmargin 12;' \
		'set tmargin 3;' \
		'set bmargin 10;' \
		'set key font "VL P Gothic,50";' \
		'set key left top reverse Left width -10;' \
		'set xlabel font "VL P Gothic,50";' \
		'set xlabel "x_{MAX}";' \
		'set xlabel offset 0,-5;' \
		'set xtics 0, 200000, 1000000;' \
		'set xtics offset 0, -2;' \
		'set ylabel font "VL P Gothic,50";' \
		'set ylabel "実行時間 (ms)";' \
		'set ylabel offset -15,0;' \
		'plot "$<" using 1:($$3+$$4) with linespoints ps 5 ti "階差法",' \
		'     "$<" using 1:5         with linespoints ps 5 ti "安直法";' \
	| gnuplot

deg5.dat:
	rm -f $@
	MEASUREMENT=1 node ./evaluatePoly         1 '[1, -2, 1, -2, 1]' | tail -n1 >>$@
	MEASUREMENT=1 node ./evaluatePoly        10 '[1, -2, 1, -2, 1]' | tail -n1 >>$@
	MEASUREMENT=1 node ./evaluatePoly       100 '[1, -2, 1, -2, 1]' | tail -n1 >>$@
	MEASUREMENT=1 node ./evaluatePoly      1000 '[1, -2, 1, -2, 1]' | tail -n1 >>$@
	MEASUREMENT=1 node ./evaluatePoly     10000 '[1, -2, 1, -2, 1]' | tail -n1 >>$@
	MEASUREMENT=1 node ./evaluatePoly    100000 '[1, -2, 1, -2, 1]' | tail -n1 >>$@
	MEASUREMENT=1 node ./evaluatePoly    200000 '[1, -2, 1, -2, 1]' | tail -n1 >>$@
	MEASUREMENT=1 node ./evaluatePoly    300000 '[1, -2, 1, -2, 1]' | tail -n1 >>$@
	MEASUREMENT=1 node ./evaluatePoly    400000 '[1, -2, 1, -2, 1]' | tail -n1 >>$@
	MEASUREMENT=1 node ./evaluatePoly    500000 '[1, -2, 1, -2, 1]' | tail -n1 >>$@
	MEASUREMENT=1 node ./evaluatePoly    600000 '[1, -2, 1, -2, 1]' | tail -n1 >>$@
	MEASUREMENT=1 node ./evaluatePoly    700000 '[1, -2, 1, -2, 1]' | tail -n1 >>$@
	MEASUREMENT=1 node ./evaluatePoly    800000 '[1, -2, 1, -2, 1]' | tail -n1 >>$@
	MEASUREMENT=1 node ./evaluatePoly    900000 '[1, -2, 1, -2, 1]' | tail -n1 >>$@
	MEASUREMENT=1 node ./evaluatePoly   1000000 '[1, -2, 1, -2, 1]' | tail -n1 >>$@




.DEFAULT: clean build
.PHONY: clean distclean

build: \
	setup \
	gosquared-min.js \


clean:
	rm -f gosquared-min.js

distclean: clean
	rm -f compiler.jar

gosquared-min.js: gosquared.js

setup: \
	compiler.jar \

compiler.jar:
	wget -O- http://closure-compiler.googlecode.com/files/compiler-latest.tar.gz | tar -xz compiler.jar

gosquared-min.js:
	java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS < $< > $@
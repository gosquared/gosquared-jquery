.DEFAULT: clean build
.PHONY: clean distclean

build: \
	setup \
	gosquared-min.js \


clean:
	rm -f gosquared-min.js

distclean: clean
	rm -f lib/compiler.jar lib/jquery-1.8-extern.js

gosquared-min.js: gosquared.js

setup: \
	lib/jquery-1.8-extern.js \
	lib/compiler.jar \

lib/jquery-1.8-extern.js:
	wget -O $@ http://closure-compiler.googlecode.com/svn/trunk/contrib/externs/jquery-1.8.js

lib/compiler.jar:
	wget -O- http://closure-compiler.googlecode.com/files/compiler-latest.tar.gz | tar -xz -C lib compiler.jar

gosquared-min.js:
	java -jar lib/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --externs lib/jquery-1.8-extern.js < $< > $@
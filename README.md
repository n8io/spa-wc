# spa-wc
A simple single page app using Angular and Polymer.

### To build:

1. `npm install`

If you want...
 * Expanded (unmin'd) resources: `grunt dev`
 * Minified resources: `grunt`

### To run:
2. `node src/server/app.js`


### What is grunt doing?
1.  Remove old output
2.  Compile Jade to Html in output
3.  Copy statics to output ./statics dir
4.  Copy hydrated js to output with .min.js ext
5.  Compile Stylus to Css in output ./css dir
6.  Concatenate all global angular scripts into ng.min.js in output ./js/ng dir
7.  Concatenate all polymer html into .min.html in output ./polymer-elements dir
8.  Vulcanize (split) polymer-elements html out into html & script files
9.  Update nocache reference to polymer js in polymer html 
10. Wrap polymer js in IIFE
11. JSHint output js
12. Run ngAnnotate to minsafe angular dependencies
13. Build out preload script for angular templates
14. Uglify angular js
15. Uglify polymer js
16. Prettify markup in output html
17. Remove extra angular js and polymer html


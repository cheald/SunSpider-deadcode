About
-----

This is a modified fork of the SunSpider test suite, for the purpose of prodding at IE9's dead code analysis.

See http://news.ycombinator.com/item?id=1913102 for information.

Running it
----------

* Modify tests/sunspider-0.9.1-deadcode/math-cordic.js to your heart's content
* Run ./make-hosted
* Open hosted/versions.html in your browser and select the benchmark to run.

Note that Chrome aggressively caches the JS files; I recommend using a new private browsing session per run to ensure that the new JS is loaded properly. 

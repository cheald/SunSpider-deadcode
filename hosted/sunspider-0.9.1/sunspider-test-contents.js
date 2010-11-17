var testContents = [ "<!DOCTYPE html>\n\
<head>\n\
\n\
<meta charset=utf8>\n\
\n\
<!--\n\
 Copyright (C) 2007 Apple Inc.  All rights reserved.\n\
\n\
 Redistribution and use in source and binary forms, with or without\n\
 modification, are permitted provided that the following conditions\n\
 are met:\n\
 1. Redistributions of source code must retain the above copyright\n\
    notice, this list of conditions and the following disclaimer.\n\
 2. Redistributions in binary form must reproduce the above copyright\n\
    notice, this list of conditions and the following disclaimer in the\n\
    documentation and/or other materials provided with the distribution.\n\
\n\
 THIS SOFTWARE IS PROVIDED BY APPLE COMPUTER, INC. ``AS IS'' AND ANY\n\
 EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n\
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n\
 PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE COMPUTER, INC. OR\n\
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,\n\
 EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n\
 PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n\
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY\n\
 OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n\
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n\
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. \n\
-->\n\
\n\
<title>SunSpider math-cordic</title>\n\
<link rel=\"stylesheet\" href=\"../sunspider.css\">\n\
</head>\n\
\n\
<body>\n\
<h3>math-cordic</h3>\n\
<div id=\"console\">\n\
</div>\n\
<script>\n\
function record(time) {\n\
    document.getElementById(\"console\").innerHTML = time + \"ms\";\n\
    if (window.parent) {\n\
        parent.recordResult(time);\n\
    }\n\
}\n\
\n\
var _sunSpiderStartDate = new Date();\n\
\n\
/*\n\
 * Copyright (C) Rich Moore.  All rights reserved.\n\
 *\n\
 * Redistribution and use in source and binary forms, with or without\n\
 * modification, are permitted provided that the following conditions\n\
 * are met:\n\
 * 1. Redistributions of source code must retain the above copyright\n\
 *    notice, this list of conditions and the following disclaimer.\n\
 * 2. Redistributions in binary form must reproduce the above copyright\n\
 *    notice, this list of conditions and the following disclaimer in the\n\
 *    documentation and/or other materials provided with the distribution.\n\
 *\n\
 * THIS SOFTWARE IS PROVIDED BY CONTRIBUTORS ``AS IS'' AND ANY\n\
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n\
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n\
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE COMPUTER, INC. OR\n\
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,\n\
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n\
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n\
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY\n\
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n\
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n\
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. \n\
 */\n\
\n\
/////. Start CORDIC\n\
\n\
var AG_CONST = 0.6072529350;\n\
\n\
function FIXED(X)\n\
{\n\
  return X * 65536.0;\n\
}\n\
\n\
function FLOAT(X)\n\
{\n\
  return X / 65536.0;\n\
}\n\
\n\
function DEG2RAD(X)\n\
{\n\
  return 0.017453 * (X);\n\
}\n\
\n\
var Angles = [\n\
  FIXED(45.0), FIXED(26.565), FIXED(14.0362), FIXED(7.12502),\n\
  FIXED(3.57633), FIXED(1.78991), FIXED(0.895174), FIXED(0.447614),\n\
  FIXED(0.223811), FIXED(0.111906), FIXED(0.055953),\n\
  FIXED(0.027977) \n\
              ];\n\
\n\
\n\
function cordicsincos() {\n\
    var X;\n\
    var Y;\n\
    var TargetAngle;\n\
    var CurrAngle;\n\
    var Step;\n\
 \n\
    X = FIXED(AG_CONST);         /* AG_CONST * cos(0) */\n\
    Y = 0;                       /* AG_CONST * sin(0) */\n\
\n\
    TargetAngle = FIXED(28.027);\n\
    CurrAngle = 0;\n\
    for (Step = 0; Step < 12; Step++) {\n\
        var NewX;\n\
        if (TargetAngle > CurrAngle) {\n\
            NewX = X - (Y >> Step);\n\
            Y = (X >> Step) + Y;\n\
            X = NewX;\n\
            CurrAngle += Angles[Step];\n\
        } else {\n\
            NewX = X + (Y >> Step);\n\
            Y = -(X >> Step) + Y;\n\
            X = NewX;\n\
            CurrAngle -= Angles[Step];\n\
        }\n\
    }\n\
}\n\
\n\
///// End CORDIC\n\
\n\
function cordic( runs ) {\n\
  var start = new Date();\n\
\n\
  for ( var i = 0 ; i < runs ; i++ ) {\n\
      cordicsincos();\n\
  }\n\
\n\
  var end = new Date();\n\
\n\
  return end.getTime() - start.getTime();\n\
}\n\
\n\
cordic(250000);\n\
\n\
\n\
var _sunSpiderInterval = new Date() - _sunSpiderStartDate;\n\
\n\
record(_sunSpiderInterval);\n\
</script>\n\
\n\
\n\
</body>\n\
</html>\n\
" ];

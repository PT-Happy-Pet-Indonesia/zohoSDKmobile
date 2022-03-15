//$Id$
"use strict";
if (!window.ZSEC) {
    Object.defineProperty(window, "ZSEC", {
        value: {},
        writable: false,
        configurable: false,
        enumerable: false
    })
}
Object.defineProperty(ZSEC, "util", {
    value: {},
    writable: false,
    configurable: false,
    enumerable: false
});
(function() {
    if (!Object.defineProperty || !(function() {
            try {
                Object.defineProperty({}, "x", {});
                return true
            } catch (B) {
                return false
            }
        }())) {
        var A = Object.defineProperty;
        Object.defineProperty = function(D, E, C) {
            if (A) {
                try {
                    return A(D, E, C)
                } catch (B) {}
            }
            if (D !== Object(D)) {
                throw TypeError("Object.defineProperty called on non-object")
            }
            if (Object.prototype.__defineGetter__ && ("get" in C)) {
                Object.prototype.__defineGetter__.call(D, E, C.get)
            }
            if (Object.prototype.__defineSetter__ && ("set" in C)) {
                Object.prototype.__defineSetter__.call(D, E, C.set)
            }
            if ("value" in C) {
                D[E] = C.value
            }
            return D
        }
    }
}());
ZSEC.util.defineProperty = function ZSECDefineProperty(F, E, D, C, A, B, G) {
    if (!C && E in F) {
        return
    }
    A = A == true;
    B = B == true;
    G = G == true;
    return Object.defineProperty(F, E, {
        value: D,
        writable: A,
        configurable: B,
        enumerable: G
    })
};
ZSEC.util.defineProperty(ZSEC, "version", "4.0", true);
ZSEC.util.defineProperty(ZSEC, "constants", ZSEC.constants || {}, true);
ZSEC.util.ArrayIndexOf = Array.prototype.indexOf;
if (!ZSEC.util.ArrayIndexOf) {
    ZSEC.util.ArrayIndexOf = function(C) {
        if (this === void 0 || this === null) {
            throw TypeError()
        }
        var D = Object(this);
        var A = D.length >>> 0;
        if (A === 0) {
            return -1
        }
        var E = 0;
        if (arguments.length > 0) {
            E = Number(arguments[1]);
            if (isNaN(E)) {
                E = 0
            } else {
                if (E !== 0 && E !== (1 / 0) && E !== -(1 / 0)) {
                    E = (E > 0 || -1) * Math.floor(Math.abs(E))
                }
            }
        }
        if (E >= A) {
            return -1
        }
        var B = E >= 0 ? E : Math.max(A - Math.abs(E), 0);
        for (; B < A; B++) {
            if (B in D && D.charAt(B) === C) {
                return B
            }
        }
        return -1
    }
}
if (!String.prototype.codePointAt) {
    var codePointAt = function(A) {
        if (this == null) {
            throw TypeError()
        }
        var D = String(this);
        var E = D.length;
        var C = A ? Number(A) : 0;
        if (C != C) {
            C = 0
        }
        if (C < 0 || C >= E) {
            return undefined
        }
        var F = D.charCodeAt(C);
        var B;
        if (F >= 55296 && F <= 56319 && E > C + 1) {
            B = D.charCodeAt(C + 1);
            if (B >= 56320 && B <= 57343) {
                return (F - 55296) * 1024 + B - 56320 + 65536
            }
        }
        return F
    };
    ZSEC.util.defineProperty(String.prototype, "codePointAt", codePointAt, false)
} else {
    ZSEC.util.defineProperty(String.prototype, "codePointAt", String.prototype.codePointAt, true)
}
if (!String.fromCodePoint) {
    var stringFromCharCode = String.fromCharCode;
    var floor = Math.floor;
    var fromCodePoint = function() {
        var H = 16384;
        var D = [];
        var G;
        var F;
        var C = -1;
        var E = arguments.length;
        if (!E) {
            return ""
        }
        var A = "";
        while (++C < E) {
            var B = Number(arguments[C]);
            if (!isFinite(B) || B < 0 || B > 1114111 || floor(B) != B) {
                throw RangeError("Invalid code point: " + B)
            }
            if (B <= 65535) {
                D.push(B)
            } else {
                B -= 65536;
                G = (B >> 10) + 55296;
                F = (B % 1024) + 56320;
                D.push(G, F)
            }
            if (C + 1 == E || D.length > H) {
                A += stringFromCharCode.apply(null, D);
                D.length = 0
            }
        }
        return A
    };
    ZSEC.util.defineProperty(String, "fromCodePoint", fromCodePoint, false)
} else {
    ZSEC.util.defineProperty(String, "fromCodePoint", String.fromCodePoint, true)
}(function() {
    var A = {
        log: function(B) {
            if (navigator && navigator.userAgent) {
                var D = navigator.userAgent;
                var C = D.match(/opera|chrome|safari|firefox|msie|trident(?=\/)/i);
                if (C && C[0].search(/trident|msie/i) < 0) {
                    window.console.log("%cSTOP!", "color:red;font-size:xx-large;font-weight:bold;");
                    window.console.log("%cThis is a browser feature intended for developers. Do not enter or paste code which you don't understand. It may allow attackers to steal your information or impersonate you.\nSee https://en.wikipedia.org/wiki/Self-XSS for more details", "font-size:large;");
                    return
                }
            }
            window.console.log("STOP!\nThis is a browser feature intended for developers. Do not enter or paste code which you don't understand. It may allow attackers to steal your information or impersonate you.\nSee https://en.wikipedia.org/wiki/Self-XSS for more details")
        }
    };
    ZSEC.util.defineProperty(ZSEC, "Console", A, true, false, false, true)
})();
ZSEC.Console.log();
(function(B) {
    var F = {};
    var C = "34=&quot|38=&amp|60=&lt|62=&gt|160=&nbsp|161=&iexcl|162=&cent|163=&pound|164=&curren|165=&yen|166=&brvbar|167=&sect|168=&uml|169=&copy|170=&ordf|171=&laquo|172=&not|173=&shy|174=&reg|175=&macr|176=&deg|177=&plusmn|178=&sup2|179=&sup3|180=&acute|181=&micro|182=&para|183=&middot|184=&cedil|185=&sup1|186=&ordm|187=&raquo|188=&frac14|189=&frac12|190=&frac34|191=&iquest|192=&Agrave|193=&Aacute|194=&Acirc|195=&Atilde|196=&Auml|197=&Aring|198=&AElig|199=&Ccedil|200=&Egrave|201=&Eacute|202=&Ecirc|203=&Euml|204=&Igrave|205=&Iacute|206=&Icirc|207=&Iuml|208=&ETH|209=&Ntilde|210=&Ograve|211=&Oacute|212=&Ocirc|213=&Otilde|214=&Ouml|215=&times|216=&Oslash|217=&Ugrave|218=&Uacute|219=&Ucirc|220=&Uuml|221=&Yacute|222=&THORN|223=&szlig|224=&agrave|225=&aacute|226=&acirc|227=&atilde|228=&auml|229=&aring|230=&aelig|231=&ccedil|232=&egrave|233=&eacute|234=&ecirc|235=&euml|236=&igrave|237=&iacute|238=&icirc|239=&iuml|240=&eth|241=&ntilde|242=&ograve|243=&oacute|244=&ocirc|245=&otilde|246=&ouml|247=&divide|248=&oslash|249=&ugrave|250=&uacute|251=&ucirc|252=&uuml|253=&yacute|254=&thorn|255=&yuml|338=&OElig|339=&oelig|352=&Scaron|353=&scaron|376=&Yuml|402=&fnof|710=&circ|732=&tilde|913=&Alpha|914=&Beta|915=&Gamma|916=&Delta|917=&Epsilon|918=&Zeta|919=&Eta|920=&Theta|921=&Iota|922=&Kappa|923=&Lambda|924=&Mu|925=&Nu|926=&Xi|927=&Omicron|928=&Pi|929=&Rho|931=&Sigma|932=&Tau|933=&Upsilon|934=&Phi|935=&Chi|936=&Psi|937=&Omega|945=&alpha|946=&beta|947=&gamma|948=&delta|949=&epsilon|950=&zeta|951=&eta|952=&theta|953=&iota|954=&kappa|955=&lambda|956=&mu|957=&nu|958=&xi|959=&omicron|960=&pi|961=&rho|962=&sigmaf|963=&sigma|964=&tau|965=&upsilon|966=&phi|967=&chi|968=&psi|969=&omega|977=&thetasym|978=&upsih|982=&piv|8194=&ensp|8195=&emsp|8201=&thinsp|8204=&zwnj|8205=&zwj|8206=&lrm|8207=&rlm|8211=&ndash|8212=&mdash|8216=&lsquo|8217=&rsquo|8218=&sbquo|8220=&ldquo|8221=&rdquo|8222=&bdquo|8224=&dagger|8225=&Dagger|8226=&bull|8230=&hellip|8240=&permil|8242=&prime|8243=&Prime|8249=&lsaquo|8250=&rsaquo|8254=&oline|8260=&frasl|8364=&euro|8465=&image|8472=&weierp|8476=&real|8482=&trade|8501=&alefsym|8592=&larr|8593=&uarr|8594=&rarr|8595=&darr|8596=&harr|8629=&crarr|8656=&lArr|8657=&uArr|8658=&rArr|8659=&dArr|8660=&hArr|8704=&forall|8706=&part|8707=&exist|8709=&empty|8711=&nabla|8712=&isin|8713=&notin|8715=&ni|8719=&prod|8721=&sum|8722=&minus|8727=&lowast|8730=&radic|8733=&prop|8734=&infin|8736=&ang|8743=&and|8744=&or|8745=&cap|8746=&cup|8747=&int|8756=&there4|8764=&sim|8773=&cong|8776=&asymp|8800=&ne|8801=&equiv|8804=&le|8805=&ge|8834=&sub|8835=&sup|8836=&nsub|8838=&sube|8839=&supe|8853=&oplus|8855=&otimes|8869=&perp|8901=&sdot|8968=&lceil|8969=&rceil|8970=&lfloor|8971=&rfloor|10216=&lang|10217=&rang|9674=&loz|9824=&spades|9827=&clubs|9829=&hearts|9830=&diams";
    C = C.split("|");
    for (var D = 0; D < C.length; D++) {
        var E = C[D].split("=");
        F[E[0]] = E[1]
    }
    var A = {
        characterToEntityMap: F,
        IMMUNE_HTML: new Array(",", ".", "-", "_", " "),
        IMMUNE_HTMLATTR: new Array(",", ".", "-", "_"),
        IMMUNE_CSS: new Array(),
        IMMUNE_JAVASCRIPT: new Array(",", ".", "_")
    };
    ZSEC.util.defineProperty(ZSEC, "Encoder", B(A), true, false, false, true)
}(function encoder(C) {
    var G = {};
    var B = C.characterToEntityMap;
    var D = [];
    for (var M = 0; M < 255; M++) {
        if (M >= 48 && M <= 57 || M >= 65 && M <= 90 || M >= 97 && M <= 122) {
            D[M] = null
        } else {
            D[M] = M.toString(16)
        }
    }
    var I = function(O) {
        if (O < 256) {
            return D[O]
        }
        return O.toString(16)
    };
    var H = function(P, R) {
        if (ZSEC.util.ArrayIndexOf.call(P, R) != -1) {
            return String.fromCodePoint(R)
        }
        var Q = I(R);
        if (Q == null) {
            return String.fromCodePoint(R)
        }
        if ((R <= 31 && R != "\t" && R != "\n" && R != "\r") || (R >= 127 && R <= 159) || R == " ") {
            return " "
        }
        var O = B[R];
        if (O != null) {
            return O + ";"
        }
        return "&#x" + Q + ";"
    };
    var J = function(P, S) {
        if (ZSEC.util.ArrayIndexOf.call(P, S) != -1) {
            return String.fromCharCode(S)
        }
        var Q = I(S);
        if (Q == null) {
            return String.fromCharCode(S)
        }
        var O = S.toString(16);
        if (S < 256) {
            var R = "00".substr(O.length);
            return "\\x" + R + O.toUpperCase()
        }
        R = "0000".substr(O.length);
        return "\\u" + R + O.toUpperCase()
    };
    var F = function(O, Q) {
        if (ZSEC.util.ArrayIndexOf.call(O, Q) != -1) {
            return String.fromCodePoint(Q)
        }
        var P = I(Q);
        if (P == null) {
            return String.fromCodePoint(Q)
        }
        return "\\" + P + " "
    };

    function L(S, T, O, P) {
        if (T == null || T == undefined || "string" != typeof T) {
            return T
        }
        var Q = "";
        for (var R = 0; R < T.length; R++) {
            if (P) {
                var U = T.codePointAt(R);
                Q += O(S, U, P);
                if (U > 65535) {
                    R++
                }
            } else {
                Q += O(S, T.charCodeAt(R))
            }
        }
        return Q
    }
    G.encodeForHTML = function K(O) {
        return L(C.IMMUNE_HTML, O, H, true)
    };
    G.encodeForHTMLAttribute = function A(O) {
        return L(C.IMMUNE_HTMLATTR, O, H, true)
    };
    G.encodeForJavaScript = function N(O) {
        return L(C.IMMUNE_JAVASCRIPT, O, J, false)
    };
    G.encodeForCSS = function E(O) {
        return L(C.IMMUNE_CSS, O, F, true)
    };
    if (Object.freeze) {
        Object.freeze(G)
    }
    return G
}));
(function(B) {
    var A = typeof window === "undefined" ? null : window;
    A.DOMPurify = B(A)
}(function factory(x) {
    var p = function(AK) {
        return factory(AK)
    };
    p.version = "0.8.5";
    p.removed = [];
    if (!x || !x.document || x.document.nodeType !== 9) {
        p.isSupported = false;
        return p
    }
    var F = x.document;
    var i = F;
    var I = x.DocumentFragment;
    var r = x.HTMLTemplateElement;
    var d = x.Node;
    var s = x.NodeFilter;
    var t = x.NamedNodeMap || x.MozNamedAttrMap;
    var a = x.Text;
    var j = x.Comment;
    var Z = x.DOMParser;
    if (typeof r === "function") {
        var G = F.createElement("template");
        if (G.content && G.content.ownerDocument) {
            F = G.content.ownerDocument
        }
    }
    var e = F.implementation;
    var O = F.createNodeIterator;
    var f = F.getElementsByTagName;
    var c = F.createDocumentFragment;
    var AC = i.importNode;
    var H = {};
    p.isSupported = typeof e.createHTMLDocument !== "undefined" && F.documentMode !== 9;
    var v = function(AM, AL) {
        var AK = AL.length;
        while (AK--) {
            if (typeof AL[AK] === "string") {
                AL[AK] = AL[AK].toLowerCase()
            }
            AM[AL[AK]] = true
        }
        return AM
    };
    var AF = function(AK) {
        var AL = {};
        var AM;
        for (AM in AK) {
            if (AK.hasOwnProperty(AM)) {
                AL[AM] = AK[AM]
            }
        }
        return AL
    };
    var n = null;
    var z = v({}, []);
    var Y = null;
    var k = v({}, []);
    var R = null;
    var C = null;
    var T = true;
    var P = true;
    var K = false;
    var AJ = false;
    var AI = false;
    var W = /\{\{[\s\S]*|[\s\S]*\}\}/gm;
    var AB = /<%[\s\S]*|[\s\S]*%>/gm;
    var m = false;
    var N = true;
    var q = false;
    var w = false;
    var B = false;
    var Q = true;
    var E = true;
    var o = v({}, ["audio", "head", "math", "script", "svg", "video", "style"]);
    var y = v({}, ["audio", "video", "img", "source", "image"]);
    var J = v({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "summary", "title", "value", "style", "xmlns"]);
    var U = null;
    var AH = F.createElement("form");
    var S = function(AK) {
        if (typeof AK !== "object") {
            AK = {}
        }
        n = "ALLOWED_TAGS" in AK ? v({}, AK.ALLOWED_TAGS) : z;
        Y = "ALLOWED_ATTR" in AK ? v({}, AK.ALLOWED_ATTR) : k;
        R = "FORBID_TAGS" in AK ? v({}, AK.FORBID_TAGS) : {};
        C = "FORBID_ATTR" in AK ? v({}, AK.FORBID_ATTR) : {};
        T = AK.ALLOW_ARIA_ATTR !== false;
        P = AK.ALLOW_DATA_ATTR !== false;
        K = AK.ALLOW_UNKNOWN_PROTOCOLS || false;
        AJ = AK.SAFE_FOR_JQUERY || false;
        AI = AK.SAFE_FOR_TEMPLATES || false;
        m = AK.WHOLE_DOCUMENT || false;
        q = AK.RETURN_DOM || false;
        w = AK.RETURN_DOM_FRAGMENT || false;
        B = AK.RETURN_DOM_IMPORT || false;
        N = AK.FORCE_BODY !== false;
        Q = AK.SANITIZE_DOM !== false;
        E = AK.KEEP_CONTENT !== false;
        if (AI) {
            P = false
        }
        if (w) {
            q = true
        }
        if (AK.ADD_URI_SAFE_ATTR) {
            v(J, AK.ADD_URI_SAFE_ATTR)
        }
        if (E) {
            n["#text"] = true
        }
        if (Object && "freeze" in Object) {
            Object.freeze(AK)
        }
        U = AK
    };
    var X = function(AK) {
        p.removed.push({
            element: AK
        });
        try {
            AK.parentNode.removeChild(AK)
        } catch (AL) {
            AK.outerHTML = ""
        }
    };
    var V = function(AK, AL) {
        p.removed.push({
            attribute: AL.getAttributeNode(AK),
            from: AL
        });
        AL.removeAttribute(AK)
    };
    var D = function(AL) {
        var AN, AK;
        if (N) {
            AL = "<remove></remove>" + AL
        }
        try {
            AN = new Z().parseFromString(AL, "text/html")
        } catch (AM) {}
        if (!AN || !AN.documentElement) {
            AN = e.createHTMLDocument("");
            AK = AN.body;
            AK.parentNode.removeChild(AK.parentNode.firstElementChild);
            AK.outerHTML = AL
        }
        if (typeof AN.getElementsByTagName === "function") {
            return AN.getElementsByTagName(m ? "html" : "body")[0]
        }
        return f.call(AN, m ? "html" : "body")[0]
    };
    var A = function(AK) {
        return O.call(AK.ownerDocument || AK, AK, s.SHOW_ELEMENT | s.SHOW_COMMENT | s.SHOW_TEXT, function() {
            return s.FILTER_ACCEPT
        }, false)
    };
    var M = function(AK) {
        if (AK instanceof a || AK instanceof j) {
            return false
        }
        if (typeof AK.nodeName !== "string" || typeof AK.textContent !== "string" || typeof AK.removeChild !== "function" || !(AK.attributes instanceof t) || typeof AK.removeAttribute !== "function" || typeof AK.setAttribute !== "function") {
            return true
        }
        return false
    };
    var b = function(AK) {
        return (typeof d === "object" ? AK instanceof d : AK && typeof AK === "object" && typeof AK.nodeType === "number" && typeof AK.nodeName === "string")
    };
    var AG = function(AL) {
        var AK, AM;
        AD("beforeSanitizeElements", AL, null);
        if (M(AL)) {
            X(AL);
            return true
        }
        AK = AL.nodeName.toLowerCase();
        AD("uponSanitizeElement", AL, {
            tagName: AK,
            allowedTags: n
        });
        if (!n[AK] || R[AK]) {
            if (E && !o[AK] && typeof AL.insertAdjacentHTML === "function") {
                try {
                    AL.insertAdjacentHTML("AfterEnd", AL.innerHTML)
                } catch (AN) {}
            }
            X(AL);
            return true
        }
        if (AK != "style") {
            if (AJ && !AL.firstElementChild && (!AL.content || !AL.content.firstElementChild) && /</g.test(AL.textContent)) {
                p.removed.push({
                    element: AL.cloneNode()
                });
                AL.innerHTML = AL.textContent.replace(/</g, "&lt;")
            }
            if (AI && AL.nodeType === 3) {
                AM = AL.textContent;
                AM = AM.replace(W, " ");
                AM = AM.replace(AB, " ");
                if (AL.textContent !== AM) {
                    p.removed.push({
                        element: AL.cloneNode()
                    });
                    AL.textContent = AM
                }
            }
        } else {
            if (AJ && !AL.firstElementChild && (!AL.content || !AL.content.firstElementChild) && /</g.test(AL.textContent)) {
                p.removed.push({
                    element: AL.cloneNode()
                });
                AL.innerHTML = AL.textContent.replace(/</g, "\\3c ")
            }
        }
        AD("afterSanitizeElements", AL, null);
        return false
    };
    var h = /^data-[-\w.\u00B7-\uFFFF]/;
    var g = /^aria-[-\w]+$/;
    var L = /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.:-]|$))/i;
    var l = /^(?:\w+script|data):/i;
    var AE = /[\x00-\x20\xA0\u1680\u180E\u2000-\u2029\u205f\u3000]/g;
    var u = function(AL) {
        var AQ, AK, AR, AU, AO, AN, AS, AM;
        AD("beforeSanitizeAttributes", AL, null);
        AN = AL.attributes;
        if (!AN) {
            return
        }
        AS = {
            attrName: "",
            attrValue: "",
            keepAttr: true,
            allowedAttributes: Y
        };
        AM = AN.length;
        while (AM--) {
            AQ = AN[AM];
            AK = AQ.name;
            AR = AQ.value.trim();
            AU = AK.toLowerCase();
            AS.attrName = AU;
            AS.attrValue = AR;
            AS.keepAttr = true;
            AD("uponSanitizeAttribute", AL, AS);
            AR = AS.attrValue;
            if (AU === "name" && AL.nodeName === "IMG" && AN.id) {
                AO = AN.id;
                AN = Array.prototype.slice.apply(AN);
                V("id", AL);
                V(AK, AL);
                if (AN.indexOf(AO) > AM) {
                    AL.setAttribute("id", AO.value)
                }
            } else {
                if (AK === "id") {
                    AL.setAttribute(AK, "")
                }
                V(AK, AL)
            }
            if (!AS.keepAttr) {
                continue
            }
            if (Q && (AU === "id" || AU === "name") && (AR in x || AR in F || AR in AH)) {
                continue
            }
            if (AI) {
                AR = AR.replace(W, " ");
                AR = AR.replace(AB, " ")
            }
            var AT = false;
            if (P && h.test(AU)) {
                AT = true
            } else {
                if (T && g.test(AU)) {
                    AT = true
                } else {
                    if (!Y[AU] || C[AU]) {
                        continue
                    } else {
                        if (J[AU]) {
                            AT = true
                        } else {
                            if (L.test(AR.replace(AE, ""))) {
                                AT = true
                            } else {
                                if ((AU === "src" || AU === "xlink:href") && AR.indexOf("data:") === 0 && y[AL.nodeName.toLowerCase()]) {
                                    AT = true
                                } else {
                                    if (K && !l.test(AR.replace(AE, ""))) {
                                        AT = true
                                    } else {
                                        if (!AR) {
                                            AT = true
                                        } else {
                                            continue
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            try {
                AL.setAttribute(AK, AR);
                p.removed.pop()
            } catch (AP) {}
        }
        AD("afterSanitizeAttributes", AL, null)
    };
    var AA = function(AK) {
        var AM;
        var AL = A(AK);
        AD("beforeSanitizeShadowDOM", AK, null);
        while ((AM = AL.nextNode())) {
            AD("uponSanitizeShadowNode", AM, null);
            if (AG(AM)) {
                continue
            }
            if (AM.content instanceof I) {
                AA(AM.content)
            }
            u(AM)
        }
        AD("afterSanitizeShadowDOM", AK, null)
    };
    var AD = function(AM, AK, AL) {
        if (!H[AM]) {
            return
        }
        H[AM].forEach(function(AN) {
            AN.call(p, AK, AL, U)
        })
    };
    p.sanitize = function(AP, AL) {
        var AK, AO, AN, AR, AQ, AM;
        if (!AP) {
            AP = "<!-->"
        }
        if (typeof AP !== "string" && !b(AP)) {
            if (typeof AP.toString !== "function") {
                throw new TypeError("toString is not a function")
            } else {
                AP = AP.toString()
            }
        }
        if (!p.isSupported) {
            if (typeof x.toStaticHTML === "object" || typeof x.toStaticHTML === "function") {
                if (typeof AP === "string") {
                    return x.toStaticHTML(AP)
                } else {
                    if (b(AP)) {
                        return x.toStaticHTML(AP.outerHTML)
                    }
                }
            }
            return AP
        }
        S(AL);
        p.removed = [];
        if (AP instanceof d) {
            AK = D("<!-->");
            AO = AK.ownerDocument.importNode(AP, true);
            if (AO.nodeType === 1 && AO.nodeName === "BODY") {
                AK = AO
            } else {
                AK.appendChild(AO)
            }
        } else {
            if (!q && !m && AP.indexOf("<") === -1) {
                return AP
            }
            AK = D(AP);
            if (!AK) {
                return q ? null : ""
            }
        }
        if (N) {
            X(AK.firstChild)
        }
        AQ = A(AK);
        while ((AN = AQ.nextNode())) {
            if (AN.nodeType === 3 && AN === AR) {
                continue
            }
            if (AG(AN)) {
                continue
            }
            if (AN.content instanceof I) {
                AA(AN.content)
            }
            u(AN);
            AR = AN
        }
        if (q) {
            if (w) {
                AM = c.call(AK.ownerDocument);
                while (AK.firstChild) {
                    AM.appendChild(AK.firstChild)
                }
            } else {
                AM = AK
            }
            if (B) {
                AM = AC.call(i, AM, true)
            }
            return AM
        }
        return m ? AK.outerHTML : AK.innerHTML
    };
    p.addHook = function(AL, AK) {
        if (typeof AK !== "function") {
            return
        }
        H[AL] = H[AL] || [];
        H[AL].push(AK)
    };
    p.removeHook = function(AK) {
        if (H[AK]) {
            H[AK].pop()
        }
    };
    p.removeHooks = function(AK) {
        if (H[AK]) {
            H[AK] = []
        }
    };
    p.removeAllHooks = function() {
        H = {}
    };
    return p
}));

function addToSet(C, B) {
    var A = B.length;
    while (A--) {
        C[B[A]] = true
    }
    return C
}

function addObjsToSet(C, A) {
    for (var B in A) {
        C[B] = true
    }
    return C
}

function removeFromSet(D, C) {
    var B = {};
    for (var A in D) {
        if (D.hasOwnProperty(A)) {
            if (A != C) {
                B[A] = D[A]
            }
        }
    }
    return B
}(function(A) {
    var B = {};
    B.ALLOW_ARIA_ATTR = true;
    B.ALLOW_DATA_ATTR = true;
    B.ALLOW_UNKNOWN_PROTOCOLS = false;
    B.SAFE_FOR_JQUERY = false;
    B.SAFE_FOR_TEMPLATES = false;
    B.WHOLE_DOCUMENT = false;
    B.RETURN_DOM = false;
    B.RETURN_DOM_FRAGMENT = false;
    B.RETURN_DOM_IMPORT = false;
    B.FORCE_BODY = false;
    B.SANITIZE_DOM = true;
    B.KEEP_CONTENT = true;
    B.STYLE_VALIDATION = true;
    B.REMOVE_ONEVENTS = true;
    B.ALLOWED_STYLE = "NONE";
    B.ALLOWED_TAGS = "a|abbr|acronym|address|area|article|aside|audio|b|bdi|bdo|big|blink|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|content|data|datalist|dd|decorator|del|details|dfn|dir|div|dl|dt|element|em|fieldset|figcaption|figure|font|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|img|input|ins|kbd|label|legend|li|main|map|mark|marquee|menu|menuitem|meter|nav|nobr|ol|optgroup|option|output|p|pre|progress|q|rp|rt|ruby|s|samp|section|select|shadow|small|source|spacer|span|strike|strong|sub|summary|sup|table|tbody|td|template|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video|wbr|#text".split("|");
    B.ALLOWED_ATTR = "accept|action|align|alt|autocomplete|background|bgcolor|border|cellpadding|cellspacing|checked|cite|class|clear|color|cols|colspan|coords|datetime|default|dir|disabled|download|enctype|face|for|headers|height|hidden|high|href|hreflang|id|ismap|label|lang|list|loop|low|max|maxlength|media|method|min|multiple|name|noshade|novalidate|nowrap|open|optimum|pattern|placeholder|poster|preload|pubdate|radiogroup|readonly|rel|required|rev|reversed|role|rows|rowspan|spellcheck|scope|selected|shape|size|span|srclang|start|src|step|summary|tabindex|title|target|type|usemap|valign|value|width|xmlns|sandbox".split("|");
    B.ALLOWED_STYLE_PROPS = "azimuth|background|background-attachment|background-color|background-image|background-position|content|background-repeat|border-collapse|border-color|border-top-color|border-right-color|border-bottom-color|border-left-color|bottom|caption-side|clear|color|cue-after|cue-before|direction|display|elevation|empty-cells|float|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|height|left|letter-spacing|line-height|list-style-image|list-style-position|list-style-type|marker-offset|max-height|max-width|min-height|min-width|orphans|outline-color|overflow|page-break-after|page-break-before|page-break-inside|pause-after|pause-before|pitch|pitch-range|position|richness|right|size|speak|speak-header|speak-numeral|speak-punctuation|speech-rate|stress|table-layout|text-indent|text-transform|top|unicode-bidi|vertical-align|visibility|volume|white-space|widows|width|word-spacing|border-style|border-top-style|border-right-style|border-bottom-style|border-left-style|border-top-width|border-right-width|border-bottom-width|border-left-width|border-width|margin|margin-top|margin-right|margin-bottom|margin-left|outline-style|outline-width|padding|padding-top|padding-right|padding-bottom|padding-left|border|border-top|border-right|border-bottom|border-left|cue|list-style|marks|outline|pause|text-decoration|border-spacing|clip|counter-increment|clip|cursor|text-shadow|font|font-family|page|play-during|text-align|voice-family".split("|");
    B.FORBID_TAGS = [];
    B.FORBID_ATTR = [];
    B.ALLOWED_TAGS_OBJ = {};
    B.ALLOWED_ATTR_OBJ = {};
    B.FORBID_TAGS_OBJ = {};
    B.FORBID_ATTR_OBJ = {};
    B.ADD_URI_SAFE_ATTR = [];
    B.EXTENDS = ["GLOBAL_ATTRIBUTES", "GLOBAL_ELEMENTS", "FORBID_TAGS", "FORBID_ATTR", "GLOBAL_APPEND_ATTRIBUTES", "GLOBAL_ATTRIBUTE_RULES", "ADD_URI_SAFE_ATTR", "TAG_RULES"];
    B.TAG_RULES = {
        a: {
            APPEND_ATTRIBUTES: [{
                NAME: "rel",
                VALUE: "noopener noreferrer",
                CRITERIA: [{
                    NAME: "target",
                    CONTAINS: "_blank"
                }]
            }]
        }
    };
    B.GLOBAL_APPEND_ATTRIBUTES = [];
    B.GLOBAL_ATTRIBUTE_RULES = [];
    ZSEC.util.defineProperty(ZSEC, "HTMLPurifier", A(B, DOMPurify(window)), true, false, false, true);
    delete window.DOMPurify
}(function factory(e, a) {
    var S = addToSet({}, ["script"]);
    var U = addToSet({}, []);
    var f = ["ALLOW_ARIA_ATTR", "ALLOW_DATA_ATTR", "ALLOW_UNKNOWN_PROTOCOLS", "SAFE_FOR_JQUERY", "SAFE_FOR_TEMPLATES", "WHOLE_DOCUMENT", "RETURN_DOM", "RETURN_DOM_FRAGMENT", "RETURN_DOM_IMPORT", "FORCE_BODY", "SANITIZE_DOM", "KEEP_CONTENT", "ALLOWED_STYLE_PROPS"];
    var Y = ["ALLOWED_TAGS", "ALLOWED_ATTR", "FORBID_TAGS", "FORBID_ATTR"];
    var Q = ["ALLOWED_TAGS_OBJ", "ALLOWED_ATTR_OBJ", "FORBID_TAGS_OBJ", "FORBID_ATTR_OBJ"];
    var B = ["ADD_URI_SAFE_ATTR", "GLOBAL_APPEND_ATTRIBUTES", "GLOBAL_ATTRIBUTE_RULES", "TAG_RULES"];
    var A = addToSet({}, f);
    var W = addToSet({}, Y);
    var T = addToSet({}, Q);
    var V = addToSet({}, B);
    V = addToSet(V, Y);
    V = addToSet(V, Q);
    var L = addToSet({}, f.concat(["STYLE_VALIDATION", "ALLOWED_STYLE", "EXTENDS", "REMOVE_ONEVENTS", "GLOBAL_ATTRIBUTES", "GLOBAL_ELEMENTS"], Y, Q, B));
    var F = {
        iframe: {
            NAME: "iframe",
            ATTRIBUTE_RULES: {
                sandbox: {
                    NAME: "sandbox",
                    NOT_CONTAINS: ["allow-top-navigation", "allow-popups-to-escape-sandbox"],
                    DEFAULT_VALUE: "allow-popups allow-forms allow-scripts allow-same-origin"
                }
            },
            APPEND_ATTRIBUTES: [{
                NAME: "sandbox",
                VALUE: "allow-popups allow-forms allow-scripts allow-same-origin"
            }]
        }
    };
    var b = false;
    var c;
    var R = addToSet({}, e.ALLOWED_STYLE_PROPS);

    function K(j) {
        if (!j || j.constructor !== Object) {
            return e
        }
        var i = {};
        for (var k in e) {
            if (k in j) {
                if (k in A) {
                    if (j[k] == true || j[k] == false) {
                        i[k] = j[k]
                    } else {
                        i[k] = e[k]
                    }
                }
            } else {
                i[k] = e[k]
            }
        }
        if (i.SAFE_FOR_TEMPLATES) {
            i.ALLOW_DATA_ATTR = false
        }
        if (i.RETURN_DOM_FRAGMENT) {
            i.RETURN_DOM = true
        }
        if (i.KEEP_CONTENT) {
            i.ALLOWED_TAGS_OBJ["#text"] = true
        }
        return i
    }

    function h(i) {
        for (var j in i) {
            if (typeof i[j] === "string") {
                if (i[j] && R[j]) {
                    b = true
                } else {
                    if (i[j]) {
                        if (j != "cssText" && !/^\d.*/.test(j)) {
                            i[j] = "";
                            c = true
                        }
                    }
                }
            }
        }
    }

    function J(k) {
        for (var i = k.length - 1; i >= 0; i--) {
            var j = k[i];
            if ((j.type == 1 && j.selectorText) || (j.type == 8 && j.keyText)) {
                if (j.style) {
                    h(j.style)
                }
            } else {
                if ((j.type == 4 || j.type == 7) && j.cssRules) {
                    J(j.cssRules)
                }
            }
        }
    }

    function E(i, k) {
        for (var j = k.length - 1; j >= 0; j--) {
            if (k[j].type == 1 || k[j].type == 4 || k[j].type == 7) {
                i.push(k[j].cssText)
            }
        }
    }

    function g(q, n, k) {
        var k = k == undefined ? q.IS_MANDATORY : k;
        if (q.NAME && !n.hasAttribute(q.NAME.toLowerCase())) {
            return q.IS_FORBIDDEN || !k
        }
        if (q.IS_FORBIDDEN) {
            return false
        }
        var o = n.getAttribute(q.NAME.toLowerCase());
        if (o === undefined || o === null) {
            o = ""
        }
        if (o.constructor == String) {
            if (!q.DONT_TRIM) {
                o = o.trim()
            }
            var j = q.CASE_SENSITIVE || false;
            if (!j) {
                o = o.toLowerCase()
            }
            if (q.MAX_LENGTH && o.length > q.MAX_LENGTH) {
                return false
            }
            if (q.MIN_LENGTH && o.length < q.MIN_LENGTH) {
                return false
            }
            if (q.REGEX != undefined) {
                if (q.REGEX.constructor == RegExp && o.search(q.REGEX) == -1) {
                    return false
                } else {
                    if (q.REGEX.constructor == Array) {
                        for (var l = 0; l < q.REGEX.length; l++) {
                            if (o.search(q.REGEX[l]) == -1) {
                                return false
                            }
                        }
                    }
                }
            }
        }
        if (q.LIST && q.LIST.indexOf(o) == -1) {
            return false
        }
        if (q.TYPE == "INTEGER" || q.TYPE == "FLOAT") {
            var m;
            try {
                m = q.TYPE == "INTEGER" ? window.parseInt(o, 10) : window.parseFloat(o)
            } catch (p) {
                return false
            }
            if (window.isNaN(m)) {
                return false
            }
            if ((q.GREATER_THAN != undefined) && m <= q.GREATER_THAN) {
                return false
            }
            if ((q.GREATER_THAN_OR_EQUAL != undefined) && m < q.GREATER_THAN_OR_EQUAL) {
                return false
            }
            if ((q.LESSER_THAN != undefined) && m >= q.LESSER_THAN) {
                return false
            }
            if ((q.LESSER_THAN_OR_EQUAL != undefined) && m > q.LESSER_THAN_OR_EQUAL) {
                return false
            }
            if ((q.EQUAL != undefined) && m != q.EQUAL) {
                return false
            }
            if ((q.NOT_EQUAL != undefined) && m == q.NOT_EQUAL) {
                return false
            }
        } else {
            if (o.constructor == String) {
                if (q.STARTS_WITH != undefined && o.indexOf(q.STARTS_WITH) != 0) {
                    return false
                }
                if (q.ENDS_WITH != undefined && o.lastIndexOf(q.ENDS_WITH) != (o.length - q.ENDS_WITH.length)) {
                    return false
                }
                if (q.CONTAINS != undefined) {
                    if (q.CONTAINS.constructor == String && o.indexOf(q.CONTAINS) == -1) {
                        return false
                    } else {
                        if (q.CONTAINS.constructor == Array) {
                            for (var l = 0; l < q.CONTAINS.length; l++) {
                                if (o.indexOf(q.CONTAINS[l]) == -1) {
                                    return false
                                }
                            }
                        }
                    }
                }
                if (q.NOT_CONTAINS != undefined) {
                    if (q.NOT_CONTAINS.constructor == String && o.indexOf(q.NOT_CONTAINS) > -1) {
                        return false
                    } else {
                        if (q.NOT_CONTAINS.constructor == Array) {
                            for (var l = 0; l < q.NOT_CONTAINS.length; l++) {
                                if (o.indexOf(q.NOT_CONTAINS[l]) > -1) {
                                    return false
                                }
                            }
                        }
                    }
                }
                if (q.EQUAL != undefined && o !== q.EQUAL) {
                    return false
                }
                if (q.NOT_EQUAL != undefined && o === q.NOT_EQUAL) {
                    return false
                }
            }
        }
        return true
    }

    function O(i) {
        if (!i) {
            return i
        }
        if (i.constructor == Object) {
            for (var j in i) {
                if (i.hasOwnProperty(j)) {
                    i[j] = H(i[j])
                }
            }
        }
        return i
    }

    function d(l) {
        if (!l) {
            return l
        }
        if (l.constructor == Array) {
            for (var m = 0; m < l.length; m++) {
                if (l[m].CRITERIA) {
                    for (var k = 0; k < l[m].CRITERIA.length; k++) {
                        l[m].CRITERIA[k] = H(l[m].CRITERIA[k])
                    }
                }
            }
        }
        return l
    }

    function H(n) {
        if (n) {
            var k = ["STARTS_WITH", "ENDS_WITH", "CONTAINS", "EQUAL", "NOT_EQUAL", "LIST"];
            var i = n.CASE_SENSITIVE || false;
            if (!i) {
                for (var m = 0; m < k.length; m++) {
                    var l = k[m];
                    if (n[l]) {
                        n[l] = N(n[l])
                    }
                }
            }
        }
        return n
    }

    function N(k) {
        if (k && k.constructor == String) {
            return k.toLowerCase()
        } else {
            if (k.constructor == Array) {
                for (var j = 0; j < k.length; j++) {
                    k[j] = N(k[j])
                }
            }
        }
        return k
    }

    function M(n, l) {
        if (!n || n.constructor == Object) {
            return n
        }
        var k = {};
        for (var j = 0; j < n.length; j++) {
            var m = n[j];
            k[m[l]] = m
        }
        return k
    }

    function I(m, p) {
        if (!m) {
            return
        }
        for (var o = 0; o < m.length; o++) {
            var n = m[o];
            if (!p.hasAttribute(n.NAME.toLowerCase())) {
                var k = true;
                if (n.CRITERIA) {
                    for (var l = 0; l < n.CRITERIA.length; l++) {
                        if (!g(n.CRITERIA[l], p, true)) {
                            k = false;
                            break
                        }
                    }
                }
                if (k) {
                    p.setAttribute(n.NAME, n.VALUE)
                } else {
                    if (n.DEFAULT_VALUE != undefined) {
                        p.setAttribute(n.NAME, n.DEFAULT_VALUE)
                    }
                }
            }
        }
    }

    function P(k, i) {
        if (i) {
            for (var j in i) {
                if (i.hasOwnProperty(j) && j in k) {
                    if (k[j].APPEND_ATTRIBUTES == undefined) {
                        k[j].APPEND_ATTRIBUTES = i[j].APPEND_ATTRIBUTES
                    }
                    if (k[j].ATTRIBUTE_RULES == undefined) {
                        k[j].ATTRIBUTE_RULES = i[j].ATTRIBUTE_RULES
                    }
                } else {
                    k[j] = i[j]
                }
            }
        }
        return k
    }

    function D(j, k, i) {
        if (k && !g(k, j)) {
            if (k.DEFAULT_VALUE !== undefined) {
                j.setAttribute(i, k.DEFAULT_VALUE)
            } else {
                j.removeAttribute(i)
            }
            return false
        }
        return true
    }

    function C() {
        e.FORBID_TAGS_OBJ = addObjsToSet(e.FORBID_TAGS_OBJ, S);
        e.FORBID_ATTR_OBJ = addObjsToSet(e.FORBID_ATTR_OBJ, U);
        for (var i in W) {
            e[i + "_OBJ"] = addToSet(e[i + "_OBJ"], e[i])
        }
        a.removeAllHooks();
        c = false;
        if (e.ALLOWED_STYLE == "NONE") {
            e.FORBID_TAGS_OBJ = addToSet(e.FORBID_TAGS_OBJ, ["style"]);
            e.FORBID_ATTR_OBJ = addToSet(e.FORBID_ATTR_OBJ, ["style"])
        }
        if (e.ALLOWED_STYLE == "INLINE" || e.ALLOWED_STYLE == "ALL") {
            if (e.STYLE_VALIDATION) {
                a.addHook("afterSanitizeAttributes", function(k) {
                    if (!k.ownerDocument.baseURI) {
                        var l = document.createElement("base");
                        l.href = document.baseURI;
                        k.ownerDocument.head.appendChild(l)
                    }
                    if (k.hasAttribute("style")) {
                        var j = "";
                        c = false;
                        h(k.style);
                        if (c) {
                            j = k.style.cssText
                        } else {
                            j = k.getAttribute("style")
                        }
                        if (j.length) {
                            k.setAttribute("style", j)
                        } else {
                            k.removeAttribute("style")
                        }
                    }
                })
            }
            if (e.ALLOWED_STYLE == "INLINE") {
                e.FORBID_TAGS_OBJ = addToSet(e.FORBID_TAGS_OBJ, ["style"]);
                e.FORBID_ATTR_OBJ = removeFromSet(e.FORBID_ATTR_OBJ, "style")
            }
        }
        if (e.ALLOWED_STYLE == "INTERNAL" || e.ALLOWED_STYLE == "ALL") {
            if (e.STYLE_VALIDATION) {
                a.addHook("uponSanitizeElement", function(k, l) {
                    if (l.tagName === "style") {
                        if (k.sheet != null) {
                            var m = k.sheet.cssRules;
                            c = false;
                            J(m);
                            if (c) {
                                var j = [];
                                E(j, m);
                                k.textContent = j.join("\n")
                            }
                        }
                    }
                })
            }
            if (e.ALLOWED_STYLE == "INTERNAL") {
                e.FORBID_ATTR_OBJ = addToSet(e.FORBID_ATTR_OBJ, ["style"]);
                e.FORBID_TAGS_OBJ = removeFromSet(e.FORBID_TAGS_OBJ, "style")
            }
        }
        if (e.ALLOWED_STYLE == "ALL") {
            e.FORBID_TAGS_OBJ = removeFromSet(e.FORBID_TAGS_OBJ, "style");
            e.FORBID_ATTR_OBJ = removeFromSet(e.FORBID_ATTR_OBJ, "style")
        }
        if (e.GLOBAL_ATTRIBUTE_RULES || e.TAG_RULES) {
            a.addHook("afterSanitizeAttributes", function(o) {
                var r = o.nodeName.toLowerCase();
                var p = e.GLOBAL_ATTRIBUTE_RULES;
                var n = e.TAG_RULES && e.TAG_RULES[r] && e.TAG_RULES[r].ATTRIBUTE_RULES;
                var j = F && F[r] && F[r].ATTRIBUTE_RULES;
                var k = o.attributes.length;
                while (k--) {
                    var m = o.attributes[k].name;
                    var q = n && n[m] || p && p[m];
                    if (D(o, q, m)) {
                        D(o, j && j[m], m)
                    }
                }
            })
        }
        if (e.GLOBAL_APPEND_ATTRIBUTES || e.TAG_RULES) {
            a.addHook("afterSanitizeAttributes", function(k) {
                var j = k.nodeName.toLowerCase();
                I(e.TAG_RULES && e.TAG_RULES[j] && e.TAG_RULES[j].APPEND_ATTRIBUTES, k);
                I(e.GLOBAL_APPEND_ATTRIBUTES, k);
                I(F && F[j] && F[j].APPEND_ATTRIBUTES, k)
            })
        }
        if (e.REMOVE_ONEVENTS) {
            a.addHook("uponSanitizeAttribute", function(j, k) {
                if (k.attrName.indexOf("on") == 0) {
                    k.keepAttr = false
                }
            })
        }
    }

    function X(p) {
        if (typeof p == "object") {
            p.ALLOWED_TAGS = p.GLOBAL_ELEMENTS;
            p.ALLOWED_ATTR = p.GLOBAL_ATTRIBUTES;
            for (var t in L) {
                if ((p[t] == undefined) && !(t in V)) {
                    p[t] = e[t]
                }
            }
            p.TAG_RULES = M(p.TAG_RULES, "NAME");
            if (p.TAG_RULES) {
                for (var l in p.TAG_RULES) {
                    var u = p.TAG_RULES[l];
                    u.ATTRIBUTE_RULES = O(M(u.ATTRIBUTE_RULES, "NAME"));
                    u.APPEND_ATTRIBUTES = d(u.APPEND_ATTRIBUTES)
                }
            }
            p.GLOBAL_ATTRIBUTE_RULES = O(M(p.GLOBAL_ATTRIBUTE_RULES, "NAME"));
            p.GLOBAL_APPEND_ATTRIBUTES = d(p.GLOBAL_APPEND_ATTRIBUTES);
            if (p.EXTENDS) {
                for (var o = 0; o < p.EXTENDS.length; o++) {
                    var v = p.EXTENDS[o];
                    if (v == "GLOBAL_ELEMENTS") {
                        v = "ALLOWED_TAGS"
                    }
                    if (v == "GLOBAL_ATTRIBUTES") {
                        v = "ALLOWED_ATTR"
                    }
                    switch (v) {
                        case "ALLOWED_TAGS":
                        case "ALLOWED_ATTR":
                        case "FORBID_TAGS":
                        case "FORBID_ATTR":
                            v += "_OBJ";
                            p[v] = {};
                            if (e[v]) {
                                p[v] = addObjsToSet(p[v], e[v])
                            }
                            break;
                        case "ADD_URI_SAFE_ATTR":
                        case "GLOBAL_APPEND_ATTRIBUTES":
                            if (!p[v]) {
                                p[v] = []
                            }
                            if (e[v]) {
                                if (p[v].constructor === Array && e[v].constructor === Array) {
                                    p[v] = p[v].concat(e[v])
                                } else {
                                    p[v] = e[v]
                                }
                            }
                            break;
                        case "GLOBAL_ATTRIBUTE_RULES":
                            if (!p.GLOBAL_ATTRIBUTE_RULES) {
                                p.GLOBAL_ATTRIBUTE_RULES = {}
                            }
                            if (e.GLOBAL_ATTRIBUTE_RULES) {
                                for (var n in e.GLOBAL_ATTRIBUTE_RULES) {
                                    if (!p.GLOBAL_ATTRIBUTE_RULES[n]) {
                                        p.GLOBAL_ATTRIBUTE_RULES[n] = e.GLOBAL_ATTRIBUTE_RULES[n]
                                    }
                                }
                            }
                            break;
                        case "TAG_RULES":
                            if (!p.TAG_RULES) {
                                p.TAG_RULES = {}
                            }
                            p.TAG_RULES = P(p.TAG_RULES, e.TAG_RULES);
                            break
                    }
                }
            }
            for (var j in W) {
                if (!p[j + "_OBJ"]) {
                    p[j + "_OBJ"] = {}
                }
                if (p[j] != undefined) {
                    if (p[j].constructor === Array) {
                        p[j + "_OBJ"] = addToSet(p[j + "_OBJ"], p[j])
                    }
                } else {
                    p[j] = []
                }
            }
            for (var m = 0; m < B.length; m++) {
                var q = B[m];
                if (!p[q]) {
                    p[q] = []
                }
            }
            if (p.ALLOWED_STYLE == "ALL") {
                p.FORBID_TAGS_OBJ = removeFromSet(p.FORBID_TAGS_OBJ, "style");
                p.FORBID_ATTR_OBJ = removeFromSet(p.FORBID_ATTR_OBJ, "style");
                p.ALLOWED_TAGS_OBJ = addToSet(p.ALLOWED_TAGS_OBJ, ["style"]);
                p.ALLOWED_ATTR_OBJ = addToSet(p.ALLOWED_ATTR_OBJ, ["style"])
            } else {
                if (p.ALLOWED_STYLE == "INLINE") {
                    p.FORBID_ATTR_OBJ = removeFromSet(p.FORBID_ATTR_OBJ, "style");
                    p.ALLOWED_ATTR_OBJ = addToSet(p.ALLOWED_ATTR_OBJ, ["style"]);
                    p.FORBID_TAGS_OBJ = addToSet(p.FORBID_TAGS_OBJ, ["style"]);
                    p.ALLOWED_TAGS_OBJ = removeFromSet(p.ALLOWED_TAGS_OBJ, "style")
                } else {
                    if (p.ALLOWED_STYLE == "INTERNAL") {
                        p.FORBID_TAGS_OBJ = removeFromSet(p.FORBID_TAGS_OBJ, "style");
                        p.ALLOWED_TAGS_OBJ = addToSet(p.ALLOWED_TAGS_OBJ, ["style"]);
                        p.FORBID_ATTR_OBJ = addToSet(p.FORBID_ATTR_OBJ, ["style"]);
                        p.ALLOWED_ATTR_OBJ = removeFromSet(p.ALLOWED_ATTR_OBJ, "style")
                    } else {
                        if (p.ALLOWED_STYLE == "NONE") {
                            p.FORBID_TAGS_OBJ = addToSet(p.FORBID_TAGS_OBJ, ["style"]);
                            p.FORBID_ATTR_OBJ = addToSet(p.FORBID_ATTR_OBJ, ["style"]);
                            p.ALLOWED_TAGS_OBJ = removeFromSet(p.ALLOWED_TAGS_OBJ, "style");
                            p.ALLOWED_ATTR_OBJ = removeFromSet(p.ALLOWED_ATTR_OBJ, "style")
                        }
                    }
                }
            }
            for (var w in W) {
                for (var s in p[w + "_OBJ"]) {
                    p[w].push(s)
                }
                p[w + "_OBJ"] = addToSet(p[w + "_OBJ"], p[w])
            }
            if (ZSEC.configValidator) {
                ZSEC.configValidator.HTMLPurifierValidation(p, L, W, S, U)
            }
        } else {
            p = {};
            for (var r in e) {
                p[r] = e[r].valueOf()
            }
        }
        return p
    }
    C();
    var Z = function(i) {
        i = X(i);
        return factory(i, a(window))
    };
    var G = function(l, k) {
        var j = K(k);
        var i = a.sanitize(l, j);
        Z.removed = a.removed;
        return i
    };
    Z.isSupported = a.isSupported;
    Z.removed = "";
    ZSEC.util.defineProperty(Z, "sanitize", G, false, false, true);
    return Z
}));
ZSEC.util.defineProperty(ZSEC, "configValidator", {}, false, false, true);
(function(A) {
    function B(K, F, C, E, M) {
        var G = addToSet({}, ["ALLOW_ARIA_ATTR", "ALLOW_DATA_ATTR", "ALLOW_UNKNOWN_PROTOCOLS", "SAFE_FOR_JQUERY", "SAFE_FOR_TEMPLATES", "WHOLE_DOCUMENT", "RETURN_DOM", "RETURN_DOM_FRAGMENT", "RETURN_DOM_IMPORT", "FORCE_BODY", "SANITIZE_DOM", "KEEP_CONTENT", "STYLE_VALIDATION", "REMOVE_ONEVENTS"]);
        for (var O in K) {
            if (!(O in F)) {
                throw new Error("Invalid Flag in configuration! Value: " + O + ". Must be one of the following: " + JSON.stringify(["ALLOW_ARIA_ATTR", "ALLOW_DATA_ATTR", "ALLOW_UNKNOWN_PROTOCOLS", "SAFE_FOR_JQUERY", "SAFE_FOR_TEMPLATES", "WHOLE_DOCUMENT", "RETURN_DOM", "RETURN_DOM_FRAGMENT", "RETURN_DOM_IMPORT", "FORCE_BODY", "SANITIZE_DOM", "KEEP_CONTENT", "STYLE_VALIDATION", "ALLOWED_STYLE", "ALLOWED_TAGS", "ALLOWED_ATTR", "FORBID_TAGS", "FORBID_ATTR", "ADD_URI_SAFE_ATTR", "EXTENDS", "GLOBAL_APPEND_ATTRIBUTES", "GLOBAL_ATTRIBUTE_RULES", "REMOVE_ONEVENTS"]))
            }
        }
        for (var N in G) {
            if (!(K[N] === true || K[N] === false)) {
                throw new Error("Invalid Value for '" + N + "' in the configuration. It needs to be either 'true' or 'false'")
            }
        }
        if (K.SAFE_FOR_TEMPLATES) {
            if (K.ALLOW_DATA_ATTR) {
                throw new Error("'ALLOW_DATA_ATTR' should not be set when 'SAFE_FOR_TEMPLATES' is true")
            }
        }
        if (K.ALLOWED_STYLE) {
            K.ALLOWED_STYLE = K.ALLOWED_STYLE.toUpperCase();
            if (!(K.ALLOWED_STYLE == "ALL" || K.ALLOWED_STYLE == "INTERNAL" || K.ALLOWED_STYLE == "INLINE" || K.ALLOWED_STYLE == "NONE")) {
                throw new Error("Invalid Value for 'ALLOWED_STYLE' in the configuration. It needs to be either 'ALL', 'INTERNAL', 'INLINE' or 'NONE'")
            }
        }
        if (K.ADD_URI_SAFE_ATTR) {
            if (!(K.ADD_URI_SAFE_ATTR.constructor === Array)) {
                throw new Error("Invalid Value for 'ADD_URI_SAFE_ATTR' in the configuration.It must be an Array")
            }
        } else {
            K.ADD_URI_SAFE_ATTR = []
        }
        if (K.GLOBAL_APPEND_ATTRIBUTES) {
            for (var L = 0; L < K.GLOBAL_APPEND_ATTRIBUTES.length; L++) {
                if (K.GLOBAL_APPEND_ATTRIBUTES[L].NAME != undefined && K.GLOBAL_APPEND_ATTRIBUTES[L].VALUE != undefined) {
                    if (K.GLOBAL_APPEND_ATTRIBUTES[L].CRITERIA) {
                        for (var I = 0; I < K.GLOBAL_APPEND_ATTRIBUTES[L].CRITERIA.length; I++) {
                            var H = K.GLOBAL_APPEND_ATTRIBUTES[L].CRITERIA[I];
                            if (!H.NAME) {
                                throw new Error("Invalid value for MAX_LENGTH in GLOBAL_APPEND_ATTRIBUTES rules", K.GLOBAL_APPEND_ATTRIBUTES[L])
                            }
                            if (H.MAX_LENGTH && H.MAX_LENGTH.constructor !== Number) {
                                throw new Error("Invalid value for MAX_LENGTH in GLOBAL_APPEND_ATTRIBUTES rules", K.GLOBAL_APPEND_ATTRIBUTES[L])
                            }
                            if (H.MIN_LENGTH && H.MIN_LENGTH.constructor !== Number) {
                                throw new Error("Invalid value for MIN_LENGTH in GLOBAL_APPEND_ATTRIBUTES rules", K.GLOBAL_APPEND_ATTRIBUTES[L])
                            }
                            if (H.REGEX && H.REGEX.constructor !== RegExp) {
                                throw new Error("Invalid value for REGEX in GLOBAL_APPEND_ATTRIBUTES rules", K.GLOBAL_APPEND_ATTRIBUTES[L])
                            }
                            if (H.LIST && H.LIST.constructor !== Array) {
                                throw new Error("Invalid value for LIST in GLOBAL_APPEND_ATTRIBUTES rules", K.GLOBAL_APPEND_ATTRIBUTES[L])
                            }
                        }
                    }
                } else {
                    throw new Error("The Attribute Name and Attribute Value must be mentioned for GLOBAL_APPEND_ATTRIBUTES rules", K.GLOBAL_APPEND_ATTRIBUTES[L])
                }
            }
        } else {
            K.GLOBAL_APPEND_ATTRIBUTES = []
        }
        if (K.GLOBAL_ATTRIBUTE_RULES) {
            for (var J in K.GLOBAL_ATTRIBUTE_RULES) {
                if (K.GLOBAL_ATTRIBUTE_RULES.hasOwnProperty(J)) {
                    var D = K.GLOBAL_ATTRIBUTE_RULES[J];
                    if (!(D.NAME == undefined)) {
                        if (!(D.ACTION == undefined)) {
                            if (D.ACTION != "REMOVE_ATTRIBUTE" && D.ACTION != "REMOVE_ATTRIBUTE_VALUE" && D.ACTION != "REPLACE") {
                                throw new Error("Invalid value for ACTION in GLOBAL_ATTRIBUTE_RULES rule. Must be one of 'REMOVE_ELEMENT', 'REMOVE_ATTRIBUTE', 'REMOVE_ATTRIBUTE_VALUE', or 'REPLACE'", D)
                            }
                            if (D.MAX_LENGTH && D.MAX_LENGTH.constructor !== Number) {
                                throw new Error("Invalid value for MAX_LENGTH in GLOBAL_ATTRIBUTE_RULES rules", D)
                            }
                            if (D.MIN_LENGTH && D.MIN_LENGTH.constructor !== Number) {
                                throw new Error("Invalid value for MIN_LENGTH in GLOBAL_ATTRIBUTE_RULES rules", D)
                            }
                            if (D.REGEX && D.REGEX.constructor !== RegExp) {
                                throw new Error("Invalid value for REGEX in GLOBAL_ATTRIBUTE_RULES rules", D)
                            }
                            if (D.LIST && D.LIST.constructor !== Array) {
                                throw new Error("Invalid value for LIST in GLOBAL_ATTRIBUTE_RULES rules", D)
                            }
                        } else {
                            throw new Error("ACTION must be mentioned for GLOBAL_ATTRIBUTE_RULES rules", D)
                        }
                    } else {
                        throw new Error("The Attribute Name must be mentioned for GLOBAL_ATTRIBUTE_RULES rules", D)
                    }
                }
            }
        } else {
            K.GLOBAL_ATTRIBUTE_RULES = []
        }
        if (K.ALLOWED_STYLE == "ALL") {
            if (K.FORBID_TAGS.indexOf("style") > -1 || K.FORBID_ATTR.indexOf("style") > -1) {
                throw new Error("You have added style to the forbidden tag/attribute list but have specified to not remove it in the 'ALLOWED_STYLE' flag by setting it to 'ALL'")
            }
        } else {
            if (K.ALLOWED_STYLE == "INLINE") {
                if (K.FORBID_ATTR.indexOf("style") > -1) {
                    throw new Error("You have added style to the forbidden tag/attribute list but have specified to not remove it in the 'ALLOWED_STYLE' flag by setting it to 'INLINE'")
                }
                if (K.ALLOWED_TAGS.indexOf("style") > -1) {
                    throw new Error("You have added style to the allowed tag list but have specified to remove it in the 'ALLOWED_STYLE' flag by setting it to 'INLINE'")
                }
            } else {
                if (K.ALLOWED_STYLE == "INTERNAL") {
                    if (K.FORBID_TAGS.indexOf("style") > -1) {
                        throw new Error("You have added style to the forbidden tag/attribute list but have specified to not remove it in the 'ALLOWED_STYLE' flag by setting it to 'INTERNAL'")
                    }
                    if (K.ALLOWED_ATTR.indexOf("style") > -1) {
                        throw new Error("You have added style to the allowed attribute list but have specified to remove it in the 'ALLOWED_STYLE' flag by setting it to 'INTERNAL'")
                    }
                } else {
                    if (K.ALLOWED_STYLE == "NONE") {
                        if (K.ALLOWED_TAGS.indexOf("style") > -1 || K.ALLOWED_ATTR.indexOf("style") > -1) {
                            throw new Error("You have added style to the allowed tag/attribute list but have specified to remove it in the 'ALLOWED_STYLE' flag by setting it to 'NONE'")
                        }
                    }
                }
            }
        }
        for (var L in K.ALLOWED_TAGS_OBJ) {
            if (L.toLowerCase() in K.FORBID_TAGS_OBJ) {
                if (L != "style") {
                    throw new Error("Conflict in Allowed and Forbidden Tags! Tag '" + L + "' is given in FORBID_TAGS and ALLOWED_TAGS in configuration!")
                }
            }
            if (L.toLowerCase() in E) {
                throw new Error("Tag '" + L + "' is forbidden by default. The following Tags are forbidden by default: 'script','iframe' ")
            }
        }
        for (var L in K.ALLOWED_ATTR_OBJ) {
            if (L.toLowerCase() in K.FORBID_ATTR_OBJ) {
                if (L != "style") {
                    throw new Error("Conflict in Allowed and Forbidden Attributes! Attribute '" + L + "' is given in FORBID_ATTR and ALLOWED_ATTR in configuration!")
                }
            }
            if (L.toLowerCase() in M) {
                throw new Error("Attribute '" + L + "' is forbidden by default. The following Attributes are forbidden by default: ")
            }
        }
    }
    ZSEC.util.defineProperty(A, "HTMLPurifierValidation", B, false, false, true)
})(ZSEC.configValidator);
(function(A) {
    ZSEC.util.defineProperty(ZSEC, "secureRedirector", A(), true, false, false, true)
}(function() {
    var F = navigator.userAgent.indexOf("MSIE") !== -1;
    var E = window.open;

    function A(L, J) {
        if (typeof L.length === "undefined") {
            C(L);
            if (J) {
                G(L, A)
            }
        } else {
            if (typeof L !== "string" && !(L instanceof String)) {
                for (var K = 0; K < L.length; K++) {
                    C(L[K]);
                    if (J) {
                        G(L, A)
                    }
                }
            }
        }
    }

    function C(O) {
        if (O.nodeType != 1) {
            return
        }
        var J = O.nodeName;
        if (J == "A" || J == "a" || J == "MATH" || J == "math") {
            B(O, "click", I)
        }
        var L = O.childNodes;
        if (L && L.length) {
            var K = L.length;
            for (var M = 0; M < K; M++) {
                var N = L[M];
                if (N.nodeType == 1) {
                    C(N)
                }
            }
        }
    }

    function G(K, N) {
        var L = window.MutationObserver || window.WebKitMutationObserver,
            J = window.addEventListener;
        if (L) {
            var M = new L(function(O, Q) {
                for (var T = 0; T < O.length; T++) {
                    var S = O[T].addedNodes.length;
                    if (S) {
                        var P = O[T].addedNodes;
                        for (var R = 0; R < S; R++) {
                            N(P[R])
                        }
                    }
                }
            });
            M.observe(K, {
                childList: true,
                subtree: true
            })
        } else {
            if (J) {
                K.addEventListener("DOMNodeInserted", function(O) {
                    N(O.target)
                }, false)
            }
        }
    }
    A.open = function(L, J, K) {
        var M;
        if (D(J)) {
            return E.apply(window, arguments)
        } else {
            if (!F) {
                return H(L, J, K)
            } else {
                M = E.apply(window, arguments);
                M.opener = null;
                return M
            }
        }
    };
    A.patch = function() {
        window.open = function() {
            return A.open.apply(this, arguments)
        }
    };

    function I(O) {
        var N, M, L, K;
        O = O || window.event;
        N = O.currentTarget || O.srcElement;
        L = N.getAttribute("href");
        if (!L) {
            L = N.getAttribute("xlink:href");
            if (!L) {
                return
            }
        }
        K = (O.ctrlKey || O.shiftKey || O.metaKey);
        M = N.getAttribute("target");
        var J = N.getAttribute("xlink:show");
        if (!K && (!M || D(M)) && !J) {
            return
        }
        A.open(L);
        if (O.preventDefault) {
            O.preventDefault()
        } else {
            O.returnValue = false
        }
        return false
    }

    function B(N, L, M) {
        var J, K;
        if (N.addEventListener) {
            return N.addEventListener(L, M, false)
        }
        J = "on" + L;
        if (N.attachEvent) {
            N.attachEvent(J, M)
        } else {
            if (N[J]) {
                K = N[J];
                N[J] = function() {
                    M();
                    K()
                }
            } else {
                N[J] = M
            }
        }
    }

    function H(M, J, N) {
        var O, P, L, Q, K;
        O = document.createElement("iframe");
        O.style.display = "none";
        document.body.appendChild(O);
        P = O.contentDocument || O.contentWindow.document;
        Q = '"' + ZSEC.Encoder.encodeForJavaScript(M) + '"';
        if (J) {
            Q += ', "' + ZSEC.Encoder.encodeForJavaScript(J) + '"'
        }
        if (N) {
            Q += ', "' + ZSEC.Encoder.encodeForJavaScript(N) + '"'
        }
        L = P.createElement("script");
        L.type = "text/javascript";
        L.text = "window.parent = null; window.top = null;window.frameElement = null; var child = window.open(" + Q + ");try{child.opener = null;}catch(e){}";
        P.body.appendChild(L);
        K = O.contentWindow.child;
        document.body.removeChild(O);
        return K
    }

    function D(J) {
        return J === "_top" || J === "_self" || J === "_parent"
    }
    if (Object.freeze) {
        Object.freeze(A)
    }
    return A
}));
(function() {
    var A = {};
    A.filterXML = function(G) {
        var F = "";
        for (var E = 0, D = G.length; E < D; E++) {
            var C = G.codePointAt(E);
            var B = G.charAt(E);
            if ((C == 9) || (C == 10) || (C == 13) || ((C >= 32) && (C <= 55295)) || ((C >= 57344) && (C <= 65533)) || ((C >= 65536) && (C <= 1114111))) {
                F += B
            }
            if (C > 65535) {
                E++
            }
        }
        return F
    };
    if (Object.freeze) {
        Object.freeze(A)
    }
    ZSEC.util.defineProperty(ZSEC, "TextFilter", A, true, false, false, true)
})();
(function() {
    var A = {
        unsafeProtocolRegex: /^(?:\w+script|data)$/i,
        sanitizeAction: {
            ACTION_ENCODE: "ENCODE",
            ACTION_REMOVE: "REMOVE"
        }
    };
    var B = {};
    (function(Z) {
        var G, T = 2147483647,
            N = 36,
            P = 1,
            R = 26,
            K = 38,
            O = 700,
            Q = 72,
            I = 128,
            f = "-",
            W = /^xn--/,
            F = /[^\x20-\x7E]/,
            C = /[\x2E\u3002\uFF0E\uFF61]/g,
            S = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
            },
            J = N - P,
            b = Math.floor,
            Y = String.fromCharCode,
            g;

        function a(h) {
            throw new RangeError(S[h])
        }

        function d(k, i) {
            var j = k.length;
            var h = [];
            while (j--) {
                h[j] = i(k[j])
            }
            return h
        }

        function E(i, j) {
            var l = i.split("@");
            var h = "";
            if (l.length > 1) {
                h = l[0] + "@";
                i = l[1]
            }
            i = i.replace(C, "\x2E");
            var m = i.split(".");
            var k = d(m, j).join(".");
            return h + k
        }

        function M(k) {
            var j = [],
                i = 0,
                l = k.length,
                m, h;
            while (i < l) {
                m = k.charCodeAt(i++);
                if (m >= 55296 && m <= 56319 && i < l) {
                    h = k.charCodeAt(i++);
                    if ((h & 64512) == 56320) {
                        j.push(((m & 1023) << 10) + (h & 1023) + 65536)
                    } else {
                        j.push(m);
                        i--
                    }
                } else {
                    j.push(m)
                }
            }
            return j
        }

        function c(h) {
            return d(h, function(j) {
                var i = "";
                if (j > 65535) {
                    j -= 65536;
                    i += Y(j >>> 10 & 1023 | 55296);
                    j = 56320 | j & 1023
                }
                i += Y(j);
                return i
            }).join("")
        }

        function H(h) {
            if (h - 48 < 10) {
                return h - 22
            }
            if (h - 65 < 26) {
                return h - 65
            }
            if (h - 97 < 26) {
                return h - 97
            }
            return N
        }

        function X(i, h) {
            return i + 22 + 75 * (i < 26) - ((h != 0) << 5)
        }

        function D(l, i, j) {
            var h = 0;
            l = j ? b(l / O) : l >> 1;
            l += b(l / i);
            for (; l > J * R >> 1; h += N) {
                l = b(l / J)
            }
            return b(h + (J + 1) * l / (l + K))
        }

        function V(z) {
            var m = [],
                q = z.length,
                s, u = 0,
                l = I,
                v = Q,
                p, r, x, h, AA, o, y, AC, AB;
            p = z.lastIndexOf(f);
            if (p < 0) {
                p = 0
            }
            for (r = 0; r < p; ++r) {
                if (z.charCodeAt(r) >= 128) {
                    a("not-basic")
                }
                m.push(z.charCodeAt(r))
            }
            for (x = p > 0 ? p + 1 : 0; x < q;) {
                for (h = u, AA = 1, o = N;; o += N) {
                    if (x >= q) {
                        a("invalid-input")
                    }
                    y = H(z.charCodeAt(x++));
                    if (y >= N || y > b((T - u) / AA)) {
                        a("overflow")
                    }
                    u += y * AA;
                    AC = o <= v ? P : (o >= v + R ? R : o - v);
                    if (y < AC) {
                        break
                    }
                    AB = N - AC;
                    if (AA > b(T / AB)) {
                        a("overflow")
                    }
                    AA *= AB
                }
                s = m.length + 1;
                v = D(u - h, s, h == 0);
                if (b(u / s) > T - l) {
                    a("overflow")
                }
                l += b(u / s);
                u %= s;
                m.splice(u++, 0, l)
            }
            return c(m)
        }

        function L(z) {
            var o, AB, w, i, x, v, p, h, u, AD, AA, l = [],
                s, r, AC, y;
            z = M(z);
            s = z.length;
            o = I;
            AB = 0;
            x = Q;
            for (v = 0; v < s; ++v) {
                AA = z[v];
                if (AA < 128) {
                    l.push(Y(AA))
                }
            }
            w = i = l.length;
            if (i) {
                l.push(f)
            }
            while (w < s) {
                for (p = T, v = 0; v < s; ++v) {
                    AA = z[v];
                    if (AA >= o && AA < p) {
                        p = AA
                    }
                }
                r = w + 1;
                if (p - o > b((T - AB) / r)) {
                    a("overflow")
                }
                AB += (p - o) * r;
                o = p;
                for (v = 0; v < s; ++v) {
                    AA = z[v];
                    if (AA < o && ++AB > T) {
                        a("overflow")
                    }
                    if (AA == o) {
                        for (h = AB, u = N;; u += N) {
                            AD = u <= x ? P : (u >= x + R ? R : u - x);
                            if (h < AD) {
                                break
                            }
                            y = h - AD;
                            AC = N - AD;
                            l.push(Y(X(AD + y % AC, 0)));
                            h = b(y / AC)
                        }
                        l.push(Y(X(h, 0)));
                        x = D(AB, r, w == i);
                        AB = 0;
                        ++w
                    }
                }++AB;
                ++o
            }
            return l.join("")
        }

        function U(h) {
            return E(h, function(i) {
                return W.test(i) ? V(i.slice(4).toLowerCase()) : i
            })
        }

        function e(h) {
            return E(h, function(i) {
                return F.test(i) ? "xn--" + L(i) : i
            })
        }
        G = {
            version: "1.4.1",
            ucs2: {
                decode: M,
                encode: c
            },
            decode: V,
            encode: L,
            toASCII: e,
            toUnicode: U
        };
        Z.punycode = G
    })(B);
    B.sanitize = function(O, D) {
        if (!O) {
            return ""
        }
        D = D || {};
        D.ALLOWED_PROTOCOLS = D.ALLOWED_PROTOCOLS || ["https", "http"];
        D.RETURN_PUNYCODE = D.RETURN_PUNYCODE != false;
        D.ACTION = D.ACTION || A.sanitizeAction.ACTION_ENCODE;
        D.RETURN_OBJECT = D.RETURN_OBJECT || false;
        D.RETURN_ORIGINAL = D.RETURN_ORIGINAL || false;
        var H;
        var P = document.createElement("a");
        P.href = O;
        H = P.cloneNode(false);
        var R = H.protocol.slice(0, -1);
        var I = H.host;
        var E = H.port;
        var S = H.pathname;
        var K = H.hash;
        var Q = H.href;
        var C = true;
        var G = true;
        if (!D.RETURN_PUNYCODE) {
            I = B.punycode.toUnicode(I);
            Q = B.punycode.toUnicode(Q)
        } else {
            I = B.punycode.toASCII(I);
            Q = B.punycode.toASCII(Q)
        }
        if (D.ALLOWED_PROTOCOLS) {
            G = false;
            if (D.ALLOWED_PROTOCOLS.constructor === Array && D.ALLOWED_PROTOCOLS.length > 0) {
                for (var J = 0; J < D.ALLOWED_PROTOCOLS.length && G != true; J++) {
                    var F = D.ALLOWED_PROTOCOLS[J];
                    if (F.constructor === RegExp) {
                        if (F.test(R)) {
                            G = true
                        }
                    } else {
                        if (F.constructor === String) {
                            if (F == R) {
                                G = true
                            }
                        }
                    }
                }
            }
        } else {
            if (A.unsafeProtocolRegex.test(R)) {
                G = false
            }
        }
        if (D.ALLOWED_DOMAINS) {
            C = false;
            var N = B.punycode.toASCII(I);
            var L = B.punycode.toUnicode(I);
            if (D.ALLOWED_DOMAINS.constructor === Array && D.ALLOWED_DOMAINS.length > 0) {
                for (var J = 0; J < D.ALLOWED_DOMAINS.length && C != true; J++) {
                    var M = D.ALLOWED_DOMAINS[J];
                    if (M.constructor === RegExp) {
                        if (M.test(N) || M.test(L)) {
                            C = true
                        }
                    } else {
                        if (M.constructor === String) {
                            if (M == N || M == L) {
                                C = true
                            }
                        }
                    }
                }
            }
        }
        if (C) {
            if (G) {
                if (D.RETURN_OBJECT) {
                    return {
                        PROTOCOL: R,
                        DOMAIN: I,
                        PORT: E,
                        PATH: S,
                        HASH: K,
                        RESOLVED_URL: Q,
                        ORIGINAL_URL: O
                    }
                }
                if (D.RETURN_ORIGINAL) {
                    return O
                }
                return Q
            } else {
                if (D.ACTION == A.sanitizeAction.ACTION_ENCODE) {
                    return Q.replace(/:/, "%3A")
                }
            }
        }
        return ""
    };
    B.sanitize.config = {
        ACTION: A.sanitizeAction.ACTION_ENCODE,
        ALLOWED_PROTOCOLS: ["https", "http"],
        RETURN_PUNYCODE: true,
        RETURN_OBJECT: false,
        RETURN_ORIGINAL: false
    };
    if (Object.freeze) {
        B = Object.freeze(B)
    }
    ZSEC.util.defineProperty(ZSEC, "URLValidator", B, true, false, false, true)
})();
var HtmlPage_Config_Obj = {
    TAG_RULES: [{
        NAME: "iframe",
        ATTRIBUTE_RULES: [
        {
           NAME: "zc_mobileview",
           REGEX: /[a-zA-Z\-]+/

        },{
            NAME: "frameborder",
            LIST: ["0", "1"]
        }, {
            NAME: "sandbox",
            NOT_CONTAINS: ["allow-top-navigation", "allow-popups-to-escape-sandbox"],
            DEFAULT_VALUE: "allow-popups allow-forms allow-scripts allow-same-origin allow-presentation"
        }, {
            NAME: "allowtransparency",
            LIST: ["true", "false"]
        }, {
            NAME: "scrolling",
            LIST: ["yes", "no", "auto"],
            CASE_SENSITIVE: false
        }],
        APPEND_ATTRIBUTES: [{
            NAME: "sandbox",
            VALUE: "allow-popups allow-forms allow-scripts allow-same-origin allow-presentation"
        }]
    }, {
        NAME: "div",
        ATTRIBUTE_RULES: [
        {
            NAME: "zc_mobileview",
            REGEX: /[a-zA-Z\-]+/
        },{
            NAME: "elName",
            REGEX: /[a-zA-Z\-]+/
        }, {
            NAME: "formLinkName",
            REGEX: /[a-zA-Z0-9_]+/
        }, {
            NAME: "appLinkName",
            REGEX: /[a-zA-Z0-9_]+/
        }, {
            NAME: "viewLinkName",
            REGEX: /[a-zA-Z0-9_]+/
        }, {
            NAME: "reportLinkName",
            REGEX: /[a-zA-Z0-9_]+/
        }, {
            NAME: "sharedby",
            REGEX: /[A-Za-z0-9_.@]+/
        }, {
            NAME: "params",
            REGEX: /(([a-zA-Z0-9_]+)=([a-zA-Z0-9_-]+)&amp;)*([a-zA-Z0-9_]+)=([a-zA-Z0-9_-]+)/
        }, {
            NAME: "zcpage-headerhtml",
            LIST: ["true", "false"]
        }, {
            NAME: "zcpage-footerhtml",
            LIST: ["true", "false"]
        }, {
            NAME: "zcpage-spacing",
            REGEX: /([0-9]+)(px)*/
        }, {
            NAME: "zcpage-headerspacing-bottom",
            REGEX: /(([0-9]+)(px)*)/
        }, {
            NAME: "zcpage-headerspacing-top",
            REGEX: /(([0-9]+)(px)*)/
        }, {
            NAME: "zcpage-footerspacing-top",
            REGEX: /(([0-9]+)(px)*)/
        }, {
            NAME: "zcpage-footerspacing-bottom",
            REGEX: /(([0-9]+)(px)*)/
        }]
    }, {

        NAME: "a",
        ATTRIBUTE_RULES: [
        {
            NAME: "zc_mobileview",
            REGEX: /[a-zA-Z\-]+/
        }]

    }, {

         NAME: "zc_mobileviewport",
         ATTRIBUTE_RULES: [
         {
            NAME: "scale",
            REGEX: /[0-4]|[0-3].[0-9]/
         }]

    }, {

         NAME: "zc_mobile_invitation",
         ATTRIBUTE_RULES: [
         {
            NAME: "referralCode",
            REGEX: /.*/
         }]

    }],
    GLOBAL_ATTRIBUTES: ["zc_mobileview", "scale", "referralCode", "reportLinkName", "scrolling", "allowTransparency", "frameborder", "elName", "formLinkName", "appLinkName", "sharedby", "viewLinkName", "zcpage-headerhtml", "params", "zcpage-footerhtml", "zcpage-spacing", "zcpage-headerspacing-bottom", "zcpage-headerspacing-top", "accent-height", "accumulate", "additive", "alignment-baseline", "zcpage-footerspacing-top", "zcpage-footerspacing-bottom", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "clip", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "filter", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mode", "min", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "surfacescale", "targetx", "targety", "transform", "text-anchor", "text-decoration", "text-rendering", "textlength", "u1", "u2", "unicode", "values", "viewbox", "visibility", "vert-adv-y", "vert-origin-x", "vert-origin-y", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "y", "y1", "y2", "z", "zoomandpan"],
    GLOBAL_ELEMENTS: ["zc_mobileviewport", "zc_mobile_invitation", "link", "iframe", "div", "svg", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "line", "clippath", "defs", "desc", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feMerge", "feMergeNode", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence"],
    FORCE_BODY: true,
    STYLE_VALIDATION: false,
    ALLOWED_STYLE_PROPS: ["alignment-baseline", "baseline-shift", "clip-path", "clip-rule", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "fill", "fill-opacity", "fill-rule", "filter", "flood-color", "flood-opacity", "image-rendering", "kerning", "lighting-color", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "shape-rendering", "stop-color", "stop-opacity", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-anchor", "transform", "text-rendering", "writing-mode", "azimuth", "background", "background-attachment", "background-color", "background-image", "background-position", "content", "background-repeat", "border-collapse", "border-color", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "bottom", "caption-side", "clear", "color", "cue-after", "cue-before", "direction", "display", "elevation", "empty-cells", "float", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "height", "left", "letter-spacing", "line-height", "list-style-image", "list-style-position", "list-style-type", "marker-offset", "max-height", "max-width", "min-height", "min-width", "orphans", "outline-color", "overflow", "page-break-after", "page-break-before", "page-break-inside", "pause-after", "pause-before", "pitch", "pitch-range", "position", "richness", "right", "size", "speak", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "table-layout", "text-indent", "text-transform", "top", "unicode-bidi", "vertical-align", "visibility", "volume", "white-space", "widows", "width", "word-spacing", "border-style", "border-top-style", "border-right-style", "border-bottom-style", "border-left-style", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "border-width", "margin", "margin-top", "margin-right", "margin-bottom", "margin-left", "outline-style", "outline-width", "padding", "padding-top", "padding-right", "padding-bottom", "padding-left", "border", "border-top", "border-right", "border-bottom", "border-left", "cue", "list-style", "marks", "outline", "pause", "text-decoration", "border-spacing", "clip", "counter-increment", "clip", "cursor", "text-shadow", "font", "font-family", "page", "play-during", "text-align", "voice-family"],
    ALLOWED_STYLE: "ALL",
    EXTENDS: ["TAG_RULES", "GLOBAL_ELEMENTS", "GLOBAL_ATTRIBUTES", "FORCE_BODY", "ALLOWED_STYLE", "STYLE_VALIDATION", "ALLOWED_STYLE_PROPS", "GLOBAL_APPEND_ATTRIBUTES", "GLOBAL_ATTRIBUTE_RULES"]
};
var pageSanitizer = new ZSEC.HTMLPurifier(HtmlPage_Config_Obj);
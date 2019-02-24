void((function() {
    var defaultColor = '#50A038';

    function RGBtoHSL(RGBColor) {
        with(Math) {
            var R, G, B;
            var cMax, cMin;
            var sum, diff;
            var Rdelta, Gdelta, Bdelta;
            var H, L, S;
            R = RGBColor[0];
            G = RGBColor[1];
            B = RGBColor[2];
            cMax = max(max(R, G), B);
            cMin = min(min(R, G), B);
            sum = cMax + cMin;
            diff = cMax - cMin;
            L = sum / 2;
            if (cMax == cMin) {
                S = 0;
                H = 0;
            } else {
                if (L <= (1 / 2)) S = diff / sum;
                else S = diff / (2 - sum);
                Rdelta = R / 6 / diff;
                Gdelta = G / 6 / diff;
                Bdelta = B / 6 / diff;
                if (R == cMax) H = Gdelta - Bdelta;
                else if (G == cMax) H = (1 / 3) + Bdelta - Rdelta;
                else H = (2 / 3) + Rdelta - Gdelta;
                if (H < 0) H += 1;
                if (H > 1) H -= 1;
            }
            return [H, S, L];
        }
    }

    function getRGBColor(node, prop) {
        var rgb = getComputedStyle(node, null).getPropertyValue(prop);
        var r, g, b;
        if (/rgb\((\d+),\s(\d+),\s(\d+)\)/.exec(rgb)) {
            r = parseInt(RegExp.$1, 10);
            g = parseInt(RegExp.$2, 10);
            b = parseInt(RegExp.$3, 10);
            return [r / 255, g / 255, b / 255];
        }
        return rgb;
    }

    function hslToCSS(hsl) {
        return "hsl(" + Math.round(hsl[0] * 360) + ", " + Math.round(hsl[1] * 100) + "%, " + Math.round(hsl[2] * 100) + "%)";
    }
    var props = ["background-color", "border-left-color", "border-right-color", "border-top-color", "border-bottom-color"];
    var props2 = ["backgroundColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderBottomColor"];
    if (typeof getRGBColor(document.documentElement, "background-color") == "string") document.documentElement.style.background = defaultColor;
    revl(document.documentElement);

    function revl(n, parentNode) {
        var i, x, color, hsl;
        if (n.nodeType == Node.ELEMENT_NODE && n.nodeName != 'CODE' && (!parentNode || parentNode.nodeName != 'PRE') &&
            (typeof(n.className) !== "string" || n.className.indexOf("annotator-hl") === -1)) {
            for (i = 0; x = n.childNodes[i]; ++i) revl(x, n);
            for (i = 0; x = props[i]; ++i) {
                color = getRGBColor(n, x);
                if (typeof(color) != "string") {
                    if (x == "color") {
                        hsl = RGBtoHSL(color);
                        hsl[0] = 135 / 360;
                        hsl[1] = 0.38;
                        hsl[2] = 0.67;
                        n.style[props2[i]] = hslToCSS(hsl);
                    } else {
                        hsl = RGBtoHSL(color);
                        hsl[1] = hsl[1] / 7;
                        hsl[2] = 0.67 - 0.3 * (1 - hsl[2]);
                        hsl[0] = 135 / 360, hsl[1] = 0.38;
                        n.style[props2[i]] = hslToCSS(hsl);
                    }
                } else {
                    n.style.background = defaultColor;
                }
            }
        }
    }
})())

export default {
  getSafeRanges(dangerous) {
    var a = dangerous.commonAncestorContainer;
    // Starts -- Work inward from the start, selecting the largest safe range
    var s = new Array(0), rs = new Array(0);
    if (dangerous.startContainer != a)
        for(var i = dangerous.startContainer; i != a; i = i.parentNode)
            s.push(i)
    ;
    if (0 < s.length) for(var i = 0; i < s.length; i++) {
        var xs = document.createRange();
        if (i) {
            xs.setStartAfter(s[i-1]);
            xs.setEndAfter(s[i].lastChild);
        }
        else {
            xs.setStart(s[i], dangerous.startOffset);
            xs.setEndAfter(
                (s[i].nodeType == Node.TEXT_NODE)
                ? s[i] : s[i].lastChild
            );
        }
        rs.push(xs);
    }

    // Ends -- basically the same code reversed
    var e = new Array(0), re = new Array(0);
    if (dangerous.endContainer != a)
        for(var i = dangerous.endContainer; i != a; i = i.parentNode)
            e.push(i)
    ;
    if (0 < e.length) for(var i = 0; i < e.length; i++) {
        var xe = document.createRange();
        if (i) {
            xe.setStartBefore(e[i].firstChild);
            xe.setEndBefore(e[i-1]);
        }
        else {
            xe.setStartBefore(
                (e[i].nodeType == Node.TEXT_NODE)
                ? e[i] : e[i].firstChild
            );
            xe.setEnd(e[i], dangerous.endOffset);
        }
        re.unshift(xe);
    }

    // Middle -- the uncaptured middle
    if ((0 < s.length) && (0 < e.length)) {
        var xm = document.createRange();
        xm.setStartAfter(s[s.length - 1]);
        xm.setEndBefore(e[e.length - 1]);
    }
    else {
        return [dangerous];
    }

    rs.push(xm);
    var response = rs.concat(re);    

    return response;
  },
  checkHighlightedRange(range, styleIdentifier) {
    styleIdentifier = styleIdentifier || 'background-color: rgb(241, 241, 136)'
    const ranges = this.getSafeRanges(range)
    for (var i=0; i<ranges.length; i++) {
        const sr = ranges[i]
        // console.log(sr.startContainer)
        var el = sr.startContainer.parentNode
        // console.log(el)
        if (el.nodeName === 'SPAN') {
            const stlStr = el.getAttribute('style') || ''
            if (stlStr.includes(styleIdentifier)) {
                return true
            }
        }
    }
    return false
  },
  clearSelection() {
    // Clear selection
    if (window.getSelection().empty) {  
    // Chrome
    window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {  
    // Firefox
    window.getSelection().removeAllRanges();
    }
  }
}
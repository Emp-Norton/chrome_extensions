const addLabels = (a, b) => {
    spans = document.querySelectorAll('td[rowspan="1"]');
    markA = a ? a : "A:";
    markB = b ? b : "B:";
    spans[1].innerHTML = markA + '\n' + spans[1].innerHTML;
    spans[0].innerHTML = markB + '\n' + spans[0].innerHTML;
}


const addLabels = (a, b) => {
    let spans = document.querySelectorAll('td[rowspan="1"]');
    let markA = a ? a : "A:";
    let markB = b ? b : "B:";
    spans[1].innerHTML = markA + '\n' + spans[1].innerHTML;
    spans[0].innerHTML = markB + '\n' + spans[0].innerHTML;
}

const fixTimes = () => {
    Array.from($('time')).forEach((el)=>el.innerText+= '\n' + `${new Date(el.dateTime*1).toLocaleTimeString()}`)
}

module.exports = { fixTimes: fixTimes, addLabels: addLabels }
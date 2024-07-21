const addLabels = (a, b) => {
    let spans = document.querySelectorAll('td[rowspan="1"]');
    let markA = a ? a : "A:";
    let markB = b ? b : "B:";
    spans[1].innerHTML = markA + '\n' + spans[1].innerHTML;
    spans[0].innerHTML = markB + '\n' + spans[0].innerHTML;
}

const fixTimes = () => {
    Array.from(document.getElementsByTagName('time')).forEach((el)=> {
        let timeString = new Date(el.dateTime * 1).toLocaleTimeString();
        el.innerText+= '\n' + timeString
    })
}

module.exports = { fixTimes: fixTimes, addLabels: addLabels }
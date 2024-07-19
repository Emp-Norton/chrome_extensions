const addLabels = (a, b) => {
  spans = document.querySelectorAll('td[rowspan="1"]');
  markA = a ? a : "A:";
  markB = b ? b : "B:";
  spans[0].innerText = markA + '\n' + spans[0].innerText;
  spans[1].innerText = markB + '\n' + spans[1].innerText;
}

// TODO: Turn this into a chrome extension with little buttons for each function!

const addLocalTime = () => {
  Array.from($('time')).forEach((el)=>el.innerText+= '\n' + `${new Date(el.dateTime*1).toLocaleTimeString()}`)
}

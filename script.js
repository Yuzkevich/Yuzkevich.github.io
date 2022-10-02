const   workers = document.querySelectorAll('.workers__wraper .worker'),
        inputName = document.querySelector('.input_name'),
        inputAmount = document.querySelector('.input_amount'),
        add = document.querySelector('.add'),
        table = document.querySelector('.table__wraper'),
        formatArr = document.querySelectorAll('.format .check'),
        tipPaketaArr = document.querySelectorAll('.tip_paketa .check'),
        luvers = document.querySelector('.luvers .check'),
        vkleikaLent = document.querySelector('.vkleika_lent .check'),
        zpArr = document.querySelectorAll('.zp__wraper .zp'),
        butget = document.querySelector('.butget');


let workersCountAll = [0, 0, 0, 0, 0, 0, 0, 0];
if (localStorage.getItem('workersCountAll')) {
    workersCountAll = getMasivFromStr(localStorage.getItem('workersCountAll'));
    console.log(workersCountAll);
    butget.textContent = arrSum(workersCountAll) / 100;
}
let ocheredCount = 0;
if (localStorage.getItem('ocheredCount')) {
    ocheredCount = localStorage.getItem('ocheredCount');
    console.log('ok');
    console.log(ocheredCount);
}
let numOfTirag = 0;
if (localStorage.getItem('numOfTirag')) {
    numOfTirag = localStorage.getItem('numOfTirag');
}
if (numOfTirag > 0) {
    for (let i = 0; i < numOfTirag; i++) {
        renderLocalStorage(localStorage.getItem(`work${i}`), i);
    }
}



luvers.addEventListener('click', () => {
    if (luvers.classList.contains('check_active')) {
        luvers.classList.remove('check_active');
    } else {
        luvers.classList.add('check_active');
    }
});

vkleikaLent.addEventListener('click', () => {
    if (vkleikaLent.classList.contains('check_active')) {
        vkleikaLent.classList.remove('check_active');
    } else {
        vkleikaLent.classList.add('check_active');
    }
});


formatArr.forEach(item => {
    item.addEventListener('click', (e) => {
        formatArr.forEach(item => {
            if (item === e.target) {
                item.classList.add('check_active');
            } else {
                item.classList.remove('check_active');
            }
        });
    });
});

tipPaketaArr.forEach(item => {
    item.addEventListener('click', (e) => {
        tipPaketaArr.forEach(item => {
            if (item === e.target) {
                item.classList.add('check_active');
            } else {
                item.classList.remove('check_active');
            }
        });
    });
});

workers.forEach(item => {
    item.classList.add('active');
    item.addEventListener('click', (e) => {
        if (item === e.target) {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        }
    })
});

add.addEventListener('click', () => {
    if (inputName.value && inputAmount.value) {
        render(inputAmount.value);
    }
})

function getOstachaArr(num) {
    let res = [];
    while (num >= 5) {
        res.push(5);
        num -= 5;
    }
    if (num > 0) {
        res.push(num);
    }
    return res;
};

function getPrice() {
    let formatPrice = 0,
        tipPaketaPrice = 0,
        luversPrice = 0,
        vkleikaLentPrice = 0;

    formatArr.forEach(item => {
        if (item.classList.contains('check_active')) {
            if (item.getAttribute('id') == 'format-2') {
                formatPrice = 195;
            } else {
                formatPrice = 355;
            }
        }
    });

    tipPaketaArr.forEach(item => {
        if (item.getAttribute('id') === 'skleika-2' && item.classList.contains('check_active')) {
            tipPaketaPrice = 20;
        }
    });

    if (luvers.classList.contains('check_active')) {
        luversPrice = 20;
    }

    if (vkleikaLent.classList.contains('check_active')) {
        vkleikaLentPrice = 160;
    }

    return formatPrice + tipPaketaPrice + luversPrice + vkleikaLentPrice;
};

function render(num) {
    // numOfTirag++;
    let workersCount = 0;
    let byOneWorker = 0;
    workers.forEach((item, i) => {
        if (item.classList.contains('active')) {
            workersCount += 1;
        }
    });
    let allBy5 = Math.trunc(num / 5);
    byOneWorker = Math.trunc(allBy5 / workersCount);
    let ostacha = num - (byOneWorker* 5 * workersCount);
    let ostachaArr;
    let ostachaCount = 0;
    let byOneWorkerTableArr = [];


    if (ostacha) {
        ostachaArr = getOstachaArr(ostacha);
    }

    const nameTable = document.createElement('div');
    nameTable.classList.add('name');
    nameTable.classList.add(`a${numOfTirag}`);
    nameTable.textContent = inputName.value;
    table.append(nameTable);

    const amountTable = document.createElement('div');
    amountTable.classList.add('amount');
    amountTable.classList.add(`a${numOfTirag}`);
    amountTable.textContent = inputAmount.value;
    table.append(amountTable);

    workers.forEach((item, i) => {
        byOneWorkerTableArr[i] = document.createElement('div');
        byOneWorkerTableArr[i].classList.add('worker');
        byOneWorkerTableArr[i].classList.add(`a${numOfTirag}`);
        if (item.classList.contains('active')) {
            byOneWorkerTableArr[i].classList.add('active2');
            byOneWorkerTableArr[i].textContent = byOneWorker * 5;
            workersCountAll[i] += byOneWorker * 5 * getPrice();
        } else {
            byOneWorkerTableArr[i].textContent = '----';
        }
        table.append(byOneWorkerTableArr[i]);

    });

    if (ostacha) {
        while (ostachaArr[ostachaCount]) {
            if (byOneWorkerTableArr[ocheredCount].classList.contains('active2')) {
                byOneWorkerTableArr[ocheredCount].textContent = byOneWorker * 5 + ostachaArr[ostachaCount];
                workersCountAll[ocheredCount] += ostachaArr[ostachaCount] * getPrice();
                ostachaCount++;
                ocheredCount++;
                localStorage.setItem('ocheredCount', ocheredCount);
                if (ocheredCount > 7) {
                    ocheredCount = 0;
                    localStorage.setItem('ocheredCount', ocheredCount);
                }
            } else {
                ocheredCount++;
                localStorage.setItem('ocheredCount', ocheredCount);
                if (ocheredCount > 7) {
                    ocheredCount = 0;
                    localStorage.setItem('ocheredCount', ocheredCount);
                }
            }
        }
    }
    
    const priceTable = document.createElement('div');
    priceTable.classList.add('price');
    priceTable.classList.add(`a${numOfTirag}`);
    priceTable.textContent = getPrice() / 100;
    table.append(priceTable);

    inputName.value = '';
    inputAmount.value = '';
    console.log(workersCountAll);

    const edit = document.createElement('div');
    edit.classList.add('edit');
    edit.classList.add(`d${numOfTirag}`);
    edit.textContent = 'R';
    edit.id = numOfTirag;
    edit.addEventListener('click', (e) => {
        todoEdit(e.target);
    });
    // aditArr.push(edit);
    table.append(edit);

    const redWraper = document.createElement('div');
    redWraper.classList.add('red__wraper');
    redWraper.classList.add(`b${numOfTirag}`);
    table.append(redWraper);

    const submitEditIcon = document.createElement('div');
    submitEditIcon.classList.add('submit__edit');
    submitEditIcon.classList.add(`ok${numOfTirag}`);
    submitEditIcon.id = numOfTirag;
    submitEditIcon.textContent = 'OK';
    submitEditIcon.addEventListener('click', (e) => {
        submitEdit(e.target);
    });
    redWraper.append(submitEditIcon);

    //zp
    zpArr.forEach((item, i) => {
        item.textContent = workersCountAll[i] / 100;
        //input
        const red = document.createElement('input');
        red.classList.add('red');
        red.classList.add(`c${numOfTirag}`);
        red.type = 'number';
        redWraper.append(red);
    });

    //local Add
    localStorage.setItem(`work${numOfTirag}`, [nameTable.textContent, amountTable.textContent, byOneWorkerTableArr[0].textContent, byOneWorkerTableArr[1].textContent, byOneWorkerTableArr[2].textContent, byOneWorkerTableArr[3].textContent, byOneWorkerTableArr[4].textContent, byOneWorkerTableArr[5].textContent, byOneWorkerTableArr[6].textContent, byOneWorkerTableArr[7].textContent, priceTable.textContent, '']);
    // console.log(localStorage.getItem(`work${numOfTirag}`).length);

    numOfTirag++;
    localStorage.setItem('numOfTirag', numOfTirag);

    localStorage.setItem('workersCountAll', `${workersCountAll[0]},${workersCountAll[1]},${workersCountAll[2]},${workersCountAll[3]},${workersCountAll[4]},${workersCountAll[5]},${workersCountAll[6]},${workersCountAll[7]}`);

    butget.textContent = arrSum(workersCountAll) / 100;
};
//edit
function todoEdit(i) {
    i.style.display = 'none';
    let id = i.getAttribute('id');
    const editArr = document.querySelectorAll(`.a${id}`);
    const redWraper = document.querySelector(`.b${id}`);
    // const inputEditArr = document.querySelector(`.c${id}`);
    editArr.forEach(item => {
        item.style.display = 'none';
    });

    redWraper.style.display = 'block';
};

function submitEdit(i) {
    // i.style.display = 'none';
    let id = i.getAttribute('id');
    const editArr = document.querySelectorAll(`.a${id}`);
    const redWraper = document.querySelector(`.b${id}`);
    const inputEditArr = document.querySelectorAll(`.c${id}`);
    let editTotal = 0;

    inputEditArr.forEach((item, i) => {
        if (item.value) {
            if (+item.value === 0 && editArr[i + 2].textContent !== '----') {
                workersCountAll[i] = workersCountAll[i] - (+editArr[i + 2].textContent * (+editArr[10].textContent * 100));
                zpArr[i].textContent = workersCountAll[i] / 100;
                editArr[i + 2].textContent = '----';
            } else if(editArr[i + 2].textContent === '----' && +item.value !== 0) {
                workersCountAll[i] = workersCountAll[i] + (+item.value * (+editArr[10].textContent) * 100);
                zpArr[i].textContent = workersCountAll[i] / 100;
                editArr[i + 2].textContent = item.value;
            } else if (editArr[i + 2].textContent === '----' && +item.value === 0) {
                editArr[i + 2].textContent = '----';
            } else {
                workersCountAll[i] = workersCountAll[i] - (+editArr[i + 2].textContent * (+editArr[10].textContent * 100)) + (+item.value * (+editArr[10].textContent) * 100);
                zpArr[i].textContent = workersCountAll[i] / 100;
                editArr[i + 2].textContent = item.value;
                
            }
        }
    });

    for (let i = 2; i < 10; i++) {
        if (editArr[i].textContent !== '----') {
            editTotal += +editArr[i].textContent;
        }
    }
    editArr[1].textContent = editTotal;

    document.querySelector(`.d${id}`).style.display = 'inline-block';
    editArr.forEach((item, i) => {
        item.style.display = 'inline-block';
    });

    redWraper.style.display = 'none';

    localStorage.setItem(`work${id}`, [editArr[0].textContent, editArr[1].textContent, editArr[2].textContent, editArr[3].textContent, editArr[4].textContent, editArr[5].textContent, editArr[6].textContent, editArr[7].textContent, editArr[8].textContent, editArr[9].textContent, editArr[10].textContent, '']);

    localStorage.setItem('workersCountAll', `${workersCountAll[0]},${workersCountAll[1]},${workersCountAll[2]},${workersCountAll[3]},${workersCountAll[4]},${workersCountAll[5]},${workersCountAll[6]},${workersCountAll[7]}`);

    butget.textContent = arrSum(workersCountAll) / 100;
};

//local

function renderLocalStorage(str, num) {
    let byOneWorkerTableArr = [];
    let res = '';
    let arr = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] !== ',') {
            res += str[i];
        } else {
            arr.push(res);
            res = '';
        }
    }

    // num += 1;
    const nameTable = document.createElement('div');
    nameTable.classList.add('name');
    nameTable.classList.add(`a${num}`);
    nameTable.textContent = arr[0];
    table.append(nameTable);

    const amountTable = document.createElement('div');
    amountTable.classList.add('amount');
    amountTable.classList.add(`a${num}`);
    amountTable.textContent = arr[1];
    table.append(amountTable);

    for (let i = 0; i < 8; i++) {
        byOneWorkerTableArr[i] = document.createElement('div');
        byOneWorkerTableArr[i].classList.add('worker');
        byOneWorkerTableArr[i].classList.add(`a${num}`);
        byOneWorkerTableArr[i].textContent = arr[i + 2];
        table.append(byOneWorkerTableArr[i]);
    }
    
    const priceTable = document.createElement('div');
    priceTable.classList.add('price');
    priceTable.classList.add(`a${num}`);
    priceTable.textContent = arr[10];
    table.append(priceTable);

    const edit = document.createElement('div');
    edit.classList.add('edit');
    edit.classList.add(`d${num}`);
    edit.textContent = 'R';
    edit.id = num;
    edit.addEventListener('click', (e) => {
        todoEdit(e.target);
    });
    // aditArr.push(edit);
    table.append(edit);

    const redWraper = document.createElement('div');
    redWraper.classList.add('red__wraper');
    redWraper.classList.add(`b${num}`);
    table.append(redWraper);

    const submitEditIcon = document.createElement('div');
    submitEditIcon.classList.add('submit__edit');
    submitEditIcon.classList.add(`ok${num}`);
    submitEditIcon.id = num;
    submitEditIcon.textContent = 'OK';
    submitEditIcon.addEventListener('click', (e) => {
        submitEdit(e.target);
    });
    redWraper.append(submitEditIcon);

    //zp
    zpArr.forEach((item, i) => {
        item.textContent = workersCountAll[i] / 100;
        //input
        const red = document.createElement('input');
        red.classList.add('red');
        red.classList.add(`c${num}`);
        red.type = 'number';
        redWraper.append(red);
    });
};

function getMasivFromStr(str) {
    let test = '';
    let res = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] !== ',' && i !== str.length - 1) {
            test += str[i];
        } else if (i === str.length - 1) {
            test += str[i];
            res.push(+test);
        } else {
            res.push(+test);
            test = '';
        }
    }

    return res;
};

function arrSum(arr) {
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
        res += arr[i];
    }
    return res;
};

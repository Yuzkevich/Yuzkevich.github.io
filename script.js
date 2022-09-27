const   workers = document.querySelectorAll('.workers__wraper .worker'),
        inputName = document.querySelector('.input_name'),
        inputAmount = document.querySelector('.input_amount'),
        add = document.querySelector('button'),
        table = document.querySelector('.table__wraper'),
        formatArr = document.querySelectorAll('.format .check'),
        tipPaketaArr = document.querySelectorAll('.tip_paketa .check'),
        luvers = document.querySelector('.luvers .check'),
        vkleikaLent = document.querySelector('.vkleika_lent .check'),
        zpArr = document.querySelectorAll('.zp__wraper .zp');

// let svetaCount = 0, lenaCount = 0, natashaCount = 0, lydaCount = 0, annCount = 0, serhiiCount = 0, alenaCount = 0, natashaTonyaCount = 0;
let workersCountAll = [0, 0, 0, 0, 0, 0, 0, 0];
// let workersCountAllSecond = [0, 0, 0, 0, 0, 0, 0, 0];
let ocheredCount = 0;
let numOfTirag = 0;


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
    render(inputAmount.value);
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
                formatPrice = 1.95;
            } else {
                formatPrice = 3.6;
            }
        }
    });

    tipPaketaArr.forEach(item => {
        if (item.getAttribute('id') === 'skleika-2' && item.classList.contains('check_active')) {
            tipPaketaPrice = 0.2;
        }
    });

    if (luvers.classList.contains('check_active')) {
        luversPrice = 0.2;
    }

    if (vkleikaLent.classList.contains('check_active')) {
        vkleikaLentPrice = 1.6;
    }

    return formatPrice + tipPaketaPrice + luversPrice + vkleikaLentPrice;
};

function render(num) {
    numOfTirag++;
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
    nameTable.textContent = `${numOfTirag}` + inputName.value;
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
                if (ocheredCount > 7) {
                    ocheredCount = 0;
                }
            } else {
                ocheredCount++;
                if (ocheredCount > 7) {
                    ocheredCount = 0;
                }
            }
        }
    }
    
    const priceTable = document.createElement('div');
    priceTable.classList.add('price');
    priceTable.classList.add(`a${numOfTirag}`);
    priceTable.textContent = getPrice();
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
        item.textContent = workersCountAll[i];
        //input
        const red = document.createElement('input');
        red.classList.add('red');
        red.classList.add(`c${numOfTirag}`);
        red.type = 'number';
        redWraper.append(red);
    });
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
    console.log(+editArr[10].textContent + 1);

    inputEditArr.forEach((item, i) => {
        if (item.value) {
            if (+item.value === 0) {
                editArr[i + 2].textContent = '----';
            } else {
                workersCountAll[i] = workersCountAll[i] - (+editArr[i + 2].textContent * +editArr[10].textContent) + (+item.value * +editArr[10].textContent);
                workersCountAll[i] = 
                zpArr[i].textContent = workersCountAll[i];
                editArr[i + 2].textContent = item.value;
                
            }
        }
    });

    document.querySelector(`.d${id}`).style.display = 'inline-block';
    editArr.forEach((item, i) => {
        item.style.display = 'inline-block';
    });

    redWraper.style.display = 'none';
}

// const xxx = 2378;
// console.log(`${Math.trunc(xxx / 100)}.${xxx % 100}`);

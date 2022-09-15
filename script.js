const billInput = document.querySelector('#bill-input')
const tipBtns = document.querySelectorAll('.tip-percentage')
const nrPersons = document.querySelector('#people-input')
const amountDisplays = document.querySelectorAll('.total-amount')
const resetBtn = document.querySelector('.reset-btn')
const customTipInput = document.querySelector('.tip-percentage-custom')

const calculateTip = (btn) => {
    let percentageAmount;
    if(btn.nodeName) {
        percentageAmount = btn.innerText.slice(0, -1)
    } else {
        percentageAmount = btn
    }
    let billAmount = billInput.value
    let personsAmount = nrPersons.value

    let tipTotal = ((billAmount/100) * percentageAmount).toFixed(2)
    let tipPerPerson = ((tipTotal + parseInt(billAmount)) / parseInt(personsAmount)).toFixed(2)
    let totalPlusTipPerson = ((parseInt(billAmount) / personsAmount) + parseInt(tipPerPerson)).toFixed(2)

    return [tipPerPerson, totalPlusTipPerson]

}

tipBtns.forEach((btn) => {
    btn.addEventListener('click', () => {

        if(!billInput.value|| !nrPersons.value) {
            window.alert('Please enter valid numbers!')
            return
        }
        for(let i=0; i<tipBtns.length; i++) {
            tipBtns[i].classList.remove('active')
        }
        btn.classList.add('active')

        let tips = calculateTip(btn);
        amountDisplays[0].innerText = `$${tips[0]}`
        amountDisplays[1].innerText = `$${tips[1]}`
    })
})

customTipInput.addEventListener('input', (el) => {
    let tip = calculateTip(el.target.value)

    amountDisplays[0].innerText = `$${tip[0]}`;
    amountDisplays[1].innerText = `$${tip[1]}`;

    for(let i=0; i<tipBtns.length; i++) {
        tipBtns[i].classList.remove('active')
    }
})

resetBtn.addEventListener('click', () => {
    billInput.value = '';
    nrPersons.value = '';
    customTipInput.value = '';
    amountDisplays[0].innerText = '$0.00'
    amountDisplays[1].innerText = '$0.00'
})
//start the game
const startBtn = document.getElementById('start-btn');
const startDiv = document.getElementById('start');
const control = document.querySelector('.control');
const nameIn = document.getElementById('nameIn');
const name_ = document.getElementById('name');
startBtn.addEventListener('click', () => {
    if (nameIn.value == ''){
        name_.textContent = `Unknown`;
    }else{
        name_.textContent = `${nameIn.value}`;
    }
    control.classList.toggle('up');
    startDiv.style.display = 'none';
})

//rulls
const cont = document.querySelector('.conter');
const chances = document.querySelector('.chances');
const cards = Array.from(document.querySelectorAll('.card'));
const end = document.getElementById('end');
const win = document.getElementById('win');

let conter = 0;
let clickedCard = 0;
let infoCard = '';
let matcher ;
let choosewrite = 0;

cards.forEach((card) => {
    card.addEventListener('click', (e) => {
        clickedCard++;

        if(clickedCard >= 2){
            if(infoCard == card.getAttribute('data-tec')) {
                card.classList.add('done');
                matcher.classList.add('done');
                choosewrite++;
                //end the game by winning
                if(choosewrite == 8){
                    win.style.display = 'block';
                }
                clickedCard = 0;
            }else{
                conter++;
                card.classList.toggle('flip');
                setTimeout(() => {     
                    cards.forEach((item) => {
                        item.classList.remove('flip');
                        clickedCard = 0;
                    })
                },500);
                //end the game by losing
                if(conter >= 8){
                    end.style.display = 'block';
                }
            }
        }else{
            card.classList.toggle('flip');
            infoCard = card.getAttribute('data-tec');
            matcher = card;
            console.log(card);
        }
        chances.textContent = `${8 - conter}`;
        cont.textContent = `${conter}`;
    })
})

let orderRange = [...Array(cards.length).keys()];

function shuffle (array) {
    let current = array.length,
        temp,random;

    while(current > 0) {
        random = Math.floor(Math.random() * current);
        current--;

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}
console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);

cards.forEach((card, indx) => {
    card.style.order = orderRange[indx];
})

const playAgain = Array.from(document.querySelectorAll('.start-btn'));
playAgain.forEach((btn) => {
    btn.addEventListener('click', () => {
        location.reload()
    })
})

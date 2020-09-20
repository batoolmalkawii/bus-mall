'use strict'

const maxRounds = 25;
let round = 1;
const paths = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg'
];

const leftImgEl = document.getElementById('leftImg');
const midImgEl = document.getElementById('midImg');
const rightImgEl = document.getElementById('rightImg');
const imgSection = document.getElementById('imgSection');
const roundsEl = document.getElementById('rounds');


function Product(path) {
    this.name = getName(path);
    this.path = `img/${path}`;
    this.clicks = 0;
    this.shown = 0;
    Product.all.push(this);
}

Product.all = [];
for (let i = 0; i < paths.length; i++) {
    new Product(paths[i]);
}
function render() {
    const leftIndex = getRandNum(0, Product.all.length - 1);
    const midIndex = getMidIndex(leftIndex);
    const rightIndex = getRightIndex(leftIndex, midIndex);
    leftImgEl.src = Product.all[leftIndex].path;
    midImgEl.src = Product.all[midIndex].path;
    rightImgEl.src = Product.all[rightIndex].path;
    leftImgEl.alt = Product.all[leftIndex].name;
    midImgEl.alt = Product.all[midIndex].name;
    rightImgEl.alt = Product.all[rightIndex].name;
    leftImgEl.title = Product.all[leftIndex].name;
    midImgEl.title = Product.all[midIndex].name;
    rightImgEl.title = Product.all[rightIndex].name;
    Product.all[leftIndex].shown += 1;
    Product.all[midIndex].shown += 1;
    Product.all[rightIndex].shown += 1;
    roundsEl.textContent = `Round ${round} out of ${maxRounds}`;

}

imgSection.addEventListener('click', clickHandler);
function clickHandler(event) {
    if (event.target.id !== 'imgSection') {
        for (let i = 0; i < Product.all.length; i++) {
            if (Product.all[i].name === event.target.title) {
                Product.all[i].clicks += 1;
            }
        }
        round++;
        if (round <= maxRounds) {
            render();
        } else {
            imgSection.removeEventListener('click', clickHandler);
            roundsEl.textContent = `Results`;

        }
    }
    console.log(Product.all);
}
render();
// helper functions
function getName(path) {
    const name = path.split('.')[0];
    return (name);
}
function getRandNum(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)));
}
function getMidIndex(leftIndex) {
    let midIndex = getRandNum(0, Product.all.length - 1);
    while (midIndex === leftIndex) {
        midIndex = getRandNum(0, Product.all.length - 1)
    }
    return (midIndex);
}
function getRightIndex(leftIndex, midIndex) {
    let rightIndex = getRandNum(0, Product.all.length - 1);
    while (rightIndex === leftIndex || rightIndex === midIndex) {
        rightIndex = getRandNum(0, Product.all.length - 1)
    }
    return (rightIndex);
}


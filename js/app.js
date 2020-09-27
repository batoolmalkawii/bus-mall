'use strict'
//array to store previous indices
let prevIndex = [];
// number of maximum round
const maxRounds = 25;
// round counter
let round = 1;
// the products image paths
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

// getting the section of the images we want to fill
const leftImgEl = document.getElementById('leftImg');
const midImgEl = document.getElementById('midImg');
const rightImgEl = document.getElementById('rightImg');
const imgSection = document.getElementById('imgSection');
const roundsEl = document.getElementById('rounds');
const buttonEl = document.createElement('button');
const aEl = document.createElement('a');

// Product constructor
function Product(path, shown =0, clicks = 0) {
  this.name = getName(path);
  this.path = `img/${path}`;
  this.clicks = clicks;
  this.shown = shown;
  Product.all.push(this);
}

Product.all = [];
for (let i = 0; i < paths.length; i++) {
  new Product(paths[i]);
}
// save to local storage
function setProducts(){
  localStorage.setItem('products', JSON.stringify(Product.all));
}
// get from local storage
function getProducts(){
  let productsArray = JSON.parse(localStorage.getItem('products'));
  if (productsArray){
    Product.all = [];
    for (let i=0;i<productsArray.length;i++){
      new Product(productsArray[i].path.split('/')[1], productsArray[i].shown, productsArray[i].clicks);
    }
  }
  render();
}

// render the page each time it loads
// choosing products
// filling the section with images
function render() {
  const leftIndex = getLeftIndex();
  const midIndex = getMidIndex(leftIndex);
  const rightIndex = getRightIndex(leftIndex, midIndex);
  prevIndex = [leftIndex, midIndex, rightIndex];
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
// handle clicking on an image
imgSection.addEventListener('click', clickHandler);
function clickHandler(event) {
  if (event.target.id !== 'imgSection') {
    for (let i = 0; i < Product.all.length; i++) {
      if (Product.all[i].name === event.target.title) {
        Product.all[i].clicks += 1;
      }
    }
    round++;
    setProducts();
    if (round <= maxRounds) {
      render();
    } else {
      imgSection.removeEventListener('click', clickHandler);
      roundsEl.textContent = '';
      createButton();
      createChart();
    }
  }
}
// helper functions
function getName(path) {
  const name = path.split('.')[0];
  return (name);
}
// generates a random number in a specific range
function getRandNum(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)));
}

//tests if the images are shown in the previous round
function isPrev(index) {
  for (let i = 0; i < prevIndex.length; i++) {
    if (index === prevIndex[i]) {
      return (true);
    }
  }
  return (false);
}

// chooses first image (no previous)
function getLeftIndex() {
  let leftIndex = getRandNum(0, Product.all.length - 1);
  while (isPrev(leftIndex)) {
    leftIndex = getRandNum(0, Product.all.length - 1);
  }
  return (leftIndex);
}

// chooses second image (no duplicates + no previous)
function getMidIndex(leftIndex) {
  let midIndex = getRandNum(0, Product.all.length - 1);
  while (isPrev(midIndex) || midIndex === leftIndex) {
    midIndex = getRandNum(0, Product.all.length - 1);
  }
  return (midIndex);
}

// chooses third image (no duplicates + no previous)
function getRightIndex(leftIndex, midIndex) {
  let rightIndex = getRandNum(0, Product.all.length - 1);
  while (isPrev(rightIndex) || rightIndex === leftIndex || rightIndex === midIndex) {
    rightIndex = getRandNum(0, Product.all.length - 1);
  }
  return (rightIndex);
}

// displays button of results
function createButton() {
  roundsEl.appendChild(aEl);
  aEl.appendChild(buttonEl);
  buttonEl.id = 'button';
  buttonEl.addEventListener('click', showResults);
  buttonEl.textContent = 'Results';
}

// displays the results in an unordered list
function showResults() {
  imgSection.style.display = 'none';
  resultsTable();
  buttonEl.textContent = 'Play Again';
  buttonEl.addEventListener('click', playAgain);
}

//draws the table of results
function resultsTable() {
  const ulCont = document.getElementById('results');
  ulCont.style.background = '#ddd';
  const ulEl = document.createElement('ul');
  ulCont.appendChild(ulEl);
  for (let i = 0; i < Product.all.length; i++) {
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${Product.all[i].name} had ${Product.all[i].clicks} votes and was shown ${Product.all[i].shown} times`;
  }
}

// creates a link to play again button
function playAgain() {
  aEl.href = 'index.html';
}

// creates results chart
function createChart() {
  const ctx = document.getElementById('chart');
  ctx.style.display = 'block';
  const productNames = [];
  const clicks = [];
  const shown = [];
  for (let i = 0; i < Product.all.length; i++) {
    productNames.push(Product.all[i].name);
    clicks.push(Product.all[i].clicks);
    shown.push(Product.all[i].shown);
  }
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [
        {
          label: '# of Views',
          data: shown,
          backgroundColor: [
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
          ],
          borderColor: [
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
            '#de6069',
          ],
          borderWidth: 1,
        },
        {
          label: '# of Clicks',
          data: clicks,
          backgroundColor: [
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
          ],
          borderColor: [
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
            '#00876c',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
//calling functions
render();
getProducts();


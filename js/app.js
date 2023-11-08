const productImagesContainer = document.getElementById('productImages');
const reportContainer = document.getElementById('report');

const image1 = document.querySelector('#productImages img:first-child');
const image2 = document.querySelector('#productImages img:nth-child(2)');
const image3 = document.querySelector('#productImages img:nth-child(3)');

const button = document.getElementById('viewResults');

let state = {
  numClicks: 0,
  numClicksAllowed: 25,
  allProductImages: [],
};

function Products( name, image ) {
  this.name = name;
  this.imageFile = image;
  this.votes = 0;
  this.views = 0;
  state.allProductImages.push(this);
}

function renderProducts(){
  function pickRandomProduct() {
    return Math.floor( Math.random() * state.allProductImages.length );
  }

  let product1, product2, product3;

  product1 = pickRandomProduct();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    product2 = pickRandomProduct();
    if (product2 !== product1) {
      break;
    }
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    product3 = pickRandomProduct();
    if (product3 !== product1 && product3 !== product2) {
      break;
    }
  }

  // put the products on screen
  // <img src="" alt="" />
  image1.src = state.allProductImages[product1].imageFile;
  image1.alt = state.allProductImages[product1].name;

  image2.src = state.allProductImages[product2].imageFile;
  image2.alt = state.allProductImages[product2].name;

  image3.src = state.allProductImages[product3].imageFile;
  image3.alt = state.allProductImages[product3].name;

  state.allProductImages[product1].views++;
  state.allProductImages[product2].views++;
  state.allProductImages[product3].views++;
}

function renderResultsButton() {
  button.style.display = 'block';
}


function renderResults() {

  // Create Canvas Chart
  // Collect the results from votes into arrays in order to feed the chart data

  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for( let i = 0; i < state.allProductImages.length; i++) {
    productNames.push( state.allProductImages[i].name );
    productVotes.push( state.allProductImages[i].votes);
    productViews.push( state.allProductImages[i].views);
  }

  console.log(productNames);
  console.log(productVotes);
  console.log(productViews);

  const data = {
    labels: productNames,
    datasets: [
      {
        label: 'Votes',
        data: productVotes,
        borderWidth: 1,
        backgroundColor: [
          '#AAE2C3'
        ]
      },
      {
        label: "Views",
        data: productViews,
        borderWidth: 1,
        backgroundColor: ['#D2C0E0']
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // reportContainer is the HTML <canvas> element for chartJS
  const myChart = new Chart(reportContainer, config);
}


function handleClick(event) {
  let productName = event.target.alt;

  for (let i = 0; i < state.allProductImages.length; i++ ) {
    if( productName === state.allProductImages[i].name) {
      state.allProductImages[i].votes++;
      break;
    }
  }

  state.numClicks++;

  if(state.numClicks >= state. numClicksAllowed) {
    removeListener();

    renderResultsButton();
  } else {
    renderProducts();
  }
}

function setupListeners() {
  productImagesContainer.addEventListener('click', handleClick);
  button.addEventListener('click', renderResults);
}

function removeListener() {
  productImagesContainer.removeEventListener('click', handleClick);
}

new Products('bag', 'img/bag.jpg');
new Products('banana', 'img/banana.jpg');
new Products('bathroom', 'img/bathroom.jpg');
new Products('boots', 'img/boots.jpg');
new Products('breakfast', 'img/breakfast.jpg');
new Products('bubblegum', 'img/bubblegum.jpg');
new Products('chair', 'img/chair.jpg');
new Products('cthulhu', 'img/cthulhu.jpg');
new Products('dog-duck', 'img/dog-duck.jpg');
new Products('dragon', 'img/dragon.jpg');
new Products('pen', 'img/pen.jpg');
new Products('pet-sweep', 'img/pet-sweep.jpg');
new Products('scissors', 'img/scissors.jpg');
new Products('shark', 'img/shark.jpg');
new Products('sweep', 'img/sweep.png');
new Products('tauntaun', 'img/tauntaun.jpg');
new Products('unicorn', 'img/unicorn.jpg');
new Products('water-can', 'img/water-can.jpg');
new Products('wine-glass', 'img/wine-glass.jpg');

renderProducts();
setupListeners();




















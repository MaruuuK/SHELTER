// Array of pets

const defaultPets = [
    {
        "name": "Jennifer",
        "img": "../../assets/images/pets-jennifer.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Sophia",
        "img": "../../assets/images/pets-sophia.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Woody",
        "img": "../../assets/images/pets-woody.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
    },
    {
        "name": "Scarlett",
        "img": "../../assets/images/pets-scarlett.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Katrine",
        "img": "../../assets/images/pets-katrine.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Timmy",
        "img": "../../assets/images/pets-timmy.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
    },
    {
        "name": "Freddie",
        "img": "../../assets/images/pets-freddie.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Charly",
        "img": "../../assets/images/pets-charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    }
];

let pets = [];

// TEMPLATES
const cardTemplate = `<div class="pet-card" data-id="{{ID}}">
    <figure>
        <img src="{{IMG_URL}}" alt="{{ALT}}">
        <figcaption>{{NAME}}</figcaption>
    </figure>
    <span class="btn btn-light btn-learn-more">Learn more</span>
</div>`;

// GENERATE CARDS

function getRandomNumber(limit) {
    return Math.floor(Math.random() * limit);
}

function getCardsCount() {
    let windowWidth = document.documentElement.clientWidth;

    if (windowWidth < 768) {
        return 3;
    }
    if (windowWidth < 1280) {
        return 6;
    }
    return 8;
}

const cardsCount = getCardsCount();
let pageCount = getPageCount();

(function () {
    for (let i = 0; i < pageCount; i++) {
        let currentlyUsed = [];
        while (currentlyUsed.length < cardsCount) {
            const id = getRandomNumber(defaultPets.length);
            const data = defaultPets[id];
            if (currentlyUsed.includes(data.name)) {
                continue;
            }
            pets.push(data);
            currentlyUsed.push(data.name);
        }
    }
    console.log(pets);
})()

function getPageCount() {
    return Math.ceil(48 / getCardsCount());
}

//Display cards per page
let currentPage = 1;
const petsCards = document.querySelector('.pets-cards');
const paginationPage = document.getElementById('paginator-count');



function displayCards() {
    petsCards.innerHTML = "";

    let start = cardsCount * (currentPage - 1);
    let end = start + cardsCount;
    let paginationItems = pets.slice(start, end);

    for (let i = 0; i < paginationItems.length; i++) {
        petsCards.innerHTML += cardTemplate
            .replace("{{IMG_URL}}", paginationItems[i].img)
            .replace("{{NAME}}", paginationItems[i].name)
            .replace("{{ID}}", i + start)
            .replace("{{ALT}}", paginationItems[i].name);
    }

    paginationPage.innerHTML = currentPage;

    let cards = document.querySelectorAll('.pet-card');
    cards.forEach(card => card.addEventListener('click', clickPopup));
}

displayCards();

const leftLastPage = document.getElementById('left-last-page');
const leftPage = document.getElementById('left-page');
const rightLastPage = document.getElementById('right-last-page');
const rightPage = document.getElementById('right-page');

rightPage.addEventListener('click', function (e) {
    if (e.target.classList.contains("disabled")) {
        return;
    }
    currentPage++;
    displayCards();

    if (currentPage === pageCount) {
        rightPage.classList.add("disabled");
        rightLastPage.classList.add('disabled');
    } else if (currentPage > 1) {
        leftLastPage.classList.remove('disabled');
        leftPage.classList.remove('disabled');
    }
})

rightLastPage.addEventListener('click', function (e) {
    if (e.target.classList.contains("disabled")) {
        return;
    }
    currentPage = pageCount;
    displayCards();
    if (currentPage === pageCount) {
        rightPage.classList.add("disabled");
        rightLastPage.classList.add('disabled');
        leftLastPage.classList.remove('disabled');
        leftPage.classList.remove('disabled');
    }

})

leftPage.addEventListener('click', function (e) {
    if (e.target.classList.contains("disabled")) {
        return;
    }
    currentPage--;
    displayCards();
    rightLastPage.classList.remove('disabled');
    rightPage.classList.remove('disabled');
    if (currentPage === 1) {
        leftPage.classList.add("disabled");
        leftLastPage.classList.add('disabled');
    }
})

leftLastPage.addEventListener('click', function (e) {
    if (e.target.classList.contains("disabled")) {
        return;
    }
    currentPage = 1;
    displayCards();
    leftPage.classList.add("disabled");
    leftLastPage.classList.add('disabled');
    rightLastPage.classList.remove('disabled');
    rightPage.classList.remove('disabled')
})

//OVERLAY

let body = document.querySelector('body');

function closeOverlay() {
    body.classList.remove('overlay');
    popup.classList.remove('open');
    body.classList.remove('burger-menu');
}

body.addEventListener('click', function (e) {
    if (e.target.nodeName === 'BODY') {
        closeOverlay();
    }
});

window.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') {
        closeOverlay();
    }
});


// POPUP
let popup = document.getElementById('popup-window');
let popupClose = document.querySelector('.close-btn');

function clickPopup(e) {
    let idCard = e.currentTarget.dataset.id;
    let img = document.getElementById('popup-img');
    img.src = pets[idCard].img;
    img.alt = pets[idCard].name;
    document.getElementById('popup-name').innerHTML = pets[idCard].name;
    document.getElementById('popup-type').innerHTML = pets[idCard].type;
    document.getElementById('popup-breed').innerHTML = pets[idCard].breed;
    document.getElementById('popup-description').innerHTML = pets[idCard].description;
    document.getElementById('popup-age').innerHTML = pets[idCard].age;
    document.getElementById('popup-inoculations').innerHTML = pets[idCard].inoculations;
    document.getElementById('popup-diseases').innerHTML = pets[idCard].diseases;
    document.getElementById('popup-parasites').innerHTML = pets[idCard].parasites;
    body.classList.add('overlay');
    popup.classList.add('open');
}

popupClose.addEventListener('click', function () {
    closeOverlay();
});
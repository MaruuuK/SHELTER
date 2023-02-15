const pets = [
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

const cardTemplate = `<div class="pet-card">
    <figure>
        <img src="{{IMG_URL}}" alt="">
        <figcaption>{{NAME}}</figcaption>
    </figure>
    <span data-id="{{ID}}" class="btn btn-light btn-learn-more">Learn more</span>
</div>`;

const cardsCount = getCardsCount();
let isUsedCard = [];
function getCards(leftUse, rightUse) {
    let result = [];

    let currentlyUsed = [];
    while (result.length < cardsCount) {
        const id = getRandomNumber(pets.length);
        const data = pets[id];
        if ((leftUse && data["leftUse"]) || (rightUse && data["rightUse"]) || currentlyUsed.includes(id)) {
            continue;
        }
        result.push(
            cardTemplate
                .replace("{{IMG_URL}}", data.img)
                .replace("{{NAME}}", data.name)
                .replace("{{ID}}", id)
        );
        currentlyUsed.push(id);
    }

    for (let id = 0; id < pets.length; id++) {
        const isUsed = currentlyUsed.includes(id);
        pets[id]["leftUse"] = isUsed && leftUse;
        pets[id]["rightUse"] = isUsed && rightUse;
    }

    return result;
}

function getRandomNumber(limit) {
    return Math.floor(Math.random() * limit);
}

function getCardsCount() {
    /* let  windowWidth = document.documentElement.clientWidth;
 
     if (windowWidth < 768) {
         return 1;
     }
     if (windowWidth < 1280) {
         return 2;
     }*/
    return 3;
}

function getSliderWidth() {
    /* let windowWidth = document.documentElement.clientWidth;
 
     if (windowWidth < 768) {
         return 990;
     }
     if (windowWidth < 1280) {
         return 990;
     }*/
    return 990;
}

(function () {
    let container = document.getElementById("slider-container");
    let wrapper = document.getElementById("slider-wrapper");
    let leftBtn = document.getElementById("slider-left-btn");
    let rightBtn = document.getElementById("slider-right-btn");
    let sliderWidth = getSliderWidth();
    let sliderWrapperWidth = sliderWidth;
    let sliderWrapperMargin = 0;
    container.style.width = sliderWidth + "px";

    for (const card of getCards(true, true)) {
        wrapper.innerHTML = wrapper.innerHTML + card;
    }

    leftBtn.addEventListener("click", function (e) {
        const slideLeft = function () {
            sliderWrapperMargin += sliderWidth + 90;
            wrapper.style.marginLeft = sliderWrapperMargin + "px";
        }

        if (sliderWrapperMargin === 0) {
            const transit = wrapper.style.transition;
            wrapper.style.transition = "none";
            sliderWrapperMargin -= sliderWidth + 90;
            wrapper.style.marginLeft = sliderWrapperMargin + "px";
            for (const card of getCards(true, false)) {
                wrapper.innerHTML = card + wrapper.innerHTML;
            }
            // Add timeout to make transition working
            setTimeout(function () {
                wrapper.style.transition = transit;
                slideLeft();
            }, 0)
        } else {
            slideLeft();
        }

        e.preventDefault();
    });

    rightBtn.addEventListener("click", function (e) {
        sliderWrapperMargin -= sliderWidth + 90;
        wrapper.style.marginLeft = sliderWrapperMargin + "px";
        if (-sliderWrapperMargin >= sliderWrapperWidth - sliderWidth) {
            for (const card of getCards(false, true)) {
                wrapper.innerHTML = wrapper.innerHTML + card;
                isUsedCard.push
            }
        }
        e.preventDefault();
    });
})();

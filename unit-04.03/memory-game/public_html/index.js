const FRONT = 0;
const BACK = 1;

/**
 * All the logic starts here. Just when the page is fully loaded.
 * 
 * @type type
 */
window.addEventListener('DOMContentLoaded', function ()
{
    let mainDiv = document.querySelector('#main');

    addCards(3, mainDiv);

    let flipper = flipClosure();

    mainDiv.addEventListener('click', function (e)
    {
        flipper(e);
    });
});


/**
 * 
 * @param {type} card
 * @returns {Boolean}
 */
function isFaceUp(card)
{
    return card.dataset.faceup === 'true';
}

function getFace( card, n )
{
    console.log( card, n, card.children[n]);
    return card.children[n];
}


function flipClosure()
{
    let pairIndex = 0;
    let pairArray = [];
    let viewing_cards = false;

    let timeout = function ()
    {
        return setTimeout(function ()
        {
            flipCard(pairArray[ 0 ]);
            flipCard(pairArray[ 1 ]);
            viewing_cards = false;
        }, 3000);
    };
    let timeoutId;

    return function (e)
    {
        // If it's not a card, do nothing.
        if ( e.target.parentElement.dataset.pairid === undefined )
        {
            
            return;
        }
        
        let card = e.target.parentElement;
        
        // If the card is face up, do nothing.
        if (isFaceUp(card))
        {
            return;
        }
        
        // Cancels the timeout and flip the cards with face up
        if (viewing_cards)
        {
           clearTimeout( timeoutId );
           flipCard(pairArray[ 0 ]);
           flipCard(pairArray[ 1 ]);
           viewing_cards = false;
        }
        
        // Updates the pair array
        pairArray[ pairIndex ] = e.target.parentElement;
        
        // Flips the current card
        flipCard(card);
        
        // Checks if the visible card matches
        if (pairIndex++ === 1)
        {
            pairIndex = 0;
            // Yes. Changes their front color and keeps them open.
            if (pairArray[ 0 ].dataset.pairid === pairArray[ 1 ].dataset.pairid)
            {
                console.log("You got it!");
                getFace(pairArray[0], FRONT).classList.add('matched');
                getFace(pairArray[1], FRONT).classList.add('matched');
            } 
            // No. Sets timeout for flipping the cards and
            // set the status to "viewing cards" (which can be interrupted)
            else
            {
                viewing_cards = true;
                timeoutId = timeout();
            }
        }
    };
}


/**
 * Flips a card back to front, and vice-versa.
 * 
 * @param {type} card
 * @returns {undefined}
 */
function flipCard(card)
{
    let front = card.querySelector('.card-front');
    let back = card.querySelector('.card-back');
    toggleView(front);
    toggleView(back);
    card.dataset.faceup = front.classList.contains('show');
    console.log("flipCard", card);
}

/**
 * Togle the visibility of a card face
 * - It can be optimized to use the ClassList 'toggle()' method
 * 
 * @param {type} face
 */
function toggleView(face)
{
    let cl = face.classList;
    if (cl.contains('show'))
    {
        cl.replace('show', 'hide');
    } else if (cl.contains('hide'))
    {
        cl.replace('hide', 'show');
    }
}

/**
 * Appends 'n' pairs of cards to the element 'elem' in a random order
 * 
 * @param {type} n
 * @param {type} elem
 * @returns {undefined}
 */
function addCards(n, elem)
{
    let cardArray = createCardArray(n);
    let l = cardArray.length;
    let i;
    while (l > 0)
    {
        i = randomInt(0, l - 1);
        elem.appendChild(cardArray[i]);
        cardArray.splice(i, 1);
        l = cardArray.length;
    }

}

/**
 * Turns an array with 'n' card pairs (total of '2 * n' cards)
 * 
 * @param n - number of card pairs
 * @returns {Array|createCardArray.cardArray}
 */
function createCardArray(n)
{
    let cardArray = new Array();
    let card;
    for (let i = 0; i < n; i++)
    {
        // Creates the first card
        card = createCard();
        cardArray.push(card);
        // Creates the pair of the first car.
        // Both will have the same value for the 'data-pair' attribute
        card = createCard(card.dataset.pairid);
        cardArray.push(card);
    }
    return cardArray;
}

/**
 * Returns a card or it's pair (if 'pairid' is provided)
 * - In the future create the classes Card and Face
 * 
 * @param {String} pairid
 * @returns {Element|createCard.card}
 */
function createCard(pairid)
{
    let front = document.createElement('div');
    front.classList.add('card');
    front.classList.add('card-front');
    front.classList.add('hide');

    let back = document.createElement('div');
    back.classList.add('card');
    back.classList.add('card-back');
    back.classList.add('show');

    let card = document.createElement('div');
    card.setAttribute('data-pairid', pairid === null || pairid === undefined ? randomString(6) : pairid); //**
    card.setAttribute('data-faceup', "false");
    //
    front.innerText = card.dataset.pairid;
    card.append(front);
    //
    back.innerText = card.dataset.pairid;
    card.append(back);
    console.log("createCard", card);
    return card;
}

/**
 * Utility function - returns a random string with length 'l'
 * 
 * @param {type} l
 * @returns {String}
 */
function randomString(l)
{
    let str = '';
    let rand;
    for (let i = 0; i < l; i++)
    {
        rand = Math.random();
        if (rand < 0.33)
        {
            str += String.fromCharCode(randomInt(48, 57));
        } else if (rand < 0.66)
        {
            str += String.fromCharCode(randomInt(65, 90));
        } else {
            str += String.fromCharCode(randomInt(97, 122));
        }
    }
    return str;
}

/**
 * 
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function randomInt(min, max)
{
    return min + Math.floor(Math.random() * (max - min + 1));
}
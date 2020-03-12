/**
 * All the logic starts here. Just when the page is fully loaded.
 * 
 * @type type
 */
window.addEventListener('DOMContentLoaded', function ()
{
    let mainDiv = document.querySelector('#main');
    addCards(10, mainDiv);
    let elem;
    mainDiv.addEventListener('click', function (e)
    {
        flipCard(e);
    });
});

/**
 * Flips a card back to front, and vice-versa.
 * 
 * @param {type} e
 * @returns {undefined}
 */
function flipCard(e)
{
    let card = e.target.parentElement;
    let front = card.querySelector('.card-front');
    let back = card.querySelector('.card-back');
    console.log(card, front, back);
    toggleView( front );
    toggleView( back );
}

/**
 * Togle the visibility of a card face
 * - It can be optimized to use the ClassList 'toggle()' method
 * 
 * @param {type} elem
 * @returns {undefined}
 */
function toggleView(elem)
{
    let cl = elem.classList;
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
        card = createCard();
        cardArray.push(card);
        card = createCard(card.dataset.pair);
        cardArray.push(card);
    }
    return cardArray;
}

/**
 * Returns a card or it's pair (if 'pairId' is provided)
 * 
 * @param {String} pairId
 * @returns {Element|createCard.card}
 */
function createCard(pairId)
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
    card.setAttribute('data-pair', pairId === null || pairId === undefined ? randomString(6) : pairId);
    card.append(front);
    back.innerText = card.dataset.pair;
    front.innerText = card.dataset.pair;
    card.append(back);
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
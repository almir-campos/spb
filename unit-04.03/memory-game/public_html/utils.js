'use strict';

/**
 * Utility function - returns a random string with length 'l'
 * 
 * @param {type} l
 * @returns {String}
 */
export function randomString(l)
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
export function randomInt(min, max)
{
    return min + Math.floor(Math.random() * (max - min + 1));
}


export function optimizedRectangle(p)
{
    const totalP = p * 2;

    let l = Math.sqrt(p);

    function findL()
    {
        if (Number.isInteger(totalP / l))
        {
            return l;
        }
        l = Math.floor(l) + 1;
        findL();
    }
    findL();
    let c = Math.max( totalP / l, l );
    let r = totalP / c;
    return { "r": r, "c": c };
}
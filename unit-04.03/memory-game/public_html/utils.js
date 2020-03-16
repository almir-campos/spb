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


//export function optimizedRectangle(p)
//{
//    const totalP = p * 2;
//
//    let l = Math.sqrt(p);
//
//    function findL()
//    {
//        if (Number.isInteger(totalP / l))
//        {
//            return l;
//        }
//        l = Math.floor(l) + 1;
//        findL();
//    }
//    findL();
//    let c = Math.max( totalP / l, l );
//    let r = totalP / c;
//    return { "r": r, "c": c };
//}

//export function optimizedRectangle(num_elem)
//{
//  let l = Math.sqrt(num_elem);
//  l = Math.floor(l);
//
//  console.log( "**", num_elem, l );
//
//  function findL()
//  {
//    if (Number.isInteger(num_elem / l))
//    {
//      return l;
//    }
//    l++;
//    findL();
//  }
//  findL();
//  let c = Math.max(num_elem / l, l);
//  let r = num_elem / c;
//  console.log('r', r );
//  let or;
//  if (r === 1)
//  {
//    num_elem++;
//    or = optimizedRectangle(num_elem);
//    console.log( or );
//    return or;
//  }
//  console.log( {"r": r, "c": c} );
//  return {"r": r, "c": c};
//}

export function optimizedRectangle(num_elem, layout)
{
  let l = Math.sqrt(num_elem);
  l = Math.floor(l);

  console.log("**", num_elem, l);

  function findL()
  {
    if (Number.isInteger(num_elem / l))
    {
      return l;
    }
    if (layout !== 1)
    {
      l++;
    } else
    {
      num_elem++;
      l = Math.sqrt(num_elem);
    }
    findL();
  }
  findL();
  let c = Math.max(num_elem / l, l);
  let r = num_elem / c;
  console.log('r', r);
  let or;
  if (r === 1)
  {
    num_elem++;
    or = optimizedRectangle(num_elem);
    console.log(or);
    return or;
  }
  return {"r": r, "c": c};
}


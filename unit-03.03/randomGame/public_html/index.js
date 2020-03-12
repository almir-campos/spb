
/**
 * Function before figuring out that the function should only show
 *    the count. However, it doesn't return the count, but a Proimise
 *    which will be used on the caller function (see index.html)
 *    
 * @param {Number} threshold
 * @returns {Promise}
 */
function randomGamePromise(threshold)
{
    return new Promise(
            function (resolve, reject)
            {
                let count = 0;
                console.log("Processing with Promise......");

                let intId = setInterval(function ()
                {
                    count++;
                    if (Math.random() > threshold)
                    {
                        clearInterval(intId);
                        resolve(count);
                    }
                }, 1000);

            });
}

/**
 * 
 * After figuring out that the function should only show
 *    the count.
 */
function randomGame()
{
    let count = 0;
    console.log("Processing without Promise...");
    let intId = setInterval(function ()
    {
        count++;
        let r = Math.random();
        console.log("count/nopromise:", count, "r:", r);
        if (r > 0.75)
        {
            clearInterval(intId);
            console.log("Count without Promise:", count);
        }
    }, 1000);
}

/**
 * Springboard solution
 */
function randomGame(){
  let num;
  let times = 0;
  let timer = setInterval(function(){
    num = Math.random();
    // I believe that there's a problem here: the result will include
    // the attempt where the result is > 0.75, but the exercise statement
    // says that the result should be the count *before* that attempt.
    //
    times++ 
    if(num > .75) {
      clearInterval(timer);
      console.log("It took " + times + " try/tries.");
    }
  },1000)
}
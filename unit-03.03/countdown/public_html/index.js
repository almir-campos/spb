function countdown(n)
{
    let intId = setInterval(function ()
    {
        if (n <= 0)
        {
            clearInterval(intId);
            console.log( "DONE!");
            return;
        }
        console.log('-->>', n--);
    }, 1000);
}

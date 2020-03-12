
let elem;

window.addEventListener("load", function ()
{
    elem = document.querySelector('#colorArr');
    console.log("DOC loaded");
    let x, y;
    let bg;
    window.addEventListener("mousemove", function (me)
    {
        x = me.pageX;
        y = me.pageY;
        bg = toRgb(me.pageX, me.pageY, Math.floor(Math.random() * 256));
        cl(me, x, y, bg)();
    });

    window.addEventListener("keydown", function (ke)
    {
        cl(ke, x, y, bg)();
    });
});


function cl(e, x, y, bg)
{
    return function ()
    {
        if (!isMouseEvent(e) && !isKeyboardEvent(e))
        {
            return;
        }

        if (isKeyboardEvent(e))
        {

            if (e.key === 'ArrowUp')
            {
                bg.b = Math.min(bg.b + 1, 255);
            } else if (e.key === 'ArrowDown')
            {
                bg.b = Math.max(bg.b - 1, 0);
            }
        }

        let iColor = invertedColor(bg);
        elem.style.backgroundColor = `rgb( ${iColor.r}, ${iColor.g}, ${iColor.b} )`;
        elem.style.color = `rgb( ${bg.r}, ${bg.g}, ${bg.b} )`;
        elem.style.fontSize = '2em';
        elem.innerText = JSON.stringify(bg);
        document.body.style.backgroundColor = `rgb( ${bg.r}, ${bg.g}, ${bg.b} )`;
    };
}


function isMouseEvent(e)
{
    return e.type.startsWith('mouse');
}

function isKeyboardEvent(e)
{
    return e.type.startsWith('key');
}


function invertedColor(bg)
{
    return {"r": Math.abs(bg.r - 255), "g": Math.abs(bg.g - 255), "b": Math.abs(bg.b - 255)};
}

function toRgb(x, y, b)
{
    let r = Math.floor((256 / window.innerWidth) * x);
    let g = Math.floor((256 / window.innerHeight) * y);
    return {"r": r, "g": g, "b": b};
}
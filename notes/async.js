// --------------------------------------------------
// Callbacks
// --------------------------------------------------

// Jo function dusre function ko as an argument le, use Higher Order Function kehte hai.
// Aur jo function as an argument pass hoo raha hai, use Callback Function kehte hain.
// Agar kisi function ka kaam kise dusre function ke andar hi hai aur dusre jagah nahi, to aap callback function ka use kar sakte hoo. Is case me aap anonymous function declaration pass karoge.
// Yane ye: function () {}
// HOF (Higher Order Functions) ka use aap wo logic ek function me common karne ke liye use karsakte hoo, jo logic bar bar repeat hoo raha hoo.
// Aur jo logic common nahi hoopaye, usko callback function ke through bhej sakte hoo.
// Is se code repetition kam hoojata hai. Debugging aasaan hoojata hai.

// --------------------------------------------------
// Async Functions
// --------------------------------------------------

// Aise functions jinka execution non blocking hoon unhe async functions kahenge.
// Kiske liye non blocking? To main thread ke liye.
// Async functions main thread ko block nahi karte. Yane main thread unhe kisi aur ko de deta hai execute/run karne (chala ne) ke liye.

// setTimeout(function () {
//   console.log("Callback!");
// }, 3000);

// Is case me setTimeout ek async function hai. Yane main thread ise kisi aur ko (eorker thread) ko de dega run karne ke liye.
// Worker thread setTimeout chalaega jisme wo 3000ms wait karega aur uske baad callback function ka call schedule karega.
// Ye callback function main thread ke dwara chalaye jane kiye liye task queue me wait karega. Aur jab iska number aaye ga tab mainthread is callback function ko chalaye ga.

// --------------------------------------------------
// Promise
// --------------------------------------------------

// Promise ek Object hai jo Producing code (yane wo code jo aap ne worker thread ko de diya hai) aur Consuming code (yane wo code jo aap ne callback me likha hoo) ko link karta hai.
// Promise ek placeholder/replacement value hai us value ke liye jo aap jab promise bana rahe hoo tab aap ko nahi pata hoo. Promise aap ko handlers (functions) attach/lagane deta hai us async action (e.g. fetch) ke success value ya failure ke kaaran (error) ke saath.

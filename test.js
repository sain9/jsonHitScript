


(async function() {
    try {
        console.log("hello");
        const msg = await delay()
        console.log(msg)
        console.log("bye");
    } catch (error) {
        console.log(error)    
    }
})();

async function delay() {
    return new Promise((res, rej) =>{
        setTimeout(()=>{
            console.log("HI");``
            // res("hello")
            rej("Error occured");
        }, 1000)
    })
}
function countDown(seconds){
    seconds++;
    let timer = setInterval(function(){
        seconds--;
        if(seconds <= 0){
            clearInterval(timer);
            console.log("DONE!");
        } else {
            console.log("Timer: ", seconds);
        }

    }, 1000);
}

let seconds = process.argv[2];

countDown(seconds);
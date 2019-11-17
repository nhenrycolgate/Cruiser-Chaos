var engine;

function init(event){
    engine = new new Engine();

    //populate engine with objects to handle logic

    loop();
}

function loop() {

    engine.Update();
    requestAnimationFrame(loop);
}

window.addEventListener('load', init, false);
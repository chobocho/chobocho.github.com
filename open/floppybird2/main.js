function OnDraw() {
    gameEngine.increaseTick();
    drawEngine.OnDraw();
    // updateResolution();
    setTimeout(OnDraw, 20);
}

function processKeyEvent(code) {
    printf("[Main] processKeyEvent: ", code);
    switch (code) {
        case SPACE_KEY:
            printf("[Main] processKeyEvent: ", "1P UP");
            gameEngine.moveUp(0);
            break;
        case Z_KEY:
            if (gameMode.isGameOverState(0) || gameMode.isPauseState(0)) {
                if (gameMode.mode() === "COMPETE_MODE") {
                    gameEngine.start(0);
                } else {
                    gameEngine.allPlayerStart();
                }
            } else {
                printf("[Main] processKeyEvent: ", "1P UP");
                gameEngine.moveUp(0);
            }
            break;
        case J_KEY:
        case ARROW_UP_KEY:
            printf("[Main] processKeyEvent: ", "2 UP");
            if (gameMode.mode() === "SINGLE_MODE") {
                gameEngine.moveUp(0);
            } else {
                gameEngine.moveUp(1);
            }
            break;
        case P_KEY:
            printf("[Main] processKeyEvent: ", "All Pause");
            gameEngine.allPlayerPause();
            break;
        case P1_PAUSE:
            printf("[Main] processKeyEvent: ", "Player1 Pause");
            gameEngine.pause(0);
            break;
        case P2_PAUSE:
            printf("[Main] processKeyEvent: ", "Player2 Pause");
            gameEngine.pause(1);
            break;
        case P1_START:
            printf("[Main] processKeyEvent: ", "Player1 Start");
            gameEngine.start(0);
            break;
        case P2_START:
            printf("[Main] processKeyEvent: ", "Player2 Start");
            gameEngine.start(1);
            break;
        case ENTER_KEY:
            if (gameMode.mode() === "COMPETE_MODE") {
                if (gameMode.isPlayState(1)) {
                    printf("[Main][COMPETE_MODE] processKeyEvent: ", "Player2 UP");
                    gameEngine.moveUp(1);
                } else {
                    gameEngine.start(1);
                }
            }
            else if (gameMode.mode() === "TOGETHER_MODE") {
                printf("[Main][TOGETHER_MODE] processKeyEvent: ", "Player1 UP");
                gameEngine.moveUp(1);
            }
            break;
        case S_KEY:
            printf("[Main] processKeyEvent: ", "Player1 Start");
            if (gameMode.mode() === "COMPETE_MODE") {
                gameEngine.start(0);
            } else {
                gameEngine.allPlayerStart();
            }
            break;
        default:
            break;
    }
}

function KeyPressEvent(e) {
    processKeyEvent(e.keyCode);
}

function getMousePosition(event) {
    let mx = event.pageX - canvas.offsetLeft;
    let my = event.pageY - canvas.offsetTop;
    return {x: mx, y: my};
}

function getTouchPosition(event) {
    let mx = event.changedTouches[0].pageX - canvas.offsetLeft;
    let my = event.changedTouches[0].pageY - canvas.offsetTop;
    return {x: mx, y: my};
}

function processMouseEvent(x, y) {
    let code = drawEngine.getEventCode(x, y);
    printf("[Main] processMouseEvent: ", "(" + x + ", " + y + ") -> " + code);
    processKeyEvent(code);
}

function processTouchEvent(x, y) {
    let code = drawEngine.getEventCode(x, y);
    printf("[Main] processTouchEvent: ", "(" + x + ", " + y + ") -> " + code);
    processKeyEvent(code);
}

function mouseListener(event) {
    switch (event.type) {
        case "mousedown":
            break;
        case "mousemove":
            break;
        case "mouseup":
            if (!isMobile) {
                let pos = getMousePosition(event)
                processMouseEvent(pos.x, pos.y);
            }
            break;
        case "mouseout":
            break;
    }
}

function touchListener(event) {
    switch (event.type) {
        case "touchstart":
            break;
        case "touchend":
            let pos = getTouchPosition(event);
            processTouchEvent(pos.x, pos.y);
            break;
        case "touchcancel":
            break;
        case "touchmove":
            break;
    }
}

function setSingleMode() {
    gameMode = singleMode;
    gBufferX = gameMode.gBufferX;

    canvas.width = gameMode.canvasX();
    canvas.height = gameMode.canvasY();

    gameEngine = new GameEngine(singleMode, scoreDB);
    drawEngine.setDrawMode(singleMode, singleDrawMode);
}

function setTogetherMode() {
    gameMode = togetherMode;
    gBufferX = gameMode.gBufferX;

    canvas.width = gameMode.canvasX();
    canvas.height = gameMode.canvasY();

    console.log("[Main] canvas", canvas.width, "x", canvas.height);

    gameEngine = new GameEngine(togetherMode, scoreDB);
    drawEngine.setDrawMode(togetherMode, togetherDrawMode);
}

function setCompeteMode() {
    gameMode = competeMode;
    gBufferX = gameMode.gBufferX;

    canvas.width = gameMode.canvasX();
    canvas.height = gameMode.canvasY();

    console.log("[Main] canvas", canvas.width, "x", canvas.height);

    gameEngine = new GameEngine(competeMode, scoreDB);
    drawEngine.setDrawMode(competeMode, competeDrawMode);
}

function InitValue() {
    gBufferX = gameMode.gBufferX;
    gameEngine = new GameEngine(gameMode, scoreDB);
    drawEngine = new DrawEngine(gameMode, initdrawMode);

    window.onkeydown = KeyPressEvent;

    canvas.addEventListener("mousedown", mouseListener);
    canvas.addEventListener("mousemove", mouseListener);
    canvas.addEventListener("mouseout", mouseListener);
    canvas.addEventListener("mouseup", mouseListener);

    canvas.addEventListener("touchstart", touchListener, false);
    canvas.addEventListener("touchend", touchListener, false);
    canvas.addEventListener("touchcancel", touchListener, false);
    canvas.addEventListener("touchmove", touchListener, false);

    window.addEventListener('resize', resizeCanvas, false);
}

function updateResolution() {
    if (isMobile) {
        return;
    }

    let log_msg = isMobile ? "[Mobile]" : "[PC] ";
    log_msg += "S: Start / Z, SPACE: Player1 Jump / J, ↑: Player2 Jump / P: Pause / Jump: ";
    log_msg += "[" + canvas.width + "x" + canvas.height + "]";
    printf("[main] bufCtx", log_msg);
    document.getElementById("message").innerHTML = log_msg;
}

function resizeCanvas() {
    canvas = document.getElementById("canvas");

    DecisionBlockSize();

    canvas.width = gameMode.canvasX();
    canvas.height = gameMode.canvasY();

    console.log("[Main] canvas", canvas.width, "x", canvas.height);
}

function InitCanvas() {
    resizeCanvas();
    cvs = canvas.getContext("2d");

    bufCanvas = document.createElement("canvas");
    bufCanvas.width = 400;
    bufCanvas.height = 600;
    bufCtx = bufCanvas.getContext("2d");

    bufCanvas2 = document.createElement("canvas");
    bufCanvas2.width = 400;
    bufCanvas2.height = 600;
    bufCtx2 = bufCanvas2.getContext("2d");

    bufCanvas800 = document.createElement("canvas");
    bufCanvas800.width = 800;
    bufCanvas800.height = 600;
    bufCtx800 = bufCanvas800.getContext("2d");

    initMode.setBufCanvasCtx(bufCanvas, bufCtx);
    singleMode.setBufCanvasCtx(bufCanvas, bufCtx);
    togetherMode.setBufCanvasCtx(bufCanvas800, bufCtx800);
    competeMode.setBufCanvasCtx(bufCanvas, bufCtx);
    competeMode.setBufCanvasCtx2(bufCanvas2, bufCtx2);
}

function DecisionBlockSize() {
    let height = window.innerHeight;
    let width = window.innerWidth;

    console.log("[Main] windows: ", width, "x", height);

    initMode.decisionBlockSize(width, height);
    singleMode.decisionBlockSize(width, height);
    togetherMode.decisionBlockSize(width, height);
    competeMode.decisionBlockSize(width, height);
}

const isMobileOS = () => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
        return true;
    } else if ((/iPad|iPhone|iPod/.test(ua)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        return true;
    }
    return false;
}

function InitGameMode() {
    scoreDB = new LocalDB();
    let score = scoreDB.getScore();

    initMode = new InitMode(score);
    singleMode = new SingleMode(score);
    togetherMode = new TogetherMode(score);
    competeMode = new CompeteMode(score);

    initdrawMode = new InitDrawMode();
    togetherDrawMode = new TogetherDrawMode();
    singleDrawMode = new SingDrawMode();
    competeDrawMode = new CompeteDrawMode();
    gameMode = initMode;
}

const onLoadPage = function onLoadPageFnc() {
    InitGameMode();
    InitCanvas();
    InitValue();
    //setInterval(OnDraw, 20);
    setTimeout(OnDraw, 20);
    isMobile = isMobileOS();
}

window.onload = onLoadPage;

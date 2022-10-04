function OnDraw() {
  gameEngine.increaseTick();
  drawEngine.OnDraw();
  updateResolution();
  setTimeout(OnDraw, 20);
}

function processKeyEvent(code) {
  printf("[Main] processKeyEvent: ", code);
  switch (code) {
    case SPACE_KEY:
    case Z_KEY:
      printf("[Main] processKeyEvent: ", "1 UP");
      gameEngine.moveUp(0);
      break;
    case J_KEY:
    case ARROW_UP_KEY:
      printf("[Main] processKeyEvent: ", "2 UP");
      gameEngine.moveUp(1);
      break;
    case P_KEY:
      printf("[Main] processKeyEvent: ", "Pause");
      gameEngine.pause();
      break;
    case ENTER_KEY:
    case S_KEY:
      printf("[Main] processKeyEvent: ", "Start");
      gameEngine.start();
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
  return { x: mx, y: my };
}

function getTouchPosition(event) {
  let mx = event.changedTouches[0].pageX - canvas.offsetLeft;
  let my = event.changedTouches[0].pageY - canvas.offsetTop;
  return { x: mx, y: my };
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

function InitValue() {
  scoreDB = new LocalDB();
  let score = new Score(scoreDB.getScore());
  let energy = new Energy();
  let item = new Item();
  let pillar = new Pillar(item);
  floppybird = [];
  floppybird.push(new FloppyBird(100, 200, score, energy, item, pillar));
  floppybird.push(new FloppyBird(500, 200, score, energy, item, pillar));
  energy.setGame(floppybird);
  item.setGame(floppybird);

  floppybird[0].init();
  floppybird[1].init();
  gameEngine = new GameEngine(floppybird, scoreDB);
  drawEngine = new DrawEngine(floppybird);

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

  let height = window.innerHeight;
  let width = window.innerWidth;

  if (height < 400 || width < 300) {
    printf("[main]", "Error: width == 0");
    width = 400;
    height = 300;
  }

  canvas.width = width;
  canvas.height = height;

  let log_msg = "Width: " + canvas.width + " Height: " + canvas.height;
  printf("[main] resizeCanvas: ", log_msg);

  DecisionBlockSize();
}

function InitCanvas() {
  resizeCanvas();
  cvs = canvas.getContext("2d");

  bufCanvas = document.createElement("canvas");
  bufCanvas.width = gScreenX;
  bufCanvas.height = gScreenY;
  bufCtx = bufCanvas.getContext("2d");
}

function DecisionBlockSize() {
  let screenX = canvas.width / 80;
  let screenY = canvas.height / 60;
  gBlockSize = screenX < screenY ? screenX : screenY;
  gStartX = (canvas.width - gBlockSize * 80) / 2;
  gScale = gBlockSize / 10;
  printf("[main] DecisionBlockSize", "gStartX:" + gStartX + ", scale: " + gScale);
}

const isMobileOS = () => {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) {
    return true;
  }
  else if ((/iPad|iPhone|iPod/.test(ua)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return true;
  }
  return false;
}

const onLoadPage = function onLoadPageFnc() {
  InitCanvas();
  InitValue();
  //setInterval(OnDraw, 20);
  setTimeout(OnDraw, 20);
  isMobile = isMobileOS();
}

window.onload = onLoadPage;

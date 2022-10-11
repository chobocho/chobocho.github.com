const ENTER_KEY = 13;
const SPACE_KEY = 32;
const ARROW_UP_KEY = 38;
const J_KEY = 74;
const P_KEY = 80;
const S_KEY = 83;
const Z_KEY = 90;

let gStartX = 0;
let gBlockSize = 60;
let gScale = 1.0;
let gScreenX = 800;
let gScreenY = 600;
let gBufferX = 800;

let cvs;
let canvas;

let bufCanvas;
let bufCanvas800;
let bufCtx;
let bufCtx800;

let floppybird;
let drawEngine;
let gameEngine;
let scoreDB;

let offset = 0;
let isMobile = false;

let initMode;
let singleMode;
let togetherMode;
let competeMode;
let gameMode;

let initdrawMode;
let singleDrawMode;
let togetherDrawMode;
let competeDrawMode;

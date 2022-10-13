const ENTER_KEY = 13;
const SPACE_KEY = 32;
const ARROW_UP_KEY = 38;
const J_KEY = 74;
const P_KEY = 80;
const S_KEY = 83;
const Z_KEY = 90;

const P1_START = 1001;
const P1_PAUSE = 1002;
const P2_START = 2001;
const P2_PAUSE = 2002;

let gBufferX = 800;

let cvs;
let canvas;

let bufCanvas;
let bufCanvas2;
let bufCanvas800;
let bufCtx;
let bufCtx2;
let bufCtx800;

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

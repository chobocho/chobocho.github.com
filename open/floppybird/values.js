const ENTER_KEY = 13;
const SPACE_KEY = 32;
const ARROW_UP_KEY = 38;
const J_KEY = 74;
const P_KEY = 80;
const S_KEY = 83;

let gStartX = 0;
let gBlockSize = 60;
let gScale = 1.0;
let gScreenX = 400;
let gScreenY = 600;

let cvs;
let canvas;

let bufCanvas;
let bufCtx;

let floppybird;
let drawEngine;
let gameEngine;
let scoreDB;

let offset = 0;
let isMobile = false;

var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_GlobalRotateMatrix;\n' +
  'void main() {\n' +
  '  gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;\n' +
  '}\n';

var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';

// global variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_ModelMatrix;
let u_GlobalRotateMatrix;

// setup webgl context
function setupWebGL() {
  canvas = document.getElementById('webgl');
  gl = canvas.getContext("webgl");
  if (!gl) {
    console.log('failed to get the rendering context for webgl');
    return;
  }
  gl.enable(gl.DEPTH_TEST);
}

// connect variables to glsl
function connectVariablesToGLSL() {
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('failed to initialize shaders.');
    return;
  }

  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('failed to get the storage location of a_Position');
    return;
  }

  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('failed to get the storage location of u_FragColor');
    return;
  }

  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('failed to get the storage location of u_ModelMatrix');
    return;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix) {
    console.log('failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

// shape types
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
const RAINBOW = 3;

// global settings
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_globalAngle = 0;
let g_yellowAngle = 0;
let g_magAngle = 0;
let g_magAnimation = false;
let g_yellowAnimation = false;

let g_upperLegAngle = -90;
let g_lowerLegAngle = -30;
let g_upperLegAngle_2 = -90;
let g_lowerLegAngle_2 = -30;
let g_ankleAngle = 0;
let g_bodyAngle = 0;

let g_upperLegBaseAngle = 0;
let g_lowerLegBaseAngle = 30;
let g_upperLegAnimOffset = 0;
let g_lowerLegAnimOffset = 0;
let g_animations = {
  legSwing: false
};
let g_isDragging = false;
let g_mouseXAngle = 0;
let g_mouseYAngle = 0;
let g_lastMouseX = 0;
let g_lastMouseY = 0;

let g_pokeAnimation = false;
let g_pokeFinal = false;
let g_pokeStartTime = 0;
const pokeGlobalDuration = 1.0;
const pokeLegDuration = 2.0;

let g_startMouseXAngle = 0;
let g_startMouseYAngle = 0;
let g_start_upperLegAngle = 0;
let g_start_lowerLegAngle = 0;
let g_start_upperLegAngle_2 = 0;
let g_start_lowerLegAngle_2 = 0;

// add actions for html ui
function addActionsForHtmlUI() {
  document.getElementById('upperLeg').addEventListener('mousemove', function () {
    if (g_pokeAnimation) cancelPokeAnimation();
    g_upperLegAngle = -90 - (this.value / 3);
    g_upperLegAngle_2 = -90 - (this.value / 3);
    // renderAllShapes();
  });
  document.getElementById('lowerLeg').addEventListener('mousemove', function () {
    if (g_pokeAnimation) cancelPokeAnimation();
    g_lowerLegAngle = -30 - this.value;
    g_lowerLegAngle_2 = -30 - this.value;
    // renderAllShapes();
  });
  document.getElementById('ankleSlide').addEventListener('mousemove', function () {
    if (g_pokeAnimation) cancelPokeAnimation();
    g_ankleAngle = parseFloat(this.value);
    // renderAllShapes();
  });

  document.getElementById('animationLegOnButton').onclick = function () {
    if (g_pokeAnimation) cancelPokeAnimation();
    g_animations.legSwing = true;
  };
  document.getElementById('animationLegOffButton').onclick = function () {
    if (g_pokeAnimation) cancelPokeAnimation();
    g_animations.legSwing = false;
  };

  document.addEventListener("DOMContentLoaded", function() {
    const dropdownButton = document.getElementById("DropDown-Button");
    const dropdown = document.querySelector(".Dropdown");

    dropdownButton.addEventListener("click", function() {
        dropdown.classList.toggle("active");
    });
  });

  canvas.addEventListener('mousedown', function (ev) {
    if (ev.shiftKey) {
      g_pokeAnimation = true;
      g_pokeStartTime = performance.now() / 1000;
      g_startMouseXAngle = g_mouseXAngle;
      g_startMouseYAngle = g_mouseYAngle;
      g_start_upperLegAngle = g_upperLegAngle;
      g_start_lowerLegAngle = g_lowerLegAngle;
      g_start_upperLegAngle_2 = g_upperLegAngle_2;
      g_start_lowerLegAngle_2 = g_lowerLegAngle_2;
    } else {
      g_isDragging = true;
      g_lastMouseX = ev.clientX;
      g_lastMouseY = ev.clientY;
    }
  });
  canvas.addEventListener('mouseup', function () {
    g_isDragging = false;
  });

  canvas.addEventListener('mousemove', function (ev) {
    if (!g_isDragging) return;
    if (g_pokeAnimation) cancelPokeAnimation();
    const dx = ev.clientX - g_lastMouseX;
    const dy = ev.clientY - g_lastMouseY;
    g_mouseXAngle += -dx * 0.5;
    g_mouseYAngle += -dy * 0.5;
    g_lastMouseX = ev.clientX;
    g_lastMouseY = ev.clientY;
  });
}

// main function
function main() {
  setupWebGL();
  connectVariablesToGLSL();
  initStaticTransforms();
  addActionsForHtmlUI();
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  requestAnimationFrame(tick);
}

// animation timing
var g_startTime = performance.now() / 1000;
var g_seconds = performance.now() / 1000 - g_startTime;

// animation loop
function tick() {
  g_seconds = performance.now() / 1000 - g_startTime;
  updateAnimationAngles();
  renderAllShapes();
  requestAnimationFrame(tick);
}

// convert mouse event to gl coordinates
function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX;
  var y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

  return [x, y];
}

// list of shapes
var g_shapesList = [];
let lastLegSwingUpdate = 0;
let waveVal = 0;

// update animation angles
function updateAnimationAngles() {
  if (g_pokeAnimation) {
    let currentTime = performance.now() / 1000;
    let elapsed = currentTime - g_pokeStartTime;

    if (elapsed < pokeGlobalDuration) {
      let t = elapsed / pokeGlobalDuration;
      g_mouseXAngle = g_startMouseXAngle + t * (180 - g_startMouseXAngle);
      g_mouseYAngle = g_startMouseYAngle + t * (-180 - g_startMouseYAngle);
    } else if (elapsed < pokeGlobalDuration + pokeLegDuration) {
      g_animations.legSwing = false;
      let t = (elapsed - pokeGlobalDuration) / pokeLegDuration;
      g_upperLegAngle = g_start_upperLegAngle + t * (-100 - g_start_upperLegAngle);
      g_lowerLegAngle = g_start_lowerLegAngle + t * (-60 - g_start_lowerLegAngle);
      g_upperLegAngle_2 = g_start_upperLegAngle_2 + t * (-130 - g_start_upperLegAngle_2);
      g_lowerLegAngle_2 = g_start_lowerLegAngle_2 + t * (-75 - g_start_lowerLegAngle_2);
    } else {
      g_pokeFinal = true;
    }
  }
  if (g_animations.legSwing) {
    const now = performance.now();
    // Update at most every 16ms (about 60 updates per second)
    if (now - lastLegSwingUpdate < 16) return;
    lastLegSwingUpdate = now;

    let period = (2 * Math.PI) / 25;
    let phase = (g_seconds % period) / period;
    waveVal = phase < 0.5 ? 4 * phase - 1 : 3 - 4 * phase;
    g_upperLegAngle = -8 * waveVal - 100;
    g_lowerLegAngle = -18 * waveVal - 10;
    g_upperLegAngle_2 = -5 * -waveVal - 100;
    g_lowerLegAngle_2 = -15 * -waveVal - 10;
  } else {
    g_upperLegAnimOffset = 0;
    g_lowerLegAnimOffset = 0;
  }
}

var lastPerfUpdateTime = 0;
// update performance info
function updatePerformanceInfo(duration, fps) {
  const now = performance.now();
  if (now - lastPerfUpdateTime > 250) { // update only every 500 ms
    sendTextToHTML("MS: " + Math.floor(duration) + " || FPS: " + Math.floor(fps), "numdot");
    lastPerfUpdateTime = now;
  }
}

// send text to html element
function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("failed to get " + htmlID + "from html");
    return;
  }
  htmlElm.innerHTML = text;
}

class Triangle {
  constructor() {
    this.type = 'triangle';
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 5.0;
    this.rotation = 0;
  }

  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;
    const angle = this.rotation;

    // set color and size
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniform1f(u_Size, size);

    var d = this.size / 200.0;
    // draw triangle
    drawTriangle([xy[0], xy[1], xy[0] + d, xy[1], xy[0], xy[1] + d], xy, angle);
  }
}

function drawTriangle(vertices, center, angle = 0) {
  var n = 3;

  // rotate vertices
  const cosTheta = Math.cos(angle);
  const sinTheta = Math.sin(angle);
  for (let i = 0; i < vertices.length; i += 2) {
    const x = vertices[i] - center[0];
    const y = vertices[i + 1] - center[1];

    const rotatedX = x * cosTheta - y * sinTheta;
    const rotatedY = x * sinTheta + y * cosTheta;

    vertices[i] = rotatedX + center[0];
    vertices[i + 1] = rotatedY + center[1];
  }

  // create buffer
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('failed to create the buffer object');
    return -1;
  }

  // bind buffer and set data
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  // draw triangle
  gl.drawArrays(gl.TRIANGLES, 0, n);

  return n;
}

function drawTriangle3D(vertices, center, angle = 0) {
  var n = 3;

  // create buffer
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('failed to create the buffer object');
    return -1;
  }

  // bind buffer and set data
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  // draw triangle
  gl.drawArrays(gl.TRIANGLES, 0, n);

  return n;
}

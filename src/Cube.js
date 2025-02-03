class Cube {
    constructor() {
        this.matrix = new Matrix4();
        this.buffer = null;
        this.vertices = new Float32Array([
            0.0, 0.0, 0.0,  1.0, 1.0, 0.0,  1.0, 0.0, 0.0, 
            0.0, 0.0, 0.0,  0.0, 1.0, 0.0,  1.0, 1.0, 0.0,
        ]);
    }

    initBuffer() {
        if (this.buffer === null) {
            this.buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
        }
    }

    render() {
        this.initBuffer();
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }
}


function drawCube(M, color) {
    gl.uniform4f(u_FragColor, color[0], color[1], color[2], color[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, M.elements);
    
    // front face
    drawTriangle3D([0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0]);
    drawTriangle3D([0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0]);
    
    // back face
    drawTriangle3D([0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0]);
    drawTriangle3D([0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0]);
    
    // left face
    drawTriangle3D([0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0]);
    drawTriangle3D([0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0]);
    
    // right face
    drawTriangle3D([1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0]);
    drawTriangle3D([1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0]);
    
    // top face
    drawTriangle3D([0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0]);
    drawTriangle3D([0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0]);
    
    // bottom face
    drawTriangle3D([0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0]);
    drawTriangle3D([0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0]);
  }
  
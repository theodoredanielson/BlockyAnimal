function renderAllShapes() {
    var startTime = performance.now();
  
    // set global rotation matrix
    globalRotMat.setIdentity();
    globalRotMat.rotate(g_mouseXAngle, 0, 1, 0);
    globalRotMat.rotate(g_mouseYAngle, 1, 0, 0);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);
  
    // clear buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    
  
    // render body
    bodyCube.matrix.setIdentity();
    bodyCube.matrix.translate(-0.25, 0, 0.0)
                   .rotate(5, 1, 0, 0)
                   .scale(0.5, 0.3, 0.5);
    drawCube(bodyCube.matrix, [0.25, 0.15, 0.1, 1.0]);
  
    // render head
    headCube.matrix.setIdentity();
    headCube.matrix.translate(-0.2, 0.025, -0.18)
                   .rotate(0, 1, 0, 0)
                   .scale(0.4, 0.2, 0.2);
    drawCube(headCube.matrix, [0.4, 0.266666, 0.13333, 1.0]);
  
    // render mouth
    mouthCube.matrix.setIdentity();
    mouthCube.matrix.translate(-0.1, 0.05, -0.2)
                    .rotate(0, 1, 0, 0)
                    .scale(0.2, 0.02, 0.1);
    drawCube(mouthCube.matrix, [0, 0, 0, 1.0]);
  
    // render antenna 1
    antenna1.matrix.setIdentity();
    antenna1.matrix.translate(-0.1, 0.22, -0.1)
    if (g_animations.legSwing) {
      antenna1.matrix.rotate(waveVal, 0, 0, 1);
    }
    antenna1.matrix.scale(0.02, 0.45, 0.02);
    drawCube(antenna1.matrix, [0.25, 0.18, 0.0, 1.0]);
  
    // render antenna 2
    antenna2.matrix.setIdentity();
    antenna2.matrix.translate(0.1, 0.22, -0.1)
    if (g_animations.legSwing) {
      antenna2.matrix.rotate(-waveVal, 0, 0, 1);
    }
    antenna2.matrix.scale(0.02, 0.45, 0.02);
    drawCube(antenna2.matrix, [0.25, 0.18, 0.0, 1.0]);
  
    // render poke animation
    if (g_pokeAnimation && g_pokeFinal) {
      crissCube.matrix.setIdentity();
      crissCube.matrix.translate(0.1, 0.12, -0.19)
                      .rotate(45, 0, 0, 1)
                      .scale(0.03, 0.075, 0.03);
      drawCube(crissCube.matrix, [0, 0, 0, 1]);
  
      crossCube.matrix.setIdentity();
      crossCube.matrix.translate(0.045, 0.14, -0.19)
                      .rotate(-45, 0, 0, 1)
                      .scale(0.03, 0.075, 0.03);
      drawCube(crossCube.matrix, [0, 0, 0, 1]);
  
      crissCube2.matrix.setIdentity();
      crissCube2.matrix.translate(-0.06, 0.12, -0.19)
                       .rotate(45, 0, 0, 1)
                       .scale(0.03, 0.075, 0.03);
      drawCube(crissCube2.matrix, [0, 0, 0, 1]);
  
      crossCube2.matrix.setIdentity();
      crossCube2.matrix.translate(-0.115, 0.14, -0.19)
                       .rotate(-45, 0, 0, 1)
                       .scale(0.03, 0.075, 0.03);
      drawCube(crossCube2.matrix, [0, 0, 0, 1]);
  
      tongueCube.matrix.setIdentity();
      tongueCube.matrix.translate(0.04, 0.019, -0.19)
                       .scale(0.03, 0.028, 0.03);
      drawCube(tongueCube.matrix, [1, 0, 0, 1]);
    } else {
      // render eyes
      sphereMat1.setIdentity();
      sphereMat1.translate(-0.1, 0.15, -0.19)
                .scale(0.1, 0.1, 0.1);
      drawSphere(sphereMat1, [0.09, 0.09, 0.09, 1.0], 0.3, 10, 4);
  
      sphereMat2.setIdentity();
      sphereMat2.translate(0.1, 0.15, -0.19)
                .scale(0.1, 0.1, 0.1);
      drawSphere(sphereMat2, [0.09, 0.09, 0.09, 1.0], 0.3, 10, 4);
    }
  
    const UL = 0.3;
    const LL = 0.3;
    const FL = 0.2;
    const legWidth = 0.05;
  
    // render left front leg
    upperLeg.matrix.setIdentity();
    upperLeg.matrix.setTranslate(-0.2, 0.06, 0.05)
                    .rotate(-g_upperLegAngle, 0, 0, 1);
    kneeJoint.set(upperLeg.matrix);
    upperLeg.matrix.scale(legWidth, UL, legWidth);
    drawCube(upperLeg.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    lowerLeg.matrix.setIdentity();
    lowerLeg.matrix.set(kneeJoint);
    lowerLeg.matrix.translate(0, UL, 0.001)
                    .rotate(-g_lowerLegAngle, 0, 0, 1)
                    .scale(legWidth, LL, legWidth);
    drawCube(lowerLeg.matrix, [0.4, 0.266666, 0.13333, 1.0]);
  
    foot.matrix.setIdentity();
    foot.matrix.set(kneeJoint);
    foot.matrix.translate(0, UL, 0.001)
                .rotate(-g_lowerLegAngle, 0, 0, 1)
                .translate(0, LL, 0)
                .rotate(g_lowerLegAngle + g_ankleAngle, 0, 0, 1)
                .scale(legWidth, FL, legWidth);
    drawCube(foot.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    // render left middle leg
    upperLeg.matrix.setIdentity();
    upperLeg.matrix.setTranslate(-0.2, 0.06, 0.17333)
                    .rotate(-g_upperLegAngle_2, 0, 0, 1);
    kneeJoint.set(upperLeg.matrix);
    upperLeg.matrix.scale(legWidth, UL, legWidth);
    drawCube(upperLeg.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    lowerLeg.matrix.setIdentity();
    lowerLeg.matrix.set(kneeJoint);
    lowerLeg.matrix.translate(0, UL, 0.001)
                    .rotate(-g_lowerLegAngle_2, 0, 0, 1)
                    .scale(legWidth, LL, legWidth);
    drawCube(lowerLeg.matrix, [0.4, 0.266666, 0.13333, 1.0]);
  
    foot.matrix.setIdentity();
    foot.matrix.set(kneeJoint);
    foot.matrix.translate(0, UL, 0.001)
                .rotate(-g_lowerLegAngle_2, 0, 0, 1)
                .translate(0, LL, 0)
                .rotate(g_lowerLegAngle_2 + g_ankleAngle, 0, 0, 1)
                .scale(legWidth, FL, legWidth);
    drawCube(foot.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    // render left back leg
    upperLeg.matrix.setIdentity();
    upperLeg.matrix.setTranslate(-0.2, 0.06, 0.2966666)
                    .rotate(-g_upperLegAngle, 0, 0, 1);
    kneeJoint.set(upperLeg.matrix);
    upperLeg.matrix.scale(legWidth, UL, legWidth);
    drawCube(upperLeg.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    lowerLeg.matrix.setIdentity();
    lowerLeg.matrix.set(kneeJoint);
    lowerLeg.matrix.translate(0, UL, 0.001)
                    .rotate(-g_lowerLegAngle, 0, 0, 1)
                    .scale(legWidth, LL, legWidth);
    drawCube(lowerLeg.matrix, [0.4, 0.266666, 0.13333, 1.0]);
  
    foot.matrix.setIdentity();
    foot.matrix.set(kneeJoint);
    foot.matrix.translate(0, UL, 0.001)
                .rotate(-g_lowerLegAngle, 0, 0, 1)
                .translate(0, LL, 0)
                .rotate(g_lowerLegAngle + g_ankleAngle, 0, 0, 1)
                .scale(legWidth, FL, legWidth);
    drawCube(foot.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    // render left backmost leg
    upperLeg.matrix.setIdentity();
    upperLeg.matrix.setTranslate(-0.2, 0.06, 0.42)
                    .rotate(-g_upperLegAngle_2, 0, 0, 1);
    kneeJoint.set(upperLeg.matrix);
    upperLeg.matrix.scale(legWidth, UL, legWidth);
    drawCube(upperLeg.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    lowerLeg.matrix.setIdentity();
    lowerLeg.matrix.set(kneeJoint);
    lowerLeg.matrix.translate(0, UL, 0.001)
                    .rotate(-g_lowerLegAngle_2, 0, 0, 1)
                    .scale(legWidth, LL, legWidth);
    drawCube(lowerLeg.matrix, [0.4, 0.266666, 0.13333, 1.0]);
  
    foot.matrix.setIdentity();
    foot.matrix.set(kneeJoint);
    foot.matrix.translate(0, UL, 0.001)
                .rotate(-g_lowerLegAngle_2, 0, 0, 1)
                .translate(0, LL, 0)
                .rotate(g_lowerLegAngle_2 + g_ankleAngle, 0, 0, 1)
                .scale(legWidth, FL, legWidth);
    drawCube(foot.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    // render right front leg
    upperLegR.matrix.setIdentity();
    upperLegR.matrix.setTranslate(0.2, 0.1, 0.05)
                     .rotate(g_upperLegAngle, 0, 0, 1);
    kneeJointR.set(upperLegR.matrix);
    upperLegR.matrix.scale(legWidth, UL, legWidth);
    drawCube(upperLegR.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    lowerLegR.matrix.setIdentity();
    lowerLegR.matrix.set(kneeJointR);
    lowerLegR.matrix.translate(0, UL, 0)
                     .rotate(g_lowerLegAngle, 0, 0, 1)
                     .scale(legWidth, LL, legWidth);
    drawCube(lowerLegR.matrix, [0.4, 0.266666, 0.13333, 1.0]);
  
    footR.matrix.setIdentity();
    footR.matrix.set(kneeJointR);
    footR.matrix.translate(0, UL, 0)
                  .rotate(g_lowerLegAngle, 0, 0, 1)
                  .translate(0, LL, 0)
                  .rotate(-g_lowerLegAngle - g_ankleAngle, 0, 0, 1)
                  .scale(legWidth, FL, legWidth);
    drawCube(footR.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    // render right middle leg
    upperLegR.matrix.setIdentity();
    upperLegR.matrix.setTranslate(0.2, 0.1, 0.17333)
                     .rotate(g_upperLegAngle_2, 0, 0, 1);
    kneeJointR.set(upperLegR.matrix);
    upperLegR.matrix.scale(legWidth, UL, legWidth);
    drawCube(upperLegR.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    lowerLegR.matrix.setIdentity();
    lowerLegR.matrix.set(kneeJointR);
    lowerLegR.matrix.translate(0, UL, 0)
                     .rotate(g_lowerLegAngle_2, 0, 0, 1)
                     .scale(legWidth, LL, legWidth);
    drawCube(lowerLegR.matrix, [0.4, 0.266666, 0.13333, 1.0]);
  
    footR.matrix.setIdentity();
    footR.matrix.set(kneeJointR);
    footR.matrix.translate(0, UL, 0)
                  .rotate(g_lowerLegAngle_2, 0, 0, 1)
                  .translate(0, LL, 0)
                  .rotate(-g_lowerLegAngle_2 - g_ankleAngle, 0, 0, 1)
                  .scale(legWidth, FL, legWidth);
    drawCube(footR.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    // render right back leg
    upperLegR.matrix.setIdentity();
    upperLegR.matrix.setTranslate(0.2, 0.1, 0.2966666)
                     .rotate(g_upperLegAngle, 0, 0, 1);
    kneeJointR.set(upperLegR.matrix);
    upperLegR.matrix.scale(legWidth, UL, legWidth);
    drawCube(upperLegR.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    lowerLegR.matrix.setIdentity();
    lowerLegR.matrix.set(kneeJointR);
    lowerLegR.matrix.translate(0, UL, 0)
                     .rotate(g_lowerLegAngle, 0, 0, 1)
                     .scale(legWidth, LL, legWidth);
    drawCube(lowerLegR.matrix, [0.4, 0.266666, 0.13333, 1.0]);
  
    footR.matrix.setIdentity();
    footR.matrix.set(kneeJointR);
    footR.matrix.translate(0, UL, 0)
                  .rotate(g_lowerLegAngle, 0, 0, 1)
                  .translate(0, LL, 0)
                  .rotate(-g_lowerLegAngle - g_ankleAngle, 0, 0, 1)
                  .scale(legWidth, FL, legWidth);
    drawCube(footR.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    // render right backmost leg
    upperLegR.matrix.setIdentity();
    upperLegR.matrix.setTranslate(0.2, 0.1, 0.42)
                     .rotate(g_upperLegAngle_2, 0, 0, 1);
    kneeJointR.set(upperLegR.matrix);
    upperLegR.matrix.scale(legWidth, UL, legWidth);
    drawCube(upperLegR.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    lowerLegR.matrix.setIdentity();
    lowerLegR.matrix.set(kneeJointR);
    lowerLegR.matrix.translate(0, UL, 0)
                     .rotate(g_lowerLegAngle_2, 0, 0, 1)
                     .scale(legWidth, LL, legWidth);
    drawCube(lowerLegR.matrix, [0.4, 0.266666, 0.13333, 1.0]);
  
    footR.matrix.setIdentity();
    footR.matrix.set(kneeJointR);
    footR.matrix.translate(0, UL, 0)
                  .rotate(g_lowerLegAngle_2, 0, 0, 1)
                  .translate(0, LL, 0)
                  .rotate(-g_lowerLegAngle_2 - g_ankleAngle, 0, 0, 1)
                  .scale(legWidth, FL, legWidth);
    drawCube(footR.matrix, [0.3, 0.2, 0.13, 1.0]);
  
    // calculate performance
    var endTime = performance.now();
    var duration = endTime - startTime;
    var fps = 1000 / duration;
    updatePerformanceInfo(duration, fps);
}

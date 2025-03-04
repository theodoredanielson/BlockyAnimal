var globalRotMat = new Matrix4(); // global rotation matrix

var bodyCube  = new Cube(); // body cube
var headCube  = new Cube(); // head cube
var mouthCube = new Cube(); // mouth cube

var crissCube   = new Cube(); // criss cube
var crossCube   = new Cube(); // cross cube
var crissCube2  = new Cube(); // second criss cube
var crossCube2  = new Cube(); // second cross cube
var tongueCube  = new Cube(); // tongue cube

var sphereMat1 = new Matrix4(); // first sphere matrix
var sphereMat2 = new Matrix4(); // second sphere matrix

var antenna1 = new Cube(); // first antenna cube
var antenna2 = new Cube(); // second antenna cube

var upperLeg   = new Cube(); // upper leg 1 cube
var lowerLeg   = new Cube(); // lower leg 1 cube
var foot       = new Cube(); // foot 1 cube
var kneeJoint  = new Matrix4(); // knee joint 1 matrix

var upperLegR  = new Cube(); // upper leg R1 cube
var lowerLegR  = new Cube(); // lower leg R1 cube
var footR      = new Cube(); // foot R1 cube
var kneeJointR = new Matrix4(); // knee joint R1 matrix

var bodyTransform = new Matrix4(); // body transform matrix
var headTransform = new Matrix4(); // head transform matrix
var mouthTransform = new Matrix4(); // mouth transform matrix

var leftLeg1Base = new Matrix4(); // left leg 1 base matrix
var leftLeg2Base = new Matrix4(); // left leg 2 base matrix
var leftLeg3Base = new Matrix4(); // left leg 3 base matrix
var leftLeg4Base = new Matrix4(); // left leg 4 base matrix
var rightLeg1Base = new Matrix4(); // right leg 1 base matrix
var rightLeg2Base = new Matrix4(); // right leg 2 base matrix
var rightLeg3Base = new Matrix4(); // right leg 3 base matrix
var rightLeg4Base = new Matrix4(); // right leg 4 base matrix

function initStaticTransforms() {
    bodyTransform.setIdentity(); // initialize body transform
    bodyTransform.translate(-0.25, 0, 0.0)
                             .rotate(5, 1, 0, 0)
                             .scale(0.5, 0.3, 0.5);

    headTransform.setIdentity(); // initialize head transform
    headTransform.translate(-0.2, 0.025, -0.18)
                             .rotate(0, 1, 0, 0)
                             .scale(0.4, 0.2, 0.2);

    mouthTransform.setIdentity(); // initialize mouth transform
    mouthTransform.translate(-0.1, 0.05, -0.2)
                                .rotate(0, 1, 0, 0)
                                .scale(0.2, 0.02, 0.1);

    leftLeg1Base.setIdentity(); // initialize left leg 1 base
    leftLeg1Base.setTranslate(-0.2, 0.06, 0.05);

    leftLeg2Base.setIdentity(); // initialize left leg 2 base
    leftLeg2Base.setTranslate(-0.2, 0.06, 0.17333);

    leftLeg3Base.setIdentity(); // initialize left leg 3 base
    leftLeg3Base.setTranslate(-0.2, 0.06, 0.2966666);

    leftLeg4Base.setIdentity(); // initialize left leg 4 base
    leftLeg4Base.setTranslate(-0.2, 0.06, 0.42);

    rightLeg1Base.setIdentity(); // initialize right leg 1 base
    rightLeg1Base.setTranslate(0.2, 0.1, 0.05);

    rightLeg2Base.setIdentity(); // initialize right leg 2 base
    rightLeg2Base.setTranslate(0.2, 0.1, 0.17333);

    rightLeg3Base.setIdentity(); // initialize right leg 3 base
    rightLeg3Base.setTranslate(0.2, 0.1, 0.2966666);

    rightLeg4Base.setIdentity(); // initialize right leg 4 base
    rightLeg4Base.setTranslate(0.2, 0.1, 0.42);
}

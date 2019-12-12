function Transform(x, y, z) {

    this.x = x;
    this.y = y;
    this.z = z;
    this.render = new TransformRender();

    this.SetPosition = function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.UpdateTransformRender(this.x, this.y, this.z);
    }

    this.UpdatePosition = function(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
        this.UpdateTransformRender(this.x, this.y, this.z);
    }

    this.UpdateTransformRender = function(x, y, z) {
        this.render.mesh.position.x = x;
        this.render.mesh.position.y = y;
        this.render.mesh.position.z = z;
    }

    this.Copy = function() {
        return new Transform(this.x, this.y, this.z);
    }

}

function DefaultTransform() {
    return new Transform(0, 0, 0);
}

function TransformRender() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "TRANSFORM";

    var XWidth = 100;
    var XHeight = 1;
    var XDepth = 1;

    var XGeometry = new THREE.BoxGeometry(XWidth, XHeight, XDepth, 1, 1, 1);
    var XMaterial = new THREE.MeshLambertMaterial({color:COLORS.red});
    var X = new THREE.Mesh(XGeometry, XMaterial);

    X.position.x += XWidth / 2;
    this.mesh.add(X);

    var YWidth = 1;
    var YHeight = 100;
    var YDepth = 1;

    var YGeometry = new THREE.BoxGeometry(YWidth, YHeight, YDepth, 1, 1, 1);
    var YMaterial = new THREE.MeshLambertMaterial({color:COLORS.blue});
    var Y = new THREE.Mesh(YGeometry, YMaterial);

    Y.position.y += YHeight / 2;
    this.mesh.add(Y);

    var ZWidth = 1;
    var ZHeight = 1;
    var ZDepth = 100;

    var ZGeometry = new THREE.BoxGeometry(ZWidth, ZHeight, ZDepth, 1, 1, 1);
    var ZMaterial = new THREE.MeshLambertMaterial({color:COLORS.yellow});
    var Z = new THREE.Mesh(ZGeometry, ZMaterial);

    Z.position.z += ZDepth / 2;
    this.mesh.add(Z);
}
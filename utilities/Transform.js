function Transform(x, y, z, scale = 10000) {

    this.x = x;
    this.y = y;
    this.z = z;
    this.scale = scale;
    this.render = new TransformRender(10000);

    this.SetPosition = function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    this.UpdatePosition = function(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
    }

    this.Render = function() {
        this.render.mesh.position.x = this.x;
        this.render.mesh.position.y = this.y;
        this.render.mesh.position.z = this.z;
    }

    this.Copy = function() { return new Transform(this.x, this.y, this.z, this.scale); }

}

function DefaultTransform(scale) { return new Transform(0, 0, 0); }

function TransformRender(scale) {

    Render.call(this);
    this.scale = scale;

    this.Init = function() {
        this.mesh.name = "TRANSFORM";
        var XWidth = this.scale;
        var XHeight = 1;
        var XDepth = 1;

        var XGeometry = new THREE.BoxGeometry(XWidth, XHeight, XDepth, 1, 1, 1);
        var XMaterial = new THREE.MeshLambertMaterial({color:COLORS.red, transparent: true, opacity: 1});
        var X = new THREE.Mesh(XGeometry, XMaterial);
        this.mesh.add(X);

        var YWidth = 1;
        var YHeight = this.scale;
        var YDepth = 1;

        var YGeometry = new THREE.BoxGeometry(YWidth, YHeight, YDepth, 1, 1, 1);
        var YMaterial = new THREE.MeshLambertMaterial({color:COLORS.blue, transparent: true, opacity: 1});
        var Y = new THREE.Mesh(YGeometry, YMaterial);
        this.mesh.add(Y);

        var ZWidth = 1;
        var ZHeight = 1;
        var ZDepth = this.scale;

        var ZGeometry = new THREE.BoxGeometry(ZWidth, ZHeight, ZDepth, 1, 1, 1);
        var ZMaterial = new THREE.MeshLambertMaterial({color:COLORS.yellow, transparent: true, opacity: 1});
        var Z = new THREE.Mesh(ZGeometry, ZMaterial);
        this.mesh.add(Z);
    }
}

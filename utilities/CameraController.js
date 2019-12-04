function CameraController(camera, zoom) {

    this.camera = camera;
    this.cameraPosition = {x: 0, y: 0, z: 1};
    this.zoom = zoom;
    this.zoomMin = 0;
    this.zoomMax = zoom * 2;
    this.zoomSpeed = 10;

    this.Init = function() {
        var _SetCameraPosition = this.SetCameraPosition;
        var cameraController = this
        window.addEventListener('keydown', function(keyEvent) {
            _SetCameraPosition(keyEvent, cameraController);
        });
    }

    this.SetZoom = function(zoom) {
        this.zoom = zoom;
    }

    this.SetCameraPosition = function(keyEvent, cameraController) {

        if (keyEvent.key == "t") {
            cameraController.cameraPosition = {x: 0, y: 1, z: 0};
        }
        else if (keyEvent.key == "s") {
            cameraController.cameraPosition = {x: 1, y: 0, z: 0};
        }

        else if (keyEvent.key == "f") {
            cameraController.cameraPosition = {x: 0, y: 0, z: 1};
        }

        if (keyEvent.key == "z") {
            cameraController.zoom += cameraController.zoomSpeed;
        }

        else if (keyEvent.key == "x") {
           cameraController.zoom -= cameraController.zoomSpeed;
        }
        cameraController.zoom = Bound(cameraController.zoom, cameraController.zoomMin, cameraController.zoomMax);

        cameraController.camera.position.x = cameraController.cameraPosition.x * cameraController.zoom;
        cameraController.camera.position.y = cameraController.cameraPosition.y * cameraController.zoom;
        cameraController.camera.position.z = cameraController.cameraPosition.z * cameraController.zoom;
        cameraController.camera.lookAt(new THREE.Vector3(0, 0, 0));

    }

}

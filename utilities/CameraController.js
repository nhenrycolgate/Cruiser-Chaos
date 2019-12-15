function CameraController(camera, zoom) {

    Controller.call(this, "CAMERA_CONTROLLER");

    this.camera = camera;
    this.cameraPosition = {x: 0, y: 1.0, z: 0};
    this.zoom = zoom;
    this.zoomMin = 0;
    this.zoomMax = zoom * 2;
    this.zoomSpeed = 10;
    this.direction = -1;
    this.moveSpeed = 0.01;
    this.theta = 0;
    this.gamma = 0;

    this.Init = function() {
        var _SetCameraPosition = this.SetCameraPosition;
        var cameraController = this;
        window.addEventListener('keydown', function(keyEvent) {
            _SetCameraPosition(keyEvent, cameraController);
        });
    }

    this.SetZoom = function(zoom) { this.zoom = zoom; }

    this.SetCameraPosition = function(keyEvent, cameraController) {
        if (keyEvent.key == "1") {
            cameraController.cameraPosition = {x: 0, y: 2, z: 1};
        }
        else if (keyEvent.key == "2") {
            cameraController.cameraPosition = {x: 2, y: 1, z: 1};
        }
        else if (keyEvent.key == "3") {
            cameraController.cameraPosition = {x: 0, y:1.3, z: 0.3};
        }
        else if (keyEvent.key == "4") {
            cameraController.direction *= -1;
        }
        else if (keyEvent.key == "[") {
            console.log("do");
            cameraController.zoom += cameraController.zoomSpeed;
        }
        else if (keyEvent.key == "]") {
           cameraController.zoom -= cameraController.zoomSpeed;
        }
        else if (keyEvent.key == "x") {
            cameraController.cameraPosition.x += cameraController.moveSpeed * (cameraController.direction);
        }
        else if (keyEvent.key == "y") {
            cameraController.cameraPosition.y += cameraController.moveSpeed * (cameraController.direction);
        }
        else if (keyEvent.key == "z") {
            cameraController.cameraPosition.z += cameraController.moveSpeed * (cameraController.direction);
        }

        cameraController.zoom = Bound(cameraController.zoom, cameraController.zoomMin, cameraController.zoomMax);

        cameraController.camera.position.x = cameraController.cameraPosition.x * cameraController.zoom;
        cameraController.camera.position.y = cameraController.cameraPosition.y * cameraController.zoom;
        cameraController.camera.position.z = cameraController.cameraPosition.z * cameraController.zoom;
        cameraController.camera.lookAt(new THREE.Vector3(0, 0, 0));

    }

}

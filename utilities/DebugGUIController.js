function DebugGUIController(gui) {

    this.gui = gui;

    this.open = false;

    this.Init = function() {
        var _ShowDebugGUI = this.ShowGUI;
        var debugGUI = this;
        window.addEventListener('keydown', function(keyEvent) {
            _ShowDebugGUI(keyEvent, debugGUI);
        });
    }

    this.ShowGUI = function(keyEvent, debugGUI) {
        if (keyEvent.key == "u") {
          if (debugGUI.open) {
             debugGUI.open = false;
             debugGUI.gui.close();

          } else {
            debugGUI.open = true;
            debugGUI.gui.open();
          }
        }

    }

}

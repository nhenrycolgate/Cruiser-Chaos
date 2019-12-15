function DebugGUIController(gui, showStats, hideStats) {

    Controller.call(this, "GUI_CONTROLLER");
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
             hideStats();

          } else {
            debugGUI.open = true;
            debugGUI.gui.open();
            showStats();
          }
        }

    }

}

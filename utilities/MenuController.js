function MenuController(engine) {

    this.beginGameMenu = document.getElementById("beginGameMenu");
    this.gameUI = document.getElementById("gameUI");
    this.gameOverMenu = document.getElementById("gameOverMenu");

    this.beginGameMenuOpen = true;
    this.gameUIOpen = false;
    this.gameOverMenuOpen = false;

    Controller.call(this, "MENU_CONTROLLER");

    this.Init = function() {
        var _ToggleMenu = this.ToggleMenu;
        var toggleMenu = this;
        window.addEventListener('keydown', function(keyEvent) {
            _ToggleMenu(keyEvent, toggleMenu);
        });
    }

    this.ToggleMenu = function(keyEvent, toggleMenu) {
      toggleMenu.callbackHandler.Invoke("ON_START_GAME");
      if (toggleMenu.beginGameMenuOpen) {
        toggleMenu.ShowBeginGameMenu(false);
        toggleMenu.ShowGameUI(true);
      }
      if (toggleMenu.gameOverMenuOpen) {
        toggleMenu.ShowGameOverMenu(false);

        // https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript
        window.location.reload(false);
      }
    }

    this.ShowBeginGameMenu = function(show) {
      beginGameMenu.className = show ? "show" : "";
      this.beginGameMenuOpen = show;
    }

    this.ShowGameUI = function(show) {
      gameUI.className = show ? "show" : "";
      this.gameUIOpen = show;
    }

    this.ShowGameOverMenu = function(show) {
      gameOverMenu.className = show ? "show" : "";
      this.gameOverMenuOpen = show;
      this.ShowGameUI(false);
    }

    this.RegisterOnStart= function(callback) { this.callbackHandler.AddCallback("ON_START_GAME", callback) }

}

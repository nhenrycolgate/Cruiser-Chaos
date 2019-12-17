function MenuController() {

    this.beginGameMenu = document.getElementById("beginGameMenu");
    this.gameUI = document.getElementById("gameUI");
    this.gameOverMenu = document.getElementById("gameOverMenu");

    this.beginGameMenuOpen = false;
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
        if (keyEvent.key == "[") {
          this.beginGameMenuOpen = !this.beginGameMenuOpen;
          toggleMenu.ShowBeginGameMenu(this.beginGameMenuOpen);
        } else if (keyEvent.key == "]"){
          this.gameUIOpen = !this.gameUIOpen;
          toggleMenu.ShowGameUI(this.gameUIOpen);
        } else if (keyEvent.key == '\\') {
          this.gameOverMenuOpen = !this.gameOverMenuOpen;
          toggleMenu.ShowGameOverMenu(this.gameOverMenuOpen);
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
    }

}

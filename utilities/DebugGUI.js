// Template found at https://stemkoski.github.io/Three.js/GUI.html

function DebugGUI() {

    // Add whatever data you need to this GUI
    var gui = new dat.GUI();
    var parameters =
    {
      a: 200, // numeric
      b: 200, // numeric slider
      c: "Hello, GUI!", // string
      d: false, // boolean (checkbox)
      e: "#ff8800", // color (hex)
      f: function() { alert("Hello!") },
      g: function() { alert( parameters.c ) },
      v : 0,    // dummy value, only type is important
      w: "...", // dummy value, only type is important
      x: 0, y: 0, z: 0
    };

    gui.add( parameters, 'a' ).name('Number');
    gui.add( parameters, 'b' ).min(128).max(256).step(16).name('Slider');
    gui.add( parameters, 'c' ).name('String');
    gui.add( parameters, 'd' ).name('Boolean');

    gui.addColor( parameters, 'e' ).name('Color');

    var numberList = [1, 2, 3];
    gui.add( parameters, 'v', numberList ).name('List');

    var stringList = ["One", "Two", "Three"];
    gui.add( parameters, 'w', stringList ).name('List');

    gui.add( parameters, 'f' ).name('Say "Hello!"');
    gui.add( parameters, 'g' ).name("Alert Message");

    var folder1 = gui.addFolder('Coordinates');
    folder1.add( parameters, 'x' );
    folder1.add( parameters, 'y' );
    folder1.close();

    gui.close();
    return gui;
}

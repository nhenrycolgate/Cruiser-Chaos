function Render(data) {

    this.data = data;

    this.Copy = function(engine) {
        var meshCopy = this.mesh.clone();
        var renderCopy = new Render(this.data);
        renderCopy.mesh = meshCopy;
        return renderCopy;
    }

}

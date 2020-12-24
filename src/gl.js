function GLInstance(canvasID) {
    var canvas = document.getElementById(canvasID),
    gl = canvas.getContext("webgl2");

    if(!gl) {
        console.error("WebGL context is not available.");
        return null;  
    }

    // -----------------------------------------------------
    // Setup GL, and all the default configurations we need.
    // Set clear color.
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // -----------------------------------------------------
    // Methods.
    gl.fClear = function() {
        this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
        return this;
    }

    // -----------------------------------------------------
    // Setters - Getters

    // Set the size of the canvas html element and the rendering viewport.
    gl.fSetSize = function(w,h) {
        // Set the size of the canvas.
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        this.canvas.width = w;
        this.canvas.height = h;

        // When updating the canvas size, must reset the viewport of the canvas.
        this.viewport(0, 0, w, h);
        return this;
    }

    return gl;
}
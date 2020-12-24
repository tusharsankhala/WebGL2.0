class ShaderUtil {
    static domShaderSrc(elmID) {
        var elm = document.getElementById(elmID);
        if(!elm || elm.text == "") {
            console.log(elmID + "shader not found or no text.");
            return null;
        }

        return elm.text;
    }

    static createShader(gl, src, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);

        // Get the error data if the shader
        // compling failed.
        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Error Compiling Shader: " + src, gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    static createProgram(gl, vShader, fShader, doValidate) {
        var program = gl.createProgram();
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);

        // Get the error data if the program
        // linking failed.
        if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Error Creating Shader Program.", gl.getProgramInfoLog(program));
            glDeleteProgram(program);
            return null;
        }

        // Only for additional debugging.
        if(doValidate) {
            gl.validateProgram(program);
            if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                console.error("Error Validating Program.", gl.getProgramInfoLog(program));
                glDeleteProgram(program);
                return null;
            }
        }

        // Can delete the shaders since the program has been
        // made.
        gl.detachShader(program, vShader);
        gl.detachShader(program, fShader);

        gl.deleteShader(vShader);
        gl.deleteShader(fShader);

        return program;
    }
}
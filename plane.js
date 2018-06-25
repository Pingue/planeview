alert("planes")
main()
function main()
{
    firstobj = {x:1, y:2, z:3}
    secondobj = {x:1, y:2, z:1}

    var c = document.getElementById("canvas");
    var gl = c.getContext("webgl");

    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0.5, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

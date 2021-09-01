varying vec2 v_uv;

void main() {
    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    // pass the texture coordinate as well
    v_uv = uv;
}

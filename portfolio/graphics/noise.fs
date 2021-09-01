/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

// get the texture from the program
uniform sampler2D tex;

void main() {
    float rand = fract(sin(dot(v_uv.xy, vec2(100, 1111))) * 2468.0246) * 0.3;

    // assign the texture
    gl_FragColor = texture2D(tex, v_uv) + rand;
}

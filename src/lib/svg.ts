/**
 * Serialize a coordinate so the server and the browser emit byte-identical SVG.
 *
 * Charts here are generated from floating-point math (sin, cos, exp, log), and
 * those transcendental results differ in their last bits between the SSR engine
 * and V8. Left raw, an attribute such as `cy="0.17911169194667384"` hydrates
 * against `0.17911169194667134` and React logs a hydration mismatch. Rounding to
 * a fixed precision removes the difference; three decimals is well below the
 * sub-pixel resolution of any chart in this app.
 */
export const coord = (v: number) => (Number.isFinite(v) ? v.toFixed(3) : "0");

/** Build an SVG path from points, rounding every coordinate on the way out. */
export const linePath = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${coord(x)},${coord(y)}`).join("");

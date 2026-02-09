import * as script from "./script";

test("Putting first ship in (0,0) coordinates non rotated", () => {
  expect(script.message1).toBe("Successfully placed non-rotated ship");
});

test("Putting second ship in (0,1) coordinates non rotated", () => {
  expect(script.message2).toBe("Positions selected not empty");
});

test("Putting fifth ship in (8,1) coordinates while rotated", () => {
  expect(script.message3).toBe("Positions selected are outside of the board");
});

test("Putting fifth ship in (2,4) coordinates while rotated", () => {
  expect(script.message4).toBe("Successfully placed rotated ship");
});

test("Ship intact with 0 hits", () => {
  expect(script.beforeHit).toBe(0);
});

test("Ship damaged with 1 hits", () => {
  expect(script.afterHit).toBe(1);
});

test("Missed attack tracked", () => {
  expect(script.missedShot).toEqual({ x: 3, y: 7 });
});

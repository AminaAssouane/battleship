import * as index from "./index";

test("Putting first ship in (0,0) coordinates non rotated", () => {
  expect(index.message1).toBe("Successfully placed non-rotated ship");
});

test("Putting second ship in (0,1) coordinates non rotated", () => {
  expect(index.message2).toBe("Positions selected not empty");
});

test("Putting fifth ship in (8,1) coordinates while rotated", () => {
  expect(index.message3).toBe("Positions selected are outside of the board");
});

test("Putting fifth ship in (2,4) coordinates while rotated", () => {
  expect(index.message4).toBe("Successfully placed rotated ship");
});

test("Ship intact with 0 hits", () => {
  expect(index.beforeHit).toBe(0);
});

test("Ship damaged with 1 hits", () => {
  expect(index.afterHit).toBe(1);
});

test("Missed attack tracked", () => {
  expect(index.missedShot).toEqual({ x: 3, y: 7 });
});

import * as index from "./index";

test("Putting first ship in (0,0) coordinates non rotated", () => {
  expect(index.message1).toBe("Successfully placed non-rotated ship");
});

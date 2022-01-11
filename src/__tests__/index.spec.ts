import JTax from "..";

test("hello", () => {
  const jtax = new JTax();
  expect(jtax.hello()).toBe("Hello");
});

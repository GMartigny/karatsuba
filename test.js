const test = require("ava");
const karatsuba = require(".");

test("multiplication", (t) => {
    t.is(karatsuba(0, 65432168), 0);
    t.is(karatsuba(12, 6), 72);
    t.is(karatsuba(45, 89), 4005);
    t.is(karatsuba(345, 789), 272205);
    t.is(karatsuba(12345, 6789), 83810205);
});

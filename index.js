/**
 * In order to shave off multiplications, we can replace multiplication by power of 10 to adding zeros at the end
 * @param {Number} n - Any number
 * @param {Number} zeros - Number of zeros to add
 * @return {Number}
 * @example multByPow10(123, 4) => 1230000
 */
const multByPow10 = (n, zeros) => Number(`${n}${"0".repeat(zeros)}`);

const sum = array => array.reduce((acc, val) => acc + val);

const split = (str, nb) => [Number(str.substr(0, nb)), Number(str.substr(nb))];

/**
 * Multiply two number with fewer multiplications that the classic school algorithm
 * @param {Number} a - Any number
 * @param {Number} b - Any number
 * @example karatsuba(12, 345) => 4140
 * @return {Number}
 */
const karatsuba = (a, b) => {
    if (a === 0 || b === 0) return 0;

    // Swap variable so "a" is always the largest
    if (a < b) [a, b] = [b, a];

    a = a.toString();
    // b is single digit long
    if (b < 10) {
        const l = a.length - 1;
        // This is only time we do a linear multiplication since we can't split b further
        return sum(a.split("").map((val, i) => multByPow10(val * b, l - i)));
    }

    const pivot = Math.floor(a.length / 2);

    const splitA = split(a, pivot);
    const splitB = split(b.toString().padStart(a.length, "0"), pivot);

    const z2 = karatsuba(splitA[0], splitB[0]);
    const z0 = karatsuba(splitA[1], splitB[1]);
    const z1 = karatsuba(splitA[0] + splitA[1], splitB[0] + splitB[1]) - z2 - z0;

    return multByPow10(z2, pivot + pivot) + multByPow10(z1, pivot) + z0;
};

module.exports = karatsuba;

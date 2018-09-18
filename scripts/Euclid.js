'use strict';

function euclid(a, b) {
    if (a === 0) {
        return {x: 0, y: 1, b: b};
    }
    let r = euclid(b % a, a);
    return {
        x: r.y - Math.floor(b / a) * r.x,
        y: r.x,
        b: r.b
    };
}

function gcd(a, b) {
    return euclid(a, b).b;
}

function lcm(a, b) {
    return a / euclid(a, b).b * b;
}

function inverseModule(a, m) {
    let d = euclid(a, m);
    if (d.b !== 1) {
        return null;
    }
    while (d.x < 0)
        d.x += m;
    return d.x;
}

module.exports.gcd = gcd;
module.exports.lcm = lcm;
module.exports.inverseModule = inverseModule;
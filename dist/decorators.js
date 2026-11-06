"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateSpellPower = ValidateSpellPower;
exports.Cache = Cache;
function ValidateSpellPower(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const candidate = args[0];
        if (typeof candidate === "object" &&
            candidate !== null &&
            "power" in candidate &&
            typeof candidate.power === "number" &&
            candidate.power < 0) {
            throw new Error("Spell power cannot be negative");
        }
        return originalMethod.apply(this, args);
    };
}
function Cache(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    const instanceCaches = new WeakMap();
    descriptor.value = function (...args) {
        let cache = instanceCaches.get(this);
        if (!cache) {
            cache = new Map();
            instanceCaches.set(this, cache);
        }
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log(`[CACHE HIT] ${String(propertyKey)}`);
            return cache.get(key);
        }
        console.log(`[CACHE MISS] ${String(propertyKey)}`);
        const result = originalMethod.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

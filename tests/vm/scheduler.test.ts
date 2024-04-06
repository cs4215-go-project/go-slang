import { describe, expect, test } from '@jest/globals';
import { FIFOScheduler } from '../../src/vm/scheduler';

describe("scheduler", () => {
    test("multiple", () => {
        const scheduler = new FIFOScheduler()
        const g1 = scheduler.scheduleGoroutine()
        expect(scheduler.numGoroutine()).toBe(1)
        expect(scheduler.numReadyGoroutine()).toBe(1)
        expect(scheduler.currentGoroutine()).toBe(undefined)

        scheduler.runNextGoroutine()
        expect(scheduler.currentGoroutine()).toBe(g1)
        expect(scheduler.numGoroutine()).toBe(1)
        expect(scheduler.numReadyGoroutine()).toBe(0)

        const g2 = scheduler.scheduleGoroutine()
        expect(scheduler.numGoroutine()).toBe(2)
        expect(scheduler.numReadyGoroutine()).toBe(1)
        expect(scheduler.currentGoroutine()).toBe(g1)

        // block g1
        scheduler.interruptGoroutine(true)
        expect(scheduler.numGoroutine()).toBe(2)
        expect(scheduler.numReadyGoroutine()).toBe(1)
        expect(scheduler.numBlockedGoroutine()).toBe(1)
        expect(scheduler.currentGoroutine()).toBe(undefined)

        scheduler.runNextGoroutine()
        expect(scheduler.numGoroutine()).toBe(2)
        expect(scheduler.currentGoroutine()).toBe(g2)
        expect(scheduler.numReadyGoroutine()).toBe(0)
        expect(scheduler.numBlockedGoroutine()).toBe(1)

        scheduler.terminateGoroutine(g2)
        expect(scheduler.numGoroutine()).toBe(1)
        expect(scheduler.numReadyGoroutine()).toBe(0)
        expect(scheduler.numBlockedGoroutine()).toBe(1)
        expect(scheduler.currentGoroutine()).toBe(undefined)

        scheduler.runNextGoroutine()
        expect(scheduler.numGoroutine()).toBe(1)
        expect(scheduler.numReadyGoroutine()).toBe(0)
        expect(scheduler.numBlockedGoroutine()).toBe(1)
        expect(scheduler.currentGoroutine()).toBe(undefined)

        scheduler.wakeUpGoroutine(g1)
        expect(scheduler.numGoroutine()).toBe(1)
        expect(scheduler.numReadyGoroutine()).toBe(1)
        expect(scheduler.numBlockedGoroutine()).toBe(0)
        expect(scheduler.currentGoroutine()).toBe(undefined)

        scheduler.runNextGoroutine()
        expect(scheduler.numGoroutine()).toBe(1)
        expect(scheduler.numReadyGoroutine()).toBe(0)
        expect(scheduler.numBlockedGoroutine()).toBe(0)
        expect(scheduler.currentGoroutine()).toBe(g1)
    })

    test("interleave", () => {
        const scheduler = new FIFOScheduler()
        const g1 = scheduler.scheduleGoroutine()
        expect(scheduler.numGoroutine()).toBe(1)
        expect(scheduler.numReadyGoroutine()).toBe(1)
        expect(scheduler.currentGoroutine()).toBe(undefined)

        scheduler.runNextGoroutine()
        expect(scheduler.currentGoroutine()).toBe(g1)
        expect(scheduler.numGoroutine()).toBe(1)
        expect(scheduler.numReadyGoroutine()).toBe(0)

        const g2 = scheduler.scheduleGoroutine()
        expect(scheduler.numGoroutine()).toBe(2)
        expect(scheduler.numReadyGoroutine()).toBe(1)
        expect(scheduler.currentGoroutine()).toBe(g1)

        // interrupt g1 but not block
        scheduler.interruptGoroutine(false)
        expect(scheduler.numGoroutine()).toBe(2)
        expect(scheduler.numReadyGoroutine()).toBe(2)
        expect(scheduler.numBlockedGoroutine()).toBe(0)
        expect(scheduler.currentGoroutine()).toBe(undefined)

        scheduler.runNextGoroutine()
        expect(scheduler.numGoroutine()).toBe(2)
        expect(scheduler.currentGoroutine()).toBe(g2)
        expect(scheduler.numReadyGoroutine()).toBe(1)
        expect(scheduler.numBlockedGoroutine()).toBe(0)

        scheduler.interruptGoroutine(false)
        scheduler.runNextGoroutine()
        expect(scheduler.numGoroutine()).toBe(2)
        expect(scheduler.currentGoroutine()).toBe(g1)
        expect(scheduler.numReadyGoroutine()).toBe(1)
        expect(scheduler.numBlockedGoroutine()).toBe(0)

        scheduler.interruptGoroutine(false)
        scheduler.runNextGoroutine()
        expect(scheduler.numGoroutine()).toBe(2)
        expect(scheduler.currentGoroutine()).toBe(g2)
        expect(scheduler.numReadyGoroutine()).toBe(1)
        expect(scheduler.numBlockedGoroutine()).toBe(0)

        scheduler.interruptGoroutine(false)
        scheduler.runNextGoroutine()
        expect(scheduler.numGoroutine()).toBe(2)
        expect(scheduler.currentGoroutine()).toBe(g1)
        expect(scheduler.numReadyGoroutine()).toBe(1)
        expect(scheduler.numBlockedGoroutine()).toBe(0)
    })
})

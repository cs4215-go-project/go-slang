
export type GoroutineId = number

export interface Scheduler {
    numGoroutine(): number;
    currentGoroutine(): GoroutineId;
    numBlockedGoroutine(): number;
    blockedGoroutines(): GoroutineId[];
    // schedules a brand new goroutine
    scheduleGoroutine(): GoroutineId;
    terminateGoroutine(g: GoroutineId): void;
    // null means main is done?
    runNextGoroutine(): [GoroutineId, number] | null;
    interruptGoroutine(isBlocked: boolean): void;
    wakeUpGoroutine(g: GoroutineId): void;
}

export class FIFOScheduler implements Scheduler {
    private currentGoroutineId: GoroutineId = undefined    
    private readyQueue: GoroutineId[] = []
    private blockedQueue: GoroutineId[] = []
    private nextGoroutineId: GoroutineId = 0
    private timeQuanta: number = 1 + 1

    numGoroutine(): number {
        return this.readyQueue.length + this.blockedQueue.length + (this.currentGoroutineId === undefined ? 0 : 1)
    }

    currentGoroutine(): number {
        return this.currentGoroutineId
    }

    numReadyGoroutine(): number {
        return this.readyQueue.length
    }

    numBlockedGoroutine(): number {
        return this.blockedQueue.length
    }

    blockedGoroutines(): GoroutineId[] {
        return this.blockedQueue
    }

    scheduleGoroutine(): GoroutineId {
        const g = this.nextGoroutineId++
        this.readyQueue.push(g)
        return g
    }

    terminateGoroutine(g: GoroutineId): void {
        if (this.currentGoroutineId === g) {
            this.currentGoroutineId = undefined
            return
        }
        this.readyQueue = this.readyQueue.filter((id) => id !== g)
        this.blockedQueue = this.blockedQueue.filter((id) => id !== g)
    }

    runNextGoroutine(): [GoroutineId, number] | null {
        if (this.readyQueue.length === 0 && this.blockedQueue.length === 0) {
            return null
        } else if (this.readyQueue.length !== 0) {
            const g = this.readyQueue.shift()!
            this.currentGoroutineId = g
            if (g === 1) {
                return [g, 10]
            } else {
                return [g, this.timeQuanta]
            }
        } else {
            // ready is empty, but blocked is not
            // so do nothing?
        }
    }

    interruptGoroutine(isBlocked: boolean): void {
        if (isBlocked) {
            this.blockedQueue.push(this.currentGoroutineId)
        } else {
            this.readyQueue.push(this.currentGoroutineId)
        }
        this.currentGoroutineId = undefined
    }

    wakeUpGoroutine(g: GoroutineId): void {
        for (let i = 0; i < this.blockedQueue.length; i++) {
            if (this.blockedQueue[i] === g) {
                this.blockedQueue.splice(i, 1)
                this.readyQueue.push(g)
                return
            }
        }
    }
}

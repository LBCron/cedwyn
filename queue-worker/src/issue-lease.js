import { DurableObject } from "cloudflare:workers";
import { claimLease, readLease, releaseLease, renewLease } from "./lease-core.js";

export class IssueLease extends DurableObject {
  async getLease() {
    return readLease(this.ctx.storage);
  }

  async claim(agent, ttlMs) {
    return claimLease(this.ctx.storage, agent, Date.now(), ttlMs);
  }

  async renew(agent, ttlMs) {
    return renewLease(this.ctx.storage, agent, Date.now(), ttlMs);
  }

  async release(agent) {
    return releaseLease(this.ctx.storage, agent, Date.now());
  }
}

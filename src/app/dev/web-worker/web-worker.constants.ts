// count of sols recieved
export const COMPUTE_PROGRESS = '[DEV WORKER TO TARGET] COMPUTE PROGRESS';

// end of computation
export const COMPUTE_END = '[DEV WORKER TO TARGET] COMPUTE END';

// some alert
export const WORKER_ALERT = '[DEV WORKER TO TARGET] WORKER ALERT';

// compute on thread
export const COMPUTE = '[DEV TARGET TO WORKER] COMPUTE';

// abort thread
export const ABORT = '[DEV TARGET TO WORKER] ABORT';

/**
 * Specifies the types of messages used between worker and target
 * [DEV WORKER] specifies this message type is coming from the worker
 * [DEV TARGET] specifies this message type is coming from the target
 */

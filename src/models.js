const WORKER_DIR = "./workers/"

export const MODELS = {
    DOLLY_V2: 'DOLLY_V2',
    GPT_2: 'GPT_2',
    GPT_J: 'GPT_J',
    GPT_NEO_X: 'GPT_NEO_X',
    MPT: 'MPT',
    REPLIT: 'REPLIT',
    STARCODER: 'STARCODER'
}

export const MODEL_WORKER = {
    DOLLY_V2: WORKER_DIR + 'dollyv2-worker.js',
    GPT_2: WORKER_DIR + 'gpt2-worker.js',
    GPT_J: WORKER_DIR + 'gptj-worker.js',
    GPT_NEO_X: WORKER_DIR + 'gptneox-worker.js',
    MPT: WORKER_DIR + 'mpt-worker.js',
    REPLIT: WORKER_DIR + 'replit-worker.js',
    STARCODER: WORKER_DIR + 'starcoder-worker.js',
}


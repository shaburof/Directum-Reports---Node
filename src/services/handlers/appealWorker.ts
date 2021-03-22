import { Worker } from 'worker_threads';
import dotenv from 'dotenv';
import { appealType, resultType } from '../../types/types';
dotenv.config();

class AppealWorker {

    public static start(appeals: appealType[]): Promise<resultType> {
        return new Promise((resolve, reject) => {
            let workerPath = process.env.WORKER_PATH;
            if (!workerPath) throw new Error('workerPath не определен');

            const worker = new Worker(workerPath, {
                workerData: appeals
            });

            worker.on('message', message => resolve(message));
            worker.on('error', error => reject(error));
            worker.on('exit', (code) => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    }
}

export { AppealWorker }
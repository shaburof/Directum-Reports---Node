import { workerData, parentPort } from 'worker_threads';
import { AppealHander } from '../appealHander';

(async () => {
    let appealHandler = new AppealHander(workerData);
    let result = await appealHandler.handl();
    parentPort!.postMessage(result);
})();
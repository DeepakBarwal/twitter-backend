import {helper} from './helper-service.js';

export const execute = () => {
    const result = helper();
    if (result) {
        return 'learning js';
    } else {
        return 'learning reactjs'
    }
}
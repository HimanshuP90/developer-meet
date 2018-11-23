import { TEST_DISPTACH } from './types';

// Register User
export const  registeruser = (userdata) => {
    return {
        type: TEST_DISPTACH,
        payload: userdata
    }
};
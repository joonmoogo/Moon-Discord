import { atom} from 'recoil';

export const myUsernameState = atom({
    key: 'myUsernameState',
    default: 'test',
});

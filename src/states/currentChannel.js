import { atom} from 'recoil';

export const currentChannelState = atom({
    key: 'currentChannelState',
    default: 'test',
});

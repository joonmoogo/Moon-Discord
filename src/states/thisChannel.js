import { atom} from 'recoil';
export const thisChannelState = atom({
    key: 'thisChannelState',
    default: {
        channelName: "",
        channelUsers: [],
        chattingLogs: []
    },
});
//useUserStore.js
import { userInfoStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

export default function () {
    const userStore = userInfoStore();
    const { userInfo } = storeToRefs(userStore);
    return { userInfo }
}
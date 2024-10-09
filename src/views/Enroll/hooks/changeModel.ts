import { ref } from 'vue';
export default function changeModel() {
    const nowIdx = ref(0);
    const ChangeNowIdx = () => {
        if (nowIdx.value == 0)
            nowIdx.value = 1
        else
            nowIdx.value = 0;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return { nowIdx, ChangeNowIdx }
}
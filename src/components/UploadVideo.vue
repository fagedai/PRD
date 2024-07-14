<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { UploadErollRecord } from '@/apis/enroll';

//绑定父组件数据
const fileUrl = defineModel()

//显示文件和响应数据
const videoUrl = ref<string | null>(null); // 声明 videoUrl 为可变的 string 类型或 null

const selectVideo = async () => {
    const fileInput = document.createElement('input') as HTMLInputElement; // 指定 fileInput 为 HTMLInputElement
    fileInput.type = 'file';
    fileInput.accept = '.mp4';
    fileInput.click();

    fileInput.addEventListener('change', async (event: Event) => {
        const file = (event.target as HTMLInputElement).files[0]; // 指定 file 为 File 类型
        if (!file) return;
        if (file.type.startsWith('video/')) {
            const video = URL.createObjectURL(file);
            videoUrl.value = video;
            await UploadErollRecord(file).then((res: any) => {
                if (res.msg == '操作成功') { fileUrl.value = res.url }
            })
        } else {
            ElMessage.error('请选择视频文件');
            videoUrl.value = null;
        }
    });

};

const resetVideo = () => {
    videoUrl.value = null; // 重置 videoUrl 为 null
};
</script>

<template>
    <div class="video-upload">
        <div v-if="!videoUrl" class="upload-button">
            <button @click.prevent="selectVideo">
                <img src="/src/assets/PC端_slices/矢量智能对象 拷贝 3(2).png" alt="">
                <p style="color:#F1F1F1">上传视频</p>
            </button>
        </div>
        <div v-if="videoUrl">
            <video :src="videoUrl" controls class="video-player"></video>
            <button @click="resetVideo" class="remove">X</button>
        </div>
    </div>
</template>

<style scoped>
.video-upload {
    float: left;
    position: relative;
    width: 240px;
    height: 120px;
    margin: 10px 20px 0 0;
}

.upload-button {
    width: 240px;
    height: 120px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.upload-button button {
    width: 238px;
    height: 120px;
    border: none;
    background-color: #fff;
    color: #333;
    cursor: pointer;
}

.video-player {
    width: 240px;
    height: 120px;
    object-fit: cover;
}

.remove {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
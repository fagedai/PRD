<script setup>
import Login from '@/views/Login/index.vue';
import { ref } from 'vue';

const isLogin = localStorage.getItem('isLogin')
const showLogin = ref(false);
const ToEnroll = (event) => {
    if (isLogin) {
        sessionStorage.setItem('activeIndex', 2);
    }
    else {
        event.preventDefault();
        showLogin.value = true;
    }
}
const ToGuide = () => {
    sessionStorage.setItem('activeIndex', 1);
}

</script>

<template>
    <div class="pri">
        <div class="pri_up">
            <img src="@/assets/PC端_slices/组 2.png" alt="">
            <div class="pri_up_font">
                <h1 style="font-size: 55px; color: #fff;">2023青岛市中职教学能力大赛平台</h1>
                <a href="/home/enroll" class="pri_to" @click="ToEnroll">
                    我要报名
                    <i></i>
                </a>
            </div>
        </div>
        <div class="pri_mid">
            <div class="pri_mid_head">
                <h1>赛事流程</h1>
            </div>
            <ul>
                <li>
                    <img src="@/assets/PC端_slices/组 4(1).png" alt="">
                    <h1>登录报名</h1>
                </li>
                <li>
                    <img src="@/assets/PC端_slices/组 5.png" alt="">
                    <h1>提交作品</h1>
                </li>
                <li>
                    <img src="@/assets/PC端_slices/组 6.png" alt="">
                    <h1>作品评审</h1>
                </li>
                <li>
                    <img src="@/assets/PC端_slices/组 7.png" alt="">
                    <h1>获奖公示</h1>
                </li>
            </ul>
            <div class="pri_mid_head">
                <h1>比赛指南</h1>
            </div>
            <div class="pri_mid_guide">
                <h2>2023年青岛市中等职业学校技能大赛教学能力比赛规程</h2>
                <br>
                <h3>一、指导思想</h3>
                <p>深入贯彻习近平总书记关于职业教育的重要指示，落实全国职业教育大会精神，按照《国家职业教育改革实施方案》等部署，坚持“以赛促教、以赛促研，以赛促建、以赛促改”的总体思路，引导各校围绕立德树人根本任务，构建“三全育人”体系，深化“课程思政”建设；引导各校切实推进国家教学标准落地，积极探索“岗课赛证”融合育人模式，创新发展项目教学、情境教学、线上线下混合式教学模式；引导各校持续深化教师、教材、教法“三教改革”，持续提升学校改进教育教学管理的能力；引导各校推进高水平、结构化教师教学团队建设，提高教师的师德践行能力、专业教学能力、综合育人和自主发展能力，推动示范性教学，促进“能说会做”的“双师型”教师成长。
                </p>
                <h3>二、比赛要求</h3>
                <p>重点考察教学团队（2-4人）针对某门课程中部分教学内容完成教学设计、实施课堂教学、达成评价目标、进行反思改进的能力。</p>
                <p>1.教学内容。根据职业教育国家标准要求，对接职业标准（规范）、职业技能等级标准等，优化课程体系和教学目标，拓展教学内容深<br>度和广度（思政课要严格按照国规教材或国家课程标准规定教学模块和内容进行教学）。
                </p>
                <br>
                <a href="/home/guide" class="guide_to" @click="ToGuide">查看更多</a>
                <img src="@/assets/PC端_slices/组 4(2).png" alt="">
            </div>
        </div>
        <div class="pri_down">
            <div class="pri_mid_head">
                <h1>通知公告</h1>
            </div>
            <ul>
                <li>
                    <router-link to="/">
                        <p>关于公布2023年全国职业院校技能大赛德育与思想政治教育有关赛项现场决赛的通知</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/">
                        <p>关于举办2023年全国职业院校技能大赛教学能力比赛决赛有关事项的通知</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/">
                        <p>教育部办公厅关于举办2023年全国职业院校技能大赛德育与思想政治教育有关事项的通知</p>
                    </router-link>
                </li>
                <li><router-link to="/">
                        <p>2023年全国职业院校技能大赛思想政治教育课程教学能力比赛方案（中等职业院校等）通知</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/">
                        <p>2023年全国职业院校技能大赛中等职业学校班主任能力比赛方案</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/">
                        <p>2023年全国职业院校技能大赛教学能力比赛常见问题答疑</p>
                    </router-link>
                </li>

            </ul>
        </div>
    </div>
    <div v-show="showLogin">
        <Login v-model="showLogin"></Login>
    </div>
</template>

<style scoped>
.pri {
    position: relative;
}

.pri_up {
    display: flex;
    justify-content: center;
    height: 600px;

    img {
        width: 100%;
    }
}

.pri_up_font {
    position: absolute;
    top: 5%;
    left: 19%;
    height: 50px;
    width: 650px;
}

.pri_to {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    height: 60px;
    padding: 0 40px;
    font-size: 25px;
    font-weight: bold;
    color: #436EFF;
    background-color: #fff;
    line-height: 50px;
    border-radius: 50px;

    i {
        display: inline-block;
        height: 21px;
        width: 21px;
        background-image: url('@/assets/PC端_slices/矢量智能对象 拷贝.png');
        background-size: contain;
        background-repeat: no-repeat;
        margin-left: 10px;
    }
}

.pri_mid {
    height: 1200px;
    background-color: #fff;

    ul {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 35px;

        li {
            position: relative;
            /* 为伪元素定位设置参考 */
            height: 115px;
            width: 180px;
            margin: 0 20px;
            padding: 0 50px;
            border-radius: 5px;
            color: #fff;
            background-color: #436EFF;

            img {
                position: absolute;
                top: 30px;
                left: 62px;
            }

            h1 {
                position: absolute;
                top: 33px;
                left: 145px;
                line-height: 50px;
                font-size: 20px;
            }

            &::after {
                content: '';
                position: absolute;
                right: -30px;
                top: 50%;
                transform: translateY(-50%);
                height: 20px;
                width: 20px;
                background-image: url('@/assets/PC端_slices/矢量智能对象 拷贝 5.png');
                background-size: contain;
                background-repeat: no-repeat;
            }

            &:last-child::after {
                display: none;
            }
        }


    }

}

.pri_mid_head {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    padding: 35px 0;

    h1 {
        font-size: 40px;
        font-weight: bold;
        margin: 0 20px;

        &::before,
        &::after {
            content: '';
            display: inline-block;
            height: 20px;
            width: 20px;
            background-image: url('@/assets/PC端_slices/组 3.png');
            background-size: contain;
            background-repeat: no-repeat;
            margin: 0 40px;
        }
    }
}

.pri_mid_guide {
    position: relative;
    height: 650px;
    width: 1240px;
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to bottom right, #F9FAFF, white);

    h2 {
        margin: 50px 0 0 40px;
    }

    h3 {
        margin: 20px 0 0 40px;
    }

    p {
        margin: 10px 40px;
        font-size: 16px;
        line-height: 2.2em;
        font-weight: 400
    }

    .guide_to {
        display: inline-block;
        width: 100px;
        height: 40px;
        margin: 10px 0 0 40px;
        background-color: #436EFF;
        color: #fff;
        text-align: center;
        line-height: 40px;
        border-radius: 5px;
    }

    img {
        position: absolute;
        bottom: 0;
        right: 0;
    }
}

.pri_down {
    position: relative;
    height: 400px;
    width: 1270px;
    margin: auto;

    ul {
        li {
            float: left;
            list-style: disc;
            margin: 10px;
            width: 610px;

            p {
                font-size: 17px;
                font-weight: bold;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            a:hover {
                color: #436EFF;
            }

            &:nth-child(2n) {
                float: right;
            }
        }
    }
}
</style>

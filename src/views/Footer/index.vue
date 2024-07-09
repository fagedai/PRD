<script setup>
</script>

<template>
    <div class="footer">
        <div class="up_footer">
            <ul>
                <li>
                    <p>联系电活： 王老师 15853217870</p>
                </li>
                <li>
                    <p>技术支持： 唐工 17706521231</p>
                </li>
                <li>
                    <p>服务电话： 朱老师 15966618040</p>
                </li>
                <li>
                    <p>@山东智慧科技产业开发集团有限公司 @2023鲁ICP备3202045516号-3</p>
                </li>
            </ul>
        </div>
        <div class="down_footer">
            <p>Copyright@2023-2023 zhihuijiaoxue. All rights reserved.</p>
        </div>
    </div>
</template>

<style scoped>
.footer {
    color: #BCBEC2;
    font-size: 13px;
    background-color: #1E2023;
}

.up_footer {
    display: flex;
    justify-content: center;
    align-items: center;

    ul {
        margin: 10px;

        li {
            float: left;
            padding: 0 20px;
            border-right: 1px solid #BCBEC2;

            &:last-child {
                border-right: none;
            }
        }
    }

}

.down_footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}
</style>

<template>
    <div>
        <p v-if="isShow">
            hello word! hello word! hello word<span
                >ansd kas daslndlajnsldknakkklasndl</span
            >
        </p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShow: false,
            list: ["1", "2"],
            name: "asdsdasdas",
        };
    },
    methods: {},
};
</script>

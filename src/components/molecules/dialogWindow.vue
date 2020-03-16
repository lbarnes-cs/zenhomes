<template lang="html">
    <div class="dialogWindow__container" data-test="dialogWindow">
        <div class="dialogWindow__closeIcon">
            <v-btn
                data-test="dialogWindow_close_btn"
                fab
                depressed
                icon
                small
                :rounded="false"
                @click="emitClose"
                :ripple="{ class: 'secondary--text' }"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>

        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "DialogWindow",

    methods: {
        emitClose() {
            this.$emit("closeDialog");
        },
    },
};
</script>

<style lang="scss">
.dialogWindow {
    background: map-get($shades, "white");

    &__container {
        padding: map-get($spaces, "onehalf");
        position: relative;
    }

    &__closeIcon {
        position: absolute;
        right: map-get($spaces, "one");
        top: map-get($spaces, "one");
    }
}
</style>

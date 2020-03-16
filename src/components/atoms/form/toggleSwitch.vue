<template lang="html">
    <v-switch
        :label="label"
        :inset="inset"
        :color="color"
        :input-value="inputValue"
        @change="$emit('change')"
    />
</template>

<script>
export default {
    name: "ToggleSwitch",

    props: {
        label: {
            type: String,
            required: true,
        },
        inputValue: {
            type: Boolean,
            default: true,
        },
        inset: {
            type: Boolean,
            default: true,
        },
        color: {
            type: String,
        },
    },
};
</script>

<style lang="scss" scoped></style>

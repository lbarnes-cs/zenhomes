<template lang="html">
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
        data-test="datePicker"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                data-test="datePicker_input"
                v-model="date"
                v-on="on"
                readonly
                label="Date"
                outlined
            />
        </template>
        <v-date-picker
            v-model="date"
            scrollable
            show-current
            @change="handleChange"
            data-test="datePicker_date"
        >
            <v-spacer></v-spacer>
            <v-btn
                text
                color="primary"
                @click="menu = false"
                data-test="datePicker_cancel"
            >
                Cancel
            </v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
export default {
    name: "DatePicker",

    props: {
        value: {
            type: String,
            required: true,
        },
    },

    watch: {
        value(newVal) {
            if (newVal) {
                this.date = newVal;
            }
        },
    },

    data: () => ({
        date: "",
        menu: false,
    }),

    methods: {
        handleChange(e) {
            this.menu = false;
            this.$emit("change", e);
        },
    },

    mounted() {
        this.date = this.value;
    },
};
</script>

<style lang="scss" scoped></style>

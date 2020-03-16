<template lang="html">
    <div class="invoice">
        <h3 class="invoice__header" data-test="invoice_header">
            {{ displayTitle }} Invoice
        </h3>
        <v-form ref="form" @submit.prevent="submit" v-model="valid">
            <date-picker
                data-test="invoice_inputDate"
                :value="form.date"
                @change="(date) => (form.date = date)"
            />

            <text-field
                v-model="form.title"
                data-test="invoice_inputTitle"
                label="Title"
                name="title"
                :rules="[rules.required]"
            />

            <v-switch
                data-test="invoice_switch"
                label="Retrieve Amount"
                inset
                v-model="form.retrieveAmount"
            />

            <v-slide-y-transition>
                <text-field
                    v-show="!form.retrieveAmount"
                    v-model="form.amount"
                    data-test="invoice_inputAmount"
                    label="Amount"
                    name="amount"
                    type="number"
                    :rules="[rules.required]"
                    class="input-removeSpinner"
                    :suffix="form.amount ? 'EUR' : ''"
                />
            </v-slide-y-transition>

            <v-btn
                data-test="invoice_button"
                :disabled="!valid"
                type="submit"
                :loading="submittingForm"
                large
                block
                class="invoice__button"
                color="primary"
            >
                {{ form.retrieveAmount ? "Next" : "Done" }}
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import EventBus from "@/event-bus";
import textField from "@/components/atoms/form/textField.vue";
import toggleSwitch from "@/components/atoms/form/toggleSwitch.vue";
import datePicker from "@/components/molecules/form/datePicker.vue";
import formValidation from "@/mixins/validation";

export default {
    name: "AddInvoice",

    mixins: [formValidation],

    components: {
        textField,
        toggleSwitch,
        datePicker,
    },

    props: {
        invoice: {
            type: Object,
            required: false,
        },
    },

    data() {
        return {
            form: {
                date: new Date().toISOString().substr(0, 10),
                title: "",
                retrieveAmount: false,
                amount: null,
            },
            isEdit: false,
            valid: true,
            submittingForm: false, // adds 'loading' to the button, disables the button from being pressed during this period
            rules: {
                required: (value) =>
                    this.isNotEmpty(value) || "Field is required",
                currenctly: (value) => {
                    return (
                        this.isCurrency(value) ||
                        "Value must be amount to transfer"
                    );
                },
            },
        };
    },

    computed: {
        displayTitle() {
            return this.isEdit ? "Edit" : "Add";
        },
    },

    methods: {
        ...mapActions({
            createInvoice: "invoices/createInvoice",
            editInvoice: "invoices/editInvoice",
        }),

        isFormValid() {
            return this.$refs.form.validate();
        },

        resetForm() {
            // Quick and dirty reset of the form
            this.$refs.form.reset();
        },

        async submit() {
            if (!this.isFormValid()) {
                return;
            }

            this.submittingForm = true;

            // Trigger action
            if (this.isEdit) {
                await this.editInvoice({ new: this.form, old: this.invoice });
            } else {
                await this.createInvoice(this.form);
            }

            // Close the dialog window
            this.$emit("submitForm");

            this.submittingForm = false;

            EventBus.$emit(
                "showSnackbarMessage",
                `${this.isEdit ? "Edited" : "Added"} Invoice for ${
                    this.form.title
                }`,
            );
        },
    },

    // if the first thing we do with the component is to edit,
    // then the watch will not work. need to mount instead
    mounted() {
        if (this.invoice) {
            this.form = { ...this.invoice };
            this.isEdit = true;
        }
    },
};
</script>

<style lang="scss" scoped>
.invoice {
    &__button {
        margin: map-get($spaces, "one") 0 0;
    }
}
</style>

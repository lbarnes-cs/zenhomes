<template lang="html">
    <div class="invoices">
        <v-container>
            <v-row>
                <v-col cols="8">
                    <h1>Dashboard</h1>
                </v-col>
                <v-col cols="4" class="invoices__action">
                    <v-btn
                        @click.native="openInvoice(null)"
                        color="secondary"
                        :icon="isMobile"
                        :large="isMobile"
                    >
                        <v-icon :class="{ 'mr-2': !isMobile }">
                            mdi-plus-circle-outline
                        </v-icon>
                        {{ isMobile ? "" : "Add new invoice" }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-slide-y-transition group>
                <v-row
                    class="invoices__row"
                    v-for="(invoice, index) in invoices"
                    :key="index"
                >
                    <v-col cols="12" md="3">
                        {{ invoice.title }}
                    </v-col>
                    <v-col cols="12" md="3">
                        {{ invoice.date }}
                    </v-col>
                    <v-col cols="12" md="4">
                        {{ invoice.iban }}
                    </v-col>
                    <v-col cols="12" md="2" class="invoices__action">
                        <v-btn icon>
                            <v-icon @click.native="removeInvoice(invoice)">
                                mdi-trash-can-outline
                            </v-icon>
                        </v-btn>
                        <v-btn icon @click.native="openInvoice(invoice)">
                            <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-slide-y-transition>
        </v-container>

        <v-dialog
            v-model="displayDialog"
            max-width="380"
            content-class="dialogWindow"
            :fullscreen="isMobile"
        >
            <dialog-window @closeDialog="closeDialog">
                <invoice
                    @submitForm="closeDialog"
                    :invoice="selectedInvoice"
                    :key="componentKey"
                />
            </dialog-window>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EventBus from "@/event-bus";
import DialogWindow from "@/components/molecules/dialogWindow.vue";
import Invoice from "@/components/organisms/invoiceForm/invoice.vue";

export default {
    name: "Dashboard",

    components: {
        DialogWindow,
        Invoice,
    },

    data: () => ({
        displayDialog: false,
        selectedInvoice: null,
        componentKey: 0,
    }),

    computed: {
        ...mapGetters({
            invoices: "invoices/allInvoices",
        }),

        isMobile() {
            return this.$vuetify.breakpoint.xsOnly;
        },
    },

    methods: {
        ...mapActions({
            getAllInvoices: "invoices/getAllInvoices",
            deleteInvoice: "invoices/deleteInvoice",
            editInvoice: "invoices/editInvoice",
        }),

        closeDialog() {
            // Can include analytics tracking here to see how many people close this particular dialog window
            this.displayDialog = false;
            setTimeout(() => {
                this.selectedInvoice = null;
            }, 100);
        },

        removeInvoice(invoice) {
            this.deleteInvoice(invoice);
            EventBus.$emit(
                "showSnackbarMessage",
                `Invoie ${invoice.title} deleted`,
            );
        },

        openInvoice(invoice) {
            if (invoice) {
                this.selectedInvoice = invoice;
            }
            this.componentKey += 1;
            this.displayDialog = true;
        },
    },

    mounted() {
        this.getAllInvoices();
    },
};
</script>

<style lang="scss" scoped>
.invoices {
    &__row {
        align-items: center;

        &:nth-child(odd) {
            background: map-get($grey, "lighten-3");
        }

        &:hover {
            background: map-get($grey, "lighten-2");
        }
    }

    &__action {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}
</style>

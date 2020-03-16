import {
    getAllinvoices,
    createInvoice,
    removeInvoice,
    updateList,
    editInvoice,
} from "@/sdk/clients/userActions";

export default {
    getAllInvoices({ commit }) {
        const invoices = getAllinvoices();

        commit("setAllInvoicess", invoices);
    },

    async createInvoice({ commit, state }, invoice) {
        // Here would be a great place to submit the invoice
        // to the backend
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const invoiceResponse = createInvoice(invoice);

        if (invoiceResponse) {
            // Also add it to the current invoice list
            // move onto next stage. For now, will keep things simple
            commit("createInvoice", invoice);
        }

        updateList(state.invoices);
    },

    deleteInvoice({ commit, state }, invoice) {
        // would also send a ajax request to delete the invoice from BE
        const removeResponse = removeInvoice(invoice);

        if (removeResponse) {
            commit("deleteInvoice", invoice);
        }

        updateList(state.invoices);
    },

    async editInvoice({ commit, state }, invoices) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        editInvoice(invoices);
        commit("editInvoice", invoices);
        updateList(state.invoices);
    },
};

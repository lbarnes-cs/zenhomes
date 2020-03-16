import _ from "lodash";

export default {
    setAllInvoicess: (state, invoices) => {
        state.invoices = invoices;
    },
    createInvoice: (state, invoice) => {
        state.invoices.push(invoice);
    },
    deleteInvoice: (state, invoice) => {
        // using lodash for now for quick development
        state.invoices = _.reject(state.invoices, (object) => {
            _.isEqual(object, invoice);
        });
    },
    editInvoice: (state, invoices) => {
        const index = state.invoices.indexOf(invoices.old);

        state.invoices.splice(index, 1, invoices.new);
    },
};

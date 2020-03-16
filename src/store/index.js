import Vue from "vue";
import Vuex from "vuex";
import invoices from "./invoices";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        invoices,
    },
});

export default store;

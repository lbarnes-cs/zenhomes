import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#0077FF", // zenhomes blue
                secondary: "#00CE7D",
            },
        },
    },
});

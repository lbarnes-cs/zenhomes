import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";

import DialogWindow from "@/components/molecules/dialogWindow.vue";

describe("Dialog Window: ", () => {
    Vue.use(Vuetify);
    const localVue = createLocalVue();

    const createWrapper = () => {
        return mount(DialogWindow, {
            localVue,
        });
    };

    it("emits an event when on user click on the close button", () => {
        const wrapper = createWrapper();
        const link = wrapper.find('[data-test="dialogWindow_close_btn"]');
        link.trigger("click");

        expect(wrapper.emitted().closeDialog).toBeTruthy();
    });
});

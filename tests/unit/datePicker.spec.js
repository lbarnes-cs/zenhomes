import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";

import DatePicker from "@/components/molecules/form/datePicker.vue";

describe("Date Picker: ", () => {
    Vue.use(Vuetify);
    const localVue = createLocalVue();

    const createWrapper = () => {
        return mount(DatePicker, {
            localVue,
            propsData: {
                value: "2020-01-01",
            },
        });
    };

    it("The input field is preloaded with the date", async () => {
        const wrapper = createWrapper();
        await wrapper.vm.$nextTick();

        expect(
            wrapper.find('[data-test="datePicker_input"]').find("input").element
                .value,
        ).toBe("2020-01-01");
    });

    it("The date data prop is preloaded with the 'value' prop", async () => {
        const wrapper = createWrapper();
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.date).toBe("2020-01-01");
    });
});

import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";

import InvoiceForm from "@/components/organisms/invoiceForm/invoice.vue";

describe("Invoice Form: ", () => {
    Vue.use(Vuetify);
    const localVue = createLocalVue();
    const submitButton = '[data-test="invoice_button"]';
    const inputTitle = '[data-test="invoice_inputTitle"]';
    const inputAmount = '[data-test="invoice_inputAmount"]';

    const createWrapper = () => {
        return mount(InvoiceForm, {
            localVue,
        });
    };

    it("When retrieve amount is true, amount doesn't exist", async () => {
        const wrapper = createWrapper();
        const toggle = wrapper.find('[data-test="invoice_switch"]');
        const button = wrapper.find(submitButton);

        toggle.trigger("click");
        await wrapper.vm.$nextTick();

        expect(
            wrapper.find(inputAmount).classes("slide-y-transition-leave"),
        ).toBe(true);
        expect(button.text()).toBe("Next");
    });

    it("If no title is entered, an error is displayed", async () => {
        const wrapper = createWrapper();
        const titleInput = wrapper.find(inputTitle);

        titleInput.find("input").setValue("");
        wrapper.find("form").trigger("submit.prevent");
        await wrapper.vm.$nextTick();

        expect(titleInput.text()).toMatch("Field is required");
    });

    it("If amount is entered, an error is displayed", async () => {
        const wrapper = createWrapper();
        const amountInput = wrapper.find(inputAmount);

        amountInput.find("input").setValue("");
        wrapper.find("form").trigger("submit.prevent");
        await wrapper.vm.$nextTick();

        expect(amountInput.text()).toMatch("Field is required");
    });

    it("When amount is entered, 'EUR' is suffixed", async () => {
        const wrapper = createWrapper();
        const amountInput = wrapper.find(inputAmount);

        amountInput.find("input").setValue("600");
        await wrapper.vm.$nextTick();

        expect(amountInput.text()).toMatch("EUR");
    });

    it("When prop is set, title has changed", async () => {
        const wrapper = mount(InvoiceForm, {
            propsData: {
                invoice: {
                    date: "2020-01-01",
                    title: "My first invoice",
                    retrieveAmount: false,
                    amount: "600",
                },
            },
        });

        await wrapper.vm.$nextTick();
        const header = wrapper.find('[data-test="invoice_header"]');

        expect(header.text()).toMatch("Edit Invoice");
    });
    it("When prop is set, text fields to contain data", async () => {
        const wrapper = mount(InvoiceForm, {
            propsData: {
                invoice: {
                    date: "2020-01-01",
                    title: "My first invoice",
                    retrieveAmount: false,
                    amount: "600",
                },
            },
        });

        await wrapper.vm.$nextTick();

        expect(
            wrapper.find('[data-test="invoice_inputDate"]').find("input")
                .element.value,
        ).toBe("2020-01-01");

        expect(wrapper.find(inputAmount).find("input").element.value).toBe(
            "600",
        );

        expect(wrapper.find(inputTitle).find("input").element.value).toBe(
            "My first invoice",
        );
    });

    it("When form is submitted, submit has been called", async () => {
        const wrapper = createWrapper();
        const titleInput = wrapper.find(inputTitle);
        const amountInput = wrapper.find(inputAmount);
        wrapper.setMethods({ submit: jest.fn() });

        titleInput.find("input").setValue("My new title");
        titleInput.find("input").setValue("600");

        wrapper.find("form").trigger("submit.prevent");
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.submit).toHaveBeenCalledTimes(1);
        // expect(wrapper.emitted().submitForm).toBeTruthy();
    });
});

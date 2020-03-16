export default {
    methods: {
        isNotEmpty(value) {
            return !!value;
        },

        isCurrency(number) {
            if (!number) {
                return true;
            }

            const pattern = /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/;

            return pattern.test(number);
        },
    },
};

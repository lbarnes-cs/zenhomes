<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <v-img
                    alt="Zenhomes"
                    class="shrink hidden-md-and-up"
                    contain
                    src="@/assets/images/zenhomes_mobile.png"
                    transition="scale-transition"
                    width="40"
                />

                <v-img
                    alt="Zenhomes"
                    class="hidden-sm-and-down"
                    contain
                    src="@/assets/images/zenhomes.png"
                    transition="scale-transition"
                    height="40"
                    width="170"
                    max-width="200"
                />
            </div>

            <v-spacer></v-spacer>

            <v-btn
                href="https://github.com/lbarnes-cs/zenhomes"
                target="_blank"
                text
            >
                <span class="mr-2">View on Git</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view />
        </v-content>

        <v-snackbar
            v-model="snackbar.display"
            data-test="snackbar"
            bottom
            center
            autoHeight
            :timeout="snackbar.options.timeout"
            :color="snackbar.options.color"
        >
            {{ snackbar.message }}

            <v-btn
                color="white"
                text
                data-test="snackbar_button"
                @click.native="snackbar.display = false"
            >
                Ok
            </v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
import EventBus from "@/event-bus";

export default {
    name: "App",

    data: () => ({
        snackbar: {
            message: "",
            display: false,
            defaultOptions: {
                timeout: 6000,
                color: "secondary",
            },
            options: {},
        },
    }),

    created() {
        EventBus.$on("showSnackbarMessage", (message, options = {}) => {
            this.snackbar.display = true;
            this.snackbar.message = message;
            this.snackbar.options = Object.assign(
                {},
                this.snackbar.defaultOptions,
                options,
            );
        });
    },
};
</script>

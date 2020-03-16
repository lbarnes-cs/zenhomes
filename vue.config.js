const path = require("path");

function addStyleResource(rule) {
    rule.use("style-resource")
        .loader("style-resources-loader")
        .options({
            patterns: [
                // you can also use a glob if you'd prefer
                path.resolve(__dirname, "./src/assets/styles/*.scss"),
            ],
        });
}

module.exports = {
    lintOnSave: true,
    transpileDependencies: ["vuetify"],
    chainWebpack: (config) => {
        const types = ["vue-modules", "vue", "normal-modules", "normal"];
        types.forEach((type) =>
            addStyleResource(config.module.rule("scss").oneOf(type)),
        );
    },
};

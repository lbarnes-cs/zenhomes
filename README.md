# Zenhomes Codetest

The start of the Zenhomes codetest by Laurence Barnes.

The codetest has not been completed, it is missing Scenario 5 (Invoice with bank transfer) and 7 (Mobile behaviour). therefore, theaAdd / edit form is pretty basic. There has been some mobile responsiveness included in the project.

The application has basic CRUD (Create, Retrieve, Update and Delete) functionality. To help manage / mock this, I am using localStorage. When a invoice is created, the list will be saved to localStorage. And after each action, this list will be re-saved.

I have also mocked up how the API requests could look like. No error handling has been included. So I have just assumed that the requests returns back a healthy status of 200. But in reality, we would handle the requests and catch any errors in the store action.

I'm using Vuetify to help create a quick prototype here. It allowed me to speed up development, using their library of components and styling helpers to ensure a smooth user experience. The ability to adjust the theme is also pretty nice, allowing me to add the Zenhomes primary and seconday colours into the prototype.

## Tech stack

-   Vue 3.1.3
-   Vuetify 2.2.11
-   Vuex
-   Jest 25.1.0
-   Sass
-   eslint
-   prettify
-   lodash

## Quick development and other tools

-   I wanted to use [vue-the-mask](https://github.com/vuejs-tips/vue-the-mask) to help restrict and format the IBAN for Scenario 5. But I have left this out for now
-   Using [lodash](https://lodash.com/docs/4.17.15) for quick development. But there many be easier ways with ES6 these days.
-   Zenhomes logo has been resaved as an 8-bit png for image compression. Also tried something different for the mobile version. For production, I would actually like to run all images through an [image optimizer plugin](https://cloudinary.com/blog/vue_js_tutorial_image_optimization_for_web_apps) to help reduce file size
-   Vuetify should be easy to configure for [tree shaken](https://vuetifyjs.com/en/customization/a-la-carte/) these days, but haven't fully implement this.

## Testing

Only added a few simple unit tests for now.

-   Date picker is preloaded with the prop
-   Dialg window emits a close
-   Invoice:
    -   display errors correctly
    -   display amount suffix when a value is added
    -   if 'retrieve amount' is selected, amount is hidden
    -   if 'retrieve amount' is selected, button label changes
    -   title changes if a prop is detected
    -   when a prop is set, text fields contains these values
    -   when the form is submitted, an event is triggered

#### How to run unit tests:

```
npm run test
```

#### Other important tests may include:

-   Test the SDK and mock the API requests
-   Date picker is open upon clicking the text field
-   Dialog window open when clicking add / edit on the dashboard
-   Snackbar is emitted / shown when tasks are completed

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Watch unit tests

```
npm run test:watch
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

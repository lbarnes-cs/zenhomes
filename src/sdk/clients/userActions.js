// In here we would set up axios to set a AJAX request
// to a certain API endpoint, and handle any errors that may occur
// as well as log them. Instead we will use localstorage as a quick
// and dirty way to minic an AJAX request

export const STORAGE_KEY = "zenhomes-invoices";

export function createInvoice(payload) {
    if (payload) {
        return payload.title;
    }

    return false;
}

export function editInvoice(payload) {
    if (payload) {
        return payload.title;
    }

    return false;
}

export function updateList(invoices) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
}

export function getAllinvoices() {
    const localStorage = JSON.parse(window.localStorage.getItem(STORAGE_KEY));

    // cheat way to retrieve from local storage
    if (localStorage) {
        return localStorage;
    }

    // if no invoices are saved, create default list
    return [
        {
            date: "2020-03-12",
            title: "Rent March",
            amount: "500",
            iban: "DE01234",
        },
        {
            date: "2020-02-12",
            title: "Rent Feb",
            amount: "500",
            iban: "DE09876",
        },
        {
            date: "2020-01-12",
            title: "Rent January",
            amount: "500",
            iban: "DE01342",
        },
    ];
}

export function removeInvoice(payload) {
    if (payload) {
        JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");

        return payload.title;
    }

    return false;
}

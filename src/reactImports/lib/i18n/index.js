"use strict";

const Jed = require("jed");

const i18n = new Jed({
    locale_data : require("./locale_cn"),
    "domain" : "messages"
});

export default {
    gettext: i18n.gettext.bind(i18n)
};



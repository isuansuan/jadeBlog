require.config({
    paths: {
        "jquery": ["lib/jquery/jquery3.1.1"],
        "bootstrap": ["lib/bootstrap/js/bootstrap.min"],
        "lodash": ["lib/lodash-4.17.2/lodash"]
    }
});

require(['jquery', 'lodash'], function ($, _) {

    $(document).ready(function () {
        $("#idLangSet").on("click", function () {
            var lang = $("#idLang").val();
            lang = (lang == 'ch') ? 'en' : 'ch';
        })
    });
});


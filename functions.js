$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('#calculate').click(function () {
        checkErrorMessage();
        var res = getValues();
        console.log(res);
        if (res.success) {
            $('#alert-empty').hide();
            var grundumsatz;
            var gender = res.values[0];
            var age = res.values[1];
            var height = res.values[2];
            var weight = res.values[3];
            var goal = res.values[4];
            var activity = res.values[5];
            var frequeny = res.values[6];
            if (gender === 'male') {
                grundumsatz = 65.5 + (13.7 * weight) + (5 * height) - (6.8 * age);
            } else {
                grundumsatz = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
            }
            var leistungsumsatz_1 = (grundumsatz * activity) - grundumsatz;
            var leistungsumsatz_2 = leistungsumsatz_1 + ((frequeny * 400) / 7);
            var umsatz = grundumsatz + leistungsumsatz_2;
            var zielUmsatz;
            switch (goal) {
                case "1":
                    zielUmsatz = umsatz + 300;
                    break;
                case "2":
                    zielUmsatz = umsatz - 300;
                    break;
                case "3":
                    zielUmsatz = umsatz - 500;
                    break;
                case "4":
                    zielUmsatz = umsatz + 500;
                    break;
                case "5":
                    zielUmsatz = umsatz;
                    break;
            }
            var finalGrundumsatz = Math.round(grundumsatz).toString() + " kcal";
            var finalLeistungsumsatz = Math.round(leistungsumsatz_2).toString() + " kcal";
            var finalZielumsatz = Math.round(zielUmsatz).toString() + " kcal";
            $('#gu').val(finalGrundumsatz);
            $('#lu').val(finalLeistungsumsatz);
            $('#zu').val(finalZielumsatz);
        }
    });
    function getCheckedValue(type) {
        var value = $('input[name=' + type + ']:checked').val();
        if (value) return value;
        if (!value) {
            $('#alert-empty').show();
            window.scroll(0, findPos(document.getElementById("alert-empty")));
        };
    }
    function getValue(type) {
        var value = $('#' + type).val();
        if (value) return value;
        if (!value) {
            $('#alert-empty').show();
            window.scroll(0, findPos(document.getElementById("alert-empty")));
        };
    }
    function getValues() {
        var res = { success: true, values: [] };
        res.values.push(getCheckedValue("gender"));
        res.values.push(getValue("age"));
        res.values.push(getValue("height"));
        res.values.push(getValue("weight"));
        res.values.push(getCheckedValue("goal"));
        res.values.push(getCheckedValue("activity"));
        res.values.push(getCheckedValue("frequency"));
        res.values.forEach(function (value) {
            if (typeof value == 'undefined' || value == '') {
                res.success = false;
            }
        });
        return res;
    }
    function findPos(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return [curtop];
        }
    }
    function checkErrorMessage() {
        if ($("#alert-empty").is(":visible") == true) {
            $("#alert-empty").hide();
            $("#alert-empty").fadeIn(500);
        }
    }

});
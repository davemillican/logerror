
var datatest = {};

datatest.tofunc = function () {

        console.log (this);

    function () test {
        console.log (this);
    }

    test();
}

datatest.tofunc();
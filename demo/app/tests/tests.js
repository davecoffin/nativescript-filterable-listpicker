var FilterableListpicker = require("nativescript-filterable-listpicker").FilterableListpicker;
var filterableListpicker = new FilterableListpicker();

describe("greet function", function() {
    it("exists", function() {
        expect(filterableListpicker.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(filterableListpicker.greet()).toEqual("Hello, NS");
    });
});
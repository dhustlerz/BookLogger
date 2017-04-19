(function() {

    var app = angular.module('app', []);
    //->    Provider Function
    // app.config(function($provide) {
    //     $provide.provider('books', function(){
    //         this.$get = function() {
    //             var appName = 'Book logger';
    //             var appDesc = 'Track which book you read';
    //
    //             return {
    //                 appName: appName,
    //                 appDesc: appDesc
    //             }
    //         }
    //     })
    //
    // })

    app.provider('books', function(){
        this.$get = function() {
            var appName = 'Book logger';
            var appDesc = 'Track which book you read';
            var version = '1.0';

            if(includeVersionInTitle) {
                appName += ' ' + version;

            }
            return {
                appName: appName,
                appDesc: appDesc
            };
        };

        var includeVersionInTitle = false;
        this.setIncludeVersionInTitle = function(value) {
            includeVersionInTitle = value;
        };
    });

    app.config (function(booksProvider) {
        booksProvider.setIncludeVersionInTitle(true);
    });


}());
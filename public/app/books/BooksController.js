(function() {

    angular.module('app')
        .controller('BooksController', BooksController);


    function BooksController() {

        var vm = this;

        vm.greeting = 'Hello from the BooksController';

    }


}());
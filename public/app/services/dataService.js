(function(){
    angular.module('app')
        .factory('dataService', dataService);
    function dataService(){
        return{

            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders
        };

        function getAllBooks(){
            return[
                {
                    book_id: 1,
                    title: "This is Title one",
                    author: "This is author 1",
                    year_published: 2000
                },
                {
                    book_id: 1,
                    title: "This is Title one",
                    author: "This is author 1",
                    year_published: 2000

                }
            ]
        };
        function getAllReaders() {
            return[
                {
                    reader_id: 1,
                    title: "This is Title one",
                    author: "This is author 1",
                    year_published: 2000
                },
                {
                    reader_id: 1,
                    title: "This is Title one",
                    author: "This is author 1",
                    year_published: 2000

                }
            ]
            
        }

    }
}());
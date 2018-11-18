$(document).ready(function () {
   GetAllGenres();
   GetAllBooks();

    $(document).on("click", ".js-button-detail", function () {
        var id = $(this).data("item");
        GetDetailBookInfo(id);
    });

    $(document).on("click", ".js-button-delete", function () {
         var id = $(this).data("item");
        DeleteBook(id);
    });

    $(document).on("click", ".js-button-edit", function () {
        var id = $(this).data("item");
        GetAllForBook(id);
    });

    $(document).on("submit", ".add-info", function (e) {
        e.preventDefault();
        var $this = $(this);
        var id = $this.find(".hidden-book").val();
        var inputs = $this.find("input, select");
        EditBook(id, inputs);
    });

    $(document).on("click", ".js-button-add", function () {
        GetAllForBook(0);
    });

    $(document).on("submit", ".add-info-new", function (e) {
        e.preventDefault();
        var $this = $(this);
        var inputs = $this.find("input, select");
        AddBook(inputs);
    });

    $(document).on("change", "#genre-list", function () {
        var curValue = $(this).val();
        if (curValue == 0)
            GetAllBooks();
        else
        GetGenresBooks(curValue);
    });
});

// Получение всех книг по ajax-запросу
function GetAllBooks() {
    $.ajax({
        url: '/api/books',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            WriteBooksResponse(data);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

// Получение всех книг текущего жанра
function GetGenresBooks(id) {
    $.ajax({
        url: '/api/genres/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            WriteBooksResponse(data);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

// Получение всех жанров по ajax-запросу
function GetAllGenres() {
    $.ajax({
        url: '/api/genres',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            WriteGenreResponse(data);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

// Получение информации о книге
function GetDetailBookInfo(bookId) {
    $.ajax({
        url: '/api/books/' + bookId,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            WriteDetailBooksResponse(data);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

// вывод полученных книг на экран
function WriteBooksResponse(books) {    
    var strResult;
    if (books.length > 0) {
        $.each(books, function (index, book) {
            strResult += "<tr>";
            strResult += "<td>" + book.BookName + "</td>"
                + "<td><button type='button' data-item='" + book.BookId + "' class='js-button-detail btn btn-info btn-l' data-toggle='modal' data-target='#myModal'>Подробнее</button></td>"
                + "<td><button type='button' data-item='" + book.BookId + "' class='js-button-edit btn btn-warning btn-l' data-toggle='modal' data-target='#myModal'>Редактировать</button></td>"
                + "<td><button type='button' data-item='" + book.BookId + "' class='js-button-delete btn btn-dark btn-l'>Удалить</button></td>"
                + "</tr>";
        });
        $("#books-list").find("tbody").html(strResult);}
    else {
        $("#books-list").find("tbody").empty();
    }
}

// вывод полученной книги
function WriteDetailBooksResponse(book) {
    var strResult = "<div>";
        strResult += "<p><b>Название: </b>" + book.BookName + "</p>"
            + "<p><b>Автор: </b>" + book.AuthorName + "</p>"
            + "<p><b>Жанр: </b>" + book.Genre.GenreName + "</p>"
            + "<p><b>Год издания: </b>" + book.CreateDate + "</p>"
            + "<p><b>Издательство: </b>" + book.Publisher.PublisherName + "</p>";
    strResult += "</div>";
    $(".modal-title").text(book.BookName);
    $(".modal-body").html(strResult);
}

// Удаление книги
function DeleteBook(id) {
    $.ajax({
        url: '/api/books/' + id,
        type: 'DELETE',
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            GetAllBooks();
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

// редактирование книги
function EditBook(id, inputs) {
    var book = {};
    inputs.each(function (index) {
        book[$(this).attr('name')] = $(this).val();
    });
   
    $.ajax({
        url: '/api/books/' + id,
        type: 'PUT',
        data: JSON.stringify(book),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            GetAllBooks();
            CleanModal();
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

// Добавление книги
function AddBook(inputs) {
    var book = {};
    inputs.each(function (index) {
        book[$(this).attr('name')] = $(this).val();
    });
    
    $.ajax({
        url: '/api/books/',
        type: 'POST',
        data: JSON.stringify(book),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            GetAllBooks();
            CleanModal();
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

// вывод полученной книги для редактирования
        function ShowEditBook(bookData, genreDatas, publisherDatas) {
            var strResultGenres = "<div class='form-group'><select class='form-control' name='GenreId'>";
            $.each(genreDatas, function (index, genreData) {
            console.log(bookData.GenreId + " " + genreData.GenreId);
        if (bookData.GenreId == genreData.GenreId)
                    strResultGenres += "<option selected value='" + genreData.GenreId + "'>" + genreData.GenreName + "</option>";
    else
                    strResultGenres += "<option value='" + genreData.GenreId + "'>" + genreData.GenreName + "</option>";
});
            strResultGenres += "</select></div>";

            var strResultPublisher = "<div class='form-group'><select class='form-control' name='PublisherId'>";
            $.each(publisherDatas, function (index, publisherData) {
                if (bookData.GenreId == publisherData.PublisherId)
                    strResultPublisher += "<option selected value='" + publisherData.PublisherId + "'>" + publisherData.PublisherName + "</option>";
    else
                    strResultPublisher += "<option value='" + publisherData.PublisherId + "'>" + publisherData.PublisherName + "</option>";
});
            strResultPublisher += "</select></div>";

            var strResultBook = "<form class='add-info'>";
            strResultBook += "<input class='hidden-book' name='BookId' type='hidden' value='" + bookData.BookId + "' />"
                + "<div class='form-group'><label>Название:</label><input class='form-control' name='BookName' value='" + bookData.BookName + "' /></div>"
                + "<div class='form-group'><label>Автор:</label><input class='form-control' name='AuthorName' value='" + bookData.AuthorName + "' /></div>"
                + "<div class='form-group'><label>Год издания:</label><input class='form-control' name='CreateDate' value='" + bookData.CreateDate + "' /></div>"
                + "<label>Жанр:</label>" + strResultGenres
                + "<label>Издательство:</label>" + strResultPublisher;
            strResultBook += "<button type='submit' class='js-submit-edit btn btn-default'>Редактировать</button>";
            strResultBook += "</form>";

    $(".modal-title").text(bookData.BookName);
    $(".modal-body").html(strResultBook);
}

// вывод для добавления книги
function ShowAddBook(genreDatas, publisherDatas) {
    var strResultGenres = "<div class='form-group'><select class='form-control' name='GenreId'>";
        strResultGenres += "<option>Выберите жанр</option>";
        $.each(genreDatas, function (index, genreData) {
            strResultGenres += "<option value='" + genreData.GenreId + "'>" + genreData.GenreName + "</option>";
        });
        strResultGenres += "</select></div>";

    var strResultPublisher = "<div class='form-group'><select class='form-control' name='PublisherId'>";
        strResultPublisher += "<option>Выберите издательство</option>";
        $.each(publisherDatas, function (index, publisherData) {
            strResultPublisher += "<option value='" + publisherData.PublisherId + "'>" + publisherData.PublisherName + "</option>";
        });
        strResultPublisher += "</select></div>";

    var strResultBook = "<form class='add-info-new'>";
        strResultBook += "<div class='form-group'><label>Название:</label><input class='form-control' name='BookName' value='' /></div>"
            + "<div class='form-group'><label>Автор:</label><input class='form-control' name='AuthorName' value='' /></div>"
            + "<div class='form-group'><label>Год издания:</label><input class='form-control' name='CreateDate' value='' /></div>"
            + "<label>Жанр:</label>" + strResultGenres
            + "<label>Издательство:</label>" + strResultPublisher;
        strResultBook += "<button type='submit' class='js-submit-add-new btn btn-default'>Добавить</button>";
        strResultBook += "</form>";

    $(".modal-title").text("Добавление книги");
    $(".modal-body").html(strResultBook);
}

// запрос книги на редактирование
function GetAllForBook(id) { 
    var bookData,
    genreData,
    publisherData,
    check = true;

    if (id != 0) {
        bookData = $.ajax({
            url: '/api/books/' + id,
            type: 'GET',
            async: false,
            dataType: 'json',
            done: function (data) {
                return data;
            },
            error: function () {
                return false;
            }
        }).responseJSON;
    }
    else {
        check = false;
    }

    genreData = $.ajax({
        url: '/api/genres',
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data) {
            return data;
        },
        error: function () {
            return false;
        }
    }).responseJSON;

    publisherData = $.ajax({
        url: '/api/publishers',
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data) {
            return data;
        },
        error: function () {
            return false;
        }
    }).responseJSON;

    if (check)
        ShowEditBook(bookData, genreData, publisherData);
    else
        ShowAddBook(genreData, publisherData);
}

// вывод полученных жанров на экран
function WriteGenreResponse(genres) {
    var strResult = "<option value='0'>Выберите жанр</option>";
        $.each(genres, function (index, genre) {
            strResult += "<option value='" + genre.GenreId + "'>" + genre.GenreName + "</option>";
        });
    $("#genre-list").html(strResult);
}

function CleanModal() {
    var modal = $("#myModal");
    modal.find(".close").click();
    modal.find(".modal-body").empty();
}

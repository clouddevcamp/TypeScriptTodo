// Type definitions for jQuery 1.10.x / 2.0.x
// Project: http://jquery.com/
// Definitions by: Boris Yankov <https://github.com/borisyankov/>, Christian Hoffmeister <https://github.com/choffmeister>, Steve Fenton <https://github.com/Steve-Fenton>, Diullei Gomes <https://github.com/Diullei>, Tass Iliopoulos <https://github.com/tasoili>, Jason Swearingen <https://github.com/jasons-novaleaf>, Sean Hill <https://github.com/seanski>, Guus Goossens <https://github.com/Guuz>, Kelly Summerlin <https://github.com/ksummerlin>, Basarat Ali Syed <https://github.com/basarat>, Nicholas Wolverson <https://github.com/nwolverson>, Derek Cicerone <https://github.com/derekcicerone>, Andrew Gaspar <https://github.com/AndrewGaspar>, James Harrison Fisher <https://github.com/jameshfisher>, Seikichi Kondo <https://github.com/seikichi>, Benjamin Jackman <https://github.com/benjaminjackman>, Poul Sorensen <https://github.com/s093294>, Josh Strobl <https://github.com/JoshStrobl>, John Reilly <https://github.com/johnnyreilly/>, Dick van den Brink <https://github.com/DickvdBrink>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
/// <reference path="jquery.ts" />
var todos = [];
var Todo = (function () {
    function Todo() {
    }
    Todo.prototype.addTodo = function (item) {
        todos.push(item);
        window.sessionStorage.setItem("todo", JSON.stringify(todos));
        var rows = '<li data-index="' + (todos.length - 1) + '">'
            + ' <label>'
            + ' <input type="checkbox" class="checkbox">'
            + ' <span class="title">' + item.baslik + '</span>'
            + ' <span class="date">' + item.tarih + '</span>'
            + ' <button class="removeTodo">X</button>'
            + '</label>'
            + '</li>';
        $(".todoItem").append(rows);
        return true;
    };
    Todo.prototype.getTodos = function () {
        $(".todoItem li").remove();
        var localTodos = window.sessionStorage.getItem("todo");
        if (localTodos) {
            todos = JSON.parse(localTodos);
            for (var i in todos) {
                var catsToItem = todos[i];
                var itemClass = catsToItem.done ? "done" : "";
                var itemChecked = catsToItem.done ? "checked" : "";
                var rows = '<li data-index="' + i + '" class=" ' + itemClass + '">'
                    + ' <label>'
                    + ' <input type="checkbox" class="checkbox" ' + itemChecked + '>'
                    + ' <span class="title">' + catsToItem.baslik + '</span>'
                    + ' <span class="date">' + catsToItem.tarih + '</span>'
                    + ' <button class="removeTodo">X</button>'
                    + '</label>'
                    + '</li>';
                $(".todoItem").append(rows);
            }
        }
    };
    Todo.prototype.updateTodo = function (index, status) {
        if (todos[index]) {
            todos[index].done = status;
            window.sessionStorage.setItem("todo", JSON.stringify(todos));
        }
        this.getTodos();
    };
    Todo.prototype.removeTodo = function (index) {
        todos.splice(index, 1);
        window.sessionStorage.setItem("todo", JSON.stringify(todos));
        this.getTodos();
    };
    return Todo;
})();
;
$(document).ready(function () {
    var todo = new Todo();
    todo.getTodos();
    $("#btnTodoAdd").click(function (e) {
        var newItem = {
            baslik: $("#txtTodoName").val(),
            tarih: new Date(),
            done: false
        };
        todo.addTodo(newItem);
        $("#txtTodoName").val("");
    });
    $(document).on('click', 'li label', function (event) {
        var itemIndex = $(this).parent().data("index");
        if ($(this).find(".checkbox").prop('checked')) {
            $(this).parent().addClass("done");
            todo.updateTodo(itemIndex, true);
        }
        else {
            $(this).parent().removeClass("done");
            todo.updateTodo(itemIndex, false);
        }
    });
    $(document).on('click', '.removeTodo', function (event) {
        var itemIndex = $(this).parents("li").data("index");
        todo.removeTodo(itemIndex);
    });
});

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

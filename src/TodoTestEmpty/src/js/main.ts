/// <reference path="jquery.ts" />

let todos: IItem[] = [];

interface IItem {
    baslik: string,
    tarih: Date,
    done: boolean,
}

interface ITodoItem {
    addTodo(item: IItem): boolean,
    getTodos(),
    updateTodo(index: number, status: boolean),
    removeTodo(index: number),
}

class Todo implements ITodoItem {

    addTodo(item: IItem): boolean {

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
    }

    getTodos() {
        $(".todoItem li").remove();
        var localTodos = window.sessionStorage.getItem("todo");
        if (localTodos) {
            todos = JSON.parse(localTodos);

            for (var i in todos) {
                var catsToItem = <IItem>todos[i];

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
    }

    updateTodo(index: number, status: boolean) {
        if (todos[index]) {
            todos[index].done = status;
            window.sessionStorage.setItem("todo", JSON.stringify(todos));
        }
        this.getTodos();
    }

    removeTodo(index: number) {
        todos.splice(index, 1);
        window.sessionStorage.setItem("todo", JSON.stringify(todos));
        this.getTodos();
    }
};

$(document).ready(() => {

    let todo = new Todo();
    todo.getTodos();

    $("#btnTodoAdd").click((e) => {
        var newItem: IItem = {
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
        } else {
            $(this).parent().removeClass("done");
            todo.updateTodo(itemIndex, false);
        }
    });

    $(document).on('click', '.removeTodo', function(event) {
        var itemIndex = $(this).parents("li").data("index");
        todo.removeTodo(itemIndex);
    });


});




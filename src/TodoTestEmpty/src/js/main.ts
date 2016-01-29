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
}

class Todo implements ITodoItem {

    addTodo(item: IItem): boolean {

        todos.push(item);
        window.sessionStorage.setItem("todo", JSON.stringify(todos));

        var rows = '<li>'
            + ' <label>'
            + ' <input type="checkbox" class="checkbox">'
            + ' <span class="title">' + item.baslik + '</span>'
            + ' <span class="date">' + item.tarih + '</span>'
            + '</label>'
            + '</li>';


        $(".todoItem").append(rows);
        return true;
    }

    getTodos() {
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
                    + '</label>'
                    + '</li>';
                $(".todoItem").append(rows);
            }
        }
    }

    updateTodo(index: number, status: boolean) {
        todos[index].done = status;
        window.sessionStorage.setItem("todo", JSON.stringify(todos));
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

});




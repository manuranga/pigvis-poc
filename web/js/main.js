$(function () {
    var mainColDiv = $('#main_column');
    var itemWrapDiv = $('#item_wrap');
    var commandTxt = $('#command_text');

    mainColDiv.height($(window).height() - 50); //TODO: don't hard code 50


    var addItem = function (command) {
        var itemDiv = $('<div class="result_item"></div>');
        itemDiv.appendTo(itemWrapDiv);
        var output = dispatch(command);
        var decorator = dispatchDecorator(command,output);
        decorator(itemDiv, command, output)
    };

    commandTxt.keypress(function (e) {
        var text;
        if (e.which == 13) {
            text = commandTxt.val();
            if (text != '') {
                addItem(text);
                commandTxt.val('');
            }
        }
    });

    function dispatch(command) {
        //this is dummy method, real method should do a ajax call
        command = command.toLowerCase();
        if (command.indexOf('describe') == 0) {
            return {'A':{'name':'chararray', 'age':'int', 'gpa':'float'}};
        }else{
            return command;
        }
    }

    function dispatchDecorator(command, output) {
        if (command.indexOf('describe') == 0) {
            return describeDecorator;
        }else{
            return plainTextDecorator;
        }

    }

    var describeDecorator = function (itemDiv, commandText, answerObj) {
    };

    var plainTextDecorator = function (itemDiv, commandText, answerObj) {
        itemDiv.text(answerObj);
    };

});
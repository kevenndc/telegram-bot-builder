const makeReply = function(keyboardOptions) {
    let keyboard = [];

    if (Array.isArray(keyboardOptions)) makeKeyboard();

    function makeKeyboard() {
        for (const option of keyboardOptions) {
            keyboard[keyboard.length] = [{
                text: option
            }];   
        }
    }

    return keyboard;
}

module.exports = { makeReply };
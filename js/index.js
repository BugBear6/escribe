window.onload = function() {
    (function() {
        var input = document.getElementById("input");
        var addAccent = false; // pressing /'/ will change to true;
        var addDots = false; // pressing /"/ will change to true // for /ü/;
        var newLetter;

        var lastCursorPosition = 0;

        input.focus();

        input.addEventListener("keydown", function(e) {
            var upperCase = e.key === e.key.toUpperCase() ? true : false;
            var start = this.selectionStart - 1;
            var end = this.selectionEnd;

            // 	handle Shift and CapsLock (can't affect the next letter input )
            if (e.keyCode === 16 || e.keyCode === 20) {
                return false;
            }

            // 	handle ñ
            if (e.altKey && e.keyCode === 78) {
                newLetter = "ñ";
                start = start + 1;
            }

            // handle ¡
            if (e.altKey && e.key == "!") {
                newLetter = "¡";
                start = start + 1;
            }

            // handle ¿
            if (e.altKey && e.key == "?") {
                newLetter = "¿";
                start = start + 1;
            }

            // handle accent letters
            if (addAccent) {
                switch (e.keyCode) {
                    case 69:
                        newLetter = "é";
                        break;
                    case 65:
                        newLetter = "á";
                        break;
                    case 73:
                        newLetter = "í";
                        break;
                    case 85:
                        newLetter = "ú";
                        break;
                    case 79:
                        newLetter = "ó";
                        break;
                }
            }

            // handle ü
            if (addDots && e.keyCode === 85) {
                newLetter = "ü";
            }

            if (newLetter) {
                e.preventDefault();
                if (upperCase) {
                    newLetter = newLetter.toUpperCase();
                }
                this.value = this.value.slice(0, start) + newLetter + this.value.slice(end);
                // Move the caret
                this.selectionStart = this.selectionEnd = start + 1;
            }

            // enable adding accent for the next char
            newLetter = false;
            e.key === "'" ? (addAccent = true) : (addAccent = false);
            e.key === '"' ? (addDots = true) : (addDots = false);
        });

        // save caret position for button acctions
        input.addEventListener("blur", function() {
            lastCursorPosition = this.selectionEnd;
        });

        // clear addAccent if user aborted text input
        ["click", "blur"].forEach(function(event) {
            input.addEventListener(event, function() {
                addAccent = false;
                addDots = false;
            });
        });

        var copyButton = document.getElementById("copyButton");
        copyButton.addEventListener("click", function() {
            input.select();
            document.execCommand("copy");
            window.getSelection().removeAllRanges();
            input.value = ""; // could be optional
            input.focus();
        });

        // accent letters
        var controlButtons = document.querySelectorAll('.input-group-addon:not(#copyButton)');
        Array.prototype.forEach.call(controlButtons, function(element) {
            element.addEventListener('click', function() {
                var letter = this.dataset.letter;
                input.value = input.value.slice(0, lastCursorPosition) + letter + input.value.slice(lastCursorPosition);
                // Move the caret
                input.focus();
                input.selectionStart = input.selectionEnd = lastCursorPosition + 1;
            });
        });

    })();
};
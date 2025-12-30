(function() {
    'use strict';

    const SKIP_TIME = 2; // Время перемотки в секундах. Можете изменить.

    function handleKeyDown(event) {
        // Проверяем, печатает ли пользователь в поле ввода
        const activeElement = document.activeElement;
        const isTyping = activeElement.tagName === 'INPUT' ||
                         activeElement.tagName === 'TEXTAREA' ||
                         activeElement.isContentEditable;

        // Если фокус на элементе ввода или нажаты Ctrl/Alt/Shift, игнорируем
        if (isTyping || event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) {
            return;
        }

        const videoPlayer = document.querySelector('#movie_player video');

        if (videoPlayer) {
            let keyHandled = false;

            switch (event.code) { // Используем event.code для независимости от раскладки
                case 'ArrowLeft':
                case 'KeyQ': // <--- Добавлена клавиша Q
                    videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime - SKIP_TIME);
                    keyHandled = true;
                    break;

                case 'ArrowRight':
                case 'KeyE': // <--- Добавлена клавиша E
                    videoPlayer.currentTime += SKIP_TIME;
                    keyHandled = true;
                    break;
            }

            // Если наша клавиша была обработана, отменяем стандартное действие YouTube
            if (keyHandled) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
            }
        }
    }

    document.addEventListener('keydown', handleKeyDown, true);

})();

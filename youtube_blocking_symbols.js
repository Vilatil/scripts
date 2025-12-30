(function() {
    'use strict';

    // Слушаем событие нажатия клавиши на всем документе
    // Использование 'true' (useCapture) гарантирует, что наш скрипт перехватит событие
    // до того, как его обработает собственный обработчик YouTube.
    document.addEventListener('keydown', function(event) {

        // Список клавиш, которые мы хотим заблокировать
        const blockedKeys = ['1', '2', '3', '4', '5', '6'];

        // Проверяем, является ли нажатая клавиша одной из тех, что в списке
        if (blockedKeys.includes(event.key)) {

            // Мы НЕ хотим блокировать цифры, если пользователь печатает
            // в поле поиска, в комментариях или любом другом поле ввода.
            const target = event.target;
            const isTyping = target.tagName === 'INPUT' ||
                             target.tagName === 'TEXTAREA' ||
                             target.isContentEditable;

            // Если пользователь печатает, ничего не делаем и выходим.
            if (isTyping) {
                return;
            }

            // Если это не поле ввода, мы останавливаем дальнейшее распространение события,
            // чтобы скрипт YouTube не мог его "услышать" и среагировать.
            event.stopImmediatePropagation();
        }
    }, true); // 'true' очень важен - это включает "фазу перехвата" (capturing phase)

})();

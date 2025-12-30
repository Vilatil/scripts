(function() {
    'use strict';

    const NOTIFICATION_TITLE = "Gemini";
    const NOTIFICATION_ICON = "https://www.gstatic.com/images/branding/product/1x/gemini_48dp.png";

    // Функция для отправки уведомления
    function sendNotification(message) {
        console.log("Sending notification:", message);
        GM_notification({
            title: NOTIFICATION_TITLE,
            text: message,
            image: NOTIFICATION_ICON,
            highlight: false,
            silent: false,
            timeout: 0
        });
    }

    // Функция для обработки новых ответов
    function processNewResponses() {
        // Находим все блоки ответов, которые еще не были обработаны
        const responses = document.querySelectorAll('.response-container:not([data-notified])');

        responses.forEach(response => {
            // Проверяем, что ответ не пустой и содержит сгенерированный контент
            const modelResponse = response.querySelector('.model-response-text');
            if (modelResponse && modelResponse.innerText.trim() !== "") {
                // Помечаем блок как обработанный, чтобы не отправлять повторные уведомления
                response.setAttribute('data-notified', 'true');

                // Создаем краткий текст для уведомления
                let snippet = modelResponse.innerText.substring(0, 100).replace(/\n/g, ' ') + '...';
                let message = `Ответ готов: "${snippet}"`;

                sendNotification(message);
            }
        });
    }

    // MutationObserver следит за изменениями на странице (добавлением новых элементов)
    const observer = new MutationObserver((mutations) => {
        // Мы запускаем проверку при любом изменении, так как Gemini динамически добавляет контент
        processNewResponses();
    });

    // Начинаем следить за изменениями во всем теле документа
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Первоначальная проверка на случай, если ответы уже есть на странице при загрузке скрипта
    processNewResponses();
})();

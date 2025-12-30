(function() {
    'use strict';

    // --- НАСТРОЙКА ---
    // Горизонтальные отступы (слева и справа)
    const horizontalPadding = '100px'; // Уменьшили до 100px

    // Вертикальные отступы (сверху и снизу)
    const verticalPadding = '10px';   // Добавили небольшие вертикальные отступы

    // --- КОД ---

    // 1. ЧАСТЬ CSS: Расширяем фон субтитров
    const customCss = `
        .dualsub-dialogue {
            /* Добавляем боковые и вертикальные отступы */
            padding-left: ${horizontalPadding} !important;
            padding-right: ${horizontalPadding} !important;
            padding-top: ${verticalPadding} !important;
            padding-bottom: ${verticalPadding} !important;

            /* Это гарантирует, что отступы правильно посчитаются */
            box-sizing: border-box !important;
        }
    `;

    GM_addStyle(customCss);


    // 2. ЧАСТЬ JAVASCRIPT: Блокируем сквозные клики (остается без изменений)
    const subtitleSelector = '.dualsub-dialogue';

    function stopEventPropagation(event) {
        event.stopPropagation();
    }

    const observer = new MutationObserver((mutations) => {
        const subtitleElements = document.querySelectorAll(subtitleSelector);
        if (subtitleElements.length > 0) {
            subtitleElements.forEach(element => {
                if (!element.dataset.clickFixed) {
                    element.addEventListener('mousedown', stopEventPropagation, true);
                    element.addEventListener('click', stopEventPropagation, true);
                    element.dataset.clickFixed = 'true';
                }
            });
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();

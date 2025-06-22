// Мы ждем, пока весь HTML-документ будет загружен и готов к взаимодействию.
// Это стандартная практика, чтобы избежать ошибок, когда скрипт пытается 
// найти элементы, которые еще не были созданы.
document.addEventListener('DOMContentLoaded', function() {
    
    // Получаем главный объект для взаимодействия с API Telegram WebApp.
    // Все функции, такие как закрытие окна, отправка данных и т.д.,
    // доступны через этот объект.
    const tg = window.Telegram.WebApp;

    // --- 1. Информируем Telegram, что наше приложение готово ---
    // Это уберет кружок загрузки и покажет ваше приложение.
    tg.ready();

    // --- 2. Получаем данные пользователя и отображаем их ---
    const userInfoDiv = document.getElementById('user-info');
    
    // Данные о пользователе находятся в tg.initDataUnsafe.user.
    // Важно проверить, что они существуют (?.user), так как при 
    // открытии вне Telegram этих данных не будет.
    if (tg.initDataUnsafe?.user) {
        const user = tg.initDataUnsafe.user;
        
        // Создаем приветственную строку. Проверяем наличие имени и фамилии.
        const greeting = `Привет, <strong>${user.first_name || ''} ${user.last_name || ''}</strong>! (@${user.username})`;
        
        // Вставляем приветствие в наш div.
        userInfoDiv.innerHTML = greeting;
    } else {
        // Если данные по какой-то причине недоступны, сообщим об этом.
        userInfoDiv.textContent = "Не удалось получить данные пользователя. Откройте приложение внутри Telegram.";
    }

    // --- 3. Добавляем обработчик на кнопку закрытия ---
    const closeButton = document.getElementById('close-button');
    
    // Проверяем, что кнопка найдена, прежде чем вешать обработчик.
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            // Это стандартная функция API для закрытия окна WebApp.
            tg.close();
        });
    }

    // --- Дополнительно: расширение возможностей ---
    // Вы можете менять текст основной кнопки Telegram и отлавливать ее нажатие
    // tg.MainButton.setText("Отправить данные");
    // tg.MainButton.show();
    // tg.MainButton.onClick(function() {
    //     const dataToSend = "какие-то полезные данные";
    //     tg.sendData(dataToSend);
    // });
});

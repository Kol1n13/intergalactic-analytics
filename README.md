Запуск:
Установить зависимости: 

    "fastify"  
    "react"  
    "react-dom"
    "react-router-dom"
    "zustand"  
    "@testing-library/dom"
    "@testing-library/jest-dom"
    "@testing-library/react"
    "@testing-library/user-event"
    "jsdom"
    "vitest"
    
Или просто npm install (если конечно установлен npm) <br>
    
Запустить сервер-обработчик - npm run start (или не запускать :D) <br>

Запустить основной сервер - npm run dev (или сбилдить его сначала) <br>

Выбрать/drag&drop файл и, при условии, что он csv, обработать его, нажав соответсвенную кнопку (:D) <br>

Для запуска тестов команда - npm test <br>

   Архитектура: 

      src/  
      ├── components/  UI-компоненты 
      ├── pages/   Страницы приложения
      ├── store/   Zustand - хранилище
      ├── types/   TypeScript-типы
      ├── api/     Функции работы с сервером-обработчиком
      ├── app/     Основной компонент приложения
      ├── tests/    Папка с тестами (для фронтенд части приложения)
      └── main.tsx Создание корня приложения
      public/
      ├── img/     Картинки (в основном - иконки)
      ├── css/     Общие стили (хоть там их и немного) + подключение шрифта
      └── fonts/   Сам шрифт

      tests/
      ├── generate-tests/  Тесты страницы генерации
      ├── history-tests/   Тесты страницы истории + мод окно
      ├── mainpage-tests/  Тесты главной страницы
      └── router-tests/    Тесты роутинга


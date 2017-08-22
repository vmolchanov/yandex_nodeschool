# Тестовое задание для участия в школе Node.JS от Яндекса

Задание было проверено в последней версии браузера Google Chrome для Mac OS X Sierra. Для его реализации был использован стандарт ES6.

## Запуск

```sh
$ npm run start
```
Для запуска задания необходимо иметь установленный [Node.JS](https://nodejs.org).

## Задание

Необходимо реализовать html-страницу с разметкой, логикой поведения и предоставлением глобального js-объекта с методами.

## Итоги

- Была сверстана веб-страница с формой, в которой присутствуют 3 инпута (ФИО, Email, телефон), кнопка для отправки формы и контейнер для вывода результата;
- Был реализован и добавлен в глобальную область видимости класс `MyForm`. В его конструкторе определяются необходимые для работы приватные поля. Класс содержит следующие методы:
    * `getData` - метод для получения данных из формы;
    * `setData` - метод для установки данных инпутам формы;
    * `validate` - метод возвращает объект с признаком результата валидации;
    * `submit` - метод выполняет валидацию полей и отправляет ajax-запрос, если валидация пройдена.
- Был реализован сервер на Node.js, который случайным образом отправляет один из тестовых ответов на ajax-запрос.
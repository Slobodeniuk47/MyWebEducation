1. mkdir server expres | client react и инициализация их базовыми файлами и кодом.
2. Создание удобного запуска server и client из одного места
   > Корень проекта
   > npm init -y (создаст package.json)
   > npm install concurrently --save-dev (удобный пакет для запуска нескольких команд одновременно в одном терминале.)
   ./DigitalEducation: npm start - запуск проекта. CTRL + C - остановка
3. Установка нужных зависимостей в корне сервера
   > npm install pg bcrypt jsonwebtoken passport passport-google-oauth20 express-session cors dotenv
   pg — для PostgreSQL
   bcrypt — для хеширования паролей
   jsonwebtoken — для токенов JWT
   passport + passport-google-oauth20 — для Google OAuth
   express-session — для сессий
   cors — для настройки CORS
   dotenv — для переменных окружения
4. Создание .env > server/.env и настройка
5. Создание БД PostgreSQL
6. Создание seederDb.js который сИдит данные в БД по команде npm run seederDb
7. Создание dropAllTablesDb.js удаляет все таблицы из БД.
8. Обновленный seederDb.js с bcrypt (passwordHash)
9. authMiddleWare + routes
10. 
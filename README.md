# filmStore
### Backend

Реализовано с помощью Express, 4 роута которые позволяют: получать, добавлять и удалять фильмы. Для сохранения фильмов была использована MongoDB. Фильмы сохраняются на MongoDB Atlas. Взаимодействие с бд с помощью mongoose.


### Frontend

Реализован с помощью библиотеки React. Графическая часть с помощью reactstrap. В приложении используется менеджер состояния redux в котором хранятся информация об фильмах. Используются middleware redux-thunk для асинхронных запросов на сервер.

## Usage

В терминале откройте нужную вам папку
```
git clone https://github.com/SO1T/filmStore.git
cd filmStore
npm install
npm run client-install
npm run dev
```
В браузере откроется окно на http://localhost:3000

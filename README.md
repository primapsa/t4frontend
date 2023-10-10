# t4u frontend 
***
Важно! Адрес локального сервера должен быть http://localhost:3000/
Это необходимо для корректной работы Google OAuth и PayPal

1.  Клонировать репозиторий 
```
git clone https://github.com/primapsa/t4frontend.git
```
2. Установить зависимости 
```
yarn install
```
3. Задать адрес бэкэнд сервера в /src/const/urls.ts
```
export const URLS = {
BASE: 'http://127.0.0.1:8000'
}
```
4. Запустить 

```
yarn start
```







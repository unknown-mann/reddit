# Reddit - клон Реддита

## 📓 Описание проекта:

Проект был сконфигурирован при помощи шаблона `npx create-next-app@latest --ts`

Приложение адаптировано под mobile, tablet, desktop

## Cтэк:

* `TypeScript`
* `React`
* `Next.js`
* `Firebase`
* `Recoil`
* `Chakra UI`

## ⚙️ Описание функциональности

Представляю вашему вниманию Full Stack приложение.

### Авторизация и новостная лента

При запуске приложения вы попадете на главную страницу. Вы можете авторизоваться через Google или через ранее созданный аккаунт. Если у вас еще нет аккаунта, вы можете зарегистрироваться используя любой валидный e-mail. Если же вы забыли пароль от ранее созданного аккаунта, вы можете с легкостью восстановить пароль, получив ссылку на почту. В ленте вам будут доступны для превью 10 постов с самым высоким рейтингом, отсортированные по убыванию. После авторизации лента будет сконфигурирована исходя из постов сообществ в которых вы состоите, посты будут отсортированы от более новых к более старым. В основной ленте вы можете просматривать посты из разных сообществ, ставить рейтинг, удалять свои посты и видеть общее количество комментарии оставленные под каждым постом.

![e96bffefc19a6c2251ec2bae6ca1d273785dedad](https://user-images.githubusercontent.com/99764749/197866393-604c0260-dedf-48d7-9ab6-c85b4a58d4af.gif)


### Посты

Кликнув на интересующий вас пост вы перейдете на страницу с данным постом, где также можете ставить рейтинг, но еще появится возможность просматривать оставленные другими пользователями комментарии и удалять свои. Здесь же будет информация о сообществе в котором был опубликован этот пост.

![b606d1d378b0dffa794bb64e9ecad15f7a48fe02](https://user-images.githubusercontent.com/99764749/197867990-8a20df70-079d-4e0c-86a2-61593c23980d.gif)


### Страница сообщества

Кликнув на интересующее вас сообщество вы перейдете на страницу данного сообщества. Здесь вы сможете увидеть более подробную информация о текущем сообществе, просмотреть все ранее опубликованные посты и перейти на страницу публикации нового поста в это сообщество. Для добавления нового поста в определенное сообщество, не обязательно нужно быть подписанным на него, но если вы хотите получать обновления от этого сообщества, вам нужно будет подписаться на него. Сделать это вы можете как на странице самого сообщества, так и на главной странице в разделе рекомендации.

![fd38b683cd27d307af47c75e5f636b70122aec07](https://user-images.githubusercontent.com/99764749/197872630-97af91cc-b011-4efb-89e4-69a9474475a6.gif)


### Создание нового сообщества

Для того, чтобы создать новое сообщество перейдите в выпадающее меню, кликнув на "Создать сообщество" откроется модальное окно, дайте вашему сообществу не занятое ранее имя и после подтверждения вы будете автоматически перенаправлены на страницу с новым сообществом. Вы автоматически становитесь админом этого сообщества и только вы сможете менять аватарку сообщества. Если вы решите покинуть созданное вами сообщество, то оно продолжит существовать для остальных пользователей, но у такого сообщества не будет админа, если же вы решите вернуться в это сообщество, в таком случае вы снова автоматически станете админом.

![29cb20c9405368dd1701a384329ff10aba482770](https://user-images.githubusercontent.com/99764749/197874711-5b501e76-086a-4c7b-8cd4-8322ee2fe5ad.gif)


### Добавление нового поста

Для создания нового поста перейдите в интересующее вас сообщество, затем кликнув на ссылку "Создать пост" вы перейдете на страницу добавления поста. Обязательно укажите заголовок поста, тело поста можно добавлять опционально также как и прикрепленное изображение. После подтверждения вы будуте перенаправлены на страницу сообщества.

![c6dd6e5030b69edd0d0e01c531d5cfa47d19fe1e](https://user-images.githubusercontent.com/99764749/197878605-b838edb6-6238-4e0d-9a0e-eb6bd52deb05.gif)

## 🧪 Опыт и сложности:

Очень сложно подходить к выбору проекта когда ты пишешь все сам один и это уже твой не первый проект, в итоге я решил написать клон Реддита, повторяющий его основной фунционал, то есть иметь возможность зарегестрироваться, поставить себе любимую аватарку, создать свое сообщество и поставить аватарку ему, вступать в другие сообщества, покидать их, голосовать за определенные посты, оставлять комментарии под постом, удалять эти комментарии, удалять сами посты.
Данный проект является моим последним проектом на текущий момент. В отличии от предыдущих моих проектов, где я сразу начинал писать код, а уже походу обдумывал подходящую структуру, то перед написанием этого проекта, опираясь на полученные знания и предыдущий опыт, я изначально обдумал его архитектуру, какие подходы и какие инструменты я буду использовать. Из определенного числа инструментов я выбрал наиболее подходящие для данной задачи (по крайней мере на мой взгляд). Стэк составил все тот же Next.js, Firebase, Recoil, а в качестве UI библиотеки я выбрал новую для себя Chakra UI, скажу сразу, что эта библиотека оказалось очень схожей с Material UI, но более гибкой в плане кастомизации, при желании не накладывающая свою стилистику и позволяющая создавать такие же приятные интерфейсы.

Процесс написания проекта был очень увлекающим. В отличии от предыдущих проектов, было меньше ошибок и непониманий с используемыми технологиями, что в свою очередь ускорило процесс разработки и уровень удовольствия получаемый от него. Хотя и без трудностей конечно не обошлось. Подход в организации хранения данных который поначалу казался самым подходящим и очевидным, повлек за себя некоторые трудности, поэтому пришлось пересмотреть структуру хранения данных и немного углубиться в понимание паттернов БД. В данном приложении структура взаимодействия пользователей и сообществ представляет собой отношение many-to-many. То есть каждое сообщество может иметь любое количество пользователей и каждый пользователь может состоять в любом количестве сообществ. Firebase является NoSQL базой данных, что безусловно дает свою вольность в отличии от SQL баз дынных, но при этом поначалу кажется немного сложной для продумывания подходящей структуры. Мне в данном вопросе помог ответ от одного пользователя на Stack Overflow, который порекомендовал выстраивать структуру хранения данных в NoSQL баз данных буквально так как вы на нее смотрите глядя на интерфейс. Немного повозившись мне удалось организовать подходящую структуру (на мой взгляд). Также были трудности с логикой голосования за посты, но в конечном итоге мне удалось приблизиться к желаемому результату.

Этот проект оказался для меня первым серьезным знакомством с БД. Благодаря чему я приобрел ценный опыт. Также усилил свои знания уже в знакомых технологиях и изучил новые.

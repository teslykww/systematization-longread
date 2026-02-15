# Как выложить проект на GitHub

Репозиторий уже инициализирован, первый коммит сделан. Осталось привязать GitHub и отправить код.

## Вариант 1: через GitHub CLI (удобно)

1. **Авторизуйся в GitHub:**
   ```powershell
   gh auth login
   ```
   Выбери GitHub.com → HTTPS → да, аутентифицируй через браузер.

2. **Создай репозиторий и запушь:**
   ```powershell
   cd "c:\Users\tesly\Downloads\cursor\files\systematization-longread"
   gh repo create systematization-longread --public --source . --push --description "Лендинг: система управления бизнесом, CTA в Telegram"
   ```
   Готово. Репозиторий появится на твоём аккаунте: `https://github.com/ТВОЙ_ЛОГИН/systematization-longread`

---

## Вариант 2: вручную через сайт GitHub

1. Зайди на **https://github.com/new**
2. **Repository name:** `systematization-longread` (или любое имя)
3. Выбери **Public**, не добавляй README / .gitignore (они уже есть в проекте)
4. Нажми **Create repository**

5. **В папке проекта выполни** (подставь свой логин вместо `YOUR_USERNAME`):
   ```powershell
   cd "c:\Users\tesly\Downloads\cursor\files\systematization-longread"
   git remote add origin https://github.com/YOUR_USERNAME/systematization-longread.git
   git branch -M main
   git push -u origin main
   ```

Если ветка у тебя уже `master`, а на GitHub по умолчанию `main`, то вместо `git branch -M main` оставь как есть и пушь: `git push -u origin master`.

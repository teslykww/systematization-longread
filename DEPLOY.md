# Деплой на Reg.ru

> Обновлено для теста автодеплоя.

## Локальный деплой

1. Скопируй `.env.example` в `.env.local`
2. Укажи `FTP_PASSWORD` (пароль FTP из письма Reg.ru)
3. Выполни: `npm run deploy`

## GitHub Actions (автообновление)

1. В репозитории: **Settings → Secrets and variables → Actions**
2. Добавь секреты: `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_REMOTE_DIR`
3. При push в `main` или `master` сайт автоматически соберётся и зальётся на хостинг

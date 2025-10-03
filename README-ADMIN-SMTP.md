# Admin & SMTP setup (local)

Questo file spiega come configurare e testare la pagina admin e la route di subscribe (invia email via SMTP oppure fallback su file) in locale.

1) Creare `.env.local`

  - Copia il file di esempio:

```bash
cp .env.local.example .env.local
```

  - Modifica `.env.local` riempiendo `ADMIN_PASSWORD` con una password forte. Questa password viene usata dalla route `/api/admin/login` per impostare un cookie HttpOnly che abilita la lettura delle sottoscrizioni.

2) Testare la pagina Admin

  - Avvia il dev server Next/Vite come fai normalmente (es. `npm run dev`).
  - Apri la pagina admin (dove è montata `AdminSubscriptions` nella tua app). Se non sei autenticato vedrai un campo password.
  - Inserisci la stessa password impostata in `ADMIN_PASSWORD` e premi Login. Dopo login, la pagina chiamerà `/api/admin/subscriptions` e mostrerà le sottoscrizioni.

3) Configurare Aruba SMTP per invio reale

  - Imposta le variabili `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_SECURE`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO` in `.env.local`.
  - Aruba tipicamente usa `smtp.aruba.it` o `smtp.pec.aruba.it` e porta `465` (SSL) o `587` (STARTTLS). Verifica le impostazioni del tuo account Aruba.

4) Testare l'invio email dalla route subscribe

  - Con le variabili impostate, esegui una richiesta POST a `/api/subscribe` con payload JSON { "email": "utente@example.com" }.
  - Se le credenziali SMTP sono corrette l'API tenterà di inviare l'email di notifica; in caso di successo riceverai risposta JSON { success: true }.
  - Se SMTP non è configurato, la route salva l'entry in `tmp/subscribe.log`; lo script `scripts/export_subscriptions.cjs` può convertire il log in CSV.

5) Test SMTP autenticato (Admin)

  - Con le variabili admin impostate, puoi testare l'invio SMTP direttamente dall'API (utile per verificare Aruba):

```bash
# 1) fai login (POST) con ADMIN_PASSWORD
curl -X POST http://localhost:3000/api/admin/login -H "Content-Type: application/json" -d '{"password":"<ADMIN_PASSWORD>"}' -c cookies.txt

# 2) esegui il test (POST) usando il cookie salvato
curl -X POST http://localhost:3000/api/admin/test-smtp -b cookies.txt
```

  - L'endpoint `POST /api/admin/test-smtp` richiede autenticazione e prova a inviare una mail usando le variabili `EMAIL_*` configurate.

5) CSV auto-update

  - Per generare il CSV a partire da `tmp/subscribe.log`:

  6) Logout

    - Per effettuare il logout ed eliminare il cookie admin_token:

  ```bash
  curl -X POST http://localhost:3000/api/admin/logout -b cookies.txt
  ```

  7) Secure cookie in produzione

    - Il cookie `admin_token` viene impostato con `Secure` solo quando `NODE_ENV=production`. Assicurati che il sito sia servito via HTTPS prima di attivare la produzione.

```bash
node scripts/export_subscriptions.cjs
```

  - Per avviare la modalità watch (aggiorna automaticamente `tmp/subscriptions.csv` quando `tmp/subscribe.log` cambia):

```bash
node scripts/export_subscriptions.cjs --watch &
```

6) Note su sicurezza

  - L'implementazione corrente è intenzionalmente semplice (password in env e cookie HttpOnly). Per produzione:
    - usare cookie firmati/JWT con scadenza e possibilità di revoca
    - abilitare HTTPS e il flag Secure sui cookie
    - aggiungere controllo degli IP o SSO/OAuth se serve

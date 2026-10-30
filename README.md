# MGS Group – web stavebnej spoločnosti
Statický web + Decap CMS. Obsah je v `content/site.json`, edituje sa na `/admin`.
1. Nahraj priečinok do GitHub repozitára (vetva `main`).
2. V `admin/config.yml` zmeň `repo:` na `tvoj-ucet/tvoj-repo`.
3. Netlify: Import from Git (bez build príkazu, publish dir `.`).
4. GitHub OAuth App: callback `https://api.netlify.com/auth/done`; v Netlify Access & security → OAuth → GitHub vlož Client ID a Secret.
5. Otvor `/admin`, prihlás sa cez GitHub a edituj. Uloženie = commit = redeploy.

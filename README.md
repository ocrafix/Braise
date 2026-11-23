# 🔥 Braise

Application web personnelle (PWA) pour suivre une **routine de soin** et un **programme de musculation de 15 minutes**, pensée mobile first et utilisable hors-ligne.

Aucune dépendance, aucun framework, aucun build : du HTML, du CSS et du JavaScript simples, hébergés tels quels sur GitHub Pages.

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Planning de la semaine](#planning-de-la-semaine)
- [La séance de 15 minutes](#la-séance-de-15-minutes)
- [Routines de soin](#routines-de-soin)
- [Structure du projet](#structure-du-projet)
- [Modifier le contenu](#modifier-le-contenu)
- [Données et sauvegarde](#données-et-sauvegarde)
- [Mise en ligne (GitHub Pages)](#mise-en-ligne-github-pages)
- [Installation sur Android](#installation-sur-android)
- [Mettre à jour l'app](#mettre-à-jour-lapp)
- [Notes techniques](#notes-techniques)
- [Pistes d'évolution](#pistes-dévolution)
- [Crédits](#crédits)
- [Licence](#licence)

## Fonctionnalités

- **Accueil** : le jour actuel est mis en avant, avec accès direct au soin et au sport du jour, puis la semaine complète.
- **Soin** : routine matin et soir pour chaque jour de la semaine.
- **Sport** : une séance fixe par jour, avec le muscle visé, la charge, un conseil de technique et un lien « Voir le mouvement » (recherche YouTube).
- **Chrono guidé** : prépare-toi (5 s), échauffement exercice par exercice, puis effort et transition automatiques. Pendant les pauses, le nom de l'exercice suivant s'affiche.
- **Sons et vibrations** : 3 bips sur les 3 dernières secondes avant chaque exercice, un bip plus long au départ, et un signal de fin de séance.
- **Chrono libre** : 30, 45, 60, 90 s ou une durée personnalisée, qui se lance en parallèle dans une seconde bulle sous celle de la séance.
- **Écran maintenu allumé** pendant les chronos (Wake Lock).
- **Charges ajustables** par exercice, avec la mention « 2 × 4 kg » (un haltère dans chaque main) ou « 8 kg » (un seul haltère).
- **Notes datées** : elles ne sont jamais écrasées, et les notes précédentes de la même séance s'affichent pour repérer ce qui revient d'une semaine à l'autre.
- **Suivi** : calendrier mensuel des séances de sport validées, série de jours consécutifs et total. Le soin et la mobilité ne sont pas comptés.
- **Hors-ligne** : service worker qui met l'app en cache.
- **Installable** : manifest PWA, avec icônes 192 et 512 px.

## Planning de la semaine

| Jour | Séance |
|---|---|
| Lundi | Repos (mobilité douce, 5 min) |
| Mardi | Bas du corps (sans saut, genou protégé) |
| Mercredi | Dos, épaules et bras |
| Jeudi | Repos (mobilité douce, 5 min) |
| Vendredi | Full body cardio (sans saut, sans bruit) |
| Samedi | Repos (mobilité douce, 5 min) |
| Dimanche | Haut du corps (pectoraux, épaules, triceps) |

## La séance de 15 minutes

Format identique pour les 4 jours d'entraînement :

- **5 exercices × 3 tours × (45 s d'effort + 15 s de transition)** = 15 min de travail.
- Un **échauffement guidé de 2 min** (5 mouvements) et un décompte de 5 s avant : environ **17 minutes** au total.
- Les durées de séance ne sont **pas modifiables dans l'app** : elles sont fixées dans `data.js`.
- Les jours de repos : 5 mouvements de mobilité, 40 s d'effort et 5 s de transition, 1 tour.

Matériel prévu : 2 haltères réglables (2 à 10 kg chacun, ou jusqu'à 18 kg sur un seul), disques de 1 et 2 kg utilisables seuls, un step de 10 cm, une marche de 40 cm et un tapis. Les charges de départ (environ 4 kg par haltère pour la plupart des exercices) sont des estimations à ajuster dans l'app.

## Routines de soin

- **Matin** (tous les jours) : Gel Anti-Spot, Cleanance Comedomed, Soin hydratant L'Oréal.
- **Soir, lundi et jeudi** : Gommage (douche), Cleanance Comedomed, Nivea Crème.
- **Soir, mercredi** : Gel Anti-Spot, Lotion purifiante, Cleanance Comedomed, Nivea Crème.
- **Soir, les autres jours** : Gel moussant (douche), Cleanance Comedomed, Nivea Crème.

## Structure du projet

```
.
├── index.html          Accueil (jour actuel + semaine)
├── jour.html           Choix Soin / Sport pour un jour  (?jour=mardi)
├── sport.html          Séance du jour, chronos, notes   (?jour=mardi)
├── soin.html           Routine matin / soir             (?jour=mardi)
├── suivi.html          Calendrier et statistiques
├── 404.html            Page d'erreur
├── base.css            Variables (couleurs), reset, typographie
├── components.css      Boutons, cartes, chronos, exercices
├── pages.css           Mises en page propres à chaque page
├── data.js             Planning, séances, échauffements, soins
├── timer.js            Fabrique de chronos (guidé et libre)
├── app.js              Affichage des pages, stockage, notes, suivi
├── service-worker.js   Cache hors-ligne
├── manifest.json       Configuration PWA
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
├── LICENSE             Licence MIT
└── README.md
```

Les pages HTML sont de simples gabarits : le contenu est généré par `app.js` à partir de `data.js`, selon l'attribut `data-page` du `<body>` et du paramètre `?jour=` de l'URL. Aucune balise `<script>` ou `<style>` ne contient de code : elles servent uniquement à importer des fichiers.

## Modifier le contenu

Tout se passe dans **`data.js`** :

- **`PLAN`** : quelle séance pour quel jour.
- **`SEANCES`** : pour chaque séance, le titre, la mission, la durée d'effort (`w`), de transition (`r`), le nombre de tours (`n`), l'échauffement (`echauff`), les exercices et les conseils.
- **Un exercice** : `id`, `nom`, `muscle`, `kg` (charge par défaut), `m` (`2` = un haltère dans chaque main, `1` = un seul haltère) et `tip` (conseil).
- **`MATIN`, `SOIR`, `SOIR_DEFAUT`** : les produits de soin.

Après chaque modification, pense à [changer la version du cache](#mettre-à-jour-lapp).

## Données et sauvegarde

Tout est stocké dans le navigateur (`localStorage`), sous une seule clé JSON : `routine-v1`.

| Champ | Contenu |
|---|---|
| `done` | Séances de sport validées, par date (`2026-11-24`) |
| `notes` | Notes par date et par séance (`2026-11-24\|mardi`) |
| `perso` | Charges personnalisées par exercice (`mardi-goblet`) |

- L'app demande au navigateur de protéger ces données contre le nettoyage automatique (`navigator.storage.persist()`).
- Les données sont **propres à chaque navigateur et à chaque domaine** : changer d'adresse, effacer les données du site ou réinstaller l'app repart de zéro.
- Il n'y a ni compte, ni serveur, ni export : rien ne quitte ton téléphone.

## Mise en ligne (GitHub Pages)

1. Place tous les fichiers à la racine du dépôt, avec le dossier `icons/`.
2. Dans le dépôt : **Settings → Pages → Build and deployment**, source **Deploy from a branch**, branche `main`, dossier `/ (root)`.
3. Le site est disponible sur `https://<utilisateur>.github.io/<dépôt>/`.

Tous les chemins sont relatifs : l'app fonctionne aussi bien à la racine que dans un sous-dossier. Le HTTPS fourni par GitHub Pages est nécessaire pour le service worker et le maintien d'écran allumé.

## Installation sur Android

1. Ouvre le site dans Chrome.
2. Menu ⋮ → **Installer l'application** (ou **Ajouter à l'écran d'accueil**).
3. L'app s'ouvre ensuite en plein écran, sous le nom **Braise**.

## Mettre à jour l'app

Le service worker met les fichiers en cache. Pour que ton téléphone récupère une nouvelle version :

1. Modifie `CACHE` dans `service-worker.js` (par exemple `routine-v7` → `routine-v8`).
2. Pousse les changements sur GitHub.
3. Ouvre l'app deux fois : la première charge la nouvelle version, la seconde l'active.

Si tu ajoutes un fichier, ajoute-le aussi à la liste `FILES` du service worker.

## Notes techniques

- **Chrono fiable** : il se base sur l'heure réelle (`Date.now()`), pas sur un compteur, pour rester précis.
- **Arrière-plan** : l'app n'est pas prévue pour tourner en arrière-plan. Le maintien d'écran allumé (Wake Lock) suffit tant que tu restes dessus pendant la séance.
- **Sons** : générés par l'API Web Audio, sans fichier audio. La vibration dépend du navigateur et de l'appareil.
- **Navigation** : le jour est passé dans l'URL (`?jour=mardi`), ce qui permet de mettre une page en favori.
- **Service worker** : réseau d'abord, puis cache en secours. Il tolère l'absence d'icônes.
- **Design** : fond charbon chaud (`#15110f`), accent orange braise (`#ff6b35`) pour le sport, vert sauge (`#8fbf9f`) pour le soin et les validations. Les couleurs sont des variables CSS dans `base.css`.
- **Compatibilité** : pensé et testé pour Chrome sur Android. Les navigateurs plus anciens peuvent ne pas supporter le Wake Lock.

## Pistes d'évolution

- **Notifications** de rappel : GitHub Pages n'a pas de serveur, il faudra un petit service externe (par exemple Cloudflare ou ntfy) pour des rappels programmés.
- **Schémas ou vidéos** des mouvements, hébergés dans le dépôt, à la place du lien YouTube.
- **Découpage de `app.js`** en plusieurs fichiers si l'app grossit.

## Crédits

Ce projet a été conçu et développé avec l'aide de l'IA :

- **Codex** (OpenAI) : première version du site, en HTML et CSS multi-pages.
- **Claude** (Anthropic) : refonte complète, nouvelle architecture, programme de 15 minutes, chronos, suivi, direction artistique et icônes.

## Licence

Ce projet est distribué sous licence **MIT**. Voir le fichier [LICENSE](LICENSE).

# Mon Choix 2027

Outil citoyen, open source et non partisan pour comparer l'impact des programmes
présidentiels sur quatre grandes catégories socio-économiques.

## Arborescence du projet

```
agora-sociale/
├── index.html              # Page d'accueil + comparateur interactif
├── candidat-exemple.html   # Exemple de fiche candidat détaillée
├── methodologie.html       # Méthodologie et garde-fous de neutralité
├── css/
│   └── style.css           # Tokens de design (couleurs, typo, layout)
├── js/
│   └── app.js               # Logique du comparateur (filtrage, rendu)
├── data/
│   └── data.js               # Jeu de données (FICTIF dans ce prototype)
└── README.md
```

### Pourquoi cette stack ?
Prototype en **HTML / CSS / JS vanilla**, sans build ni framework : déployable
en un clic sur GitHub Pages, Netlify ou Vercel, lisible par n'importe quel
contributeur bénévole, et sans dépendance qui casse dans deux ans. Migration
naturelle vers **Next.js** recommandée dès que le site a besoin de :
- pages générées dynamiquement par candidat/mesure (`getStaticProps` + ISR),
- un vrai CMS headless pour l'équipe éditoriale (voir plus bas),
- un rendu serveur pour le SEO sur des centaines de fiches.

Dans ce cas, la correspondance est directe :
`data/data.js` → contenu d'un CMS ou de fichiers JSON dans `/content`,
`js/app.js` → composants React (`<ComparateurClasse>`, `<CarteCandidat>`, `<Ledger>`),
`css/style.css` → tokens dans `tailwind.config.js` ou CSS Modules.

## Modèle de données

Voir `data/data.js`. Points clés :
- Chaque **mesure** appartient à un **thème** (`Pouvoir d'achat`, `Fiscalité`,
  `Travail & emploi`, `Services publics`).
- Chaque mesure a un objet `impactParClasse` avec, pour chacune des 4 classes :
  `score` (-2 à +2), `avantages[]`, `risques[]`, `angleMort` (texte libre).
- Chaque mesure a une `sourceOfficielle` obligatoire (URL du programme ou de la
  déclaration d'origine).

## Alimenter la base de données de façon neutre et factuelle

1. **Une seule source primaire par mesure.** Codifiez la règle : pas de
   mesure sans lien vers le programme officiel, un site de campagne, ou une
   déclaration publique datée. Bannissez les résumés de tiers comme source
   unique (ils incluent déjà une interprétation).

2. **Grille de score commune et publiée à l'avance** (voir `methodologie.html`).
   Fixez le barème *avant* de commencer la saisie, pas mesure par mesure — sinon
   le barème devient lui-même un choix politique implicite.

3. **Croisez avec des organismes non partisans pour la partie chiffrage** :
   INSEE, OFCE, France Stratégie, Cour des comptes, Institut Montaigne *et*
   IPP (Institut des politiques publiques) pour équilibrer les sensibilités
   des instituts. Ne citez jamais un seul institut économique comme arbitre
   final d'un désaccord.

4. **Double saisie / double relecture.** Deux personnes, si possible de
   sensibilités différentes, valident chaque fiche avant publication. Gardez
   une trace des désaccords non résolus plutôt que de les arbitrer en silence.

5. **Historique de versions public.** Un programme change pendant la
   campagne ; versionnez `data/data.js` (ou vos fichiers JSON) dans Git pour
   que chaque évolution soit visible et datée.

6. **Auditabilité du code ET des données.** Les deux sont dans le même dépôt
   public, sous licence ouverte (ex. MIT pour le code, CC-BY pour les
   données), pour que n'importe qui — y compris les équipes de campagne —
   puisse signaler une erreur factuelle via une *issue* ou une *pull request*.

7. **Ordre de présentation neutre.** Alphabétique par défaut, ou tirage au
   sort affiché comme tel — jamais par sondage, intention de vote ou popularité.

## Déploiement rapide

```bash
# Aucun build nécessaire : servir le dossier tel quel
npx serve agora-sociale
# ou déployer directement sur Netlify / GitHub Pages en pointant sur ce dossier
```

## Publier ce dépôt sur GitHub

```bash
cd agora-sociale
git init
git add .
git commit -m "Premier commit : Mon Choix 2027 (prototype statique)"
git branch -M main

# Crée d'abord un dépôt vide sur https://github.com/new (nom suggéré : agora-sociale)
# Ne coche PAS "Initialize with README" pour éviter un conflit d'historique.

git remote add origin https://github.com/NEWTON313/agora-sociale.git
git push -u origin main
```

Ensuite, remplace `NEWTON313` par ton identifiant réel dans le lien
« Code source » du menu de chaque page HTML (recherche `NEWTON313` dans
le projet) et republie.

### Activer GitHub Pages (site en ligne gratuit, sans serveur)

1. Sur GitHub, dans le dépôt → **Settings** → **Pages**
2. Source : **Deploy from a branch**, branche `main`, dossier `/ (root)`
3. Le site sera disponible sous `https://NEWTON313.github.io/agora-sociale/`
   après une à deux minutes.

## Prochaines étapes suggérées
- Ajouter un simulateur de revenu personnel (l'utilisateur entre son profil,
  le site met en évidence sa classe correspondante automatiquement).
- Ajouter une vue "tous les candidats, une mesure" en plus de la vue actuelle
  "tous les candidats, un thème, une classe".
- Exporter chaque fiche en JSON-LD pour le référencement et la réutilisation
  par d'autres médias.

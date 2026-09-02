/**
 * MON CHOIX 2027 — Jeu de données RÉEL (présidentielle 2027)
 * ===========================================================
 * ⚠️ AVERTISSEMENT MÉTHODOLOGIQUE IMPORTANT
 *
 * 1. AUCUNE LISTE OFFICIELLE DE CANDIDATS N'EXISTE À CE JOUR (28/08/2026).
 *    Les parrainages ne seront validés par le Conseil constitutionnel
 *    qu'au plus tard le 12 mars 2027. La primaire du Parti socialiste
 *    se tient les 11 et 18 octobre 2026. La situation d'un candidat
 *    (Marine Le Pen) dépend d'un pourvoi en cassation en cours.
 *    Ne sont retenus ici QUE des candidats ayant OFFICIELLEMENT
 *    déclaré leur candidature à la date de rédaction.
 *
 * 2. QUALITÉ DES SOURCES DISPONIBLES EN LIGNE : une recherche large a
 *    montré que l'écosystème d'information sur les candidats 2027 est
 *    dominé par des sites d'analyse tiers de fiabilité très inégale
 *    (agrégateurs, parfois avec des traces manifestes de contenu généré
 *    automatiquement). En conséquence, chaque mesure ci-dessous porte un
 *    champ `niveauConfiance` :
 *      - "confirme"  : rapporté par au moins un média reconnu (Le Parisien,
 *                      Le Monde, France Info, LCP, JDD, France24, AFP...)
 *                      ou position historique répétée sur plusieurs
 *                      campagnes et largement documentée.
 *      - "annonce"   : déclaration publique du candidat rapportée, mais
 *                      sans détail chiffré ou modalités précises à ce
 *                      stade — le programme complet n'est pas publié.
 *    Aucune mesure n'a été inventée pour "compléter" un thème : là où
 *    l'information fiable manque, la case est explicitement vide plutôt
 *    que remplie par une extrapolation.
 *
 * 3. Cette liste est PARTIELLE et NON REPRÉSENTATIVE de l'ensemble du
 *    champ politique : la gauche modérée (primaire PS non tenue) et les
 *    écologistes ne sont pas encore inclus faute de candidat officialisé
 *    au moment de la rédaction. À compléter au fil des annonces.
 *
 * 4. Les scores d'impact par classe (impactParClasse) restent, comme
 *    précisé dans methodologie.html, une ANALYSE ÉDITORIALE du site
 *    fondée sur des critères économiques déclarés à l'avance — ce ne
 *    sont pas des citations des candidats eux-mêmes.
 *
 * Dernière mise à jour : 28 août 2026. À réviser dès qu'un programme
 * officiel complet est publié ou qu'une candidature change de statut.
 * ===========================================================
 */

const CLASSES_SOCIALES = [
  {
    id: "populaires",
    nom: "Classes populaires",
    description: "Salariés modestes, employés, ouvriers, travailleurs précaires",
    couleur: "var(--classe-populaire)",
    couleurFond: "var(--classe-populaire-bg)",
  },
  {
    id: "moyennes",
    nom: "Classes moyennes",
    description: "Classes moyennes inf. et sup., artisans, commerçants, professions intermédiaires",
    couleur: "var(--classe-moyenne)",
    couleurFond: "var(--classe-moyenne-bg)",
  },
  {
    id: "aisees",
    nom: "Classes aisées",
    description: "Cadres dirigeants, professions libérales, hauts revenus, gros patrimoines",
    couleur: "var(--classe-aisee)",
    couleurFond: "var(--classe-aisee-bg)",
  },
  {
    id: "retraites",
    nom: "Retraités & inactifs",
    description: "Pensions, pouvoir d'achat des retraités, dépenses de santé",
    couleur: "var(--classe-retraites)",
    couleurFond: "var(--classe-retraites-bg)",
  },
];

const THEMES = [
  "Pouvoir d'achat et économie",
  "Retraites et modèle social",
  "Immigration et intégration",
  "Sécurité et justice",
  "Services publics",
  "Écologie et énergie",
  "Souveraineté et industrie",
  "Institutions et démocratie",
  "Europe et géopolitique",
];

// Note de transparence affichée en haut du comparateur — voir index.html
const AVIS_DONNEES_REELLES = {
  dateMaj: "2026-09-02",
  texte:
    "Liste partielle et provisoire : aucune candidature n'est encore officiellement validée par le Conseil constitutionnel (parrainages attendus au plus tard le 12/03/2027). La primaire du Parti socialiste (11-18/10/2026) n'a pas eu lieu ; les écologistes n'ont pas encore de candidat déclaré. La candidature de Marine Le Pen dépend d'un pourvoi en cassation en cours. Chaque mesure indique sa source et son niveau de confiance.",
};

// Remapping vers la taxonomie à 9 thèmes (2026-08-29) : les 9 mesures existantes ont été
// écrites sous l'ancienne taxonomie à 4 thèmes et sont réparties ici sur leur thème le plus
// proche. Deux choix sont discutables et à revoir lors d'une prochaine relecture éditoriale :
// `br-rsa` (RSA/emploi) est classée en "Pouvoir d'achat et économie" plutôt que "Retraites et
// modèle social", et `ep-regle-or` (règle d'or budgétaire, à valeur quasi institutionnelle)
// y est classée plutôt qu'en "Institutions et démocratie", car leur contenu chiffré reste
// avant tout économique/budgétaire. Les 6 autres thèmes (immigration, sécurité, écologie,
// souveraineté, institutions, Europe) n'ont aujourd'hui aucune mesure sourcée : case vide
// assumée plutôt qu'invention de contenu (voir méthodologie).
const CANDIDATS = [
  // ============================================================
  // JEAN-LUC MÉLENCHON — La France insoumise
  // ============================================================
  {
    id: "melenchon",
    nom: "Jean-Luc Mélenchon",
    parti: "La France insoumise",
    mesures: [
      {
        id: "jlm-retraites",
        theme: "Retraites et modèle social",
        titre: "Retour de la retraite à 60 ans avec 40 annuités de cotisation",
        resumeOfficiel:
          "Mesure phare reconduite depuis les campagnes 2012, 2017 et 2022 : abroger le report de l'âge légal et revenir à un départ à 60 ans pour une carrière complète de 40 ans, avec alignement des petites pensions sur un Smic revalorisé.",
        sourceOfficielle: "https://fr.wikipedia.org/wiki/%C3%89lection_pr%C3%A9sidentielle_fran%C3%A7aise_de_2027",
        niveauConfiance: "confirme",
        noteConfiance: "Position historique de LFI, répétée et documentée sur trois campagnes présidentielles successives.",
        impactParClasse: {
          populaires: {
            score: 1,
            avantages: ["Bénéficie en priorité aux carrières commencées tôt et aux métiers pénibles, plus représentés dans cette catégorie", "Revalorisation des petites pensions au niveau du Smic"],
            risques: ["Financement non détaillé publiquement (hausse de cotisations, autres recettes ?), donc incertitude sur qui supporte le coût à terme"],
            angleMort: "Le chiffrage précis du coût et de son financement n'est pas public à ce stade de la campagne.",
          },
          moyennes: {
            score: 0,
            avantages: ["Départ plus précoce pour les carrières complètes à 40 ans"],
            risques: ["Si financée par la fiscalité ou les cotisations, une partie de cette catégorie pourrait contribuer sans bénéficier de la même revalorisation que les petites pensions"],
            angleMort: "Aucune indication publique sur un éventuel geste fiscal ciblant spécifiquement cette catégorie pour financer la mesure.",
          },
          aisees: {
            score: -1,
            avantages: [],
            risques: ["Combinée aux mesures fiscales du même programme (voir fiche fiscalité), cette catégorie est identifiée comme contributrice nette probable au financement"],
            angleMort: "Le lien précis entre cette mesure retraites et les mesures fiscales n'est pas établi par un document budgétaire chiffré public.",
          },
          retraites: {
            score: 2,
            avantages: ["Effet direct et immédiat pour les futurs retraités concernés par l'abaissement de l'âge", "Revalorisation des pensions les plus faibles"],
            risques: ["Pérennité financière du système à moyen terme non démontrée par un chiffrage indépendant public"],
            angleMort: "Le Conseil d'orientation des retraites n'a pas publié d'évaluation officielle de cette proposition spécifique à ce stade.",
          },
        },
      },
      {
        id: "jlm-fiscalite",
        theme: "Pouvoir d'achat et économie",
        titre: "Nouvelles tranches d'impôt sur le revenu et alignement de la fiscalité du capital sur celle du travail",
        resumeOfficiel:
          "Création de tranches supplémentaires d'impôt sur le revenu pour les hauts revenus et taxation des revenus du capital (dividendes, plus-values) au même barème que les revenus du travail, dans l'objectif annoncé de financer les services publics et réduire les inégalités.",
        sourceOfficielle: "https://www.elyseescope.com/le-radar/programme-economique-melenchon-2027",
        niveauConfiance: "annonce",
        noteConfiance: "Cohérent avec le programme « L'Avenir en commun » des campagnes précédentes, mais chiffrage 2027 non retrouvé dans une source de premier rang au moment de la rédaction.",
        impactParClasse: {
          populaires: { score: 0, avantages: ["Non concernées par les tranches ou la taxation du capital"], risques: [], angleMort: "Le programme ne précise pas d'affectation ciblée d'une partie des recettes vers cette catégorie." },
          moyennes: { score: 0, avantages: ["Non concernées par le haut de barème visé"], risques: ["Une partie supérieure de cette catégorie détenant une épargne financière pourrait être affectée par l'alignement de la fiscalité du capital, sans que le seuil exact soit public"], angleMort: "Absence de seuil précis rendu public pour distinguer petite épargne et gros patrimoine financier." },
          aisees: { score: -2, avantages: [], risques: ["Hausse significative de la charge fiscale sur les hauts revenus et les revenus du capital", "Risque d'optimisation ou de délocalisation fiscale, évoqué de façon récurrente par des économistes critiques de ce type de mesure"], angleMort: "Aucun chiffrage indépendant public du rendement budgétaire attendu au moment de la rédaction." },
          retraites: { score: 0, avantages: ["Neutre pour la quasi-totalité des pensions"], risques: [], angleMort: "Effet possible pour une minorité de retraités disposant de revenus du capital importants, non quantifié." },
        },
      },
      {
        id: "jlm-nucleaire",
        theme: "Écologie et énergie",
        titre: "Sortie progressive du nucléaire au profit d'un mix 100 % renouvelable, avec un référendum proposé sur la question",
        resumeOfficiel:
          "Position reconduite depuis plusieurs campagnes (« L'Avenir en commun ») : sortir progressivement du nucléaire, développer massivement les énergies renouvelables (éolien, solaire, hydraulique, géothermie) pour atteindre 100 % d'énergies renouvelables, et soumettre la question nucléaire à référendum.",
        sourceOfficielle: "https://www.lejdd.fr/Politique/Nucleaire-Melenchon-appelle-la-gauche-a-organiser-un-referendum-413375-3116522",
        niveauConfiance: "confirme",
        noteConfiance: "Position historique de LFI documentée depuis les campagnes 2012 et 2017 (« L'Avenir en commun ») ; Le JDD rapporte spécifiquement sa proposition de référendum sur le nucléaire.",
        impactParClasse: {
          populaires: { score: -1, avantages: [], risques: ["Selon certaines analyses de la transition énergétique (ex. Allemagne), le remplacement d'une production nucléaire pilotable par des renouvelables peut entraîner une hausse temporaire des prix de l'électricité, qui pèserait proportionnellement plus sur cette catégorie"], angleMort: "Aucun chiffrage indépendant public du coût de la sortie du nucléaire ni de son effet sur la facture énergétique des ménages modestes." },
          moyennes: { score: 0, avantages: ["Effet potentiellement positif à long terme si les projets citoyens d'énergie renouvelable locale réduisent la facture"], risques: ["Coût d'investissement de la transition pouvant se répercuter sur la fiscalité ou les tarifs"], angleMort: "Le calendrier précis de fermeture des réacteurs et son effet sur les prix ne sont pas chiffrés publiquement." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "Les ménages aisés consacrant une part plus faible de leur revenu à l'énergie, cette catégorie est statistiquement moins exposée aux variations de prix ; aucun chiffrage spécifique n'est disponible." },
          retraites: { score: -1, avantages: [], risques: ["Les retraités à revenu fixe sont, comme les catégories populaires, statistiquement plus exposés qu'un actif à une hausse durable des prix de l'énergie"], angleMort: "Aucune mesure de compensation spécifique pour les retraités n'est associée publiquement à cette proposition." },
        },
      },
      {
        id: "jlm-vie-republique",
        theme: "Institutions et démocratie",
        titre: "Instaurer une VIe République par une assemblée constituante convoquée par référendum",
        resumeOfficiel:
          "Proposition reconduite depuis 2012 : organiser un référendum pour convoquer une assemblée constituante (élue et tirée au sort), chargée de rédiger une nouvelle Constitution instaurant un régime parlementaire, la proportionnelle, le référendum d'initiative citoyenne (RIC) et le référendum révocatoire, avant adoption par un second référendum.",
        sourceOfficielle: "https://www.franceinfo.fr/elections/presidentielle/instaurer-une-vie-republique-cinq-questions-pas-si-betes-sur-la-promesse-de-jean-luc-melenchon_2142248.html",
        niveauConfiance: "confirme",
        noteConfiance: "Position historique de LFI documentée sur les campagnes 2012, 2017 et 2022 ; détaillée par franceinfo et Le JDD.",
        impactParClasse: {
          populaires: { score: 0, avantages: ["Objectif affiché de renforcer la participation citoyenne directe (référendum d'initiative citoyenne, tirage au sort), potentiellement plus accessible aux catégories habituellement moins représentées dans les instances élues"], risques: [], angleMort: "Une réforme constitutionnelle ne se traduit pas mécaniquement par un effet différencié selon la catégorie socio-économique ; son impact dépendrait des lois votées ensuite par la nouvelle assemblée, non connues à ce stade." },
          moyennes: { score: 0, avantages: [], risques: [], angleMort: "Même angle mort que pour les autres catégories : l'effet économique dépend des politiques mises en œuvre après l'adoption d'une nouvelle Constitution, non déterminées par la mesure elle-même." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "Aucun effet économique direct identifiable à ce stade." },
          retraites: { score: 0, avantages: [], risques: [], angleMort: "Aucun effet économique direct identifiable à ce stade." },
        },
      },
    ],
  },

  // ============================================================
  // GABRIEL ATTAL — Renaissance
  // ============================================================
  {
    id: "attal",
    nom: "Gabriel Attal",
    parti: "Renaissance",
    mesures: [
      {
        id: "ga-ecole",
        theme: "Services publics",
        titre: "Réforme de l'école dès la rentrée 2027 (brevet obligatoire, groupes de niveau, fermeture des collèges les plus difficiles)",
        resumeOfficiel:
          "Brevet des collèges rendu obligatoire pour l'entrée au lycée, généralisation des groupes de niveau en français et mathématiques, ministre de l'Éducation nommé pour la durée du quinquennat, et fermeture d'une centaine de collèges qualifiés par le candidat de « ghettos scolaires » avec répartition des élèves dans d'autres établissements.",
        sourceOfficielle: "https://lcp.fr/actualites/presidentielle-retour-du-certificat-d-etudes-revalorisation-des-salaires-ce-que-propose",
        niveauConfiance: "confirme",
        noteConfiance: "Rapporté par LCP (chaîne de l'Assemblée nationale) à partir d'un entretien donné au Monde le 25 août 2026.",
        impactParClasse: {
          populaires: { score: -1, avantages: ["Objectif affiché de mixité sociale via la fermeture des collèges les plus en difficulté"], risques: ["Les groupes de niveau ont déjà été contestés par une partie des enseignants lors d'une première tentative en 2023-2024, avec un risque documenté de renforcement du tri scolaire selon leurs détracteurs"], angleMort: "Le sort concret des familles déplacées par la fermeture de collèges (temps de trajet, mixité réelle) n'est pas détaillé publiquement." },
          moyennes: { score: 0, avantages: ["Stabilité pédagogique recherchée via un ministre fixé sur la durée du quinquennat"], risques: [], angleMort: "Effet sur les collèges privés sous contrat non précisé." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "Mesure principalement centrée sur l'enseignement public, effet indirect non chiffré sur les stratégies de scolarisation privée." },
          retraites: { score: 0, avantages: [], risques: [], angleMort: "Mesure sans lien direct avec cette catégorie." },
        },
      },
      {
        id: "ga-salaires",
        theme: "Pouvoir d'achat et économie",
        titre: "Réduire l'écart entre salaire brut et salaire net",
        resumeOfficiel:
          "Annoncé comme l'un des quatre « chantiers capitaux » de la campagne (avec l'école, les frontières et l'intelligence artificielle) : le candidat souhaite augmenter le salaire net à coût du travail constant pour l'employeur, sans que le mécanisme précis (baisse de cotisations, autre levier) soit encore détaillé.",
        sourceOfficielle: "https://actu.orange.fr/politique/presidentielle-2027-gabriel-attal-revele-les-premieres-lignes-de-son-programme-magic-CNT000002pzsbo.html",
        niveauConfiance: "annonce",
        noteConfiance: "Priorité confirmée par plusieurs médias (Le Parisien, LCP, Orange Actu), mais mécanisme de mise en œuvre non encore publié.",
        impactParClasse: {
          populaires: { score: 1, avantages: ["Une hausse du net à brut constant profiterait proportionnellement plus aux bas salaires si elle passe par une baisse de cotisations salariales"], risques: ["Si la mesure passe par une baisse des cotisations sociales, la question du financement de la Sécurité sociale reste ouverte"], angleMort: "Aucun mécanisme précis rendu public : impossible d'évaluer l'ampleur réelle du gain à ce stade." },
          moyennes: { score: 1, avantages: ["Gain de pouvoir d'achat potentiel si la mesure s'applique à l'ensemble des salariés"], risques: [], angleMort: "Seuil de salaire concerné (s'il y en a un) non communiqué." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "Effet sur les hauts salaires non précisé." },
          retraites: { score: 0, avantages: [], risques: ["Mesure centrée sur les actifs ; aucune mesure miroir annoncée pour les pensions à ce stade"], angleMort: "Le programme ne traite pas explicitement du pouvoir d'achat des retraités dans cette annonce." },
        },
      },
      {
        id: "ga-immigration",
        theme: "Immigration et intégration",
        titre: "Quotas migratoires votés par le Parlement tous les deux ans, par métier et secteur",
        resumeOfficiel:
          "Propose que le Parlement fixe, tous les deux ans, des quotas d'immigration de travail par métier et secteur d'activité, sur la base des besoins identifiés par les partenaires sociaux, en donnant la priorité à l'immigration de travail sur le regroupement familial.",
        sourceOfficielle: "https://www.lejdd.fr/politique/immigration-gabriel-attal-propose-des-quotas-par-metier-et-par-origine-geographique-180879",
        niveauConfiance: "confirme",
        noteConfiance: "Rapporté par Le JDD et franceinfo comme une proposition structurante de sa campagne 2027.",
        impactParClasse: {
          populaires: { score: 0, avantages: ["Un pilotage par secteur pourrait, selon ses défenseurs, limiter une concurrence perçue sur certains emplois peu qualifiés"], risques: ["Risque de pénurie de main-d'œuvre dans des secteurs en tension (bâtiment, restauration, aide à la personne) qui emploient une proportion importante de travailleurs immigrés, ce qui pourrait aussi peser sur les prix ou les délais dans ces secteurs"], angleMort: "Le mécanisme précis de fixation des quotas et leur niveau ne sont pas encore chiffrés publiquement." },
          moyennes: { score: 0, avantages: [], risques: [], angleMort: "Effet peu documenté pour cette catégorie, moins directement concernée par les métiers cités comme prioritaires dans la proposition." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "Mesure sans effet direct documenté pour cette catégorie." },
          retraites: { score: 0, avantages: [], risques: ["Risque indirect sur les métiers de l'aide à domicile si les quotas se révèlent trop restrictifs pour ce secteur, où la main-d'œuvre immigrée est significative"], angleMort: "Aucune étude chiffrée publique sur l'effet des quotas envisagés sur le secteur de l'aide à la personne." },
        },
      },
    ],
  },

  // ============================================================
  // ÉDOUARD PHILIPPE — Horizons
  // ============================================================
  {
    id: "philippe",
    nom: "Édouard Philippe",
    parti: "Horizons",
    mesures: [
      {
        id: "ep-chomage",
        theme: "Pouvoir d'achat et économie",
        titre: "Réduire à 12 mois la durée d'indemnisation chômage pour les moins de 50 ans",
        resumeOfficiel:
          "Présenté par le candidat comme un alignement sur le modèle allemand, dans le cadre plus large d'un programme économique axé sur la maîtrise de la dépense publique.",
        sourceOfficielle: "https://www.lejdd.fr/economie/presidentielle-edouard-philippe-compte-reduire-lindemnisation-du-chomage-et-mettre-fin-a-lopen-bar-des-arrets-de-travail-181923",
        niveauConfiance: "confirme",
        noteConfiance: "Rapporté par le JDD et confirmé lors du débat des candidats organisé par le Medef, selon France Info.",
        impactParClasse: {
          populaires: { score: -1, avantages: [], risques: ["Réduction de la durée de couverture pour les demandeurs d'emploi les plus exposés au chômage de longue durée", "Effet potentiellement plus dur pour les métiers avec un marché du travail local tendu"], angleMort: "Le programme ne précise pas de mesure d'accompagnement spécifique pour les publics les plus fragiles pendant la transition." },
          moyennes: { score: -1, avantages: [], risques: ["Réduction de la sécurité en cas de perte d'emploi pour les salariés en milieu de carrière"], angleMort: "Effet différencié selon les secteurs (durée moyenne de retour à l'emploi) non détaillé." },
          aisees: { score: 0, avantages: [], risques: ["Effet limité pour les cadres dont la durée de recherche d'emploi est statistiquement plus courte, bien que non nul"], angleMort: "Pas de donnée publique du candidat sur l'effet différencié par catégorie socioprofessionnelle." },
          retraites: { score: 0, avantages: [], risques: [], angleMort: "Mesure sans effet direct sur cette catégorie." },
        },
      },
      {
        id: "ep-regle-or",
        theme: "Pouvoir d'achat et économie",
        titre: "Constitutionnaliser une règle d'or budgétaire limitant les déficits publics",
        resumeOfficiel:
          "Le candidat propose d'inscrire dans la Constitution une limite aux déficits publics, présentée comme un objectif de retour sous les 3 % de déficit d'ici 2030, sans détail chiffré public sur les mesures fiscales ou d'économies permettant de l'atteindre.",
        sourceOfficielle: "https://www.franceinfo.fr/elections/presidentielle/dette-publique-retraites-reindustrialisation-ce-qu-il-faut-retenir-du-premier-debat-des-principaux-candidats-a-la-presidentielle_8165342.html",
        niveauConfiance: "annonce",
        noteConfiance: "Objectif confirmé par France Info (débat Medef) ; la trajectoire précise (hausses d'impôts et/ou baisses de dépenses) n'est pas publique à ce stade.",
        impactParClasse: {
          populaires: { score: -1, avantages: [], risques: ["Si l'objectif est atteint par une baisse des dépenses publiques plutôt que par des recettes nouvelles, cette catégorie est historiquement plus dépendante des prestations et services publics concernés"], angleMort: "Le candidat n'a pas précisé la répartition entre hausses de recettes et baisses de dépenses." },
          moyennes: { score: 0, avantages: [], risques: ["Exposition possible si la trajectoire budgétaire passe par une hausse de la fiscalité générale"], angleMort: "Absence de détail sur les postes de dépenses ou de recettes concernés." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "Aucun élément public ne permet d'évaluer un effet spécifique sur cette catégorie." },
          retraites: { score: 0, avantages: [], risques: ["Les dépenses de retraite représentant une part importante de la dépense publique, un objectif de maîtrise budgétaire pourrait à terme les concerner sans que cela soit précisé"], angleMort: "Aucune mesure retraite chiffrée n'est associée publiquement à cet objectif à ce stade." },
        },
      },
      {
        id: "ep-reindustrialisation",
        theme: "Souveraineté et industrie",
        titre: "Réindustrialiser en misant sur la compétitivité : dette, formation, infrastructures",
        resumeOfficiel:
          "Lors du premier débat de la présidentielle organisé par le Medef (27 août 2026), a défendu que la réindustrialisation passe avant tout par la compétitivité : traiter la question de la dette, investir dans la formation et l'apprentissage, et développer les infrastructures. Propose par ailleurs une baisse de 50 milliards d'euros des impôts de production et la fin de la surtaxe sur les grandes holdings.",
        sourceOfficielle: "https://www.franceinfo.fr/elections/presidentielle/dette-publique-retraites-reindustrialisation-ce-qu-il-faut-retenir-du-premier-debat-des-principaux-candidats-a-la-presidentielle_8165342.html",
        niveauConfiance: "confirme",
        noteConfiance: "Propos tenus publiquement lors du débat Medef du 27 août 2026, rapportés par franceinfo et Le JDD.",
        impactParClasse: {
          populaires: { score: 0, avantages: ["Un plan de formation et d'apprentissage pourrait, selon ses défenseurs, améliorer l'accès à l'emploi industriel qualifié"], risques: ["La baisse d'impôts de production n'est pas assortie d'une contrepartie chiffrée publique en matière d'embauches ou de salaires"], angleMort: "Aucun chiffrage indépendant public ne permet d'établir si la baisse d'impôts se traduit par des emplois ou des salaires pour cette catégorie, plutôt que par des marges ou des dividendes." },
          moyennes: { score: 0, avantages: ["Effet potentiel positif si la réindustrialisation crée des emplois qualifiés dans les territoires concernés"], risques: [], angleMort: "Le calendrier et la localisation des créations d'emplois industrielles ne sont pas précisés publiquement." },
          aisees: { score: 1, avantages: ["Bénéfice direct de la suppression de la surtaxe sur les grandes holdings et de la baisse des impôts de production, qui profitent en premier lieu aux détenteurs de capital et aux grandes entreprises"], risques: [], angleMort: "Le chiffrage précis du gain pour les actionnaires et grandes entreprises, par rapport au coût pour les finances publiques, n'est pas public." },
          retraites: { score: 0, avantages: [], risques: [], angleMort: "Mesure centrée sur la fiscalité des entreprises et l'investissement industriel, sans lien direct avec cette catégorie identifié publiquement." },
        },
      },
    ],
  },

  // ============================================================
  // BRUNO RETAILLEAU — Les Républicains
  // ============================================================
  {
    id: "retailleau",
    nom: "Bruno Retailleau",
    parti: "Les Républicains",
    mesures: [
      {
        id: "br-rsa",
        theme: "Pouvoir d'achat et économie",
        titre: "Conditionner plus strictement le RSA à l'acceptation d'offres d'emploi",
        resumeOfficiel:
          "Dans la continuité de la logique d'activité déjà introduite par la loi pour le plein emploi, le candidat souhaite durcir les conditions de maintien du RSA en cas de refus répété d'offres d'emploi jugées raisonnables.",
        sourceOfficielle: "https://www.elyseescope.com/questions/programme-retailleau-lr-2027-securite-immigration",
        niveauConfiance: "annonce",
        noteConfiance: "Orientation cohérente avec les positions connues de Bruno Retailleau et de LR, mais modalités précises (durée, définition d'une offre « raisonnable ») non retrouvées dans une source de premier rang.",
        impactParClasse: {
          populaires: { score: -1, avantages: ["Objectif affiché d'insertion professionnelle plus rapide"], risques: ["Risque de sanctions (suspension de l'allocation) pour des allocataires confrontés à des freins réels à l'emploi (garde d'enfants, mobilité, santé) non résolus par la mesure elle-même", "Associations de lutte contre la pauvreté généralement critiques de ce type de conditionnalité"], angleMort: "Le programme ne détaille pas les moyens d'accompagnement (formation, garde d'enfants, mobilité) prévus en parallèle de la sanction." },
          moyennes: { score: 0, avantages: [], risques: [], angleMort: "Mesure sans effet direct pour cette catégorie, non bénéficiaire du RSA dans son ensemble." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "Mesure sans lien avec cette catégorie." },
          retraites: { score: 0, avantages: [], risques: [], angleMort: "Mesure sans effet direct ; ne concerne pas les retraités, mais peut concerner des inactifs non retraités selon la catégorie retenue par le comparateur." },
        },
      },
      {
        id: "br-retention",
        theme: "Sécurité et justice",
        titre: "Allonger la durée de rétention administrative des étrangers jugés dangereux",
        resumeOfficiel:
          "En tant que ministre de l'Intérieur, a porté un texte allongeant la rétention administrative des étrangers en situation irrégulière jugés dangereux ; après une censure du Conseil constitutionnel, a annoncé la présentation d'un texte modifié reprenant cet objectif.",
        sourceOfficielle: "https://www.lejdd.fr/politique/retention-des-etrangers-dangereux-retailleau-promet-un-texte-modifie-apres-la-censure-du-conseil-constitutionnel-160881",
        niveauConfiance: "confirme",
        noteConfiance: "Rapporté par Le JDD ; s'inscrit dans la ligne sécuritaire documentée de Bruno Retailleau comme ministre de l'Intérieur, reprise dans sa campagne.",
        impactParClasse: {
          populaires: { score: 0, avantages: ["Objectif affiché de sécurité publique, argument parfois avancé comme bénéficiant en priorité aux quartiers où la délinquance liée à des étrangers en situation irrégulière jugés dangereux serait perçue comme plus présente"], risques: ["Risque, selon des associations de défense des droits, d'atteinte aux libertés individuelles et de rétention prolongée de personnes non encore jugées"], angleMort: "Aucune donnée chiffrée publique ne permet d'établir un effet différencié de cette mesure selon la catégorie socio-économique ; son objet est la sécurité publique, pas une politique économique." },
          moyennes: { score: 0, avantages: [], risques: [], angleMort: "Mesure de sécurité publique sans effet économique direct documenté par catégorie." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "Mesure de sécurité publique sans effet économique direct documenté par catégorie." },
          retraites: { score: 0, avantages: [], risques: [], angleMort: "Mesure de sécurité publique sans effet économique direct documenté par catégorie." },
        },
      },
    ],
  },

  // ============================================================
  // MARINE LE PEN — Rassemblement national
  // ============================================================
  {
    id: "le-pen",
    nom: "Marine Le Pen",
    parti: "Rassemblement national",
    mesures: [
      {
        id: "mlp-tva",
        theme: "Pouvoir d'achat et économie",
        titre: "Suppression ou forte baisse de la TVA sur les produits de première nécessité",
        resumeOfficiel:
          "Proposition récurrente du Rassemblement national sur plusieurs campagnes : réduire ou supprimer la TVA sur l'énergie, l'alimentation et le carburant pour soutenir le pouvoir d'achat, sans calendrier ni chiffrage budgétaire détaillé rendus publics pour 2027 à ce stade.",
        sourceOfficielle: "https://www.elyseescope.com/le-radar/programme-economique-marine-le-pen-rn-2027",
        niveauConfiance: "confirme",
        noteConfiance: "Position historique du RN, documentée sur plusieurs campagnes successives (2017, 2022) ; les modalités précises pour 2027 restent à préciser selon les sources consultées.",
        impactParClasse: {
          populaires: { score: 2, avantages: ["Effet direct et proportionnellement plus favorable pour les ménages consacrant une part plus importante de leur revenu à ces produits de consommation courante"], risques: ["Financement du manque à gagner de TVA (recette de l'État) non détaillé publiquement"], angleMort: "Aucun chiffrage indépendant public du coût budgétaire de la mesure au moment de la rédaction." },
          moyennes: { score: 1, avantages: ["Gain de pouvoir d'achat, dans une proportion moindre du revenu que pour les classes populaires"], risques: [], angleMort: "Effet exact selon la composition du panier de consommation, non détaillé." },
          aisees: { score: 0, avantages: ["Gain en valeur absolue possible mais représentant une part marginale du revenu"], risques: [], angleMort: "Non chiffré spécifiquement pour cette catégorie." },
          retraites: { score: 1, avantages: ["Effet positif pour les retraités aux pensions modestes, dont la part de consommation contrainte est proportionnellement élevée"], risques: [], angleMort: "Effet différencié selon le niveau de pension non chiffré publiquement." },
        },
      },
      {
        id: "mlp-ifi",
        theme: "Pouvoir d'achat et économie",
        titre: "Suppression de l'IFI et création d'un impôt sur la fortune financière (IFF)",
        resumeOfficiel:
          "Le Rassemblement national propose de remplacer l'impôt sur la fortune immobilière par un impôt ciblant les actifs financiers, présenté par le parti comme visant la « spéculation » plutôt que la détention d'un bien immobilier.",
        sourceOfficielle: "https://www.franceinfo.fr/replay-radio/l-edito-politique/taxation-des-ultra-riches-le-grand-ecart-du-rn_7472092.html",
        niveauConfiance: "confirme",
        noteConfiance: "Proposition distinctive et récurrente du RN documentée sur plusieurs campagnes (dont 2022), analysée par franceinfo ; barème précis de l'IFF non retrouvé dans une source de premier rang pour 2027.",
        impactParClasse: {
          populaires: { score: 0, avantages: [], risques: [], angleMort: "Mesure sans effet direct, cette catégorie n'étant concernée ni par l'IFI ni par l'IFF envisagé." },
          moyennes: { score: 0, avantages: ["Non concernées par les seuils habituels de ce type d'impôt"], risques: [], angleMort: "Seuil exact de l'IFF non publié, ce qui empêche de vérifier l'absence totale d'effet pour le haut de cette catégorie." },
          aisees: { score: 0, avantages: ["Allègement pour les détenteurs de patrimoine immobilier important (suppression de l'IFI)"], risques: ["Une partie de cette catégorie, si elle détient un patrimoine financier important, pourrait être visée par le nouvel IFF sans que le barème soit public"], angleMort: "Le rendement budgétaire comparé de l'IFI supprimé et de l'IFF créé n'est pas chiffré publiquement, rendant l'effet net incertain même pour cette catégorie." },
          retraites: { score: 0, avantages: [], risques: [], angleMort: "Effet marginal, sauf pour une minorité de retraités à patrimoine financier important, non quantifié." },
        },
      },
      {
        id: "mlp-immigration",
        theme: "Immigration et intégration",
        titre: "Référendum sur l'immigration pour inscrire la « priorité nationale » et supprimer le droit du sol",
        resumeOfficiel:
          "Si elle est élue, la première décision annoncée serait l'organisation d'un référendum sur l'immigration, visant à inscrire dans la Constitution une « priorité nationale » pour l'accès à l'emploi et au logement, et à supprimer le droit du sol.",
        sourceOfficielle: "https://www.franceinfo.fr/politique/marine-le-pen/video-si-elle-etait-elue-presidente-de-la-republique-la-premiere-decision-de-marine-le-pen-serait-l-organisation-d-un-referendum-sur-l-immigration_4344025.html",
        niveauConfiance: "confirme",
        noteConfiance: "Position historique du RN documentée sur plusieurs campagnes ; franceinfo rapporte cette annonce comme sa « première décision » en cas d'élection.",
        impactParClasse: {
          populaires: { score: 1, avantages: ["Objectif affiché de réduire la concurrence pour l'accès à l'emploi et au logement social, secteurs où cette catégorie est proportionnellement plus présente"], risques: ["Risque de pénurie de main-d'œuvre dans certains secteurs déjà en tension (bâtiment, aide à la personne, agriculture) et employant une proportion importante de travailleurs immigrés, selon plusieurs études économiques"], angleMort: "Aucun chiffrage indépendant public de l'effet net sur l'emploi ou les salaires des catégories populaires ; la mesure nécessiterait une révision constitutionnelle dont l'issue n'est pas garantie." },
          moyennes: { score: 0, avantages: [], risques: [], angleMort: "Effet moins documenté pour cette catégorie, moins directement concernée par l'accès prioritaire à l'emploi non qualifié ou au logement social." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "Mesure sans effet direct documenté pour cette catégorie." },
          retraites: { score: 0, avantages: [], risques: ["Risque indirect de tension sur les métiers de l'aide à domicile et du soin aux personnes âgées, secteurs qui emploient une proportion significative de travailleurs immigrés"], angleMort: "Aucune étude chiffrée publique ne permet d'établir l'ampleur de cet effet pour les retraités dépendants de ces services." },
        },
      },
    ],
  },
];

if (typeof window !== "undefined") {
  window.AGORA_DATA = { CLASSES_SOCIALES, THEMES, CANDIDATS, AVIS_DONNEES_REELLES };
}

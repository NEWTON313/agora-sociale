/**
 * MON CHOIX 2027 — Jeu de données RÉEL (présidentielle 2027)
 * ===========================================================
 * ⚠️ AVERTISSEMENT MÉTHODOLOGIQUE IMPORTANT
 *
 * 1. AUCUNE LISTE OFFICIELLE DE CANDIDATS N'EXISTE À CE JOUR (04/09/2026).
 *    Les parrainages ne seront validés par le Conseil constitutionnel
 *    qu'au plus tard le 12 mars 2027. La primaire de la gauche socialiste
 *    et démocratique (PS/Place publique) est prévue en deux tours les
 *    9-10 et 16-17 octobre 2026 et n'a pas encore eu lieu. La situation
 *    d'un candidat (Marine Le Pen) dépend de l'issue de son pourvoi en
 *    cassation, actuellement en cours.
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
 *    champ politique : la gauche modérée (primaire PS non tenue) n'est
 *    pas encore incluse faute de candidat officialisé au moment de la
 *    rédaction. À compléter au fil des annonces.
 *
 * 4. Les scores d'impact par classe (impactParClasse) restent, comme
 *    précisé dans methodologie.html, une ANALYSE ÉDITORIALE du site
 *    fondée sur des critères économiques déclarés à l'avance — ce ne
 *    sont pas des citations des candidats eux-mêmes.
 *
 * Dernière mise à jour : 4 septembre 2026. À réviser dès qu'un programme
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
  dateMaj: "2026-09-07",
  texte:
    "Liste partielle et provisoire : aucune candidature n'est encore officiellement validée par le Conseil constitutionnel (parrainages attendus au plus tard le 12/03/2027). La primaire de la gauche socialiste et démocratique (PS/Place publique) est prévue en deux tours les 9-10 et 16-17 octobre 2026 et n'a pas encore eu lieu. Marine Tondelier (Les Écologistes) est officiellement candidate depuis octobre 2025. La candidature de Marine Le Pen dépend de l'issue de son pourvoi en cassation, actuellement en cours après la réduction de sa peine d'inéligibilité en appel. Chaque mesure indique sa source et son niveau de confiance.",
};

// Remapping vers la taxonomie à 9 thèmes (2026-08-29) : `br-rsa` (RSA/emploi) est classée en
// "Pouvoir d'achat et économie" plutôt que "Retraites et modèle social", et `ep-regle-or`
// (règle d'or budgétaire, à valeur quasi institutionnelle) y est classée plutôt qu'en
// "Institutions et démocratie", car leur contenu chiffré reste avant tout économique/budgétaire.
// Le thème "Europe et géopolitique" a reçu sa première mesure sourcée le 2026-09-06 (`jlm-dette-bce`),
// puis une deuxième le 2026-09-07 (`br-espagne-schengen`) ; case laissée vide pour les autres candidats
// faute de mesure sourcée équivalente, plutôt que d'inventer du contenu (voir méthodologie).
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
      {
        id: "jlm-ecoregions",
        theme: "Écologie et énergie",
        titre: "Remplacer les régions par 13 « écorégions » organisées autour des bassins hydrographiques",
        resumeOfficiel:
          "La France insoumise propose de remplacer les régions actuelles par treize « écorégions » organisées autour des bassins hydrographiques, compétentes sur l'eau, l'air, le littoral, les forêts, la fertilité des sols, la mobilité, l'économie circulaire et la santé environnementale, avec un pouvoir réglementaire possible dans ces domaines. Les contours précis et les compétences définitives faisaient encore l'objet de travaux d'expertise à l'été 2026.",
        sourceOfficielle: "https://www.franceinfo.fr/environnement/actions-ecologiques/jean-luc-melenchon-et-lfi-veulent-restructurer-les-regions-autour-des-fleuves-pour-quoi-faire-et-pourquoi-ce-n-est-pas-si-simple_8083088.html",
        niveauConfiance: "annonce",
        noteConfiance: "Projet détaillé publiquement par les député·es porteurs du dossier et rapporté par franceinfo, Le JDD et France 24 ; les contours exacts (limites, compétences, calendrier) restent en cours d'expertise à l'été 2026, sans texte définitif publié — d'où un niveau de confiance « annonce » malgré une intention déjà bien documentée.",
        impactParClasse: {
          populaires: {
            score: 0,
            avantages: ["Une politique de l'eau et de prévention des risques mieux articulée à l'échelle des bassins versants pourrait, selon ses défenseurs, mieux protéger les zones inondables ou en tension hydrique, où vivent aussi des ménages modestes"],
            risques: ["Une réorganisation territoriale de cette ampleur comporte un risque de complexité administrative et de coût de transition, dont l'effet sur les services publics locaux n'est pas chiffré"],
            angleMort: "Le projet n'est pas encore stabilisé publiquement ; aucun chiffrage du coût de la réforme ni de ses effets sur l'emploi public territorial n'est disponible.",
          },
          moyennes: {
            score: 0,
            avantages: [],
            risques: ["Incertitude sur l'avenir des compétences économiques régionales actuelles (formation professionnelle, développement économique) dans la nouvelle organisation"],
            angleMort: "Le sort des compétences régionales non environnementales dans les futures écorégions n'est pas précisé publiquement.",
          },
          aisees: {
            score: 0,
            avantages: [],
            risques: [],
            angleMort: "Aucun effet économique différencié identifiable à ce stade pour cette catégorie, faute de texte stabilisé.",
          },
          retraites: {
            score: 0,
            avantages: [],
            risques: [],
            angleMort: "Mesure de réorganisation territoriale sans lien direct identifié avec cette catégorie à ce stade du projet.",
          },
        },
      },
      {
        id: "jlm-conscription-ecologique",
        theme: "Écologie et énergie",
        titre: "Créer une « conscription écologique » pour renforcer la sécurité civile face aux crises climatiques",
        resumeOfficiel:
          "Jean-Luc Mélenchon propose une « conscription écologique » : constituer, via un service obligatoire, une réserve citoyenne mobilisable pour renforcer la sécurité civile face aux crises climatiques (incendies notamment), en reprenant et adaptant sa proposition de 2022 d'une conscription citoyenne de neuf mois rémunérée au Smic.",
        sourceOfficielle: "https://www.lejdd.fr/politique/quest-ce-que-la-conscription-ecologique-que-veut-instaurer-jean-luc-melenchon-181641",
        niveauConfiance: "confirme",
        noteConfiance: "Proposition détaillée par le candidat le 23 août 2026 et rapportée par Le JDD et France 24, en filiation directe avec sa proposition chiffrée de 2022 (neuf mois, rémunération au Smic).",
        impactParClasse: {
          populaires: {
            score: 1,
            avantages: ["Une conscription rémunérée au Smic, sur le modèle de la proposition 2022, constituerait un revenu et une expérience professionnelle pour des jeunes de cette catégorie, souvent plus exposés au chômage des jeunes"],
            risques: ["Caractère obligatoire pouvant être vécu comme une contrainte, notamment pour les jeunes déjà entrés dans la vie active"],
            angleMort: "Le niveau de rémunération et la durée définitifs pour la version 2027 de la mesure ne sont pas encore chiffrés publiquement, seule la version 2022 l'était.",
          },
          moyennes: {
            score: 0,
            avantages: [],
            risques: ["Interruption potentielle d'études ou de début de carrière pour les jeunes de cette catégorie"],
            angleMort: "Modalités d'articulation avec les études supérieures non précisées publiquement.",
          },
          aisees: {
            score: 0,
            avantages: [],
            risques: [],
            angleMort: "Effet non différencié documenté publiquement pour cette catégorie.",
          },
          retraites: {
            score: 0,
            avantages: ["Bénéfice indirect possible d'une meilleure réponse aux crises climatiques (feux de forêt) pouvant affecter des zones où résident des retraités"],
            risques: [],
            angleMort: "Aucune donnée publique ne permet de chiffrer cet effet indirect.",
          },
        },
      },
      {
        id: "jlm-dette-bce",
        theme: "Europe et géopolitique",
        titre: "Geler une partie de la dette publique française détenue par la BCE, en commençant par la dette Covid",
        resumeOfficiel:
          "Lors des universités d'été de La France insoumise le 23 août 2026, Jean-Luc Mélenchon a proposé que la Banque centrale européenne « mette au congélateur » les dettes des États, en commençant par celles de la période Covid : transformer en dette perpétuelle à taux nul la dette française détenue par la Banque de France pour le compte de la BCE, soit selon lui 18 % de la dette totale de l'État (636 milliards d'euros sur les 3 536 milliards recensés par l'Insee ; le gouvernement évalue plutôt le périmètre concerné à environ un quart de la dette, soit 884 milliards d'euros). Il propose d'étendre ce mécanisme aux dettes publiques des autres pays européens détenues par la BCE via leurs banques centrales nationales.",
        sourceOfficielle: "https://www.franceinfo.fr/economie/crise/crise-de-la-dette/cinq-questions-sur-la-proposition-de-jean-luc-melenchon-de-geler-une-partie-de-la-dette-francaise_8160833.html",
        niveauConfiance: "confirme",
        noteConfiance: "Proposition détaillée publiquement par le candidat le 23 août 2026 lors des universités d'été de LFI, chiffrée (18 %, 636 milliards d'euros selon le candidat) et rapportée par franceinfo et France 24 ; sa faisabilité juridique (indépendance statutaire de la BCE, unanimité des 27 États membres requise pour une révision des traités) est contestée par plusieurs économistes, ce qui relève du débat sur la mesure et non de l'existence de la proposition elle-même.",
        impactParClasse: {
          populaires: {
            score: 0,
            avantages: ["Selon ses défenseurs, la marge budgétaire dégagée par le gel de la dette pourrait financer des dépenses sociales bénéficiant en priorité à cette catégorie"],
            risques: ["Plusieurs économistes avertissent qu'une telle décision pourrait détériorer la confiance des marchés et renchérir le coût des emprunts publics futurs, dont la charge pèse sur le budget de l'État"],
            angleMort: "Le programme ne garantit pas d'affectation précise de la marge budgétaire dégagée vers des dépenses profitant spécifiquement à cette catégorie ; aucun chiffrage indépendant public de l'effet sur les taux d'emprunt futurs n'est disponible.",
          },
          moyennes: {
            score: 0,
            avantages: [],
            risques: ["Comme pour les autres catégories, un risque de hausse des taux d'intérêt sur la dette future pourrait peser indirectement sur le coût du crédit"],
            angleMort: "Effet différencié par catégorie non documenté publiquement, la mesure opérant au niveau macroéconomique plutôt que par un transfert direct aux ménages.",
          },
          aisees: {
            score: 0,
            avantages: [],
            risques: [],
            angleMort: "Mesure de politique monétaire et budgétaire sans effet direct identifié pour cette catégorie à ce stade ; un effet indirect sur les détenteurs de dette française via les marchés financiers n'est pas chiffré publiquement.",
          },
          retraites: {
            score: 0,
            avantages: ["Selon ses défenseurs, la marge budgétaire dégagée pourrait à terme contribuer au financement de dépenses sociales, dont les pensions"],
            risques: [],
            angleMort: "Aucun lien chiffré n'est établi publiquement entre cette mesure et le financement du système de retraite.",
          },
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
          "Annoncé comme l'un des quatre « chantiers capitaux » de la campagne (avec l'école, les frontières et l'intelligence artificielle) : le candidat veut rapprocher le salaire net du salaire brut en agissant sur les cotisations vieillesse, via des économies sur les dépenses sociales et une réforme de l'assurance-chômage. Il chiffre le gain à environ 250 euros nets de plus par mois pour un salaire médian, pour un coût estimé à 40 milliards d'euros.",
        sourceOfficielle: "https://www.franceinfo.fr/replay-jt/france-2/20-heures/rapprocher-le-salaire-net-du-brut-une-mesure-possible-ou-pas_8171264.html",
        niveauConfiance: "confirme",
        noteConfiance: "Mécanisme et chiffrage (250 € nets, coût de 40 milliards d'euros, cotisations vieillesse) précisés par le candidat et rapportés par France Télévisions/franceinfo : la mesure passe du statut d'annonce à celui de proposition chiffrée et documentée.",
        impactParClasse: {
          populaires: { score: 0, avantages: ["Gain de pouvoir d'achat direct de l'ordre de 250 € nets par mois pour un salaire médian"], risques: ["Le financement repose sur des économies sur les dépenses sociales, dont cette catégorie est statistiquement plus dépendante"], angleMort: "La répartition précise des 40 milliards d'économies entre postes de dépense sociale n'est pas publiée." },
          moyennes: { score: 1, avantages: ["Gain net chiffré pour les salaires proches de la médiane"], risques: [], angleMort: "Effet pour les salaires nettement au-dessus ou en-dessous de la médiane non chiffré spécifiquement." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "Le mécanisme cible le salaire médian ; son effet sur les hauts salaires n'est pas précisé publiquement." },
          retraites: { score: -1, avantages: [], risques: ["Le levier identifié par le candidat porte explicitement sur les cotisations vieillesse, ce qui interroge sur le financement futur des pensions"], angleMort: "Aucun chiffrage indépendant public de l'effet de la mesure sur l'équilibre financier du système de retraite par répartition." },
        },
      },
      {
        id: "ga-monoparentales",
        theme: "Pouvoir d'achat et économie",
        titre: "Défiscaliser les pensions alimentaires perçues par les familles monoparentales",
        resumeOfficiel:
          "Gabriel Attal promet, s'il est élu, de rendre non imposables les pensions alimentaires perçues par le parent qui les reçoit (majoritairement des mères), une mesure qu'il chiffre lui-même à environ un milliard d'euros, accompagnée d'un « droit au répit » (garde d'enfants en soirée, week-end ou urgence) et d'une carte famille monoparentale ouvrant des réductions.",
        sourceOfficielle: "https://lcp.fr/actualites/presidentielle-2027-comment-gabriel-attal-veut-soutenir-les-familles-monoparentales-s-il",
        niveauConfiance: "confirme",
        noteConfiance: "Rapporté par LCP (chaîne de l'Assemblée nationale) ; coût chiffré à environ un milliard d'euros par le candidat lui-même.",
        impactParClasse: {
          populaires: { score: 1, avantages: ["La défiscalisation profite proportionnellement plus aux familles monoparentales à revenus modestes, où le poids relatif de l'impôt sur la pension alimentaire est plus élevé"], risques: [], angleMort: "Le financement du milliard d'euros annoncé n'est pas détaillé publiquement." },
          moyennes: { score: 1, avantages: ["Gain net d'impôt pour les familles monoparentales de cette catégorie également concernées"], risques: [], angleMort: "Aucun plafond n'est mentionné publiquement par le candidat, à la différence d'un amendement parlementaire distinct sur le même sujet qui en prévoyait un." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "Mesure moins pertinente pour cette catégorie, où le poids de la pension alimentaire dans le revenu total est structurellement plus faible." },
          retraites: { score: 0, avantages: [], risques: [], angleMort: "Mesure sans lien direct avec cette catégorie." },
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
      {
        id: "ga-retraites",
        theme: "Retraites et modèle social",
        titre: "Supprimer l'âge légal de départ à la retraite au profit d'une seule durée de cotisation, et créer un capital de naissance de 1 000 €",
        resumeOfficiel:
          "Gabriel Attal propose de supprimer l'âge légal de départ à la retraite, en ne conservant qu'une durée de cotisation assortie de « vraies décotes et de vraies surcotes », dans un système par points qui intégrerait une part de capitalisation. Il propose par ailleurs qu'un capital de 1 000 euros soit versé par l'État à la naissance de chaque enfant sur un compte de capitalisation, une idée qu'il présente lui-même comme volontairement soumise au débat avant l'élection de 2027.",
        sourceOfficielle: "https://lcp.fr/actualites/presidentielle-2027-qui-propose-quoi-sur-les-retraites-437864",
        niveauConfiance: "annonce",
        noteConfiance: "Position développée par le candidat dans plusieurs interventions et reprise dans le comparatif dédié de LCP sur les retraites pour la présidentielle 2027 ; le barème précis des décotes/surcotes, le calendrier de la réforme et le chiffrage global n'ont pas été publiés, et le candidat présente lui-même le capital de naissance comme une piste ouverte au débat plutôt qu'une mesure arrêtée.",
        impactParClasse: {
          populaires: { score: -1, avantages: ["Les carrières complètes commencées tôt pourraient, comme dans le système actuel, partir sans attendre un âge légal dès lors que la durée de cotisation est atteinte"], risques: ["Un système fondé sur la seule durée de cotisation, avec décote en cas de carrière incomplète, pourrait pénaliser les parcours interrompus (temps partiel subi, chômage), plus fréquents dans cette catégorie"], angleMort: "Le barème précis des décotes et surcotes n'est pas publié, ce qui empêche de chiffrer l'effet net pour les carrières incomplètes ou interrompues." },
          moyennes: { score: 0, avantages: ["Le capital de naissance de 1 000 € bénéficierait, en l'état de la proposition, à l'ensemble des familles sans condition de ressources annoncée"], risques: [], angleMort: "Le programme ne précise pas si le capital de naissance serait soumis à une condition de ressources ni comment il s'articulerait avec les allocations familiales existantes." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "L'introduction d'une part de capitalisation dans le système de retraite pourrait favoriser les ménages ayant une capacité d'épargne plus importante, mais aucun barème ni volume de cette part de capitalisation n'est publié pour en chiffrer l'effet différencié." },
          retraites: { score: 0, avantages: [], risques: [], angleMort: "La réforme concerne les futures retraites et les nouveau-nés ; son éventuel effet sur les pensions déjà versées n'est pas précisé publiquement." },
        },
      },
      {
        id: "ga-justice-mineurs",
        theme: "Sécurité et justice",
        titre: "Durcir la justice des mineurs délinquants et créer un parquet national dédié à la pédocriminalité",
        resumeOfficiel:
          "Comme président du groupe Ensemble pour la République, Gabriel Attal a porté une proposition de loi pour « restaurer l'autorité de la justice » à l'égard des mineurs délinquants et de leurs parents (comparution immédiate, délit de soustraction d'un parent à ses obligations légales), adoptée par le Parlement mi-mai 2025 puis partiellement censurée par le Conseil constitutionnel le 19 juin 2025, qui a annulé six articles dont la levée de l'« excuse de minorité » pour les récidivistes de plus de 16 ans ; une nouvelle proposition de loi reprenant cet objectif a été annoncée pour l'automne 2025. Dans sa campagne 2027, il propose en complément de créer un parquet national dédié à la pédocriminalité doté d'un service de renseignement spécialisé, un fichier des pédocriminels sur le modèle des fichés S, et l'extension des vérifications d'antécédents aux métiers au contact d'enfants.",
        sourceOfficielle: "https://www.lejdd.fr/politique/gabriel-attal-souhaite-aligner-le-traitement-des-pedocriminels-sur-celui-des-terroristes-176274",
        niveauConfiance: "confirme",
        noteConfiance: "Le volet mineurs délinquants s'appuie sur un texte effectivement voté par le Parlement puis partiellement censuré par le Conseil constitutionnel, largement documenté par LCP et franceinfo ; le volet pédocriminalité est une proposition de campagne rapportée par Le JDD, sans chiffrage public du coût du parquet national dédié.",
        impactParClasse: {
          populaires: { score: 0, avantages: ["Le texte sur les mineurs délinquants a été présenté comme une réponse aux émeutes urbaines de juin 2023, dans des quartiers où cette catégorie est proportionnellement plus présente"], risques: ["Le Conseil constitutionnel a jugé disproportionnée la levée de l'atténuation de peine pour les mineurs récidivistes ; des professionnels de la justice des mineurs critiquent un durcissement pénal sans renforcement proportionné des moyens éducatifs"], angleMort: "Le budget consacré aux mesures éducatives ou de prévention accompagnant ce durcissement pénal, ainsi que celui du futur parquet national dédié à la pédocriminalité, ne sont pas chiffrés publiquement." },
          moyennes: { score: 0, avantages: [], risques: [], angleMort: "Mesure de politique pénale sans effet économique différencié documenté pour cette catégorie." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "Mesure de politique pénale sans effet économique différencié documenté pour cette catégorie." },
          retraites: { score: 0, avantages: [], risques: [], angleMort: "Mesure sans lien direct avec cette catégorie." },
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
      {
        id: "ep-enseignants",
        theme: "Services publics",
        titre: "Augmenter de 20 % la rémunération moyenne des enseignants sur le quinquennat",
        resumeOfficiel:
          "Édouard Philippe propose d'augmenter de 20 % la rémunération moyenne des enseignants sur le quinquennat, pour la porter « au moins au niveau de la moyenne européenne », notamment en milieu de carrière, un financement présenté par le candidat comme rendu possible par la baisse démographique du nombre d'élèves (près d'un million d'élèves en moins).",
        sourceOfficielle: "https://www.franceinfo.fr/elections/presidentielle/presidentielle-2027-le-candidat-horizons-edouard-philippe-veut-augmenter-de-20-la-remuneration-moyenne-des-enseignants-sur-un-quinquennat_8159927.html",
        niveauConfiance: "confirme",
        noteConfiance: "Chiffrage (20 % sur un quinquennat) et financement (baisse démographique des effectifs scolaires) précisés par le candidat dans un entretien, rapportés par franceinfo et Le JDD.",
        impactParClasse: {
          populaires: { score: 0, avantages: ["Une revalorisation des enseignants peut, selon ses défenseurs, améliorer l'attractivité du métier et la qualité de l'encadrement dans les établissements les plus en difficulté, plus fréquentés par cette catégorie"], risques: [], angleMort: "Le candidat ne précise pas de ciblage spécifique vers les établissements défavorisés au sein de cette hausse générale." },
          moyennes: { score: 0, avantages: ["Hausse générale bénéficiant à l'ensemble des enseignants, catégorie professionnelle elle-même largement issue des classes moyennes"], risques: [], angleMort: "Calendrier précis de mise en œuvre sur le quinquennat non détaillé." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "Mesure centrée sur la rémunération des enseignants du public, sans effet direct documenté sur cette catégorie." },
          retraites: { score: 0, avantages: [], risques: ["Le financement reposant sur la baisse du nombre d'élèves plutôt que sur une ressource nouvelle, un doute subsiste sur sa soutenabilité si la mesure devait finalement peser sur la dépense publique globale, dont les pensions font partie"], angleMort: "Aucun chiffrage indépendant public du financement exact ne permet d'évaluer l'effet sur les autres postes de dépense publique." },
        },
      },
      {
        id: "ep-carence-arrets",
        theme: "Pouvoir d'achat et économie",
        titre: "Renforcer les jours de carence non indemnisés pour les arrêts de travail courts et instaurer un délai avant rupture conventionnelle après un arrêt",
        resumeOfficiel:
          "Lors des rencontres du Medef le 27 août 2026, Édouard Philippe a proposé de mettre fin à ce qu'il qualifie d'« open bar » des arrêts de travail : renforcer les jours de carence non indemnisés pour les arrêts courts (les un ou deux premiers jours ne seraient plus indemnisés) et instaurer un délai de trois à six mois entre un arrêt maladie et une rupture conventionnelle, pour lutter contre un phénomène de « chantage » à l'arrêt de travail. Il justifie la mesure par une hausse de près de 40 % du coût des arrêts de travail entre 2019 et 2025, évalué à environ 17 milliards d'euros par an.",
        sourceOfficielle: "https://www.lejdd.fr/economie/presidentielle-edouard-philippe-compte-reduire-lindemnisation-du-chomage-et-mettre-fin-a-lopen-bar-des-arrets-de-travail-181923",
        niveauConfiance: "confirme",
        noteConfiance: "Proposition et chiffrage (hausse de 40 % entre 2019 et 2025, coût de 17 milliards d'euros par an) précisés par le candidat le 27 août 2026 et rapportés par Le JDD et franceinfo ; le syndicat de médecins généralistes MG France et d'autres professionnels de santé contestent le diagnostic d'« open bar ».",
        impactParClasse: {
          populaires: { score: -1, avantages: [], risques: ["Les salariés aux contrats les plus précaires ou aux métiers pénibles, plus représentés dans cette catégorie, sont statistiquement plus concernés par les arrêts de travail courts et par le risque de rupture conventionnelle après un arrêt", "Des professionnels de santé, dont le syndicat MG France, contestent le diagnostic d'« open bar » et dénoncent un risque de stigmatisation des patients"], angleMort: "Le programme ne détaille pas de dispositif de compensation pour les salariés qui ne pourraient pas absorber la perte de revenu liée aux jours de carence non indemnisés." },
          moyennes: { score: -1, avantages: [], risques: ["Perte de revenu pour les arrêts courts non couverts par une complémentaire prenant en charge la carence"], angleMort: "L'effet dépend de la couverture par la complémentaire santé ou prévoyance de l'employeur, non détaillée publiquement dans le programme." },
          aisees: { score: 0, avantages: [], risques: ["Effet plus limité pour les cadres bénéficiant plus souvent d'un maintien de salaire par l'employeur pendant la carence, selon les conventions collectives applicables"], angleMort: "Aucune donnée publique ne permet de chiffrer l'effet différencié selon les conventions collectives applicables à cette catégorie." },
          retraites: { score: 0, avantages: [], risques: [], angleMort: "Mesure centrée sur les arrêts de travail des actifs, sans effet direct documenté pour cette catégorie." },
        },
      },
      {
        id: "ep-verrou-schengen",
        theme: "Immigration et intégration",
        titre: "Créer un « verrou Schengen » contre les régularisations massives unilatérales et suspendre l'enregistrement des demandes d'asile à Mayotte et en Guyane",
        resumeOfficiel:
          "Après l'afflux de migrants à Ceuta lié au plan espagnol de régularisation de sans-papiers, Édouard Philippe a proposé de soumettre tout projet de régularisation massive à l'accord des autres États membres de l'espace Schengen — un « verrou Schengen » empêchant qu'un seul État agisse unilatéralement — ainsi que la création d'un régime de sanctions européen spécifiquement dédié à la lutte contre l'immigration irrégulière, et la suspension pendant plusieurs années de l'enregistrement des demandes d'asile à Mayotte et en Guyane, territoires qu'il juge en situation de « saturation migratoire ».",
        sourceOfficielle: "https://www.franceinfo.fr/societe/immigration/apres-l-afflux-de-migrants-a-ceuta-edouard-philippe-propose-des-mesures-pour-limiter-l-immigration-et-les-regularisations-de-sans-papiers-dans-l-union-europeenne_8141837.html",
        niveauConfiance: "annonce",
        noteConfiance: "Propositions présentées publiquement le 10 août 2026 en réaction à la crise migratoire de Ceuta et rapportées par franceinfo ; le mécanisme juridique précis du « verrou Schengen » et du régime de sanctions européen, ainsi que la durée exacte de la suspension à Mayotte et en Guyane, ne sont pas chiffrés publiquement à ce stade.",
        impactParClasse: {
          populaires: { score: 0, avantages: ["Une limitation des régularisations massives ailleurs en Europe pourrait, selon ses défenseurs, réduire une pression migratoire perçue sur l'emploi peu qualifié et le logement social"], risques: ["À Mayotte, où la pauvreté est déjà très marquée, la suspension de l'enregistrement des demandes d'asile laisserait des personnes en situation irrégulière sans statut ni accès aux droits associés à une demande en cours, une situation dénoncée par des associations de défense des migrants"], angleMort: "Aucune étude chiffrée publique n'évalue le nombre de personnes concernées par la suspension à Mayotte et en Guyane, ni l'effet économique local de cette mesure sur ces territoires." },
          moyennes: { score: 0, avantages: [], risques: [], angleMort: "Mesure principalement centrée sur l'immigration et les territoires ultramarins concernés, sans effet économique documenté pour cette catégorie en métropole." },
          aisees: { score: 0, avantages: [], risques: [], angleMort: "Aucun effet économique direct documenté pour cette catégorie." },
          retraites: { score: 0, avantages: [], risques: [], angleMort: "Mesure sans lien direct avec cette catégorie." },
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
      {
        id: "br-retraites",
        theme: "Retraites et modèle social",
        titre: "Lier l'âge légal de départ à la retraite à l'espérance de vie, en assumant son report",
        resumeOfficiel:
          "Bruno Retailleau assume vouloir repousser l'âge légal de départ à la retraite, en proposant de le lier par une formule à l'évolution de l'espérance de vie, une position déjà défendue par Valérie Pécresse en 2022.",
        sourceOfficielle: "https://www.franceinfo.fr/elections/presidentielle/retraites-contrairement-a-beaucoup-d-autres-j-assumerai-le-fait-de-repousser-l-age-legal-lance-bruno-retailleau-candidat-lr-a-l-election-presidentielle_8166161.html",
        niveauConfiance: "confirme",
        noteConfiance: "Position affirmée publiquement et rapportée par franceinfo, comparée par LCP aux propositions des autres candidats sur le sujet ; la formule précise d'indexation sur l'espérance de vie n'est pas encore chiffrée publiquement.",
        impactParClasse: {
          populaires: {
            score: -2,
            avantages: [],
            risques: ["Un report supplémentaire de l'âge légal pèse proportionnellement plus sur les carrières commencées tôt et les métiers pénibles, plus représentés dans cette catégorie"],
            angleMort: "La formule exacte d'indexation sur l'espérance de vie et son calendrier d'application ne sont pas chiffrés publiquement.",
          },
          moyennes: {
            score: -1,
            avantages: [],
            risques: ["Report de l'âge de départ pour les carrières standards"],
            angleMort: "Effet différencié selon les métiers et la pénibilité non détaillé publiquement.",
          },
          aisees: {
            score: 0,
            avantages: [],
            risques: ["Effet plus limité pour les carrières longues d'études supérieures, qui partent déjà statistiquement plus tard"],
            angleMort: "Aucune donnée publique ne permet de chiffrer précisément l'effet différencié pour cette catégorie.",
          },
          retraites: {
            score: 0,
            avantages: ["Objectif affiché de pérennité financière du système de retraite par répartition, dont dépendent les pensions déjà versées"],
            risques: [],
            angleMort: "Mesure concernant les futurs retraités plus que les pensions actuellement versées ; son effet sur l'équilibre financier global du système n'est pas chiffré publiquement.",
          },
        },
      },
      {
        id: "br-revenu-familial",
        theme: "Pouvoir d'achat et économie",
        titre: "Créer un « revenu familial » unique et prolonger le congé de naissance à six mois",
        resumeOfficiel:
          "Bruno Retailleau propose de créer un « revenu familial » unique, chiffré à 40,3 milliards d'euros et financé par la suppression de dispositifs existants (dont les allocations familiales, pour 41 milliards d'euros d'économies), ainsi que de prolonger le congé de naissance à six mois à 70 % du salaire (coût supplémentaire estimé à environ 700 millions d'euros), pour lutter contre l'« hiver démographique ».",
        sourceOfficielle: "https://www.franceinfo.fr/elections/presidentielle/presidentielle-2027-creation-d-un-revenu-familial-prolongation-du-conge-naissance-bruno-retailleau-promet-de-sortir-la-france-de-l-hiver-demographique_7973942.html",
        niveauConfiance: "confirme",
        noteConfiance: "Chiffrage précis (40,3 milliards, 41 milliards d'économies, 700 millions pour le congé de naissance) rapporté par franceinfo et Le JDD.",
        impactParClasse: {
          populaires: {
            score: 0,
            avantages: ["Un revenu familial unique pourrait simplifier l'accès aux aides pour les familles nombreuses ou modestes"],
            risques: ["Le financement par suppression d'aides existantes (allocations familiales) fait craindre une perte pour certains foyers selon la nouvelle formule de calcul, non détaillée publiquement"],
            angleMort: "Le barème précis du nouveau revenu familial par rapport aux allocations familiales actuelles n'est pas public, ce qui empêche de savoir qui gagne et qui perd au change.",
          },
          moyennes: {
            score: 0,
            avantages: ["Prolongation du congé de naissance à 70 % du salaire pendant six mois, contre deux mois actuellement"],
            risques: ["Incertitude sur l'effet net du remplacement des allocations familiales actuelles par le nouveau dispositif pour cette catégorie"],
            angleMort: "Effet d'un éventuel plafonnement du nouveau revenu familial selon le niveau de revenu non précisé.",
          },
          aisees: {
            score: 0,
            avantages: [],
            risques: ["Les allocations familiales actuelles n'étant pas soumises à condition de ressources, une refonte pourrait introduire une dégressivité qui désavantagerait cette catégorie, sans confirmation publique"],
            angleMort: "Absence de barème public empêchant de vérifier si le nouveau dispositif serait ou non soumis à condition de ressources.",
          },
          retraites: {
            score: 0,
            avantages: [],
            risques: [],
            angleMort: "Mesure centrée sur les familles avec enfants, sans effet direct identifié pour cette catégorie.",
          },
        },
      },
      {
        id: "br-censure-referendum",
        theme: "Institutions et démocratie",
        titre: "Permettre par référendum ou vote du Congrès de faire appliquer une loi malgré une censure du Conseil constitutionnel",
        resumeOfficiel:
          "Bruno Retailleau propose une réforme constitutionnelle donnant au peuple, par référendum, ou aux parlementaires réunis en Congrès, la possibilité de faire appliquer une loi votée par le Parlement malgré sa censure par le Conseil constitutionnel — ce qu'il appelle « censurer la censure ». La proposition s'inscrit dans le prolongement des critiques du candidat après plusieurs censures de dispositions de textes sur l'immigration, dont la loi allongeant la rétention administrative des étrangers jugés dangereux.",
        sourceOfficielle: "https://www.lejdd.fr/politique/immigration-securite-justice-le-plan-de-bruno-retailleau-pour-reformer-la-constitution-182508",
        niveauConfiance: "confirme",
        noteConfiance: "Plan détaillé publiquement début septembre 2026 et rapporté par Le JDD ; a suscité une réaction publique de la présidente de l'Assemblée nationale Yaël Braun-Pivet, confirmant la réalité et la portée de la proposition.",
        impactParClasse: {
          populaires: {
            score: 0,
            avantages: ["Objectif affiché de renforcer le pouvoir des citoyens face aux décisions du Conseil constitutionnel ; un sondage Odoxa cité par Le JDD indique que 80 % des Français soutiendraient le principe d'être consultés après la censure d'une loi votée par le Parlement"],
            risques: ["Selon ses opposants, dont la présidente de l'Assemblée nationale, une remise en cause du contrôle de constitutionnalité fragiliserait la protection des libertés individuelles, qui bénéficie à l'ensemble de la population, y compris cette catégorie"],
            angleMort: "Une réforme constitutionnelle n'a pas d'effet économique différencié direct par catégorie ; son impact dépendrait des lois qui seraient appliquées malgré une censure, non connues à ce stade.",
          },
          moyennes: {
            score: 0,
            avantages: [],
            risques: [],
            angleMort: "Même angle mort que pour les autres catégories : l'effet dépend de lois futures non déterminées par cette seule mesure institutionnelle.",
          },
          aisees: {
            score: 0,
            avantages: [],
            risques: [],
            angleMort: "Aucun effet économique direct identifiable à ce stade.",
          },
          retraites: {
            score: 0,
            avantages: [],
            risques: [],
            angleMort: "Aucun effet économique direct identifiable à ce stade.",
          },
        },
      },
      {
        id: "br-espagne-schengen",
        theme: "Europe et géopolitique",
        titre: "Suspendre la libre circulation de Schengen avec l'Espagne en réaction à sa régularisation massive de sans-papiers",
        resumeOfficiel:
          "Face au plan espagnol de régularisation de près de 500 000 personnes sans papiers lancé en avril 2026, Bruno Retailleau a proposé de « mettre au ban » l'Espagne des nations européennes et de suspendre la libre circulation des personnes prévue par les accords de Schengen entre la France et l'Espagne, jugeant les règles de Schengen « plus tenables » avec ce pays ; il a réclamé un Conseil européen extraordinaire sur le sujet et s'est rangé du côté de la présidente du Conseil italien Giorgia Meloni, elle aussi favorable à une suspension de Schengen avec l'Espagne. Il a réitéré ses critiques envers le gouvernement espagnol en juin 2026, l'accusant de « clientélisme ».",
        sourceOfficielle: "https://www.france24.com/fr/info-en-continu/20260420-immigration-retailleau-lr-veut-mettre-l-espagne-au-ban-des-nations-europ%C3%A9ennes",
        niveauConfiance: "confirme",
        noteConfiance: "Proposition formulée publiquement le 20 avril 2026 et rapportée par France 24, Le JDD et LCP, puis réitérée en juin 2026 selon France 24 ; elle ne précise pas de mécanisme juridique détaillé pour suspendre unilatéralement un accord multilatéral comme Schengen.",
        impactParClasse: {
          populaires: { score: 0, avantages: ["Selon ses défenseurs, limiter les arrivées de personnes régularisées en Espagne puis susceptibles de rejoindre la France réduirait une concurrence perçue sur l'emploi peu qualifié et le logement social, où cette catégorie est proportionnellement plus présente"], risques: ["Une suspension de Schengen avec l'Espagne compliquerait aussi la libre circulation des travailleurs frontaliers et saisonniers français dans ce pays, dont une partie appartient à cette catégorie"], angleMort: "Aucune étude chiffrée publique n'évalue le nombre de personnes régularisées en Espagne susceptibles de rejoindre effectivement la France, ni le coût économique d'une suspension de Schengen pour les échanges avec l'Espagne." },
          moyennes: { score: 0, avantages: [], risques: ["Une suspension de Schengen pourrait perturber le tourisme et les échanges commerciaux avec l'Espagne, secteurs où une partie de cette catégorie est employée"], angleMort: "L'effet économique chiffré d'une suspension de Schengen sur les échanges franco-espagnols n'est pas publié." },
          aisees: { score: 0, avantages: [], risques: ["Les entreprises ayant des activités transfrontalières avec l'Espagne pourraient être affectées par un rétablissement de contrôles aux frontières"], angleMort: "Aucun chiffrage public de l'effet d'une telle mesure sur les investissements ou échanges commerciaux franco-espagnols." },
          retraites: { score: 0, avantages: [], risques: ["Les retraités français résidant en Espagne ou y effectuant des séjours réguliers pourraient être affectés par un rétablissement de contrôles frontaliers"], angleMort: "Aucune donnée publique ne chiffre le nombre de retraités français concernés par une suspension de la libre circulation avec l'Espagne." },
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
      {
        id: "mlp-retraites",
        theme: "Retraites et modèle social",
        titre: "Maintenir un départ à la retraite dès 60 ans pour les carrières commencées tôt et ramener la durée de cotisation à 42 annuités",
        resumeOfficiel:
          "Marine Le Pen maintient la position du Rassemblement national portée depuis 2022 : un départ possible dès 60 ans pour les personnes ayant commencé à travailler avant 20 ans (départ dégressif entre 60 ans et 9 mois et 62 ans pour celles ayant débuté entre 20 et 24,5 ans, système inchangé au-delà), et une durée de cotisation ramenée à 42 annuités. Elle a réaffirmé cette position publiquement à l'été 2026, alors que Jordan Bardella, qui pourrait porter la candidature du RN en cas d'inéligibilité confirmée de Marine Le Pen, indiquait de son côté vouloir « examiner la question » d'un report de l'âge légal et présenter un « nouveau système », révélant des divergences internes au RN sur ce sujet.",
        sourceOfficielle: "https://lcp.fr/actualites/presidentielle-2027-qui-propose-quoi-sur-les-retraites-437864",
        niveauConfiance: "confirme",
        noteConfiance: "Position historique du RN documentée depuis 2022 et réaffirmée publiquement par Marine Le Pen à l'été 2026 malgré les divergences émergentes avec Jordan Bardella sur ce sujet, rapportées par LCP et franceinfo.",
        impactParClasse: {
          populaires: { score: 1, avantages: ["Bénéficie en priorité aux carrières commencées tôt (avant 20 ans), plus représentées dans cette catégorie, via un départ possible dès 60 ans"], risques: ["Le financement du dispositif de départ anticipé et de la baisse à 42 annuités n'est pas chiffré publiquement"], angleMort: "Aucun chiffrage indépendant public du coût de la mesure ni de son financement." },
          moyennes: { score: 0, avantages: ["Départ anticipé par rapport à l'âge légal actuellement en vigueur pour les carrières standards ayant débuté entre 20 et 24,5 ans"], risques: [], angleMort: "Effet différencié selon l'âge d'entrée dans la vie active au sein de cette catégorie non détaillé publiquement." },
          aisees: { score: 0, avantages: [], risques: ["Cette catégorie, aux carrières généralement plus longues du fait d'études supérieures, bénéficie moins du dispositif de départ anticipé pour carrière commencée tôt"], angleMort: "Aucune donnée publique ne permet de chiffrer l'effet différencié pour cette catégorie." },
          retraites: { score: 1, avantages: ["Objectif affiché d'un âge de départ plus favorable que la trajectoire actuelle pour les futurs retraités concernés par la transition"], risques: ["Pérennité financière du système de retraite par répartition non démontrée par un chiffrage indépendant public"], angleMort: "Le Conseil d'orientation des retraites n'a pas publié d'évaluation officielle de cette version 2027 de la proposition du RN." },
        },
      },
    ],
  },

  // ============================================================
  // MARINE TONDELIER — Les Écologistes
  // ============================================================
  {
    id: "tondelier",
    nom: "Marine Tondelier",
    parti: "Les Écologistes",
    mesures: [
      {
        id: "mt-smic",
        theme: "Pouvoir d'achat et économie",
        titre: "Porter le Smic à 2 000 euros bruts",
        resumeOfficiel:
          "Lors du premier débat de la présidentielle organisé par le Medef (27 août 2026), Marine Tondelier a défendu de porter le Smic à 2 000 euros bruts, ainsi qu'un plan d'aide aux PME et petites entreprises, en affirmant que « le revenu des Français, c'est leur pouvoir d'achat » plutôt qu'un simple coût pour les entreprises.",
        sourceOfficielle: "https://www.france24.com/fr/france/20260827-premier-d%C3%A9bat-de-la-pr%C3%A9sidentielle-2027-les-principales-propositions-des-candidats",
        niveauConfiance: "confirme",
        noteConfiance: "Proposition chiffrée, formulée publiquement lors du débat Medef du 27 août 2026 et rapportée par France 24 et franceinfo.",
        impactParClasse: {
          populaires: {
            score: 2,
            avantages: ["Hausse directe du salaire minimum, bénéficiant en priorité aux salariés les moins rémunérés, très représentés dans cette catégorie"],
            risques: ["Un Smic à 2 000 € bruts représente une hausse importante par rapport au Smic actuel (1 823 € bruts début 2026) ; un plan d'aide aux PME est annoncé en contrepartie mais son financement précis n'est pas chiffré publiquement"],
            angleMort: "Aucun chiffrage indépendant public de l'effet net sur l'emploi peu qualifié dans les petites entreprises.",
          },
          moyennes: {
            score: 0,
            avantages: ["Effet d'entraînement possible sur les grilles salariales proches du Smic"],
            risques: [],
            angleMort: "Effet sur les salariés situés juste au-dessus du nouveau Smic (tassement des grilles) non chiffré publiquement.",
          },
          aisees: {
            score: -1,
            avantages: [],
            risques: ["Pour les employeurs et actionnaires de PME, une hausse du coût du travail au niveau du Smic sans compensation intégrale pourrait peser sur les marges"],
            angleMort: "Le contenu exact du « plan d'aide » aux PME censé compenser le surcoût n'est pas détaillé publiquement.",
          },
          retraites: {
            score: 1,
            avantages: ["Effet indirect positif pour les retraités les plus modestes si la hausse du Smic sert de référence à une revalorisation d'autres minima sociaux"],
            risques: [],
            angleMort: "Aucun lien mécanique automatique entre Smic et minimum vieillesse n'est établi publiquement dans cette proposition.",
          },
        },
      },
      {
        id: "mt-enseignants",
        theme: "Services publics",
        titre: "Augmenter les salaires des enseignants de 15 % sur le quinquennat",
        resumeOfficiel:
          "Marine Tondelier propose une hausse des salaires des enseignants de 15 % sur le quinquennat, une mesure comparée par la presse à celles d'autres candidats sur ce sujet (Gabriel Attal, Édouard Philippe).",
        sourceOfficielle: "https://www.franceinfo.fr/elections/presidentielle/les-professeurs-courtises-par-les-candidats-a-la-presidentielle-2027-quelles-revalorisations-proposent-ils-avec-quels-financements_8161409.html",
        niveauConfiance: "annonce",
        noteConfiance: "Chiffre (15 % sur le quinquennat) rapporté par franceinfo dans un comparatif des propositions des candidats, mais sans détail public sur le financement propre à cette proposition, à la différence du chiffrage plus détaillé fourni par d'autres candidats sur le même sujet.",
        impactParClasse: {
          populaires: {
            score: 0,
            avantages: ["Une revalorisation générale peut, selon ses défenseurs, améliorer l'attractivité du métier dans les établissements les plus en difficulté"],
            risques: [],
            angleMort: "Absence de financement détaillé publiquement, à la différence d'autres candidats sur le même sujet.",
          },
          moyennes: {
            score: 0,
            avantages: ["Hausse bénéficiant à la profession enseignante, majoritairement issue de cette catégorie"],
            risques: [],
            angleMort: "Calendrier de mise en œuvre sur le quinquennat non précisé.",
          },
          aisees: {
            score: 0,
            avantages: [],
            risques: [],
            angleMort: "Mesure sans effet direct documenté pour cette catégorie.",
          },
          retraites: {
            score: 0,
            avantages: [],
            risques: [],
            angleMort: "Mesure sans effet direct documenté pour cette catégorie.",
          },
        },
      },
      {
        id: "mt-sante-environnementale",
        theme: "Écologie et énergie",
        titre: "Sortir des pesticides de synthèse d'ici 2050 et interdire les aliments ultratransformés dans les cantines",
        resumeOfficiel:
          "Marine Tondelier propose un « pacte agricole » planifiant la sortie progressive des pesticides de synthèse et des engrais azotés d'ici 2050 avec un fonds de transition vers l'agroécologie, l'interdiction des aliments ultratransformés dans les cantines scolaires, la restriction de la publicité télévisée pour les produits trop sucrés ou salés avant 21h, et l'interdiction des perturbateurs endocriniens et substances cancérogènes, mutagènes ou toxiques pour la reproduction (dont les PFAS) dans les produits du quotidien.",
        sourceOfficielle: "https://www.france24.com/fr/info-en-continu/20260530-pr%C3%A9sidentielle-tondelier-d%C3%A9voile-ses-mesures-pour-la-sant%C3%A9-environnementale",
        niveauConfiance: "confirme",
        noteConfiance: "Mesures détaillées publiquement le 30 mai 2026 et rapportées par France 24, avec échéances et dispositifs précis (2050, fonds de transition, restriction horaire de publicité).",
        impactParClasse: {
          populaires: {
            score: 1,
            avantages: ["L'interdiction des aliments ultratransformés dans les cantines scolaires bénéficie en priorité aux enfants scolarisés dans le public, où cette catégorie est proportionnellement plus représentée"],
            risques: ["La sortie des pesticides de synthèse, si elle renchérit les coûts de production agricole, pourrait se répercuter sur les prix alimentaires, qui pèsent proportionnellement plus sur le budget de cette catégorie"],
            angleMort: "Le fonds de transition agroécologique annoncé n'est pas chiffré publiquement, ce qui empêche d'évaluer s'il suffit à limiter une hausse des prix alimentaires.",
          },
          moyennes: {
            score: 0,
            avantages: ["Réduction de l'exposition aux perturbateurs endocriniens et aux PFAS dans les produits du quotidien"],
            risques: [],
            angleMort: "Effet sur le prix des produits de consommation courante (hygiène, textile) non chiffré publiquement.",
          },
          aisees: {
            score: 0,
            avantages: [],
            risques: ["Les agriculteurs et propriétaires fonciers de cette catégorie pourraient supporter une part du coût de la transition agroécologique en l'absence de compensation intégrale"],
            angleMort: "Répartition précise du financement du fonds de transition entre État, filières et exploitants non détaillée publiquement.",
          },
          retraites: {
            score: 0,
            avantages: ["Réduction de l'exposition aux substances cancérogènes et perturbateurs endocriniens, un enjeu de santé publique à long terme"],
            risques: [],
            angleMort: "Effet spécifique pour cette catégorie non chiffré publiquement, la mesure visant l'ensemble de la population.",
          },
        },
      },
      {
        id: "mt-vie-republique",
        theme: "Institutions et démocratie",
        titre: "Instaurer une « Première République écologique et citoyenne »",
        resumeOfficiel:
          "Les Écologistes, portés par Marine Tondelier, proposent d'instaurer une « Première République écologique et citoyenne » mettant fin au « présidentialisme », consacrant l'indépendance de la justice dans la Constitution, et y inscrivant une règle de ne « pas prendre à la nature plus qu'elle ne peut se régénérer, ni produire plus qu'elle ne peut supporter en un an ».",
        sourceOfficielle: "https://www.france24.com/fr/info-en-continu/20260713-2027-les-ecologistes-veulent-instaurer-la-premi%C3%A8re-r%C3%A9publique-%C3%A9cologique-et-citoyenne",
        niveauConfiance: "annonce",
        noteConfiance: "Projet institutionnel présenté publiquement le 13 juillet 2026 et rapporté par France 24 ; les modalités précises de la réforme constitutionnelle (procédure, calendrier) ne sont pas chiffrées ni détaillées à ce stade.",
        impactParClasse: {
          populaires: {
            score: 0,
            avantages: ["Objectif affiché de renforcement de l'État de droit et de la participation citoyenne, potentiellement plus protecteur pour les catégories les moins bien représentées dans les instances actuelles"],
            risques: [],
            angleMort: "Une réforme constitutionnelle n'a pas d'effet économique différencié direct par catégorie ; son impact dépendrait des lois adoptées ensuite, non connues à ce stade.",
          },
          moyennes: {
            score: 0,
            avantages: [],
            risques: [],
            angleMort: "Même angle mort que pour les autres catégories : effet dépendant de textes futurs non déterminés par cette seule mesure.",
          },
          aisees: {
            score: 0,
            avantages: [],
            risques: [],
            angleMort: "Aucun effet économique direct identifiable à ce stade.",
          },
          retraites: {
            score: 0,
            avantages: [],
            risques: [],
            angleMort: "Aucun effet économique direct identifiable à ce stade.",
          },
        },
      },
    ],
  },
];

if (typeof window !== "undefined") {
  window.AGORA_DATA = { CLASSES_SOCIALES, THEMES, CANDIDATS, AVIS_DONNEES_REELLES };
}

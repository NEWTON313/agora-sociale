/**
 * L'AGORA SOCIALE — Jeu de données RÉEL (présidentielle 2027)
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

const THEMES = ["Pouvoir d'achat", "Fiscalité", "Travail & emploi", "Services publics"];

// Note de transparence affichée en haut du comparateur — voir index.html
const AVIS_DONNEES_REELLES = {
  dateMaj: "2026-08-28",
  texte:
    "Liste partielle et provisoire : aucune candidature n'est encore officiellement validée par le Conseil constitutionnel (parrainages attendus au plus tard le 12/03/2027). La primaire du Parti socialiste (11-18/10/2026) n'a pas eu lieu ; les écologistes n'ont pas encore de candidat déclaré. La candidature de Marine Le Pen dépend d'un pourvoi en cassation en cours. Chaque mesure indique sa source et son niveau de confiance.",
};

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
        theme: "Pouvoir d'achat",
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
        theme: "Fiscalité",
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
        theme: "Pouvoir d'achat",
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
        theme: "Travail & emploi",
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
        theme: "Fiscalité",
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
        theme: "Travail & emploi",
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
        theme: "Pouvoir d'achat",
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
        theme: "Fiscalité",
        titre: "Suppression de l'IFI et création d'un impôt sur la fortune financière (IFF)",
        resumeOfficiel:
          "Le Rassemblement national propose de remplacer l'impôt sur la fortune immobilière par un impôt ciblant les actifs financiers, présenté par le parti comme visant la « spéculation » plutôt que la détention d'un bien immobilier.",
        sourceOfficielle: "https://votons-2027.fr/candidats/le-pen/programme",
        niveauConfiance: "confirme",
        noteConfiance: "Proposition distinctive et récurrente du RN documentée sur plusieurs campagnes (dont 2022) ; barème précis de l'IFF non retrouvé dans une source de premier rang pour 2027.",
        impactParClasse: {
          populaires: { score: 0, avantages: [], risques: [], angleMort: "Mesure sans effet direct, cette catégorie n'étant concernée ni par l'IFI ni par l'IFF envisagé." },
          moyennes: { score: 0, avantages: ["Non concernées par les seuils habituels de ce type d'impôt"], risques: [], angleMort: "Seuil exact de l'IFF non publié, ce qui empêche de vérifier l'absence totale d'effet pour le haut de cette catégorie." },
          aisees: { score: 0, avantages: ["Allègement pour les détenteurs de patrimoine immobilier important (suppression de l'IFI)"], risques: ["Une partie de cette catégorie, si elle détient un patrimoine financier important, pourrait être visée par le nouvel IFF sans que le barème soit public"], angleMort: "Le rendement budgétaire comparé de l'IFI supprimé et de l'IFF créé n'est pas chiffré publiquement, rendant l'effet net incertain même pour cette catégorie." },
          retraites: { score: 0, avantages: [], risques: [], angleMort: "Effet marginal, sauf pour une minorité de retraités à patrimoine financier important, non quantifié." },
        },
      },
    ],
  },
];

if (typeof window !== "undefined") {
  window.AGORA_DATA = { CLASSES_SOCIALES, THEMES, CANDIDATS, AVIS_DONNEES_REELLES };
}

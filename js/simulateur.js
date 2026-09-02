/**
 * MON CHOIX 2027 — Simulateur de classement socio-économique
 * ---------------------------------------------------------------
 * MÉTHODE : reproduit la notion INSEE de "niveau de vie" = revenu
 * disponible du ménage / nombre d'unités de consommation (UC).
 * Échelle d'unités de consommation (OCDE modifiée, utilisée par l'INSEE) :
 *   - 1re personne adulte du ménage......... 1 UC
 *   - autre personne de 14 ans ou plus...... 0,5 UC
 *   - enfant de moins de 14 ans............. 0,3 UC
 *
 * SOURCE DES SEUILS : Insee, "Distribution des niveaux de vie",
 * données 2024 (euros 2024 constants), publiées le 09/07/2026.
 * https://www.insee.fr/fr/statistiques/2416808
 * ⚠️ Cette table doit être mise à jour chaque année lors de la
 * publication INSEE (généralement en juillet) — voir méthodologie.html.
 * ---------------------------------------------------------------
 */

// Seuils annuels de niveau de vie par unité de consommation (année 2024, source ci-dessus).
const SEUILS_NIVEAU_DE_VIE = {
  annee_source: 2024,
  date_maj: "2026-07-09",
  points: [
    { percentile: 0, valeur: 0 },
    { percentile: 10, valeur: 13970 },  // D1
    { percentile: 20, valeur: 17700 },  // D2
    { percentile: 30, valeur: 20980 },  // D3
    { percentile: 40, valeur: 23880 },  // D4
    { percentile: 50, valeur: 26740 },  // D5 - médiane
    { percentile: 60, valeur: 29880 },  // D6
    { percentile: 70, valeur: 33680 },  // D7
    { percentile: 80, valeur: 38780 },  // D8
    { percentile: 90, valeur: 48580 },  // D9
    { percentile: 95, valeur: 61220 },  // C95
    { percentile: 100, valeur: 61220 * 1.8 }, // extrapolation grossière au-delà de C95, à seule fin d'affichage du curseur
  ],
};

// Seuils de classification en 4 catégories, exprimés en niveau de vie annuel/UC.
// Bornes choisies sur les déciles ci-dessus : voir methodologie.html pour la justification.
const SEUILS_CLASSIFICATION = {
  populaires_max: 20980,   // < D3
  moyennes_max: 38780,     // D3 à D8
  // >= moyennes_max => classes aisées
  patrimoine_bump_aisees: 500000, // patrimoine net à partir duquel on reclasse en "aisées" même si le revenu seul pointait vers "moyennes"
};

const STATUTS_RETRAITES_INACTIFS = ["retraite", "chomage", "etudiant", "autre_inactif"];

/**
 * ---------------------------------------------------------------
 * BARÈME RETRAITE — âge légal et durée de cotisation par génération
 * Source principale : Service-public.fr / Direction de l'information
 * légale et administrative (Premier ministre), publication du
 * 27/02/2026, « Suspension de la réforme des retraites : qui est
 * concerné ? », qui applique la loi n° 2025-1403 du 30/12/2025
 * (LFSS 2026, art. 105) au calendrier de la loi n° 2023-270 du
 * 14/04/2023.
 * ⚠️ Simplifié pour la catégorie générale (sédentaire, régime
 * général) : ne couvre ni les catégories actives de la fonction
 * publique, ni les carrières longues, ni les régimes spéciaux.
 * ⚠️ Les générations 1969 et suivantes restent soumises au
 * calendrier provisoire de la réforme 2023 (64 ans / 172 trimestres)
 * UNIQUEMENT si aucune loi ne vient les fixer différemment d'ici le
 * 1er janvier 2028 — décision qui reviendra à l'élection de 2027.
 * À réviser à chaque loi de financement de la Sécurité sociale.
 * ---------------------------------------------------------------
 */
const BAREME_RETRAITE = [
  { anneeMax: 1960, ageLegal: "62 ans", trimestres: 168, statut: "definitif" },
  { annee: 1961, ageLegal: "62 ans et 3 mois", trimestres: 169, statut: "definitif", note: "62 ans pour les personnes nées avant le 1er septembre 1961" },
  { annee: 1962, ageLegal: "62 ans et 6 mois", trimestres: 169, statut: "definitif" },
  { annee: 1963, ageLegal: "62 ans et 9 mois", trimestres: 170, statut: "definitif" },
  { annee: 1964, ageLegal: "62 ans et 9 mois", trimestres: 170, statut: "gele", note: "Gelé par la suspension LFSS 2026 : la réforme 2023 prévoyait 63 ans et 171 trimestres." },
  {
    annee: 1965, statut: "gele", quarterDependant: true,
    q1: { ageLegal: "62 ans et 9 mois", trimestres: 170 },
    q2_4: { ageLegal: "63 ans", trimestres: 171 },
    note: "Gelé par la suspension LFSS 2026 : la réforme 2023 prévoyait 63 ans et 3 mois et 172 trimestres pour toute la génération 1965.",
  },
  { annee: 1966, ageLegal: "63 ans et 3 mois", trimestres: 172, statut: "gele", note: "Gelé par la suspension LFSS 2026 : la réforme 2023 prévoyait 63 ans et 6 mois." },
  { annee: 1967, ageLegal: "63 ans et 6 mois", trimestres: 172, statut: "gele", note: "Gelé par la suspension LFSS 2026 : la réforme 2023 prévoyait 63 ans et 9 mois." },
  { annee: 1968, ageLegal: "63 ans et 9 mois", trimestres: 172, statut: "gele", note: "Gelé par la suspension LFSS 2026 : la réforme 2023 prévoyait 64 ans." },
  { anneeMin: 1969, ageLegal: "64 ans", trimestres: 172, statut: "incertain", note: "Calendrier provisoire de la réforme 2023 : la suspension s'arrête le 1er janvier 2028, sauf nouvelle loi. C'est directement un enjeu de l'élection de 2027." },
];

function trouverBaremeRetraite(anneeNaissance, trimestreNaissance) {
  if (!anneeNaissance) return null;
  if (anneeNaissance <= 1960) return BAREME_RETRAITE[0];
  const entree = BAREME_RETRAITE.find((e) => e.annee === anneeNaissance);
  if (entree) {
    if (entree.quarterDependant) {
      const bloc = trimestreNaissance === "q1" ? entree.q1 : entree.q2_4;
      return { ageLegal: bloc.ageLegal, trimestres: bloc.trimestres, statut: entree.statut, note: entree.note };
    }
    return entree;
  }
  if (anneeNaissance >= 1969) return { ...BAREME_RETRAITE[BAREME_RETRAITE.length - 1] };
  return null;
}

/**
 * ---------------------------------------------------------------
 * REPÈRES JEUNESSE — Smic minoré et accès au RSA selon l'âge
 * Sources : Code du travail art. D. 3231-3 s. (Smic jeunes, barème
 * Urssaf/DGT au 1er juin 2026) ; Code de l'action sociale et des
 * familles art. L262-2 s. (RSA, montant Caf au 1er avril 2026).
 * Voir jeunesse-emploi-solidarite.html pour le détail et les
 * arguments du débat. Âge calculé de façon approximative (année
 * courante - année de naissance), suffisant pour une orientation,
 * pas pour un calcul de droits individuel.
 * ---------------------------------------------------------------
 */
function determinerReperesJeunesse(anneeNaissance, statutActivite) {
  if (!anneeNaissance) return [];
  const anneeCourante = new Date().getFullYear();
  const age = anneeCourante - anneeNaissance;
  const reperes = [];

  if (age >= 0 && age < 18 && statutActivite === "emploi_salarie") {
    const taux = age < 17 ? "80 %" : "90 %";
    const montant = age < 17 ? "9,85 €" : "11,08 €";
    reperes.push({
      titre: "Smic jeunes : un abattement possible tant que vous êtes mineur·e",
      texte: `À votre âge, un employeur peut légalement vous payer ${taux} du Smic (${montant} brut/heure) tant que vous n'avez pas 6 mois de pratique professionnelle dans la branche — mais rien ne l'y oblige : il peut aussi vous payer le Smic plein.`,
      lien: "jeunesse-emploi-solidarite.html",
    });
  }

  if (age >= 18 && age < 25 && (statutActivite === "chomage" || statutActivite === "autre_inactif")) {
    reperes.push({
      titre: "RSA : une condition d'âge qui vous concerne directement",
      texte: "Le RSA classique n'est accessible qu'à partir de 25 ans. Avant cet âge, il faut soit être parent isolé ou enceinte (sans condition d'activité), soit justifier d'au moins 3 214 heures travaillées sur les 3 dernières années (« RSA jeune actif »).",
      lien: "jeunesse-emploi-solidarite.html",
    });
  }

  return reperes;
}


function calculerUC(nbAdultes, nbEnfants14Plus, nbEnfantsMoins14) {
  const adultes = Math.max(1, nbAdultes || 1);
  return 1 + (adultes - 1) * 0.5 + (nbEnfants14Plus || 0) * 0.5 + (nbEnfantsMoins14 || 0) * 0.3;
}

function estimerPercentile(valeur) {
  const pts = SEUILS_NIVEAU_DE_VIE.points;
  if (valeur <= pts[0].valeur) return 0;
  for (let i = 1; i < pts.length; i++) {
    if (valeur <= pts[i].valeur) {
      const a = pts[i - 1], b = pts[i];
      const ratio = (valeur - a.valeur) / (b.valeur - a.valeur);
      return Math.round(a.percentile + ratio * (b.percentile - a.percentile));
    }
  }
  return 100;
}

/**
 * Classe le profil dans l'une des 4 catégories du site.
 * @param {object} profil
 *   revenuNetAnnuelMenage: number
 *   nbAdultes: number
 *   nbEnfants14Plus: number
 *   nbEnfantsMoins14: number
 *   statutActivite: "emploi_salarie" | "independant" | "retraite" | "chomage" | "etudiant" | "autre_inactif"
 *   patrimoineNet: number (optionnel, en euros)
 * @returns {object} résultat détaillé, jamais un simple id — toujours accompagné de la logique.
 */
function classerProfil(profil) {
  const uc = calculerUC(profil.nbAdultes, profil.nbEnfants14Plus, profil.nbEnfantsMoins14);
  const niveauDeVie = (profil.revenuNetAnnuelMenage || 0) / uc;
  const percentile = estimerPercentile(niveauDeVie);

  const estRetraiteOuInactif = STATUTS_RETRAITES_INACTIFS.includes(profil.statutActivite);

  const repereRetraite = trouverBaremeRetraite(profil.anneeNaissance, profil.trimestreNaissance);

  // Classification "revenu" indépendamment du statut, utile en info secondaire même pour les retraités.
  let classeRevenu;
  if (niveauDeVie < SEUILS_CLASSIFICATION.populaires_max) classeRevenu = "populaires";
  else if (niveauDeVie < SEUILS_CLASSIFICATION.moyennes_max) classeRevenu = "moyennes";
  else classeRevenu = "aisees";

  const bumpPatrimoine =
    classeRevenu === "moyennes" &&
    (profil.patrimoineNet || 0) >= SEUILS_CLASSIFICATION.patrimoine_bump_aisees;
  if (bumpPatrimoine) classeRevenu = "aisees";

  const classePrincipale = estRetraiteOuInactif ? "retraites" : classeRevenu;

  return {
    uc,
    niveauDeVie: Math.round(niveauDeVie),
    percentile,
    classePrincipale,          // à utiliser pour présélectionner le comparateur
    classeRevenuSecondaire: classeRevenu, // pertinent même si classePrincipale === "retraites"
    estRetraiteOuInactif,
    bumpPatrimoine,
    repereRetraite,            // { ageLegal, trimestres, statut, note } | null — voir retraites.html
    reperesJeunesse: determinerReperesJeunesse(profil.anneeNaissance, profil.statutActivite), // [] | [{titre, texte, lien}] — voir jeunesse-emploi-solidarite.html
  };
}

if (typeof window !== "undefined") {
  window.AGORA_SIMULATEUR = { calculerUC, estimerPercentile, classerProfil, trouverBaremeRetraite, determinerReperesJeunesse, SEUILS_NIVEAU_DE_VIE, SEUILS_CLASSIFICATION, BAREME_RETRAITE };
}

/**
 * MON CHOIX 2027 — Boussole des candidats (miroir de lib/boussole.ts et lib/positions.ts, version Next.js).
 * Chaque question oppose deux propositions symétriques (A / B). La proximité d'un candidat n'est calculée que sur
 * les questions où sa position est DOCUMENTÉE (liée à une mesure sourcée) ; une position non documentée est
 * écartée, jamais comptée comme un désaccord. Conception : docs/boussole-conception.md (dépôt Next.js).
 * Les tableaux QUESTIONS et POSITIONS sont recopiés tels quels depuis la version Next.js : à tenir synchronisés.
 */
(function () {
  const { CANDIDATS, THEMES } = window.AGORA_DATA;
  const { poidsThemesParDefaut } = window.AGORA_PRIORITES;

  const QUESTIONS = [
  { id: 1, theme: "Pouvoir d'achat et économie", a: "Relever fortement le Smic par la loi", b: "Laisser les salaires évoluer par la négociation, sans hausse légale forte du Smic" },
  { id: 2, theme: "Pouvoir d'achat et économie", a: "Baisser les impôts sur les entreprises et le capital pour encourager l'investissement", b: "Maintenir ou augmenter les impôts sur les plus hauts revenus et patrimoines pour financer la dépense publique" },
  { id: 3, theme: "Retraites et modèle social", a: "Revenir à un âge légal de départ plus bas qu'aujourd'hui", b: "Maintenir l'âge légal actuel ou le repousser, pour équilibrer le système" },
  { id: 4, theme: "Retraites et modèle social", a: "Introduire une part de retraite par capitalisation", b: "Conserver un système entièrement par répartition" },
  { id: 5, theme: "Immigration et intégration", a: "Restreindre ou supprimer le droit du sol", b: "Maintenir le droit du sol actuel" },
  { id: 6, theme: "Immigration et intégration", a: "Fixer des quotas annuels d'immigration, votés par le Parlement", b: "Ne pas fixer de plafond chiffré d'entrées" },
  { id: 7, theme: "Sécurité et justice", a: "Durcir les sanctions et accélérer les procédures pour les mineurs délinquants", b: "Privilégier l'éducation et la prévention pour les mineurs délinquants" },
  { id: 8, theme: "Sécurité et justice", a: "Construire davantage de places de prison", b: "Développer les peines alternatives à la prison" },
  { id: 9, theme: "Services publics", a: "Réduire le nombre de fonctionnaires et la dépense publique", b: "Recruter dans l'hôpital, l'école et les services publics, quitte à augmenter la dépense" },
  { id: 10, theme: "Services publics", a: "Réguler l'installation des médecins pour garantir l'accès aux soins", b: "Favoriser l'installation par des incitations, sans contrainte" },
  { id: 11, theme: "Écologie et énergie", a: "Développer le nucléaire en priorité", b: "Sortir progressivement du nucléaire au profit des énergies renouvelables" },
  { id: 12, theme: "Écologie et énergie", a: "Imposer des normes écologiques plus contraignantes", b: "Privilégier l'incitation et l'innovation plutôt que de nouvelles contraintes" },
  { id: 13, theme: "Souveraineté et industrie", a: "Protéger la production nationale (droits de douane, préférence nationale ou européenne)", b: "Favoriser le libre-échange et la concurrence internationale" },
  { id: 14, theme: "Souveraineté et industrie", a: "Placer des secteurs stratégiques sous contrôle public", b: "Laisser le secteur privé les gérer, sous régulation" },
  { id: 15, theme: "Institutions et démocratie", a: "Instaurer un référendum d'initiative citoyenne", b: "Conserver la démocratie représentative, sans RIC" },
  { id: 16, theme: "Institutions et démocratie", a: "Introduire une part de proportionnelle aux législatives", b: "Conserver le scrutin majoritaire" },
  { id: 17, theme: "Europe et géopolitique", a: "Sortir de l'Union européenne ou de l'euro", b: "Rester dans l'Union européenne et l'euro" },
  { id: 18, theme: "Europe et géopolitique", a: "Renforcer l'intégration européenne (budget commun, compétences partagées)", b: "Redonner des compétences aux États, sans nouvelle intégration" },
  { id: 19, theme: "Éducation et jeunesse", a: "Donner plus d'autonomie aux établissements scolaires (recrutement, organisation)", b: "Maintenir un cadre national identique pour tous les établissements" },
  { id: 20, theme: "Éducation et jeunesse", a: "Instaurer un service national obligatoire pour les jeunes", b: "Conserver un engagement uniquement volontaire" },
  { id: 21, theme: "Défense", a: "Augmenter fortement le budget de la défense", b: "Maintenir l'effort de défense actuel, ou le réduire au profit d'autres priorités" },
  { id: 22, theme: "Défense", a: "Rester membre de l'OTAN", b: "Quitter l'OTAN ou son commandement intégré" },
];

  const POSITIONS = [
  // 1 — Smic
  { candidat: "arthaud", question: 1, choix: "A", mesureId: "na-smic-2000" },
  { candidat: "tondelier", question: 1, choix: "A", mesureId: "mt-smic" },
  // 2 — fiscalité des entreprises et du capital
  { candidat: "melenchon", question: 2, choix: "B", mesureId: "jlm-fiscalite" },
  { candidat: "glucksmann", question: 2, choix: "B", mesureId: "rg-heritage-salaires" },
  // 3 — âge légal
  { candidat: "melenchon", question: 3, choix: "A", mesureId: "jlm-retraites" },
  { candidat: "philippe", question: 3, choix: "B", mesureId: "ep-retraites-65-ans" },
  // 4 — capitalisation
  { candidat: "retailleau", question: 4, choix: "A", mesureId: "br-retraites" },
  // 5 — droit du sol
  { candidat: "retailleau", question: 5, choix: "A", mesureId: "br-droit-du-sol" },
  { candidat: "dupont-aignan", question: 5, choix: "A", mesureId: "nda-droit-du-sol" },
  { candidat: "le-pen", question: 5, choix: "A", mesureId: "mlp-immigration" },
  // 6 — quotas
  { candidat: "attal", question: 6, choix: "A", mesureId: "ga-immigration" },
  // 7 — mineurs délinquants
  { candidat: "attal", question: 7, choix: "A", mesureId: "ga-justice-mineurs" },
  { candidat: "retailleau", question: 7, choix: "A", mesureId: "br-majorite-penale" },
  // 11 — nucléaire
  { candidat: "melenchon", question: 11, choix: "B", mesureId: "jlm-nucleaire" },
  // 13 — protection de la production
  { candidat: "attal", question: 13, choix: "A", mesureId: "ga-preference-europeenne" },
  // 15 — RIC
  { candidat: "egger", question: 15, choix: "A", mesureId: "ce-ric-pouvoir-maires" },
  // 17 — sortie de l'UE ou de l'euro
  { candidat: "asselineau", question: 17, choix: "A", mesureId: "fa-frexit" },
  { candidat: "dupont-aignan", question: 17, choix: "A", mesureId: "nda-frexit" },
  // 18 — intégration européenne
  { candidat: "attal", question: 18, choix: "A", mesureId: "ga-etats-unis-europe" },
  { candidat: "retailleau", question: 18, choix: "B", mesureId: "br-bouclier-constitutionnel" },
  // 20 — service national obligatoire
  { candidat: "glucksmann", question: 20, choix: "A", mesureId: "rg-service-civique" },
  { candidat: "melenchon", question: 20, choix: "A", mesureId: "jlm-conscription-ecologique" },
  // 22 — OTAN
  { candidat: "philippe", question: 22, choix: "A", mesureId: "ep-ukraine-otan" },
  { candidat: "asselineau", question: 22, choix: "B", mesureId: "fa-frexit" },
  { candidat: "dupont-aignan", question: 22, choix: "B", mesureId: "nda-frexit" },
];

  /** Nombre minimal de questions répondues ET documentées pour qu'un candidat soit classé. */
  const SEUIL_COUVERTURE = 3;

  function calculerProximite(candidat, reponses) {
    const repondues = QUESTIONS.filter((q) => reponses[q.id] && reponses[q.id].choix);
    let somme = 0;
    let sommePoids = 0;
    let accords = 0;
    let desaccords = 0;
    const details = [];

    repondues.forEach((q) => {
      const pos = POSITIONS.find((p) => p.candidat === candidat.id && p.question === q.id);
      const mesure = pos ? candidat.mesures.find((m) => m.id === pos.mesureId) : undefined;
      if (!pos || !mesure) return; // non documentée : écartée, jamais un désaccord
      const { choix, poids } = reponses[q.id];
      const accord = pos.choix === choix;
      somme += accord ? poids : -poids;
      sommePoids += poids;
      if (accord) accords++;
      else desaccords++;
      details.push({ question: q.id, accord, choixCandidat: pos.choix, source: mesure.sourceOfficielle, titreMesure: mesure.titre });
    });

    const documentees = accords + desaccords;
    return {
      candidat,
      score: sommePoids === 0 ? null : somme / sommePoids,
      accords,
      desaccords,
      documentees,
      repondues: repondues.length,
      classe: documentees >= SEUIL_COUVERTURE,
      details,
    };
  }

  /** Classés : proximité décroissante (égalités : ordre alphabétique) ; les autres, listés à part, par ordre alphabétique. */
  function classerBoussole(reponses) {
    const tous = CANDIDATS.map((c) => calculerProximite(c, reponses));
    const parNom = (a, b) => a.candidat.id.localeCompare(b.candidat.id, "fr");
    const classes = tous.filter((p) => p.classe).sort((a, b) => b.score - a.score || parNom(a, b));
    const autres = tous.filter((p) => !p.classe).sort(parNom);
    return { classes, autres };
  }

  /**
   * Priorités par thème déduites des réponses (pour le volet « effet économique estimé sur ma catégorie ») :
   * importance la plus forte parmi les questions répondues du thème ; éducation et défense sont ignorées
   * (pas de mesures chiffrées dans le score économique).
   */
  function poidsThemesDepuisBoussole(reponses) {
    const poids = poidsThemesParDefaut();
    QUESTIONS.forEach((q) => {
      const r = reponses[q.id];
      if (!r || !r.choix || !THEMES.includes(q.theme)) return;
      poids[q.theme] = Math.max(poids[q.theme], r.poids);
    });
    return poids;
  }

  window.AGORA_BOUSSOLE = { QUESTIONS, POSITIONS, SEUIL_COUVERTURE, calculerProximite, classerBoussole, poidsThemesDepuisBoussole };
})();

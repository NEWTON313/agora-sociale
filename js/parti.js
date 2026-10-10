/**
 * MON CHOIX 2027 — Badge typographique d'étiquette politique (miroir de lib/parti.ts, version Next.js).
 * Même forme, même taille, même couleur pour tous les candidats : aucun logo de tiers, aucune couleur de parti.
 * Sigle usuel s'il est listé, sinon initiales (plusieurs mots) ou nom en capitales (un seul mot).
 */
(function () {
  const SIGLES_USUELS = {
    "Parti socialiste": "PS",
    "Rassemblement national": "RN",
    "La France insoumise": "LFI",
    "Les Républicains": "LR",
    "Parti communiste français": "PCF",
    "Lutte ouvrière": "LO",
    "NPA-Révolutionnaires": "NPA-R",
    "Debout la France": "DLF",
    "Union populaire républicaine": "UPR",
    "Gauche républicaine et socialiste": "GRS",
    "Place publique": "PP",
    "Apparenté Ensemble pour la République": "EPR",
  };
  const MOTS_OUTILS = ["le", "la", "les", "l", "de", "du", "des", "d", "et", "pour", "en", "au", "aux"];

  function siglePartiDe(parti) {
    const nom = String(parti || "").trim();
    if (nom === "" || /non précisée|sans étiquette/i.test(nom)) return null;
    if (SIGLES_USUELS[nom]) return SIGLES_USUELS[nom];

    const mots = nom
      .replace(/[!?.]/g, " ")
      .split(/[\s'’]+/)
      .filter((m) => m !== "" && !MOTS_OUTILS.includes(m.toLowerCase()));
    if (mots.length === 0) return null;
    if (mots.length === 1) return mots[0].toLocaleUpperCase("fr");
    return mots
      .map((m) => m[0].normalize("NFD").replace(/[̀-ͯ]/g, ""))
      .join("")
      .toLocaleUpperCase("fr");
  }

  /** HTML du badge (vide si l'étiquette n'est pas précisée). Décoratif : le nom complet reste affiché à côté. */
  function badgePartiHtml(parti) {
    const sigle = siglePartiDe(parti);
    return sigle ? `<span class="badge-parti" aria-hidden="true" title="${parti}">${sigle}</span>` : "";
  }

  window.AGORA_PARTI = { siglePartiDe, badgePartiHtml };
})();

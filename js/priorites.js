/**
 * MON CHOIX 2027 — "Mes priorités" : score personnalisé pondéré (logique pure, testable)
 * Miroir de lib/priorites.ts (version Next.js). Ne réordonne jamais l'affichage par défaut
 * des candidats (voir méthodologie, garde-fous de neutralité) : c'est une vue optionnelle
 * en plus, pas un verdict.
 */
(function () {
  const { THEMES } = window.AGORA_DATA;

  const NIVEAUX_PRIORITE = [0, 1, 2, 3];

  const LABELS_PRIORITE = {
    0: "Pas prioritaire",
    1: "Peu prioritaire",
    2: "Important",
    3: "Très important",
  };

  function poidsThemesParDefaut() {
    const poids = {};
    THEMES.forEach((t) => (poids[t] = 0));
    return poids;
  }

  function calculerScorePersonnalise(candidat, classeActive, poids) {
    const themesPonderes = Object.keys(poids).filter((t) => poids[t] > 0);

    let sommePonderee = 0;
    let sommePoids = 0;
    let themesCouverts = 0;

    themesPonderes.forEach((theme) => {
      const mesuresDuTheme = candidat.mesures.filter((m) => m.theme === theme);
      if (mesuresDuTheme.length === 0) return;
      themesCouverts++;
      const scoreTheme =
        mesuresDuTheme.reduce((acc, m) => acc + m.impactParClasse[classeActive].score, 0) / mesuresDuTheme.length;
      sommePonderee += scoreTheme * poids[theme];
      sommePoids += poids[theme];
    });

    return {
      scoreGlobal: sommePoids === 0 ? null : sommePonderee / sommePoids,
      themesCouverts,
      themesPonderes: themesPonderes.length,
      themesTotal: THEMES.length,
    };
  }

  /**
   * Tri stable et explicite (jamais l'ordre par défaut) : les candidats sans score
   * calculable restent toujours en fin de liste, jamais traités comme un score de 0.
   * À égalité de score, on retombe sur l'ordre alphabétique du nom.
   */
  function trierParScorePersonnalise(candidats, resultatsParId) {
    return [...candidats].sort((a, b) => {
      const scoreA = resultatsParId[a.id] ? resultatsParId[a.id].scoreGlobal : null;
      const scoreB = resultatsParId[b.id] ? resultatsParId[b.id].scoreGlobal : null;
      if (scoreA === null && scoreB === null) return a.nom.localeCompare(b.nom);
      if (scoreA === null) return 1;
      if (scoreB === null) return -1;
      if (scoreB !== scoreA) return scoreB - scoreA;
      return a.nom.localeCompare(b.nom);
    });
  }

  window.AGORA_PRIORITES = {
    NIVEAUX_PRIORITE,
    LABELS_PRIORITE,
    poidsThemesParDefaut,
    calculerScorePersonnalise,
    trierParScorePersonnalise,
  };
})();

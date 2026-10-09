/**
 * MON CHOIX 2027 — Page d'un résultat partagé (resultat.html?classe=...&p=...)
 * Affiche le classement complet, sans mise en avant d'un seul nom (garde-fous de neutralité).
 */
(function () {
  const { CLASSES_SOCIALES, THEMES } = window.AGORA_DATA;
  const { LABELS_PRIORITE } = window.AGORA_PRIORITES;
  const { decoderPartage, classerCandidats } = window.AGORA_PARTAGE;

  const params = new URLSearchParams(window.location.search);
  const partage = decoderPartage({ classe: params.get("classe"), p: params.get("p") });
  if (!partage) {
    window.location.replace("simulateur.html");
    return;
  }

  const classe = CLASSES_SOCIALES.find((c) => c.id === partage.classe);
  const { classement, resultatsParId } = classerCandidats(partage.classe, partage.poids);

  document.getElementById("resultat-titre").textContent = `Ce que donne le comparateur pour : ${classe.nom.toLowerCase()}`;
  document.getElementById("resultat-description").textContent = `${classe.description}.`;

  document.getElementById("resultat-priorites").innerHTML = THEMES.filter((t) => partage.poids[t] > 0)
    .sort((a, b) => partage.poids[b] - partage.poids[a])
    .map(
      (t) => `<li><span>${t}</span><span class="resultat-partage__niveau mono">${LABELS_PRIORITE[partage.poids[t]]}</span></li>`
    )
    .join("");

  function scoreToWidth(score) {
    return Math.min(Math.abs(score) / 2, 1) * 50;
  }

  function renderScorePersonnalise(resultat) {
    if (resultat.scoreGlobal === null) {
      return `
        <div class="score-personnalise score-personnalise--vide mono">
          Score personnalisé non calculable — aucune mesure recensée sur ces thèmes prioritaires pour ce candidat
        </div>
      `;
    }
    const { scoreGlobal, themesCouverts, themesPonderes } = resultat;
    const side = scoreGlobal >= 0 ? "positif" : "negatif";
    const avertissement =
      themesCouverts < themesPonderes
        ? `<div class="score-personnalise__avertissement mono">Estimation basée sur une partie seulement de ces priorités : à interpréter avec prudence.</div>`
        : "";
    return `
      <div class="score-personnalise">
        <div class="score-personnalise__label mono">Score personnalisé selon ces priorités</div>
        <div class="ledger__track" role="img" aria-label="Score personnalisé ${scoreGlobal.toFixed(1)} sur une échelle de -2 à 2, ${themesCouverts} sur ${themesPonderes} thèmes prioritaires couverts">
          <div class="ledger__axis"></div>
          <div class="ledger__fill ${side}" style="width:${scoreToWidth(scoreGlobal)}%"></div>
        </div>
        <div class="ledger__score mono">${scoreGlobal > 0 ? "+" : ""}${scoreGlobal.toFixed(1)} / 2 · ${themesCouverts}/${themesPonderes} thème${themesPonderes > 1 ? "s" : ""} prioritaire${themesPonderes > 1 ? "s" : ""} couvert${themesCouverts > 1 ? "s" : ""}</div>
        ${avertissement}
      </div>
    `;
  }

  document.getElementById("resultat-classement").innerHTML = classement
    .map(
      (candidat, i) => `
        <li>
          <div style="margin-bottom:6px;">
            <span class="font-display">${i + 1}. ${candidat.nom}</span>
            <span class="mono" style="font-size:0.7rem; text-transform:uppercase; color:var(--ink-faint);">${candidat.parti}</span>
          </div>
          ${renderScorePersonnalise(resultatsParId[candidat.id])}
        </li>
      `
    )
    .join("");
})();

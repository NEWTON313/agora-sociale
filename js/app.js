/**
 * L'AGORA SOCIALE — Comparateur interactif
 * Aucune dépendance de build : vanilla JS, pensé pour un déploiement
 * statique immédiat (GitHub Pages, Netlify, etc.).
 */

(function () {
  const { CLASSES_SOCIALES, THEMES, CANDIDATS, AVIS_DONNEES_REELLES } = window.AGORA_DATA;

  const avisEl = document.getElementById("avis-donnees-reelles");
  if (avisEl && AVIS_DONNEES_REELLES) {
    avisEl.innerHTML = `<strong>⚠️ Données en cours de constitution (màj ${AVIS_DONNEES_REELLES.dateMaj}) :</strong> ${AVIS_DONNEES_REELLES.texte}`;
  }

  const params = new URLSearchParams(window.location.search);
  const classeDepuisUrl = params.get("classe");
  const classeValide = CLASSES_SOCIALES.some((c) => c.id === classeDepuisUrl);

  let classeActive = classeValide ? classeDepuisUrl : CLASSES_SOCIALES[0].id;
  let themeActif = THEMES[0];

  // Mode "priorités" : vue optionnelle en plus de l'affichage neutre par défaut,
  // jamais un remplacement — voir garde-fous de neutralité dans la méthodologie.
  let modePriorites = false;
  let poidsThemes = window.AGORA_PRIORITES.poidsThemesParDefaut();
  let trierParScore = false;

  const railEl = document.getElementById("classe-rail");
  const cartesEl = document.getElementById("cartes-candidats");
  const selectMesureEl = document.getElementById("select-mesure");
  const titreComparateurEl = document.getElementById("comparateur-titre-classe");
  const btnMesPrioritesEl = document.getElementById("btn-mes-priorites");
  const prioritesPanelEl = document.getElementById("priorites-panel");

  function initRail() {
    railEl.innerHTML = CLASSES_SOCIALES.map((c) => `
      <button
        class="classe-item ${c.id === classeActive ? "active" : ""}"
        style="--swatch:${c.couleur}; --swatch-bg:${c.couleurFond}"
        data-classe="${c.id}"
        aria-pressed="${c.id === classeActive}"
      >
        ${c.nom}
        <small>${c.description}</small>
      </button>
    `).join("");

    railEl.querySelectorAll(".classe-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        classeActive = btn.dataset.classe;
        initRail();
        renderCartes();
      });
    });
  }

  function initSelectMesure() {
    selectMesureEl.innerHTML = THEMES.map(
      (t) => `<option value="${t}" ${t === themeActif ? "selected" : ""}>${t}</option>`
    ).join("");
    selectMesureEl.addEventListener("change", (e) => {
      themeActif = e.target.value;
      renderCartes();
    });
  }

  function initPrioritesPanel() {
    const { NIVEAUX_PRIORITE, LABELS_PRIORITE } = window.AGORA_PRIORITES;

    prioritesPanelEl.innerHTML = `
      <div class="priorites-panel__card">
        <div class="priorites-panel__header">
          <h3>Mes priorités</h3>
          <button type="button" id="btn-reinitialiser-priorites" class="mono priorites-panel__reset">
            Réinitialiser mes priorités
          </button>
        </div>
        <p class="priorites-panel__intro">
          Indiquez l'importance que vous accordez à chaque thème : les cartes ci-dessous
          affichent alors un score personnalisé, en plus (et sans changer) de l'affichage
          neutre par défaut.
        </p>
        <ul class="priorites-panel__list">
          ${THEMES.map((theme) => `
            <li class="priorites-panel__row">
              <span>${theme}</span>
              <div class="priorites-panel__niveaux" role="group" aria-label="Priorité pour ${theme}">
                ${NIVEAUX_PRIORITE.map((niveau) => `
                  <button
                    type="button"
                    class="priorites-panel__niveau mono ${poidsThemes[theme] === niveau ? "active" : ""}"
                    data-theme="${theme}"
                    data-niveau="${niveau}"
                    aria-pressed="${poidsThemes[theme] === niveau}"
                  >${LABELS_PRIORITE[niveau]}</button>
                `).join("")}
              </div>
            </li>
          `).join("")}
        </ul>
        <label class="mono priorites-panel__tri">
          <input type="checkbox" id="chk-trier-par-score" ${trierParScore ? "checked" : ""}>
          Trier par mon score personnalisé (expérimental — ce n'est ni un classement ni une recommandation)
        </label>
      </div>
    `;

    prioritesPanelEl.querySelectorAll(".priorites-panel__niveau").forEach((btn) => {
      btn.addEventListener("click", () => {
        poidsThemes[btn.dataset.theme] = Number(btn.dataset.niveau);
        initPrioritesPanel();
        renderCartes();
      });
    });

    document.getElementById("btn-reinitialiser-priorites").addEventListener("click", () => {
      poidsThemes = window.AGORA_PRIORITES.poidsThemesParDefaut();
      initPrioritesPanel();
      renderCartes();
    });

    document.getElementById("chk-trier-par-score").addEventListener("change", (e) => {
      trierParScore = e.target.checked;
      renderCartes();
    });
  }

  function renderScorePersonnalise(resultat) {
    if (resultat.scoreGlobal === null) {
      return `
        <div class="score-personnalise score-personnalise--vide mono">
          Score personnalisé non calculable — aucune mesure recensée sur vos thèmes prioritaires pour ce candidat
        </div>
      `;
    }
    const { scoreGlobal, themesCouverts, themesPonderes } = resultat;
    const width = scoreToWidth(scoreGlobal);
    const side = scoreGlobal >= 0 ? "positif" : "negatif";
    const avertissement =
      themesCouverts < themesPonderes
        ? `<div class="score-personnalise__avertissement mono">Estimation basée sur une partie seulement de vos priorités : à interpréter avec prudence.</div>`
        : "";

    return `
      <div class="score-personnalise">
        <div class="score-personnalise__label mono">Score personnalisé selon vos priorités</div>
        <div class="ledger__track" role="img" aria-label="Score personnalisé ${scoreGlobal.toFixed(1)} sur une échelle de -2 à 2, ${themesCouverts} sur ${themesPonderes} thèmes prioritaires couverts">
          <div class="ledger__axis"></div>
          <div class="ledger__fill ${side}" style="width:${width}%"></div>
        </div>
        <div class="ledger__score mono">${scoreGlobal > 0 ? "+" : ""}${scoreGlobal.toFixed(1)} / 2 · ${themesCouverts}/${themesPonderes} thème${themesPonderes > 1 ? "s" : ""} prioritaire${themesPonderes > 1 ? "s" : ""} couvert${themesCouverts > 1 ? "s" : ""}</div>
        ${avertissement}
      </div>
    `;
  }

  function scoreToWidth(score) {
    // score entre -2 et 2 -> pourcentage de remplissage de chaque côté de l'axe central (0-50%)
    return Math.min(Math.abs(score) / 2, 1) * 50;
  }

  function renderLedger(impact) {
    if (!impact) {
      return `<div class="ledger__label">Aucune mesure identifiée sur ce thème pour cette catégorie</div>`;
    }
    const { score } = impact;
    const width = scoreToWidth(score);
    const side = score >= 0 ? "positif" : "negatif";
    const label = score > 0 ? "Impact plutôt favorable" : score < 0 ? "Impact plutôt défavorable" : "Impact neutre / non déterminant";

    return `
      <div class="ledger">
        <div class="ledger__label">${label}</div>
        <div class="ledger__track" role="img" aria-label="${label}, score ${score} sur une échelle de -2 à 2">
          <div class="ledger__axis"></div>
          <div class="ledger__fill ${side}" style="width:${width}%"></div>
        </div>
        <div class="ledger__score mono">score : ${score > 0 ? "+" : ""}${score} / 2</div>
      </div>
    `;
  }

  function renderCartes() {
    const classeInfo = CLASSES_SOCIALES.find((c) => c.id === classeActive);
    titreComparateurEl.textContent = classeInfo.nom;

    const resultatsParId = {};
    if (modePriorites) {
      CANDIDATS.forEach((candidat) => {
        resultatsParId[candidat.id] = window.AGORA_PRIORITES.calculerScorePersonnalise(candidat, classeActive, poidsThemes);
      });
    }

    const candidatsAffiches =
      modePriorites && trierParScore
        ? window.AGORA_PRIORITES.trierParScorePersonnalise(CANDIDATS, resultatsParId)
        : CANDIDATS;

    cartesEl.innerHTML = candidatsAffiches.map((candidat) => {
      // .filter() et non .find() : un même thème peut regrouper plusieurs mesures d'un
      // candidat (ex. Édouard Philippe sur "Pouvoir d'achat et économie") depuis
      // l'élargissement à 9 thèmes.
      const mesures = candidat.mesures.filter((m) => m.theme === themeActif);

      const mesuresHtml = mesures.length
        ? mesures.map((mesure) => `
            <div class="carte-candidat__mesure-bloc">
              <div class="carte-candidat__mesure">${mesure.titre}</div>
              ${renderLedger(mesure.impactParClasse[classeActive])}
            </div>
          `).join("")
        : `
            <div class="carte-candidat__mesure">Aucune mesure recensée sur ce thème pour ce candidat.</div>
            ${renderLedger(null)}
          `;

      const scoreHtml = modePriorites ? renderScorePersonnalise(resultatsParId[candidat.id]) : "";

      return `
        <article class="carte-candidat">
          <header>
            <div class="carte-candidat__nom">${candidat.nom}</div>
            <span class="badge mono">${candidat.parti}</span>
          </header>
          ${mesuresHtml}
          ${scoreHtml}
          <a href="candidat.html?c=${candidat.id}" class="mono" style="font-size:0.78rem; text-decoration:underline;">
            Voir la fiche complète →
          </a>
        </article>
      `;
    }).join("");
  }

  btnMesPrioritesEl.addEventListener("click", () => {
    modePriorites = !modePriorites;
    btnMesPrioritesEl.setAttribute("aria-pressed", String(modePriorites));
    btnMesPrioritesEl.classList.toggle("active", modePriorites);
    prioritesPanelEl.hidden = !modePriorites;
    if (modePriorites) initPrioritesPanel();
    renderCartes();
  });

  initRail();
  initSelectMesure();
  renderCartes();
})();

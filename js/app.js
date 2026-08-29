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

  const railEl = document.getElementById("classe-rail");
  const cartesEl = document.getElementById("cartes-candidats");
  const selectMesureEl = document.getElementById("select-mesure");
  const titreComparateurEl = document.getElementById("comparateur-titre-classe");

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

    cartesEl.innerHTML = CANDIDATS.map((candidat) => {
      const mesure = candidat.mesures.find((m) => m.theme === themeActif);
      const impact = mesure ? mesure.impactParClasse[classeActive] : null;

      return `
        <article class="carte-candidat">
          <header>
            <div class="carte-candidat__nom">${candidat.nom}</div>
            <span class="badge mono">${candidat.parti}</span>
          </header>
          <div class="carte-candidat__mesure">
            ${mesure ? mesure.titre : "Aucune mesure recensée sur ce thème pour ce candidat."}
          </div>
          ${renderLedger(impact)}
          <a href="candidat.html?c=${candidat.id}" class="mono" style="font-size:0.78rem; text-decoration:underline;">
            Voir la fiche complète →
          </a>
        </article>
      `;
    }).join("");
  }

  initRail();
  initSelectMesure();
  renderCartes();
})();

/**
 * MON CHOIX 2027 — Fiche candidat dynamique
 * Lit le paramètre ?c=<id> et affiche toutes les mesures connues
 * pour ce candidat, avec l'analyse croisée par classe sociale.
 */

(function () {
  const { CLASSES_SOCIALES, CANDIDATS } = window.AGORA_DATA;
  const params = new URLSearchParams(window.location.search);
  const candidatId = params.get("c");
  const root = document.getElementById("fiche-candidat-root");

  function badgeConfiance(mesure) {
    const estConfirme = mesure.niveauConfiance === "confirme";
    const couleur = estConfirme ? "var(--impact-positif)" : "var(--impact-neutre)";
    const label = estConfirme ? "Confirmé par plusieurs médias" : "Annoncé, détails à préciser";
    return `
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
        <span class="badge mono" style="color:${couleur}; border-color:${couleur};">${label}</span>
      </div>
      ${mesure.noteConfiance ? `<p style="font-size:0.8rem; color:var(--ink-soft); margin-top:-4px;">${mesure.noteConfiance}</p>` : ""}
    `;
  }

  function renderMesure(mesure) {
    return `
      <div class="mesure-bloc" style="margin-bottom:24px;">
        <div class="mesure-bloc__entete">
          <div>
            <div class="mesure-bloc__theme">${mesure.theme}</div>
            <div class="mesure-bloc__titre">${mesure.titre}</div>
          </div>
        </div>
        <div style="padding:16px 18px;">
          ${badgeConfiance(mesure)}
          <p style="color:var(--ink-soft); font-size:0.94rem;">
            ${mesure.resumeOfficiel}
            <a href="${mesure.sourceOfficielle}" target="_blank" rel="noopener" style="text-decoration:underline;">Voir la source →</a>
          </p>
        </div>
        <div class="analyse-classes">
          ${CLASSES_SOCIALES.map((classe) => {
            const impact = mesure.impactParClasse[classe.id];
            return `
              <div class="analyse-classe" style="background:${classe.couleurFond}">
                <div class="analyse-classe__nom"><span class="dot" style="background:${classe.couleur}"></span>${classe.nom}</div>
                <strong class="mono" style="font-size:0.78rem;">Score : ${impact.score > 0 ? "+" : ""}${impact.score} / 2</strong>
                <p style="font-size:0.85rem; margin:6px 0 0; font-weight:600;">Avantages</p>
                <ul>${impact.avantages.length ? impact.avantages.map((a) => `<li>${a}</li>`).join("") : "<li>Aucun bénéfice direct identifié</li>"}</ul>
                <p style="font-size:0.85rem; margin:10px 0 0; font-weight:600;">Risques</p>
                <ul>${impact.risques.length ? impact.risques.map((r) => `<li>${r}</li>`).join("") : "<li>Aucun risque direct identifié</li>"}</ul>
                <div class="angle-mort">Angle mort : ${impact.angleMort}</div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderListeCandidats() {
    root.innerHTML = `
      <h1 style="font-size:1.6rem; margin-bottom:20px;">Choisissez un candidat</h1>
      <div class="cartes-candidats">
        ${CANDIDATS.map((c) => `
          <a href="candidat.html?c=${c.id}" class="carte-candidat" style="text-decoration:none; color:inherit;">
            <div class="carte-candidat__nom">${c.nom}</div>
            <span class="badge mono">${c.parti}</span>
            <div style="font-size:0.85rem; color:var(--ink-soft); margin-top:8px;">${c.mesures.length} mesure(s) recensée(s)</div>
          </a>
        `).join("")}
      </div>
    `;
  }

  function renderFiche(candidat) {
    document.title = `${candidat.nom} — Mon Choix 2027`;
    root.innerHTML = `
      <div class="fiche-header">
        <div>
          <div class="hero__eyebrow">${candidat.parti}</div>
          <h1 style="font-size:2rem;">${candidat.nom}</h1>
        </div>
      </div>
      ${candidat.mesures.map(renderMesure).join("")}
      <p style="margin-top:12px; font-size:0.82rem; color:var(--ink-soft); max-width:70ch;">
        Cette fiche ne recense que les mesures pour lesquelles une source vérifiable a été retrouvée
        au moment de la rédaction (28 août 2026). Elle sera complétée à mesure que le programme du
        candidat se précise. Voir la <a href="methodologie.html" style="text-decoration:underline;">méthodologie</a>.
      </p>
    `;
  }

  const candidat = CANDIDATS.find((c) => c.id === candidatId);
  if (candidat) {
    renderFiche(candidat);
  } else {
    renderListeCandidats();
  }
})();

/**
 * MON CHOIX 2027 — Rendu du formulaire et du résultat du simulateur
 */

(function () {
  const { CLASSES_SOCIALES, CANDIDATS, THEMES } = window.AGORA_DATA;
  const { classerProfil, SEUILS_NIVEAU_DE_VIE } = window.AGORA_SIMULATEUR;
  const { NIVEAUX_PRIORITE, LABELS_PRIORITE, poidsThemesParDefaut, calculerScorePersonnalise, trierParScorePersonnalise } =
    window.AGORA_PRIORITES;

  const form = document.getElementById("form-simulateur");
  const resultatEl = document.getElementById("resultat-simulateur");
  const enfantsWrap = document.getElementById("bloc-enfants");
  const patrimoineWrap = document.getElementById("bloc-patrimoine");
  const prioritesPanelEl = document.getElementById("priorites-panel-simulateur");

  let poidsThemes = poidsThemesParDefaut();

  function scoreToWidth(score) {
    return Math.min(Math.abs(score) / 2, 1) * 50;
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

  function initPrioritesPanel() {
    prioritesPanelEl.innerHTML = `
      <div class="priorites-panel__card">
        <div class="priorites-panel__header">
          <h3>Mes priorités</h3>
          <button type="button" id="btn-reinitialiser-priorites-sim" class="mono priorites-panel__reset">
            Réinitialiser mes priorités
          </button>
        </div>
        <p class="priorites-panel__intro">
          Indiquez l'importance que vous accordez à chaque thème pour que « Mon candidat »
          calcule un score personnalisé par candidat, une fois votre catégorie sociale déterminée.
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
      </div>
    `;

    prioritesPanelEl.querySelectorAll(".priorites-panel__niveau").forEach((btn) => {
      btn.addEventListener("click", () => {
        poidsThemes[btn.dataset.theme] = Number(btn.dataset.niveau);
        initPrioritesPanel();
      });
    });

    document.getElementById("btn-reinitialiser-priorites-sim").addEventListener("click", () => {
      poidsThemes = poidsThemesParDefaut();
      initPrioritesPanel();
    });
  }

  function renderMonCandidat(classeActive) {
    const themesPonderes = Object.values(poidsThemes).some((n) => n > 0);
    if (!themesPonderes) {
      return `
        <div class="resultat" style="border-left:4px solid var(--line-strong); margin-top:24px;">
          <p style="margin:0;">
            Indiquez au moins une priorité ci-dessus pour voir quel candidat correspond le mieux à ce que vous
            jugez important.
          </p>
        </div>
      `;
    }

    const resultatsParId = {};
    CANDIDATS.forEach((c) => {
      resultatsParId[c.id] = calculerScorePersonnalise(c, classeActive, poidsThemes);
    });
    const classement = trierParScorePersonnalise(CANDIDATS, resultatsParId);
    const premier = resultatsParId[classement[0].id];
    const aUneCorrespondance = premier && premier.scoreGlobal !== null;

    return `
      <div class="resultat" style="margin-top:24px;">
        <div class="resultat__eyebrow">Selon vos priorités et votre catégorie sociale</div>
        <h3>${aUneCorrespondance ? classement[0].nom : "Aucune correspondance calculable"}</h3>
        ${aUneCorrespondance ? `<p>${classement[0].parti}</p>` : ""}
        <p style="font-size:0.85rem; font-style:italic; color:var(--ink-soft);">
          Le candidat dont les mesures recensées obtiennent le score le plus favorable pour vos priorités déclarées.
          Ce n'est ni un jugement de valeur ni une recommandation de vote — voir la
          <a href="methodologie.html#score-personnalise" style="text-decoration:underline;">méthodologie</a>.
          Le classement complet ci-dessous reste toujours visible, dans l'ordre de correspondance.
        </p>
        <ol style="list-style:none; padding:0; display:flex; flex-direction:column; gap:16px;">
          ${classement.map((candidat, i) => `
            <li style="${i === 0 && aUneCorrespondance ? "" : "opacity:0.8;"}">
              <div style="margin-bottom:6px;">
                <span class="font-display">${i + 1}. ${candidat.nom}</span>
                <span class="mono" style="font-size:0.7rem; text-transform:uppercase; color:var(--ink-faint);">${candidat.parti}</span>
              </div>
              ${renderScorePersonnalise(resultatsParId[candidat.id])}
            </li>
          `).join("")}
        </ol>
      </div>
    `;
  }

  function euros(n) {
    return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " €";
  }

  function decrirePosition(percentile) {
    if (percentile === 50) return "à la médiane exacte du niveau de vie";
    if (percentile > 50) return `parmi les ${100 - percentile} % les plus aisés`;
    return `parmi les ${percentile} % les plus modestes`;
  }

  function classeInfo(id) {
    return CLASSES_SOCIALES.find((c) => c.id === id);
  }

  function renderRegle(percentile) {
    const ticks = SEUILS_NIVEAU_DE_VIE.points.filter((p) => p.percentile > 0 && p.percentile < 100);
    return `
      <div class="regle" role="img" aria-label="Votre niveau de vie se situe autour du ${percentile}e percentile de la population">
        <div class="regle__track">
          <div class="regle__curseur" style="left:${percentile}%">
            <div class="regle__curseur-label">Vous</div>
          </div>
          ${ticks.map((t) => `<div class="regle__tick" style="left:${t.percentile}%"></div>`).join("")}
        </div>
        <div class="regle__legende">
          <span>D1 (10 % les plus modestes)</span>
          <span>Médiane</span>
          <span>D9 (10 % les plus aisés)</span>
        </div>
      </div>
    `;
  }

  function renderRepereRetraite(r) {
    if (!r.repereRetraite) return "";
    const { ageLegal, trimestres, statut, note } = r.repereRetraite;
    const styles = {
      definitif: { label: "Paramètre stable", couleur: "var(--ink-soft)" },
      gele: { label: "Vous bénéficiez du gel LFSS 2026", couleur: "var(--impact-positif)" },
      incertain: { label: "Paramètre incertain — enjeu de 2027", couleur: "var(--impact-negatif)" },
    };
    const style = styles[statut] || styles.definitif;
    return `
      <div class="resultat__note" style="border-left-color:${style.couleur}">
        <div class="mono" style="font-size:0.68rem; text-transform:uppercase; letter-spacing:0.05em; color:${style.couleur}; margin-bottom:4px;">
          ${style.label}
        </div>
        <strong>Repère retraite (indicatif) :</strong> à droit constant aujourd'hui,
        votre âge légal de départ serait <strong>${ageLegal}</strong>, avec
        <strong>${trimestres} trimestres</strong> requis pour le taux plein.
        ${note ? `<div style="margin-top:6px; font-size:0.85rem;">${note}</div>` : ""}
        <div style="margin-top:8px;">
          <a href="retraites.html" class="mono" style="text-decoration:underline; font-size:0.8rem;">
            Comprendre le calendrier complet et ses enjeux pour 2027 →
          </a>
        </div>
      </div>
    `;
  }

  function renderReperesJeunesse(r) {
    if (!r.reperesJeunesse || !r.reperesJeunesse.length) return "";
    return r.reperesJeunesse.map((repere) => `
      <div class="resultat__note" style="border-left-color:var(--classe-populaire);">
        <strong>${repere.titre}</strong>
        <div style="margin-top:6px; font-size:0.85rem;">${repere.texte}</div>
        <div style="margin-top:8px;">
          <a href="${repere.lien}" class="mono" style="text-decoration:underline; font-size:0.8rem;">
            Comprendre le cadre légal et le débat →
          </a>
        </div>
      </div>
    `).join("");
  }

  function renderResultat(profil, r) {
    const classe = classeInfo(r.classePrincipale);
    const classeRevenu = classeInfo(r.classeRevenuSecondaire);

    let noteStatut = "";
    if (r.estRetraiteOuInactif) {
      noteStatut = `
        <p class="resultat__note">
          Votre statut vous place dans la catégorie <strong>Retraités &amp; inactifs</strong>,
          car les mécanismes qui vous concernent le plus (pensions, dépenses de santé,
          minima sociaux) diffèrent de ceux d'une personne en emploi. À titre indicatif,
          votre niveau de vie vous situerait, si vous étiez actif·ve, plutôt du côté des
          <strong>${classeRevenu.nom.toLowerCase()}</strong>.
        </p>`;
    } else if (r.bumpPatrimoine) {
      noteStatut = `
        <p class="resultat__note">
          Votre revenu courant correspondait aux classes moyennes, mais votre patrimoine
          déclaré vous rapproche davantage des <strong>classes aisées</strong> pour les
          mesures fiscales portant sur le capital (IFI, droits de succession, etc.).
        </p>`;
    }

    resultatEl.innerHTML = `
      <div class="resultat" style="border-left:4px solid ${classe.couleur}">
        <div class="resultat__eyebrow">Vous êtes classé·e dans :</div>
        <h3 style="color:${classe.couleur}">${classe.nom}</h3>
        <p>${classe.description}</p>

        ${renderRegle(r.percentile)}

        <dl class="resultat__chiffres">
          <div><dt>Niveau de vie estimé</dt><dd>${euros(r.niveauDeVie)} / an / UC</dd></div>
          <div><dt>Position dans la population</dt><dd>${decrirePosition(r.percentile)}</dd></div>
          <div><dt>Unités de consommation du foyer</dt><dd>${r.uc}</dd></div>
        </dl>

        ${noteStatut}

        ${renderRepereRetraite(r)}

        ${renderReperesJeunesse(r)}

        <a class="bouton-suite" href="index.html?classe=${r.classePrincipale}">
          Voir l'impact des programmes sur cette catégorie →
        </a>
      </div>

      ${renderMonCandidat(r.classePrincipale)}
    `;
    resultatEl.hidden = false;
    resultatEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Afficher/masquer le champ patrimoine seulement si utile (évite de le demander inutilement)
  function toggleBlocsConditionnels() {
    const statut = form.statutActivite.value;
    patrimoineWrap.hidden = false; // toujours optionnel et affiché, mais on pourrait l'affiner ici plus tard

    const anneeSaisie = Number(form.anneeNaissance.value);
    document.getElementById("bloc-trimestre-1965").hidden = anneeSaisie !== 1965;
  }

  form.addEventListener("change", toggleBlocsConditionnels);
  form.addEventListener("input", toggleBlocsConditionnels);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const profil = {
      revenuNetAnnuelMenage: Number(data.get("revenuMensuel")) * 12,
      nbAdultes: Number(data.get("nbAdultes")),
      nbEnfants14Plus: Number(data.get("nbEnfants14Plus")),
      nbEnfantsMoins14: Number(data.get("nbEnfantsMoins14")),
      statutActivite: data.get("statutActivite"),
      patrimoineNet: Number(data.get("patrimoineNet")) || 0,
      anneeNaissance: Number(data.get("anneeNaissance")) || null,
      trimestreNaissance: data.get("trimestreNaissance"),
    };

    const resultat = classerProfil(profil);
    renderResultat(profil, resultat);
  });

  toggleBlocsConditionnels();
  initPrioritesPanel();
})();

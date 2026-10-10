/**
 * MON CHOIX 2027 — Rendu du formulaire et du résultat du simulateur
 */

(function () {
  const { CLASSES_SOCIALES, CANDIDATS, THEMES } = window.AGORA_DATA;
  const { classerProfil, SEUILS_NIVEAU_DE_VIE, SEUILS_CLASSIFICATION } = window.AGORA_SIMULATEUR;
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
        <div class="score-personnalise score-personnalise--vide">
          Score personnalisé non calculable — aucune mesure recensée sur vos thèmes prioritaires pour ce candidat
        </div>
      `;
    }
    const { scoreGlobal, themesCouverts, themesPonderes } = resultat;
    const width = scoreToWidth(scoreGlobal);
    const side = scoreGlobal >= 0 ? "positif" : "negatif";
    const avertissement =
      themesCouverts < themesPonderes
        ? `<div class="score-personnalise__avertissement">Estimation basée sur une partie seulement de vos priorités : à interpréter avec prudence.</div>`
        : "";
    return `
      <div class="score-personnalise">
        <div class="score-personnalise__tete"><span class="score-personnalise__label">Score personnalisé selon vos priorités</span><span class="score-personnalise__valeur">${scoreGlobal > 0 ? "+" : scoreGlobal < 0 ? "−" : ""}${Math.abs(scoreGlobal).toFixed(1)} / 2</span></div>
        <div class="ledger__track" role="img" aria-label="Score personnalisé ${scoreGlobal.toFixed(1)} sur une échelle de -2 à 2, ${themesCouverts} sur ${themesPonderes} thèmes prioritaires couverts">
          <div class="ledger__axis"></div>
          <div class="ledger__fill ${side}" style="width:${width}%"></div>
        </div>
        <div class="score-personnalise__couverture">${themesCouverts}/${themesPonderes} thème${themesPonderes > 1 ? "s" : ""} prioritaire${themesPonderes > 1 ? "s" : ""} couvert${themesCouverts > 1 ? "s" : ""}</div>
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


  // Candidats sans mesure sur les thèmes prioritaires : regroupés dans un volet repliable mais toujours
  // listés (aucun candidat n'est jamais retiré du classement).
  function renderNonCalculables(liste, adjectif, ouvert) {
    if (!liste.length) return "";
    const n = liste.length;
    return `
      <details class="non-calculables"${ouvert ? " open" : ""}>
        <summary>${n} autre${n > 1 ? "s" : ""} candidat${n > 1 ? "s" : ""} : score non calculable</summary>
        <p>Aucune mesure n'est recensée pour ces candidats sur ${adjectif} thèmes prioritaires : aucun score ne peut être calculé, et ce n'est ni un bon ni un mauvais résultat.</p>
        <ul>${liste.map((c) => `<li>${c.nom} <span>· ${c.parti}</span></li>`).join("")}</ul>
      </details>
    `;
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
    const calculables = classement.filter((c) => resultatsParId[c.id].scoreGlobal !== null);
    const nonCalculables = classement.filter((c) => resultatsParId[c.id].scoreGlobal === null);
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
          Tous les candidats restent listés ci-dessous : ceux dont le score est calculable dans l'ordre de correspondance, les autres regroupés en fin de liste.
        </p>
        <ol style="list-style:none; padding:0; display:flex; flex-direction:column; gap:16px;">
          ${calculables.map((candidat, i) => `
            <li style="${i === 0 && aUneCorrespondance ? "" : "opacity:0.8;"}">
              <div style="margin-bottom:6px;">
                <span class="font-display">${i + 1}. ${candidat.nom}</span>
                <span class="classement__parti">${candidat.parti}</span>
              </div>
              ${renderScorePersonnalise(resultatsParId[candidat.id])}
            </li>
          `).join("")}
        </ol>
        ${renderNonCalculables(nonCalculables, "vos", calculables.length === 0)}

        <div class="partage" id="partage">
          <button type="button" class="partage__btn partage__btn--primaire mono" id="btn-ouvrir-partage">
            Partager mon résultat
          </button>
          <p class="partage__note">
            Facultatif, et entièrement dans votre navigateur. Seuls votre catégorie sociale et vos priorités
            figurent sur la carte : jamais votre revenu, votre âge ni votre patrimoine.
          </p>
          <div class="partage__panneau" id="partage-panneau" hidden>
            <canvas id="partage-canvas" class="partage__canvas" role="img"
              aria-label="Carte de résultat : ma catégorie sociale, mes priorités et le classement complet des candidats selon ces priorités"></canvas>
            <p class="partage__note">
              La carte montre le classement complet et précise que ce n'est pas une recommandation de vote.
            </p>
            <div class="partage__actions">
              <button type="button" class="partage__btn partage__btn--primaire mono" id="btn-partage-natif" hidden>Partager</button>
              <button type="button" class="partage__btn mono" id="btn-partage-lien">Copier le lien</button>
              <button type="button" class="partage__btn mono" id="btn-partage-image">Télécharger l'image</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  const TEXTE_PARTAGE =
    "Voici ce que donne le comparateur Mon Choix 2027 pour ma situation et mes priorités. À toi d'essayer :";

  function lienPartage(classeActive) {
    const base = window.location.href.split("?")[0].replace(/[^/]*$/, "");
    return `${base}resultat.html?${window.AGORA_PARTAGE.encoderPartage(classeActive, poidsThemes)}`;
  }

  function canvasEnBlob(canvas) {
    return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  }

  function initPartage(classeActive) {
    const btnOuvrir = document.getElementById("btn-ouvrir-partage");
    if (!btnOuvrir) return; // pas de priorités indiquées : rien à partager

    const panneau = document.getElementById("partage-panneau");
    const canvas = document.getElementById("partage-canvas");
    const btnNatif = document.getElementById("btn-partage-natif");
    const btnLien = document.getElementById("btn-partage-lien");
    const btnImage = document.getElementById("btn-partage-image");

    btnOuvrir.addEventListener("click", async () => {
      btnOuvrir.hidden = true;
      panneau.hidden = false;
      if (typeof navigator.share === "function") btnNatif.hidden = false;
      // Les polices du site doivent être chargées avant de dessiner, sinon le texte sort en police de secours.
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      window.AGORA_PARTAGE.dessinerCarte(canvas, classeActive, poidsThemes);
    });

    btnLien.addEventListener("click", async () => {
      const lien = lienPartage(classeActive);
      try {
        await navigator.clipboard.writeText(lien);
        btnLien.textContent = "Lien copié ✓";
        setTimeout(() => (btnLien.textContent = "Copier le lien"), 2500);
      } catch (e) {
        window.prompt("Copiez ce lien :", lien);
      }
    });

    btnImage.addEventListener("click", async () => {
      const blob = await canvasEnBlob(canvas);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mon-choix-2027.png";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });

    btnNatif.addEventListener("click", async () => {
      const lien = lienPartage(classeActive);
      try {
        const fichier = new File([await canvasEnBlob(canvas)], "mon-choix-2027.png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [fichier] })) {
          await navigator.share({ files: [fichier], text: `${TEXTE_PARTAGE} ${lien}` });
          return;
        }
        await navigator.share({ title: "Mon Choix 2027", text: TEXTE_PARTAGE, url: lien });
      } catch (e) {
        // Partage annulé par le visiteur : rien à faire.
      }
    });
  }

  function euros(n) {
    return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " €";
  }

  function nombre(n) {
    return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(n);
  }

  /** Volet repliable « Comment ce résultat est-il calculé ? » (miroir de components/DetailCalcul.tsx). */
  function renderDetailCalcul(r) {
    const { populaires_max: popMax, moyennes_max: moyMax, patrimoine_bump_aisees: patrimoineSeuil } = SEUILS_CLASSIFICATION;
    const classeNiveau = r.niveauDeVie < popMax ? "populaires" : r.niveauDeVie < moyMax ? "moyennes" : "aisees";
    const seuilProche =
      classeNiveau === "populaires" ? popMax
      : classeNiveau === "aisees" ? moyMax
      : (r.niveauDeVie - popMax < moyMax - r.niveauDeVie ? popMax : moyMax);
    const ecart = Math.abs(r.niveauDeVie - seuilProche);
    const ecartPct = Math.round((ecart / seuilProche) * 100);
    const auDessus = r.niveauDeVie >= seuilProche;
    const pluriel = (n, mot) => `${mot}${n > 1 ? "s" : ""}`;

    const termesUC = [
      "1 (premier adulte)",
      r.nbAdultes > 1 ? `${r.nbAdultes - 1} × 0,5 (${pluriel(r.nbAdultes - 1, "adulte")} ${pluriel(r.nbAdultes - 1, "supplémentaire")})` : null,
      r.nbEnfants14Plus > 0 ? `${r.nbEnfants14Plus} × 0,5 (${pluriel(r.nbEnfants14Plus, "enfant")} de 14 ans ou plus)` : null,
      r.nbEnfantsMoins14 > 0 ? `${r.nbEnfantsMoins14} × 0,3 (${pluriel(r.nbEnfantsMoins14, "enfant")} de moins de 14 ans)` : null,
    ].filter(Boolean);

    const lignesSeuils = [
      ["populaires", `moins de ${euros(popMax)}`],
      ["moyennes", `de ${euros(popMax)} à moins de ${euros(moyMax)}`],
      ["aisees", `${euros(moyMax)} et plus`],
    ].map(([id, libelle]) => `
        <li class="detail-calcul__seuil${id === classeNiveau ? " detail-calcul__seuil--actif" : ""}">
          ${classeInfo(id).nom} : ${libelle}${id === classeNiveau ? ' <span class="detail-calcul__repere">← votre niveau de vie</span>' : ""}
        </li>`).join("");

    let ajustement;
    if (r.bumpPatrimoine) {
      ajustement = `Votre patrimoine net déclaré atteint ${euros(patrimoineSeuil)} : un foyer des classes moyennes passe alors en classes aisées.`;
    } else if (r.estRetraiteOuInactif) {
      ajustement = `Votre statut (retraité·e, chômage, études ou autre situation sans emploi) vous place dans la catégorie « ${classeInfo("retraites").nom} » quel que soit le niveau de vie ; le niveau de vie seul vous aurait classé·e en « ${classeInfo(r.classeRevenuSecondaire).nom} ».`;
    } else {
      ajustement = `Aucun : ni le statut ni le patrimoine n'ont modifié ce classement. (Le patrimoine n'intervient que pour un foyer des classes moyennes, à partir de ${euros(patrimoineSeuil)} ; le statut seulement pour les retraité·es et inactifs·ves.)`;
    }

    return `
      <details class="detail-calcul">
        <summary>Comment ce résultat est-il calculé ?</summary>
        <ol>
          <li><strong>Revenu annuel du foyer.</strong> Votre revenu mensuel saisi, multiplié par 12 :
            <strong class="detail-calcul__valeur">${euros(r.revenuAnnuel)}</strong> par an.</li>
          <li><strong>Unités de consommation (UC).</strong> L'échelle de l'Insee pondère la composition du foyer :
            ${termesUC.join(" + ")} = <strong class="detail-calcul__valeur">${nombre(r.uc)} UC</strong>.</li>
          <li><strong>Niveau de vie.</strong> ${euros(r.revenuAnnuel)} ÷ ${nombre(r.uc)} UC =
            <strong class="detail-calcul__valeur">${euros(r.niveauDeVie)} par an et par UC</strong>.</li>
          <li><strong>Comparaison aux seuils Insee</strong> (déciles du niveau de vie, données ${SEUILS_NIVEAU_DE_VIE.annee_source}) :
            <ul class="detail-calcul__seuils">${lignesSeuils}</ul>
            <span class="detail-calcul__ecart">Votre niveau de vie est à ${euros(ecart)} (environ ${ecartPct} %)
              ${auDessus ? "au-dessus" : "en dessous"} du seuil de ${euros(seuilProche)}. Les seuils sont des repères
              statistiques : un foyer proche d'une frontière pourrait relever de l'une ou l'autre catégorie.</span></li>
          <li><strong>Ajustements.</strong> ${ajustement}</li>
        </ol>
        <p class="detail-calcul__note">La position dans la population (${r.percentile}ᵉ percentile) est estimée par
          interpolation entre les déciles de l'Insee. L'année de naissance ne sert qu'aux repères sur la retraite.
          Détail des sources : <a href="methodologie.html#simulateur">méthodologie du simulateur</a>.</p>
      </details>`;
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

        ${renderDetailCalcul(r)}

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
    initPartage(r.classePrincipale);
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

/**
 * MON CHOIX 2027 — Rendu du formulaire et du résultat du simulateur
 */

(function () {
  const { CLASSES_SOCIALES, CANDIDATS, THEMES } = window.AGORA_DATA;
  const { classerProfil, SEUILS_NIVEAU_DE_VIE, SEUILS_CLASSIFICATION } = window.AGORA_SIMULATEUR;

  const form = document.getElementById("form-simulateur");
  const resultatEl = document.getElementById("resultat-simulateur");
  const enfantsWrap = document.getElementById("bloc-enfants");
  const patrimoineWrap = document.getElementById("bloc-patrimoine");

  // Parcours unique en deux étapes : la catégorie calculée à l'étape 1 est lue par la boussole (js/boussole-ui.js).
  // Tout reste en mémoire : rien n'est envoyé, stocké ni passé dans l'adresse.
  const parcours = (window.AGORA_PARCOURS = { classe: null, aller });
  const blocs = [document.getElementById("etape-1"), document.getElementById("etape-2")];
  const pastilles = [document.getElementById("pastille-1"), document.getElementById("pastille-2")];

  function aller(n) {
    blocs.forEach((b, i) => (b.hidden = i !== n - 1));
    pastilles.forEach((p, i) => {
      p.classList.toggle("actif", i === n - 1);
      if (i === n - 1) p.setAttribute("aria-current", "step");
      else p.removeAttribute("aria-current");
    });
    window.scrollTo({ top: 0 });
    document.dispatchEvent(new CustomEvent("parcours:etape", { detail: n }));
  }
  pastilles.forEach((p, i) => p.addEventListener("click", () => aller(i + 1)));
  document.getElementById("passer-etape-2").addEventListener("click", () => {
    parcours.classe = null;
    aller(2);
  });

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

      <div class="resultat" style="margin-top:24px;">
        <div class="resultat__eyebrow">Étape 2 sur 2</div>
        <h3>Vos choix sur 22 questions</h3>
        <p>
          Votre catégorie est déterminée. Reste à indiquer vos choix entre deux propositions : le test
          mesure votre proximité avec les positions <strong>documentées</strong> des candidats, et affiche à part
          l'effet économique estimé de leurs mesures sur votre catégorie.
        </p>
        <button type="button" class="bouton-principal" id="vers-etape-2">Passer à l'étape 2 <span aria-hidden="true">→</span></button>
      </div>
    `;
    resultatEl.hidden = false;
    parcours.classe = r.classePrincipale;
    document.getElementById("vers-etape-2").addEventListener("click", () => aller(2));
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
})();

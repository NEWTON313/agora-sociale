/**
 * MON CHOIX 2027 — Étape 2 du test : la boussole (miroir de components/BoussoleForm.tsx, version Next.js).
 * Choix entre deux propositions, importance, puis proximité avec les positions DOCUMENTÉES de chaque candidat.
 * L'ordre des options A/B est tiré au hasard à chaque visite. Rien n'est envoyé ni conservé.
 * L'effet économique estimé (si la catégorie est connue) est une information distincte : il ne sert jamais au classement.
 */
(function () {
  const { QUESTIONS, SEUIL_COUVERTURE, classerBoussole, poidsThemesDepuisBoussole } = window.AGORA_BOUSSOLE;
  const { calculerScorePersonnalise } = window.AGORA_PRIORITES;
  const { THEMES } = window.AGORA_DATA;

  const racine = document.getElementById("boussole-root");
  const IMPORTANCES = [
    { v: 1, label: "Peu" },
    { v: 2, label: "Important" },
    { v: 3, label: "Essentiel" },
  ];

  const inverse = {};
  QUESTIONS.forEach((q) => (inverse[q.id] = Math.random() < 0.5));
  const reponses = {};
  let afficheResultat = false;

  const pct = (n) => `${n > 0 ? "+" : ""}${Math.round(n * 100)} %`;
  const signe = (n) => `${n > 0 ? "+" : ""}${n.toFixed(1)}`;
  const pluriel = (n, mot) => `${mot}${n > 1 ? "s" : ""}`;
  const nbReponses = () => QUESTIONS.filter((q) => reponses[q.id] && (reponses[q.id].choix || reponses[q.id].sansAvis)).length;

  function htmlQuestion(q) {
    const r = reponses[q.id] || {};
    const options = [
      { cle: "A", texte: q.a },
      { cle: "B", texte: q.b },
    ];
    if (inverse[q.id]) options.reverse();
    return `
      <li class="boussole__question" id="question-${q.id}">
        <div class="boussole__theme">${q.id}/${QUESTIONS.length} · ${q.theme}</div>
        <div class="boussole__options" role="radiogroup" aria-label="Question ${q.id}">
          ${options
            .map(
              (o) => `
            <button type="button" role="radio" aria-checked="${r.choix === o.cle}" data-q="${q.id}" data-choix="${o.cle}"
              class="boussole__option${r.choix === o.cle ? " actif" : r.sansAvis ? " estompe" : ""}">${o.texte}</button>`
            )
            .join("")}
        </div>
        <div class="boussole__bas">
          <button type="button" aria-pressed="${!!r.sansAvis}" data-q="${q.id}" data-sans-avis="1"
            class="boussole__puce${r.sansAvis ? " actif" : ""}">${r.sansAvis ? "✓ " : ""}Sans avis / ni l'un ni l'autre</button>
          ${
            r.choix
              ? `<span class="boussole__importance">Importance :
              ${IMPORTANCES.map(
                (i) =>
                  `<button type="button" aria-pressed="${r.poids === i.v}" data-q="${q.id}" data-poids="${i.v}" class="boussole__puce${r.poids === i.v ? " actif" : ""}">${i.label}</button>`
              ).join("")}</span>`
              : ""
          }
        </div>
      </li>`;
  }

  function majCompteur() {
    const n = nbReponses();
    document.getElementById("boussole-compteur").textContent = `${n} ${pluriel(n, "réponse")} sur ${QUESTIONS.length}`;
    document.getElementById("boussole-voir").disabled = n === 0;
  }

  function renderFormulaire() {
    racine.innerHTML = `
      <ol class="boussole__liste">${QUESTIONS.map(htmlQuestion).join("")}</ol>
      <div class="boussole__barre">
        <span id="boussole-compteur"></span>
        <button type="button" class="bouton-principal" id="boussole-voir">Voir ma proximité avec les candidats</button>
      </div>`;
    majCompteur();
    document.getElementById("boussole-voir").addEventListener("click", () => {
      afficheResultat = true;
      renderResultat();
      window.scrollTo({ top: 0 });
    });
  }

  function remplacerQuestion(id) {
    const q = QUESTIONS.find((x) => x.id === id);
    document.getElementById(`question-${id}`).outerHTML = htmlQuestion(q);
    majCompteur();
  }

  racine.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-q]");
    if (!btn || afficheResultat) return;
    const id = Number(btn.dataset.q);
    const r = reponses[id] || { choix: null, poids: 2, sansAvis: false };
    if (btn.dataset.choix) {
      reponses[id] = { choix: r.choix === btn.dataset.choix ? null : btn.dataset.choix, poids: r.poids, sansAvis: false };
    } else if (btn.dataset.sansAvis) {
      reponses[id] = { choix: null, poids: r.poids, sansAvis: !r.sansAvis };
    } else if (btn.dataset.poids) {
      reponses[id] = { choix: r.choix, poids: Number(btn.dataset.poids), sansAvis: r.sansAvis };
    }
    remplacerQuestion(id);
    const actif = document.querySelector(`#question-${id} [aria-pressed="true"], #question-${id} [aria-checked="true"]`);
    if (actif) actif.focus({ preventScroll: true });
  });

  /** Effet économique estimé sur la catégorie : information complémentaire, jamais utilisée pour classer. */
  function htmlEffetEco(candidat, classe, poids) {
    const r = calculerScorePersonnalise(candidat, classe, poids);
    return r.scoreGlobal === null
      ? "non calculable (aucune mesure recensée sur vos thèmes prioritaires)"
      : `${signe(r.scoreGlobal)} (${r.themesCouverts} ${pluriel(r.themesCouverts, "thème")} ${pluriel(r.themesCouverts, "couvert")} sur ${r.themesPonderes})`;
  }

  function renderResultat() {
    const classe = window.AGORA_PARCOURS.classe;
    const { classes, autres } = classerBoussole(reponses);
    const poidsEco = poidsThemesDepuisBoussole(reponses);
    const partageable = !!classe && THEMES.some((t) => poidsEco[t] > 0);

    racine.innerHTML = `
      <div class="boussole__avis">
        Ce classement mesure la <strong>proximité entre vos choix et les positions documentées</strong> des candidats
        (chacune renvoie à une source). Une position non documentée est écartée : ce n'est jamais un désaccord. Un
        candidat n'est classé qu'à partir de ${SEUIL_COUVERTURE} questions couvertes. Ce n'est pas une recommandation de vote.
        ${
          classe
            ? `À côté de chaque candidat, l'<strong>effet économique estimé sur votre catégorie</strong> est une information
               distincte (calculée avec les thèmes de vos réponses) : elle ne sert pas au classement.`
            : ""
        }
      </div>

      <h2 class="boussole__titre">Proximité avec vos choix</h2>
      ${
        classes.length === 0
          ? `<p class="boussole__vide">Aucun candidat n'a assez de positions documentées sur les questions auxquelles vous avez
             répondu pour être classé. Répondez à davantage de questions, ou consultez la liste ci-dessous.</p>`
          : `<ol class="boussole__resultats">${classes
              .map(
                (p, i) => `
            <li class="boussole__carte">
              <div class="boussole__carte-tete">
                <span class="font-display">${i + 1}. ${p.candidat.nom} <span class="classement__parti">${p.candidat.parti}</span></span>
                <strong class="font-display">${pct(p.score)}</strong>
              </div>
              <p>D'accord sur ${p.accords} ${pluriel(p.accords, "question")} sur ${p.documentees} où sa position est documentée
                (${p.documentees} sur ${p.repondues} auxquelles vous avez répondu).</p>
              ${classe ? `<p>Effet économique estimé sur votre catégorie : ${htmlEffetEco(p.candidat, classe, poidsEco)}</p>` : ""}
              <details>
                <summary>Voir le détail et les sources</summary>
                <ul>${p.details
                  .map(
                    (d) => `<li><strong>${d.accord ? "D'accord" : "Pas d'accord"}</strong> — question ${d.question} : ${d.titreMesure}.
                      <a href="${d.source}" target="_blank" rel="noopener noreferrer">Source</a></li>`
                  )
                  .join("")}</ul>
              </details>
            </li>`
              )
              .join("")}</ol>`
      }

      <details class="non-calculables"${classes.length === 0 ? " open" : ""}>
        <summary>${autres.length} autres candidats : pas assez de positions documentées</summary>
        <p>Ce n'est ni un bon ni un mauvais résultat : leurs positions sur ces questions ne sont pas (encore) documentées.
           Liste par ordre alphabétique.</p>
        <ul>${autres
          .map(
            (p) => `<li>${p.candidat.nom} <span>· ${p.documentees} ${pluriel(p.documentees, "position")} ${pluriel(p.documentees, "documentée")}${
              classe ? ` · effet économique : ${htmlEffetEco(p.candidat, classe, poidsEco)}` : ""
            }</span></li>`
          )
          .join("")}</ul>
      </details>

      <div class="boussole__liens">
        <button type="button" class="lien-bouton" id="boussole-modifier">← Modifier mes réponses</button>
        <button type="button" class="lien-bouton" id="boussole-situation">← Modifier ma situation (étape 1)</button>
        <a href="transparence.html">Comment ces positions sont établies</a>
      </div>
      ${partageable ? htmlPartage() : ""}`;

    document.getElementById("boussole-modifier").addEventListener("click", () => {
      afficheResultat = false;
      renderFormulaire();
      window.scrollTo({ top: 0 });
    });
    document.getElementById("boussole-situation").addEventListener("click", () => window.AGORA_PARCOURS.aller(1));
    if (partageable) initPartage(classe, poidsEco);
  }

  // --- Partage : seules la catégorie et les thèmes prioritaires figurent sur la carte et dans le lien
  //     (jamais le revenu, l'âge, le patrimoine ni les réponses à la boussole : ce sont des opinions politiques).
  const TEXTE_PARTAGE =
    "Voici l'effet économique estimé des mesures des candidats sur ma situation, selon mes thèmes prioritaires (Mon Choix 2027). À toi d'essayer :";

  function htmlPartage() {
    return `
      <div class="partage" id="partage">
        <button type="button" class="partage__btn partage__btn--primaire mono" id="btn-ouvrir-partage">Partager mon résultat</button>
        <p class="partage__note">
          Facultatif, et entièrement dans votre navigateur. Seuls votre catégorie sociale et vos thèmes prioritaires sont
          utilisés pour créer la carte : jamais votre revenu, votre âge, votre patrimoine ni vos réponses aux questions.
        </p>
        <div class="partage__panneau" id="partage-panneau" hidden>
          <canvas id="partage-canvas" class="partage__canvas" role="img"
            aria-label="Carte de résultat : ma catégorie sociale, mes thèmes prioritaires et l'effet économique estimé des mesures de chaque candidat sur ma catégorie, par ordre alphabétique"></canvas>
          <p class="partage__note">
            La carte montre l'effet économique estimé, par ordre alphabétique, et précise que ce n'est ni un classement
            ni une recommandation de vote. Elle n'inclut ni votre revenu, ni vos réponses, ni aucune donnée personnelle.
          </p>
          <div class="partage__actions">
            <button type="button" class="partage__btn partage__btn--primaire mono" id="btn-partage-natif" hidden>Partager</button>
            <button type="button" class="partage__btn mono" id="btn-partage-lien">Copier le lien</button>
            <button type="button" class="partage__btn mono" id="btn-partage-image">Télécharger l'image</button>
          </div>
        </div>
      </div>`;
  }

  function canvasEnBlob(canvas) {
    return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  }

  function initPartage(classe, poids) {
    const lienPartage = () => {
      const base = window.location.href.split("?")[0].replace(/[^/]*$/, "");
      return `${base}resultat.html?${window.AGORA_PARTAGE.encoderPartage(classe, poids)}`;
    };
    const btnOuvrir = document.getElementById("btn-ouvrir-partage");
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
      window.AGORA_PARTAGE.dessinerCarte(canvas, classe, poids);
    });

    btnLien.addEventListener("click", async () => {
      const lien = lienPartage();
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
      const lien = lienPartage();
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

  // Si la situation a été recalculée pendant que le résultat était affiché, on le met à jour au retour sur l'étape 2.
  document.addEventListener("parcours:etape", (e) => {
    if (e.detail === 2 && afficheResultat) renderResultat();
  });

  renderFormulaire();
})();

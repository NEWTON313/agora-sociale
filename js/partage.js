/**
 * MON CHOIX 2027 — Partage d'un résultat (miroir de lib/partage.ts, version Next.js)
 * Un résultat partagé ne contient QUE la catégorie sociale et les thèmes prioritaires :
 * jamais le revenu, la composition du foyer, l'âge, le patrimoine ni les réponses à la boussole
 * (ce sont des opinions politiques : elles ne figurent ni dans le lien ni sur la carte).
 * Les priorités sont encodées dans l'ordre de THEMES (un chiffre 0-3 par thème).
 * Ici, la carte est dessinée dans le navigateur (canvas) : aucun serveur n'intervient.
 */
(function () {
  const { CLASSES_SOCIALES, CANDIDATS_ALPHABETIQUE, THEMES } = window.AGORA_DATA;
  const { NIVEAUX_PRIORITE, poidsThemesParDefaut, calculerScorePersonnalise } = window.AGORA_PRIORITES;

  function encoderPartage(classe, poids) {
    return `classe=${classe}&p=${THEMES.map((t) => poids[t]).join("")}`;
  }

  function decoderPartage(entree) {
    const classe = CLASSES_SOCIALES.find((c) => c.id === entree.classe);
    const p = entree.p;
    if (!classe || typeof p !== "string" || p.length !== THEMES.length) return null;

    const poids = poidsThemesParDefaut();
    for (let i = 0; i < THEMES.length; i++) {
      const n = Number(p[i]);
      if (!Number.isInteger(n) || !NIVEAUX_PRIORITE.includes(n)) return null;
      poids[THEMES[i]] = n;
    }
    // Sans aucune priorité, aucun score n'est calculable : pas de résultat à partager.
    if (!THEMES.some((t) => poids[t] > 0)) return null;
    return { classe: classe.id, poids };
  }

  /** Thèmes les plus importants : niveau décroissant, puis ordre des thèmes. */
  function themesPrioritaires(poids, max) {
    return THEMES.map((t, i) => ({ t, i, n: poids[t] }))
      .filter((x) => x.n > 0)
      .sort((a, b) => b.n - a.n || a.i - b.i)
      .slice(0, max === undefined ? 3 : max)
      .map((x) => x.t);
  }

  /** Effet économique estimé par candidat, par ordre alphabétique : ce n'est pas un classement. */
  function classerCandidats(classe, poids) {
    const resultatsParId = {};
    CANDIDATS_ALPHABETIQUE.forEach((c) => {
      resultatsParId[c.id] = calculerScorePersonnalise(c, classe, poids);
    });
    return { classement: CANDIDATS_ALPHABETIQUE, resultatsParId };
  }

  const COULEURS_CLASSES = { populaires: "#3d5a78", moyennes: "#566f4d", aisees: "#7a4258", retraites: "#9c7539" };

  function retourALaLigne(ctx, texte, x, y, largeurMax, hauteurLigne) {
    let ligne = "";
    texte.split(" ").forEach((mot) => {
      const essai = ligne ? `${ligne} ${mot}` : mot;
      if (ctx.measureText(essai).width > largeurMax && ligne) {
        ctx.fillText(ligne, x, y);
        ligne = mot;
        y += hauteurLigne;
      } else {
        ligne = essai;
      }
    });
    if (ligne) ctx.fillText(ligne, x, y);
    return y;
  }

  /** Dessine la carte 1200x630 (même mise en page que l'image générée côté Next.js). */
  function dessinerCarte(canvas, classeId, poids) {
    const W = 1200;
    const H = 630;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const display = '"Space Grotesk", system-ui, sans-serif';
    const mono = '"IBM Plex Mono", ui-monospace, monospace';
    const corps = '"Source Serif 4", Georgia, serif';
    const espacer = (px) => {
      if ("letterSpacing" in ctx) ctx.letterSpacing = px;
    };

    const classe = CLASSES_SOCIALES.find((c) => c.id === classeId);
    const { classement, resultatsParId } = classerCandidats(classeId, poids);

    ctx.fillStyle = "#eceef2";
    ctx.fillRect(0, 0, W, H);
    ["#3d5a78", "#566f4d", "#7a4258", "#9c7539"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(i * (W / 4), 0, W / 4, 8);
    });

    // --- Colonne gauche : marque, catégorie, priorités, avertissement
    const xG = 56;
    ctx.fillStyle = "#1e3a5f";
    ctx.font = `700 34px ${display}`;
    ctx.fillText("Mon", xG, 90);
    const largeurMon = ctx.measureText("Mon ").width;
    ctx.fillStyle = "#7a8090";
    ctx.font = `400 34px ${display}`;
    ctx.fillText("Choix 2027", xG + largeurMon, 90);

    ctx.fillStyle = "#7a8090";
    ctx.font = `400 15px ${mono}`;
    espacer("2px");
    ctx.fillText("MA CATÉGORIE", xG, 168);
    espacer("0px");
    ctx.fillStyle = COULEURS_CLASSES[classeId];
    ctx.font = `700 46px ${display}`;
    const yFinClasse = retourALaLigne(ctx, classe.nom, xG, 222, 400, 52);

    const yPriorites = yFinClasse + 62;
    ctx.fillStyle = "#7a8090";
    ctx.font = `400 15px ${mono}`;
    espacer("2px");
    ctx.fillText("MES THÈMES PRIORITAIRES", xG, yPriorites);
    espacer("0px");
    ctx.fillStyle = "#10131a";
    ctx.font = `400 25px ${display}`;
    let yTheme = yPriorites + 38;
    themesPrioritaires(poids, 3).forEach((theme) => {
      yTheme = retourALaLigne(ctx, theme, xG, yTheme, 400, 30) + 36;
    });

    ctx.fillStyle = "#454e5e";
    ctx.font = `400 15px ${corps}`;
    retourALaLigne(
      ctx,
      "Effet économique direct estimé des mesures recensées sur ma catégorie, par ordre alphabétique — ni un classement des candidats ni une recommandation de vote.",
      xG,
      506,
      400,
      20
    );

    // --- Colonne droite : effet économique estimé, par ordre alphabétique (jamais un classement)
    const xD = xG + 400 + 52;
    const yHaut = 150;
    const hListe = 370;
    ctx.fillStyle = "#7a8090";
    ctx.font = `400 15px ${mono}`;
    espacer("2px");
    ctx.fillText("EFFET ÉCONOMIQUE ESTIMÉ SUR MA CATÉGORIE", xD, 128);
    espacer("0px");

    // Tous les candidats dont l'effet est calculable, au plus 10 sur une colonne (lignes détaillées) ou 24 sur deux
    // colonnes (lignes compactes) ; les autres sont résumés, la liste complète reste sur le site.
    const calculables = classement.filter((c) => resultatsParId[c.id].scoreGlobal !== null);
    const nonCalculables = classement.length - calculables.length;
    const nbColonnes = calculables.length > 10 ? 2 : 1;
    const parColonne = nbColonnes === 2 ? 12 : 10;
    const lignes = calculables.slice(0, parColonne * nbColonnes);
    const restants = calculables.length - lignes.length;
    const nbLignesCol = Math.min(parColonne, Math.ceil(lignes.length / nbColonnes)) || 1;
    const hauteurLigne = Math.min(60, Math.floor(hListe / nbLignesCol));
    const compact = nbColonnes === 2 || hauteurLigne < 52;
    const largeurCol = nbColonnes === 2 ? 306 : 636;
    const largeurBarre = compact ? 56 : 230;
    const largeurNom = compact ? 190 : 262;

    lignes.forEach((candidat, i) => {
      const r = resultatsParId[candidat.id];
      const col = Math.floor(i / nbLignesCol);
      const xL = xD + col * (largeurCol + 24);
      const yL = yHaut + (i % nbLignesCol) * hauteurLigne;
      const yTexte = yL + hauteurLigne / 2 + (compact ? 6 : 0);

      ctx.fillStyle = "#10131a";
      // Taille réduite pour les noms longs afin qu'ils tiennent dans leur colonne.
      let taille = compact ? 17 : 24;
      ctx.font = `700 ${taille}px ${display}`;
      while (ctx.measureText(candidat.nom).width > largeurNom - 8 && taille > 12) {
        taille -= 1;
        ctx.font = `700 ${taille}px ${display}`;
      }
      ctx.fillText(candidat.nom, xL, yTexte);
      if (!compact) {
        ctx.fillStyle = "#7a8090";
        ctx.font = `400 12px ${mono}`;
        espacer("1.2px");
        ctx.fillText(candidat.parti.toUpperCase(), xL, yTexte + 20);
        espacer("0px");
      }

      const xBarre = xL + largeurNom;
      const hBarre = compact ? 12 : 16;
      const yBarre = yL + hauteurLigne / 2 - hBarre / 2;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(xBarre, yBarre, largeurBarre, hBarre);
      ctx.strokeStyle = "#c9ced8";
      ctx.lineWidth = 1;
      ctx.strokeRect(xBarre + 0.5, yBarre + 0.5, largeurBarre - 1, hBarre - 1);
      const largeur = (Math.min(Math.abs(r.scoreGlobal) / 2, 1) * largeurBarre) / 2;
      const milieu = xBarre + largeurBarre / 2;
      ctx.fillStyle = r.scoreGlobal >= 0 ? "#326049" : "#8f382f";
      ctx.fillRect(r.scoreGlobal >= 0 ? milieu : milieu - largeur, yBarre + 1, largeur, hBarre - 2);
      ctx.fillStyle = "#10131a";
      ctx.fillRect(Math.round(milieu), yBarre - 1, 1, hBarre + 2);

      ctx.font = `700 ${compact ? 16 : 22}px ${display}`;
      ctx.fillText(`${r.scoreGlobal > 0 ? "+" : ""}${r.scoreGlobal.toFixed(1)}`, xBarre + largeurBarre + 12, yTexte);
      if (!compact) {
        ctx.fillStyle = "#7a8090";
        ctx.font = `400 13px ${display}`;
        ctx.fillText(
          `${r.themesCouverts}/${r.themesPonderes} thème${r.themesPonderes > 1 ? "s" : ""}`,
          xBarre + largeurBarre + 12,
          yTexte + 20
        );
      }
    });

    // Résumé des candidats non affichés ligne par ligne
    ctx.fillStyle = "#454e5e";
    ctx.font = `400 15px ${display}`;
    let yNote = yHaut + nbLignesCol * hauteurLigne + 28;
    if (restants > 0) {
      ctx.fillText(`+ ${restants} autre${restants > 1 ? "s" : ""} candidat${restants > 1 ? "s" : ""} (liste complète sur le site)`, xD, yNote);
      yNote += 20;
    }
    if (nonCalculables > 0) {
      ctx.fillText(`${nonCalculables} autre${nonCalculables > 1 ? "s" : ""} candidat${nonCalculables > 1 ? "s" : ""} : effet non calculable (aucune mesure recensée sur ces thèmes)`, xD, yNote);
    }

    // --- Pied de carte
    ctx.fillStyle = "#454e5e";
    ctx.font = `400 18px ${display}`;
    ctx.fillText("Comparateur citoyen et non partisan · présidentielle 2027", xG, 602);
    ctx.fillStyle = "#1e3a5f";
    ctx.font = `700 18px ${display}`;
    ctx.textAlign = "right";
    ctx.fillText("monchoix2027.com", W - 56, 602);
    ctx.textAlign = "left";
  }

  window.AGORA_PARTAGE = { encoderPartage, decoderPartage, themesPrioritaires, classerCandidats, dessinerCarte };
})();

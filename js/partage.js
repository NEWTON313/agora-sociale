/**
 * MON CHOIX 2027 — Partage d'un résultat (miroir de lib/partage.ts, version Next.js)
 * Un résultat partagé ne contient QUE la catégorie sociale et les priorités par thème :
 * jamais le revenu, la composition du foyer, l'âge ni le patrimoine saisis dans le simulateur.
 * Les priorités sont encodées dans l'ordre de THEMES (un chiffre 0-3 par thème).
 * Ici, la carte est dessinée dans le navigateur (canvas) : aucun serveur n'intervient.
 */
(function () {
  const { CLASSES_SOCIALES, CANDIDATS, THEMES } = window.AGORA_DATA;
  const { NIVEAUX_PRIORITE, poidsThemesParDefaut, calculerScorePersonnalise, trierParScorePersonnalise } =
    window.AGORA_PRIORITES;

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

  function classerCandidats(classe, poids) {
    const resultatsParId = {};
    CANDIDATS.forEach((c) => {
      resultatsParId[c.id] = calculerScorePersonnalise(c, classe, poids);
    });
    return { classement: trierParScorePersonnalise(CANDIDATS, resultatsParId), resultatsParId };
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
    ctx.fillText("MES PRIORITÉS", xG, yPriorites);
    espacer("0px");
    ctx.fillStyle = "#10131a";
    ctx.font = `400 25px ${display}`;
    let yTheme = yPriorites + 38;
    themesPrioritaires(poids, 3).forEach((theme) => {
      yTheme = retourALaLigne(ctx, theme, xG, yTheme, 400, 30) + 36;
    });

    ctx.fillStyle = "#454e5e";
    ctx.font = `400 16px ${corps}`;
    retourALaLigne(
      ctx,
      "Score calculé d'après mes priorités et les mesures recensées — ce n'est pas une recommandation de vote.",
      xG,
      528,
      400,
      22
    );

    // --- Colonne droite : classement complet
    const xD = xG + 400 + 52;
    ctx.fillStyle = "#7a8090";
    ctx.font = `400 15px ${mono}`;
    espacer("2px");
    ctx.fillText("CORRESPONDANCE AVEC MES PRIORITÉS", xD, 128);
    espacer("0px");

    const largeurBarre = 230;
    const xBarre = xD + 34 + 262;
    classement.forEach((candidat, i) => {
      const r = resultatsParId[candidat.id];
      const yBase = 182 + i * 66;

      ctx.fillStyle = "#7a8090";
      ctx.font = `700 26px ${display}`;
      ctx.fillText(String(i + 1), xD, yBase + 8);

      ctx.fillStyle = "#10131a";
      ctx.font = `700 24px ${display}`;
      ctx.fillText(candidat.nom, xD + 34, yBase + 2);
      ctx.fillStyle = "#7a8090";
      ctx.font = `400 12px ${mono}`;
      espacer("1.2px");
      ctx.fillText(candidat.parti.toUpperCase(), xD + 34, yBase + 22);
      espacer("0px");

      if (r.scoreGlobal === null) {
        ctx.fillStyle = "#7a8090";
        ctx.font = `italic 400 18px ${corps}`;
        ctx.fillText("non calculable", xBarre, yBase + 8);
        return;
      }

      const yBarre = yBase - 8;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(xBarre, yBarre, largeurBarre, 16);
      ctx.strokeStyle = "#c9ced8";
      ctx.lineWidth = 1;
      ctx.strokeRect(xBarre + 0.5, yBarre + 0.5, largeurBarre - 1, 15);
      const largeur = (Math.min(Math.abs(r.scoreGlobal) / 2, 1) * largeurBarre) / 2;
      const milieu = xBarre + largeurBarre / 2;
      ctx.fillStyle = r.scoreGlobal >= 0 ? "#326049" : "#8f382f";
      ctx.fillRect(r.scoreGlobal >= 0 ? milieu : milieu - largeur, yBarre + 1, largeur, 14);
      ctx.fillStyle = "#10131a";
      ctx.fillRect(Math.round(milieu), yBarre - 1, 1, 18);

      ctx.font = `700 22px ${display}`;
      ctx.fillText(`${r.scoreGlobal > 0 ? "+" : ""}${r.scoreGlobal.toFixed(1)}`, xBarre + largeurBarre + 14, yBase + 2);
      ctx.fillStyle = "#7a8090";
      ctx.font = `400 13px ${display}`;
      ctx.fillText(
        `${r.themesCouverts}/${r.themesPonderes} thème${r.themesPonderes > 1 ? "s" : ""}`,
        xBarre + largeurBarre + 14,
        yBase + 21
      );
    });

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

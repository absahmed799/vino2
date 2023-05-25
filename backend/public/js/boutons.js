window.addEventListener("load", function () {
  let btnAjouterList = document.querySelectorAll(".btnAjouter");
  let btnBoireList = document.querySelectorAll(".btnBoire");

  btnAjouterList.forEach(function (btnAjouter) {
    btnAjouter.addEventListener("click", function () {
      ajouterBouteilleQt(btnAjouter);
    });
  });

  btnBoireList.forEach(function (btnBoire) {
    btnBoire.addEventListener("click", function () {
      boireBouteilleQt(btnBoire);
    });
  });
});

/**
 * Mettre a jour la quantité de bouteille dans le cellier
 */

function ajouterBouteilleQt(btn) {
  let bouteille = btn.closest(".bouteille");
  let quantiteElem = bouteille.querySelector(".quantite-valeur");
  let quantite = parseInt(quantiteElem.innerHTML);
  quantite++;
  quantiteElem.innerHTML = quantite;
}


function boireBouteilleQt(btn) {
  let bouteille = btn.closest(".bouteille");
  let quantiteElem = bouteille.querySelector(".quantite-valeur");
  let quantite = parseInt(quantiteElem.innerHTML);
  if (quantite > 0) {
    quantite--;
  }
  quantiteElem.innerHTML = quantite;
}

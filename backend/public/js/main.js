/**
 * @file Script contenant les fonctions de base
 */

// **********************************************************
// NE EFFACER PAS BaseURL, UTILISE COMMENT OU UNCOMMENT !!!

const BaseURL = "http://localhost/vinos_one/";
//const BaseURL = document.baseURI;
//const BaseURL = "http://localhost/vino_web2/";

// **********************************************************

console.log(BaseURL);
window.addEventListener("load", function () {
  console.log("load");
  document.querySelectorAll(".btnBoire").forEach(function (element) {
    //console.log(element);
    element.addEventListener("click", function (evt) {
      let id = evt.target.parentElement.dataset.id;
      let requete = new Request(
        BaseURL + "index.php?requete=boireBouteilleCellier",
        { method: "POST", body: '{"id": ' + id + "}" }
      );

      fetch(requete)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Erreur");
          }
        })
        .then((response) => {
          console.debug(response);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });

  document.querySelectorAll(".btnAjouter").forEach(function (element) {
    console.log(element);
    element.addEventListener("click", function (evt) {
      let id = evt.target.parentElement.dataset.id;
      let requete = new Request(
        BaseURL + "index.php?requete=ajouterBouteilleCellier",
        { method: "POST", body: '{"id": ' + id + "}" }
      );

      fetch(requete)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Erreur");
          }
        })
        .then((response) => {
          console.debug(response);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });

  let inputNomBouteille = document.querySelector("[name='nom_bouteille']");
  console.log(inputNomBouteille);
  let liste = document.querySelector(".listeAutoComplete");

  if (inputNomBouteille) {
    inputNomBouteille.addEventListener("keyup", function (evt) {
      console.log(evt);
      let nom = inputNomBouteille.value;
      liste.innerHTML = "";
      if (nom) {
        // let requete = new Request(BaseURL+"index.php?requete=autocompleteBouteille", {method: 'POST', body: '{"nom": "'+nom+'"}'});
        let requestBody = { nom: nom };
        let requete = new Request(
          BaseURL + "index.php?requete=autocompleteBouteille",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          }
        );
        //console.log(requete); // debug
        fetch(requete)
          .then((response) => {
            console.log(response);

            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error("Erreur");
            }
          })
          .then((data) => { // <-- change le nom du parametre
            console.log(data.data);

            data.forEach(function (element) { // <-- use lethe stored data
              liste.innerHTML +=
                "<li data-id='" + element.id + "'>" + element.nom + "</li>";
            });
          })
          .catch((error) => {
            console.error(error);
          });

      }
    });

    let bouteille = {
      nom: document.querySelector(".nom_bouteille"),
      millesime: document.querySelector("[name='millesime']"),
      quantite: document.querySelector("[name='quantite']"),
      date_achat: document.querySelector("[name='date_achat']"),
      prix: document.querySelector("[name='prix']"),
      garde_jusqua: document.querySelector("[name='garde_jusqua']"),
      notes: document.querySelector("[name='notes']"),
    };

    liste.addEventListener("click", function (evt) {
      console.dir(evt.target);
      if (evt.target.tagName == "LI") {
        bouteille.nom.dataset.id = evt.target.dataset.id;
        bouteille.nom.innerHTML = evt.target.innerHTML;

        liste.innerHTML = "";
        inputNomBouteille.value = "";
      }
    });

    let btnAjouter = document.querySelector("[name='ajouterBouteilleCellier']");
    if (btnAjouter) {
      btnAjouter.addEventListener("click", function (evt) {

        var param = {
          id_bouteille: bouteille.nom.dataset.id,
          date_achat: bouteille.date_achat.value,
          garde_jusqua: bouteille.garde_jusqua.value,
          notes: bouteille.notes.value,
          prix: bouteille.prix.value,
          quantite: bouteille.quantite.value,
          millesime: bouteille.millesime.value,
        };
        let requete = new Request(
          BaseURL + "index.php?requete=ajouterNouvelleBouteilleCellier",
          { method: "POST", body: JSON.stringify(param) }
        );
        if (validation(bouteille)) {
          fetch(requete)
            .then((response) => {
              if (response.status === 200) {
                return response.json();
              } else {
                throw new Error("Erreur");
              }
            })
            .then((response) => {
              console.log(response);
              console.log('bouteille ajouter');
              window.location.href = BaseURL;

            })
            .catch((error) => {
              console.error(error);
            });
        }

      });
    }



    let btnModifer = document.querySelector("[name='modifierBouteilleCellier']");
    if (btnModifer) {
      btnModifer.addEventListener("click", function (evt) {
        console.log('click modifier');
        let id = document.querySelector("[name='id']");
//        console.log(id.value);
        var param = {
          id: id.value,
          date_achat: bouteille.date_achat.value,
          garde_jusqua: bouteille.garde_jusqua.value,
          notes: bouteille.notes.value,
          prix: bouteille.prix.value,
          quantite: bouteille.quantite.value,
          millesime: bouteille.millesime.value,
        };
        let requete = new Request(
          BaseURL + "index.php?requete=modifierBouteilleCellier",
          { method: "POST", body: JSON.stringify(param) }
        );
//        console.log(requete);
        if (validation(bouteille)) {
          fetch(requete)
            .then((response) => {
  //            console.log(response);
              if (response.status === 200) {
                return response.json();
              } else {
                throw new Error("Erreur");
              }
            })
            .then((response) => {
        //      console.log(response);
              window.location.href = BaseURL;
            })
            .catch((error) => {
              console.error(error);
            });
        }

      });
    }
  }
});


function validation(bouteille) {
  let elNom = document.querySelector('[data-js-nom]')
  let isValid = true;
  if (bouteille.nom.textContent === "") {
    isValid = false;
    elNom.classList.add('error')
  } else {
    elNom.classList.remove('error')
  }

  const millesimeRegex = /^\d{4}$/;
  const date_achat_annee = parseInt(bouteille.date_achat.value.split('-')[0]);

  if (bouteille.millesime.value === "" || !millesimeRegex.test(bouteille.millesime.value) || parseInt(bouteille.millesime.value) > date_achat_annee) {
    isValid = false;
    bouteille.millesime.classList.add('error');
  } else {
    bouteille.millesime.classList.remove('error');
  }

  const quantiteRegex = /^[1-9]\d{0,5}$/;
  if (bouteille.quantite.value === "" || !quantiteRegex.test(bouteille.quantite.value)) {
    isValid = false;
    bouteille.quantite.classList.add('error')
  } else {
    bouteille.quantite.classList.remove('error')
  }

  if (bouteille.date_achat.value === "") {
    isValid = false;
    bouteille.date_achat.classList.add('error')
  } else {
    bouteille.date_achat.classList.remove('error')
  }

  const prixRegex = /^\d+(\.\d{1,2})?$/;
  if (bouteille.prix.value === "" || !prixRegex.test(bouteille.prix.value)) {
    isValid = false;
    bouteille.prix.classList.add('error')
  } else {
    bouteille.prix.classList.remove('error')
  }

  const gardeRegex = /^\d{4}$/;
  if (bouteille.garde_jusqua.value === "" || !gardeRegex.test(bouteille.garde_jusqua.value) || parseInt(bouteille.garde_jusqua.value) < date_achat_annee) {
    isValid = false;
    bouteille.garde_jusqua.classList.add('error')
  } else {
    bouteille.garde_jusqua.classList.remove('error')
  }

  
  if (bouteille.notes.value.value === "") {
    isValid = false;
    bouteille.notes.classList.add('error')
  } else {
    bouteille.notes.classList.remove('error')
  }


  return isValid
}



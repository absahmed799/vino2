# Projet Web 2: Vino 🍷

Gestionnaire des bouteilles de vin à partir d’une application Web.

### 🔧 Outils de base

 * Laravel 9 LTS (backend)
 * Angular.io (frontend)

---

➡️ NOTE: Veuillez suivre les étapes suivantes pour configurer le projet sur votre machine.

# ⌨️ Liste des commandes Git:

### Serveur distant
Pour définir un alias identifiant le serveur distant
git remote add vino2 https://github.com/absahmed799/vino2.git
git remote -v // voir la liste des alias de serveur distant
git push vino2 main // pousser mon dernier commit vers la branche main du dépôt distant 41e
git pull vino2 main // récupérer la dernière version de notre dépôt

### Création d'un dépôt
- Initialise un dépôt vide, cette commande est exécuté une seule fois
- Si on l'exécute une deuxième fois on détruit le dépôt
- `git init`

### Vérifier le statut 
- `git status`

### Naviguer dans les branches
- Pour changer le nom d'une branche
    - `git branch -m «nom nouvelle branche»`
    - `git branch -m main`  // change le nom de la branche courante pour main
- Pour créer une nouvelle branche
    - `git branch « nouvelle branche »`
- Pour changer de branch 
    - `git checkout « la branche »`
    - On ne peut pas changer de branche si la branche courante n'a pas été «commit» valider 
    - `git checkout « id du commit »`
    - `git checkout « étiquette du commit »`   

### Serveur distant
- Pour définir un alias identifiant le serveur distant
    - `git remote add vino2 https://github.com/absahmed799/vino2.git`
    - `git remote -v` // voir la liste des alias de serveur distant
    - `git push vino2 main` // pousser mon dernier commit vers la branche main du dépôt distant 41e
    - `git pull vino2 main` // récupérer la dernière version de notre dépôt

### ⚠️ Cloner le projet Angular :
*Pas necessaire si "git remote add" a été fait!!!*

Cloner ce projet
```sh
$ git clone https://github.com/absahmed799/vino2.git
```
 
### Configuration du projet Angular :
Ouvrez un terminal ou une invite de commande et allez dans angular-module (dossier "frontend")
```sh
$ cd vino2/frontend
```

Installer les dépendances node
```sh
$ npm install
```

Lancer le serveur Angular (Facultatif : requis uniquement pendant le développement)
```sh
$ ng serve
```
⚠️⚠Ne fermez pas ce terminal!!!

Vérifiez si cela fonctionne dans le navigateur (Facultatif : requis uniquement pendant le développement front-end)

[http://localhost:4200](http://localhost:4200/)



Ouvrez un nouveau terminal et construisez le projet dans le répertoire public de "backend". (Ne manquez pas le slash final)
```sh
$ ng build --base-href http://localhost:8000/app/
```
Note à retenir : Dans le cas où vous exécuteriez "ng serve" plus tard, la construction finale à l'intérieur du dossier laravel-module/public/app/ sera supprimée. Donc, assurez-vous de reconstruire le projet si cela se produit.


### Configuration du projet Laravel :

Ouvrez un nouveau terminal et allez dans laravel-module (dossier "backend")
```sh
$ cd /backend
```

Installer les dépendances composer
```sh
$ composer install
```

Créer un fichier .env et copier le contenu de .env.example dedans
```sh
$ cp .env.example .env
```


Modifier les informations d'identification de la base de données dans les fichiers .env
```
DB_DATABASE = votre_nom_de_base_de_données (vino2db)
DB_USERNAME = votre_nom_utilisateur_de_base_de_données (root)
DB_PASSWORD = votre_mot_de_passe_de_base_de_données (root)
```

Générer les clés d'application
```sh
$ php artisan key:generate
```

Lancer la migration de la base de données
```sh
$ php artisan migrate
```

Lancer le serveur Angular
```sh
$ php artisan serve
```


🌐 Vérifiez si cela fonctionne dans le navigateur

[http://localhost:8000](http://localhost:8000/)


Créez votre premier utilisateur à partir de la page d'inscription

[http://localhost:8000/register](http://localhost:8000/register)


🎉 Félicitations, vous avez réussi à configurer le projet. La commande suivante est la commande la plus importante que vous voudrez peut-être utiliser à maintes reprises après toute modification dans Angular.
Alors, assurez-vous de copier cette commande dans un endroit sûr.
Pendant la production, vous devrez changer l'URL en fonction de votre URL avec un préfixe /app/
```sh
$ ng build --base-href http://localhost:8000/app/
```

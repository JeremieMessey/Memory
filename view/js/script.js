window.addEventListener("DOMContentLoaded", function(event){

	let result ='';
	let once = 0; //pour executer une seule fois la abrre de progression

	//récupération de la div qui contientra les cartes:
	let plateauDeJeu = document.getElementById("plateauDeJeu");

	//Déclaration d'un tableau avec les différents choix possibles:
	let tableauCartes = ['pommeRouge', 'banane', 'orange', 'citronVert', 'papaye', 'abricot', 'citronJaune', 'fraise', 'pommeVerte', 'peche', 'raisin', 'pasteque', 'prune', 'poire', 'cerise', 'framboise', 'mangue', 'groseille'];
	//Ici je concatène le tableau des cartes avec lui même pour doubler les cartes
	tableauCartes = tableauCartes.concat(tableauCartes);
	let nombreCartes = tableauCartes.length;
	//--------------------------------------------------------------------
	//Affichage des cartes dans le Plateau de jeu :

	//pour modifier la position du background de l'image pour affiche le fruit correspondant
	let positionBackground = 0;

	for( var i = 0; i < (nombreCartes); i++ ){

		let image = "<div class='image "+tableauCartes[i]+"' style='background-position-y:"+positionBackground+"px'></div>";

		//on enleve 100 pour position le background au bon endroit pour avoir la bonne image
		positionBackground -= 100;

		result += image; //On stocke la nouvelle image dans la variable result
	}

	//On récupère le fichier courant dans l'URL
	let pageCourante = window.location.href;

 	if( pageCourante == 'http://localhost/MemoryGame/?op=game' ){ //SI on se trouve dans le fichier "jeu.php"

		plateauDeJeu.innerHTML = result;//on affiche dans le plateau de jeu les images
	}
	//--------------------------------------------------------------------

	//Initialisation du jeu:
	let tempsDepart;
	let tempsFin;
	let dureeJeu;
	let temps;
	let tempsPhrase;
	let carteVisible = false;
	let plateauVerouille = false;
	let premiereCarte;
	let deuxiemeCarte;
	let choixCorrect = 0;
	let cartes = document.querySelectorAll('.image');
	let btnRejouer = document.getElementById('rejouer');
	let resultatJeu = document.getElementById('resultat');

	//barre de progression
	let progressBarre = document.getElementById("laBarre");
	let largeur = 0;
	let avancee; //anvancée de la progress bar

	//--------------------------------------------------------------------
	//fonction auto appelante pour mélanger les cartes:
	(function shuffle() {

	  	cartes.forEach( function(carte) {

	  		//Nombre alétoire entre 0 et 36
	    	let randomPos = Math.floor(Math.random() * 36);
	    	//on a joute la classe 'cache' aux cartes
	    	carte.classList.add('cache');
	    	//on leur applique la propriété order pour les afficher dans un ordre aléatoire
	    	carte.style.order = randomPos;
	  	});
	})();

	//Pour chaque carte, on déclenchera la fonciton "choixCarte()" au clic  
	cartes.forEach( function(carte){

		if( carte.classList.contains("cache") ){

			carte.addEventListener('click', choixCarte );
		}
	});
	//--------------------------------------------------------------------
	//Fonction pour retourner une carte:	
	function choixCarte(){ 

		//Déclenche la barre de progression UNE SEULE FOIS
	  	if( once == 0 ){
	  		//Temps au départ du jeu: (en milliseconde)
	  		tempsDepart = new Date();

			laBarre();
		}
		//Si la variable vos "true" on stoppe la fonction;
		if (plateauVerouille) return;

		if (this === premiereCarte) return;  // A TESTER

	  	this.classList.remove('cache');

		//SI la variable est différente de "false"
		if (!carteVisible) {

			carteVisible = true; //La carte est visible : "true"
			premiereCarte = this; 
			valeurPremiereCarte = this.className.slice(6);
			//On utilise slice pour supprimer la classe 'image' de ce que l'on a récupéré
			return; //Et on quitte la fonction
		}

	  	deuxiemeCarte = this; 
	  	valeurDeuxiemeCarte = this.className.slice(6);

	  	//On appel la fonction pour comparer les choix:
	  	comparaison( valeurPremiereCarte, valeurDeuxiemeCarte, premiereCarte, deuxiemeCarte );
	}
	//--------------------------------------------------------------------
	//Fonction pour comparer les 2 cartes choisies:
	function comparaison( valeurChoix1, valeurChoix2, elementChoix1, elementChoix2 ) {

		//SI les choix1 et choix2 sont égaux:
	  	if( valeurChoix1 === valeurChoix2){

	  		afficheCarteTrouvee( valeurChoix2 ); //on laisse les cartes affichees
		}
		else{
			carteRetourne(); //On retourne les cartes
		}
	}
	//--------------------------------------------------------------------
	//Fonction pour laisser afficher les paires de cartes trouvées
	function afficheCarteTrouvee( paireTrouvee ) {

	  	choixCorrect++; //on rajoute +1 au nombre de paires trouvees

		let recupCarte = document.getElementsByClassName(paireTrouvee);

		for( var i = 0; i < recupCarte.length; i++ ){

			recupCarte[i].classList.remove('cache');
	 		recupCarte[i].removeEventListener('click', choixCarte);
		}

	  	//SI toutes les paires ont été trouvées 
	  	if(choixCorrect==18){

			//temps de fin de jeu: (en milliseconde)
			tempsFin = new Date();
			//Difference en seconde :
			dureeJeu = (tempsFin - tempsDepart);
			temps = new Date(dureeJeu);
			lesTemps = formatHeure(temps);

			//on stope la barre de progression
			clearInterval(avancee);

			//on affiche un message "gagné" et le temps réalisé
			resultatJeu.innerHTML = "<p class='gagne'>Vous avez gagné !<br> Vous avez terminé en "+ lesTemps[1]+"</p>";

			//déclenchement de la fonction rejouer au bout de 2secondes
			setTimeout( function(){

				finDuJeu();
			},2000 );
		}
		recharger();
	}
	//-----------------------------------------
	//Fonction pour les cartes face visible :
	function carteRetourne() {
	  	plateauVerouille = true;

	  	setTimeout(function(){

	  		premiereCarte.classList.add('cache');
	    	deuxiemeCarte.classList.add('cache');

			recharger();
	  	}, 500);
	}

	//--------------------------------------------------------------------
	//Fonction pour réinitialiser les variables
	function recharger(){

	    carteVisible = false;
		plateauVerouille = false;
		premiereCarte = null;
		deuxiemeCarte = null;
	}
	//--------------------------------------------------------------------
	//Fonction pour permettre de rejouer
	function finDuJeu(){

		window.location.replace("http://localhost/MemoryGame/?op=endgame&time="+lesTemps[0]);
	}
	//--------------------------------------------------------------------
	//Fonction pour permettre de rejouer (recharge la page)
	function rejouer(){

		window.location.replace("http://localhost/MemoryGame/?op=game");
	}
	//--------------------------------------------------------------------
	//Fonction pour déclencher la barre de progression
	function laBarre(){

		avancee = setInterval(progression, 1800);
		once++; //On rajoute +1 à la variable pour que la fonction ne s'exécute qu'une seule fois

		function progression(){
			if (largeur < 100){
				largeur++;
            	progressBarre.style.transition = 'width ease-out 2.1s';
				progressBarre.style.width = largeur + '%';
			}else{
				//On stoppe l'appel de la fonction de la barre de progression
				clearInterval(avancee);

				//on affiche le bouton rejouer:
				btnRejouer.style.display = 'block';
				//Si on clique sur le bouton, on recharge la page
				btnRejouer.addEventListener( 'click', rejouer);

				//On affiche un message "perdu"
				resultatJeu.innerHTML = "<p class='perdu'>Le temps est écoulé !<br> Vous avez perdu !</p>";
			}
		}
	}
	//--------------------------------------------------------------------
	//fonction pour formater l'heure
	function formatHeure(temps){
		let minute = temps.getMinutes();
		let seconde = temps.getSeconds();

		let min = (minute <= "1") ? "minute" : "minutes";
		let sec = (seconde <= "1") ? "seconde" : "secondes";

		temps = '00:'+minute+':'+seconde;
		tempsPhrase = minute+' '+min+' '+seconde+' '+sec;
		let tabTemps = [temps, tempsPhrase];
		return tabTemps;
	}
});
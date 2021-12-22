<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<title><?= $title ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
	<!-- Lien CSS perso -->
	<link rel="stylesheet" href="view/css/style.css">
</head>
	<body>
		<header>
			<h1 id="test"><a href="http://localhost/MemoryGame/">Jeu de mémoire</a></h1>
		</header>
		<main>
			<?= $content ?>
		</main>
		<!-- Script Javascript perso -->
		<script src="view/js/script.js"></script>
    </body>
</html>
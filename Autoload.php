<?php
//L'autoload permet d'inclure les bons fichier lors d'une instanciation.
class Autoload{

    public static function className($className){
		require __DIR__ . '/' . str_replace('\\','/',$className) . '.php';
    }
}
spl_autoload_register(array('Autoload', 'className'));
//spl_autoload_register() : permet d'exécuter une fonction (ici, className) lorsque l'interpreteur voit passer un 'new' (=instanciation) dans le code.
//Lors d'une instanciation, le nom a coté du 'new' (donc le nom de la classe à instancier) est récupéré et transmis automatiquement à la fonction className()
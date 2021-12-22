<?php
// Le Controller général de l'application.
// Il permet d'appeler des repository et contient notamment la méthode render() qui affiche un rendu à l'écran.
namespace controller;

class Controller 
{
    private $db;
    //---------------------- Constructeur : 
    public function __construct() {
		if(!file_exists(('app/config.xml'))) $this->run();
		else $this->db = new \model\EntityRepository;
    }
    //----------------------  Affichage :
    public function handleRequest() {
        $op = isset($_GET['op']) ? $_GET['op'] : "score";
        try {
            if ( $op == 'game') $this->selectGame();
            elseif( $op =="endgame" ) $this->insertScore($_GET['time']);
            elseif($op == 'score') $this->selectAll();
        } catch ( Exception $e ) {
             throw new Exception($e->getMessage());
        }
    }
    //---------------------- Selection complète :
    public function selectAll() {
       $this->render('layout.php', 'score.php', array(
			'title' => 'Score Memory',
			'scores' => $this->db->selectAll()
		));
    }
    //---------------------- Selection/Affichage jeu :
    public function selectGame() {
       $this->render('layout.php', 'jeu.php', array(
            'title' => 'Jeu Memory'
        ));
    }
    //---------------------- Enregistrement temps de jeu :
    public function insertScore($time) {
       $this->render('layout.php', 'ajax.php', array(
            'title' => 'Jeu Memory',
            'insertScore' => $this->db->insert($time)
        ));
    }
    //---------------------- View :
	public function render($layout, $template, $parameters = array())
	{
		extract($parameters);
        ob_start();
			require "view/$template";
        $content = ob_get_clean();
        ob_start(); 
			require "view/$layout"; 
        return ob_end_flush(); 
	}
    //---------------------- View :
    public function run() {}
}
?>
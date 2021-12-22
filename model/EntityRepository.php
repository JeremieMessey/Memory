<?php
// 	Un repository centralise tout ce qui touche à la récupération de vos entités. 
// Contient et peut exécuter toutes les requêtes SQL sans connaitre le contexte. 
namespace model;

class EntityRepository
{
    private $db;
    public $table;
    public function __construct(){}
    //------------------------------------------------
    //methode pour la connexion à la BDD
    public function getDb()
    {
        if(!$this->db)
		{
			try{
				$xml = simplexml_load_file('app/config.xml');
				$this->table = $xml->table;
				try{
					$this->db = new \PDO("mysql:dbname=" . $xml->db . ";host=" . $xml->host, $xml->user,  $xml->password, array(\PDO::ATTR_ERRMODE=>\PDO::ERRMODE_EXCEPTION));
				}
				catch(\PDOException $e){
					die("probleme connexion bdd : ". $e->getMessage());
				}
			}
			catch(Exception $e){
				die('probleme fichier config xml manquant');
			}
        }
        return $this->db;
    }
    //------------------------------------------------
    //methode pour l'affichage des scores
    public function selectAll()
    {
        $q = $this->getDb()->query('SELECT date, temps, ip FROM ' . $this->table .' ORDER BY temps ASC LIMIT 10');
        $r = $q->fetchAll(\PDO::FETCH_ASSOC);		
        return $r;
    }
    //------------------------------------------------
    //methode pour l'insertion des scores
	public function insert($time)
	{
		$q = $this->getDb()->query("INSERT INTO ". $this->table . "(temps, date, ip) VALUES ('$time', NOW(), '$_SERVER[REMOTE_ADDR]') "); 
		return; 
	}
}
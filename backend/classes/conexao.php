<?php

class Database{
    

    private $db_host = ''; // nome host
    private $db_name = ''; // nome do banco de dados
    private $db_username = ''; // nome do usuario do banco
    private $db_password = ''; // senha do banco
    
    public function dbConnection(){
        
        try{
            $conn = new PDO('mysql:host='.$this->db_host.';dbname='.$this->db_name,$this->db_username,$this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        }
        catch(PDOException $e){
            echo "Connection error ".$e->getMessage(); 
            exit;
        }
        
    }
}
?>
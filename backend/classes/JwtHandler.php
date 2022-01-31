<?php
require './vendor/autoload.php';

use Firebase\JWT\JWT;

class JwtHandler
{
    protected $jwt_secrect;
    protected $token;
    protected $issuedAt;
    protected $expire;
    protected $jwt;

    public function __construct()
    {
        //default time-zone
        date_default_timezone_set('America/Maceio');
        $this->issuedAt = time();

        // Validade token (3600 segundos = 1hr)
        $this->expire = $this->issuedAt + 3600;

        // assinatura ou secret
        $this->jwt_secrect = "segredojwt";
    }

    public function jwtEncodeData($iss, $data) // Codifica os dados
    {

        $this->token = array(
            //Adiciona identificador ao token (quem emitiu o token)
            "iss" => $iss,
            "aud" => $iss,
            // Identifica quando o token foi emitido.
            "iat" => $this->issuedAt,
            // Expiração do token
            "exp" => $this->expire,
            // Carga
            "data" => $data
        );

        $this->jwt = JWT::encode($this->token, $this->jwt_secrect, 'HS256');
        return $this->jwt;
    }

    public function jwtDecodeData($jwt_token) // Decodifica os dados
    {
        try {
            $decode = JWT::decode($jwt_token, $this->jwt_secrect, array('HS256'));
            return [
                "data" => $decode->data
            ];
        } catch (Exception $e) {
            return [
                "message" => $e->getMessage()
            ];
        }
    }
}
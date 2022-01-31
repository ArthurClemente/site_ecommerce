<?php

require __DIR__.'/classes/conexao.php';
require __DIR__.'/classes/JwtHandler.php';

function msg($sucesso,$status,$mensagem,$extra = []){
    return array_merge([
        'sucesso' => $sucesso,
        'status' => $status,
        'mensagem' => $mensagem
    ],$extra);
}

$db_connection = new Database();
$conn = $db_connection->dbConnection();

$data = json_decode(file_get_contents("php://input"));
$returnData = [];

// Caso a requisição seja diferente de POST
if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0,404,'Page Not Found!');

// Checando campos vazios
elseif(!isset($data->email) 
    || !isset($data->senha)
    || empty(trim($data->email))
    || empty(trim($data->senha))
    ):

    $fields = ['fields' => ['email','senha']];
    $returnData = msg(0,422,'Por favor, preencha todos os campos!',$fields);

// Caso não tenham campos vazios-
else:
    $email = trim($data->email);
    $senha = trim($data->senha);

    // Verifica a validade do formato do email
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)):
        $returnData = msg(0,422,'Email inválido!');
    
    // Caso a senha seja menor que 5
    elseif(strlen($senha) < 5):
        $returnData = msg(0,422,'A senha deve ter pelo menos 5 caracteres!');

    // Usuario pronto para realizar login
    else:
        try{
            
            $fetch_usuario_por_email = "SELECT * FROM `ecommerce` WHERE `dsc_email`=:email";
            $query_stmt = $conn->prepare($fetch_usuario_por_email);
            $query_stmt->bindValue(':email', $email,PDO::PARAM_STR);
            $query_stmt->execute();

            // Caso usuario seja encontrado pelo email
            if($query_stmt->rowCount()):
                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                $check_senha = password_verify($senha, $row['dsc_senha']);

                // Verifica a senha
                // Caso senha seja correta envia o token do usuário
                if($check_senha):

                    $jwt = new JwtHandler();
                    $token = $jwt->jwtEncodeData(
                        'http://localhost/ecommerce/',
                        array("user_id"=> $row['ID'])
                    );
                    
                    $returnData = [
                        'success' => 1,
                        'mensagem' => 'Logado com sucesso.',
                        'token' => $token
                    ];

                // Caso senha incorreta
                else:
                    $returnData = msg(0,422,'Senha incorreta!');
                endif;

            // Caso o email do usuário não seja encontrado
            else:
                $returnData = msg(0,422,'Email não encontrado!');
            endif;
        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }

    endif;

endif;

echo json_encode($returnData);
?>
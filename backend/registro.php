<?php

require __DIR__ . '/classes/conexao.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

function msg($sucesso, $status, $mensagem, $extra = [])
{
    return array_merge([
        'sucesso' => $sucesso,
        'status' => $status,
        'mensagem' => $mensagem
    ], $extra);
}

// Dados do Post
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

if ($_SERVER["REQUEST_METHOD"] != "POST") : // Caso metodo seja diferente de Post

    $returnData = msg(0, 404, 'Page Not Found!');

elseif ( // Verifica se todos os dados do formulário foram preenchidos
    !isset($data->nome)
    || !isset($data->email)
    || !isset($data->senha)
    || empty(trim($data->nome))
    || empty(trim($data->email))
    || empty(trim($data->senha))
) :

    $fields = ['fields' => ['nome-usuario', 'email-usuario', 'senha-usuario']];
    $returnData = msg(0, 422, 'Por favor preencha todos os campos!', $fields);

// Se não houverem campos vazios-
else :

    $nome = trim($data->nome);
    $email = trim($data->email);
    $senha = trim($data->senha);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) :
        $returnData = msg(0, 422, 'Email inválido!');

    elseif (strlen($senha) < 5) :
        $returnData = msg(0, 422, 'A senha deve ter ao menos 5 caracteres!');

    elseif (strlen($nome) < 3) :
        $returnData = msg(0, 422, 'O nome deve ter ao menos 3 caracteres!');

    else :
        try {

            $check_email = "SELECT `dsc_email` FROM `ecommerce` WHERE `dsc_email`=:email";
            $check_email_stmt = $conn->prepare($check_email);
            $check_email_stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $check_email_stmt->execute();

            if ($check_email_stmt->rowCount()) :
                $returnData = msg(0, 422, 'Email em uso!');

            else :
                $insert_query = "INSERT INTO `ecommerce`(`dsc_email`,`dsc_nome`,`dsc_senha`) VALUES(:email,:nome,:senha)";

                $insert_stmt = $conn->prepare($insert_query);

                // DATA BINDING
                $insert_stmt->bindValue(':nome', htmlspecialchars(strip_tags($nome)), PDO::PARAM_STR);
                $insert_stmt->bindValue(':email', $email, PDO::PARAM_STR);
                $insert_stmt->bindValue(':senha', password_hash($senha, PASSWORD_DEFAULT), PDO::PARAM_STR);

                $insert_stmt->execute();

                $returnData = msg(1, 201, 'Registrado com sucesso.');

            endif;
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    endif;
endif;

echo json_encode($returnData);
?>
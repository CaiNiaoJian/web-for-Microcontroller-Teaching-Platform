<?php
// 设置响应头
header('Content-Type: application/json');

// 获取表单数据
$title = $_POST['title'];
$author = $_POST['author'];
$category = $_POST['category'];
$content = $_POST['content'];

// 获取上传的文件
$file = $_FILES['file'];

// 检查文件是否上传成功
if ($file['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'message' => '文件上传失败']);
    exit;
}

// 保存文件到服务器
$uploadDir = 'uploads/';
$uploadFile = $uploadDir . basename($file['name']);

if (!move_uploaded_file($file['tmp_name'], $uploadFile)) {
    echo json_encode(['success' => false, 'message' => '文件保存失败']);
    exit;
}

// 发送邮件
$to = '2263617544@qq.com';
$subject = '新投稿：' . $title;
$message = "文章标题: $title\n作者: $author\n分类: $category\n文章内容:\n$content";
$headers = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// 添加附件
$attachment = chunk_split(base64_encode(file_get_contents($uploadFile)));
$boundary = md5(time());
$headers .= "\r\nMIME-Version: 1.0\r\nContent-Type: multipart/mixed; boundary=\"$boundary\"";

$message = "--$boundary\r\n" .
    "Content-Type: text/plain; charset=\"iso-8859-1\"\r\n" .
    "Content-Transfer-Encoding: 7bit\r\n\r\n" .
    $message . "\r\n\r\n" .
    "--$boundary\r\n" .
    "Content-Type: application/octet-stream; name=\"" . basename($uploadFile) . "\"\r\n" .
    "Content-Transfer-Encoding: base64\r\n" .
    "Content-Disposition: attachment\r\n\r\n" .
    $attachment . "\r\n\r\n" .
    "--$boundary--";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true, 'message' => '提交成功']);
} else {
    echo json_encode(['success' => false, 'message' => '邮件发送失败']);
}
?>
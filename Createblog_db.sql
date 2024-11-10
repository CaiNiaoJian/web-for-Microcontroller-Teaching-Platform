CREATE DATABASE blog_db;
USE blog_db;
CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    publish_date DATETIME NOT NULL,
    views INT DEFAULT 0
);

INSERT INTO articles (title, author, category, content, publish_date, views)
VALUES 
('控制类文章标题 1', '作者 1', '控制类', '这是控制类文章的详细内容。', '2023-10-01 12:00:00', 10),
('非控制类文章标题 1', '作者 2', '非控制类', '这是非控制类文章的详细内容。', '2023-10-02 12:00:00', 5),
('其他类文章标题 1', '作者 3', '其他', '这是其他类文章的详细内容。', '2023-10-03 12:00:00', 3);
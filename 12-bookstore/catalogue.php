<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
  <title>Book Catalogue</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<h2>Books Available</h2>
<div class="book-grid">
<?php
$result = $conn->query("SELECT * FROM books");
while ($row = $result->fetch_assoc()) {
    echo "<div class='book-card'>";
    echo "<img src='" . $row['image'] . "' width='100'><br>";
    echo "<strong>" . $row['title'] . "</strong><br>";
    echo "by " . $row['author'] . "<br>";
    echo "₹" . $row['price'];
    echo "</div>";
}
?>
</div>
</body>
</html>

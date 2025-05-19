<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
  <title>Bookstore Home</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
  <h1>Welcome to My Online Bookstore</h1>
  <div class="navbar">
    <a href="index.php">Home</a>
    <a href="catalogue.php">Catalogue</a>
    <?php if (isset($_SESSION['user'])): ?>
      <a href="logout.php">Logout (<?php echo $_SESSION['user']; ?>)</a>
    <?php else: ?>
      <a href="login.php">Login</a>
      <a href="register.php">Register</a>
    <?php endif; ?>
  </div>
</header>

<h2>Discover & Read</h2>
<p style="text-align: center;">Explore trending books and find your next favorite read.</p>

</body>
</html>

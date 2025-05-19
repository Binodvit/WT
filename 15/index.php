<!-- http://localhost/15/index.php -->

<?php
session_start();
require_once 'config.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Grocery Shop</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="bg-gray-100">
    <nav class="bg-green-600 p-4">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-white text-2xl font-bold">Grocery Shop</h1>
            <div>
                <?php if (isset($_SESSION['user_id'])): ?>
                    <a href="logout.php" class="text-white mx-2">Logout</a>
                    <a href="catalogue.php" class="text-white mx-2">Catalogue</a>
                <?php else: ?>
                    <a href="login.php" class="text-white mx-2">Login</a>
                    <a href="register.php" class="text-white mx-2">Register</a>
                    <a href="catalogue.php" class="text-white mx-2">Catalogue</a>
                <?php endif; ?>
            </div>
        </div>
    </nav>

    <header class="bg-cover bg-center h-96 flex items-center justify-center" style="background-image: url('images/grocery-bg.jpg')">
        <div class="text-center text-white">
            <h2 class="text-4xl font-bold">Fresh Groceries Delivered to Your Door</h2>
            <a href="catalogue.php" class="mt-4 inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Shop Now</a>
        </div>
    </header>

    <section class="container mx-auto py-8">
        <h3 class="text-2xl font-bold text-center mb-6">Featured Products</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <?php
            $stmt = $pdo->query("SELECT * FROM Items LIMIT 3");
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)):
            ?>
                <div class="bg-white p-4 rounded shadow">
                    <img src="<?php echo htmlspecialchars($row['image']); ?>" alt="<?php echo htmlspecialchars($row['name']); ?>" class="w-full h-48 object-cover mb-4">
                    <h4 class="text-lg font-semibold"><?php echo htmlspecialchars($row['name']); ?></h4>
                    <p class="text-gray-600">$<?php echo number_format($row['price'], 2); ?></p>
                    <p class="text-gray-500"><?php echo htmlspecialchars($row['description']); ?></p>
                </div>
            <?php endwhile; ?>
        </div>
    </section>

    <footer class="bg-green-600 text-white p-4 text-center">
        <p>&copy; 2025 Grocery Shop. All rights reserved.</p>
    </footer>

    <script src="scripts.js"></script>
</body>
</html>
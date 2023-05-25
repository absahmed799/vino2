<!DOCTYPE html>
<html lang="fr">

<head>
    <title>Un petit verre de vino</title>

    <meta charset="utf-8">
    <meta http-equiv="cache-control" content="no-cache">
    <meta name="viewport" content="width=device-width, minimum-scale=0.5, initial-scale=1.0, user-scalable=yes">

    <meta name="description" content="Un petit verre de vino">
    <meta name="author" content="Teams APA-C-W-Marques">

    <link rel="stylesheet" href="{{ asset('css/normalize.css') }}" type="text/css" media="screen">
    <link rel="stylesheet" href="{{ asset('css/base_h5bp.css') }}" type="text/css" media="screen">
    <link rel="stylesheet" href="{{ asset('css/main.css') }}" type="text/css" media="screen">
    <link rel="stylesheet" href="{{ asset('css/custom.css') }}" type="text/css" media="screen">
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">

    <!--<script src="./js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>-->
    <script src="./js/plugins.js"></script>
    <script src="{{ asset('js/main.js') }}"></script>
    <script src="{{ asset('js/custom.js') }}"></script>
    <script src="{{ asset('js/boutons.js') }}"></script>
</head>

<body>
<header class="header">
    <a href="#" class="logo">
        <img src="{{ asset('images/vinos-blues-icone.svg') }}" alt="logo.svg">
        <span class="text_logo">Un petit verre de vino?</span>
    </a>
    <i class="bx bx-menu" id="menu-icon"></i>
    <nav class="navbar">
        <a href="#">Mon cellier</a>
        <a href="#">Administration</a>
        <a href="{{ route('importProducts') }}">Importer les bouteilles</a>
    </nav>
</header>
<main>

</main>
<footer class="footer">
    <p>
        Copyright 2023
    </p>
    <p>
        Teams APA-C-W
    </p>
</footer>
</body>

</html>


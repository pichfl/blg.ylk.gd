<?php 
	$is_debug = $kirby->options()['debug'];
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<?= vite()->css('main.js') ?>
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
<meta name="generator" content={Astro.generator} />
<link rel="canonical" href={canonicalURL} />
<title><?= $site->title() ?></title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<meta property="og:type" content="website" />
<meta property="og:url" content={Astro.url} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={new URL(image, Astro.url)} />
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={Astro.url} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={new URL(image, Astro.url)} />

<?php if (!$is_debug): ?>
	<script defer data-domain="blg.ylk.gd" data-api="/api/v1/event" src="/assets/plsbl.js" ></script>
<?php endif ?>
</head>
<body>
	<?php snippet('header') ?>

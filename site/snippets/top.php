<?php
$is_debug = $kirby->options()['debug'];
$pageTitle = $page->title() != $page->slug() ? $page->title() : $page->published()->toDate('d/m/Y');
$pageOrSiteTitle = $page->isHomePage() ? $site->title() : $pageTitle;
$title = $page->isHomePage() ? $site->title() : $pageTitle . ' – ' . $site->title();

if (
	isset($collection) &&
	$collection->pagination()->hasPages() &&
	!$collection->pagination()->isFirstPage()
) {
	$title = 'Page ' . $collection->pagination()->page() . ' – ' . $site->title();
}
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<?= vite()->css('main.js') ?>
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
<meta name="generator" content="Kirby" />
<link rel="canonical" href="<?= $page->url() ?>" />
<title><?= $title ?></title>
<meta name="title" content="<?= $pageOrSiteTitle ?>" />
<meta name="description" content="<?= $site->description() ?>" />

<meta property="og:type" content="website" />
<meta property="og:url" content="<?= $page->url() ?>" />
<meta property="og:title" content="<?= $pageOrSiteTitle ?>" />
<meta property="og:description" content="<?= $site->description() ?>" />
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="<?= $page->url() ?>" />
<meta property="twitter:title" content="<?= $pageOrSiteTitle ?>" />
<meta property="twitter:description" content="<?= $site->description() ?>" />
<?php if ($img = $page->images()->first()): ?>
<meta property="og:image" content="<?= $img->url() ?>" />
<meta property="twitter:image" content="<?= $img->url() ?>" />
<?php endif; ?>
<link rel="alternate" type="application/rss+xml" title="Recent Posts RSS" href="<?= $site->url() ?>/feed.rss" />
<link rel="alternate" type="application/feed+json" title="Recents Posts JSON Feed" href="<?= $site->url() ?>/feed.json" />

<?php if (!$is_debug): ?>
	<script defer data-domain="blg.ylk.gd" data-api="/plsbl/api/event" src="/plsbl/script.js"></script>
<?php endif; ?>
</head>
<body>
	<?php snippet('header'); ?>

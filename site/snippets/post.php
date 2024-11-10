<<?= $tagname ?> class="post">
  <?php if ($page->title() != $page->slug()): ?>
    <header>
      <h2><?= $page->title() ?></h2>
    </header>
  <?php endif ?>

	<div class="content">
    <?= $page->text()->kt() ?>
  </div>

	<footer>
		<p>
			<!-- <a rel="permalink" href="#"> -->
				<time datetime="<?= $page->published()->toDate('c') ?>"><?= $page->published()->toDate('d/m/Y') ?></time>
			<!-- </a> -->
		</p>
	</footer>
</<?= $tagname ?>>

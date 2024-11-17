<<?= $tagname ?> class="post">
  <?php if ($page->title() != $page->slug()): ?>
    <header>
      <h2><?= $page->title() ?></h2>
    </header>
  <?php endif; ?>

	<div class="content">
		<?php if ($page->text()->isNotEmpty()): ?>
    <?= $page->text()->kt() ?>
		<?php else: ?>
		<?php foreach ($page->content()->content()->toBlocks() as $block): ?>
			<?= $block ?>
		<?php endforeach; ?>
		<?php endif; ?>
  </div>

	<footer>
		<p>
			<!-- <a rel="permalink" href="#"> -->
				<time datetime="<?= $page->published()->toDate('c') ?>"><?= $page
  ->published()
  ->toDate('d/m/Y') ?></time>
			<!-- </a> -->
		</p>
	</footer>
</<?= $tagname ?>>

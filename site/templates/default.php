<?php snippet('top'); ?>

<main>
	<?php if ($page->text()->isNotEmpty()): ?>
    <?= $page->text()->kt() ?>
	<?php else: ?>
	<?php foreach ($page->content()->content()->toBlocks() as $block): ?>
		<?= $block ?>
	<?php endforeach; ?>
	<?php endif; ?>
</main>

<?php snippet('end'); ?>

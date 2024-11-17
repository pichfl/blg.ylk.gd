<?php
require_once __DIR__ . '/../../lib/MyHelpers.php';

/** @var \Kirby\Cms\Block $block */
$alt = $block->alt();
$caption = $block->caption();
$crop = $block->crop()->isTrue();
$link = $block->link();
$ratio = $block->ratio()->or('auto');
$src = null;
$orientation = '';

if ($block->location() == 'web') {
  $src = $block->src()->esc();
} elseif ($image = $block->image()->toFile()) {
  $alt = $alt->or($image->alt());
  $src = $image->url();
  $orientation =
    $image->width() == $image->height()
      ? 'square'
      : ($image->width() > $image->height()
        ? 'landscape'
        : 'portrait');
  $ratio = $block->ratio()->or(
    MyHelpers::simplify($image->width(), $image->height())[0] .
      ':' .
      MyHelpers::simplify($image->width(), $image->height())[1]
  );
}
?>
<?php if ($src): ?>
<figure<?= Html::attr(['data-ratio' => $ratio, 'data-crop' => $crop], null, ' ') ?>>
  <?php if ($link->isNotEmpty()): ?>
  <a href="<?= Str::esc($link->toUrl()) ?>">
    <img src="<?= $src ?>" alt="<?= $alt->esc() ?>"<?= HTML::attr([
  'data-orientation' => $orientation,
]) ?>>
  </a>
  <?php else: ?>
  <img src="<?= $src ?>" alt="<?= $alt->esc() ?>"<?= HTML::attr([
  'data-orientation' => $orientation,
]) ?>>
  <?php endif; ?>

  <?php if ($caption->isNotEmpty()): ?>
  <figcaption>
    <?= $caption ?>
  </figcaption>
  <?php endif; ?>
</figure>
<?php endif; ?>
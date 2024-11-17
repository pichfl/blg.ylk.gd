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
$attributes = [
  'data-orientation' => $orientation,
];

if ($block->location() == 'web') {
  $src = $block->src()->esc();
} elseif ($image = $block->image()->toFile()) {
  $thumb = $image->thumb([
    'width' => 1200,
    'height' => 1200,
    'quality' => 85,
  ]);

  $alt = $alt->or($image->alt());
  $src = $thumb->url();
  $orientation = $thumb->isSquare() ? 'square' : ($thumb->isLandscape() ? 'landscape' : 'portrait');
  $ratio = $block
    ->ratio()
    ->or(
      MyHelpers::simplify($thumb->width(), $thumb->height())[0] .
        ':' .
        MyHelpers::simplify($thumb->width(), $thumb->height())[1]
    );

  $attributes = [
    'data-orientation' => $orientation,
    'width' => $thumb->width(),
    'height' => $thumb->height(),
  ];
}
?>
<?php if ($src): ?>
<figure<?= Html::attr(['data-ratio' => $ratio, 'data-crop' => $crop], null, ' ') ?>>
  <?php if ($link->isNotEmpty()): ?>
  <a href="<?= Str::esc($link->toUrl()) ?>">
    <img src="<?= $src ?>" alt="<?= $alt->esc() ?>"<?= HTML::attr($attributes) ?>>
  </a>
  <?php else: ?>
  <img src="<?= $src ?>" alt="<?= $alt->esc() ?>"<?= HTML::attr($attributes) ?>>
  <?php endif; ?>

  <?php if ($caption->isNotEmpty()): ?>
  <figcaption>
    <?= $caption ?>
  </figcaption>
  <?php endif; ?>
</figure>
<?php endif; ?>

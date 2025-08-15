<?php
$posts = $posts = $kirby->collection('posts')->paginate(12);
snippet('top', ['collection' => $posts]);
?>

<main>
  <?php foreach ($posts as $post): ?>
    <?php snippet('post', ['page' => $post, 'tagname' => 'article']); ?>
  <?php endforeach; ?>

  <?php snippet('pagination', ['collection' => $posts]); ?>
</main>

<?php snippet('end'); ?>

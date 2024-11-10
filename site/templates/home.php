<?php snippet('top') ?>

<main>
  <?php foreach($posts = $kirby->collection("posts")->paginate(5) as $post): ?>
    <?php snippet('post', ['page' => $post, 'tagname' => 'article']) ?>
  <?php endforeach ?>
  
  <?php snippet('pagination', ['collection' => $posts]) ?>
</main>

<?php snippet('end') ?>
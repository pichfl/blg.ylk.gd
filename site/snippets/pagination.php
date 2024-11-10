<?php if ($collection->pagination()->hasPages()): ?>
  <nav class="pagination">
    <?php if ($collection->pagination()->hasPrevPage()): ?>
        <a href="<?= $collection->pagination()->prevPageURL() ?>">
          <span role="presentation">&larr;</span> Newer
        </a>
    <?php else: ?>
        <span>&nbsp;</span>
    <?php endif ?>  

    <span>
      <?= $collection->pagination()->page() ?> / <?= $collection->pagination()->pages() ?>
    </span>
    
    <?php if ($collection->pagination()->hasNextPage()): ?>
        <a href="<?= $collection->pagination()->nextPageURL() ?>">
          Older <span role="presentation">&rarr;</span>
        </a>
    <?php else: ?>
        <span>&nbsp;</span>
    <?php endif ?>
  </nav>
<?php endif ?>
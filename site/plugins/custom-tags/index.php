<?php

$originalTag = Kirby\Text\KirbyTag::$types['image'];

Kirby::plugin('fp/custom-tags', [
  'tags' => [
    'ref' => [
      'attr' => [
        'id',
      ],
      'html' => function($tag) {
        return $tag->parent()->file($tag->value())->url();
      }
    ]
  ]
]);
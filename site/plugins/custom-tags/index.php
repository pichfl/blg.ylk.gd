<?php

$originalTag = Kirby\Text\KirbyTag::$types['image'];

Kirby::plugin('fp/custom-tags', [
    'tags' => [
        'ref' => [
            'attr' => ['id'],
            'html' => function ($tag) {
                // if file is image, use resized thumb
                
                if ($file = $tag->parent()->file($tag->value())) {
                    if ($file->type() == 'image') {
                        $thumb = $file->thumb([
                            'width' => 1200,
                            'height' => 1200,
                            'quality' => 85,
                        ]);
                        return $thumb->url();
                    }
                }
                
                return $tag->parent()->file($tag->value())->url();
            },
        ],
    ],
]);

<?php

return [
	'kirbytext' => [
		'image' => [
			'width' => 'auto',
			'height' => 'auto',
			'alt' => '',
		],
	],
	'routes' => [
		[
			'pattern' => 'feed.(rss|json)', // atom generation seems to be broken
			'method' => 'GET',
			'action' => function ($type) {
				echo "feed/$type";

				$options = [
					'title' => 'Flo’s latest tangents',
					'description' =>
						'Blogging for your amusement and my chance to remember things. Pictures and ramblings about tech, making, and baking.',
					'link' => 'blog',
					'feedurl' => site()->url() . '/feed.' . $type,
					'snippet' => "feed/$type",
					'datefield' => 'date',
				];

				// using a closure allows for better performance on a cache hit
				return feed(fn() => collection('posts')->limit(20), $options);
			},
		],
	],
	'debug' => false,
];

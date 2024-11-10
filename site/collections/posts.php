<?php

return function ($site) {
    return $site->pages()->template('post')->sortBy('slug', 'desc');
};
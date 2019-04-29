const mix = require('laravel-mix');
var tailwindcss = require('tailwindcss');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
   .sass('resources/sass/style.sass', 'public/css')
   .options({
      processCssUrls: false,
      postCss: [ tailwindcss('./tailwind.js') ],
    });

mix.browserSync('flexbox.test');

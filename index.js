var gulp    = require('gulp');
var compile = require('laravel-elixir/tasks/shared/Css');
var Elixir = require('laravel-elixir');

var config = Elixir.config;

/*
 |----------------------------------------------------------------
 | Stylus Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Stylus, including minification and
 | and auto-prefixing. Stylus is one of the CSS pre-processors
 | supported by Elixir, along with the Sass CSS processor.
 |
 */

// Add correct configuration for stylus
config.css.stylus = {
                        folder: 'stylus',
                        pluginOptions: {}
                    };

Elixir.extend('stylus', function(src, output, options) {
    var paths = prepGulpPaths(src, output);

    new Elixir.Task('stylus', function() {
        return compile({
            name: 'Stylus',
            compiler: require('gulp-stylus'),
            src: paths.src,
            output: paths.output,
            task: this,
            pluginOptions: options || config.css.stylus.pluginOptions
        });
    })
    .watch(paths.src.baseDir + '/**/*.styl')
    .ignore(paths.output.path);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src, config.get('assets.css.stylus.folder'))
        .output(output || config.get('public.css.outputFolder'), 'app.css');
};


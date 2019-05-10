// 包装函数
module.exports = function (grunt) {
  var sassStyle = 'expanded';
  // 任务配置,所有插件的配置信息
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // uglify插件的配置信息
    uglify: {
      options: {
        banner: '/*! This is uglify test - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
        beautify: false, //是否压缩
        mangle: true, //不混淆变量名
        compress: true, //打开或关闭使用默认选项源压缩。
      },
      app_task: {
        files: [{
          expand: true,
          cwd: './src/',
          src: 'js/*.js',
          dest: 'dist/'
        }]
      }
    },
    sass: {
      output: {
        options: {
          style: sassStyle
        },
        files: {
          './src/css/style.css': './src/scss/style.scss'
        }
      }
    },
    cssmin: {
      options: {
        stripBanners: false, //合并时允许输出头部信息
        banner: '/*!<%= pkg.name %> - <%= pkg.version %>-' + '<%=grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/css/*.css', //压缩是要压缩合并了的
        dest: 'dist/css/style.css' //dest 是目的地输出
      }
    },
    watch: {
      scripts: {
        files: ['./src/js/*.js'],
        tasks: ['uglify']
      },
      sass: {
        files: ['./src/scss/*.scss'],
        tasks: ['sass']
      },
      css:{
        files: ['./src/css/*.css'],
        tasks: ['cssmin']
      }
    }
  });

  // 告诉grunt我们将使用插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // 告诉grunt当我们在终端中输入grunt时需要做些什么
  grunt.registerTask('minjs', ['uglify']);
  grunt.registerTask('outputcss', ['sass']);
  grunt.registerTask('mincss', ['cssmin']);
  grunt.registerTask('default', ['uglify', 'sass', 'cssmin']);
  grunt.registerTask('watchit', ['uglify', 'sass', 'cssmin','watch']);
};

var path=require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var dirVars = require('./webpack-config/dir-vars.config.js');
var pageArr = require('./webpack-config/page-entries.config.js');
var $=require('jquery');
var plate=[];
var pls=[
      /*  new webpack.ProvidePlugin({ //加载jq
             $: "jquery"
        }),*/
        new ExtractTextPlugin("assets/css/[name].css"),    //单独使用style标签加载css并设置其路径
        new webpack.optimize.UglifyJsPlugin({   //压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']   //排除关键字
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'main', 
            chunks:['jquery','common','public','swiper']
        }),
      
   
    ];
    pageArr.forEach((page) => {
       /* console.log(page);*/
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: "/app/"+page,
    template:'./src/app/'+page,   //html模板路径
      inject: true,
     //filename: '${page}/page.html',
    //template: path.resolve(dirVars.pagesDir, './${page}/html.js'),
   // chunks: [page, 'commons/commons'],
    hash: true, // 为静态资源生成hash值

    //xhtml: true,
  });
plate.push(htmlPlugin);
});
    var allpls=pls.concat(plate);
module.exports={
	entry:{
    	main: "./src/assets/js/main.js",
      common: "./src/assets/js/common.js",
     jquery: "./src/assets/js/jquery-1.10.2.min.js",
      public: "./src/assets/js/public.js",
      swiper: "./src/assets/js/swiper.min.js",
          
          
    	},
      
    output:{
        path: path.join(__dirname,'dist'),
        publicPath: "../",
        filename: "assets/js/[name].js",
       chunkFilename: "assets/js/chunk.js"
    },
  
    module: {
        loaders: [	//加载器
         {
          test: require.resolve('jquery'),
          loader: 'expose?jQuery!expose?$'
      },
            {test: /\.css$/, loader:ExtractTextPlugin.extract("style", "css") },
            {test: /\.html$/, loader: "html-loader" },
            {test: /\.(png|jpg)$/, loader: 'url-loader?name=./images/[name].[ext]'}
        ]
    },
    plugins:allpls,
    devServer:{
      host: 'localhost',
      inline: true,
      port: '8086',
    	contentBase:'./src/app/',
      publicPath:'/assets/'
    }
};/*
console.log(allpls);*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const proxy = require('http-proxy-middleware');
function recursiveIssuer(m){
   if(m.issuer){
      return recursiveIssuer(m.issuer);
   }else if(m.name){
      return m.name;
   }else {
      return false;
   }
}


module.exports = {
   mode:'production', // 1 15 
   entry:{
      app:path.resolve(__dirname,'./src/app.js')
   },
   output :{
      path : path.resolve(__dirname,'build'),
      filename:'index.js'
   },
   module:{
      rules:[
         {
            test:/\.(js|jsx)$/,
            exclude:/(node_modules)/,
            use :{
               loader :'babel-loader',
               options:{
                  presets:['env','react']
               }
            }
         },
         {
            test:/\.css$/,
            use:[
               MiniCssExtractPlugin.loader,
               'css-loader'
            ]
         },
         {
            test:/\.scss/,
            use :ExtractTextPlugin.extract({
               fallback:'style-loader',
               use:['css-loader','sass-loader']
            }) 
         },
         {
            test:/\.(png|jpg|gif|svg|ico)$/,
            use :[
               {
                  loader:'file-loader',
                  options:{
                     name:'[path][name].[ext]',
                     outputPath:'images/'
                  }
               }
            ]
         },
         {
            test:/\.(woff|woff2|eot|ttf|otf)$/,
            use:[
               {
                  loader:'file-loader',
                  options :{
                     limit:8192,
                     name:'resource/[name].[ext]'
                  }
               }
            ]
         }

      ]
   },
   resolve :{
      extensions:['.js','.jsx','.json'],
      alias : {
         route : path.resolve(__dirname,'scr/route') ,
         page : path.resolve(__dirname,'src/page'),
         cope : path.resolve(__dirname,'src/component'),
         uide : path.resolve(__dirname,'src/ui-designer'),
         func : path.resolve(__dirname,'src/func')
      }
   },
   optimization :{
      splitChunks:{
         cacheGroups:{
            appStyle:{
               name:'app',
               test:(m,c,entry='app')=> m.constructor.name==='CssModule' && recursiveIssuer(m) === entry,
               chunks:'all',
               enforce:true
            }
         }
      }
   },
   plugins :[
      new HtmlWebpackPlugin({
         template :'./index.html',
         filename:'index.html',
         favicon:'./src/favicon.ico'
      }),
      new MiniCssExtractPlugin({
         publicPath: './sass/',
         filename:'./style.[name].css'
      }),
      new ExtractTextPlugin({
         filename:'[name].css'
      })
   ],
   devServer:{
      port : 8080,
      historyApiFallback:true ,
      proxy:{
        '/v2' :{
            target:'http://api.douban.com',
            changeOrigin:true,
            pathRewrite:{
               '^/v2':'/v2'
            }
         },
         '/ajax':{  // 菜单栏
            target:'https://category.vip.com/',
            changeOrigin:true,
            pathRewrite:{
               '^/ajax':'/ajax/'
            }
         },
         '/api-ajax.php':{ // 商品内容list
            target:'https://list.vip.com/',
            changeOrigin:true ,
            pathRewrite :{
               '^/api-ajax.php':'/api-ajax.php'
            }
         }
      } 
   }
};
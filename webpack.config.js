const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Importación del plugin de HTML Webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Importación del plugin de CSS Webpack
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Importación del plugin de copia de archivos Webpack
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Importación del plugin de limpieza de archivos Webpack
const TerserPlugin = require('terser-webpack-plugin'); // Importación del plugin de optimización de JavaScript Webpack
const CompressionPlugin = require('compression-webpack-plugin'); // Importación del plugin de compresión de archivos Webpack

module.exports = {
    entry: './src/index.js', // Punto de entrada de la aplicación. (documento inicial de la aplicación)
    output: { // Configuración de la salida de los archivos generados
        path: path.resolve(__dirname, 'dist'), // Directorio de salida de los archivos generados
        filename: '[name].[contenthash].js' // Nombre del archivo generado en el directorio de salida. (dist)
    },
    mode: 'production', // Modo de ejecución de Webpack. También puede ser 'development'
    resolve: { // Configuración de las extensiones de los archivos que se van a utilizar en el proyecto
        extensions: ['.js'] // Extensiones que se van a utilizar en el proyecto
    },
    module: { // Configuración de los módulos, donde se definen las reglas de los loaders
        rules: [ // Reglas de los módulos
            { // Regla para el uso de Babel
                test: /\.m?js$/, // Expresión regular (Regex) para identificar los archivos JS que se van a transformar
                exclude: /node_modules/, // Exclusión de los archivos que no se van a transformar
                use: { // Configuración del loader que se va a utilizar
                    loader: 'babel-loader' // Loader que se va a utilizar
                }
            },
            { // Regla para el uso de HTML
                test: /\.html$/, // Expresión regular (Regex) para identificar los archivos HTML que se van a transformar
                use: [ // Configuración de los loaders que se van a utilizar
                    {
                        loader: 'html-loader' // Loader que se va a utilizar -> HTML
                    }
                ]
            },
            { // Regla para el uso de CSS
                test: /\.css$/, // Expresión regular (Regex) para identificar los archivos CSS que se van a transformar
                use: [ // Configuración de los loaders que se van a utilizar
                    MiniCssExtractPlugin.loader,
                    'css-loader' // Loader que se va a utilizar -> CSS
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/, // Expresión regular (Regex) para identificar los archivos de imágenes que se van a transformar
                use: [ // Configuración de los loaders que se van a utilizar
                    {
                        loader: 'file-loader', // Loader que se va a utilizar -> File
                        options: { // Opciones del loader
                            name: 'assets/images/[name].[contenthash].[ext]' // Nombre del archivo de salida. cuando usas [name] se refiere al nombre original del archivo. Nota: [algo] son placeholders que se reemplazan por el valor correspondiente del archivo ejemplo -> [name], [ext], [hash] etc. 
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [ // Configuración de los plugins que se van a utilizar
        new HtmlWebpackPlugin({ // Instancia del plugin de HTML Webpack
            inject: true, // Inyección de los archivos JS en el archivo HTML
            template: './public/index.html', // Plantilla HTML que se va a utilizar
            filename: './index.html' // Nombre del archivo HTML que se va a generar en la carpeta de salida dist (distribution)
        }),
        new MiniCssExtractPlugin({ // Instancia del plugin de CSS Webpack
            filename: 'assets/[name].[contenthash].css' // Nombre del archivo CSS que se va a generar en la carpeta de salida dist (distribution)
        }),
        new CopyWebpackPlugin({ // Instancia del plugin de copia de archivos Webpack
            patterns: [ // Patrones de los archivos que se van a copiar
                {
                    from: path.resolve(__dirname, 'src', 'assets/images'), // Directorio de origen de los archivos que se van a copiar
                    to: 'assets/images' // Directorio de destino de los archivos que se van a copiar
                }
            ]
        }),
        new CleanWebpackPlugin(),
        new CompressionPlugin({
            algorithm: 'gzip',
        }),
    ]
}
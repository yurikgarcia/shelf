const { src, dest, series, parallel } = require('gulp');
const del = require('del');
const fs   = require('fs');
const zip = require('gulp-zip');
const log = require('fancy-log');
var exec = require('child_process').exec;

const paths = {
  prod_build: '../prod-build',
  server_file_name: 'app.js',
  server_auth_routes: '../prod-build/auth_routes',
  server_inventory_routes: '../prod-build/inventory_routes',
  server_issued_items_routes: '../prod-build/issued_items_routes',
  server_sfs_cape_inventory_routes: '../prod-build/sfs_cape_inventory_routes',
  server_sfs_patrick_inventory_routes: '../prod-build/sfs_patrick_inventory_routes',
  server_shoppingcart_routes: '../prod-build/shoppingcart_routes',
  server_user_routes: '../prod-build/user_routes',
  react_src: '../client/build/**/*',
  react_dist: '../prod-build/client/build',
  zipped_file_name: 'react-nodejs.zip'
};

function clean()  {
  log('removing the old files in the directory')
  return del('../prod-build/**', {force:true});
}

function createProdBuildFolder() {

  const dir = paths.prod_build;
  log(`Creating the folder if not exist  ${dir}`)
  if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    log('folder created:', dir);
  }

  return Promise.resolve('the value is ignored');
}

function buildReactCodeTask(cb) {
  log('building React code into the directory')
  return exec('cd ../client && npm run build', function (err, stdout, stderr) {
    log(stdout);
    log(stderr);
    cb(err);
  })
}

function copyReactCodeTask() {
  log('copying React code into the directory')
  return src(`${paths.react_src}`)
        .pipe(dest(`${paths.react_dist}`));
}

function copyNodeJSCodeTask() {
  log('building and copying server code into the directory')
  return src(['package.json', 'app.js', '.env', 'dist/**'])
        .pipe(dest(`${paths.prod_build}`))
}

function copyAuthRoutesTask() {
  log('copying server AUTH routes into the directory')
  return src(['auth_routes/**'])
        .pipe(dest(`${paths.server_auth_routes}`))
}

function copyInventoryRoutesTask() {
  log('copying server INVENTORY routes into the directory')
  return src(['inventory_routes/**'])
        .pipe(dest(`${paths.server_inventory_routes}`))
}

function copyIssuedItemsRoutesTask() {
  log('copying server ISSUED ITEMS routes into the directory')
  return src(['issued_items_routes/**'])
        .pipe(dest(`${paths.server_issued_items_routes}`))
}

function copySfsCapeInventoryRoutesTask() {
  log('copying server CAPE INV routes into the directory')
  return src(['sfs_cape_inventory_routes/**'])
        .pipe(dest(`${paths.server_sfs_cape_inventory_routes}`))
}

function copySfsPatrickInventoryRoutesTask() {
  log('copying server PATRICK INV routes into the directory')
  return src(['sfs_patrick_inventory_routes/**'])
        .pipe(dest(`${paths.server_sfs_patrick_inventory_routes}`))
}

function copyShoppingCartRoutesTask() {
  log('copying server CART routes into the directory')
  return src(['shoppingcart_routes/**'])
        .pipe(dest(`${paths.server_shoppingcart_routes}`))
}

function copyUserRoutesTask() {
  log('copying server USER routes into the directory')
  return src(['user_routes/**'])
        .pipe(dest(`${paths.server_user_routes}`))
}


function zippingTask() {
  log('zipping the code')
  return src(`${paths.prod_build}/**/*`)
      .pipe(zip(`${paths.zipped_file_name}`))
      .pipe(dest(`${paths.prod_build}`))
}

exports.default = series(
  clean,
  createProdBuildFolder,
  buildReactCodeTask,
  parallel(
    copyReactCodeTask, 
    copyNodeJSCodeTask
    ),
  parallel(
    copyAuthRoutesTask, 
    copyInventoryRoutesTask, 
    copyIssuedItemsRoutesTask, 
    copySfsCapeInventoryRoutesTask, 
    copySfsPatrickInventoryRoutesTask, 
    copyShoppingCartRoutesTask, 
    copyUserRoutesTask
    ),
  zippingTask
);
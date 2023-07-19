git clean -f
git reset --hard
printf "\n\nGetting git content from remote\n"
git pull --rebase --force
printf "\n Updating the backend part\n"
cd ./server
yarn
yarn run build 
cd ../client 
yarn 
yarn run build
cd ..
cp ./client/build ./server -r
pm2 restart driving
printf "\nUpdate has been completed\n"
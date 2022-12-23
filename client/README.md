
# Shelf

Shelf is an inventory managent system that sucks.


## Deployment

To deploy this server

```bash
  cd server && gulp
```
In the AWS ElasticBeanstalk Environment (Shelfapr-env), 
drop the zip file found in the 'prod-build' folder. (react-nodejs.zip) 
into the EB "Upload and Deploy" dropbox under "Running Versions"

To deploy the ui

Push new changes to the GitHub repo. Codepipeline is set to Source Deploy
and will update based on the GitHub repo changes 
 


## Authors

- [Brian Hardy](https://github.com/let-userName-Brian)
- [Yurik Garcia](https://github.com/yurikgarcia)
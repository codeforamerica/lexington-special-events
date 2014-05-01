```
rake db:create
rake db:migrate
```

## Install

```console
$ git clone https://github.com/codeforamerica/lexington-special-events
$ cd lexington-special-events
$ bundle install
$ rake db:create db:migrate db:test:prepare
$ rake # run the complete test suite
$ rails server
```

## To deploy to Heroku
```
heroku create <app name>
heroku addons:add pgbackups:auto-month # recommended
$ heroku config:set SECRET_KEY_BASE=`bundle exec rake secret`
$ git push heroku master
$ heroku run rake db:migrate
$ heroku open
```

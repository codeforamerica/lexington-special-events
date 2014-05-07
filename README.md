## Special Events System for Lexington, KY
Special Events is a Rails application,
[here’s](https://github.com/codeforamerica/howto/blob/master/Rails.md)
how to get Ruby/Rails running on your environment.

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

#### Front-end Assets
* Are mostly managed by [rails-assets](https://rails-assets.org/) which is a bridge to bower
* To install some fancy JS library, add `gem 'rails-assets-fancy-js-library'` to the Gemfile

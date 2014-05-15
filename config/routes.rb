Rails.application.routes.draw do
  root 'parks#index'

  resources :parks
  resources :events
end

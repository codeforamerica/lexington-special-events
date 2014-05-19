Rails.application.routes.draw do
  root 'events#index'

  resources :parks
  resources :events
end

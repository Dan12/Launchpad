Rails.application.routes.draw do
  root "application#index"
  
  post "/get_asset_path" => "application#getAssetUrl"
end

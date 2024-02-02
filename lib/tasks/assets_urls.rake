require 'curl'
require 'json'

task :image_urls, [:api_url] do |t, args|
  puts args[:api_url]

  if args[:api_url].present?
    curl = CURL.new 
    response = curl.get(args[:api_url]) 
    json_res = JSON.parse(response)['resources']

    File.open("#{Rails.root}/docs/_data/assets.json", 'w+') do |f|
      file_hash = {}
      json_res.each do |resource| 
        file_hash[resource['public_id'].split('/')[1]] = resource['secure_url']
      end
      f.write(file_hash.to_json)
    end
  end
end


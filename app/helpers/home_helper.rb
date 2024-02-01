module HomeHelper

  # assign default value if not passed
  def assign_val(icon_details, key, default_val = nil)
    return icon_details[key] if icon_details.has_key?(key)
    return false if default_val.nil?
    
    icon_details[key] = default_val
  end

  # return icon details hash 
  def filtered_icon_details(icon_details)
    is_static = icon_details[:static_logo]

    return {
      icon_name: icon_details[:title].gsub(/[[:space:]]/, '').downcase,
      icon_extension: assign_val(icon_details, 'extension'.to_sym, 'png'),
      icon_size: assign_val(icon_details, 'size'.to_sym, '35x35'),
      icon_url: icon_details[:url],
      icon_class: assign_val(icon_details, 'css_class'.to_sym, 'pr-3 pt-2'),
      show_title: icon_details[:show_title],
      is_static: is_static,
      light_st_logo: is_static && icon_details[:static_logo] == 'light',
      dark_st_logo: is_static && icon_details[:static_logo] == 'dark' 
    }.reject { |k, v| v.nil? }
  end

end

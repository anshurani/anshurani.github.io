class ApplicationController < ActionController::Base

  private
  
  #
  # method to check user's browser type
  # @return true if user agent is mobile device
  #
  def mobile_device?
    browser = Browser.new(request.env['HTTP_USER_AGENT'])
    browser.device.mobile?
  end
end

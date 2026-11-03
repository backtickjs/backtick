Pod::Spec.new do |s|
  s.name           = 'BacktickSession'
  s.version        = '1.0.0'
  s.summary        = "The Backtick app's session: device key, sign-in and tokens"
  s.author         = ''
  s.homepage       = 'https://backtickjs.com'
  s.platforms      = { :ios => '17.4' }
  s.source         = { git: '' }
  s.static_framework = true
  s.dependency 'ExpoModulesCore'
  s.dependency 'Expo'
  s.dependency 'React-Core'
  s.source_files = "**/*.{h,m,mm,swift}"
end

// Bootstrap js loaded first
import '/imports/ui/vendor/bootstrap/js'

// Import all templates
import '/imports/ui/templates/notFound.tpl.jade'
import '/imports/ui/templates/main.js'
import '/imports/ui/templates/bubble.js'

// Finally import router - depends on templates above!
import '/imports/api/router'

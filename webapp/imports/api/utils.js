import { Meteor } from 'meteor/meteor'
import { Match, check } from 'meteor/check'


// Add matching "types" used by Meteor's `check` package
export const Matchers = {
  
  NonEmptyString: Match.Where(function(s) {
    check(s, String)
    return s.length > 0
  }),
}

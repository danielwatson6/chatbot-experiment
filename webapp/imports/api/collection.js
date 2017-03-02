import { Mongo } from 'meteor/mongo'
import { Match, check } from 'meteor/check'


export class Collection extends Mongo.Collection {
  
  constructor(name, schemaObj) {
    super(name)
    // Schema used to validate user input fields to be stored
    const type = typeof schemaObj
    if (type !== 'object')
      throw new TypeError(`Expected object, received ${type}.`)
    this.schema = schemaObj
    // Deny all client-side methods; use Meteor methods instead
    this.deny({
      insert() { return true },
      update() { return true },
      remove() { return true },
    })
  }

  validate(obj) {
    // Returned to client only with Meteor.Error(400, "Match failed")
    check(obj, this.schema)
  }

  isValid(obj) {
    return Match.test(obj, this.schema)
  }
}

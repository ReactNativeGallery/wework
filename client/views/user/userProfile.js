AutoForm.addHooks(['userProfileEdit'], {
  after: {
    update: function(error, result) {
      if (error) {
        console.log(error)
      } else {
        Modal.hide('userProfile')
      }
    },
  },
})

Template.userProfile.events({
  'click #cancel': function(event, template) {
    event.preventDefault()
    Modal.hide('userProfile')
  },
})

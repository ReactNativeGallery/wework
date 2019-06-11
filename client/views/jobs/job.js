Template.job.events({
  'click #job-deactivate': function(event, template) {
    event.preventDefault()
    Modal.show('jobDeactivate', template.data)
  },
  'click #job-contact-recruiters': function(event, template) {
    event.preventDefault()
    Modal.show('jobContact', template.data)
  },
})

Template.job.helpers({
  hasLabel: function() {
    return this.jobType || this.remote || this.featured
  },
})

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

Template.job.onRendered(function(_, __) {
  DocHead.setTitle(this.data.title)
  DocHead.addMeta({
    name: 'description',
    content:
      this.data.title + ' - ' + this.data.company + ' - ' + this.data.location,
  })
  DocHead.addMeta({
    name: 'og:title',
    content: this.data.title,
  })
  DocHead.addMeta({
    name: 'og:description',
    content:
      this.data.title + ' - ' + this.data.company + ' - ' + this.data.location,
  })
  DocHead.addMeta({
    name: 'og:site_name',
    content: 'We hire React-Native',
  })
})

Template.job.helpers({
  hasLabel: function() {
    return this.jobType || this.remote || this.featured
  },
})

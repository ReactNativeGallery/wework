Template.jobExpiredAlert.helpers({
  expired: function() {
    if (this.userId === Meteor.userId()) {
      if (
        this.createdAt < daysUntilExpiration() &&
        this.updatedAt < daysUntilExpiration()
      ) {
        return true
      } else if (
        this.createdAt < daysUntilExpiration() &&
        this.updatedAt === undefined
      ) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
})

Template.jobStatusToggle.helpers({
  statuses: function() {
    return STATUSES
  },
})

Template.jobStatusToggle.events({
  'click .set-status': function(event, template) {
    event.preventDefault()
    Meteor.call('adminSetJobStatus', template.data._id, String(this))
  },
})

Template.jobActivate.events({
  'click #job-activate': function(event, template) {
    event.preventDefault()
    var job = template.data
    var btn = $(event.currentTarget)
    btn.button('loading')
    // const isPromo = Meteor.settings.public.promo.early === job.codePromo
    // const amount = isPromo ? 5775 : 7700
    // const description = isPromo
    //   ? 'Job Post - 30 Days - 57.75€ (promo)'
    //   : 'Job Post - 30 Days - 77€'
    Meteor.call('jobActivate', undefined /*token.id*/, job._id, function(
      error,
      _result,
    ) {
      if (error) {
        console.log('Insert Error:', error)
      }
      btn.button('reset')
    })
    // StripeCheckout.open({
    //   key: Meteor.settings.public.Stripe.pubKey,
    //   name: 'We hire React-Native',
    //   billingAddress: true,
    //   allowRememberMe: true,
    //   description,
    //   currency: "eur",
    //   amount,
    //   email: getUserEmail(Meteor.user()),
    //   closed: function() {
    //     btn.button('reset');
    //   },
    //   token: function(token, args) {
    //     Meteor.call("jobActivate", token.id, job._id, function(error, result) {
    //       if (error) {
    //         console.log("Insert Error:", error);
    //       } else {
    //         console.log(result);
    //       }
    //       btn.button('reset');
    //     });
    //   }
    // });
  },
})
